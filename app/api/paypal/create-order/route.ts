/**
 * DrawPrompts — POST /api/paypal/create-order
 * 创建 PayPal 支付订单
 */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/servers/user";
import { createOrder } from "@/servers/orders";
import { createPayPalOrder } from "@/lib/paypal";
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
    const { plan } = body;

    // 验证 plan 类型
    if (!plan || !PLANS[plan as PlanType]) {
      return NextResponse.json(
        { error: "Invalid plan. Must be starter, pro, or premium." },
        { status: 400 }
      );
    }

    const planConfig = PLANS[plan as PlanType];
    const orderId = crypto.randomUUID();

    // 在本地数据库创建订单记录
    await createOrder({
      orderId,
      userId: user.user_id,
      plan: plan as PlanType,
    });

    // 调用 PayPal 创建订单
    const paypalOrder = await createPayPalOrder(
      planConfig.price.toFixed(2),
      orderId
    );

    return NextResponse.json({
      paypal_order_id: paypalOrder.id,
      order_id: orderId,
    });
  } catch (error) {
    console.error("[POST /api/paypal/create-order] Error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
