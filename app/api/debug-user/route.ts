/**
 * 临时诊断接口：查看用户数据库状态
 * 访问 https://drawprompt.org/api/debug-user?email=roach54023@gmail.com
 * 排查完毕后删除此文件
 */
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const maxDuration = 30;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "email param required" }, { status: 400 });
  }

  const db = getDb();

  // 查用户
  const user = await db
    .prepare("SELECT * FROM user_info WHERE email = ?")
    .bind(email)
    .first<Record<string, unknown>>();

  if (!user) {
    return NextResponse.json({ error: "User not found", email });
  }

  const userId = user.user_id as string;

  // 查积分
  const credits = await db
    .prepare("SELECT * FROM user_credits WHERE user_id = ?")
    .bind(userId)
    .first<Record<string, unknown>>();

  // 查最近的积分流水
  const transactions = await db
    .prepare(
      "SELECT * FROM credit_transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 10"
    )
    .bind(userId)
    .all<Record<string, unknown>>();

  // 查最近的生成记录
  const generations = await db
    .prepare(
      "SELECT generation_id, status, credits_cost, error_message, created_at FROM generations WHERE user_id = ? ORDER BY created_at DESC LIMIT 10"
    )
    .bind(userId)
    .all<Record<string, unknown>>();

  return NextResponse.json({
    user,
    credits,
    recent_transactions: transactions.results,
    recent_generations: generations.results,
  });
}
