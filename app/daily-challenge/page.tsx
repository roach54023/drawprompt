import type { Metadata } from "next";
import Link from "next/link";
import DailyClient from "@/components/DailyClient";

export const metadata: Metadata = {
  title: "Daily Drawing Prompt Generator \u2014 New Challenge Every Day",
  description:
    "A new drawing prompt every single day. Free daily drawing challenge for artists of all levels \u2014 track your streak, build a habit, and improve your skills. No sign-up required.",
  keywords: [
    "daily drawing prompt generator",
    "daily drawing prompts generator",
    "daily drawing challenge",
    "drawing prompt of the day",
    "daily art prompt",
  ],
  alternates: { canonical: "https://drawprompt.org/daily-challenge/" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Daily Drawing Prompt Generator \u2014 New Challenge Every Day",
    description: "A new drawing prompt every day. Free, no sign-up. Build your drawing habit one prompt at a time.",
    type: "website",
    url: "https://drawprompt.org/daily-challenge/",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When does the daily drawing prompt change?",
      acceptedAnswer: { "@type": "Answer", text: "A new prompt goes live every day at midnight UTC. The same prompt is shown to every artist worldwide, so you can compare interpretations with the community." },
    },
    {
      "@type": "Question",
      name: "How does the streak system work?",
      acceptedAnswer: { "@type": "Answer", text: "Every time you visit the daily challenge page, your streak counter increments. Visit on consecutive days to build your streak. Miss a day and it resets to 1. Your best streak is also tracked. All data is stored locally in your browser \u2014 no account needed." },
    },
    {
      "@type": "Question",
      name: "Can I see previous daily prompts?",
      acceptedAnswer: { "@type": "Answer", text: "Yes! Visit our blog archive to browse past daily drawing prompts. Each day\u2019s prompt is preserved with its theme, subject, and mood breakdown." },
    },
  ],
};

export default function DailyChallengePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Tool */}
      <DailyClient />

      {/* SEO content */}
      <section style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto", padding: "64px 24px" }}>
        <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
          Why a daily drawing challenge?
        </h2>
        <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: 14 }}>
          <p>Consistency is the single most important factor in improving your drawing skills. Drawing for 20 minutes every day will make you a better artist faster than a 5-hour session once a week. The daily challenge gives you a reason to show up every day.</p>
          <p>Every artist worldwide sees the same prompt on the same day. This creates a shared creative moment \u2014 you can compare your interpretation with others, see how different artists approach the same brief, and learn from the variety of responses.</p>
          <p>The streak system adds gentle accountability. Watching your streak grow creates a small but powerful motivation to keep going. Miss a day and it resets, but your best streak is always saved so you have a personal record to beat.</p>
        </div>
      </section>

      <section style={{ background: "var(--bg-warm)", padding: "64px 24px" }}>
        <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
            How to make the most of daily prompts
          </h2>
          <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: 14 }}>
            <p><strong>Set a fixed time.</strong> Drawing at the same time every day \u2014 morning coffee, lunch break, before bed \u2014 turns it from a task into a ritual. Attach it to an existing habit and it becomes automatic.</p>
            <p><strong>Keep it short.</strong> You don&apos;t need to create a masterpiece. A 15-minute sketch counts. The goal is consistency, not perfection. Some of your best work will come from quick, loose sessions.</p>
            <p><strong>Interpret freely.</strong> The prompt is a starting point, not a specification. A &quot;melancholic lighthouse&quot; could be a detailed watercolor, a quick pen sketch, a digital painting, or an abstract interpretation. Make it yours.</p>
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
            <Link href="/generator" className="btn-secondary" style={{ textDecoration: "none" }}>Full Generator</Link>
            <Link href="/random" className="btn-secondary" style={{ textDecoration: "none" }}>Random Prompt</Link>
            <Link href="/blog" className="btn-secondary" style={{ textDecoration: "none" }}>Past Challenges</Link>
            <Link href="/gpt-image-2-prompts" className="btn-secondary" style={{ textDecoration: "none" }}>GPT Image 2 Prompts</Link>
          </div>
        </div>
      </section>
    </>
  );
}
