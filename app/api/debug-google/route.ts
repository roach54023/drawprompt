/**
 * 临时诊断接口：测试 Vercel serverless 到 Google 各端点的连通性
 * 部署后访问 https://drawprompt.org/api/debug-google 查看结果
 * 排查完毕后删除此文件
 */
import { NextResponse } from "next/server";

export const maxDuration = 30;

async function testEndpoint(url: string, timeout = 10000) {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(timeout),
    });
    return {
      url,
      status: res.status,
      ok: res.ok,
      timeMs: Date.now() - start,
    };
  } catch (err: unknown) {
    return {
      url,
      error: err instanceof Error ? err.message : String(err),
      timeMs: Date.now() - start,
    };
  }
}

export async function GET() {
  const baseUrl = process.env.OPENAI_API_BASE_URL || "https://api.apiyi.com";
  const apiKey = process.env.OPENAI_API_KEY || "";

  // 实际调用图片生成 API（用一个最小 prompt）
  let generateResult: Record<string, unknown>;
  const genStart = Date.now();
  try {
    const res = await fetch(`${baseUrl}/v1/images/generations`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: "a white dot on black background",
        n: 1,
        size: "1024x1024",
        quality: "low",
      }),
      signal: AbortSignal.timeout(30000),
    });

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("json")) {
      const body = await res.json();
      generateResult = {
        status: res.status,
        ok: res.ok,
        contentType,
        timeMs: Date.now() - genStart,
        body: JSON.stringify(body).substring(0, 500),
      };
    } else {
      const text = await res.text();
      generateResult = {
        status: res.status,
        ok: res.ok,
        contentType,
        timeMs: Date.now() - genStart,
        bodyPreview: text.substring(0, 300),
      };
    }
  } catch (err: unknown) {
    generateResult = {
      error: err instanceof Error ? err.message : String(err),
      timeMs: Date.now() - genStart,
    };
  }

  // 也测试 models 列表
  const modelsResult = await testEndpointWithAuth(`${baseUrl}/v1/models`, apiKey);

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    region: process.env.VERCEL_REGION || "unknown",
    apiBaseUrl: baseUrl,
    apiKeyPrefix: apiKey.substring(0, 8) + "...",
    generateTest: generateResult,
    modelsTest: modelsResult,
  });
}

async function testEndpointWithAuth(url: string, apiKey: string, timeout = 10000) {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      headers: { "Authorization": `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(timeout),
    });
    const contentType = res.headers.get("content-type") || "";
    let body: unknown = null;
    if (contentType.includes("json")) {
      body = await res.json();
    } else {
      const text = await res.text();
      body = text.substring(0, 200);
    }
    return {
      url,
      status: res.status,
      ok: res.ok,
      contentType,
      timeMs: Date.now() - start,
      body,
    };
  } catch (err: unknown) {
    return {
      url,
      error: err instanceof Error ? err.message : String(err),
      timeMs: Date.now() - start,
    };
  }
}
