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

  const results = await Promise.all([
    // 1. Google OAuth token endpoint
    testEndpoint("https://oauth2.googleapis.com/token"),
    // 2. Google OIDC discovery
    testEndpoint("https://accounts.google.com/.well-known/openid-configuration"),
    // 3. Turso database connectivity
    testEndpoint(process.env.TURSO_DATABASE_URL?.replace("libsql://", "https://") || "https://example.com"),
    // 4. APIYi base URL (图片生成中转)
    testEndpoint(baseUrl),
    // 5. APIYi models endpoint (测试 API key 是否有效)
    testEndpointWithAuth(`${baseUrl}/v1/models`, process.env.OPENAI_API_KEY || ""),
  ]);

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    region: process.env.VERCEL_REGION || "unknown",
    apiBaseUrl: baseUrl,
    results,
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
