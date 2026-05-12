/**
 * DrawPrompts — POST /api/generate
 * 核心接口：图片生成（异步模式）
 *
 * 流程：验证 → 检查权限 → 扣积分 → 立即返回 generation_id → 后台调 API → 上传 R2 → 更新 DB
 *
 * 前端收到 generation_id 后轮询 /api/generate/status 获取最终结果。
 * 这样每个 HTTP 响应都在几秒内返回，不会被 Cloudflare 100 s 代理超时截断。
 */
export const maxDuration = 300; // Vercel Pro plan 最大 300 秒

import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/servers/user";
import { getUserCredits, consumeCredits, refundCredits, getDailyRemaining } from "@/servers/credits";
import { createGeneration, markGenerationSuccess, markGenerationFailed } from "@/servers/generations";
import type { GenerateImageResult } from "@/lib/openai";
import { uploadToR2 } from "@/lib/R2";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  QUALITY_CONFIG,
  canUseQuality,
  getEffectiveMembership,
  type QualityTier,
} from "@/lib/qualityConfig";

/**
 * 判断错误是否为上游负载饱和 / 限流类错误，可以用备用令牌重试
 */
function isRetriableUpstreamError(status: number, message: string): boolean {
  if (status === 429 || status === 502 || status === 503) return true;
  const lower = message.toLowerCase();
  return lower.includes("负载") || lower.includes("饱和") || lower.includes("稍后")
    || lower.includes("rate limit") || lower.includes("overloaded")
    || lower.includes("capacity") || lower.includes("too many requests");
}

/**
 * 使用 fetch 调用图片生成 API（单次请求，不含重试逻辑）
 * @param apiKeyOverride - 可选，指定使用的 API Key（用于 fallback 到备用分组令牌）
 */
async function callImageAPIOnce(params: {
  prompt: string;
  model: string;
  size?: string;
  quality?: string;
  referenceImageBase64?: string;
}, apiKeyOverride?: string): Promise<GenerateImageResult> {
  const apiKey = apiKeyOverride || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  const baseUrl = process.env.OPENAI_API_BASE_URL || "https://api.apiyi.com";
  const isEdit = !!params.referenceImageBase64;
  const url = isEdit
    ? `${baseUrl}/v1/images/edits`
    : `${baseUrl}/v1/images/generations`;

  console.log(`[Generate] Calling API: mode=${isEdit ? "edit" : "generate"}, model="${params.model}", size="${params.size}", quality="${params.quality}", prompt_len=${params.prompt.length}`);

  let res: Response;

  if (isEdit && params.referenceImageBase64) {
    // Image editing: use multipart/form-data
    const formData = new FormData();
    formData.append("model", params.model);
    formData.append("prompt", params.prompt);
    formData.append("n", "1");
    if (params.size) formData.append("size", params.size);
    if (params.quality) formData.append("quality", params.quality);

    // Convert base64 to Blob for the image field
    const binaryStr = atob(params.referenceImageBase64);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
    // Detect mime type
    let mime = "image/png";
    if (bytes[0] === 0xFF && bytes[1] === 0xD8) mime = "image/jpeg";
    const blob = new Blob([bytes], { type: mime });
    formData.append("image[]", blob, "reference.png");

    res = await fetch(url, {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}` },
      body: formData,
      signal: AbortSignal.timeout(290000), // slightly under maxDuration
    });
  } else {
    // Text-to-image: use JSON
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: params.model,
        prompt: params.prompt,
        n: 1,
        ...(params.size ? { size: params.size } : {}),
        ...(params.quality ? { quality: params.quality } : {}),
      }),
      signal: AbortSignal.timeout(290000),
    });
  }

  const data = await res.json();

  if (!res.ok) {
    const errorMessage = data?.error?.message || `API returned status ${res.status}`;
    console.error(`[Generate] API Error (model=${params.model}): ${errorMessage}`);
    const err = new Error(errorMessage);
    (err as Error & { statusCode: number }).statusCode = res.status;
    throw err;
  }

  let b64 = "";
  if (data.data && data.data[0]) {
    b64 = data.data[0].b64_json || "";
  }

  if (!b64) {
    throw new Error("No image data in response");
  }

  // 去掉可能的 data:image/png;base64, 前缀
  if (b64.startsWith("data:")) {
    b64 = b64.split(",", 2)[1];
  }

  return { b64_json: b64, model_used: params.model };
}

/**
 * 调用图片生成 API，带 fallback：
 * 主令牌（image2Enterprise 企业分组，更便宜）负载饱和时，
 * 自动用备用令牌（OPENAI_API_KEY_FALLBACK = Default 分组）重试。
 * apiyi 的分组通过令牌绑定，不同 Key 对应不同分组。
 */
async function callImageAPI(params: {
  prompt: string;
  model: string;
  size?: string;
  quality?: string;
  referenceImageBase64?: string;
}): Promise<GenerateImageResult> {
  try {
    return await callImageAPIOnce(params);
  } catch (firstError: unknown) {
    const statusCode = (firstError as Error & { statusCode?: number }).statusCode || 0;
    const message = firstError instanceof Error ? firstError.message : "";

    const fallbackKey = process.env.OPENAI_API_KEY_FALLBACK;

    // 只有负载饱和类错误 + 配置了备用令牌才 fallback，内容审核/参数错误等不重试
    if (fallbackKey && isRetriableUpstreamError(statusCode, message)) {
      console.warn(`[Generate] Primary key overloaded (${statusCode}: ${message}), retrying with fallback key`);
      return await callImageAPIOnce(params, fallbackKey);
    }

    throw firstError;
  }
}

/**
 * 后台执行图片生成（在 after() 中运行，不阻塞 HTTP 响应）
 */
async function executeGeneration(params: {
  generationId: string;
  userId: string;
  promptText: string;
  qualityConfig: (typeof QUALITY_CONFIG)[QualityTier];
  referenceImageBase64?: string;
  creditsBalance: number;
}) {
  const { generationId, userId, promptText, qualityConfig, referenceImageBase64 } = params;

  try {
    // DEV MOCK
    const isMock = process.env.NODE_ENV === "development" && promptText.toLowerCase().includes("mock");

    let result: GenerateImageResult;
    if (isMock) {
      result = {
        b64_json: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
        model_used: "mock",
      };
    } else {
      result = await callImageAPI({
        prompt: promptText,
        model: qualityConfig.apiModel,
        size: qualityConfig.apiSize,
        quality: qualityConfig.apiQuality,
        referenceImageBase64,
      });
    }

    // 上传到 R2
    let imageUrl: string;
    if (process.env.NODE_ENV === "development") {
      imageUrl = `data:image/png;base64,${result.b64_json}`;
    } else {
      const fileName = `${generationId}.png`;
      imageUrl = await uploadToR2(result.b64_json, fileName);
    }

    // 标记成功
    await markGenerationSuccess(generationId, imageUrl);
    console.log(`[Generate] Success: ${generationId}`);
  } catch (apiError: unknown) {
    const errorMessage = apiError instanceof Error ? apiError.message : "Unknown error";
    const isTimeout = apiError instanceof Error && apiError.name === "TimeoutError";

    // 退回积分
    await refundCredits({
      userId,
      creditsCost: qualityConfig.credits,
      generationId,
      description: `Refund: generation failed -${qualityConfig.label}`,
    });

    await markGenerationFailed(generationId, errorMessage);
    console.error(`[Generate] Failed: ${generationId}, timeout=${isTimeout}, error=${errorMessage}`);
  }
}


export async function POST(request: NextRequest) {
  try {
    // 1. 验证 session（dev 模式下支持 X-Dev-Bypass header 跳过）
    let userId: string;
    const devBypass = process.env.NODE_ENV === "development" && request.headers.get("x-dev-bypass");
    
    if (devBypass) {
      const user = await getUserByEmail(devBypass);
      if (user.status === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      userId = user.user_id;
    } else {
      const session = await getServerSession(authOptions);
      if (!session?.user?.email) {
        return NextResponse.json({ error: "Please sign in to generate images" }, { status: 401 });
      }
      // 优先从 session token 中获取 user_id
      userId = (session.user as { user_id?: string }).user_id || "";
      if (!userId) {
        const user = await getUserByEmail(session.user.email);
        if (user.status === 0) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        userId = user.user_id;
      }
    }

    // 解析请求
    const body = await request.json();
    const { prompt_slug, prompt_text, quality, turnstile_token, reference_image } = body;

    // Diagnostic: log request payload size
    const refImgSize = reference_image ? Math.round((reference_image.length * 3) / 4 / 1024) : 0;
    console.log(`[Generate] prompt_len=${prompt_text?.length || 0}, ref_image_kb=${refImgSize}, quality=${quality}`);

    if (!prompt_text || !quality) {
      return NextResponse.json(
        { error: "Missing required fields: prompt_text, quality" },
        { status: 400 }
      );
    }

    // 验证 quality 值
    if (!QUALITY_CONFIG[quality as QualityTier]) {
      return NextResponse.json(
        { error: "Invalid quality. Must be fast, standard, hd, or ultra." },
        { status: 400 }
      );
    }

    // 2. 验证 Turnstile（防机器人）
    if (turnstile_token) {
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || undefined;
      const turnstileValid = await verifyTurnstile(turnstile_token, ip);
      if (!turnstileValid) {
        return NextResponse.json(
          { error: "Verification failed. Please try again." },
          { status: 403 }
        );
      }
    } else if (process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        { error: "Turnstile token required" },
        { status: 400 }
      );
    }

    // 3. 检查用户权限
    const credits = await getUserCredits(userId);
    if (!credits) {
      return NextResponse.json({ error: "Credits not found" }, { status: 404 });
    }

    const effectiveMembership = getEffectiveMembership(
      credits.membership,
      credits.membership_expires_at
    );

    const qualityTier = quality as QualityTier;
    const qualityConfig = QUALITY_CONFIG[qualityTier];

    // 3a. 会员等级是否允许该质量档位
    if (!canUseQuality(effectiveMembership, qualityTier)) {
      return NextResponse.json(
        {
          error: `${qualityConfig.label} quality requires ${qualityConfig.minMembership} plan or above.`,
          required_plan: qualityConfig.minMembership,
        },
        { status: 403 }
      );
    }

    // 3b. 积分余额是否充足
    if (credits.balance < qualityConfig.credits) {
      return NextResponse.json(
        {
          error: `Insufficient credits. Need ${qualityConfig.credits}, have ${credits.balance}.`,
          credits_needed: qualityConfig.credits,
          credits_balance: credits.balance,
        },
        { status: 402 }
      );
    }

    // 3c. 今日生成次数是否超限
    const dailyRemaining = await getDailyRemaining(userId);
    if (dailyRemaining <= 0) {
      return NextResponse.json(
        { error: "Daily generation limit reached. Please try again tomorrow." },
        { status: 429 }
      );
    }

    // 4. 准备生成
    const generationId = crypto.randomUUID();

    // 5. 先扣积分（乐观扣减）+ 创建 generation 记录
    await consumeCredits({
      userId,
      creditsCost: qualityConfig.credits,
      generationId,
      description: `Generate image (${qualityConfig.label}) -${qualityConfig.credits} credits`,
    });

    await createGeneration({
      generationId,
      userId,
      promptSlug: prompt_slug || null,
      promptText: prompt_text,
      quality: qualityTier,
      creditsCost: qualityConfig.credits,
      apiModel: qualityConfig.apiModel,
      apiSize: qualityConfig.apiSize,
    });

    // 6. 处理参考图
    let referenceImageBase64: string | undefined;
    if (reference_image && typeof reference_image === "string") {
      if (reference_image.startsWith("data:")) {
        referenceImageBase64 = reference_image.split(",", 2)[1];
      } else {
        referenceImageBase64 = reference_image;
      }
    }

    // 7. 用 after() 在后台执行图片生成，立即返回 generation_id
    //    after() 在 response 发送后继续执行，Vercel 会保持函数运行直到 maxDuration。
    //    前端通过轮询 /api/generate/status 获取结果。
    after(
      executeGeneration({
        generationId,
        userId,
        promptText: prompt_text,
        qualityConfig,
        referenceImageBase64,
        creditsBalance: credits.balance,
      })
    );

    // 立即返回（< 2 秒），Cloudflare 不会超时
    return NextResponse.json({
      generation_id: generationId,
      status: "pending",
      credits_cost: qualityConfig.credits,
      credits_remaining: credits.balance - qualityConfig.credits,
    });
  } catch (error) {
    console.error("[POST /api/generate] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
