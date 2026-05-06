/**
 * DrawPrompts — /api/user/subscription
 * GET: 查询当前用户的订阅状态
 * DELETE: 取消当前订阅
 */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getUserByEmail } from "@/servers/user";
import { getActiveSubscription, cancelSubscriptionRecord } from "@/servers/subscriptions";
import { cancelSubscription } from "@/lib/paypal-subscription";

/**
 * GET /api/user/subscription
 * 返回用户当前活跃订阅信息
 */
export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByEmail(session.user.email);
    if (user.status === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const subscription = await getActiveSubscription(user.user_id);

    if (!subscription) {
      return NextResponse.json({
        has_subscription: false,
        subscription: null,
      });
    }

    return NextResponse.json({
      has_subscription: true,
      subscription: {
        plan: subscription.plan,
        status: subscription.status,
        credits_per_cycle: subscription.credits_per_cycle,
        price_usd: subscription.price_usd,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        created_at: subscription.created_at,
      },
    });
  } catch (error) {
    console.error("[GET /api/user/subscription] Error:", error);
    return NextResponse.json(
      { error: "Failed to get subscription" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/user/subscription
 * 取消当前订阅（在当前周期结束后不再续费）
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByEmail(session.user.email);
    if (user.status === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const subscription = await getActiveSubscription(user.user_id);
    if (!subscription) {
      return NextResponse.json(
        { error: "No active subscription to cancel" },
        { status: 404 }
      );
    }

    // 调用 PayPal 取消订阅
    await cancelSubscription(
      subscription.paypal_subscription_id,
      "User requested cancellation"
    );

    // 更新本地记录
    await cancelSubscriptionRecord(subscription.paypal_subscription_id);

    return NextResponse.json({
      success: true,
      message:
        "Subscription cancelled. Your current benefits remain active until the end of the billing period.",
      period_end: subscription.current_period_end,
    });
  } catch (error) {
    console.error("[DELETE /api/user/subscription] Error:", error);
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    );
  }
}
