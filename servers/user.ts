/**
 * DrawPrompts — 用户服务层
 * 用户创建/查询/更新（Cloudflare D1 版）
 */
import { getDb } from "@/lib/db";

/**
 * 检查用户是否存在，不存在则创建，存在则更新登录信息
 * 同时创建 user_credits 记录并赠送免费积分
 */
export async function checkAndSaveUser(
  name: string,
  email: string,
  image: string,
  lastLoginIp: string | null
) {
  const db = getDb();

  const existing = await db
    .prepare(`SELECT * FROM user_info WHERE email = ?`)
    .bind(email)
    .first<Record<string, unknown>>();

  if (!existing) {
    // 新用户 - 生成 UUID
    const userId = crypto.randomUUID();
    const freeCredits = Number(process.env.FREE_CREDITS) || 5;

    // 使用 batch 保证原子性
    await db.batch([
      db
        .prepare(
          `INSERT INTO user_info(user_id, name, email, image, last_login_ip)
           VALUES(?, ?, ?, ?, ?)`
        )
        .bind(userId, name, email, image, lastLoginIp),
      db
        .prepare(
          `INSERT INTO user_credits(user_id, balance, total_purchased, total_consumed, membership)
           VALUES(?, ?, 0, 0, 'free')`
        )
        .bind(userId, freeCredits),
      db
        .prepare(
          `INSERT INTO credit_transactions(user_id, type, amount, balance_before, balance_after, description)
           VALUES(?, 'gift', ?, 0, ?, ?)`
        )
        .bind(userId, freeCredits, freeCredits, `Welcome gift: +${freeCredits} credits`),
    ]);

    return { user_id: userId, name, email, image };
  } else {
    // 已存在用户 - 更新登录信息
    await db
      .prepare(
        `UPDATE user_info SET name = ?, image = ?, last_login_ip = ?, updated_at = datetime('now')
         WHERE id = ?`
      )
      .bind(name, image, lastLoginIp, existing.id)
      .run();

    return {
      user_id: existing.user_id as string,
      name: existing.name as string,
      email: existing.email as string,
      image: existing.image as string,
    };
  }
}

/**
 * 通过 email 获取用户信息
 */
export async function getUserByEmail(email: string) {
  const db = getDb();
  const user = await db
    .prepare(`SELECT * FROM user_info WHERE email = ?`)
    .bind(email)
    .first<Record<string, unknown>>();

  if (user) {
    return {
      user_id: user.user_id as string,
      name: user.name as string,
      email: user.email as string,
      image: user.image as string,
      status: 1,
    };
  }
  return {
    user_id: "",
    name: "",
    email: email,
    image: "",
    status: 0,
  };
}

/**
 * 通过 user_id 获取用户信息
 */
export async function getUserById(userId: string) {
  const db = getDb();
  const user = await db
    .prepare(`SELECT * FROM user_info WHERE user_id = ?`)
    .bind(userId)
    .first<Record<string, unknown>>();

  if (user) {
    return {
      user_id: user.user_id as string,
      name: user.name as string,
      email: user.email as string,
      image: user.image as string,
      status: 1,
    };
  }
  return { user_id: userId, name: "", email: "", image: "", status: 0 };
}
