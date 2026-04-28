import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGalleryEntries } from "@/lib/galleryData";
import { getBlogPost } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Drawing Prompt Gallery — Artist Submissions & Inspiration",
  description:
    "See how artists around the world interpreted our drawing prompts. Browse curated artwork submissions from the DrawingPromptGenerator community and get inspired for your next piece.",
  keywords: [
    "drawing prompt gallery",
    "drawing prompt examples",
    "art prompt inspiration",
    "drawing prompt community",
  ],
  alternates: { canonical: "https://drawprompt.org/gallery/" },
  openGraph: {
    title: "Drawing Prompt Gallery — Artist Submissions & Inspiration",
    description:
      "Browse artwork from artists who drew from our prompts. Get inspired and submit your own.",
    type: "website",
    url: "https://drawprompt.org/gallery/",
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
  "dark romantic": { color: "#8b5a7a", bg: "#f8f0f4", border: "#d8b8cc" },
};
const DEFAULT_THEME = { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8" };

export default function GalleryPage() {
  const entries = getGalleryEntries();
  const isEmpty = entries.length === 0;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#c4714a", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          Community Gallery
        </p>
        <h1 className="font-serif" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 600, color: "#2c2416", letterSpacing: "-0.02em", marginBottom: 12 }}>
          Drawing Prompt Gallery
        </h1>
        <p style={{ fontSize: 15, color: "#6b5d4a", maxWidth: 460, margin: "0 auto 24px", lineHeight: 1.7 }}>
          Every day, artists around the world draw from the same prompt.
          Here are some of our favourites.
        </p>
        <Link
          href="/contact"
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "10px 22px", borderRadius: 12,
            background: "#fdf0e8", border: "1px solid #f0c4a8",
            color: "#c4714a", fontSize: 13, fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Submit your artwork →
        </Link>
      </div>

      {/* Empty state */}
      {isEmpty && (
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
      )}

      {/* Gallery grid */}
      {!isEmpty && (
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

          <div style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid #e8e0d0" }}>
            <h2 className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: "#2c2416", marginBottom: 14 }}>
              Drawing prompt examples from real artists
            </h2>
            <p style={{ fontSize: 13, color: "#7a6a56", lineHeight: 1.8, marginBottom: 20 }}>
              Every piece in this gallery started from the same drawing prompt as everyone else. Browse these drawing prompt examples to see how different artists interpret the same brief — same mood, same subject, completely different results. It&apos;s the best way to understand what a prompt can unlock.
            </p>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 14, color: "#6b5d4a", marginBottom: 16 }}>Drew something from one of our prompts?</p>
              <Link href="/contact" className="btn-primary" style={{ display: "inline-flex", textDecoration: "none", fontSize: 14, padding: "11px 24px" }}>
                Submit your artwork
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
