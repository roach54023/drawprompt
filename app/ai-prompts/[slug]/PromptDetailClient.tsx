"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type {
  AIPrompt,
  AIModel,
  CategoryInfo,
} from "@/lib/aiPromptData";
import { CATEGORY_META } from "@/lib/aiPromptData";

const MODEL_DISPLAY: Record<AIModel, { label: string; color: string; bg: string }> = {
  "gpt-image-2": { label: "GPT Image 2", color: "#c06a3e", bg: "#fdf0e8" },
  chatgpt:       { label: "ChatGPT",      color: "#5a9e7a", bg: "#eef6f2" },
  midjourney:    { label: "Midjourney",    color: "#8b7ab8", bg: "#f2f0f8" },
  "dall-e":      { label: "DALL-E",        color: "#7b9eb8", bg: "#eef4f8" },
};

const DIFFICULTY_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  beginner:     { label: "Beginner",     color: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8" },
  intermediate: { label: "Intermediate", color: "#b8924a", bg: "#fdf8e8", border: "#e8d8a8" },
  advanced:     { label: "Advanced",     color: "#b85a5a", bg: "#fdf0f0", border: "#e8c0c0" },
};

const BREAKDOWN_ITEMS: { key: keyof AIPrompt["breakdown"]; label: string }[] = [
  { key: "subject",     label: "Subject" },
  { key: "style",       label: "Style" },
  { key: "lighting",    label: "Lighting" },
  { key: "composition", label: "Composition" },
  { key: "details",     label: "Details" },
];

export default function PromptDetailClient({
  prompt,
  catInfo,
  related,
}: {
  prompt: AIPrompt;
  catInfo: CategoryInfo;
  related: AIPrompt[];
}) {
  const [copied, setCopied] = useState(false);
  const [relCopiedId, setRelCopiedId] = useState<string | null>(null);
  const diff = DIFFICULTY_CONFIG[prompt.difficulty] ?? DIFFICULTY_CONFIG.beginner;
  const meta = CATEGORY_META[prompt.category];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard unavailable
    }
  };

  const handleRelCopy = async (p: AIPrompt) => {
    try {
      await navigator.clipboard.writeText(p.prompt);
      setRelCopiedId(p.id);
      setTimeout(() => setRelCopiedId(null), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div>
      {/* Full-width hero image */}
      <section
        style={{
          width: "100%",
          background: "var(--bg-deep)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          src={prompt.imageUrl}
          alt={prompt.imageAlt}
          width={1400}
          height={900}
          style={{
            width: "100%",
            maxWidth: 1200,
            height: "auto",
            display: "block",
          }}
          priority
        />
      </section>

      <div
        style={{
          maxWidth: "var(--max-w-narrow)",
          margin: "0 auto",
          padding: "0 32px 80px",
        }}
      >
        {/* Breadcrumb */}
        <nav
          className="animate-fade-up"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "var(--text-muted)",
            marginTop: 32,
            marginBottom: 32,
            flexWrap: "wrap",
          }}
          aria-label="Breadcrumb"
        >
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>/</span>
          <Link href="/ai-prompts" style={{ color: "var(--text-muted)", textDecoration: "none" }}>AI Prompts</Link>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ color: "var(--text-secondary)" }}>{prompt.title}</span>
        </nav>

        {/* Meta row */}
        <div
          className="animate-fade-up"
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: catInfo.color,
            }}
          >
            {catInfo.label}
          </span>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--border)" }} />
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: diff.color,
            }}
          >
            {diff.label}
          </span>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--border)" }} />
          <div style={{ display: "flex", gap: 6 }}>
            {prompt.aiModels.map((model) => {
              const m = MODEL_DISPLAY[model];
              return (
                <span
                  key={model}
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: m.color,
                  }}
                >
                  {m.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <h1
          className="font-serif animate-fade-up"
          style={{
            fontSize: "clamp(28px, 4.5vw, 42px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: 48,
          }}
        >
          {prompt.title}
        </h1>

        {/* The Prompt */}
        <section className="animate-fade-up" style={{ marginBottom: 56 }}>
          <div
            style={{
              background: "var(--bg-deep)",
              borderRadius: "var(--radius-lg)",
              padding: "36px 32px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-on-dark-2)",
                marginBottom: 16,
              }}
            >
              The Prompt
            </div>
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(16px, 2.2vw, 19px)",
                lineHeight: 1.75,
                color: "var(--text-on-dark)",
                fontStyle: "italic",
                margin: "0 0 28px",
              }}
            >
              &ldquo;{prompt.prompt}&rdquo;
            </p>

            <button
              onClick={handleCopy}
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
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s, transform 0.1s",
                letterSpacing: "0.01em",
              }}
            >
              {copied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Copied to Clipboard
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  Copy Prompt
                </>
              )}
            </button>
          </div>
        </section>

        {/* Prompt Breakdown */}
        <section className="animate-fade-up" style={{ marginBottom: 56 }}>
          <h2
            className="font-serif"
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 20,
            }}
          >
            Prompt Breakdown
          </h2>

          <style>{`
            .breakdown-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
            }
            @media (max-width: 580px) {
              .breakdown-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          <div className="breakdown-grid">
            {BREAKDOWN_ITEMS.map((item) => (
              <div
                key={item.key}
                style={{
                  padding: "20px 24px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: 8,
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {prompt.breakdown[item.key]}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        {prompt.tips.length > 0 && (
          <section className="animate-fade-up" style={{ marginBottom: 56 }}>
            <h2
              className="font-serif"
              style={{
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}
            >
              Tips for Best Results
            </h2>

            <div
              style={{
                padding: "28px 32px",
                borderRadius: "var(--radius-lg)",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
              }}
            >
              <ol
                style={{
                  margin: 0,
                  paddingLeft: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {prompt.tips.map((tip, i) => (
                  <li key={i} style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {tip}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Related Prompts */}
        {related.length > 0 && (
          <section className="animate-fade-up" style={{ marginBottom: 56 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <h2
                className="font-serif"
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                Related Prompts
              </h2>
              <Link
                href={`/ai-prompts?category=${prompt.category}`}
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  textDecoration: "none",
                }}
              >
                View all
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginLeft: 4, verticalAlign: "middle" }}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </div>

            <style>{`
              .related-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
              }
              @media (max-width: 580px) {
                .related-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>

            <div className="related-grid">
              {related.map((rel) => {
                const relTruncated =
                  rel.prompt.length > 90
                    ? rel.prompt.slice(0, 90).trimEnd() + "\u2026"
                    : rel.prompt;
                const relCopied = relCopiedId === rel.id;

                return (
                  <div key={rel.id} className="img-card">
                    <div className="img-card-image-wrap">
                      <Image
                        src={rel.imageUrl}
                        alt={rel.imageAlt}
                        width={400}
                        height={300}
                        className="img-card-image"
                      />
                    </div>

                    <div className="img-card-body">
                      <h3
                        className="font-serif"
                        style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", margin: 0, lineHeight: 1.3 }}
                      >
                        <Link href={`/ai-prompts/${rel.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                          {rel.title}
                        </Link>
                      </h3>

                      <p className="prompt-text-preview">{relTruncated}</p>

                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "auto" }}>
                        <button
                          onClick={() => handleRelCopy(rel)}
                          className="btn-ghost"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "5px 12px",
                            fontSize: 11,
                            fontWeight: 500,
                          }}
                        >
                          {relCopied ? "Copied!" : "Copy"}
                        </button>
                        <Link
                          href={`/ai-prompts/${rel.slug}`}
                          className="btn-ghost"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "5px 12px",
                            textDecoration: "none",
                            fontSize: 11,
                            fontWeight: 500,
                          }}
                        >
                          Details
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="animate-fade-up" style={{ textAlign: "center", paddingTop: 8 }}>
          <Link
            href="/ai-prompts"
            className="btn-secondary"
            style={{
              textDecoration: "none",
            }}
          >
            Browse More {catInfo.label} Prompts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
