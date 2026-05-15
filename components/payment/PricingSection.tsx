"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PLANS, type PlanType } from "@/lib/qualityConfig";
import Toast from "@/components/common/Toast";
import { useUser } from "@/context/UserContext";

const PLAN_FEATURES: Record<PlanType, string[]> = {
  starter: [
    "100 credits / month",
    "Auto-renews monthly",
    "Fast + Standard quality",
    "30 images per day",
    "Cancel anytime",
  ],
  pro: [
    "300 credits / month",
    "Auto-renews monthly",
    "All quality tiers (incl. HD & Ultra)",
    "50 images per day",
    "Cancel anytime",
    "Best value!",
  ],
  premium: [
    "800 credits / month",
    "Auto-renews monthly",
    "All quality tiers (incl. HD & Ultra)",
    "100 images per day",
    "Cancel anytime",
    "Maximum savings per credit",
  ],
};

interface PaymentToast {
  message: string;
  type: "success" | "error" | "info";
  creditsDelta?: number;
}

interface SubscriptionInfo {
  has_subscription: boolean;
  subscription: {
    plan: PlanType;
    status: string;
    credits_per_cycle: number;
    price_usd: number;
    current_period_start: string | null;
    current_period_end: string | null;
  } | null;
}

export default function PricingSection() {
  const { userData, refreshUserData } = useUser();
  const searchParams = useSearchParams();
  const [toast, setToast] = useState<PaymentToast | null>(null);
  const [subscribingPlan, setSubscribingPlan] = useState<PlanType | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [cancellingSubscription, setCancellingSubscription] = useState(false);

  // 加载订阅状态
  useEffect(() => {
    if (userData) {
      fetchSubscription();
    }
  }, [userData]);

  // 处理 URL 参数（从 PayPal 回调回来）
  useEffect(() => {
    const success = searchParams.get("subscription_success");
    const plan = searchParams.get("plan");
    const cancelled = searchParams.get("subscription_cancelled");
    const pending = searchParams.get("subscription_pending");
    const error = searchParams.get("error");

    if (success === "true" && plan) {
      const planConfig = PLANS[plan as PlanType];
      if (planConfig) {
        setToast({
          message: `Subscription activated! ${planConfig.label} plan — ${planConfig.credits} credits added.`,
          type: "success",
          creditsDelta: planConfig.credits,
        });
        refreshUserData();
        fetchSubscription();
      }
      // 清理 URL 参数
      window.history.replaceState({}, "", "/pricing");
    } else if (cancelled === "true") {
      setToast({
        message: "Subscription was cancelled. You can try again anytime.",
        type: "info",
      });
      window.history.replaceState({}, "", "/pricing");
    } else if (pending === "true") {
      setToast({
        message: "Your subscription is pending activation. Please wait a moment and refresh.",
        type: "info",
      });
      window.history.replaceState({}, "", "/pricing");
    } else if (error) {
      setToast({
        message: `Subscription error: ${error.replace(/_/g, " ")}`,
        type: "error",
      });
      window.history.replaceState({}, "", "/pricing");
    }
  }, [searchParams]);

  async function fetchSubscription() {
    try {
      const res = await fetch("/api/user/subscription");
      if (res.ok) {
        const data = await res.json();
        setSubscription(data);
      }
    } catch (err) {
      console.error("Failed to fetch subscription:", err);
    }
  }

  async function handleSubscribe(plan: PlanType) {
    if (!userData) return;
    setSubscribingPlan(plan);

    try {
      const res = await fetch("/api/paypal/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (!res.ok) {
        setToast({
          message: data.error || "Failed to create subscription",
          type: "error",
        });
        setSubscribingPlan(null);
        return;
      }

      // 跳转到 PayPal 审批页面
      if (data.approval_url) {
        window.location.href = data.approval_url;
      } else {
        setToast({
          message: "Failed to get PayPal approval URL",
          type: "error",
        });
        setSubscribingPlan(null);
      }
    } catch (err) {
      console.error("Subscribe error:", err);
      setToast({
        message: "Network error. Please try again.",
        type: "error",
      });
      setSubscribingPlan(null);
    }
  }

  async function handleCancelSubscription() {
    if (!confirm("Are you sure you want to cancel your subscription? Your benefits remain until the end of the current billing period.")) {
      return;
    }

    setCancellingSubscription(true);
    try {
      const res = await fetch("/api/user/subscription", { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        setToast({
          message: "Subscription cancelled. Your current benefits remain active until the end of the billing period.",
          type: "info",
        });
        await fetchSubscription();
        await refreshUserData();
      } else {
        setToast({
          message: data.error || "Failed to cancel subscription",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Cancel subscription error:", err);
      setToast({
        message: "Network error. Please try again.",
        type: "error",
      });
    } finally {
      setCancellingSubscription(false);
    }
  }

  const activeSub = subscription?.subscription;
  const hasActiveSub = subscription?.has_subscription || false;

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          creditsDelta={toast.creditsDelta}
          duration={6000}
          onClose={() => setToast(null)}
        />
      )}

      {/* 当前订阅状态卡片 */}
      {hasActiveSub && activeSub && (
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto 32px",
            padding: "20px 28px",
            background: "linear-gradient(135deg, #f8f6f3, #fdf9f5)",
            border: "1px solid #e0ddd8",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 14, color: "#8c7b6b", marginBottom: 4 }}>
              Current Subscription
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#2d2926" }}>
              {PLANS[activeSub.plan].label} Plan
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  padding: "2px 8px",
                  borderRadius: 8,
                  background: "#e8f5e9",
                  color: "#2e7d32",
                  fontWeight: 600,
                }}
              >
                ACTIVE
              </span>
            </div>
            <div style={{ fontSize: 13, color: "#6b5e52", marginTop: 4 }}>
              {activeSub.credits_per_cycle} credits/month · ${activeSub.price_usd}/month
              {activeSub.current_period_end && (
                <span>
                  {" "}
                  · Renews{" "}
                  {new Date(activeSub.current_period_end).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleCancelSubscription}
            disabled={cancellingSubscription}
            style={{
              padding: "8px 20px",
              border: "1px solid #d32f2f",
              borderRadius: 8,
              background: "transparent",
              color: "#d32f2f",
              fontSize: 13,
              fontWeight: 600,
              cursor: cancellingSubscription ? "not-allowed" : "pointer",
              opacity: cancellingSubscription ? 0.5 : 1,
            }}
          >
            {cancellingSubscription ? "Cancelling..." : "Cancel Subscription"}
          </button>
        </div>
      )}

      {/* 价格卡片 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        {(Object.keys(PLANS) as PlanType[]).map((plan) => {
          const config = PLANS[plan];
          const features = PLAN_FEATURES[plan];
          const isPopular = plan === "pro";
          const isCurrentPlan = hasActiveSub && activeSub?.plan === plan;
          const isSubscribing = subscribingPlan === plan;

          return (
            <div
              key={plan}
              style={{
                background: isCurrentPlan ? "#f0faf0" : "#fff",
                border: isCurrentPlan
                  ? "2px solid #2ecc71"
                  : isPopular
                  ? "2px solid #c8a77a"
                  : "1px solid #e0ddd8",
                borderRadius: 16,
                padding: 32,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
              }}
            >
              {isCurrentPlan && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#2ecc71",
                    color: "#fff",
                    padding: "4px 16px",
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  CURRENT PLAN
                </div>
              )}

              {isPopular && !isCurrentPlan && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#c8a77a",
                    color: "#fff",
                    padding: "4px 16px",
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#2d2926",
                  margin: "0 0 8px",
                }}
              >
                {config.label}
              </h3>

              <div style={{ margin: "0 0 24px" }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: "#2d2926" }}>
                  ${config.price}
                </span>
                <span style={{ fontSize: 14, color: "#8c7b6b", marginLeft: 4 }}>
                  / month
                </span>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 24px",
                  flex: 1,
                }}
              >
                {features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      fontSize: 14,
                      color: "#4a3f36",
                      padding: "6px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#5a8a5e" }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {userData ? (
                isCurrentPlan ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "12px 24px",
                      borderRadius: 8,
                      background: "#e8f5e9",
                      color: "#2e7d32",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    ✓ Your Current Plan
                  </div>
                ) : hasActiveSub ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "12px 24px",
                      borderRadius: 8,
                      background: "#f5f5f5",
                      color: "#888",
                      fontSize: 13,
                    }}
                  >
                    Cancel current plan to switch
                  </div>
                ) : (
                  <button
                    disabled={isSubscribing}
                    onClick={() => handleSubscribe(plan)}
                    style={{
                      width: "100%",
                      padding: "14px 24px",
                      borderRadius: 8,
                      border: "none",
                      background: isSubscribing ? "#ccc" : isPopular ? "#c8a77a" : "#2d2926",
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: isSubscribing ? "not-allowed" : "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <span>
                      {isSubscribing ? "Redirecting to PayPal..." : `Subscribe — $${config.price}/mo`}
                    </span>
                  </button>
                )
              ) : (
                <p style={{ fontSize: 13, color: "#8c7b6b", textAlign: "center" }}>
                  Sign in to subscribe
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* 底部说明 */}
      <div
        style={{
          maxWidth: 960,
          margin: "24px auto 0",
          textAlign: "center",
          fontSize: 13,
          color: "#8c7b6b",
        }}
      >
        Subscriptions auto-renew monthly. Credits are added at the start of each billing cycle.
        You can cancel anytime — your benefits remain until the end of the current period.
      </div>
    </>
  );
}
