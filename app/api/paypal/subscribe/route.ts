/**
 * DrawPrompts — POST /api/paypal/subscribe
 * 创建 PayPal 订阅，返回 approval URL
 * 用户跳转 PayPal 页面审批后回到 /api/paypal/subscription-callback
 */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/servers/user";
import { getActiveSubscription, createSubscriptionRecord } from "@/servers/subscriptions";
import { createSubscription } from "@/lib/paypal-subscription";
import { PLANS, type PlanType } from "@/lib/qualityConfig";

// Plan ID -> env var mapping
const PLAN_ENV_MAP: Record<PlanType, string> = {
  starter: "PAYPAL_PLAN_STARTER",
  pro: "PAYPAL_PLAN_PRO",
  premium: "PAYPAL_PLAN_PREMIUM",
};

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByEmail(session.user.email);
    if (user.status === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { plan } = body as { plan: string };

    // 验证 plan
    if (!plan || !PLANS[plan as PlanType]) {
      return NextResponse.json(
        { error: "Invalid plan. Must be starter, pro, or premium." },
        { status: 400 }
      );
    }

    const planType = plan as PlanType;

    // 检查是否已有活跃订阅
    const existingSub = await getActiveSubscription(user.user_id);
    if (existingSub) {
      return NextResponse.json(
        {
          error: "You already have an active subscription. Please cancel it first to switch plans.",
          current_plan: existingSub.plan,
        },
        { status: 409 }
      );
    }

    // 获取 PayPal Plan ID
    const paypalPlanId = process.env[PLAN_ENV_MAP[planType]];
    if (!paypalPlanId) {
      console.error(`[Subscribe] Missing env var: ${PLAN_ENV_MAP[planType]}`);
      return NextResponse.json(
        { error: "Plan not configured on server" },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // 调用 PayPal 创建订阅
    const subscription = await createSubscription({
      planId: paypalPlanId,
      userId: user.user_id,
      returnUrl: `${siteUrl}/api/paypal/subscription-callback?plan=${planType}`,
      cancelUrl: `${siteUrl}/pricing?subscription_cancelled=true`,
    });

    // 在数据库记录待确认的订阅
    await createSubscriptionRecord({
      userId: user.user_id,
      paypalSubscriptionId: subscription.id,
      plan: planType,
    });

    // 找到 approval link
    const approvalLink = subscription.links?.find(
      (link: { rel: string; href: string }) => link.rel === "approve"
    );

    if (!approvalLink) {
      console.error("[Subscribe] No approval link in PayPal response:", subscription);
      return NextResponse.json(
        { error: "Failed to get PayPal approval URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      subscription_id: subscription.id,
      approval_url: approvalLink.href,
    });
  } catch (error) {
    console.error("[POST /api/paypal/subscribe] Error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
