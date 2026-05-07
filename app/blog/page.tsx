import type { Metadata } from "next";
import Link from "next/link";
import { getMixedFeed, type FeedItem } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "AI Image Prompt Blog \u2014 Tips, Experiments & Prompt Guides",
  description:
    "AI image prompt guides, GPT Image 2 experiments, ChatGPT photo tips, and a fresh daily creative brief every day. Level up your AI image generation skills.",
  keywords: [
    "ai image prompt blog",
    "ai image prompts",
    "gpt image 2 tips",
    "chatgpt image prompts guide",
    "ai art prompts",
    "midjourney prompt tips",
    "daily ai image challenge",
  ],
  alternates: { canonical: "https://drawprompt.org/blog/" },
  openGraph: {
    title: "AI Image Prompt Blog \u2014 Tips, Experiments & Prompt Guides",
    description:
      "AI image prompt guides, GPT Image 2 experiments, and a fresh daily creative brief every day.",
    type: "website",
    url: "https://drawprompt.org/blog/",
  },
};

const MOOD_THEMES: Record<string, { color: string; bg: string; border: string }> = {
  melancholic:     { color: "#7b9eb8", bg: "#eef4f8", border: "#c8dce8" },
  epic:            { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8" },
  mysterious:      { color: "#8b7ab8", bg: "#f2f0f8", border: "#d0c8e8" },
  hopeful:         { color: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8" },
  tense:           { color: "#b85a5a", bg: "#fdf0f0", border: "#e8c0c0" },
  peaceful:        { color: "#6aab8a", bg: "#eef7f2", border: "#b8dcc8" },
  whimsical:       { color: "#c47ab8", bg: "#faf0f8", border: "#e8c0e0" },
  "dark romantic":  { color: "#8b5a7a", bg: "#f8f0f4", border: "#d8b8cc" },
};
const DEFAULT_THEME = { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8" };

export default function BlogPage() {
  const feed = getMixedFeed(30);

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#7b9eb8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          Blog & Archive
        </p>
        <h1 className="font-serif" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 600, color: "#2c2416", letterSpacing: "-0.02em", marginBottom: 10 }}>
          AI Image Prompt Blog
        </h1>
        <p style={{ fontSize: 15, color: "#6b5d4a", maxWidth: 480, margin: "0 auto" }}>
          Prompt guides, GPT Image 2 experiments, and a fresh creative brief every day. Learn to write better AI image prompts and find your next inspiration.
        </p>
      </div>

      {/* Feed */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {feed.map((item, i) =>
          item.kind === "article"
            ? <ArticleCard key={item.slug} item={item} featured={i < 3} />
            : <DailyCard key={item.slug} item={item} isFirst={i === 0} />
        )}
      </div>
    </div>
  );
}

// ── Article card ────────────────────────────────────────────

function ArticleCard({ item, featured }: { item: Extract<FeedItem, { kind: "article" }>; featured: boolean }) {
  const displayDate = new Date(item.date + "T12:00:00").toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <Link
      href={`/blog/${item.slug}`}
      style={{
        display: "block",
        background: featured ? item.heroBg : "#ffffff",
        border: `1.5px solid ${featured ? `${item.heroColor}40` : "#e8e0d0"}`,
        borderRadius: 18, padding: "22px 24px", textDecoration: "none",
        boxShadow: featured ? `0 4px 20px ${item.heroColor}12` : "0 1px 4px rgba(44,36,22,0.04)",
        transition: "all 0.18s",
        gridColumn: featured ? "span 1" : undefined,
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: "#c4b49a" }}>{displayDate}</span>
        <span style={{
          padding: "2px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600,
          color: item.heroColor, background: `${item.heroColor}15`,
          border: `1px solid ${item.heroColor}30`,
        }}>
          {item.categoryLabel}
        </span>
      </div>

      {/* Title */}
      <h2 className="font-serif" style={{
        fontSize: 16, fontWeight: 600, color: "var(--text-primary)",
        lineHeight: 1.35, marginBottom: 8, letterSpacing: "-0.01em",
      }}>
        {item.title}
      </h2>

      {/* Description */}
      <p style={{
        fontSize: 13, lineHeight: 1.6, color: "#6b5d4a",
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        marginBottom: 14,
      }}>
        {item.description}
      </p>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.readingTime} min read</span>
        <span style={{ fontSize: 11, color: item.heroColor, fontWeight: 600 }}>Read more &#8594;</span>
      </div>
    </Link>
  );
}

// ── Daily prompt card ───────────────────────────────────────

function DailyCard({ item, isFirst }: { item: Extract<FeedItem, { kind: "daily" }>; isFirst: boolean }) {
  const moodKey = item.mood.toLowerCase().replace(" ", "_");
  const theme = MOOD_THEMES[moodKey] ?? MOOD_THEMES[item.mood.toLowerCase()] ?? DEFAULT_THEME;

  return (
    <Link
      href={`/blog/${item.slug}`}
      style={{
        display: "block",
        background: isFirst ? theme.bg : "#ffffff",
        border: `1.5px solid ${isFirst ? theme.border : "#e8e0d0"}`,
        borderRadius: 18, padding: "20px 22px", textDecoration: "none",
        boxShadow: isFirst ? `0 4px 20px ${theme.color}15` : "0 1px 4px rgba(44,36,22,0.04)",
        transition: "all 0.18s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: "#c4b49a" }}>
          {new Date(item.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
        {isFirst && (
          <span style={{ padding: "2px 9px", borderRadius: 100, background: "#fdf4e8", border: "1px solid #f0d4a8", color: "#b8924a", fontSize: 11, fontWeight: 600 }}>
            Today
          </span>
        )}
      </div>

      {item.mood && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 100, background: "white", border: `1px solid ${theme.border}`, color: theme.color, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: theme.color, display: "inline-block" }} />
          {item.mood}
        </div>
      )}

      <p className="font-serif" style={{ fontSize: 13, lineHeight: 1.65, color: "#6b5d4a", fontStyle: "italic", marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {item.prompt}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
        {item.theme && <span style={{ padding: "2px 8px", borderRadius: 6, background: "#eef4f8", color: "#7b9eb8", fontSize: 11, fontWeight: 500 }}>{item.theme}</span>}
        {item.subject && <span style={{ padding: "2px 8px", borderRadius: 6, background: "#eef6f2", color: "#5a9e7a", fontSize: 11, fontWeight: 500 }}>{item.subject}</span>}
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#c4b49a" }}>View &#8594;</span>
      </div>
    </Link>
  );
}
