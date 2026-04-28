"use client";

import { useState } from "react";
import Image from "next/image";
import {
  aiPrompts,
  categories,
  CATEGORY_META,
  type AIPrompt,
  type AIPromptCategory,
  type AIModel,
} from "@/lib/aiPromptData";
import PromptDetailModal from "@/components/PromptDetailModal";

const MODEL_DISPLAY: Record<AIModel, { label: string; color: string; bg: string }> = {
  "gpt-image-2": { label: "GPT Image 2", color: "#c06a3e", bg: "#fdf0e8" },
  chatgpt:       { label: "ChatGPT",      color: "#5a9e7a", bg: "#eef6f2" },
  midjourney:    { label: "Midjourney",    color: "#8b7ab8", bg: "#f2f0f8" },
  "dall-e":      { label: "DALL-E",        color: "#7b9eb8", bg: "#eef4f8" },
};

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: "#5a9e7a",
  intermediate: "#b8924a",
  advanced: "#b85a5a",
};

export default function AIPromptsClient() {
  const [activeCategory, setActiveCategory] = useState<AIPromptCategory | "all">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<AIPrompt | null>(null);

  const filtered =
    activeCategory === "all"
      ? aiPrompts
      : aiPrompts.filter((p) => p.category === activeCategory);

  const handleCopy = async (prompt: AIPrompt) => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "64px 32px 0",
        }}
      >
        <div className="animate-fade-up" style={{ maxWidth: 600, marginBottom: 48 }}>
          <span className="section-label" style={{ display: "block", marginBottom: 12 }}>
            Full Library
          </span>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            AI Image Prompts
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Curated prompts for GPT Image 2, ChatGPT, Midjourney, and DALL-E.
            Browse by category, copy the prompt, and create.
          </p>
        </div>

        {/* Category filters */}
        <div
          className="animate-fade-up"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 16,
          }}
        >
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
              letterSpacing: "0.01em",
            }}
          >
            All
          </button>

          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "var(--radius-md)",
                  fontSize: 13,
                  fontWeight: active ? 600 : 450,
                  color: active ? "var(--bg)" : "var(--text-secondary)",
                  background: active ? cat.color : "var(--surface)",
                  border: active ? `1px solid ${cat.color}` : "1px solid var(--border)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  letterSpacing: "0.01em",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Counter */}
        <div
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            fontWeight: 500,
            marginBottom: 32,
          }}
        >
          {filtered.length} of {aiPrompts.length} prompts
        </div>
      </section>

      {/* Gallery */}
      <section
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "0 32px 80px",
        }}
      >
        <div className="gallery-grid">
          {filtered.map((prompt, i) => {
            const catInfo = categories.find((c) => c.id === prompt.category);
            const meta = CATEGORY_META[prompt.category];
            const truncated =
              prompt.prompt.length > 110
                ? prompt.prompt.slice(0, 110).trimEnd() + "\u2026"
                : prompt.prompt;
            const copied = copiedId === prompt.id;

            return (
              <div
                key={prompt.id}
                className="img-card animate-fade-up"
                style={{
                  animationDelay: `${Math.min(i * 0.03, 0.3)}s`,
                  opacity: 0,
                  display: "block",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedPrompt(prompt)}
              >
                <div className="img-card-image-wrap">
                  <Image
                    src={prompt.imageUrl}
                    alt={prompt.imageAlt}
                    width={800}
                    height={600}
                    className="img-card-image"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={i < 6 ? "eager" : "lazy"}
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
                      {meta?.label ?? catInfo?.label}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: DIFFICULTY_COLOR[prompt.difficulty] ?? "var(--text-muted)",
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

                  <p className="prompt-text-preview">{truncated}</p>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto" }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCopy(prompt); }}
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
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: 15, color: "var(--text-muted)" }}>
              No prompts found in this category yet.
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="btn-secondary"
              style={{ marginTop: 16 }}
            >
              Show all prompts
            </button>
          </div>
        )}
      </section>

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
