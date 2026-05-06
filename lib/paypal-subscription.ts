/**
 * DrawPrompts — PayPal Subscriptions API 封装
 * 支持创建 Product、Billing Plan、Subscription
 * 以及查询/取消订阅
 */

const PAYPAL_BASE_URL =
  process.env.PAYPAL_MODE === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

/**
 * 获取 PayPal Access Token
 */
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

/**
 * 创建 Catalog Product（只需创建一次）
 */
export async function createProduct(name: string, description: string) {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE_URL}/v1/catalogs/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      type: "SERVICE",
      category: "SOFTWARE",
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Create product failed: ${err}`);
  }
  return res.json();
}

/**
 * 创建 Billing Plan
 */
export async function createBillingPlan(params: {
  productId: string;
  name: string;
  description: string;
  priceUSD: string;
}) {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE_URL}/v1/billing/plans`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      product_id: params.productId,
      name: params.name,
      description: params.description,
      status: "ACTIVE",
      billing_cycles: [
        {
          frequency: { interval_unit: "MONTH", interval_count: 1 },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0, // 0 = 无限续费
          pricing_scheme: {
            fixed_price: { value: params.priceUSD, currency_code: "USD" },
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
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Create plan failed: ${err}`);
  }
  return res.json();
}

/**
 * 创建 Subscription（返回 approval URL 让用户跳转）
 */
export async function createSubscription(params: {
  planId: string;
  userId: string;
  returnUrl: string;
  cancelUrl: string;
}) {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE_URL}/v1/billing/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      plan_id: params.planId,
      custom_id: params.userId, // 绑定内部用户 ID
      application_context: {
        brand_name: "DrawPrompts",
        locale: "en-US",
        user_action: "SUBSCRIBE_NOW",
        return_url: params.returnUrl,
        cancel_url: params.cancelUrl,
      },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Create subscription failed: ${err}`);
  }
  return res.json();
}

/**
 * 查询 Subscription 详情
 */
export async function getSubscriptionDetails(subscriptionId: string) {
  const token = await getAccessToken();
  const res = await fetch(
    `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Get subscription failed: ${err}`);
  }
  return res.json();
}

/**
 * 取消 Subscription
 */
export async function cancelSubscription(subscriptionId: string, reason: string) {
  const token = await getAccessToken();
  const res = await fetch(
    `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}/cancel`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reason }),
    }
  );
  if (!res.ok && res.status !== 204) {
    const err = await res.text();
    throw new Error(`Cancel subscription failed: ${err}`);
  }
  return true;
}
