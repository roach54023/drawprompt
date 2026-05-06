/**
 * DrawPrompts — 订阅服务层
 * 订阅的创建、激活、续费积分发放、取消
 */
import { getDb } from "@/lib/db";
import { PLANS, type PlanType } from "@/lib/qualityConfig";
import { rechargeCredits } from "@/servers/credits";

export interface Subscription {
  id: number;
  user_id: string;
  paypal_subscription_id: string;
  plan: PlanType;
  status: "pending" | "active" | "cancelled" | "suspended" | "expired";
  credits_per_cycle: number;
  price_usd: number;
  current_period_start: string | null;
  current_period_end: string | null;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * 创建订阅记录（用户发起订阅后、PayPal approve 前）
 */
export async function createSubscriptionRecord(params: {
  userId: string;
  paypalSubscriptionId: string;
  plan: PlanType;
}): Promise<void> {
  const db = getDb();
  const planConfig = PLANS[params.plan];

  await db
    .prepare(
      `INSERT INTO subscriptions(user_id, paypal_subscription_id, plan, status, credits_per_cycle, price_usd)
       VALUES(?, ?, ?, 'pending', ?, ?)`
    )
    .bind(
      params.userId,
      params.paypalSubscriptionId,
      params.plan,
      planConfig.credits,
      planConfig.price
    )
    .run();
}

/**
 * 激活订阅（用户 approve 后 或 Webhook BILLING.SUBSCRIPTION.ACTIVATED）
 */
export async function activateSubscription(params: {
  paypalSubscriptionId: string;
  periodStart?: string;
  periodEnd?: string;
}): Promise<Subscription | null> {
  const db = getDb();

  const now = new Date().toISOString();
  const periodEnd =
    params.periodEnd ||
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  await db
    .prepare(
      `UPDATE subscriptions
       SET status = 'active',
           current_period_start = ?,
           current_period_end = ?,
           updated_at = datetime('now')
       WHERE paypal_subscription_id = ? AND status IN ('pending', 'suspended')`
    )
    .bind(params.periodStart || now, periodEnd, params.paypalSubscriptionId)
    .run();

  return getSubscriptionByPaypalId(params.paypalSubscriptionId);
}

/**
 * 订阅续费（Webhook PAYMENT.SALE.COMPLETED）
 * 1. 记录付款 2. 充值积分 3. 延长会员
 */
export async function processSubscriptionPayment(params: {
  paypalSubscriptionId: string;
  paypalPaymentId: string;
  amountUsd: number;
  billingPeriodStart?: string;
  billingPeriodEnd?: string;
}): Promise<{ success: boolean; reason?: string }> {
  const db = getDb();

  // 幂等检查
  const existing = await db
    .prepare(
      `SELECT id FROM subscription_payments WHERE paypal_payment_id = ?`
    )
    .bind(params.paypalPaymentId)
    .first<{ id: number }>();

  if (existing) {
    return { success: true, reason: "already_processed" };
  }

  // 查找订阅
  const subscription = await getSubscriptionByPaypalId(
    params.paypalSubscriptionId
  );
  if (!subscription) {
    return { success: false, reason: "subscription_not_found" };
  }

  // 记录付款
  await db
    .prepare(
      `INSERT INTO subscription_payments(subscription_id, paypal_payment_id, amount_usd, credits_granted, billing_period_start, billing_period_end)
       VALUES(?, ?, ?, ?, ?, ?)`
    )
    .bind(
      params.paypalSubscriptionId,
      params.paypalPaymentId,
      params.amountUsd,
      subscription.credits_per_cycle,
      params.billingPeriodStart || null,
      params.billingPeriodEnd || null
    )
    .run();

  // 更新订阅周期
  if (params.billingPeriodEnd) {
    await db
      .prepare(
        `UPDATE subscriptions
         SET current_period_start = ?, current_period_end = ?, updated_at = datetime('now')
         WHERE paypal_subscription_id = ?`
      )
      .bind(
        params.billingPeriodStart || new Date().toISOString(),
        params.billingPeriodEnd,
        params.paypalSubscriptionId
      )
      .run();
  }

  // 充值积分 + 延长会员
  await rechargeCredits({
    userId: subscription.user_id,
    credits: subscription.credits_per_cycle,
    orderId: `sub_${params.paypalPaymentId}`,
    plan: subscription.plan,
    membershipDays: 30,
    description: `Subscription renewal (${PLANS[subscription.plan].label}): +${subscription.credits_per_cycle} credits`,
  });

  return { success: true };
}

/**
 * 取消订阅
 */
export async function cancelSubscriptionRecord(
  paypalSubscriptionId: string
): Promise<void> {
  const db = getDb();
  await db
    .prepare(
      `UPDATE subscriptions
       SET status = 'cancelled', cancelled_at = datetime('now'), updated_at = datetime('now')
       WHERE paypal_subscription_id = ?`
    )
    .bind(paypalSubscriptionId)
    .run();
}

/**
 * 暂停订阅
 */
export async function suspendSubscriptionRecord(
  paypalSubscriptionId: string
): Promise<void> {
  const db = getDb();
  await db
    .prepare(
      `UPDATE subscriptions
       SET status = 'suspended', updated_at = datetime('now')
       WHERE paypal_subscription_id = ?`
    )
    .bind(paypalSubscriptionId)
    .run();
}

/**
 * 通过 PayPal subscription ID 查询订阅
 */
export async function getSubscriptionByPaypalId(
  paypalSubscriptionId: string
): Promise<Subscription | null> {
  const db = getDb();
  const row = await db
    .prepare(
      `SELECT * FROM subscriptions WHERE paypal_subscription_id = ?`
    )
    .bind(paypalSubscriptionId)
    .first<Record<string, unknown>>();

  if (!row) return null;
  return row as unknown as Subscription;
}

/**
 * 获取用户当前活跃的订阅
 */
export async function getActiveSubscription(
  userId: string
): Promise<Subscription | null> {
  const db = getDb();
  const row = await db
    .prepare(
      `SELECT * FROM subscriptions
       WHERE user_id = ? AND status = 'active'
       ORDER BY created_at DESC LIMIT 1`
    )
    .bind(userId)
    .first<Record<string, unknown>>();

  if (!row) return null;
  return row as unknown as Subscription;
}

/**
 * 获取用户所有订阅记录
 */
export async function getUserSubscriptions(
  userId: string
): Promise<Subscription[]> {
  const db = getDb();
  const result = await db
    .prepare(
      `SELECT * FROM subscriptions
       WHERE user_id = ?
       ORDER BY created_at DESC`
    )
    .bind(userId)
    .all<Record<string, unknown>>();

  return result.results as unknown as Subscription[];
}

/**
 * 检查用户是否有活跃订阅（用于前端判断）
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const sub = await getActiveSubscription(userId);
  return sub !== null;
}
