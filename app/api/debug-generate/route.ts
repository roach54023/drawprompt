/**
 * 临时诊断：模拟完整 generate 流程（跳过 auth/turnstile）
 * 定位 502 到底来自哪个环节
 */
export const maxDuration = 300;

import { NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/R2";

export async function GET() {
  const steps: Record<string, unknown> = {};
  const totalStart = Date.now();

  // Step 1: 配置检查
  const apiKey = process.env.OPENAI_API_KEY;
  const baseUrl = process.env.OPENAI_API_BASE_URL || "https://api.apiyi.com";

  steps["1_config"] = {
    baseUrl,
    apiKeyPrefix: apiKey?.substring(0, 8) + "...",
    hasR2Endpoint: !!process.env.R2_ENDPOINT,
    hasR2Key: !!process.env.R2_ACCESS_KEY_ID,
    hasR2Bucket: !!process.env.R2_BUCKET,
    hasStorageUrl: !!process.env.NEXT_PUBLIC_STORAGE_URL,
  };

  let b64 = "";

  // Step 2: 调用 apiyi 图片生成
  try {
    const genStart = Date.now();
    const res = await fetch(`${baseUrl}/v1/images/generations`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt: "a simple red circle on white background",
        n: 1,
        size: "1024x1024",
        quality: "low",
      }),
      signal: AbortSignal.timeout(180000),
    });

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("json")) {
      const text = await res.text();
      steps["2_api_call"] = {
        status: res.status,
        contentType,
        timeMs: Date.now() - genStart,
        error: "Non-JSON response",
        bodyPreview: text.substring(0, 500),
      };
      return NextResponse.json({ steps, totalMs: Date.now() - totalStart });
    }

    const data = await res.json();
    if (!res.ok) {
      steps["2_api_call"] = {
        status: res.status,
        timeMs: Date.now() - genStart,
        error: data?.error?.message || JSON.stringify(data).substring(0, 300),
      };
      return NextResponse.json({ steps, totalMs: Date.now() - totalStart });
    }

    const item = data.data?.[0] || {};
    b64 = item.b64_json || "";
    const imageUrl = item.url || "";

    if (b64.startsWith("data:")) {
      b64 = b64.split(",", 2)[1];
    }

    steps["2_api_call"] = {
      status: 200,
      timeMs: Date.now() - genStart,
      b64Length: b64.length,
      hasUrl: !!imageUrl,
      urlPreview: imageUrl ? imageUrl.substring(0, 100) : null,
      responseKeys: Object.keys(item),
      success: true,
    };
  } catch (err: unknown) {
    steps["2_api_call"] = {
      error: err instanceof Error ? err.message : String(err),
      timeMs: Date.now() - totalStart,
    };
    return NextResponse.json({ steps, totalMs: Date.now() - totalStart });
  }

  // Step 3: 上传到 R2
  try {
    const r2Start = Date.now();
    const fileName = `debug-test-${Date.now()}.png`;
    const imageUrl = await uploadToR2(b64, fileName);
    steps["3_r2_upload"] = {
      timeMs: Date.now() - r2Start,
      imageUrl,
      success: true,
    };
  } catch (err: unknown) {
    steps["3_r2_upload"] = {
      error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
      timeMs: Date.now() - totalStart,
    };
    return NextResponse.json({ steps, totalMs: Date.now() - totalStart });
  }

  return NextResponse.json({
    steps,
    totalMs: Date.now() - totalStart,
    conclusion: "All steps passed!",
  });
}
