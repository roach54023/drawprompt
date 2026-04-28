import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About DrawPrompt — Free Drawing Prompt Generator & AI Image Prompts",
  description:
    "DrawPrompt is a free drawing prompt generator with 150B+ combinations and 167+ AI image prompts for GPT Image 2, ChatGPT & Midjourney. Learn about our mission and how it works.",
  alternates: { canonical: "https://drawprompt.org/about/" },
  openGraph: {
    title: "About DrawPrompt — Free Drawing Prompt Generator & AI Image Prompts",
    description:
      "DrawPrompt: free drawing prompt generator + 167+ AI image prompts for GPT Image 2 & ChatGPT.",
    type: "website",
    url: "https://drawprompt.org/about/",
  },
};

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Six creative dimensions",
    desc: "Every prompt is built from Theme, Subject, Mood, Color Palette, Style, and Challenge — six independent dimensions that combine into a complete creative brief.",
    color: "#c4714a",
    bg: "#fdf0e8",
    border: "#f0c4a8",
  },
  {
    step: "02",
    title: "150 billion combinations",
    desc: "With 480+ carefully crafted words across all dimensions, the theoretical combination space is over 150 billion. You'll never see the same prompt twice.",
    color: "#7b9eb8",
    bg: "#eef4f8",
    border: "#c8dce8",
  },
  {
    step: "03",
    title: "Three difficulty levels",
    desc: "Beginner uses just 2 dimensions for a simple starting point. Intermediate adds mood and color. Challenge includes style and technique constraints.",
    color: "#5a9e7a",
    bg: "#eef6f2",
    border: "#b8dcc8",
  },
  {
    step: "04",
    title: "Daily challenge",
    desc: "Every day at midnight UTC, a new challenge goes live. The same prompt for every artist worldwide — a shared creative moment.",
    color: "#8b7ab8",
    bg: "#f2f0f8",
    border: "#d0c8e8",
  },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", padding: "48px 24px 80px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
            About
          </p>
          <h1 className="font-serif" style={{ fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 14 }}>
            Built for artists who want to draw more, worry less.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-secondary)" }}>
            DrawingPrompt is a free, open tool that turns the blank-page problem into a one-click creative brief.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", marginBottom: 48 }} />

        {/* Why section */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>
            Why we built this
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 15, lineHeight: 1.75, color: "var(--text-secondary)" }}>
            <p>
              The blank page is the enemy of every artist. You sit down to draw, full of
              energy — and then spend 20 minutes trying to decide what to draw. By the time
              you&apos;ve decided, the momentum is gone.
            </p>
            <p>
              DrawingPrompt solves that. One click gives you a complete creative brief: a
              scene with atmosphere, a character with depth, a color palette to guide your
              choices, and an optional technique challenge to push your skills.
            </p>
            <p>
              We believe constraints unlock creativity. The best art often comes from working
              within limits — and a well-crafted prompt is the most liberating constraint there is.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, color: "var(--text-primary)", marginBottom: 20 }}>
            How it works
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.step}
                style={{
                  display: "flex", gap: 16, padding: "18px 20px",
                  borderRadius: 16, background: item.bg,
                  border: `1px solid ${item.border}`,
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "white", border: `1.5px solid ${item.border}`,
                  fontSize: 11, fontWeight: 700, color: item.color, marginTop: 2,
                }}>
                  {item.step}
                </div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: item.color, marginBottom: 4 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>
            Privacy &amp; data
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-secondary)" }}>
            DrawingPrompt stores nothing on our servers. Your saved prompts and streak data
            live entirely in your browser&apos;s localStorage. No account, no tracking, no
            data collection. The tool works completely offline once loaded.
          </p>
        </section>

        {/* CTA */}
        <div style={{
          borderRadius: 20, padding: "36px 32px", textAlign: "center",
          background: "var(--accent-pale)",
          border: "1px solid var(--accent-border)",
        }}>
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
            Ready to draw?
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24 }}>
            Generate your first prompt in one click. No sign-up required.
          </p>
          <Link href="/" className="btn-primary" style={{ display: "inline-flex", textDecoration: "none" }}>
            Start generating
          </Link>
        </div>

      </div>
    </div>
  );
}
