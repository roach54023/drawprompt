import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import GenerateOrSignIn from "@/components/GenerateOrSignIn";
import RelatedPrompts from "@/components/RelatedPrompts";
import {
  aiPrompts,
  getPromptBySlug,
  getFeaturedAIPrompts,
  getRelatedPrompts,
  categories,
  CATEGORY_META,
  type AIModel,
} from "@/lib/aiPromptData";

interface Props {
  params: Promise<{ slug: string }>;
}

const MODEL_DISPLAY: Record<AIModel, { label: string; color: string; bg: string }> = {
  "gpt-image-2": { label: "GPT Image 2", color: "#c06a3e", bg: "#fdf0e8" },
  chatgpt:       { label: "ChatGPT",      color: "#5a9e7a", bg: "#eef6f2" },
  midjourney:    { label: "Midjourney",    color: "#8b7ab8", bg: "#f2f0f8" },
  "dall-e":      { label: "DALL-E",        color: "#7b9eb8", bg: "#eef4f8" },
};

const DIFFICULTY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  beginner:     { label: "Beginner",     color: "#5a9e7a", bg: "#eef6f2" },
  intermediate: { label: "Intermediate", color: "#b8924a", bg: "#fdf4e8" },
  advanced:     { label: "Advanced",     color: "#b85a5a", bg: "#fdf0f0" },
};

// Generate detail pages for ALL prompts
export function generateStaticParams() {
  return aiPrompts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) return {};

  const cat = categories.find((c) => c.id === prompt.category);
  const title = `${prompt.title} \u2014 AI Prompt for ${cat?.label ?? "Image Generation"}`;
  const description = `Copy-paste this ${prompt.difficulty} ${cat?.label?.toLowerCase() ?? "AI"} prompt for GPT Image 2. ${prompt.prompt.slice(0, 120)}...`;

  return {
    title,
    description,
    alternates: { canonical: `https://drawprompt.org/prompts/${slug}/` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://drawprompt.org/prompts/${slug}/`,
      images: [{ url: `https://drawprompt.org${prompt.imageUrl}`, width: 1200, height: 800, alt: prompt.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: prompt.title,
      description,
      images: [`https://drawprompt.org${prompt.imageUrl}`],
    },
  };
}

export default async function PromptDetailPage({ params }: Props) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) notFound();

  const cat = categories.find((c) => c.id === prompt.category);
  const meta = CATEGORY_META[prompt.category];
  const diff = DIFFICULTY_CONFIG[prompt.difficulty] ?? DIFFICULTY_CONFIG.beginner;
  const related = getRelatedPrompts(prompt, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: prompt.title,
    description: prompt.prompt.slice(0, 200),
    image: `https://drawprompt.org${prompt.imageUrl}`,
    author: { "@type": "Organization", name: "DrawPrompt", url: "https://drawprompt.org" },
    publisher: { "@type": "Organization", name: "DrawPrompt", url: "https://drawprompt.org" },
    mainEntityOfPage: `https://drawprompt.org/prompts/${slug}/`,
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Back */}
      <Link
        href="/ai-prompts"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 28 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        All prompts
      </Link>

      {/* Hero image */}
      <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 28, position: "relative" }}>
        <Image
          src={prompt.imageUrl}
          alt={prompt.imageAlt}
          width={1200}
          height={800}
          sizes="(max-width: 720px) 100vw, 720px"
          style={{ width: "100%", height: "auto", display: "block", maxHeight: 440, objectFit: "cover" }}
          priority
        />
        <div style={{ position: "absolute", bottom: 16, left: 16, display: "flex", gap: 6 }}>
          {prompt.aiModels.map((model) => (
            <span key={model} style={{
              padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600,
              color: "#fff", background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              {MODEL_DISPLAY[model].label}
            </span>
          ))}
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
        {cat && (
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: cat.color }}>
            {meta?.label ?? cat.label}
          </span>
        )}
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--border)" }} />
        <span style={{ fontSize: 12, fontWeight: 500, color: diff.color }}>{diff.label}</span>
      </div>

      {/* Title */}
      <h1 className="font-serif" style={{
        fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700,
        letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 28,
        color: "var(--text-primary)",
      }}>
        {prompt.title}
      </h1>

      {/* Prompt box */}
      <div style={{
        background: "var(--bg-deep)", borderRadius: "var(--radius-lg)",
        padding: "24px 24px", marginBottom: 24,
      }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-on-dark-2)", marginBottom: 12 }}>
          The Prompt
        </div>
        <p className="font-serif" style={{
          fontSize: "clamp(14px, 2vw, 17px)", lineHeight: 1.75,
          color: "var(--text-on-dark)", fontStyle: "italic", margin: "0 0 20px",
        }}>
          &ldquo;{prompt.prompt}&rdquo;
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <CopyButton text={prompt.prompt} />
          <GenerateOrSignIn promptText={prompt.prompt} />
        </div>
      </div>

      {/* Original prompt (if translated) */}
      {prompt.originalPrompt && (
        <div style={{
          background: "var(--surface-2)", borderRadius: "var(--radius-lg)",
          padding: "24px 24px", marginBottom: 24, border: "1px solid var(--border)",
        }}>
          <div style={{
            fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--text-muted)", marginBottom: 12,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04z"/>
              <path d="M18.5 10l-4.5 12h2l1.12-3h4.75L23 22h2l-4.5-12h-2zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
            </svg>
            Original Prompt
          </div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.75,
            color: "var(--text-secondary)", margin: 0, whiteSpace: "pre-wrap",
          }}>
            {prompt.originalPrompt}
          </p>
        </div>
      )}

      {/* Tips */}
      {prompt.tips.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h2 className="font-serif" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14, color: "var(--text-primary)" }}>
            Tips
          </h2>
          <div style={{ padding: "20px 24px", borderRadius: "var(--radius-lg)", background: "var(--surface-2)", border: "1px solid var(--border)" }}>
            <ol style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 10 }}>
              {prompt.tips.map((tip, i) => (
                <li key={i} style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>{tip}</li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Tags */}
      {prompt.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 36, paddingBottom: 28, borderBottom: "1px solid var(--border-soft)" }}>
          {prompt.tags.map((tag) => (
            <span key={tag} style={{
              padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 500,
              color: "var(--text-muted)", background: "var(--surface-2)", border: "1px solid var(--border-soft)",
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Internal links */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
        <Link href="/ai-prompts" style={{ textDecoration: "none", fontSize: 12, padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", color: "var(--text-secondary)" }}>All AI Prompts</Link>
        <Link href="/gpt-image-2-prompts" style={{ textDecoration: "none", fontSize: 12, padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", color: "var(--text-secondary)" }}>GPT Image 2 Prompts</Link>
<Link href="/ai-prompts/photography" style={{ textDecoration: "none", fontSize: 12, padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", color: "var(--text-secondary)" }}>Photography Prompts</Link>
<Link href="/ai-prompts/character-design" style={{ textDecoration: "none", fontSize: 12, padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", color: "var(--text-secondary)" }}>Character Design</Link>
      </div>

      {/* Related prompts */}
      <RelatedPrompts prompts={related} categoryLabel={cat?.label} />
    </div>
  );
}
