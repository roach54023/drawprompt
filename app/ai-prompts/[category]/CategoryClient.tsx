"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { type AIModel } from "@/lib/aiPromptData";

const MODEL_DISPLAY: Record<AIModel, { label: string }> = {
  "gpt-image-2": { label: "GPT Image 2" },
  chatgpt:       { label: "ChatGPT" },
  midjourney:    { label: "Midjourney" },
  "dall-e":      { label: "DALL-E" },
};

const PAGE_SIZE = 12;

/** Slim prompt shape for category list */
export interface CategoryPromptItem {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  aiModels: AIModel[];
}

interface Props {
  prompts: CategoryPromptItem[];
  categoryColor: string;
}

export default function CategoryClient({ prompts, categoryColor }: Props) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = prompts.slice(0, visibleCount);
  const hasMore = visibleCount < prompts.length;

  // Infinite scroll
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
    <>
      <div className="feed-masonry">
        {visible.map((prompt) => (
          <Link
            key={prompt.id}
            href={`/prompts/${prompt.slug}`}
            className="feed-card"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              borderRadius: 12,
              overflow: "hidden",
              background: "#fff",
              border: "1px solid var(--border)",
              breakInside: "avoid",
              marginBottom: 16,
            }}
          >
            <FeedImage src={prompt.imageUrl} alt={prompt.imageAlt} models={prompt.aiModels} />
            <div style={{ padding: "12px 14px 14px" }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 8px", lineHeight: 1.35 }}>
                {prompt.title}
              </h3>
              <span style={{ fontSize: 11, fontWeight: 500, color: categoryColor, display: "flex", alignItems: "center", gap: 4 }}>
                View prompt
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}

      {prompts.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ fontSize: 15, color: "var(--text-muted)" }}>No prompts in this category yet.</p>
        </div>
      )}
    </>
  );
}

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
      <div style={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 4, flexWrap: "wrap" }}>
        {models.map((model) => (
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
            {MODEL_DISPLAY[model].label}
          </span>
        ))}
      </div>
    </div>
  );
}
