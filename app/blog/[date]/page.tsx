export const runtime = 'edge';

import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPost, getRecentBlogPosts } from "@/lib/blogData";
import { notFound } from "next/navigation";

interface Props { params: Promise<{ date: string }>; }

const MOOD_THEMES: Record<string, { color: string; bg: string; border: string }> = {
  melancholic:   { color: "#7b9eb8", bg: "#eef4f8", border: "#c8dce8" },
  epic:          { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8" },
  mysterious:    { color: "#8b7ab8", bg: "#f2f0f8", border: "#d0c8e8" },
  hopeful:       { color: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8" },
  tense:         { color: "#b85a5a", bg: "#fdf0f0", border: "#e8c0c0" },
  peaceful:      { color: "#6aab8a", bg: "#eef7f2", border: "#b8dcc8" },
  whimsical:     { color: "#c47ab8", bg: "#faf0f8", border: "#e8c0e0" },
  "dark romantic": { color: "#8b5a7a", bg: "#f8f0f4", border: "#d8b8cc" },
};
const DEFAULT_THEME = { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8" };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const post = getBlogPost(date);
  if (!post) return {};
  return {
    title: `Drawing Prompt: ${date} — Daily Art Challenge`,
    description: `Today's drawing prompt: ${post.prompt.slice(0, 120)}. Join the daily drawing challenge. Free, no sign-up needed.`,
    alternates: { canonical: `https://drawprompt.org/blog/${date}/` },
    openGraph: {
      title: `Drawing Prompt: ${date} — Daily Art Challenge`,
      description: `Today's drawing prompt: ${post.prompt.slice(0, 120)}.`,
      type: "article",
      url: `https://drawprompt.org/blog/${date}/`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { date } = await params;
  const post = getBlogPost(date);
  if (!post) notFound();

  const recent = getRecentBlogPosts(6).filter((p) => p.slug !== date);
  const moodKey = post.mood.toLowerCase().replace(" ", "_");
  const theme = MOOD_THEMES[moodKey] ?? MOOD_THEMES[post.mood.toLowerCase()] ?? DEFAULT_THEME;

  const displayDate = new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Back */}
      <Link
        href="/blog"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 36 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        All challenges
      </Link>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 12px", borderRadius: 100,
            background: theme.bg, border: `1px solid ${theme.border}`,
            color: theme.color, fontSize: 11, fontWeight: 600, marginBottom: 16,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: theme.color, display: "inline-block" }} />
          {post.mood}
        </div>
        <h1
          className="font-serif"
          style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 6 }}
        >
          Daily Drawing Prompt
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>{displayDate}</p>
      </div>

      {/* Prompt card */}
      <div
        style={{
          background: theme.bg, border: `1.5px solid ${theme.border}`,
          borderRadius: 20, padding: "32px 28px", marginBottom: 28,
          boxShadow: `0 4px 24px ${theme.color}15`,
        }}
      >
        <p
          className="font-serif"
          style={{ fontSize: "clamp(16px, 2.5vw, 20px)", lineHeight: 1.7, color: "var(--text-primary)", fontStyle: "italic", marginBottom: 24 }}
        >
          &ldquo;{post.prompt}&rdquo;
        </p>
        {/* Copy button — client-side via inline script */}
        <button
          id="copy-btn"
          data-text={post.prompt}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "8px 16px", borderRadius: 10,
            border: "1px solid var(--border)", background: "white",
            color: "var(--text-secondary)", fontSize: 13, fontWeight: 500, cursor: "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
          </svg>
          Copy Prompt
          <script dangerouslySetInnerHTML={{ __html: `
            document.getElementById('copy-btn').addEventListener('click',function(){
              navigator.clipboard.writeText(this.dataset.text).then(()=>{
                this.textContent='Copied!';
                setTimeout(()=>{this.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy Prompt';},2000);
              });
            });
          `}} />
        </button>
      </div>

      {/* Dimension breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 36 }}>
        {[
          { label: "Theme", value: post.theme, color: "#7b9eb8", bg: "#eef4f8", border: "#c8dce8" },
          { label: "Subject", value: post.subject, color: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8" },
          { label: "Mood", value: post.mood, color: theme.color, bg: theme.bg, border: theme.border },
        ].filter((d) => d.value).map((d) => (
          <div key={d.label} style={{ background: d.bg, border: `1.5px solid ${d.border}`, borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: d.color, marginBottom: 5 }}>{d.label}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{d.value}</div>
          </div>
        ))}
      </div>

      {/* Showcase */}
      <div
        className="card"
        style={{ padding: "28px 24px", textAlign: "center", marginBottom: 36 }}
      >
        <h2 className="font-serif" style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
          Share Your Artwork
        </h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
          Drew something from this prompt? We&apos;d love to feature it here.
        </p>
        <Link
          href="/contact"
          className="btn-ghost"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}
        >
          Submit your artwork →
        </Link>
      </div>

      {/* Related */}
      <div>
        <h2 className="font-serif" style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", marginBottom: 14 }}>
          More Challenges
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {recent.slice(0, 4).map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card"
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 18px", textDecoration: "none",
              }}
            >
              <div>
                <div style={{ fontSize: 11, color: "var(--text-light)", marginBottom: 3 }}>
                  {new Date(p.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
                <p
                  className="font-serif"
                  style={{ fontSize: 13, color: "var(--text-secondary)", fontStyle: "italic",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 420 }}
                >
                  {p.prompt}
                </p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-light)", flexShrink: 0, marginLeft: 12 }}>
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
