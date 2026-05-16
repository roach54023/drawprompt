import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { aiPrompts, categories, type AIPromptCategory } from "@/lib/aiPromptData";
import { categoryContent } from "@/lib/categoryContent";
import CategoryClient, { type CategoryPromptItem } from "./CategoryClient";

interface Props {
  params: Promise<{ category: string }>;
}

/** Map URL slug → category id */
function slugToCategoryId(slug: string): AIPromptCategory | null {
  const entry = Object.entries(categoryContent).find(([, v]) => v.slug === slug);
  return entry ? (entry[0] as AIPromptCategory) : null;
}

/** Get all valid category slugs for static generation */
export function generateStaticParams() {
  return Object.values(categoryContent).map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const catId = slugToCategoryId(slug);
  if (!catId) return {};

  const cat = categories.find((c) => c.id === catId)!;
  const content = categoryContent[catId];

  return {
    title: cat.seoTitle,
    description: cat.seoDescription,
    keywords: [
      content.heroTitle.toLowerCase(),
      `${cat.label.toLowerCase()} prompts`,
      `ai ${cat.label.toLowerCase()} prompts`,
      `gpt image 2 ${cat.label.toLowerCase()}`,
      "ai image prompts",
      "copy paste prompts",
    ],
    alternates: { canonical: `https://drawprompt.org/ai-prompts/${content.slug}/` },
    openGraph: {
      title: cat.seoTitle,
      description: cat.seoDescription,
      type: "website",
      url: `https://drawprompt.org/ai-prompts/${content.slug}/`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const catId = slugToCategoryId(slug);
  if (!catId) notFound();

  const cat = categories.find((c) => c.id === catId)!;
  const content = categoryContent[catId];

  // Get prompts for this category, sorted by date descending
  const categoryPrompts = aiPrompts
    .filter((p) => p.category === catId)
    .sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    });

  // Slim data for client
  const slimPrompts: CategoryPromptItem[] = categoryPrompts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    imageUrl: p.imageUrl,
    imageAlt: p.imageAlt,
    aiModels: p.aiModels,
  }));

  // Related categories (exclude current)
  const otherCategories = categories.filter((c) => c.id !== catId);

  // FAQ JSON-LD
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://drawprompt.org/" },
      { "@type": "ListItem", position: 2, name: "AI Prompts", item: "https://drawprompt.org/ai-prompts/" },
      { "@type": "ListItem", position: 3, name: cat.label, item: `https://drawprompt.org/ai-prompts/${content.slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "64px 32px 0" }}>
        <div className="animate-fade-up" style={{ maxWidth: 640, marginBottom: 48 }}>
          {/* Breadcrumb */}
          <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontSize: 12, color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/ai-prompts" style={{ color: "var(--text-muted)", textDecoration: "none" }}>AI Prompts</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{cat.label}</span>
          </nav>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 28 }}>{cat.icon}</span>
            <span style={{ padding: "4px 12px", borderRadius: 6, fontSize: 11, fontWeight: 600, color: cat.color, background: cat.bg, letterSpacing: "0.03em" }}>
              {categoryPrompts.length} Prompts
            </span>
          </div>

          <h1 className="font-serif" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
            {content.heroTitle}
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
            {content.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Prompt Gallery — client component with infinite scroll */}
      <section style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 32px 64px" }}>
        <CategoryClient prompts={slimPrompts} categoryColor={cat.color} />
      </section>

      {/* How to Write Prompts */}
      <section style={{ background: "var(--bg-warm)", padding: "64px 32px" }}>
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>
            {content.howToTitle}
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 40px", maxWidth: 560 }}>
            Tips to get better results in this category.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: 16 }}>
            {content.tips.map((tip, i) => (
              <div key={tip.title} style={{ padding: 28, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", background: "var(--surface)", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: cat.color, letterSpacing: "0.06em" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>{tip.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt Breakdown */}
      {content.breakdown.length > 0 && (
        <section style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto", padding: "64px 32px" }}>
          <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32 }}>
            Prompt Breakdown
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {content.breakdown.map((item) => (
              <div key={item.promptSlug} style={{ padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", background: "var(--surface)" }}>
                <Link href={`/prompts/${item.promptSlug}`} style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", textDecoration: "none", display: "block", marginBottom: 8 }}>
                  {item.promptTitle} →
                </Link>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>{item.explanation}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Model Recommendation */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "48px 32px" }}>
        <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>
            Best AI Models for {cat.label}
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, margin: 0 }}>
            {content.modelRecommendation}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "64px 32px" }}>
        <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32 }}>
            FAQ — {cat.label}
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {content.faq.map(({ q, a }, i) => (
              <div key={q} style={{ borderBottom: i < content.faq.length - 1 ? "1px solid var(--border)" : "none", padding: "24px 0" }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.4 }}>{q}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Categories — cross-links */}
      <section style={{ background: "var(--bg-warm)", padding: "64px 32px" }}>
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 24 }}>
            Explore Other Categories
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: 12 }}>
            {otherCategories.map((c) => {
              const cContent = categoryContent[c.id];
              const count = aiPrompts.filter((p) => p.category === c.id).length;
              return (
                <Link
                  key={c.id}
                  href={`/ai-prompts/${cContent.slug}`}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "16px 20px", borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border)", background: "var(--surface)",
                    textDecoration: "none", color: "inherit", transition: "border-color 0.15s, box-shadow 0.15s",
                  }}
                >
                  <span style={{ fontSize: 22 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{c.label}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{count} prompts</div>
                  </div>
                </Link>
              );
            })}
            {/* Link back to all */}
            <Link
              href="/ai-prompts"
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "16px 20px", borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)", background: "var(--surface)",
                textDecoration: "none", color: "inherit",
              }}
            >
              <span style={{ fontSize: 22 }}>📚</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>All Prompts</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{aiPrompts.length} total</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center", padding: "48px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <Link
          href="/generate"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 600,
            color: "#fff", background: "linear-gradient(135deg, #c06a3e, #a0522d)",
            textDecoration: "none", boxShadow: "0 4px 16px rgba(192,106,62,0.25)",
          }}
        >
          Generate with GPT Image 2
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
        <Link href="/gpt-image-2-prompts" className="btn-secondary" style={{ textDecoration: "none" }}>
          GPT Image 2 Prompts
        </Link>
      </section>
    </>
  );
}
