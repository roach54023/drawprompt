/**
 * 临时诊断端点：检查环境变量和模块加载
 * GET /api/debug
 * ⚠️ 上线前删除
 */
import { NextResponse } from "next/server";

export async function GET() {
  const checks: Record<string, string> = {};

  // 检查环境变量是否存在（不暴露值）
  checks.TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL ? "SET" : "MISSING";
  checks.TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN ? "SET" : "MISSING";
  checks.OPENAI_API_KEY = process.env.OPENAI_API_KEY ? "SET" : "MISSING";
  checks.OPENAI_API_BASE_URL = process.env.OPENAI_API_BASE_URL ? "SET" : "MISSING";
  checks.R2_ENDPOINT = process.env.R2_ENDPOINT ? "SET" : "MISSING";
  checks.R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID ? "SET" : "MISSING";
  checks.R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY ? "SET" : "MISSING";
  checks.R2_BUCKET = process.env.R2_BUCKET ? "SET" : "MISSING";
  checks.NEXT_PUBLIC_STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL ? "SET" : "MISSING";
  checks.TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY ? "SET" : "MISSING";
  checks.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ? "SET" : "MISSING";
  checks.NODE_ENV = process.env.NODE_ENV || "undefined";

  // 检查 libsql 模块是否可导入
  let dbStatus = "unknown";
  try {
    const { createClient } = await import("@libsql/client");
    if (process.env.TURSO_DATABASE_URL) {
      const client = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
      });
      // 简单查询测试
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
