import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import {
  aiPrompts,
  getPromptBySlug,
  categories,
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

// Generate gallery pages only for prompts that have galleryImages
export function generateStaticParams() {
  return aiPrompts
    .filter((p) => p.galleryImages && p.galleryImages.length > 1)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt || !prompt.galleryImages || prompt.galleryImages.length <= 1) return {};

  const isShowcase = prompt.showcase === true;
  const count = prompt.galleryImages.length;

  const title = isShowcase
    ? `${prompt.title} — ${count} AI-Generated Examples | DrawPrompt`
    : `${prompt.title} — Gallery | DrawPrompt`;

  const description = isShowcase
    ? `Explore ${count} stunning variations created with the "${prompt.title}" prompt template. See how one GPT Image 2 prompt produces completely different results by changing the subject.`
    : `View all ${count} generated images for "${prompt.title}" prompt. See different variations and results from GPT Image 2.`;

  return {
    title,
    description,
    alternates: { canonical: `https://drawprompt.org/prompts/${slug}/gallery/` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://drawprompt.org/prompts/${slug}/gallery/`,
      images: prompt.galleryImages.map((img) => ({
        url: `https://drawprompt.org${img}`,
        width: 1200,
        height: 800,
      })),
    },
  };
}

// ─── Showcase Case Descriptions ──────────────────────────────────────────────
const SHOWCASE_CASES: Record<string, string[]> = {
  "stylized-anime-character-poster": [
    "Gojo Satoru — Cool & Confident archetype with ice-blue signature color",
    "Itadori Yuji — Energetic & Heroic archetype with pink/red accent",
    "Naruto Uzumaki — Fierce & Determined archetype with orange energy",
    "Zoro Roronoa — Calm & Powerful archetype with green signature tones",
  ],
  "minimalist-childrens-illustration-style": [
    "Portrait photo → Soft Scandinavian nursery illustration with pastel tones",
    "Couple photo → Matching storybook characters with warm, whimsical styling",
    "Child photo → Doll-like character with rosy cheeks and simplified anatomy",
    "Pet photo → Cute animal illustration with paper texture and watercolor softness",
  ],
  "chibi-clone-sticker-diary-photo": [
    "Running lifestyle — Chibi clones doing fitness actions: jogging, stretching, cheering",
    "Outdoor adventure — Mini-me stickers capturing hiking, exploring, and celebrating",
  ],
  "encyclopedia-style-educational-infographic": [
    "Mantis Shrimp — Nature's most dangerous fist, with anatomy panels and stats",
    "Great White Shark — Ocean apex predator with hunting mechanics breakdown",
    "Peregrine Falcon — World's fastest bird with aerodynamics analysis",
    "Honey Badger — Fearless warrior with defense mechanism infographic",
  ],
};

// Related prompts for each showcase
const SHOWCASE_RELATED: Record<string, string[]> = {
  "stylized-anime-character-poster": [
    "anime-snapshot-conversion",
    "fictional-anime-movie-poster",
    "character-visual-vertical-poster",
    "persona5-character-reference-card",
  ],
  "minimalist-childrens-illustration-style": [
    "crayon-style-drawing-transformation",
    "toddler-crayon-scribble-art-style-portrait",
    "ghibli-style-portrait",
    "watercolor-studio-portrait",
  ],
  "chibi-clone-sticker-diary-photo": [
    "anime-snapshot-conversion",
    "fictional-anime-movie-poster",
    "persona5-character-reference-card",
    "character-visual-vertical-poster",
  ],
  "encyclopedia-style-educational-infographic": [
    "anime-snapshot-conversion",
    "fictional-anime-movie-poster",
    "character-visual-vertical-poster",
    "persona5-character-reference-card",
  ],
};

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt || !prompt.galleryImages || prompt.galleryImages.length <= 1) {
    notFound();
  }

  const cat = categories.find((c) => c.id === prompt.category);
  const isShowcase = prompt.showcase === true;

  // Non-showcase prompts get a simple gallery
  if (!isShowcase) {
    return (
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 24px 80px" }}>
        <Link
          href={`/prompts/${slug}`}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 28 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          Back to prompt
        </Link>

        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            {cat && <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: cat.color }}>{cat.label}</span>}
            <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600, color: "var(--text-muted)", background: "var(--surface-2)", border: "1px solid var(--border-soft)" }}>
              {prompt.galleryImages.length} images
            </span>
          </div>
          <h1 className="font-serif" style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16, color: "var(--text-primary)" }}>
            {prompt.title}
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 600 }}>
            All generated variations using this prompt.
            {prompt.sourceUrl && (
              <>{" "}Source: <a href={prompt.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-link, #c06a3e)", textDecoration: "underline" }}>view tweet →</a></>
            )}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))", gap: 16, marginBottom: 48 }}>
          {prompt.galleryImages.map((img, i) => (
            <div key={img} style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)", background: "var(--bg-warm)", position: "relative" }}>
              <Image src={img} alt={`${prompt.title} — variation ${i + 1}`} width={1200} height={800} sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 480px" style={{ width: "100%", height: "auto", display: "block" }} priority={i < 2} />
              <div style={{ position: "absolute", top: 12, left: 12, padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, color: "#fff", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}>
                {i + 1} / {prompt.galleryImages!.length}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--bg-deep)", borderRadius: "var(--radius-lg)", padding: "24px", marginBottom: 32 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-on-dark-2)", marginBottom: 12 }}>The Prompt</div>
          <p className="font-serif" style={{ fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.75, color: "var(--text-on-dark)", fontStyle: "italic", margin: "0 0 20px", whiteSpace: "pre-wrap" }}>
            &ldquo;{prompt.prompt}&rdquo;
          </p>
          <CopyButton text={prompt.prompt} />
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={`/prompts/${slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "#fff", background: "linear-gradient(135deg, #c06a3e, #a0522d)", textDecoration: "none", boxShadow: "0 4px 12px rgba(192,106,62,0.2)" }}>
            View Full Prompt Details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <Link href="/ai-prompts" className="btn-secondary" style={{ textDecoration: "none", padding: "12px 24px", fontSize: 14 }}>Browse All Prompts</Link>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // SHOWCASE PAGE — Rich 专题 page for prompts with showcase: true
  // ═══════════════════════════════════════════════════════════════════════════════

  const cases = SHOWCASE_CASES[slug] || [];
  const relatedSlugs = SHOWCASE_RELATED[slug] || [];
  const relatedPrompts = relatedSlugs
    .map((s) => aiPrompts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => p != null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SHOWCASE_CSS }} />
      <div className="sc-page">
        {/* Breadcrumb */}
        <nav className="sc-breadcrumb">
          <Link href="/">DrawPrompt</Link>
          <span className="sc-sep">/</span>
          <Link href="/ai-prompts">AI Prompts</Link>
          <span className="sc-sep">/</span>
          <span>{prompt.title}</span>
        </nav>

        {/* ═══ Hero ═══ */}
        <section className="sc-hero">
          <div className="sc-hero-text">
            <div className="sc-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              Showcase — {prompt.galleryImages.length} Variations
            </div>
            <h1 className="sc-title font-serif">{prompt.title}</h1>
            <p className="sc-desc">
              One prompt template, {prompt.galleryImages.length} completely different results.
              See how changing just the subject transforms the output while keeping the same visual style.
            </p>
            <div className="sc-meta">
              {prompt.aiModels.map((model) => {
                const m = MODEL_DISPLAY[model];
                return (
                  <span key={model} className="sc-model" style={{ color: m.color, background: m.bg }}>
                    {m.label}
                  </span>
                );
              })}
              {cat && <span className="sc-cat" style={{ color: cat.color }}>{cat.label}</span>}
              <span className="sc-diff">{prompt.difficulty}</span>
            </div>
            <a href="#sc-prompt" className="sc-cta">Get the Prompt Template →</a>
          </div>
          <div className="sc-hero-img">
            <Image
              src={prompt.galleryImages[0]}
              alt={`${prompt.title} — featured result`}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              style={{ objectFit: "cover" }}
              priority
            />
            <span className="sc-img-badge">Featured</span>
          </div>
        </section>

        {/* ═══ Cases Grid ═══ */}
        <section className="sc-cases">
          <p className="sc-label">Generated Examples</p>
          <h2 className="sc-heading">{prompt.galleryImages.length} Results — Same Template, Different Subjects</h2>
          <p className="sc-subtext">
            Each image was created with the exact same prompt structure. Only the subject was changed, demonstrating the template&apos;s versatility.
          </p>
          <div className="sc-grid">
            {prompt.galleryImages.map((img, i) => (
              <div key={img} className="sc-card">
                <div className="sc-card-img">
                  <Image
                    src={img}
                    alt={cases[i] || `${prompt.title} — variation ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={i < 2}
                  />
                  <span className="sc-card-num">{i + 1}</span>
                </div>
                {cases[i] && (
                  <div className="sc-card-body">
                    <p>{cases[i]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ═══ Prompt Template (dark section) ═══ */}
        <section className="sc-prompt" id="sc-prompt">
          <div className="sc-prompt-inner">
            <p className="sc-label" style={{ color: "#c06a3e" }}>The Prompt Template</p>
            <h2 className="sc-heading" style={{ color: "#fafaf9" }}>Copy &amp; Customize This Prompt</h2>
            <div className="sc-prompt-box">
              <pre className="sc-prompt-pre font-serif">{prompt.prompt}</pre>
            </div>
            <div className="sc-prompt-actions">
              <CopyButton text={prompt.prompt} />
              <Link href={`/generate?prompt=${encodeURIComponent(prompt.prompt)}`} className="sc-btn-try">
                Try in AI Generator →
              </Link>
            </div>
            {prompt.sourceUrl && (
              <p className="sc-source">
                Source:{" "}
                <a href={prompt.sourceUrl} target="_blank" rel="noopener noreferrer">view original tweet →</a>
              </p>
            )}
          </div>
        </section>

        {/* ═══ Tips ═══ */}
        {prompt.tips.length > 0 && (
          <section className="sc-tips">
            <p className="sc-label">Pro Tips</p>
            <h2 className="sc-heading">How to Get the Best Results</h2>
            <div className="sc-tips-box">
              {prompt.tips.map((tip, i) => (
                <div key={i} className="sc-tip">
                  <span className="sc-tip-num">{i + 1}</span>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══ Related Prompts ═══ */}
        {relatedPrompts.length > 0 && (
          <section className="sc-related">
            <p className="sc-label">Related Prompts</p>
            <h2 className="sc-heading">You Might Also Like</h2>
            <div className="sc-related-grid">
              {relatedPrompts.map((rp) => (
                <Link key={rp.id} href={rp.showcase ? `/prompts/${rp.slug}/gallery` : `/prompts/${rp.slug}`} className="sc-related-card">
                  <div className="sc-related-img">
                    <Image src={rp.imageUrl} alt={rp.imageAlt} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: "cover" }} loading="lazy" />
                  </div>
                  <div className="sc-related-body">
                    <h3>{rp.title}</h3>
                    <span>{categories.find((c) => c.id === rp.category)?.label}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <Link href="/ai-prompts" className="sc-browse-cta">
                Browse all AI prompts
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </section>
        )}

        {/* ═══ Footer ═══ */}
        <footer className="sc-footer">
          <p>
            <Link href="/">DrawPrompt</Link> — Free AI image prompts, curated &amp; tested.
            Browse <Link href="/ai-prompts">all prompts</Link> or try <Link href="/gpt-image-2-prompts">GPT Image 2 prompts</Link>.
          </p>
        </footer>
      </div>
    </>
  );
}

// ─── Showcase Page CSS ───────────────────────────────────────────────────────
const SHOWCASE_CSS = `
.sc-page {
  --sc-fg: #0f172a;
  --sc-fg2: #475569;
  --sc-fg3: #94a3b8;
  --sc-bg: #fafaf9;
  --sc-surface: #ffffff;
  --sc-border: #e7e5e4;
  --sc-accent: #c06a3e;
  --sc-accent-hover: #a0522d;
  --sc-accent-light: #fdf0e8;
  --sc-radius: 16px;
  background: var(--sc-bg);
  min-height: 100vh;
  color: var(--sc-fg);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

/* Breadcrumb */
.sc-breadcrumb {
  max-width: 1200px; margin: 0 auto; padding: 20px 24px 0;
  font-size: 0.75rem; color: var(--sc-fg3);
}
.sc-breadcrumb a { color: var(--sc-fg3); text-decoration: none; }
.sc-breadcrumb a:hover { color: var(--sc-accent); }
.sc-sep { margin: 0 8px; }

/* Shared labels */
.sc-label {
  font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.12em; color: var(--sc-accent); margin: 0 0 8px;
}
.sc-heading {
  font-size: 1.5rem; font-weight: 700; letter-spacing: -0.025em;
  margin: 0 0 6px; color: var(--sc-fg);
}
.sc-subtext {
  font-size: 0.88rem; color: var(--sc-fg2); line-height: 1.7;
  margin: 8px 0 0; max-width: 600px;
}

/* ─── Hero ─── */
.sc-hero {
  max-width: 1200px; margin: 0 auto; padding: 48px 24px 0;
  display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
}
.sc-hero-text { max-width: 520px; }
.sc-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 100px;
  background: var(--sc-accent-light); color: var(--sc-accent);
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.03em; margin-bottom: 20px;
}
.sc-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800;
  letter-spacing: -0.03em; line-height: 1.15; margin: 0 0 18px;
}
.sc-desc {
  font-size: 1rem; color: var(--sc-fg2); line-height: 1.75; margin: 0 0 24px;
}
.sc-meta { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
.sc-model { padding: 5px 14px; border-radius: 6px; font-size: 0.72rem; font-weight: 600; }
.sc-cat { padding: 5px 14px; border-radius: 6px; font-size: 0.72rem; font-weight: 600; background: #f5f5f4; }
.sc-diff {
  padding: 5px 14px; border-radius: 6px; font-size: 0.72rem; font-weight: 600;
  color: var(--sc-fg3); background: var(--sc-surface); border: 1px solid var(--sc-border);
  text-transform: capitalize;
}
.sc-cta {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 32px; background: var(--sc-accent); color: #fff;
  border-radius: 100px; font-size: 0.92rem; font-weight: 700;
  text-decoration: none; transition: background 0.2s, transform 0.15s;
}
.sc-cta:hover { background: var(--sc-accent-hover); transform: translateY(-1px); }
.sc-hero-img {
  position: relative; border-radius: var(--sc-radius); overflow: hidden;
  aspect-ratio: 3/4;
  box-shadow: 0 24px 80px rgba(192,106,62,0.12), 0 8px 24px rgba(0,0,0,0.06);
}
.sc-img-badge {
  position: absolute; top: 14px; right: 14px;
  padding: 5px 12px; border-radius: 100px;
  background: rgba(0,0,0,0.55); backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff; font-size: 0.68rem; font-weight: 600;
}

/* ─── Cases Grid ─── */
.sc-cases { max-width: 1200px; margin: 0 auto; padding: 80px 24px 0; }
.sc-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  gap: 20px; margin-top: 28px;
}
.sc-card {
  border-radius: var(--sc-radius); overflow: hidden;
  background: var(--sc-surface); border: 1px solid var(--sc-border);
  transition: transform 0.25s, box-shadow 0.25s;
}
.sc-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.08); }
.sc-card-img { position: relative; width: 100%; aspect-ratio: 3/4; }
.sc-card-num {
  position: absolute; top: 12px; left: 12px;
  width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
  border-radius: 50%; background: rgba(0,0,0,0.55);
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
  color: #fff; font-size: 0.7rem; font-weight: 700;
}
.sc-card-body { padding: 14px 16px; }
.sc-card-body p { font-size: 0.82rem; color: var(--sc-fg2); line-height: 1.5; margin: 0; }

/* ─── Prompt Section ─── */
.sc-prompt { margin: 80px 0 0; padding: 64px 24px; background: #1c1917; }
.sc-prompt-inner { max-width: 800px; margin: 0 auto; }
.sc-prompt-box {
  background: #292524; border: 1px solid #44403c; border-radius: 12px;
  padding: 24px; margin: 16px 0 20px; overflow-x: auto;
}
.sc-prompt-pre {
  font-size: 0.85rem; line-height: 1.8; color: #e7e5e4;
  white-space: pre-wrap; word-wrap: break-word; margin: 0; font-style: italic;
}
.sc-prompt-actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.sc-btn-try {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 12px 28px; background: var(--sc-accent); color: #fff;
  border-radius: 100px; font-size: 0.85rem; font-weight: 700;
  text-decoration: none; transition: background 0.2s;
}
.sc-btn-try:hover { background: var(--sc-accent-hover); }
.sc-source { margin-top: 18px; font-size: 0.78rem; color: #a8a29e; }
.sc-source a { color: var(--sc-accent); text-decoration: none; }
.sc-source a:hover { text-decoration: underline; }

/* ─── Tips ─── */
.sc-tips { max-width: 800px; margin: 0 auto; padding: 80px 24px 0; }
.sc-tips-box {
  margin-top: 20px; background: var(--sc-surface); border: 1px solid var(--sc-border);
  border-radius: var(--sc-radius); padding: 8px 0; overflow: hidden;
}
.sc-tip {
  display: flex; align-items: flex-start; gap: 14px; padding: 16px 24px;
  border-bottom: 1px solid var(--sc-border);
}
.sc-tip:last-child { border-bottom: none; }
.sc-tip-num {
  flex-shrink: 0; width: 26px; height: 26px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; background: var(--sc-accent-light); color: var(--sc-accent);
  font-size: 0.72rem; font-weight: 700;
}
.sc-tip p { font-size: 0.88rem; color: var(--sc-fg2); line-height: 1.7; margin: 0; }

/* ─── Related ─── */
.sc-related { max-width: 1200px; margin: 0 auto; padding: 80px 24px 0; }
.sc-related-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 24px;
}
.sc-related-card {
  display: block; background: var(--sc-surface); border: 1px solid var(--sc-border);
  border-radius: var(--sc-radius); overflow: hidden;
  text-decoration: none; color: inherit; transition: box-shadow 0.25s, transform 0.25s;
}
.sc-related-card:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
.sc-related-img { position: relative; width: 100%; aspect-ratio: 3/4; }
.sc-related-body { padding: 14px 16px; }
.sc-related-body h3 {
  font-size: 0.82rem; font-weight: 700; margin: 0 0 4px; line-height: 1.3;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.sc-related-body span { font-size: 0.72rem; color: var(--sc-fg3); }
.sc-browse-cta {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 28px; border: 1px solid var(--sc-border); border-radius: 100px;
  background: var(--sc-surface); font-size: 0.88rem; font-weight: 600;
  color: var(--sc-fg); text-decoration: none; transition: border-color 0.2s, color 0.2s;
}
.sc-browse-cta:hover { border-color: var(--sc-accent); color: var(--sc-accent); }

/* ─── Footer ─── */
.sc-footer {
  max-width: 720px; margin: 0 auto; padding: 56px 24px;
  font-size: 0.78rem; color: var(--sc-fg3); line-height: 1.7; text-align: center;
}
.sc-footer a { color: var(--sc-accent); text-decoration: none; }
.sc-footer a:hover { text-decoration: underline; }

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .sc-hero { grid-template-columns: 1fr; padding: 32px 20px 0; gap: 32px; }
  .sc-hero-text { max-width: 100%; }
  .sc-title { font-size: 1.6rem; }
  .sc-grid { grid-template-columns: 1fr; }
  .sc-prompt { padding: 48px 20px; }
  .sc-tips { padding: 48px 20px 0; }
  .sc-related { padding: 48px 20px 0; }
  .sc-related-grid { grid-template-columns: 1fr 1fr; }
}
`;
