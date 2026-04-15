"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRecentBlogPosts } from "@/lib/blogData";
import { getGalleryEntries } from "@/lib/galleryData";
import { getBlogPost } from "@/lib/blogData";

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

type Tab = "gallery" | "archive";

export default function CommunityClient() {
  const [tab, setTab] = useState<Tab>("gallery");

  const posts   = getRecentBlogPosts(30);
  const entries = getGalleryEntries();
  const isEmpty = entries.length === 0;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h1 className="font-serif" style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 600, color: "#2c2416", letterSpacing: "-0.02em", marginBottom: 10 }}>
          Community
        </h1>
        <p style={{ fontSize: 15, color: "#6b5d4a", maxWidth: 420, margin: "0 auto" }}>
          Artist submissions and the full prompt archive.
        </p>
      </div>

      {/* Tab switcher */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
        <div style={{ display: "flex", gap: 2, padding: 4, background: "#ffffff", border: "1px solid #e8e0d0", borderRadius: 14 }}>
          {([
            { id: "gallery", label: "Gallery" },
            { id: "archive", label: "Archive" },
          ] as { id: Tab; label: string }[]).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                padding: "8px 24px", borderRadius: 10, border: "none", cursor: "pointer",
                fontSize: 14, fontWeight: tab === id ? 600 : 400,
                background: tab === id ? "#fdf0e8" : "transparent",
                color: tab === id ? "#c4714a" : "#a8967e",
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── GALLERY TAB ─────────────────────────────────────────── */}
      {tab === "gallery" && (
        <>
          {isEmpty ? (
            <div style={{ textAlign: "center", padding: "64px 32px", border: "1.5px dashed #e8e0d0", borderRadius: 20, background: "#faf8f4" }}>
              <p className="font-serif" style={{ fontSize: 20, color: "#2c2416", marginBottom: 10 }}>
                The gallery is warming up
              </p>
              <p style={{ fontSize: 14, color: "#a8967e", marginBottom: 24, lineHeight: 1.7 }}>
                Be the first to submit your artwork. Draw today&apos;s prompt and share it here.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/daily-challenge" className="btn-primary" style={{ display: "inline-flex", textDecoration: "none", fontSize: 14, padding: "11px 22px" }}>
                  See today&apos;s prompt
                </Link>
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", padding: "11px 22px", borderRadius: 14, border: "1px solid #e8e0d0", background: "white", color: "#6b5d4a", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
                  Submit artwork
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
                {entries.map((entry, i) => {
                  const post = getBlogPost(entry.date);
                  const moodKey = post?.mood.toLowerCase().replace(" ", "_") ?? "";
                  const theme = MOOD_THEMES[moodKey] ?? MOOD_THEMES[post?.mood.toLowerCase() ?? ""] ?? DEFAULT_THEME;
                  const displayDate = new Date(entry.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

                  return (
                    <div key={i} style={{ background: "#ffffff", border: "1px solid #e8e0d0", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 12px rgba(44,36,22,0.06)" }}>
                      <div style={{ position: "relative", width: "100%", paddingTop: "75%", background: "#f5f0e8" }}>
                        <Image src={entry.image} alt={`Artwork by ${entry.author}`} fill style={{ objectFit: "cover" }} sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
                      </div>
                      <div style={{ padding: "16px 18px" }}>
                        {post?.mood && (
                          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 100, background: theme.bg, border: `1px solid ${theme.border}`, color: theme.color, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: theme.color, display: "inline-block" }} />
                            {post.mood}
                          </div>
                        )}
                        {(entry.prompt || post?.prompt) && (
                          <p className="font-serif" style={{ fontSize: 13, lineHeight: 1.6, color: "#6b5d4a", fontStyle: "italic", marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            &ldquo;{entry.prompt || post?.prompt}&rdquo;
                          </p>
                        )}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div>
                            {entry.socialUrl ? (
                              <a href={entry.socialUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: "#2c2416", textDecoration: "none" }}>{entry.author}</a>
                            ) : (
                              <span style={{ fontSize: 13, fontWeight: 600, color: "#2c2416" }}>{entry.author}</span>
                            )}
                            <p style={{ fontSize: 11, color: "#a8967e", margin: "2px 0 0" }}>{displayDate}</p>
                          </div>
                          <Link href={`/blog/${entry.date}`} style={{ fontSize: 11, color: "#a8967e", textDecoration: "none", borderBottom: "1px solid #e8e0d0" }}>
                            See prompt →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ textAlign: "center", marginTop: 48, paddingTop: 36, borderTop: "1px solid #e8e0d0" }}>
                <p style={{ fontSize: 14, color: "#6b5d4a", marginBottom: 16 }}>Drew something from one of our prompts?</p>
                <Link href="/contact" className="btn-primary" style={{ display: "inline-flex", textDecoration: "none", fontSize: 14, padding: "11px 24px" }}>
                  Submit your artwork
                </Link>
              </div>
            </>
          )}
        </>
      )}

      {/* ── ARCHIVE TAB ─────────────────────────────────────────── */}
      {tab === "archive" && (
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
      )}
    </div>
  );
}
