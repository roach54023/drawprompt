"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  type AIPromptCategory,
  type AIModel,
  type CategoryInfo,
} from "@/lib/aiPromptData";

const MODEL_DISPLAY: Record<AIModel, { label: string; color: string; bg: string }> = {
  "gpt-image-2": { label: "GPT Image 2", color: "#c06a3e", bg: "#fdf0e8" },
  chatgpt:       { label: "ChatGPT",      color: "#5a9e7a", bg: "#eef6f2" },
  midjourney:    { label: "Midjourney",    color: "#8b7ab8", bg: "#f2f0f8" },
  "dall-e":      { label: "DALL-E",        color: "#7b9eb8", bg: "#eef4f8" },
};

const PAGE_SIZE = 12;

/** Slim prompt shape — only fields needed for the list card */
export interface PromptListItem {
  id: string;
  slug: string;
  title: string;
  category: AIPromptCategory;
  imageUrl: string;
  imageAlt: string;
  aiModels: AIModel[];
  showcase?: boolean;
  galleryImages?: string[];
}

interface Props {
  allPrompts: PromptListItem[];
  categories: CategoryInfo[];
  totalCount: number;
  categorySlugs: Record<string, string>; // categoryId → URL slug
}

export default function AIPromptsClient({ allPrompts, categories, totalCount, categorySlugs }: Props) {
  const [activeCategory, setActiveCategory] = useState<AIPromptCategory | "all">("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered =
    activeCategory === "all"
      ? allPrompts
      : allPrompts.filter((p) => p.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Reset pagination when category changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory]);

  // Infinite scroll via IntersectionObserver (with throttle)
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const loadMore = useCallback(() => {
    if (!hasMore || loadingRef.current) return;
    loadingRef.current = true;
    setVisibleCount((c) => c + PAGE_SIZE);
    setTimeout(() => { loadingRef.current = false; }, 100);
  }, [hasMore]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

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
              <Link
                key={cat.id}
                href={`/ai-prompts/${categorySlugs[cat.id]}`}
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
                  textDecoration: "none",
                }}
              >
                {cat.label}
              </Link>
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
          {filtered.length} of {totalCount} prompts
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
            const cardHref = prompt.showcase
              ? `/prompts/${prompt.slug}/gallery`
              : `/prompts/${prompt.slug}`;

            return (
              <Link
                key={prompt.id}
                href={cardHref}
                className="feed-card"
                style={{ display: "block", textDecoration: "none", color: "inherit", borderRadius: 12, overflow: "hidden", background: "#fff", border: prompt.showcase ? "1.5px solid var(--accent, #c06a3e)" : "1px solid var(--border)", breakInside: "avoid", marginBottom: 16 }}
              >
                <FeedImage src={prompt.imageUrl} alt={prompt.imageAlt} models={prompt.aiModels} />
                {/* Card body */}
                <div style={{ padding: "12px 14px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: catInfo?.color ?? "var(--text-muted)" }}>
                      {catInfo?.label}
                    </span>
                    {prompt.showcase && (
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#c06a3e", background: "#fdf0e8", padding: "2px 8px", borderRadius: 4 }}>
                        Showcase
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 10px", lineHeight: 1.35 }}>
                    {prompt.title}
                  </h3>
                  {/* View detail hint */}
                  <span style={{ fontSize: 11, fontWeight: 500, color: prompt.showcase ? "#c06a3e" : "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                    {prompt.showcase ? `View ${prompt.galleryImages?.length ?? ""} examples` : "View prompt"}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Infinite scroll sentinel */}
        {hasMore && (
          <div ref={sentinelRef} style={{ height: 1 }} />
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
    </div>
  );
}

// ─── FeedImage — fixed placeholder, switch to real aspect ratio on load ──────
function FeedImage({ src, alt, models }: { src: string; alt: string; models: AIModel[] }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        lineHeight: 0,
        background: "var(--bg-warm)",
        ...(loaded ? {} : { aspectRatio: "4 / 3" }),
        transition: "aspect-ratio 0.3s ease",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        style={{
          width: "100%",
          height: loaded ? "auto" : "100%",
          objectFit: loaded ? undefined : "cover",
          display: "block",
          transition: "height 0.3s ease, opacity 0.4s ease",
          opacity: loaded ? 1 : 0.6,
        }}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
      {/* Model badges */}
      <div style={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 4, flexWrap: "wrap" }}>
        {models.map((model) => {
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
  );
}
