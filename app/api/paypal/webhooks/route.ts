/**
 * DrawPrompts — POST /api/paypal/webhooks
 * PayPal Webhook 回调 — 处理一次性支付 + 订阅事件
 *
 * 支持的事件：
 * - PAYMENT.CAPTURE.COMPLETED — 一次性支付完成（兜底）
 * - PAYMENT.SALE.COMPLETED — 订阅续费扣款完成
 * - BILLING.SUBSCRIPTION.ACTIVATED — 订阅激活
 * - BILLING.SUBSCRIPTION.CANCELLED — 订阅取消
 * - BILLING.SUBSCRIPTION.SUSPENDED — 订阅暂停（扣费失败）
 */
import { NextRequest, NextResponse } from "next/server";
import { verifyPayPalWebhook } from "@/lib/paypal";
import { getOrder, markOrderPaid, isOrderPaid, isPaymentProcessed } from "@/servers/orders";
import { rechargeCredits } from "@/servers/credits";
import { PLANS, type PlanType } from "@/lib/qualityConfig";
import {
  activateSubscription,
  processSubscriptionPayment,
  cancelSubscriptionRecord,
  suspendSubscriptionRecord,
} from "@/servers/subscriptions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headers = request.headers;

    // 验证 Webhook 签名（sandbox 时可以跳过）
    const isValid = await verifyPayPalWebhook(headers, body);
    if (!isValid) {
      console.error("[PayPal Webhook] Signature verification failed");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);
    const eventType = event.event_type;
    console.log(`[PayPal Webhook] Event received: ${eventType}`);

    switch (eventType) {
      case "PAYMENT.CAPTURE.COMPLETED":
        await handleOneTimePayment(event);
        break;

      case "PAYMENT.SALE.COMPLETED":
        await handleSubscriptionPayment(event);
        break;

      case "BILLING.SUBSCRIPTION.ACTIVATED":
        await handleSubscriptionActivated(event);
        break;

      case "BILLING.SUBSCRIPTION.CANCELLED":
        await handleSubscriptionCancelled(event);
        break;

      case "BILLING.SUBSCRIPTION.SUSPENDED":
        await handleSubscriptionSuspended(event);
        break;

      default:
        console.log(`[PayPal Webhook] Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[POST /api/paypal/webhooks] Error:", error);
    // 返回 200 以防止 PayPal 重试
    return NextResponse.json({ received: true });
  }
}

/**
 * 处理一次性支付完成（旧逻辑兜底）
 */
async function handleOneTimePayment(event: Record<string, unknown>) {
  const resource = event.resource as Record<string, unknown>;
  const captureId = resource.id as string;
  const customId = resource.custom_id as string;

  if (!customId) {
    console.error("[PayPal Webhook] Missing custom_id in PAYMENT.CAPTURE.COMPLETED");
    return;
  }

  // 幂等检查
  if (await isPaymentProcessed(captureId)) {
    console.log(`[PayPal Webhook] Payment ${captureId} already processed`);
    return;
  }
  if (await isOrderPaid(customId)) {
    console.log(`[PayPal Webhook] Order ${customId} already paid`);
    return;
  }

  // 获取订单信息
  const order = await getOrder(customId);
  if (!order) {
    console.error(`[PayPal Webhook] Order ${customId} not found`);
    return;
  }

  await markOrderPaid({ orderId: customId, paymentId: captureId });

  const plan = order.plan as PlanType;
  const planConfig = PLANS[plan];
  await rechargeCredits({
    userId: order.user_id as string,
    credits: planConfig.credits,
    orderId: customId,
    plan,
    membershipDays: planConfig.days,
    description: `Purchased ${planConfig.label} plan: +${planConfig.credits} credits (via webhook)`,
  });

  console.log(
    `[PayPal Webhook] One-time payment: order ${customId}, credited ${planConfig.credits}`
  );
}

/**
 * 处理订阅续费扣款完成
 * 每月自动扣费时 PayPal 会发送此事件
 */
async function handleSubscriptionPayment(event: Record<string, unknown>) {
  const resource = event.resource as Record<string, unknown>;
  const saleId = resource.id as string;
  const subscriptionId = resource.billing_agreement_id as string;
  const amount = resource.amount as { total: string; currency: string } | undefined;

  if (!subscriptionId) {
    console.log("[PayPal Webhook] PAYMENT.SALE.COMPLETED without billing_agreement_id, skipping");
    return;
  }

  console.log(
    `[PayPal Webhook] Subscription payment: sub=${subscriptionId}, sale=${saleId}, amount=${amount?.total}`
  );

  const result = await processSubscriptionPayment({
    paypalSubscriptionId: subscriptionId,
    paypalPaymentId: saleId,
    amountUsd: parseFloat(amount?.total || "0"),
  });

  if (result.success) {
    console.log(
      `[PayPal Webhook] Subscription payment processed (${result.reason || "ok"})`
    );
  } else {
    console.error(
      `[PayPal Webhook] Failed to process subscription payment: ${result.reason}`
    );
  }
}

/**
 * 处理订阅激活
 */
async function handleSubscriptionActivated(event: Record<string, unknown>) {
  const resource = event.resource as Record<string, unknown>;
  const subscriptionId = resource.id as string;
  const startTime = resource.start_time as string;
  const billingInfo = resource.billing_info as Record<string, unknown> | undefined;
  const nextBillingTime = billingInfo?.next_billing_time as string | undefined;

  console.log(`[PayPal Webhook] Subscription activated: ${subscriptionId}`);

  await activateSubscription({
    paypalSubscriptionId: subscriptionId,
    periodStart: startTime,
    periodEnd: nextBillingTime,
  });
}

/**
 * 处理订阅取消
 */
async function handleSubscriptionCancelled(event: Record<string, unknown>) {
  const resource = event.resource as Record<string, unknown>;
  const subscriptionId = resource.id as string;

  console.log(`[PayPal Webhook] Subscription cancelled: ${subscriptionId}`);
  await cancelSubscriptionRecord(subscriptionId);
}

/**
 * 处理订阅暂停（扣费失败超过阈值）
 */
async function handleSubscriptionSuspended(event: Record<string, unknown>) {
  const resource = event.resource as Record<string, unknown>;
  const subscriptionId = resource.id as string;

  console.log(`[PayPal Webhook] Subscription suspended: ${subscriptionId}`);
  await suspendSubscriptionRecord(subscriptionId);
}
