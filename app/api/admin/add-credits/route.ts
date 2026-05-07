/**
 * 临时管理接口：给当前登录用户加积分
 * GET /api/admin/add-credits?amount=10
 * 需要已登录，默认加 1 积分
 *
 * ⚠️ 生产环境上线前请删除此文件
 */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/servers/user";
import { getDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = await getUserByEmail(session.user.email);
  if (!user || !user.user_id) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const amount = Number(req.nextUrl.searchParams.get("amount")) || 1;

  const db = getDb();

  // 获取当前余额
  const row = await db
    .prepare(`SELECT balance FROM user_credits WHERE user_id = ?`)
    .bind(user.user_id)
    .first<{ balance: number }>();

  if (!row) {
    return NextResponse.json({ error: "Credits record not found" }, { status: 404 });
  }

  const currentBalance = row.balance;
  const newBalance = currentBalance + amount;

  // 更新余额并记录流水
  await db.batch([
    db
      .prepare(
        `UPDATE user_credits SET balance = ?, total_purchased = total_purchased + ?, updated_at = datetime('now') WHERE user_id = ?`
      )
      .bind(newBalance, amount, user.user_id),
    db
      .prepare(
        `INSERT INTO credit_transactions(user_id, type, amount, balance_before, balance_after, description)
         VALUES(?, 'gift', ?, ?, ?, ?)`
      )
      .bind(user.user_id, amount, currentBalance, newBalance, `Admin gift: +${amount} credits`),
  ]);

  return NextResponse.json({
    success: true,
    email: session.user.email,
    previous_balance: currentBalance,
    added: amount,
    new_balance: newBalance,
  });
}
