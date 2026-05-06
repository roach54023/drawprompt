/**
 * DrawPrompts — Cloudflare Turnstile 验证码验证
 */

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * 验证 Turnstile token
 * @param token 前端获取的 turnstile token
 * @param ip 用户 IP（可选，增加安全性）
 * @returns 验证是否成功
 */
export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    // 开发环境如果未配置 Turnstile，跳过验证
    if (process.env.NODE_ENV === "development") {
      console.warn("[Turnstile] Secret key not set, skipping verification in dev mode");
      return true;
    }
    throw new Error("TURNSTILE_SECRET_KEY environment variable is not set");
  }

  const formData = new URLSearchParams();
  formData.append("secret", secretKey);
  formData.append("response", token);
  if (ip) {
    formData.append("remoteip", ip);
  }

  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString(),
  });

  if (!res.ok) {
    return false;
  }

  const data = await res.json();
  return data.success === true;
}
