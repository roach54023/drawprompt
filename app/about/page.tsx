import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About DrawPrompt — AI Image Prompt Library for GPT Image 2 & Nano Banana 2",
  description:
    "DrawPrompt is a curated AI image prompt library with 180+ tested prompts for GPT Image 2 & Nano Banana 2. Browse, copy, and generate stunning AI images directly on site.",
  alternates: { canonical: "https://drawprompt.org/about/" },
  openGraph: {
    title: "About DrawPrompt — AI Image Prompt Library for GPT Image 2 & Nano Banana 2",
    description:
      "DrawPrompt is a curated AI image prompt library with 180+ tested prompts for GPT Image 2 & Nano Banana 2.",
    type: "website",
    url: "https://drawprompt.org/about/",
  },
};

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse the AI image prompt library",
    desc: "Explore 180+ curated AI image prompts across 9 categories. Each prompt is tagged by model compatibility (GPT Image 2, ChatGPT, Midjourney, DALL-E) and difficulty.",
    color: "#c4714a",
    bg: "#fdf0e8",
    border: "#f0c4a8",
  },
  {
    step: "02",
    title: "Read the breakdown",
    desc: "Every prompt comes with a real example image and a detailed explanation of why each element works — subject, style, lighting, composition, and technical specs.",
    color: "#7b9eb8",
    bg: "#eef4f8",
    border: "#c8dce8",
  },
  {
    step: "03",
    title: "Copy or generate in one click",
    desc: "Copy the prompt to use in any AI tool, or hit Generate to create the image directly on DrawPrompt using GPT Image 2 — no leaving the page required.",
    color: "#5a9e7a",
    bg: "#eef6f2",
    border: "#b8dcc8",
  },
  {
    step: "04",
    title: "Customize for your needs",
    desc: "Each prompt breakdown explains which elements to swap out. Change the subject, adjust the style, or combine prompts to create something entirely your own.",
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
            The AI image prompt library that lets you generate the same result.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-secondary)" }}>
            DrawPrompt is a curated library of 180+ tested AI image prompts for GPT Image 2 &amp; Nano Banana 2. Every prompt comes with an example image, a breakdown of why it works, and a one-click generate button.
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
              Most AI image prompt libraries are just text lists. You copy a prompt, paste it
              into ChatGPT or Midjourney, and hope for the best — with no idea what the output
              will actually look like.
            </p>
            <p>
              DrawPrompt is different. Every prompt in our library comes with a real example
              image generated from that exact prompt, a breakdown of why each element works, and
              a direct generate button so you can reproduce the result in one click.
            </p>
            <p>
              We focus on quality over quantity. 180+ hand-picked, tested prompts across 9
              categories — each one vetted to work reliably with GPT Image 2 and Nano Banana 2.
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
            DrawPrompt stores no personal data by default. Your saved prompts live in your
            browser&apos;s localStorage. Generating images requires a free account; we store
            only what&apos;s needed to manage your credits. No tracking, no selling data.
          </p>
        </section>

        {/* CTA */}
        <div style={{
          borderRadius: 20, padding: "36px 32px", textAlign: "center",
          background: "var(--accent-pale)",
          border: "1px solid var(--accent-border)",
        }}>
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
            Ready to create?
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24 }}>
            Browse 180+ AI image prompts for free — no sign-up required to copy.
          </p>
          <Link href="/ai-prompts" className="btn-primary" style={{ display: "inline-flex", textDecoration: "none" }}>
            Browse AI image prompts
          </Link>
        </div>

      </div>
    </div>
  );
}
