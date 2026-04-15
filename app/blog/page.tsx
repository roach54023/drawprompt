import type { Metadata } from "next";
import Link from "next/link";
import { getRecentBlogPosts } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Drawing Prompt Archive — Daily Art Challenges & Inspiration",
  description: "Browse hundreds of past drawing prompts and daily art challenges. Find inspiration for your next sketch, illustration, or painting practice session.",
};

const MOOD_THEMES: Record<string, { color: string; bg: string; border: string }> = {
  melancholic:     { color: "#7b9eb8", bg: "#eef4f8", border: "#c8dce8" },
  epic:            { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8" },
  mysterious:      { color: "#8b7ab8", bg: "#f2f0f8", border: "#d0c8e8" },
  hopeful:         { color: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8" },
  tense:           { color: "#b85a5a", bg: "#fdf0f0", border: "#e8c0c0" },
  peaceful:        { color: "#6aab8a", bg: "#eef7f2", border: "#b8dcc8" },
  whimsical:       { color: "#c47ab8", bg: "#faf0f8", border: "#e8c0e0" },
  "dark romantic": { color: "#8b5a7a", bg: "#f8f0f4", border: "#d8b8cc" },
};
const DEFAULT_THEME = { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8" };

export default function BlogPage() {
  const posts = getRecentBlogPosts(30);

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#7b9eb8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          Challenge Archive
        </p>
        <h1 className="font-serif" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 600, color: "#2c2416", letterSpacing: "-0.02em", marginBottom: 10 }}>
          Drawing Prompt Archive
        </h1>
        <p style={{ fontSize: 15, color: "#6b5d4a", maxWidth: 440, margin: "0 auto" }}>
          Every day, a new creative brief. Browse past challenges and find your next inspiration.
        </p>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {posts.map((post, i) => {
          const isToday = i === 0;
          const moodKey = post.mood.toLowerCase().replace(" ", "_");
          const theme = MOOD_THEMES[moodKey] ?? MOOD_THEMES[post.mood.toLowerCase()] ?? DEFAULT_THEME;

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                display: "block",
                background: isToday ? theme.bg : "#ffffff",
                border: `1.5px solid ${isToday ? theme.border : "#e8e0d0"}`,
                borderRadius: 18, padding: "20px 22px", textDecoration: "none",
                boxShadow: isToday ? `0 4px 20px ${theme.color}15` : "0 1px 4px rgba(44,36,22,0.04)",
                transition: "all 0.18s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 11, color: "#c4b49a" }}>
                  {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                {isToday && (
                  <span style={{ padding: "2px 9px", borderRadius: 100, background: "#fdf4e8", border: "1px solid #f0d4a8", color: "#b8924a", fontSize: 11, fontWeight: 600 }}>
                    Today
                  </span>
                )}
              </div>

              {post.mood && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 100, background: "white", border: `1px solid ${theme.border}`, color: theme.color, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: theme.color, display: "inline-block" }} />
                  {post.mood}
                </div>
              )}

              <p className="font-serif" style={{ fontSize: 13, lineHeight: 1.65, color: "#6b5d4a", fontStyle: "italic", marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {post.prompt}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                {post.theme && <span style={{ padding: "2px 8px", borderRadius: 6, background: "#eef4f8", color: "#7b9eb8", fontSize: 11, fontWeight: 500 }}>{post.theme}</span>}
                {post.subject && <span style={{ padding: "2px 8px", borderRadius: 6, background: "#eef6f2", color: "#5a9e7a", fontSize: 11, fontWeight: 500 }}>{post.subject}</span>}
                <span style={{ marginLeft: "auto", fontSize: 11, color: "#c4b49a" }}>View →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
