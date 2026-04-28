"use client";

import { useState } from "react";
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

const HUMAN_TOOLS = [
  {
    id: "generator",
    title: "Drawing Prompt Generator",
    description: "150 billion+ unique combinations across 6 creative dimensions. Choose your difficulty and let inspiration find you.",
    href: "/generator/",
    iconPath: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    accent: "#c06a3e",
    bg: "#fdf0e8",
  },
  {
    id: "daily",
    title: "Daily Challenge",
    description: "A new prompt every day, same for everyone. Compare your interpretation with artists worldwide.",
    href: "/daily-challenge/",
    iconPath: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
    accent: "#5a9e7a",
    bg: "#eef6f2",
  },
  {
    id: "character",
    title: "Character Design",
    description: "Focused prompts for figure drawing, character concepts, poses, and personality-driven designs.",
    href: "/character/",
    iconPath: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z",
    accent: "#c4714a",
    bg: "#fdf0e8",
  },
  {
    id: "anime",
    title: "Anime & Manga",
    description: "Anime-styled prompts with dynamic poses, expressive emotions, and manga panel compositions.",
    href: "/anime/",
    iconPath: "M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
    accent: "#8b7ab8",
    bg: "#f2f0f8",
  },
  {
    id: "kids",
    title: "For Kids",
    description: "Safe, fun, and imaginative prompts perfect for young artists. Cozy themes and magical worlds.",
    href: "/for-kids/",
    iconPath: "M12 2a10 10 0 100 20 10 10 0 000-20zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01",
    accent: "#c47ab8",
    bg: "#faf0f8",
  },
  {
    id: "random",
    title: "Quick Random",
    description: "No decisions needed. Hit the button, get a prompt, start drawing. Pure creative spontaneity.",
    href: "/random/",
    iconPath: "M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5",
    accent: "#b8924a",
    bg: "#fdf8e8",
  },
];

export default function HomeClient({
  featured,
  categories,
}: {
  featured: AIPrompt[];
  categories: CategoryInfo[];
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<AIPrompt | null>(null);

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
      {/* ══════════ HERO ══════════ */}
      <section className="section-dark" style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: 1, height: 48,
            background: "linear-gradient(to bottom, transparent, var(--accent))", opacity: 0.3,
          }}
        />

        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "88px 32px 64px", textAlign: "center" }}>
          <div className="animate-fade-up" style={{ opacity: 0, animationDelay: "0.1s", animationFillMode: "forwards", marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)" }}>
              For AI & Human Artists
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
            The prompt library
            <br />
            for <span style={{ color: "var(--accent)" }}>every</span> artist
          </h1>

          <p
            className="animate-fade-up"
            style={{
              fontSize: "clamp(15px, 1.6vw, 17px)", color: "var(--text-on-dark-2)",
              maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7, marginBottom: 24,
              opacity: 0, animationDelay: "0.3s", animationFillMode: "forwards",
            }}
          >
            Copy-ready AI image prompts for GPT Image 2, ChatGPT, Midjourney & DALL-E —
            plus a drawing prompt generator with 150 billion+ combinations for your sketchbook.
          </p>

          <div className="animate-fade-up" style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 28, opacity: 0, animationDelay: "0.35s", animationFillMode: "forwards" }}>
            {HERO_MODELS.map((m) => (
              <span key={m.label} style={{ padding: "5px 14px", borderRadius: 100, fontSize: 12, fontWeight: 500, color: m.color, border: `1px solid ${m.color}33`, background: `${m.color}0d`, letterSpacing: "0.01em" }}>
                {m.label}
              </span>
            ))}
          </div>

          <div className="animate-fade-up" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 40, opacity: 0, animationDelay: "0.4s", animationFillMode: "forwards" }}>
            <Link
              href="/ai-prompts/"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px",
                borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 600,
                color: "var(--bg-deep)", background: "var(--text-on-dark)",
                textDecoration: "none", transition: "transform 0.15s, box-shadow 0.2s", letterSpacing: "0.01em",
              }}
            >
              AI Prompts
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link
              href="/generator/"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
                borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500,
                color: "var(--text-on-dark-2)", background: "transparent",
                border: "1.5px solid var(--border-dark)", textDecoration: "none",
                transition: "border-color 0.15s, color 0.15s", letterSpacing: "0.01em",
              }}
            >
              Drawing Prompts
            </Link>
          </div>

          <div className="animate-fade-up" style={{ display: "inline-flex", gap: 48, paddingTop: 24, borderTop: "1px solid var(--border-dark)", opacity: 0, animationDelay: "0.5s", animationFillMode: "forwards" }}>
            {[
              { value: "167+", label: "AI Prompts" },
              { value: "150B+", label: "Drawing Combos" },
              { value: "4", label: "AI Models" },
              { value: "Free", label: "No Sign-up" },
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

      {/* ══════════ FOR AI — Curated AI image prompts ══════════ */}
      <section style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ marginBottom: 48, maxWidth: 560 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "#c06a3e", background: "#fdf0e8", border: "1px solid #e8c0a0",
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" />
              </svg>
              For AI
            </span>
          </div>
          <h2 className="font-serif" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>
            AI image prompts, tested & ready
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
            Each prompt comes with an example image, a detailed breakdown of why it works,
            and tips for customization. Copy, paste, create.
          </p>
        </div>

<div className="featured-grid">
{featured.map((prompt) => (
<FeaturedPromptCard key={prompt.id} prompt={prompt} copied={copiedId === prompt.id} onCopy={() => handleCopy(prompt)} categories={categories} />
))}
</div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link href="/ai-prompts/" className="btn-secondary" style={{ textDecoration: "none" }}>
            View all AI prompts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* ══════════ FOR HUMANS — Drawing prompt tools ══════════ */}
      <section style={{ background: "var(--bg-warm)", padding: "80px 32px" }}>
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
          <div style={{ marginBottom: 48, maxWidth: 560 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#5a9e7a", background: "#eef6f2", border: "1px solid #b8dcc8",
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                </svg>
                For Humans
              </span>
            </div>
            <h2 className="font-serif" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>
              No AI needed. Just your sketchbook.
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
              Our drawing prompt generator creates complete creative briefs with mood, subject,
              palette, and style. Over 150 billion unique combinations to spark your next piece.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 16 }}>
            {HUMAN_TOOLS.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                className="card"
                style={{ display: "flex", gap: 16, padding: "24px", textDecoration: "none", color: "inherit", transition: "box-shadow 0.2s, border-color 0.2s, transform 0.2s" }}
              >
                <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: tool.bg, color: tool.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={tool.iconPath} />
                  </svg>
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4, lineHeight: 1.3 }}>
                    {tool.title}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
                    {tool.description}
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 4 }}>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            ))}
          </div>
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

      {/* ══════════ KEYWORD HUB — SEO internal link module ══════════ */}
      <section style={{ background: "var(--bg-warm)", padding: "64px 32px" }}>
        <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12, textAlign: "center" }}>
            Explore Drawing & AI Prompt Resources
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, textAlign: "center", maxWidth: 520, margin: "0 auto 36px" }}>
            Whether you draw by hand or generate with AI, we have the right prompts and guides for you.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: 14 }}>
            {[
              { href: "/drawing-prompts", title: "Drawing Prompts", desc: "Curated ideas for sketching, painting, and illustration across every skill level.", color: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8" },
              { href: "/how-to-use-gpt-image-2", title: "How to Use GPT Image 2", desc: "Step-by-step guide to writing effective prompts for OpenAI\u2019s latest image model.", color: "#c06a3e", bg: "#fdf0e8", border: "#f0c4a8" },
              { href: "/gpt-image-2-prompts", title: "GPT Image 2 Prompts", desc: "167+ tested, copy-paste prompts optimized for GPT Image 2 with example images.", color: "#8b7ab8", bg: "#f2f0f8", border: "#d0c8e8" },
              { href: "/generator", title: "Drawing Prompt Generator", desc: "150 billion+ unique combinations. Choose difficulty, mood, and style.", color: "#b8924a", bg: "#fdf8e8", border: "#e8d8a8" },
              { href: "/daily-challenge", title: "Daily Drawing Challenge", desc: "A new prompt every day. Same for everyone. Compare your interpretation.", color: "#c47ab8", bg: "#faf0f8", border: "#e8c0e0" },
              { href: "/random", title: "Random Drawing Prompt", desc: "No decisions needed. Hit the button and start drawing immediately.", color: "#7b9eb8", bg: "#eef4f8", border: "#c8dce8" },
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
    a: "AI image prompts are text descriptions you feed into image generation models like GPT Image 2, Midjourney, or DALL-E to create specific visuals. A well-crafted prompt includes subject, style, lighting, composition, and technical details \u2014 the difference between a generic result and a stunning one. Every prompt in our library is tested and ready to copy-paste.",
  },
  {
    q: "What is GPT Image 2 and why is it special?",
    a: "GPT Image 2 is OpenAI\u2019s latest image generation model built into ChatGPT. It excels at following precise text instructions, rendering accurate typography, and maintaining consistency across edits. It\u2019s particularly strong at photorealistic images, UI mockups, and designs requiring text \u2014 areas where earlier models struggled.",
  },
  {
    q: "Can I use these prompts in ChatGPT, Midjourney, and DALL-E?",
    a: "Yes. While each prompt is optimized for GPT Image 2, most work great across all major AI image generators. Each prompt page shows which models it\u2019s compatible with. You may need to adjust some model-specific parameters (like Midjourney\u2019s --ar flag), but the core description transfers seamlessly.",
  },
  {
    q: "What is the Drawing Prompt Generator?",
    a: "Our Drawing Prompt Generator creates complete creative briefs for human artists \u2014 mood, subject, palette, style, and optional challenges. With over 150 billion unique combinations across 6 dimensions, it\u2019s designed for traditional artists, illustrators, and anyone who wants to sketch without AI. Choose beginner, intermediate, or challenge difficulty.",
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
