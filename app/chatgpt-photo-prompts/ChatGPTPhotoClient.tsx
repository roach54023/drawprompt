"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  aiPrompts,
  categories,
  type AIPrompt,
  type CategoryInfo,
} from "@/lib/aiPromptData";

// ─── Filter prompts for this page ─────────────────────────────────────────
function getChatGPTPhotoPrompts(): {
  creation: AIPrompt[];
  editing: AIPrompt[];
} {
  const chatgptPhoto = aiPrompts.filter(
    (p) =>
      (p.category === "photography" || p.category === "photo-editing") &&
      p.aiModels.includes("chatgpt")
  );
  return {
    creation: chatgptPhoto.filter((p) => p.category === "photography"),
    editing: chatgptPhoto.filter((p) => p.category === "photo-editing"),
  };
}

const photographyCategory = categories.find((c) => c.id === "photography");
const photoEditingCategory = categories.find((c) => c.id === "photo-editing");

// ─── Model display config ─────────────────────────────────────────────────
const MODEL_DISPLAY: Record<string, { label: string; color: string; bg: string }> = {
  "gpt-image-2": { label: "GPT Image 2", color: "#c4714a", bg: "#fdf0e8" },
  chatgpt:        { label: "ChatGPT",     color: "#5a9e7a", bg: "#eef6f2" },
  midjourney:     { label: "Midjourney",   color: "#8b7ab8", bg: "#f2f0f8" },
  "dall-e":       { label: "DALL-E",       color: "#7b9eb8", bg: "#eef4f8" },
};

// ─── FAQ Data ─────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "Can ChatGPT edit my photos?",
    a: "Yes. With GPT Image 2 integrated into ChatGPT, you can upload a photo and ask ChatGPT to change the background, apply a style transfer, adjust colors, remove objects, or composite multiple images together. The prompts on this page are designed to get the best results from ChatGPT's photo editing capabilities.",
  },
  {
    q: "What's the difference between photo creation and photo editing prompts?",
    a: "Photo creation prompts generate entirely new photorealistic images from a text description \u2014 no source image needed. Photo editing prompts are designed to transform an existing photo you upload to ChatGPT, applying effects like style transfer, color grading, background replacement, or creative compositing.",
  },
  {
    q: "Which ChatGPT plan do I need for photo prompts?",
    a: "ChatGPT's image generation with GPT Image 2 is available on ChatGPT Plus, Team, and Enterprise plans. Free-tier users have limited access. For photo editing (uploading and modifying images), you need a Plus plan or higher.",
  },
  {
    q: "How do I get the best results from ChatGPT photo prompts?",
    a: "Be specific about the look you want: mention camera model, lens, lighting conditions, and film stock for realism. For editing prompts, describe exactly what you want changed and what should stay the same. Include aspect ratio and resolution at the end of your prompt for consistent output dimensions.",
  },
  {
    q: "Can I use these prompts with other AI tools like Midjourney or DALL-E?",
    a: "Most photo creation prompts work well across ChatGPT, Midjourney, and DALL-E \u2014 each prompt page shows which models it supports. Photo editing prompts are specifically designed for ChatGPT's upload-and-edit workflow, but the descriptive portions can inspire prompts in other tools.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────
export default function ChatGPTPhotoClient() {
  const { creation, editing } = useMemo(() => getChatGPTPhotoPrompts(), []);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: AIPrompt) => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: 56 }}>
        <h1
          className="font-serif"
          style={{
            fontSize: "clamp(30px, 5vw, 48px)",
            fontWeight: 600,
            color: "#2c2416",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          ChatGPT Photo Prompts
        </h1>
        <p
          style={{
            fontSize: "clamp(15px, 2vw, 17px)",
            color: "#6b5d4a",
            maxWidth: 560,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          The best prompts for{" "}
          <strong style={{ color: "#5a9e7a", fontWeight: 600 }}>creating</strong>{" "}
          and{" "}
          <strong style={{ color: "#c47ab8", fontWeight: 600 }}>editing</strong>{" "}
          photos with ChatGPT. Style transfer, background replacement, color grading,
          and creative compositing &mdash; ready to copy and paste.
        </p>

        {/* Stat pills */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
          {[
            { label: "Copy & paste ready" },
            { label: "Photo creation + editing" },
            { label: "Free, no sign-up" },
          ].map((pill) => (
            <span
              key={pill.label}
              style={{
                padding: "4px 12px",
                borderRadius: 100,
                background: "#ffffff",
                border: "1px solid #e8e0d0",
                fontSize: 12,
                color: "#a8967e",
                fontWeight: 500,
              }}
            >
              {pill.label}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PHOTO CREATION PROMPTS
      ══════════════════════════════════════════ */}
      <PromptSection
        title="Photo Creation Prompts"
        subtitle="Generate photorealistic images from scratch with ChatGPT. Portraits, street photography, macro, food \u2014 all created from text."
        category={photographyCategory}
        prompts={creation}
        copiedId={copiedId}
        onCopy={handleCopy}
      />

      {/* ══════════════════════════════════════════
          PHOTO EDITING PROMPTS
      ══════════════════════════════════════════ */}
      <PromptSection
        title="Photo Editing Prompts"
        subtitle="Upload a photo to ChatGPT and transform it with these editing prompts. Style transfer, retouching, color grading, and compositing."
        category={photoEditingCategory}
        prompts={editing}
        copiedId={copiedId}
        onCopy={handleCopy}
      />

      {/* ══════════════════════════════════════════
          HOW TO USE CHATGPT FOR PHOTO EDITING
      ══════════════════════════════════════════ */}
      <div className="animate-fade-up" style={{ marginBottom: 72 }}>
        {/* Section heading */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{ flex: 1, height: 1, background: "#e8e0d0" }} />
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#a8967e", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            Guide
          </span>
          <div style={{ flex: 1, height: 1, background: "#e8e0d0" }} />
        </div>

        <h2
          className="font-serif"
          style={{
            fontSize: "clamp(20px, 3vw, 26px)",
            fontWeight: 600,
            color: "#2c2416",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          How to Use ChatGPT for Photo Editing
        </h2>
        <p style={{ fontSize: 14, color: "#a8967e", textAlign: "center", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
          Four simple steps to edit any photo with ChatGPT.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
            gap: 14,
          }}
        >
          {[
            { step: "1", title: "Open ChatGPT", desc: "Go to chat.openai.com and make sure you\u2019re on a Plus plan or higher for image generation.", color: "#5a9e7a", bg: "#eef6f2" },
            { step: "2", title: "Upload Your Photo", desc: "Click the attachment icon and upload the photo you want to edit. ChatGPT will analyze it.", color: "#7b9eb8", bg: "#eef4f8" },
            { step: "3", title: "Paste the Prompt", desc: "Copy a prompt from this page and paste it into ChatGPT. Add any specific changes you want.", color: "#c47ab8", bg: "#faf0f8" },
            { step: "4", title: "Refine & Download", desc: "ChatGPT generates the edited image. Ask for adjustments if needed, then download the result.", color: "#c4714a", bg: "#fdf0e8" },
          ].map((item) => (
            <div key={item.step} className="card" style={{ padding: "24px 20px", textAlign: "center" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: item.bg,
                  color: item.color,
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                {item.step}
              </span>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#2c2416", marginBottom: 6 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 12, color: "#6b5d4a", lineHeight: 1.65, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          EXPLORE MORE
      ══════════════════════════════════════════ */}
      <div className="animate-fade-up" style={{ marginBottom: 72 }}>
        <div
          className="card"
          style={{
            padding: "36px 32px",
            textAlign: "center",
            background: "#fdf9f4",
            border: "1.5px dashed #e8e0d0",
          }}
        >
          <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>📷</span>
          <h2
            className="font-serif"
            style={{ fontSize: 20, fontWeight: 600, color: "#2c2416", marginBottom: 8 }}
          >
            Explore All AI Prompt Categories
          </h2>
          <p style={{ fontSize: 14, color: "#6b5d4a", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 20px" }}>
            Looking for more than just photo prompts? Browse our full library covering
            character design, UI/UX, posters, game art, and more &mdash; all optimized
            for ChatGPT and GPT Image 2.
          </p>
          <Link
            href="/"
            className="btn-ghost"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              textDecoration: "none",
              padding: "10px 24px",
            }}
          >
            Browse All AI Prompts &rarr;
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SEO FAQ
      ══════════════════════════════════════════ */}
      <div style={{ marginBottom: 48, paddingTop: 40, borderTop: "1px solid #e8e0d0" }}>
        <h2
          className="font-serif"
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#2c2416",
            marginBottom: 28,
            letterSpacing: "-0.01em",
          }}
        >
          ChatGPT Photo Prompts &mdash; Frequently Asked Questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {FAQ_ITEMS.map(({ q, a }) => (
            <div key={q} style={{ borderBottom: "1px solid #e8e0d0", paddingBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#4a3c2c", marginBottom: 8 }}>
                {q}
              </h3>
              <p style={{ fontSize: 13, color: "#7a6a56", lineHeight: 1.75, margin: 0 }}>
                {a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PromptSection sub-component ──────────────────────────────────────────
function PromptSection({
  title,
  subtitle,
  category,
  prompts,
  copiedId,
  onCopy,
}: {
  title: string;
  subtitle: string;
  category: CategoryInfo | undefined;
  prompts: AIPrompt[];
  copiedId: string | null;
  onCopy: (prompt: AIPrompt) => void;
}) {
  if (prompts.length === 0) {
    return null;
  }

  return (
    <div className="animate-fade-up" style={{ marginBottom: 72 }}>
      {/* Section heading */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <div style={{ flex: 1, height: 1, background: "#e8e0d0" }} />
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#a8967e", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          {category?.icon} {category?.label ?? title}
        </span>
        <div style={{ flex: 1, height: 1, background: "#e8e0d0" }} />
      </div>

      <h2
        className="font-serif"
        style={{
          fontSize: "clamp(20px, 3vw, 26px)",
          fontWeight: 600,
          color: "#2c2416",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: 14, color: "#a8967e", textAlign: "center", marginBottom: 32, maxWidth: 520, margin: "0 auto 32px" }}>
        {subtitle}
      </p>

      {/* Prompt cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
          gap: 16,
        }}
      >
        {prompts.map((prompt) => (
          <PhotoPromptCard
            key={prompt.id}
            prompt={prompt}
            copied={copiedId === prompt.id}
            onCopy={() => onCopy(prompt)}
            categoryInfo={category}
          />
        ))}
      </div>
    </div>
  );
}

// ─── PhotoPromptCard sub-component ────────────────────────────────────────
function PhotoPromptCard({
  prompt,
  copied,
  onCopy,
  categoryInfo,
}: {
  prompt: AIPrompt;
  copied: boolean;
  onCopy: () => void;
  categoryInfo: CategoryInfo | undefined;
}) {
  const truncatedPrompt =
    prompt.prompt.length > 140
      ? prompt.prompt.slice(0, 140).trimEnd() + "\u2026"
      : prompt.prompt;

  return (
    <div
      className="card"
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* Top row: category + difficulty */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <span
          className="tag"
          style={{
            color: categoryInfo?.color ?? "#a8967e",
            background: categoryInfo?.bg ?? "#faf8f4",
            borderColor: categoryInfo?.color ? `${categoryInfo.color}40` : "#e8e0d0",
          }}
        >
          {categoryInfo?.icon} {categoryInfo?.label}
        </span>
        <span style={{ fontSize: 11, fontWeight: 500, color: "#a8967e", textTransform: "capitalize" }}>
          {prompt.difficulty}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-serif"
        style={{ fontSize: 17, fontWeight: 600, color: "#2c2416", margin: 0, lineHeight: 1.35 }}
      >
        {prompt.title}
      </h3>

      {/* Prompt text preview */}
      <p
        style={{
          fontSize: 13,
          color: "#6b5d4a",
          lineHeight: 1.65,
          margin: 0,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {truncatedPrompt}
      </p>

      {/* Model badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {prompt.aiModels.map((model) => {
          const m = MODEL_DISPLAY[model] ?? { label: model, color: "#a8967e", bg: "#faf8f4" };
          const isChatGPT = model === "chatgpt";
          return (
            <span
              key={model}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "2px 8px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: isChatGPT ? 600 : 500,
                color: m.color,
                background: m.bg,
                border: isChatGPT ? `1px solid ${m.color}40` : "1px solid transparent",
              }}
            >
              {m.label}
            </span>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto" }}>
        <button
          onClick={onCopy}
          className="btn-ghost"
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
          View Details &rarr;
        </Link>
      </div>
    </div>
  );
}
