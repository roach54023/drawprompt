/**
 * DrawPrompts — 积分服务层
 * 积分余额查询、扣减、充值、退回（Cloudflare D1 版）
 *
 * D1 的事务通过 batch() 实现（同一 batch 内的语句原子执行）。
 * 对于需要读后写的场景，使用两步操作：先读取，再 batch 写入。
 * D1 是单写者模型，不存在并发写冲突（串行化隔离级别）。
 */
import { getDb } from "@/lib/db";
import {
  DAILY_LIMITS,
  getEffectiveMembership,
  type MembershipType,
} from "@/lib/qualityConfig";

export interface UserCreditsInfo {
  balance: number;
  total_purchased: number;
  total_consumed: number;
  membership: MembershipType;
  membership_expires_at: string | null;
}

/**
 * 获取用户积分余额和会员状态
 */
export async function getUserCredits(userId: string): Promise<UserCreditsInfo | null> {
  const db = getDb();
  const row = await db
    .prepare(
      `SELECT balance, total_purchased, total_consumed, membership, membership_expires_at
       FROM user_credits WHERE user_id = ?`
    )
    .bind(userId)
    .first<Record<string, unknown>>();

  if (!row) return null;
  return {
    balance: row.balance as number,
    total_purchased: row.total_purchased as number,
    total_consumed: row.total_consumed as number,
    membership: row.membership as MembershipType,
    membership_expires_at: (row.membership_expires_at as string) || null,
  };
}

/**
 * 获取用户今日生成次数
 */
export async function getTodayGenerationCount(userId: string): Promise<number> {
  const db = getDb();
  const row = await db
    .prepare(
      `SELECT COUNT(*) as count FROM generations
       WHERE user_id = ? AND created_at >= date('now')`
    )
    .bind(userId)
    .first<{ count: number }>();
  return row?.count ?? 0;
}

/**
 * 获取用户今日剩余生成次数
 */
export async function getDailyRemaining(userId: string): Promise<number> {
  const credits = await getUserCredits(userId);
  if (!credits) return 0;

  const effectiveMembership = getEffectiveMembership(
    credits.membership,
    credits.membership_expires_at
  );
  const dailyLimit = DAILY_LIMITS[effectiveMembership];
  const todayCount = await getTodayGenerationCount(userId);
  return Math.max(0, dailyLimit - todayCount);
}

/**
 * 消费积分（乐观扣减）
 * D1 是串行化的，不需要 SELECT FOR UPDATE
 */
export async function consumeCredits(params: {
  userId: string;
  creditsCost: number;
  generationId: string;
  description: string;
}): Promise<void> {
  const db = getDb();

  // 先读取当前余额
  const row = await db
    .prepare(`SELECT balance FROM user_credits WHERE user_id = ?`)
    .bind(params.userId)
    .first<{ balance: number }>();

  if (!row) {
    throw new Error("User credits record not found");
  }
  if (row.balance < params.creditsCost) {
    throw new Error("Insufficient credits");
  }

  const currentBalance = row.balance;
  const newBalance = currentBalance - params.creditsCost;

  // batch 保证原子性
  await db.batch([
    db
      .prepare(
        `UPDATE user_credits
         SET balance = ?, total_consumed = total_consumed + ?, updated_at = datetime('now')
         WHERE user_id = ?`
      )
      .bind(newBalance, params.creditsCost, params.userId),
    db
      .prepare(
        `INSERT INTO credit_transactions(user_id, type, amount, balance_before, balance_after, generation_id, description)
         VALUES(?, 'consume', ?, ?, ?, ?, ?)`
      )
      .bind(
        params.userId,
        -params.creditsCost,
        currentBalance,
        newBalance,
        params.generationId,
        params.description
      ),
  ]);
}

/**
 * 退回积分（API 调用失败时）
 */
export async function refundCredits(params: {
  userId: string;
  creditsCost: number;
  generationId: string;
  description: string;
}): Promise<void> {
  const db = getDb();

  const row = await db
    .prepare(`SELECT balance FROM user_credits WHERE user_id = ?`)
    .bind(params.userId)
    .first<{ balance: number }>();

  if (!row) {
    throw new Error("User credits record not found");
  }

  const currentBalance = row.balance;
  const newBalance = currentBalance + params.creditsCost;

  await db.batch([
    db
      .prepare(
        `UPDATE user_credits
         SET balance = ?, total_consumed = total_consumed - ?, updated_at = datetime('now')
         WHERE user_id = ?`
      )
      .bind(newBalance, params.creditsCost, params.userId),
    db
      .prepare(
        `INSERT INTO credit_transactions(user_id, type, amount, balance_before, balance_after, generation_id, description)
         VALUES(?, 'refund', ?, ?, ?, ?, ?)`
      )
      .bind(
        params.userId,
        params.creditsCost,
        currentBalance,
        newBalance,
        params.generationId,
        params.description
      ),
  ]);
}

/**
 * 充值积分（支付成功后）
 * 同时更新会员等级和到期时间
 */
export async function rechargeCredits(params: {
  userId: string;
  credits: number;
  orderId: string;
  plan: MembershipType;
  membershipDays: number;
  description: string;
}): Promise<{ newBalance: number; membershipExpiresAt: string }> {
  const db = getDb();

  const row = await db
    .prepare(`SELECT balance, membership_expires_at FROM user_credits WHERE user_id = ?`)
    .bind(params.userId)
    .first<{ balance: number; membership_expires_at: string | null }>();

  if (!row) {
    throw new Error("User credits record not found");
  }

  const currentBalance = row.balance;
  const currentExpiry = row.membership_expires_at;
  const newBalance = currentBalance + params.credits;

  // 计算新的会员到期时间（如果当前未过期则累加）
  const now = new Date();
  const baseDate =
    currentExpiry && new Date(currentExpiry) > now
      ? new Date(currentExpiry)
      : now;
  const newExpiry = new Date(baseDate);
  newExpiry.setDate(newExpiry.getDate() + params.membershipDays);
  const expiryStr = newExpiry.toISOString();

  await db.batch([
    db
      .prepare(
        `UPDATE user_credits
         SET balance = ?, total_purchased = total_purchased + ?,
             membership = ?, membership_expires_at = ?, updated_at = datetime('now')
         WHERE user_id = ?`
      )
      .bind(newBalance, params.credits, params.plan, expiryStr, params.userId),
    db
      .prepare(
        `INSERT INTO credit_transactions(user_id, type, amount, balance_before, balance_after, order_id, description)
         VALUES(?, 'recharge', ?, ?, ?, ?, ?)`
      )
      .bind(
        params.userId,
        params.credits,
        currentBalance,
        newBalance,
        params.orderId,
        params.description
      ),
  ]);

  return {
    newBalance,
    membershipExpiresAt: expiryStr,
  };
}

/**
 * 获取积分流水（分页）
 */
export async function getCreditTransactions(
  userId: string,
  page: number = 1,
  limit: number = 20
) {
  const db = getDb();
  const offset = (page - 1) * limit;

  const [dataResult, countResult] = await Promise.all([
    db
      .prepare(
        `SELECT type, amount, balance_after, description, created_at
         FROM credit_transactions
         WHERE user_id = ?
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?`
      )
      .bind(userId, limit, offset)
      .all<Record<string, unknown>>(),
    db
      .prepare(
        `SELECT COUNT(*) as total FROM credit_transactions WHERE user_id = ?`
      )
      .bind(userId)
      .first<{ total: number }>(),
  ]);

  return {
    transactions: dataResult.results.map((row) => ({
      type: row.type as string,
      amount: row.amount as number,
      balance_after: row.balance_after as number,
      description: row.description as string,
      created_at: row.created_at as string,
    })),
    total: countResult?.total ?? 0,
    page,
    limit,
  };
}
