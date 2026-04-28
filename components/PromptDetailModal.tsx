"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import type { AIPrompt, AIModel, CategoryInfo } from "@/lib/aiPromptData";

const MODEL_DISPLAY: Record<AIModel, { label: string; color: string; bg: string }> = {
  "gpt-image-2": { label: "GPT Image 2", color: "#c06a3e", bg: "#fdf0e8" },
  chatgpt:       { label: "ChatGPT",      color: "#5a9e7a", bg: "#eef6f2" },
  midjourney:    { label: "Midjourney",    color: "#8b7ab8", bg: "#f2f0f8" },
  "dall-e":      { label: "DALL-E",        color: "#7b9eb8", bg: "#eef4f8" },
};

const DIFFICULTY_CONFIG: Record<string, { label: string; color: string }> = {
  beginner:     { label: "Beginner",     color: "#5a9e7a" },
  intermediate: { label: "Intermediate", color: "#b8924a" },
  advanced:     { label: "Advanced",     color: "#b85a5a" },
};


export default function PromptDetailModal({
  prompt,
  catInfo,
  onClose,
}: {
  prompt: AIPrompt;
  catInfo?: CategoryInfo;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [copiedOriginal, setCopiedOriginal] = useState(false);

  const diff = DIFFICULTY_CONFIG[prompt.difficulty] ?? DIFFICULTY_CONFIG.beginner;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard unavailable
    }
  };

  const handleCopyOriginal = async () => {
    if (!prompt.originalPrompt) return;
    try {
      await navigator.clipboard.writeText(prompt.originalPrompt);
      setCopiedOriginal(true);
      setTimeout(() => setCopiedOriginal(false), 2500);
    } catch {
      // clipboard unavailable
    }
  };

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(26, 23, 20, 0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        overflowY: "auto",
        display: "flex",
        justifyContent: "center",
        padding: "40px 16px",
        animation: "fadeIn 0.2s ease forwards",
      }}
    >
      {/* Modal card */}
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          background: "var(--surface)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "0 32px 80px rgba(26, 23, 20, 0.25), 0 0 0 1px rgba(26, 23, 20, 0.06)",
          overflow: "hidden",
          animation: "scaleIn 0.25s var(--ease-out) forwards",
          alignSelf: "flex-start",
        }}
      >
        {/* Hero image */}
        <div style={{ position: "relative" }}>
          <Image
            src={prompt.imageUrl}
            alt={prompt.imageAlt}
            width={1200}
            height={800}
            sizes="(max-width: 720px) 100vw, 720px"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              maxHeight: 420,
              objectFit: "cover",
            }}
            priority
          />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(26, 23, 20, 0.5)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.15s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Model badges on image */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              display: "flex",
              gap: 6,
            }}
          >
            {prompt.aiModels.map((model) => {
              const m = MODEL_DISPLAY[model];
              return (
                <span
                  key={model}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#fff",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {m.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "28px 32px 36px" }}>
          {/* Meta row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 12,
            }}
          >
            {catInfo && (
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
            )}
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--border)" }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: diff.color }}>
              {diff.label}
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(22px, 3.5vw, 30px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: 24,
              color: "var(--text-primary)",
            }}
          >
            {prompt.title}
          </h2>

          {/* The Prompt — dark box */}
          <div
            style={{
              background: "var(--bg-deep)",
              borderRadius: "var(--radius-lg)",
              padding: "24px 24px",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-on-dark-2)",
                marginBottom: 12,
              }}
            >
              The Prompt
            </div>
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(14px, 2vw, 17px)",
                lineHeight: 1.75,
                color: "var(--text-on-dark)",
                fontStyle: "italic",
                margin: "0 0 20px",
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
                padding: "10px 24px",
                borderRadius: "var(--radius-md)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--bg-deep)",
                background: "var(--text-on-dark)",
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s, transform 0.1s",
              }}
            >
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  Copy Prompt
                </>
              )}
            </button>
          </div>

          {/* Original Prompt (shown when translation exists) */}
          {prompt.originalPrompt && (
            <div
              style={{
                background: "var(--surface-2)",
                borderRadius: "var(--radius-lg)",
                padding: "24px 24px",
                marginBottom: 24,
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04z" />
                  <path d="M18.5 10l-4.5 12h2l1.12-3h4.75L23 22h2l-4.5-12h-2zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
                </svg>
                Original Prompt
              </div>
              <p
                style={{
                  fontSize: "clamp(13px, 1.8vw, 15px)",
                  lineHeight: 1.75,
                  color: "var(--text-secondary)",
                  margin: "0 0 16px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {prompt.originalPrompt}
              </p>

              <button
                onClick={handleCopyOriginal}
                className="btn-ghost"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 16px",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {copiedOriginal ? (
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
                    Copy Original
                  </>
                )}
              </button>
            </div>
          )}

          {/* Tips */}
          {prompt.tips.length > 0 && (
            <div>
              <h3
                className="font-serif"
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  marginBottom: 14,
                  color: "var(--text-primary)",
                }}
              >
                Tips for Best Results
              </h3>

              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                <ol
                  style={{
                    margin: 0,
                    paddingLeft: 18,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {prompt.tips.map((tip, i) => (
                    <li key={i} style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      {tip}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Tags */}
          {prompt.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border-soft)" }}>
              {prompt.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "3px 10px",
                    borderRadius: 100,
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--text-muted)",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border-soft)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
