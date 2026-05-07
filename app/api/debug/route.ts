/**
 * 临时诊断端点
 * GET /api/debug — 检查环境变量和数据库
 * GET /api/debug?test=image — 测试图片生成 API 调用
 * ⚠️ 上线前删除
 */
export const maxDuration = 300;

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const testType = req.nextUrl.searchParams.get("test");

  if (testType === "image") {
    return testImageAPI();
  }

  // 默认：环境检查
  const checks: Record<string, string> = {};
  checks.TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL ? "SET" : "MISSING";
  checks.TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN ? "SET" : "MISSING";
  checks.OPENAI_API_KEY = process.env.OPENAI_API_KEY ? "SET" : "MISSING";
  checks.OPENAI_API_BASE_URL = process.env.OPENAI_API_BASE_URL || "NOT SET (will use default)";
  checks.R2_ENDPOINT = process.env.R2_ENDPOINT ? "SET" : "MISSING";
  checks.R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID ? "SET" : "MISSING";
  checks.R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY ? "SET" : "MISSING";
  checks.R2_BUCKET = process.env.R2_BUCKET ? "SET" : "MISSING";
  checks.NEXT_PUBLIC_STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL ? "SET" : "MISSING";
  checks.TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY ? "SET" : "MISSING";
  checks.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ? "SET" : "MISSING";
  checks.NODE_ENV = process.env.NODE_ENV || "undefined";

  let dbStatus = "unknown";
  try {
    const { createClient } = await import("@libsql/client");
    if (process.env.TURSO_DATABASE_URL) {
      const client = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
      });
      const result = await client.execute("SELECT 1 as test");
      dbStatus = `OK (rows: ${result.rows.length})`;
    } else {
      dbStatus = "SKIPPED (no URL)";
    }
  } catch (err) {
    dbStatus = `ERROR: ${err instanceof Error ? err.message : String(err)}`;
  }

  return NextResponse.json({
    status: "ok",
    env: checks,
    db: dbStatus,
    timestamp: new Date().toISOString(),
  });
}

/**
 * 测试图片 API 调用（使用最简单的参数）
 */
async function testImageAPI() {
  const apiKey = process.env.OPENAI_API_KEY;
  const baseUrl = process.env.OPENAI_API_BASE_URL || "https://api.apiyi.com";
  const url = `${baseUrl}/v1/images/generations`;

  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY not set" }, { status: 500 });
  }

  const requestBody = {
    model: "gpt-image-2",
    prompt: "A simple red circle on white background",
    n: 1,
    size: "1024x1024",
    quality: "low",
    response_format: "b64_json",
  };

  const startTime = Date.now();

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(290000),
    });

    const elapsed = Date.now() - startTime;
    const responseText = await res.text();

    // 尝试解析 JSON
    let responseData: unknown = null;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      // 不是 JSON
    }

    if (!res.ok) {
      return NextResponse.json({
        error: "API call failed",
        status: res.status,
        statusText: res.statusText,
        elapsed_ms: elapsed,
        api_url: url,
        api_key_prefix: apiKey.substring(0, 8) + "...",
        request_body: requestBody,
        response_body: responseData || responseText.substring(0, 500),
      });
    }

    // 成功 - 返回元信息（不返回完整 base64）
    const data = responseData as { data?: Array<{ b64_json?: string }> };
    const hasImage = !!(data?.data?.[0]?.b64_json);
    const imageSize = data?.data?.[0]?.b64_json?.length || 0;

    return NextResponse.json({
      success: true,
      elapsed_ms: elapsed,
      api_url: url,
      has_image: hasImage,
      image_base64_length: imageSize,
      message: hasImage ? "Image generated successfully!" : "No image in response",
    });
  } catch (err) {
    const elapsed = Date.now() - startTime;
    return NextResponse.json({
      error: "Fetch failed",
      elapsed_ms: elapsed,
      api_url: url,
      api_key_prefix: apiKey.substring(0, 8) + "...",
      details: err instanceof Error ? err.message : String(err),
      request_body: requestBody,
    });
  }
}
