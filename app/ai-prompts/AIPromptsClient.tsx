"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  aiPrompts,
  categories,
  hasDetailPage,
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

/**
 * Sort by createdAt descending, then interleave categories for variety.
 */
function sortAndInterleave(prompts: AIPrompt[]): AIPrompt[] {
  // Sort by date descending first
  const sorted = [...prompts].sort((a, b) => {
    const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return db - da;
  });

  // Group by category preserving date order within each group
  const buckets = new Map<string, AIPrompt[]>();
  for (const p of sorted) {
    const list = buckets.get(p.category) ?? [];
    list.push(p);
    buckets.set(p.category, list);
  }

  // Round-robin pick from each bucket
  const keys = [...buckets.keys()];
  const result: AIPrompt[] = [];
  let remaining = true;
  while (remaining) {
    remaining = false;
    for (const key of keys) {
      const bucket = buckets.get(key)!;
      if (bucket.length > 0) {
        result.push(bucket.shift()!);
        remaining = remaining || bucket.length > 0;
      }
    }
  }
  return result;
}

// Pre-compute interleaved list
const allInterleaved = sortAndInterleave(aiPrompts);

const PAGE_SIZE = 12;

export default function AIPromptsClient() {
  const [activeCategory, setActiveCategory] = useState<AIPromptCategory | "all">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modalPrompt, setModalPrompt] = useState<AIPrompt | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered =
    activeCategory === "all"
      ? allInterleaved
      : aiPrompts
          .filter((p) => p.category === activeCategory)
          .sort((a, b) => {
            const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return db - da;
          });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCopy = async (prompt: AIPrompt, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
            onClick={() => { setActiveCategory("all"); setVisibleCount(PAGE_SIZE); }}
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
                onClick={() => { setActiveCategory(cat.id); setVisibleCount(PAGE_SIZE); }}
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

      {/* Gallery — Masonry layout */}
      <section
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "0 32px 80px",
        }}
      >
        <div className="feed-masonry">
          {visible.map((prompt) => {
            const catInfo = categories.find((c) => c.id === prompt.category);
            const copied = copiedId === prompt.id;
            const detail = hasDetailPage(prompt);

            const card = (
              <>
                <div style={{ position: "relative", overflow: "hidden", lineHeight: 0 }}>
                  <Image
                    src={prompt.imageUrl}
                    alt={prompt.imageAlt}
                    width={600}
                    height={400}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                  {/* Model badges on image */}
                  <div style={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {prompt.aiModels.map((model) => {
                      const m = MODEL_DISPLAY[model];
                      return (
                        <span
                          key={model}
                          style={{
                            padding: "3px 8px",
                            borderRadius: 5,
                            fontSize: 10,
                            fontWeight: 600,
                            color: "#fff",
                            background: "rgba(0,0,0,0.5)",
                            backdropFilter: "blur(6px)",
                            WebkitBackdropFilter: "blur(6px)",
                          }}
                        >
                          {m.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
                {/* Card body */}
                <div style={{ padding: "12px 14px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: catInfo?.color ?? "var(--text-muted)" }}>
                      {catInfo?.label}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 10px", lineHeight: 1.35 }}>
                    {prompt.title}
                  </h3>
                  {/* Buttons — always visible */}
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={(e) => handleCopy(prompt, e)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 6,
                        border: "1px solid var(--border)",
                        background: copied ? "#eef6f2" : "var(--surface)",
                        color: copied ? "#5a9e7a" : "var(--text-secondary)",
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        transition: "all 0.15s",
                      }}
                    >
                      {copied ? (
                        <>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                    <Link
                      href={`/generate?prompt=${encodeURIComponent(prompt.prompt)}`}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 6,
                        border: "none",
                        background: "var(--accent)",
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 600,
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                      Generate
                    </Link>
                  </div>
                </div>
              </>
            );

            return detail ? (
              <Link
                key={prompt.id}
                href={`/prompts/${prompt.slug}`}
                className="feed-card"
                style={{ display: "block", textDecoration: "none", color: "inherit", borderRadius: 12, overflow: "hidden", background: "#fff", border: "1px solid var(--border)", breakInside: "avoid", marginBottom: 16 }}
              >
                {card}
              </Link>
            ) : (
              <div
                key={prompt.id}
                className="feed-card"
                onClick={() => setModalPrompt(prompt)}
                style={{ cursor: "pointer", borderRadius: 12, overflow: "hidden", background: "#fff", border: "1px solid var(--border)", breakInside: "avoid", marginBottom: 16 }}
              >
                {card}
              </div>
            );
          })}
        </div>

        {hasMore && (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="btn-secondary"
              style={{ padding: "12px 32px", fontSize: 14 }}
            >
              Load more prompts ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}

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
