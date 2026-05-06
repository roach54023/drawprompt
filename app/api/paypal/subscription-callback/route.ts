/**
 * DrawPrompts — GET /api/paypal/subscription-callback
 * 用户在 PayPal 同意订阅后跳转回来的回调
 * PayPal 会在 URL 上带上 subscription_id 和 ba_token
 *
 * 流程：
 * 1. 从 URL 参数获取 subscription_id
 * 2. 调用 PayPal API 确认订阅状态
 * 3. 如果 ACTIVE，激活本地订阅 + 首次充值积分
 * 4. 重定向到前端成功页面
 */
import { NextRequest, NextResponse } from "next/server";
import { getSubscriptionDetails } from "@/lib/paypal-subscription";
import {
  activateSubscription,
  getSubscriptionByPaypalId,
  processSubscriptionPayment,
} from "@/servers/subscriptions";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subscriptionId = searchParams.get("subscription_id");
  const plan = searchParams.get("plan") || "";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!subscriptionId) {
    return NextResponse.redirect(
      `${siteUrl}/pricing?error=missing_subscription_id`
    );
  }

  try {
    // 查询 PayPal 订阅状态
    const paypalSub = await getSubscriptionDetails(subscriptionId);
    console.log(
      "[Subscription Callback] PayPal subscription status:",
      paypalSub.status,
      "id:",
      subscriptionId
    );

    if (paypalSub.status === "ACTIVE" || paypalSub.status === "APPROVED") {
      // 激活本地订阅
      const startTime =
        paypalSub.billing_info?.last_payment?.time ||
        paypalSub.start_time ||
        new Date().toISOString();
      const nextBillingTime =
        paypalSub.billing_info?.next_billing_time || null;

      const localSub = await activateSubscription({
        paypalSubscriptionId: subscriptionId,
        periodStart: startTime,
        periodEnd: nextBillingTime,
      });

      // 首次订阅：立即发放积分
      if (localSub) {
        const firstPaymentId = `sub_activate_${subscriptionId}`;
        await processSubscriptionPayment({
          paypalSubscriptionId: subscriptionId,
          paypalPaymentId: firstPaymentId,
          amountUsd: localSub.price_usd,
          billingPeriodStart: startTime,
          billingPeriodEnd: nextBillingTime || undefined,
        });
      }

      return NextResponse.redirect(
        `${siteUrl}/pricing?subscription_success=true&plan=${plan}`
      );
    } else {
      // 订阅未激活（用户可能取消了审批）
      console.warn(
        "[Subscription Callback] Subscription not active:",
        paypalSub.status
      );
      return NextResponse.redirect(
        `${siteUrl}/pricing?subscription_pending=true`
      );
    }
  } catch (error) {
    console.error("[Subscription Callback] Error:", error);
    return NextResponse.redirect(
      `${siteUrl}/pricing?error=subscription_activation_failed`
    );
  }
}
