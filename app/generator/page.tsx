import type { Metadata } from "next";
import Link from "next/link";
import DrawingGeneratorClient from "@/components/DrawingGeneratorClient";

export const metadata: Metadata = {
  title: "Drawing Prompt Generator \u2014 Free Art Prompt Ideas for Artists & Beginners",
  description:
    "Free drawing prompt generator with 150 billion+ unique combinations. Get random art prompts with mood, subject, palette, style & creative challenges. Perfect for daily sketching, art practice, and creative blocks.",
  keywords: [
    "drawing prompt generator",
    "drawing prompts",
    "art prompt generator",
    "random drawing prompt generator",
    "drawing prompts for artists",
    "drawing prompts for beginners",
    "creative drawing prompts",
    "funny drawing prompts",
    "random drawing ideas",
    "sketch prompt generator",
    "give me a drawing prompt",
  ],
  alternates: { canonical: "https://drawprompt.org/generator/" },
  openGraph: {
    title: "Drawing Prompt Generator \u2014 150B+ Free Art Prompt Combinations",
    description:
      "Generate unlimited drawing prompts with mood, subject, palette, and style. Free for artists, beginners, and daily sketching practice.",
    type: "website",
    url: "https://drawprompt.org/generator/",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the drawing prompt generator work?",
      acceptedAnswer: { "@type": "Answer", text: "Our generator combines six creative dimensions \u2014 theme, subject, mood, color palette, style, and challenge \u2014 to create unique drawing briefs. With 480+ carefully crafted words across all dimensions, the theoretical combination space is over 150 billion. Choose Beginner (2 dimensions), Intermediate (4), or Challenge (all 6)." },
    },
    {
      "@type": "Question",
      name: "Is this drawing prompt generator free?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, completely free. No sign-up, no account, no paywall. You get 5 free generations per day. The tool works entirely in your browser \u2014 no data is sent to any server." },
    },
    {
      "@type": "Question",
      name: "Can I use these prompts for AI image generation?",
      acceptedAnswer: { "@type": "Answer", text: "These prompts are designed for human artists and sketchbooks. If you want prompts optimized for AI image generators like GPT Image 2, ChatGPT, or Midjourney, check out our AI Prompts library with 167+ tested prompts." },
    },
  ],
};

export default function GeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Tool */}
      <DrawingGeneratorClient />

      {/* SEO content below the tool */}
      <section style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto", padding: "64px 24px" }}>
        <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
          What is a drawing prompt generator?
        </h2>
        <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: 14 }}>
          <p>A drawing prompt generator is a tool that creates random creative briefs for artists. Instead of staring at a blank page wondering what to draw, you click a button and get an instant starting point \u2014 complete with a subject, mood, and optional style constraints.</p>
          <p>Our generator goes beyond simple word lists. Each prompt is built from six independent dimensions: theme, subject, mood, color palette, style, and challenge. This creates over 150 billion unique combinations, so you&apos;ll never see the same prompt twice. You choose the complexity: Beginner mode gives you just a subject and mood, while Challenge mode adds palette, style, and technique constraints.</p>
          <p>Drawing prompt generators are used by art teachers for classroom exercises, sketch groups for themed sessions, professional illustrators for warm-ups, and hobbyists who want to build a daily drawing habit. The key benefit is removing decision fatigue so you can spend your energy on actually creating.</p>
        </div>
      </section>

      <section style={{ background: "var(--bg-warm)", padding: "64px 24px" }}>
        <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
            Who is this for?
          </h2>
          <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: 14 }}>
            <p><strong>Beginners</strong> who want easy, approachable prompts to start their drawing journey. Beginner mode keeps things simple with just two dimensions \u2014 no overwhelming detail, just enough direction to get your pencil moving.</p>
            <p><strong>Experienced artists</strong> looking for creative challenges outside their comfort zone. Challenge mode adds style constraints and technique requirements that push you to experiment with new approaches.</p>
            <p><strong>Art teachers and sketch groups</strong> who need fresh prompts for every session. Generate themed prompts for your class or group, and use the difficulty levels to match your students&apos; skill levels.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "64px 24px" }}>
        <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 32 }}>Frequently asked questions</h2>
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

      {/* Internal links */}
      <section style={{ padding: "48px 24px 64px" }}>
        <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>Explore more</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/drawing-prompts" className="btn-secondary" style={{ textDecoration: "none" }}>Drawing Prompts</Link>
            <Link href="/random" className="btn-secondary" style={{ textDecoration: "none" }}>Random Prompt</Link>
            <Link href="/daily-challenge" className="btn-secondary" style={{ textDecoration: "none" }}>Daily Challenge</Link>
            <Link href="/gpt-image-2-prompts" className="btn-secondary" style={{ textDecoration: "none" }}>GPT Image 2 Prompts</Link>
            <Link href="/ai-prompts" className="btn-secondary" style={{ textDecoration: "none" }}>All AI Prompts</Link>
          </div>
        </div>
      </section>
    </>
  );
}
