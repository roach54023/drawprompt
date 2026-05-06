/**
 * DrawPrompts — PayPal REST API v2 封装
 * 支持 sandbox / production 环境切换
 */

const PAYPAL_BASE_URL =
  process.env.PAYPAL_MODE === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

/**
 * 获取 PayPal Access Token（Client Credentials 模式）
 */
async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;

  if (!clientId || !secret) {
    throw new Error("PayPal credentials not configured");
  }

  // 使用 btoa 替代 Buffer.from（兼容 Workers 运行时）
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
 * 创建 PayPal 订单
 * @param amountUSD 金额字符串（如 "5.90"）
 * @param orderId 内部订单号（存入 custom_id，Webhook 中可取回）
 */
export async function createPayPalOrder(amountUSD: string, orderId: string) {
  const accessToken = await getPayPalAccessToken();

  const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: "USD", value: amountUSD },
          custom_id: orderId,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal create order failed: ${err}`);
  }

  return res.json();
}

/**
 * 捕获（确认）PayPal 付款
 * @param paypalOrderId PayPal 的 order ID
 */
export async function capturePayPalOrder(paypalOrderId: string) {
  const accessToken = await getPayPalAccessToken();

  const res = await fetch(
    `${PAYPAL_BASE_URL}/v2/checkout/orders/${paypalOrderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const responseText = await res.text();
  console.log(`[PayPal] Capture response (${res.status}):`, responseText);

  if (!res.ok) {
    // 如果 capture 失败，可能是订单已经被 PayPal SDK 自动 capture 了
    // 尝试查询订单状态，如果已 COMPLETED 就视为成功
    const parsed = JSON.parse(responseText);
    if (parsed.details?.[0]?.issue === "ORDER_ALREADY_CAPTURED" || res.status === 422) {
      console.log("[PayPal] Order already captured, fetching order details...");
      const orderDetails = await getPayPalOrderDetails(paypalOrderId, accessToken);
      return orderDetails;
    }
    throw new Error(`PayPal capture failed (${res.status}): ${responseText}`);
  }

  return JSON.parse(responseText);
}

/**
 * 查询 PayPal 订单详情（用于已被 capture 的订单）
 */
async function getPayPalOrderDetails(paypalOrderId: string, accessToken: string) {
  const res = await fetch(
    `${PAYPAL_BASE_URL}/v2/checkout/orders/${paypalOrderId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal get order details failed: ${err}`);
  }

  return res.json();
}

/**
 * 验证 PayPal Webhook 签名
 */
export async function verifyPayPalWebhook(
  headers: Headers,
  body: string
): Promise<boolean> {
  const accessToken = await getPayPalAccessToken();

  const res = await fetch(
    `${PAYPAL_BASE_URL}/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: headers.get("paypal-auth-algo"),
        cert_url: headers.get("paypal-cert-url"),
        transmission_id: headers.get("paypal-transmission-id"),
        transmission_sig: headers.get("paypal-transmission-sig"),
        transmission_time: headers.get("paypal-transmission-time"),
        webhook_id: process.env.PAYPAL_WEBHOOK_ID,
        webhook_event: JSON.parse(body),
      }),
    }
  );

  if (!res.ok) {
    return false;
  }

  const data = await res.json();
  return data.verification_status === "SUCCESS";
}
