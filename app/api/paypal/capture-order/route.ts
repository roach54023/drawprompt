/**
 * DrawPrompts — POST /api/paypal/capture-order
 * 捕获（确认）PayPal 付款，充值积分
 */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/servers/user";
import { getOrder, markOrderPaid, isOrderPaid } from "@/servers/orders";
import { rechargeCredits } from "@/servers/credits";
import { capturePayPalOrder } from "@/lib/paypal";
import { PLANS, type PlanType } from "@/lib/qualityConfig";


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
    const { paypal_order_id, order_id } = body;

    if (!paypal_order_id || !order_id) {
      return NextResponse.json(
        { error: "Missing paypal_order_id or order_id" },
        { status: 400 }
      );
    }

    // 幂等检查：订单是否已支付
    if (await isOrderPaid(order_id)) {
      return NextResponse.json(
        { error: "Order already processed" },
        { status: 409 }
      );
    }

    // 获取内部订单信息
    const order = await getOrder(order_id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    if (order.user_id !== user.user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 调用 PayPal 捕获付款
    const captureResult = await capturePayPalOrder(paypal_order_id);
    console.log("[PayPal Capture] Full response:", JSON.stringify(captureResult, null, 2));

    const captureStatus = captureResult.status;

    if (captureStatus !== "COMPLETED") {
      console.error(`[PayPal Capture] Unexpected status: ${captureStatus}`);
      return NextResponse.json(
        { error: `Payment not completed. Status: ${captureStatus}` },
        { status: 400 }
      );
    }

    // 获取 capture ID
    const captureId =
      captureResult.purchase_units?.[0]?.payments?.captures?.[0]?.id ||
      paypal_order_id;

    // 标记订单已支付
    await markOrderPaid({ orderId: order_id, paymentId: captureId });

    // 充值积分 + 更新会员
    const plan = order.plan as PlanType;
    const planConfig = PLANS[plan];
    const { newBalance, membershipExpiresAt } = await rechargeCredits({
      userId: user.user_id,
      credits: planConfig.credits,
      orderId: order_id,
      plan,
      membershipDays: planConfig.days,
      description: `Purchased ${planConfig.label} plan: +${planConfig.credits} credits`,
    });

    return NextResponse.json({
      success: true,
      new_balance: newBalance,
      membership_expires_at: membershipExpiresAt,
    });
  } catch (error) {
    console.error("[POST /api/paypal/capture-order] Error:", error);
    return NextResponse.json(
      { error: "Failed to capture payment" },
      { status: 500 }
    );
  }
}
