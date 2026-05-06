import type { Metadata } from "next";
import { Suspense } from "react";
import PricingSection from "@/components/payment/PricingSection";

export const metadata: Metadata = {
  title: "Pricing — AI Image Generation Plans",
  description:
    "Generate stunning AI images with GPT Image 2. 1 free credit on sign-up. Choose from Starter ($5.9/mo), Pro ($14.9/mo), or Premium ($29.9/mo) plans. Cancel anytime.",
  keywords: [
    "ai image generator pricing",
    "gpt image 2 pricing",
    "ai image generation cost",
    "text to image pricing",
    "ai art generator plans",
  ],
  alternates: { canonical: "https://drawprompt.org/pricing/" },
  openGraph: {
    title: "Pricing — AI Image Generation Plans",
    description:
      "1 free credit on sign-up. Plans from $5.9/mo for 100 credits. Generate AI images with GPT Image 2 in Fast, Standard, HD, or Ultra quality.",
    url: "https://drawprompt.org/pricing/",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#2d2926",
            margin: "0 0 16px",
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          Generate AI Images
        </h1>
        <p style={{ fontSize: 16, color: "#6b5b4e", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
          Sign up and get 1 free credit to try GPT Image 2 instantly. Need more?
          Subscribe for bulk credits, premium quality tiers, and higher daily limits. Cancel anytime.
        </p>
      </div>

      {/* Quality comparison */}
      <div
        style={{
          background: "#f8f6f1",
          borderRadius: 16,
          padding: "24px 32px",
          marginBottom: 48,
          border: "1px solid #e0ddd8",
        }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 600, color: "#2d2926", margin: "0 0 16px" }}>
          Quality Tiers — All cheaper than ChatGPT official pricing
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { name: "Fast", credits: "1 credit", desc: "Quick exploration" },
            { name: "Standard", credits: "2 credits", desc: "Clear & detailed" },
            { name: "HD", credits: "5 credits", desc: "Poster-quality" },
            { name: "Ultra", credits: "10 credits", desc: "Commercial-grade" },
          ].map((tier) => (
            <div key={tier.name} style={{ padding: "12px 0" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#2d2926" }}>{tier.name}</div>
              <div style={{ fontSize: 12, color: "#c8a77a", fontWeight: 500 }}>{tier.credits}</div>
              <div style={{ fontSize: 12, color: "#8c7b6b" }}>{tier.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing cards - wrapped in Suspense for useSearchParams */}
      <Suspense fallback={<PricingFallback />}>
        <PricingSection />
      </Suspense>

      {/* FAQ */}
      <div style={{ maxWidth: 640, margin: "64px auto 0", textAlign: "center" }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "#2d2926", margin: "0 0 24px" }}>
          Frequently Asked Questions
        </h2>
        <div style={{ textAlign: "left" }}>
          {[
            {
              q: "Do I get anything for free?",
              a: "Yes! Every new account receives 1 free credit on sign-up — enough for one Fast-quality image generation. No credit card needed.",
            },
            {
              q: "How does the subscription work?",
              a: "Your subscription auto-renews monthly. At the start of each billing cycle, fresh credits are added to your account. Cancel anytime.",
            },
            {
              q: "Do credits expire?",
              a: "No! Your credits never expire, even if you cancel. Use them whenever you want.",
            },
            {
              q: "What happens when I cancel?",
              a: "Your benefits (credits, quality tiers, daily limits) remain active until the end of the current billing period. No charges after that.",
            },
            {
              q: "Can I switch plans?",
              a: "Cancel your current plan first, then subscribe to a different one. Your remaining credits carry over.",
            },
          ].map((faq) => (
            <div key={faq.q} style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#2d2926", margin: "0 0 4px" }}>
                {faq.q}
              </p>
              <p style={{ fontSize: 13, color: "#6b5b4e", margin: 0, lineHeight: 1.6 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingFallback() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 24,
        maxWidth: 960,
        margin: "0 auto",
      }}
    >
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            background: "#f8f6f3",
            border: "1px solid #e0ddd8",
            borderRadius: 16,
            padding: 32,
            height: 380,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      ))}
    </div>
  );
}
