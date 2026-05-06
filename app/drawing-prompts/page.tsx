import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Drawing Prompts \u2014 150B+ Free Ideas for Artists & Beginners (2026)",
  description:
    "Get drawing prompts for every skill level. Our free generator creates 150 billion+ unique creative briefs \u2014 subject, mood, palette, style & challenge. Perfect for daily sketching, art class, or beating creative block.",
  keywords: [
    "drawing prompts",
    "creative drawing prompts",
    "drawing prompts for beginners",
    "drawing prompts for artists",
    "easy drawing prompts",
    "funny drawing prompts",
    "cool drawing prompts",
    "random drawing prompts",
    "drawing ideas",
    "sketch prompts",
    "art prompts",
    "drawing prompt generator",
  ],
  alternates: { canonical: "https://drawprompt.org/drawing-prompts/" },
  openGraph: {
    title: "Drawing Prompts \u2014 150B+ Free Ideas for Artists & Beginners",
    description:
      "Free drawing prompts for every skill level. 150 billion+ unique combinations. No sign-up, no AI needed.",
    type: "website",
    url: "https://drawprompt.org/drawing-prompts/",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are drawing prompts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drawing prompts are short creative briefs that tell you what to draw. They help artists overcome creative block and build a consistent drawing habit.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use drawing prompts as a beginner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with simple prompts that focus on a single subject. Set a timer for 15-30 minutes and sketch whatever comes to mind. Our generator has a Beginner mode with just 2 dimensions.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a random drawing prompt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! DrawPrompt creates random drawing prompts from 150 billion+ unique combinations. Each prompt includes a subject, mood, color palette, and optional style challenge.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good drawing prompt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good drawing prompt gives you enough direction to start but enough freedom to be creative. The best prompts include a subject, a mood, and optionally a constraint like a color palette or style.",
      },
    },
    {
      "@type": "Question",
      name: "Are these drawing prompts free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely free. No sign-up, no account, no paywall. Generate unlimited drawing prompts, take the daily challenge, and explore all prompt types \u2014 all free forever.",
      },
    },
  ],
};

const PROMPT_TYPES = [
  {
    title: "Random Drawing Prompts",
    description: "Hit a button, get a prompt. No decisions, no overthinking \u2014 just pure creative spontaneity with 150 billion+ combinations.",
    href: "/random",
    accent: "#b8924a",
  },
  {
    title: "Daily Drawing Challenge",
    description: "A new prompt every day, same for every artist worldwide. Build a streak, track your progress, and build a daily drawing habit.",
    href: "/daily-challenge",
    accent: "#5a9e7a",
  },
  {
    title: "Character Drawing Prompts",
    description: "Focused prompts for figure drawing, character concepts, poses, and personality-driven designs. Great for character designers and comic artists.",
    href: "/character",
    accent: "#c4714a",
  },
  {
    title: "Anime Drawing Prompts",
    description: "Anime-styled prompts with dynamic poses, expressive emotions, and manga panel compositions. Perfect for manga artists and anime fans.",
    href: "/anime",
    accent: "#8b7ab8",
  },
  {
    title: "Drawing Prompts for Kids",
    description: "Safe, fun, and imaginative prompts designed for young artists. Cozy themes, magical worlds, and friendly characters.",
    href: "/for-kids",
    accent: "#c47ab8",
  },
  {
    title: "Drawing Prompt Generator",
    description: "The full-featured generator with 6 creative dimensions. Choose beginner, intermediate, or challenge difficulty. Over 150 billion unique combinations.",
    href: "/generator",
    accent: "#c06a3e",
  },
];

const TIPS = [
  { title: "Set a timer", body: "Give yourself 15\u201330 minutes per prompt. Time pressure kills perfectionism and forces you to focus on what matters." },
  { title: "Don\u2019t erase \u2014 iterate", body: "If your first attempt doesn\u2019t work, start a new sketch next to it instead of erasing. Seeing iterations side by side teaches you more than any single drawing." },
  { title: "Interpret freely", body: "A prompt is a starting point, not a specification. \u2018A lonely lighthouse\u2019 could be photorealistic, abstract, cartoonish, or a single brushstroke. Your interpretation is what makes it art." },
  { title: "Use constraints as fuel", body: "Limited to three colors? Can only use straight lines? Constraints sound restrictive but they actually unlock creativity by eliminating decision fatigue." },
  { title: "Draw every day", body: "Consistency beats intensity. Drawing for 20 minutes every day will improve your skills faster than a 5-hour session once a week. Our Daily Challenge makes this easy." },
];

export default function DrawingPromptsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div style={{ minHeight: "100vh" }}>
        {/* Hero */}
        <section style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto", padding: "56px 24px 48px" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
            Drawing Prompts
          </p>
          <h1 className="font-serif" style={{ fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16 }}>
            Drawing prompts for every artist, every skill level.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: 600, marginBottom: 28 }}>
            Whether you&apos;re a beginner looking for easy drawing ideas or an experienced artist chasing a creative challenge, our prompt generator creates unique briefs from over 150 billion combinations. No AI needed &mdash; just your sketchbook and imagination.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            <Link href="/generator" className="btn-primary" style={{ textDecoration: "none" }}>Generate a Prompt</Link>
            <Link href="/random" className="btn-secondary" style={{ textDecoration: "none" }}>Quick Random Prompt</Link>
          </div>
        </section>

        {/* What are drawing prompts */}
        <section style={{ background: "var(--bg-warm)", padding: "64px 24px" }}>
          <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
            <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
              What are drawing prompts?
            </h2>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: 14 }}>
              <p>A drawing prompt is a short creative brief that gives you a starting point for your artwork. It can be as simple as a single word &mdash; &quot;lighthouse&quot; &mdash; or as detailed as a full scene description with mood, color palette, and style constraints.</p>
              <p>Drawing prompts solve the most common problem artists face: staring at a blank page. Instead of spending 20 minutes deciding what to draw, you get an instant creative direction and can start sketching immediately. They&apos;re used by art teachers, sketch groups, professional illustrators, and hobbyists worldwide.</p>
              <p>Our drawing prompt generator goes beyond simple word lists. Each prompt is built from six independent dimensions &mdash; theme, subject, mood, color palette, style, and challenge &mdash; creating complete creative briefs with over 150 billion unique combinations. You choose the difficulty level: Beginner (2 dimensions), Intermediate (4 dimensions), or Challenge (all 6 with technique constraints).</p>
            </div>
          </div>
        </section>

        {/* Types of drawing prompts */}
        <section style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "64px 24px" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
            Types of drawing prompts
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32, maxWidth: 600 }}>
            Different prompts for different goals. Pick the style that matches your mood today.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 16 }}>
            {PROMPT_TYPES.map((type) => (
              <Link key={type.href} href={type.href} className="card" style={{ display: "block", padding: "24px", textDecoration: "none", color: "inherit", borderLeft: `4px solid ${type.accent}` }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{type.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>{type.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section style={{ background: "var(--bg-warm)", padding: "64px 24px" }}>
          <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
            <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 32 }}>
              Tips for getting the most out of drawing prompts
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {TIPS.map((tip, i) => (
                <div key={tip.title} style={{ padding: "24px 0", borderBottom: i < TIPS.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{tip.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>{tip.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-link to AI prompts */}
        <section style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto", padding: "64px 24px" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            Want AI to draw for you?
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 24 }}>
            If you&apos;re looking for prompts to use with AI image generators like ChatGPT, GPT Image 2, Midjourney, or DALL-E, we have a separate library of 167+ tested prompts with example images and detailed breakdowns.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/gpt-image-2-prompts" className="btn-primary" style={{ textDecoration: "none" }}>GPT Image 2 Prompts</Link>
            <Link href="/ai-prompts" className="btn-secondary" style={{ textDecoration: "none" }}>All AI Prompts</Link>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ borderTop: "1px solid var(--border)", padding: "64px 24px" }}>
          <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
            <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 32 }}>
              Frequently asked questions
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {faqJsonLd.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }, i: number) => (
                <div key={item.name} style={{ padding: "24px 0", borderBottom: i < faqJsonLd.mainEntity.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.4 }}>{item.name}</h3>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
