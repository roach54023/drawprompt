/**
 * DrawPrompts — 订单服务层
 * 订单创建/更新/查询（Cloudflare D1 版）
 */
import { getDb } from "@/lib/db";
import { PLANS, type PlanType } from "@/lib/qualityConfig";

/**
 * 创建待支付订单
 */
export async function createOrder(params: {
  orderId: string;
  userId: string;
  plan: PlanType;
}): Promise<void> {
  const db = getDb();
  const planConfig = PLANS[params.plan];

  await db
    .prepare(
      `INSERT INTO orders(order_id, user_id, plan, amount_usd, credits_granted, membership_days, status)
       VALUES(?, ?, ?, ?, ?, ?, 'pending')`
    )
    .bind(
      params.orderId,
      params.userId,
      params.plan,
      planConfig.price,
      planConfig.credits,
      planConfig.days
    )
    .run();
}

/**
 * 标记订单为已支付
 */
export async function markOrderPaid(params: {
  orderId: string;
  paymentId: string;
}): Promise<void> {
  const db = getDb();
  await db
    .prepare(
      `UPDATE orders
       SET status = 'paid', payment_id = ?, paid_at = datetime('now'), updated_at = datetime('now')
       WHERE order_id = ?`
    )
    .bind(params.paymentId, params.orderId)
    .run();
}

/**
 * 获取订单信息
 */
export async function getOrder(orderId: string) {
  const db = getDb();
  return await db
    .prepare(`SELECT * FROM orders WHERE order_id = ?`)
    .bind(orderId)
    .first<Record<string, unknown>>();
}

/**
 * 检查订单是否已支付（幂等检查）
 */
export async function isOrderPaid(orderId: string): Promise<boolean> {
  const db = getDb();
  const row = await db
    .prepare(`SELECT status FROM orders WHERE order_id = ?`)
    .bind(orderId)
    .first<{ status: string }>();
  if (!row) return false;
  return row.status === "paid";
}

/**
 * 通过 PayPal payment_id 检查是否已处理过（Webhook 幂等）
 */
export async function isPaymentProcessed(paymentId: string): Promise<boolean> {
  const db = getDb();
  const row = await db
    .prepare(`SELECT id FROM orders WHERE payment_id = ? AND status = 'paid'`)
    .bind(paymentId)
    .first<{ id: number }>();
  return row !== null;
}
