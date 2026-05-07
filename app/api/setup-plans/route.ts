/**
 * 临时端点：创建 PayPal Product + Billing Plans
 * 运行一次后删除
 * GET /api/setup-plans
 */
import { NextResponse } from "next/server";

const PAYPAL_BASE_URL =
  process.env.PAYPAL_MODE === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
  if (!clientId || !secret) throw new Error("PayPal credentials not configured");

  const auth = btoa(`${clientId}:${secret}`);
  const res = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal auth failed: ${err}`);
  }
  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  try {
    const token = await getAccessToken();

    // 1. Create Product
    const productRes = await fetch(`${PAYPAL_BASE_URL}/v1/catalogs/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "DrawPrompts Subscription",
        description: "Monthly subscription to DrawPrompts AI image generation",
        type: "SERVICE",
        category: "SOFTWARE",
      }),
    });

    if (!productRes.ok) {
      const err = await productRes.text();
      return NextResponse.json({ error: "Create product failed", details: err }, { status: 500 });
    }

    const product = await productRes.json();
    const productId = product.id;

    // 2. Create 3 Billing Plans
    const plans = [
      { name: "Starter", price: "5.90", key: "starter" },
      { name: "Pro", price: "14.90", key: "pro" },
      { name: "Premium", price: "29.90", key: "premium" },
    ];

    const results: Record<string, string> = {};

    for (const plan of plans) {
      const planRes = await fetch(`${PAYPAL_BASE_URL}/v1/billing/plans`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          product_id: productId,
          name: `DrawPrompts ${plan.name}`,
          description: `DrawPrompts ${plan.name} - Monthly subscription`,
          status: "ACTIVE",
          billing_cycles: [
            {
              frequency: { interval_unit: "MONTH", interval_count: 1 },
              tenure_type: "REGULAR",
              sequence: 1,
              total_cycles: 0,
              pricing_scheme: {
                fixed_price: { value: plan.price, currency_code: "USD" },
              },
            },
          ],
          payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee: { value: "0", currency_code: "USD" },
            setup_fee_failure_action: "CONTINUE",
            payment_failure_threshold: 3,
          },
        }),
      });

      if (!planRes.ok) {
        const err = await planRes.text();
        return NextResponse.json({ error: `Create ${plan.name} plan failed`, details: err }, { status: 500 });
      }

      const planData = await planRes.json();
      results[plan.key] = planData.id;
    }

    return NextResponse.json({
      success: true,
      product_id: productId,
      env_vars_to_set: {
        PAYPAL_PLAN_STARTER: results.starter,
        PAYPAL_PLAN_PRO: results.pro,
        PAYPAL_PLAN_PREMIUM: results.premium,
      },
      message: "Copy these Plan IDs to your Vercel env vars, then delete this endpoint.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Setup failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
