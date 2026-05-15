"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  type AIPrompt,
  type AIModel,
  type CategoryInfo,
} from "@/lib/aiPromptData";
import PromptDetailModal from "@/components/PromptDetailModal";

const MODEL_DISPLAY: Record<AIModel, { label: string; color: string; bg: string }> = {
  "gpt-image-2": { label: "GPT Image 2", color: "#c06a3e", bg: "#fdf0e8" },
  chatgpt:       { label: "ChatGPT",      color: "#5a9e7a", bg: "#eef6f2" },
  midjourney:    { label: "Midjourney",    color: "#8b7ab8", bg: "#f2f0f8" },
  "dall-e":      { label: "DALL-E",        color: "#7b9eb8", bg: "#eef4f8" },
};

const HERO_MODELS = [
  { label: "GPT Image 2", color: "#c06a3e" },
  { label: "ChatGPT", color: "#5a9e7a" },
  { label: "Midjourney", color: "#8b7ab8" },
  { label: "DALL-E", color: "#7b9eb8" },
];

const HERO_SUGGESTIONS = [
  "A vintage jazz poster with bold typography",
  "Product photo of a luxury perfume bottle",
  "Cozy Japanese ramen shop at night, watercolor style",
  "Mobile app UI mockup for a meditation app",
];

export default function HomeClient({
  featured,
  feedPrompts,
  categories,
}: {
  featured: AIPrompt[];
  feedPrompts: AIPrompt[];
  categories: CategoryInfo[];
}) {
  const router = useRouter();
  const [heroInput, setHeroInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<AIPrompt | null>(null);

  const handleHeroGenerate = () => {
    if (!heroInput.trim()) return;
    router.push(`/generate?prompt=${encodeURIComponent(heroInput.trim())}`);
  };

  const handleCopy = async (prompt: AIPrompt) => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* fallback */
    }
  };

  return (
    <div>
      {/* ══════════ HERO — with floating image showcase ══════════ */}
      <section className="section-dark" style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ── Floating showcase images (left + right columns) ── */}
        <div className="hero-showcase-left" style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "22%",
          display: "flex", flexDirection: "column", justifyContent: "center", gap: 12,
          padding: "48px 16px", pointerEvents: "none", opacity: 0.55,
        }}>
          {featured.slice(0, 3).map((p, i) => (
            <div key={p.id} style={{
              borderRadius: 12, overflow: "hidden", transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}>
              <Image src={p.imageUrl} alt={p.imageAlt} width={280} height={200} style={{ width: "100%", height: "auto", display: "block" }} sizes="200px" />
            </div>
          ))}
        </div>
        <div className="hero-showcase-right" style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "22%",
          display: "flex", flexDirection: "column", justifyContent: "center", gap: 12,
          padding: "48px 16px", pointerEvents: "none", opacity: 0.55,
        }}>
          {featured.slice(3, 6).map((p, i) => (
            <div key={p.id} style={{
              borderRadius: 12, overflow: "hidden", transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}>
              <Image src={p.imageUrl} alt={p.imageAlt} width={280} height={200} style={{ width: "100%", height: "auto", display: "block" }} sizes="200px" />
            </div>
          ))}
        </div>

        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "88px 32px 64px", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div className="animate-fade-up" style={{ opacity: 0, animationDelay: "0.1s", animationFillMode: "forwards", marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)" }}>
              Powered by GPT Image 2
            </span>
          </div>

          <h1
            className="font-serif animate-fade-up"
            style={{
              fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 700, color: "var(--text-on-dark)",
              letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 20,
              maxWidth: 720, marginLeft: "auto", marginRight: "auto",
              opacity: 0, animationDelay: "0.2s", animationFillMode: "forwards",
            }}
          >
            The best{" "}
            <span style={{ color: "var(--accent)" }}>AI image prompts</span>
            <br />
            — tested &amp; ready to use
          </h1>

          <p
            className="animate-fade-up"
            style={{
              fontSize: "clamp(15px, 1.6vw, 17px)", color: "var(--text-on-dark-2)",
              maxWidth: 520, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7, marginBottom: 32,
              opacity: 0, animationDelay: "0.3s", animationFillMode: "forwards",
            }}
          >
            Type a prompt and create stunning AI images instantly. Browse 180+ curated prompts
            for GPT Image 2 & Nano Banana 2.
          </p>

          {/* ── Prompt Input Box ── */}
          <div
            className="animate-fade-up"
            style={{
              maxWidth: 600, margin: "0 auto 28px",
              opacity: 0, animationDelay: "0.35s", animationFillMode: "forwards",
            }}
          >
            <div style={{
              display: "flex", alignItems: "center", gap: 0,
              background: "rgba(255,255,255,0.08)", borderRadius: 14,
              border: "1.5px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
              overflow: "hidden", transition: "border-color 0.2s",
            }}>
              <input
                type="text"
                value={heroInput}
                onChange={(e) => setHeroInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleHeroGenerate(); }}
                placeholder="Describe the image you want to create..."
                style={{
                  flex: 1, padding: "15px 20px", border: "none", background: "transparent",
                  color: "var(--text-on-dark)", fontSize: 14, fontFamily: "inherit",
                  outline: "none", letterSpacing: "0.01em",
                }}
              />
              <button
                onClick={handleHeroGenerate}
                style={{
                  padding: "12px 24px", margin: 4, borderRadius: 10,
                  border: "none", background: "var(--accent)", color: "#fff",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                  transition: "opacity 0.15s", whiteSpace: "nowrap",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Generate
              </button>
            </div>

            {/* Quick suggestion chips */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
              {HERO_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setHeroInput(s); }}
                  style={{
                    padding: "5px 14px", borderRadius: 100, fontSize: 11, fontWeight: 500,
                    color: "var(--text-on-dark-2)", background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
                    transition: "background 0.15s, border-color 0.15s",
                    letterSpacing: "0.01em",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Model badges */}
          <div className="animate-fade-up" style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 28, opacity: 0, animationDelay: "0.45s", animationFillMode: "forwards" }}>
            {HERO_MODELS.map((m) => (
              <span key={m.label} style={{ padding: "5px 14px", borderRadius: 100, fontSize: 12, fontWeight: 500, color: m.color, border: `1px solid ${m.color}33`, background: `${m.color}0d`, letterSpacing: "0.01em" }}>
                {m.label}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="animate-fade-up" style={{ display: "inline-flex", gap: 48, paddingTop: 24, borderTop: "1px solid var(--border-dark)", opacity: 0, animationDelay: "0.55s", animationFillMode: "forwards" }}>
            {[
              { value: "180+", label: "AI Prompts" },
              { value: "GPT Image 2", label: "Latest Model" },
              { value: "4", label: "AI Models" },
              { value: "Free", label: "To Browse" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div className="font-serif" style={{ fontSize: 24, fontWeight: 700, color: "var(--text-on-dark)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 4 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-on-dark-2)", letterSpacing: "0.03em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MOTHER'S DAY BANNER — hidden after May, re-enable next year ══════════ */}
      {/* <section style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "48px 32px 0" }}>
        <Link
          href="/mothers-day"
          style={{
            display: "flex", alignItems: "center", gap: 24,
            padding: "20px 28px", borderRadius: 14,
            background: "#fefaf6", border: "1px solid #f0e4d8",
            textDecoration: "none", transition: "box-shadow 0.2s, transform 0.15s",
          }}
          className="card"
        >
          <div style={{ width: 56, height: 56, borderRadius: 12, overflow: "hidden", flexShrink: 0, position: "relative" }}>
            <Image src="/prompts/mothers-day-mom-silhouette-poster.jpg" alt="Mother's Day poster" fill style={{ objectFit: "cover" }} sizes="56px" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1c1917", marginBottom: 3 }}>
              Mother&apos;s Day Poster Templates
            </div>
            <div style={{ fontSize: 12, color: "#78716c", lineHeight: 1.5 }}>
              4 curated poster designs — pick a template, upload your photo, generate a gallery-quality art print for Mom.
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </section> */}

      {/* ══════════ IMAGE FEED — Gallery-style prompt showcase ══════════ */}
      <section style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#c06a3e", background: "#fdf0e8", border: "1px solid #e8c0a0", marginBottom: 16 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" />
            </svg>
            Prompt Gallery
          </div>
          <h2 className="font-serif" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>
            From viral images to reusable prompts
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 auto", maxWidth: 560 }}>
            Each prompt is tested with real output. Copy, paste, and get the same result — or remix for your own style.
          </p>
        </div>

        {/* Masonry / waterfall layout — images keep natural aspect ratio */}
        <div className="feed-masonry">
          {feedPrompts.map((prompt) => (
            <FeedCard key={prompt.id} prompt={prompt} copied={copiedId === prompt.id} onCopy={() => handleCopy(prompt)} categories={categories} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href="/ai-prompts/" className="btn-secondary" style={{ textDecoration: "none" }}>
            View all 180+ prompts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </section>

      {/* ══════════ CATEGORIES — AI prompt categories ══════════ */}
      <section style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ marginBottom: 48, maxWidth: 560 }}>
          <span className="section-label" style={{ display: "block", marginBottom: 12 }}>Browse by Category</span>
          <h2 className="font-serif" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>
            Find your style
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
            From photorealistic portraits to game concept art — nine categories covering every visual style.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 12 }}>
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* ══════════ PRICING CTA — Upgrade section ══════════ */}
      <section style={{ background: "var(--bg-deep)", padding: "80px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 100, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", background: "rgba(200,167,122,0.12)", border: "1px solid rgba(200,167,122,0.2)", marginBottom: 20 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            Start Generating
          </div>
          <h2 className="font-serif" style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: "var(--text-on-dark)", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16 }}>
            Turn prompts into images<br />in seconds
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-on-dark-2)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 32px" }}>
            Sign up and get 1 free credit to try GPT Image 2 instantly. Want more? Upgrade for bulk credits, higher quality, and HD/Ultra outputs.
          </p>

          {/* Plan highlights */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 32, textAlign: "left" }}>
            {[
              { plan: "Free", price: "$0", highlight: "1 free generation", desc: "Sign up & try GPT Image 2 — no card needed" },
              { plan: "Starter", price: "$5.90/mo", highlight: "100 credits", desc: "Standard quality + 30 images/day" },
              { plan: "Pro", price: "$14.90/mo", highlight: "300 credits", desc: "HD & Ultra quality, 50 images/day" },
            ].map((p) => (
              <div key={p.plan} style={{ padding: "20px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 4 }}>{p.plan}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text-on-dark)", marginBottom: 6 }}>{p.price}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-on-dark)", marginBottom: 4 }}>{p.highlight}</div>
                <div style={{ fontSize: 12, color: "var(--text-on-dark-2)", lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/generate"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px",
                borderRadius: 10, fontSize: 14, fontWeight: 600,
                color: "#fff", background: "var(--accent)",
                textDecoration: "none", transition: "opacity 0.15s",
              }}
            >
              Try Free — No Card Needed
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link
              href="/pricing"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px",
                borderRadius: 10, fontSize: 14, fontWeight: 500,
                color: "var(--text-on-dark-2)", background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.15)", textDecoration: "none",
                transition: "border-color 0.15s",
              }}
            >
              View All Plans
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ KEYWORD HUB — SEO internal link module ══════════ */}
      <section style={{ background: "var(--bg-warm)", padding: "64px 32px" }}>
        <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12, textAlign: "center" }}>
            Explore AI Image Prompt Resources
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, textAlign: "center", maxWidth: 520, margin: "0 auto 36px" }}>
            From model-specific guides to curated prompt libraries — everything you need to generate better AI images.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: 14 }}>
            {[
              { href: "/ai-prompts", title: "AI Image Prompt Library", desc: "167+ curated AI image prompts across 9 categories — copy, paste, and generate instantly.", color: "#c06a3e", bg: "#fdf0e8", border: "#f0c4a8" },
              { href: "/gpt-image-2-prompts", title: "GPT Image 2 Prompts", desc: "Tested, copy-paste prompts optimized for GPT Image 2 with example images.", color: "#8b7ab8", bg: "#f2f0f8", border: "#d0c8e8" },
              { href: "/how-to-use-gpt-image-2", title: "How to Use GPT Image 2", desc: "Step-by-step guide to writing effective prompts for OpenAI\u2019s latest image model.", color: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8" },
              { href: "/chatgpt-photo-prompts", title: "ChatGPT Photo Prompts", desc: "Photorealistic prompts crafted for ChatGPT\u2019s image generation — portraits, products, and more.", color: "#7b9eb8", bg: "#eef4f8", border: "#c8dce8" },
              { href: "/generate", title: "Generate AI Images", desc: "Type a prompt and create images instantly with GPT Image 2 — 1 free credit, no card needed.", color: "#b8924a", bg: "#fdf8e8", border: "#e8d8a8" },
              { href: "/drawing-prompts", title: "Drawing Prompts", desc: "Traditional art inspiration for sketching, painting, and illustration at every skill level.", color: "#c47ab8", bg: "#faf0f8", border: "#e8c0e0" },
              { href: "/chibi-prompt", title: "Chibi Prompt", desc: "5 viral chibi styles — turn your photo into adorable 3D mini characters with one click.", color: "#7c3aed", bg: "#ede9fe", border: "#c4b5fd" },
              { href: "/mothers-day", title: "Mother's Day Poster Templates", desc: "4 curated poster designs to generate gallery-quality art prints for Mom — pick a template, upload your photo.", color: "#e06088", bg: "#fef0f4", border: "#f0b8c8" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card"
                style={{ display: "block", padding: "20px", textDecoration: "none", borderLeft: `3px solid ${item.color}`, transition: "box-shadow 0.2s, transform 0.15s" }}
              >
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "80px 32px" }}>
        <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <span className="section-label" style={{ display: "block", marginBottom: 12 }}>Common Questions</span>
            <h2 className="font-serif" style={{ fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Frequently asked questions
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {FAQ_ITEMS.map(({ q, a }, i) => (
              <div key={q} style={{ borderBottom: i < FAQ_ITEMS.length - 1 ? "1px solid var(--border)" : "none", padding: "24px 0" }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.4 }}>{q}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ textAlign: "center", paddingBottom: 32 }}>
        <a href="https://www.dexigner.com/directory/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", opacity: 0.35 }} title="Design Directory">
          <img src="https://www.dexigner.com/images/logo/dexigner-logo.svg" alt="Design Directory" style={{ height: 12, width: "auto", border: "none", padding: "6px" }} />
        </a>
      </div>

      {/* Modal */}
      {selectedPrompt && (
        <PromptDetailModal
          prompt={selectedPrompt}
          catInfo={categories.find((c) => c.id === selectedPrompt.category)}
          onClose={() => setSelectedPrompt(null)}
        />
      )}
    </div>
  );
}

// ─── FeedCard — masonry card with natural image height ───────────────────────
function FeedCard({ prompt, copied, onCopy, categories }: { prompt: AIPrompt; copied: boolean; onCopy: () => void; categories: CategoryInfo[] }) {
  const catInfo = categories.find((c) => c.id === prompt.category);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link href={`/prompts/${prompt.slug}`} className="feed-card" style={{ display: "block", textDecoration: "none", color: "inherit", borderRadius: 12, overflow: "hidden", background: "#fff", border: "1px solid var(--border)", breakInside: "avoid", marginBottom: 16 }}>
      <div style={{ position: "relative", overflow: "hidden", lineHeight: 0, background: "var(--bg-warm)", ...(imgLoaded ? {} : { aspectRatio: "4 / 3" }), transition: "aspect-ratio 0.3s ease" }}>
        <Image src={prompt.imageUrl} alt={prompt.imageAlt} width={600} height={400} style={{ width: "100%", height: imgLoaded ? "auto" : "100%", objectFit: imgLoaded ? undefined : "cover", display: "block", transition: "height 0.3s ease, opacity 0.4s ease", opacity: imgLoaded ? 1 : 0.6 }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" loading="lazy" onLoad={() => setImgLoaded(true)} />
        {/* Model badges on image */}
        <div style={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 4, flexWrap: "wrap" }}>
          {prompt.aiModels.slice(0, 1).map((model) => (
            <span key={model} style={{ padding: "3px 8px", borderRadius: 5, fontSize: 10, fontWeight: 600, color: "#fff", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}>
              {MODEL_DISPLAY[model].label}
            </span>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: catInfo?.color ?? "var(--text-muted)" }}>
            {catInfo?.label}
          </span>
        </div>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 10px", lineHeight: 1.35 }}>
          {prompt.title}
        </h3>
        {/* Buttons — always visible */}
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onCopy(); }}
            style={{
              padding: "5px 10px", borderRadius: 6, border: "1px solid var(--border)",
              background: copied ? "#eef6f2" : "var(--surface)", color: copied ? "#5a9e7a" : "var(--text-secondary)",
              fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, transition: "all 0.15s",
            }}
          >
            {copied ? (
              <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
          <Link
            href={`/generate?prompt=${encodeURIComponent(prompt.prompt)}`}
            onClick={(e) => e.stopPropagation()}
            style={{ padding: "5px 10px", borderRadius: 6, border: "none", background: "var(--accent)", color: "#fff", fontSize: 11, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            Generate
          </Link>
        </div>
      </div>
    </Link>
  );
}

// ─── FeaturedPromptCard (links to detail page) ──────────────────────────────
function FeaturedPromptCard({ prompt, copied, onCopy, categories }: { prompt: AIPrompt; copied: boolean; onCopy: () => void; categories: CategoryInfo[] }) {
  const catInfo = categories.find((c) => c.id === prompt.category);
  const truncatedPrompt = prompt.prompt.length > 110 ? prompt.prompt.slice(0, 110).trimEnd() + "\u2026" : prompt.prompt;

  return (
    <Link href={`/prompts/${prompt.slug}`} className="img-card" style={{ display: "block", cursor: "pointer", textDecoration: "none" }}>
      <div className="img-card-image-wrap">
                <Image src={prompt.imageUrl} alt={prompt.imageAlt} width={800} height={600} className="img-card-image" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
        <div className="img-card-overlay">
          {prompt.aiModels.map((model) => {
            const m = MODEL_DISPLAY[model];
            return (
              <span key={model} style={{ padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, color: "#ffffff", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)" }}>
                {m.label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="img-card-body">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: catInfo?.color ?? "var(--text-muted)" }}>
            {catInfo?.label}
          </span>
          <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-muted)", textTransform: "capitalize" }}>
            {prompt.difficulty}
          </span>
        </div>

        <h3 className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", margin: 0, lineHeight: 1.3 }}>
          {prompt.title}
        </h3>

        <p className="prompt-text-preview">{truncatedPrompt}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onCopy(); }}
            className={`btn-ghost ${copied ? "copy-success" : ""}`}
            style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 14px", fontSize: 12, fontWeight: 500, minWidth: 80 }}
          >
            {copied ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5a9e7a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
          <Link
            href={`/generate?prompt=${encodeURIComponent(prompt.prompt)}`}
            onClick={(e) => { e.stopPropagation(); }}
            className="btn-ghost"
            style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 14px", fontSize: 12, fontWeight: 500, textDecoration: "none", color: "#c06a3e" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Generate
          </Link>
          <span
            className="btn-ghost"
            style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 14px", fontSize: 12, fontWeight: 500 }}
          >
            Details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── CategoryCard ────────────────────────────────────────────────────────────
function CategoryCard({ category }: { category: CategoryInfo }) {
  return (
    <Link
      href={`/ai-prompts?category=${category.id}`}
      className="card"
      style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", textDecoration: "none", transition: "box-shadow 0.2s, border-color 0.2s, transform 0.2s" }}
    >
      <div style={{ width: 8, height: 40, borderRadius: 4, background: category.color, flexShrink: 0, opacity: 0.7 }} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 3 }}>{category.label}</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{category.description}</div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M9 18l6-6-6-6" /></svg>
    </Link>
  );
}

// ─── FAQ Data ────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What are AI image prompts?",
    a: "AI image prompts are text descriptions you feed into image generation models like GPT Image 2 or Nano Banana 2 to create specific visuals. A well-crafted prompt includes subject, style, lighting, composition, and technical details \u2014 the difference between a generic result and a stunning one. Every prompt in our library is tested and ready to copy-paste.",
  },
  {
    q: "What is GPT Image 2 and why is it special?",
    a: "GPT Image 2 is OpenAI\u2019s latest image generation model. Nano Banana 2 (powered by Google Gemini) is equally powerful, with exceptional natural language understanding and high visual fidelity. Both excel at photorealistic images, UI mockups, and precise text rendering.",
  },
  {
    q: "Can I use these prompts in Nano Banana 2?",
    a: "Yes. While each prompt is optimized for GPT Image 2, most work great across all major AI image generators. Each prompt page shows which models it\u2019s compatible with. You may need to adjust some model-specific parameters (like Midjourney\u2019s --ar flag), but the core description transfers seamlessly.",
  },
  {
    q: "How do I find the best AI image prompts for my use case?",
    a: "Browse by category \u2014 we have 9 categories covering Realistic Photography, Character Design, UI/UX, Poster Design, Film & Cinematic, Game Art, Product Photography, Infographic, and Photo Editing. Each prompt shows which AI model it works best with and includes a sample output image, so you can find the right style before you generate.",
  },
  {
    q: "Are these prompts free?",
    a: "Yes, completely free. No sign-up, no account, no paywall. Browse all AI prompts, use the drawing generator, and create. We add new content regularly across all categories.",
  },
  {
    q: "How do I write a good AI image prompt?",
    a: "A great AI image prompt has five key elements: a clear subject, a specific style or art direction, lighting and mood, composition details, and technical specifications (resolution, aspect ratio). Our prompts include all of these, and each comes with a breakdown explaining why each element works.",
  },
  {
    q: "What categories of AI prompts do you have?",
    a: "We cover nine categories: Realistic Photography, Photo Editing, Character Design, UI/UX Design, Poster & Graphic Design, Infographic & Data Viz, Film & Cinematic, Game Art, and Product & E-commerce. Each category has prompts ranging from beginner to advanced difficulty.",
  },
  {
    q: "How often do you add new prompts?",
    a: "We add new prompts regularly, especially as new AI image models launch or existing ones get updates. GPT Image 2 prompts are our current focus, with new prompts added weekly across all categories.",
  },
];
