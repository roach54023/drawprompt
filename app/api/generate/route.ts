/**
 * DrawPrompts — POST /api/generate
 * 核心接口：图片生成
 * 流程：验证 → 检查权限 → 扣积分 → 调 API → 上传 R2 → 返回结果
 */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
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
 * 直接调用 OpenAI 兼容 API 生成图片（使用 fetch）
 */
async function callImageAPI(params: {
  prompt: string;
  model: string;
  size?: string;
  quality?: string;
  referenceImageBase64?: string;
}): Promise<GenerateImageResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  const baseUrl = process.env.OPENAI_API_BASE_URL || "https://api.apiyi.com";
  const isEdit = !!params.referenceImageBase64;
  const url = isEdit
    ? `${baseUrl}/v1/images/edits`
    : `${baseUrl}/v1/images/generations`;

  console.log(`[Generate] API call: mode=${isEdit ? "edit" : "generate"}, model="${params.model}", size="${params.size}", quality="${params.quality}"`);

  let response: Response;

  if (isEdit) {
    // 图生图：使用 multipart/form-data
    const formData = new FormData();
    formData.append("model", params.model);
    formData.append("prompt", params.prompt);
    formData.append("n", "1");
    formData.append("response_format", "b64_json");
    if (params.size) formData.append("size", params.size);
    if (params.quality) formData.append("quality", params.quality);

    // 将 base64 转为 Blob 作为 image 字段（使用 Web API，兼容 Edge Runtime）
    const binaryStr = atob(params.referenceImageBase64!);
    const imageBytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      imageBytes[i] = binaryStr.charCodeAt(i);
    }
    const imageBlob = new Blob([imageBytes], { type: "image/png" });
    formData.append("image", imageBlob, "reference.png");

    response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });
  } else {
    // 文生图：使用 JSON body
    const body = {
      model: params.model,
      prompt: params.prompt,
      n: 1,
      response_format: "b64_json",
      ...(params.size ? { size: params.size } : {}),
      ...(params.quality ? { quality: params.quality } : {}),
    };

    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `API returned status ${response.status}`;
    try {
      const error = JSON.parse(errorText);
      errorMessage = error.error?.message || errorMessage;
    } catch {}
    console.error(`[Generate] API Error: ${errorMessage}`);
    throw new Error(errorMessage);
  }

  const data = await response.json();
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


export async function POST(request: NextRequest) {
  try {
    // 1. 验证 session（dev 模式下支持 X-Dev-Bypass header 跳过）
    let userEmail: string;
    const devBypass = process.env.NODE_ENV === "development" && request.headers.get("x-dev-bypass");
    
    if (devBypass) {
      userEmail = devBypass;
    } else {
      const session = await getServerSession();
      if (!session?.user?.email) {
        return NextResponse.json({ error: "Please sign in to generate images" }, { status: 401 });
      }
      userEmail = session.user.email;
    }

    const user = await getUserByEmail(userEmail);
    if (user.status === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 解析请求
    const body = await request.json();
    const { prompt_slug, prompt_text, quality, turnstile_token, reference_image } = body;

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
    const credits = await getUserCredits(user.user_id);
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
    const dailyRemaining = await getDailyRemaining(user.user_id);
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
      userId: user.user_id,
      creditsCost: qualityConfig.credits,
      generationId,
      description: `Generate image (${qualityConfig.label}) -${qualityConfig.credits} credits`,
    });

    await createGeneration({
      generationId,
      userId: user.user_id,
      promptSlug: prompt_slug || null,
      promptText: prompt_text,
      quality: qualityTier,
      creditsCost: qualityConfig.credits,
      apiModel: qualityConfig.apiModel,
      apiQuality: qualityConfig.apiQuality,
    });

    // 6. 调用 GPT Image API
    try {
      // DEV MOCK: prompt 包含 "mock" 时跳过真实 API 调用，返回测试图片
      const isMock = process.env.NODE_ENV === "development" && prompt_text.toLowerCase().includes("mock");
      
      // 处理参考图：提取纯 base64（去除 data:image/...;base64, 前缀）
      let referenceImageBase64: string | undefined;
      if (reference_image && typeof reference_image === "string") {
        if (reference_image.startsWith("data:")) {
          referenceImageBase64 = reference_image.split(",", 2)[1];
        } else {
          referenceImageBase64 = reference_image;
        }
      }

      let result: GenerateImageResult;
      if (isMock) {
        result = {
          b64_json: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
          model_used: "mock",
        };
      } else {
        result = await callImageAPI({
          prompt: prompt_text,
          model: qualityConfig.apiModel,
          size: qualityConfig.apiSize,
          quality: qualityConfig.apiQuality,
          referenceImageBase64,
        });
      }

      // 7. 上传到 R2（dev 模式下跳过，直接用 base64 data URL）
      let imageUrl: string;
      if (process.env.NODE_ENV === "development") {
        imageUrl = `data:image/png;base64,${result.b64_json}`;
      } else {
        const fileName = `${generationId}.png`;
        imageUrl = await uploadToR2(result.b64_json, fileName);
      }

      // 8. 标记成功
      await markGenerationSuccess(generationId, imageUrl);

      return NextResponse.json({
        generation_id: generationId,
        image_url: imageUrl,
        credits_cost: qualityConfig.credits,
        credits_remaining: credits.balance - qualityConfig.credits,
        model_used: result.model_used,
      });
    } catch (apiError: unknown) {
      // API 调用失败 - 退回积分
      const errorMessage = apiError instanceof Error ? apiError.message : "Unknown error";

      await refundCredits({
        userId: user.user_id,
        creditsCost: qualityConfig.credits,
        generationId,
        description: `Refund: generation failed -${qualityConfig.label}`,
      });

      await markGenerationFailed(generationId, errorMessage);

      console.error("[Generate API] Image generation failed:", errorMessage);
      return NextResponse.json(
        {
          error: "Image generation failed. Credits have been refunded.",
          details: errorMessage,
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("[POST /api/generate] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
