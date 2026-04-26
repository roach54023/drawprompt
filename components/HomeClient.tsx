"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getFeaturedAIPrompts,
  categories,
  type AIPrompt,
  type AIModel,
  type CategoryInfo,
} from "@/lib/aiPromptData";

const MODEL_DISPLAY: Record<AIModel, { label: string; color: string; bg: string }> = {
  "gpt-image-2": { label: "GPT Image 2", color: "#c06a3e", bg: "#fdf0e8" },
  chatgpt:       { label: "ChatGPT",      color: "#5a9e7a", bg: "#eef6f2" },
  midjourney:    { label: "Midjourney",    color: "#8b7ab8", bg: "#f2f0f8" },
  "dall-e":      { label: "DALL-E",        color: "#7b9eb8", bg: "#eef4f8" },
};

// Supported AI model badges for hero
const HERO_MODELS = [
  { label: "GPT Image 2", color: "#c06a3e" },
  { label: "ChatGPT", color: "#5a9e7a" },
  { label: "Midjourney", color: "#8b7ab8" },
  { label: "DALL-E", color: "#7b9eb8" },
];

export default function HomeClient() {
  const featured = getFeaturedAIPrompts(6);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: AIPrompt) => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════
          HERO — Clean, text-focused, zero images (high-end brand style)
      ═══════════════════════════════════════════════════════ */}
      <section
        className="section-dark"
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grain texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            pointerEvents: "none",
          }}
        />

        {/* Decorative accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1,
            height: 48,
            background: "linear-gradient(to bottom, transparent, var(--accent))",
            opacity: 0.3,
          }}
        />

        <div
          style={{
            maxWidth: "var(--max-w)",
            margin: "0 auto",
            padding: "88px 32px 64px",
            textAlign: "center",
          }}
        >
          {/* Top label */}
          <div
            className="animate-fade-up"
            style={{
              opacity: 0,
              animationDelay: "0.1s",
              animationFillMode: "forwards",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              Curated Prompt Library
            </span>
          </div>

          {/* Main headline — centered, impactful */}
          <h1
            className="font-serif animate-fade-up"
            style={{
              fontSize: "clamp(36px, 5.5vw, 64px)",
              fontWeight: 700,
              color: "var(--text-on-dark)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              marginBottom: 20,
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
              opacity: 0,
              animationDelay: "0.2s",
              animationFillMode: "forwards",
            }}
          >
            Craft stunning images
            <br />
            with <span style={{ color: "var(--accent)" }}>precise prompts</span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-up"
            style={{
              fontSize: "clamp(15px, 1.6vw, 17px)",
              color: "var(--text-on-dark-2)",
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
              marginBottom: 24,
              opacity: 0,
              animationDelay: "0.3s",
              animationFillMode: "forwards",
            }}
          >
            Copy-ready prompts for GPT Image 2, ChatGPT, Midjourney, and DALL-E.
            Each one tested, broken down, and paired with example output.
          </p>

          {/* Model badges */}
          <div
            className="animate-fade-up"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 28,
              opacity: 0,
              animationDelay: "0.35s",
              animationFillMode: "forwards",
            }}
          >
            {HERO_MODELS.map((m) => (
              <span
                key={m.label}
                style={{
                  padding: "5px 14px",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 500,
                  color: m.color,
                  border: `1px solid ${m.color}33`,
                  background: `${m.color}0d`,
                  letterSpacing: "0.01em",
                }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* CTA buttons — centered */}
          <div
            className="animate-fade-up"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 40,
              opacity: 0,
              animationDelay: "0.4s",
              animationFillMode: "forwards",
            }}
          >
            <Link
              href="/gpt-image-2-prompts/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--bg-deep)",
                background: "var(--text-on-dark)",
                textDecoration: "none",
                transition: "transform 0.15s, box-shadow 0.2s",
                letterSpacing: "0.01em",
              }}
            >
              Browse Prompts
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/ai-prompts/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--text-on-dark-2)",
                background: "transparent",
                border: "1.5px solid var(--border-dark)",
                textDecoration: "none",
                transition: "border-color 0.15s, color 0.15s",
                letterSpacing: "0.01em",
              }}
            >
              View All Prompts
            </Link>
          </div>

          {/* Stats row — centered, elegant */}
          <div
            className="animate-fade-up"
            style={{
              display: "inline-flex",
              gap: 48,
              paddingTop: 24,
              borderTop: "1px solid var(--border-dark)",
              opacity: 0,
              animationDelay: "0.5s",
              animationFillMode: "forwards",
            }}
          >
            {[
              { value: "47+", label: "Curated Prompts" },
              { value: "9", label: "Categories" },
              { value: "4", label: "AI Models" },
              { value: "Free", label: "No Sign-up" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  className="font-serif"
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: "var(--text-on-dark)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-on-dark-2)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURED PROMPTS — Editorial gallery
      ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "80px 32px",
        }}
      >
        {/* Section header — left-aligned, editorial */}
        <div style={{ marginBottom: 48, maxWidth: 560 }}>
          <span className="section-label" style={{ display: "block", marginBottom: 12 }}>
            Featured Collection
          </span>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 700,
              marginBottom: 12,
              letterSpacing: "-0.02em",
            }}
          >
            Handpicked prompts, real results
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Each prompt comes with an example image, a detailed breakdown of why it works,
            and tips for customization. Copy, paste, create.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="featured-grid">
          {featured.map((prompt) => (
            <PromptImageCard
              key={prompt.id}
              prompt={prompt}
              copied={copiedId === prompt.id}
              onCopy={() => handleCopy(prompt)}
            />
          ))}
        </div>

        {/* View all */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link
            href="/gpt-image-2-prompts/"
            className="btn-secondary"
            style={{ textDecoration: "none" }}
          >
            View all prompts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CATEGORIES — Clean grid
      ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--bg-warm)",
          padding: "80px 32px",
        }}
      >
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
          <div style={{ marginBottom: 48, maxWidth: 560 }}>
            <span className="section-label" style={{ display: "block", marginBottom: 12 }}>
              Browse by Category
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(24px, 3.5vw, 36px)",
                fontWeight: 700,
                marginBottom: 12,
                letterSpacing: "-0.02em",
              }}
            >
              Find your style
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              From photorealistic portraits to game concept art — nine categories
              covering every visual style.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              gap: 12,
            }}
          >
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOR HUMAN ARTISTS — Minimal CTA
      ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "80px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 400px", minWidth: 0 }}>
            <span className="section-label" style={{ display: "block", marginBottom: 12 }}>
              For Traditional Artists
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(24px, 3.5vw, 36px)",
                fontWeight: 700,
                marginBottom: 16,
                letterSpacing: "-0.02em",
              }}
            >
              No AI needed.
              <br />
              Just your sketchbook.
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: 28,
                maxWidth: 480,
              }}
            >
              Our original Drawing Prompt Generator creates complete creative briefs
              with mood, subject, palette, and style. Over 150 billion unique combinations
              to spark your next piece.
            </p>
            <Link
              href="/generator/"
              className="btn-secondary"
              style={{ textDecoration: "none" }}
            >
              Open Generator
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div
            style={{
              flex: "0 0 auto",
              width: 320,
              height: 320,
              borderRadius: "var(--radius-xl)",
              background: "var(--bg-warm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--border)",
            }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path
                d="M20 60L35 25L50 45L60 35L70 55"
                stroke="var(--text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="25" cy="22" r="4" stroke="var(--text-muted)" strokeWidth="2" />
              <path
                d="M10 65H70"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ — Clean, editorial
      ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          padding: "80px 32px",
        }}
      >
        <div
          style={{
            maxWidth: "var(--max-w-narrow)",
            margin: "0 auto",
          }}
        >
          <div style={{ marginBottom: 48 }}>
            <span className="section-label" style={{ display: "block", marginBottom: 12 }}>
              Common Questions
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(24px, 3.5vw, 32px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Frequently asked questions
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {FAQ_ITEMS.map(({ q, a }, i) => (
              <div
                key={q}
                style={{
                  borderBottom: i < FAQ_ITEMS.length - 1 ? "1px solid var(--border)" : "none",
                  padding: "24px 0",
                }}
              >
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                    lineHeight: 1.4,
                  }}
                >
                  {q}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subtle directory link */}
      <div style={{ textAlign: "center", paddingBottom: 32 }}>
        <a
          href="https://www.dexigner.com/directory/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", opacity: 0.35 }}
          title="Design Directory"
        >
          <img
            src="https://www.dexigner.com/images/logo/dexigner-logo.svg"
            alt="Design Directory"
            style={{ height: 12, width: "auto", border: "none", padding: "6px" }}
          />
        </a>
      </div>
    </div>
  );
}

// ─── PromptImageCard — Editorial gallery card ────────────────────────────────
function PromptImageCard({
  prompt,
  copied,
  onCopy,
}: {
  prompt: AIPrompt;
  copied: boolean;
  onCopy: () => void;
}) {
  const catInfo = categories.find((c) => c.id === prompt.category);
  const truncatedPrompt =
    prompt.prompt.length > 110
      ? prompt.prompt.slice(0, 110).trimEnd() + "\u2026"
      : prompt.prompt;

  return (
    <div className="img-card">
      {/* Image */}
      <div className="img-card-image-wrap">
        <Image
          src={prompt.imageUrl}
          alt={prompt.imageAlt}
          width={800}
          height={600}
          className="img-card-image"
          unoptimized
        />
        <div className="img-card-overlay">
          {prompt.aiModels.map((model) => {
            const m = MODEL_DISPLAY[model];
            return (
              <span
                key={model}
                style={{
                  padding: "3px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#ffffff",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {m.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div className="img-card-body">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: catInfo?.color ?? "var(--text-muted)",
            }}
          >
            {catInfo?.label}
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "var(--text-muted)",
              textTransform: "capitalize",
            }}
          >
            {prompt.difficulty}
          </span>
        </div>

        <h3
          className="font-serif"
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          <Link
            href={`/ai-prompts/${prompt.slug}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {prompt.title}
          </Link>
        </h3>

        <p className="prompt-text-preview">{truncatedPrompt}</p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 4,
          }}
        >
          <button
            onClick={onCopy}
            className={`btn-ghost ${copied ? "copy-success" : ""}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 500,
              minWidth: 80,
            }}
          >
            {copied ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5a9e7a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
          <Link
            href={`/ai-prompts/${prompt.slug}`}
            className="btn-ghost"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 14px",
              textDecoration: "none",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            Details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── CategoryCard — Minimal, no emoji ────────────────────────────────────────
function CategoryCard({ category }: { category: CategoryInfo }) {
  return (
    <Link
      href={`/ai-prompts?category=${category.id}`}
      className="card"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 24px",
        textDecoration: "none",
        transition: "box-shadow 0.2s, border-color 0.2s, transform 0.2s",
      }}
    >
      <div
        style={{
          width: 8,
          height: 40,
          borderRadius: 4,
          background: category.color,
          flexShrink: 0,
          opacity: 0.7,
        }}
      />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 3,
          }}
        >
          {category.label}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            lineHeight: 1.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {category.description}
        </div>
      </div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--text-light)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
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
    q: "Are these AI image prompts free?",
    a: "Yes, completely free. No sign-up, no account, no paywall. Browse all prompts, copy them, and use them in your favorite AI image tool. We add new prompts regularly across all categories.",
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
    q: "Do you also have prompts for human artists?",
    a: "Yes! Our original Drawing Prompt Generator creates complete creative briefs \u2014 mood, subject, palette, and style \u2014 with over 150 billion combinations. It\u2019s designed for traditional artists, illustrators, and anyone who wants to sketch without AI. Visit the Generator page to try it.",
  },
  {
    q: "How often do you add new prompts?",
    a: "We add new prompts regularly, especially as new AI image models launch or existing ones get updates. GPT Image 2 prompts are our current focus, with new prompts added weekly across all categories.",
  },
];
