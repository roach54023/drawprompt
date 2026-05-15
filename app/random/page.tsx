import type { Metadata } from "next";
import Link from "next/link";
import RandomClient from "@/components/RandomClient";

export const metadata: Metadata = {
  title: "Random Drawing Prompt Generator \u2014 Instant Inspiration",
  description:
    "Generate a random drawing prompt instantly. Every click gives you a completely new creative brief \u2014 mood, subject, color palette, and style. 5 free prompts per day, no sign-up, no AI.",
  keywords: [
    "random drawing prompt",
    "random drawing prompt generator",
    "random drawing prompts",
    "random art prompt generator",
    "give me a drawing prompt",
    "random drawing ideas",
  ],
  alternates: { canonical: "https://drawprompt.org/random/" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Random Drawing Prompt Generator \u2014 Instant Inspiration",
    description: "Hit generate and get a completely random drawing prompt. 150B+ combinations. Free, no sign-up.",
    type: "website",
    url: "https://drawprompt.org/random/",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the random drawing prompt generator work?",
      acceptedAnswer: { "@type": "Answer", text: "Each click randomly selects from 480+ words across six creative dimensions \u2014 theme, subject, mood, color palette, style, and challenge. The result is a unique creative brief from over 150 billion possible combinations." },
    },
    {
      "@type": "Question",
      name: "How many random prompts can I generate per day?",
      acceptedAnswer: { "@type": "Answer", text: "You get 5 free random prompts per day. The counter resets at midnight. No sign-up or account needed \u2014 everything runs in your browser." },
    },
    {
      "@type": "Question",
      name: "What is the difference between Random Prompt and the full Generator?",
      acceptedAnswer: { "@type": "Answer", text: "Random Prompt gives you an instant one-click result with no configuration. The full Drawing Prompt Generator lets you choose difficulty level, lock specific dimensions, and customize the output. Use Random when you want zero decisions; use the Generator when you want more control." },
    },
  ],
};

export default function RandomPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Tool */}
      <RandomClient />

      {/* SEO content */}
      <section style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto", padding: "64px 24px" }}>
        <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
          Why use a random drawing prompt?
        </h2>
        <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: 14 }}>
          <p>Random drawing prompts eliminate the hardest part of creating: deciding what to make. When you remove the decision, you remove the procrastination. One click, one prompt, and you&apos;re drawing within seconds.</p>
          <p>Randomness also pushes you outside your comfort zone. You might get a subject you&apos;d never choose on your own, a mood you&apos;ve never tried to capture, or a color palette that challenges your usual approach. This is how artists grow \u2014 not by repeating what&apos;s comfortable, but by being surprised into something new.</p>
          <p>Our random prompts are built from the same 150 billion+ combination engine as the full generator. Each prompt includes a theme, subject, mood, and optional style elements \u2014 enough structure to guide you, enough freedom to make it yours.</p>
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
            <Link href="/generator" className="btn-secondary" style={{ textDecoration: "none" }}>Full Generator</Link>
            <Link href="/daily-challenge" className="btn-secondary" style={{ textDecoration: "none" }}>Daily Challenge</Link>
            <Link href="/character" className="btn-secondary" style={{ textDecoration: "none" }}>Character Prompts</Link>
            <Link href="/gpt-image-2-prompts" className="btn-secondary" style={{ textDecoration: "none" }}>GPT Image 2 Prompts</Link>
          </div>
        </div>
      </section>
    </>
  );
}
