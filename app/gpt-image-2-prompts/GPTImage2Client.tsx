"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  aiPrompts,
  categories,
  hasDetailPage,
  type AIPrompt,
  type AIPromptCategory,
  type AIModel,
  type CategoryInfo,
} from "@/lib/aiPromptData";
import PromptDetailModal from "@/components/PromptDetailModal";

/**
 * Interleave prompts so different categories appear alternately
 * instead of all photography/portrait prompts clustering at the top.
 */
function interleaveByCategory(prompts: AIPrompt[]): AIPrompt[] {
  // Group by category, preserving original order within each group
  const buckets = new Map<string, AIPrompt[]>();
  // Define a preferred category rotation order (most variety first)
  const categoryOrder = [
    "poster",
    "photography",
    "ui-design",
    "character",
    "game",
    "infographic",
    "product",
    "photo-editing",
    "film",
  ];

  for (const p of prompts) {
    const list = buckets.get(p.category) ?? [];
    list.push(p);
    buckets.set(p.category, list);
  }

  // Sort bucket keys by the defined order (unknown categories go last)
  const sortedKeys = [...buckets.keys()].sort(
    (a, b) =>
      (categoryOrder.indexOf(a) === -1 ? 99 : categoryOrder.indexOf(a)) -
      (categoryOrder.indexOf(b) === -1 ? 99 : categoryOrder.indexOf(b))
  );

  // Round-robin pick from each bucket
  const result: AIPrompt[] = [];
  let remaining = true;
  while (remaining) {
    remaining = false;
    for (const key of sortedKeys) {
      const bucket = buckets.get(key)!;
      if (bucket.length > 0) {
        result.push(bucket.shift()!);
        remaining = remaining || bucket.length > 0;
      }
    }
  }
  return result;
}

// Pinned prompts at top (newest batch first)
const PINNED_IDS = ["prompt-181", "prompt-180", "prompt-179", "prompt-178", "prompt-177", "prompt-173", "prompt-176", "prompt-174", "prompt-175", "prompt-169", "prompt-171", "prompt-170", "prompt-168"];
const gptImage2Prompts = (() => {
  const all = aiPrompts.filter((p) => p.aiModels.includes("gpt-image-2"));
  const pinned = PINNED_IDS.map((id) => all.find((p) => p.id === id)).filter(Boolean) as AIPrompt[];
  const rest = all.filter((p) => !PINNED_IDS.includes(p.id));
  return [...pinned, ...interleaveByCategory(rest)];
})();

const MODEL_DISPLAY: Record<AIModel, { label: string; color: string; bg: string }> = {
  "gpt-image-2": { label: "GPT Image 2", color: "#c06a3e", bg: "#fdf0e8" },
  chatgpt:       { label: "ChatGPT",      color: "#5a9e7a", bg: "#eef6f2" },
  midjourney:    { label: "Midjourney",    color: "#8b7ab8", bg: "#f2f0f8" },
  "dall-e":      { label: "DALL-E",        color: "#7b9eb8", bg: "#eef4f8" },
};

const FAQ_ITEMS = [
  {
    q: "What is GPT Image 2?",
    a: "GPT Image 2 is OpenAI\u2019s latest image generation model, released in April 2025. It\u2019s built natively into ChatGPT and represents a major leap in AI image generation \u2014 excelling at photorealism, accurate text rendering, precise instruction following, and maintaining consistency across multiple edits to the same image.",
  },
  {
    q: "How do I use GPT Image 2 prompts?",
    a: "Simply copy any prompt from this page, open ChatGPT (with GPT-4o or later), paste the prompt, and hit send. GPT Image 2 is the default image model in ChatGPT \u2014 no special setup needed. For best results, use the prompt exactly as written, then iterate with follow-up instructions.",
  },
  {
    q: "Are these GPT Image 2 prompts free to use?",
    a: "Yes, every prompt on this page is completely free. No sign-up, no paywall. Copy any prompt and use it in ChatGPT. We add new GPT Image 2 prompts regularly across all categories.",
  },
  {
    q: "What makes GPT Image 2 different from DALL-E or Midjourney?",
    a: "GPT Image 2 stands out in three key areas: it renders text inside images with near-perfect accuracy, it follows complex multi-part instructions more faithfully than other models, and it works conversationally \u2014 you can ask ChatGPT to edit, adjust, or iterate on the generated image in follow-up messages without starting over.",
  },
  {
    q: "Can I use these prompts in other AI image generators?",
    a: "While these prompts are optimized for GPT Image 2, most work well in Midjourney, DALL-E 3, and other generators. The core descriptions translate across models. You may need to adjust model-specific parameters (like Midjourney\u2019s --ar flag for aspect ratios), but the creative direction remains the same.",
  },
  {
    q: "How do I write better GPT Image 2 prompts?",
    a: "The best GPT Image 2 prompts are specific and structured. Include: a clear subject, art style or medium, lighting conditions, camera angle or composition, color palette (hex codes work great), and output specifications like aspect ratio and resolution. Check our tips section above for detailed guidance.",
  },
];

const TIPS = [
  {
    title: "Use Hex Color Codes",
    description:
      "GPT Image 2 understands hex colors precisely. Instead of saying \"blue background\", say \"deep navy background (#1a1a2e)\". This gives you exact control over the color palette.",
  },
  {
    title: "Specify Camera Settings",
    description:
      "For photorealistic results, include camera details: lens (\"85mm f/1.4\"), film stock (\"Kodak Portra 400\"), and shooting conditions (\"golden hour, backlit\").",
  },
  {
    title: "Define Aspect Ratios",
    description:
      "Always specify your desired aspect ratio (\"16:9\", \"3:4\", \"1:1\") and resolution (\"4K\"). This prevents awkward cropping and ensures your output fits the intended use.",
  },
  {
    title: "Describe Lighting Explicitly",
    description:
      "Lighting makes or breaks an image. Be specific: \"warm directional sunlight from the upper left casting long shadows\" beats \"good lighting\".",
  },
  {
    title: "Leverage Text Rendering",
    description:
      "GPT Image 2\u2019s standout feature is accurate text in images. Use it for posters, UI mockups, book covers, and signage. Wrap text in quotation marks.",
  },
  {
    title: "Iterate Conversationally",
    description:
      "Unlike other generators, GPT Image 2 lets you refine images through conversation. Start with a detailed prompt, then follow up with specific changes.",
  },
];

export default function GPTImage2Client() {
  const [activeCategory, setActiveCategory] = useState<"all" | AIPromptCategory>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modalPrompt, setModalPrompt] = useState<AIPrompt | null>(null);

  const availableCategories = useMemo(() => {
    const catIds = new Set(gptImage2Prompts.map((p) => p.category));
    return categories.filter((c) => catIds.has(c.id));
  }, []);

  const filteredPrompts = useMemo(() => {
    if (activeCategory === "all") return gptImage2Prompts;
    return gptImage2Prompts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

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
    <div>
      {/* Hero — dark section */}
      <section
        className="section-dark"
        style={{ padding: "64px 32px 72px" }}
      >
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
          <div className="animate-fade-up" style={{ maxWidth: 640 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 14px",
                borderRadius: "var(--radius-sm)",
                background: "rgba(192, 106, 62, 0.15)",
                border: "1px solid rgba(192, 106, 62, 0.25)",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--accent)",
                marginBottom: 24,
              }}
            >
              Trending
            </div>

            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 700,
                color: "var(--text-on-dark)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              GPT Image 2
              <br />
              Prompts
            </h1>
            <p
              style={{
                fontSize: "clamp(15px, 1.8vw, 17px)",
                color: "var(--text-on-dark-2)",
                lineHeight: 1.7,
                marginBottom: 32,
                maxWidth: 520,
              }}
            >
              OpenAI&apos;s most advanced image generation model. These prompts are
              crafted and optimized specifically for it. Copy, paste, generate.
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {[
                { value: `${gptImage2Prompts.length}+`, label: "Prompts" },
                { value: `${availableCategories.length}`, label: "Categories" },
                { value: "Free", label: "No Sign-up" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-serif"
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: "var(--text-on-dark)",
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-on-dark-2)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What is GPT Image 2 */}
      <section
        style={{
          maxWidth: "var(--max-w-narrow)",
          margin: "0 auto",
          padding: "64px 32px",
        }}
      >
        <div className="animate-fade-up">
          <h2
            className="font-serif"
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            What is GPT Image 2?
          </h2>
          <div style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 16px" }}>
              GPT Image 2 is OpenAI&apos;s most advanced image generation model, released in
              April 2025 as a native capability inside ChatGPT. Unlike standalone tools like
              DALL-E or Midjourney, GPT Image 2 works conversationally &mdash; you describe what
              you want, get an image, then refine it through follow-up messages.
            </p>
            <p style={{ margin: 0 }}>
              It excels in three areas: accurate text rendering (perfect for posters, UI mockups,
              and signage), photorealism (images nearly indistinguishable from real photographs),
              and complex instruction following (it handles multi-part prompts with precision).
            </p>
          </div>
        </div>
      </section>

      {/* Prompt Library */}
      <section
        style={{
          background: "var(--bg-warm)",
          padding: "64px 32px 80px",
        }}
      >
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
          <div style={{ marginBottom: 40, maxWidth: 560 }}>
            <span className="section-label" style={{ display: "block", marginBottom: 12 }}>
              Prompt Library
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
              All GPT Image 2 Prompts
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
              {gptImage2Prompts.length} prompts across {availableCategories.length} categories.
              Filter by type, copy any prompt, or click for the full breakdown.
            </p>
          </div>

          {/* Category filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            <button
              onClick={() => setActiveCategory("all")}
              style={{
                padding: "8px 18px",
                borderRadius: "var(--radius-md)",
                fontSize: 13,
                fontWeight: activeCategory === "all" ? 600 : 450,
                color: activeCategory === "all" ? "var(--bg)" : "var(--text-secondary)",
                background: activeCategory === "all" ? "var(--text-primary)" : "var(--surface)",
                border: activeCategory === "all" ? "1px solid var(--text-primary)" : "1px solid var(--border)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              All ({gptImage2Prompts.length})
            </button>
            {availableCategories.map((cat) => {
              const count = gptImage2Prompts.filter((p) => p.category === cat.id).length;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "var(--radius-md)",
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 450,
                    color: isActive ? "var(--bg)" : "var(--text-secondary)",
                    background: isActive ? cat.color : "var(--surface)",
                    border: isActive ? `1px solid ${cat.color}` : "1px solid var(--border)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Gallery */}
          <div className="gallery-grid">
            {filteredPrompts.map((prompt) => (
              <PromptGalleryCard
                key={prompt.id}
                prompt={prompt}
                copied={copiedId === prompt.id}
                onCopy={() => handleCopy(prompt)}
                onSelect={hasDetailPage(prompt) ? undefined : () => setModalPrompt(prompt)}
              />
            ))}
          </div>

          {filteredPrompts.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 24px", color: "var(--text-muted)", fontSize: 14 }}>
              No prompts found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Tips */}
      <section
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "80px 32px",
        }}
      >
        <div style={{ marginBottom: 48, maxWidth: 560 }}>
          <span className="section-label" style={{ display: "block", marginBottom: 12 }}>
            Writing Guide
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
            Tips for better prompts
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
            Get better results by following these proven techniques for GPT Image 2.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: 16,
          }}
        >
          {TIPS.map((tip, i) => (
            <div
              key={tip.title}
              style={{
                padding: "28px",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  letterSpacing: "0.06em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>
                {tip.title}
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          padding: "80px 32px",
        }}
      >
        <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
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
              GPT Image 2 FAQ
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
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.4 }}>
                  {q}
                </h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to Generate */}
      <div style={{ textAlign: "center", paddingBottom: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <Link
          href="/generate"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 32px",
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg, #c06a3e, #a0522d)",
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(192,106,62,0.25)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
        >
          Generate Images with GPT Image 2
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <Link
          href="/"
          className="btn-secondary"
          style={{ textDecoration: "none" }}
        >
          Browse All AI Prompts
        </Link>
      </div>

      {/* Modal for prompts without detail page */}
      {modalPrompt && (
        <PromptDetailModal
          prompt={modalPrompt}
          catInfo={categories.find((c) => c.id === modalPrompt.category)}
          onClose={() => setModalPrompt(null)}
        />
      )}
    </div>
  );
}

function PromptGalleryCard({
  prompt,
  copied,
  onCopy,
  onSelect,
}: {
  prompt: AIPrompt;
  copied: boolean;
  onCopy: () => void;
  onSelect?: () => void;
}) {
  const catInfo: CategoryInfo | undefined = categories.find((c) => c.id === prompt.category);
  const truncatedPrompt =
    prompt.prompt.length > 110
      ? prompt.prompt.slice(0, 110).trimEnd() + "\u2026"
      : prompt.prompt;

  const detail = hasDetailPage(prompt);

  const sharedProps = {
    className: "img-card",
    style: { display: "block" as const, cursor: "pointer", textDecoration: "none", color: "inherit" },
  };

  const content = (
    <>
      <div className="img-card-image-wrap">
        <Image
          src={prompt.imageUrl}
          alt={prompt.imageAlt}
          width={800}
          height={600}
          className="img-card-image"
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

      <div className="img-card-body">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
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
          style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", margin: 0, lineHeight: 1.3 }}
        >
          {prompt.title}
        </h3>

        <p className="prompt-text-preview">{truncatedPrompt}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto" }}>
          <button
            onClick={(e) => { e.stopPropagation(); onCopy(); }}
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
          <span
            className="btn-ghost"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            Details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
        </div>
      </div>
    </>
  );

  return detail ? (
    <Link href={`/prompts/${prompt.slug}`} {...sharedProps}>
      {content}
    </Link>
  ) : (
    <div onClick={onSelect} {...sharedProps}>
      {content}
    </div>
  );
}
