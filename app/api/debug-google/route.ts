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
  const results = await Promise.all([
    // 1. Google OAuth token endpoint (OAuth flow 中 exchange code 用的)
    testEndpoint("https://oauth2.googleapis.com/token"),
    // 2. Google userinfo endpoint
    testEndpoint("https://openidconnect.googleapis.com/v1/userinfo"),
    // 3. Google tokeninfo endpoint (One Tap 验证用的)
    testEndpoint("https://oauth2.googleapis.com/tokeninfo"),
    // 4. Google OIDC discovery (next-auth 自动发现用的)
    testEndpoint("https://accounts.google.com/.well-known/openid-configuration"),
    // 5. Turso database connectivity
    testEndpoint(process.env.TURSO_DATABASE_URL?.replace("libsql://", "https://") || "https://example.com"),
  ]);

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    region: process.env.VERCEL_REGION || "unknown",
    results,
  });
}
