import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticleSlugs, getBlogPost, getRecentBlogPosts } from "@/lib/blogData";
import { getArticleBySlug, getRecentArticles, type ContentBlock } from "@/lib/blogPosts";
import { notFound } from "next/navigation";

interface Props { params: Promise<{ date: string }>; }

const MOOD_THEMES: Record<string, { color: string; bg: string; border: string }> = {
  melancholic:   { color: "#7b9eb8", bg: "#eef4f8", border: "#c8dce8" },
  epic:          { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8" },
  mysterious:    { color: "#8b7ab8", bg: "#f2f0f8", border: "#d0c8e8" },
  hopeful:       { color: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8" },
  tense:         { color: "#b85a5a", bg: "#fdf0f0", border: "#e8c0c0" },
  peaceful:      { color: "#6aab8a", bg: "#eef7f2", border: "#b8dcc8" },
  whimsical:     { color: "#c47ab8", bg: "#faf0f8", border: "#e8c0e0" },
  "dark romantic": { color: "#8b5a7a", bg: "#f8f0f4", border: "#d8b8cc" },
};
const DEFAULT_THEME = { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8" };

export function generateStaticParams() {
  return [
    ...getAllArticleSlugs().map((date) => ({ date })),
    ...getRecentBlogPosts(14).map((post) => ({ date: post.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date: slug } = await params;

  // Check if it's an article first
  const article = getArticleBySlug(slug);
  if (article) {
    return {
      title: article.title,
      description: article.description,
      alternates: { canonical: `https://drawprompt.org/blog/${slug}/` },
      openGraph: {
        title: article.title,
        description: article.description,
        type: "article",
        url: `https://drawprompt.org/blog/${slug}/`,
      },
    };
  }

  // Otherwise it's a daily prompt
  const post = getBlogPost(slug);
  if (!post) return {};
  const seoTitle = `${post.mood} ${post.subject} Drawing Prompt \u2014 ${slug}`;
  const seoDesc = `Daily drawing prompt for ${slug}: ${post.prompt.slice(0, 120)}. A ${post.mood.toLowerCase()} ${post.theme.toLowerCase()} scene. Free daily art challenge.`;

  // noindex daily prompts older than 30 days to prevent thin-content URL bloat
  const postDate = new Date(slug + "T12:00:00");
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const isOld = postDate.getTime() < thirtyDaysAgo.getTime();

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: { canonical: `https://drawprompt.org/blog/${slug}/` },
    ...(isOld && { robots: { index: false, follow: true } }),
    openGraph: {
      title: seoTitle,
      description: `Daily drawing prompt: ${post.prompt.slice(0, 120)}.`,
      type: "article",
      url: `https://drawprompt.org/blog/${slug}/`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { date: slug } = await params;

  // ── Article route ─────────────────────────────────────────
  const article = getArticleBySlug(slug);
  if (article) {
    return <ArticleView article={article} />;
  }

  // ── Daily prompt route ────────────────────────────────────
  const post = getBlogPost(slug);
  if (!post) notFound();

  return <DailyPromptView post={post} slug={slug} />;
}

// ════════════════════════════════════════════════════════════
// Article View
// ════════════════════════════════════════════════════════════

function ArticleView({ article }: { article: ReturnType<typeof getArticleBySlug> & {} }) {
  const displayDate = new Date(article.date + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const recentArticles = getRecentArticles(4).filter((a) => a.slug !== article.slug);

  // Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { "@type": "Organization", name: "DrawPrompt", url: "https://drawprompt.org" },
    publisher: { "@type": "Organization", name: "DrawPrompt", url: "https://drawprompt.org" },
    mainEntityOfPage: `https://drawprompt.org/blog/${article.slug}/`,
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Back */}
      <Link
        href="/blog"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 36 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        All posts
      </Link>

      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{
            padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 600,
            color: article.heroColor, background: article.heroBg,
            border: `1px solid ${article.heroColor}30`,
          }}>
            {article.categoryLabel}
          </span>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{article.readingTime} min read</span>
        </div>
        <h1
          className="font-serif"
          style={{ fontSize: "clamp(26px, 4.5vw, 38px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 10 }}
        >
          {article.title}
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>{displayDate}</p>
      </div>

      {/* Body */}
      <div style={{ marginBottom: 48 }}>
        {article.body.map((block, i) => (
          <RenderBlock key={i} block={block} accentColor={article.heroColor} accentBg={article.heroBg} />
        ))}
      </div>

      {/* Related articles */}
      {recentArticles.length > 0 && (
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 36 }}>
          <h2 className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>
            More from the Blog
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recentArticles.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="card"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", textDecoration: "none" }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: a.heroColor, marginBottom: 4, display: "block" }}>{a.categoryLabel}</span>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4 }}>{a.title}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginLeft: 12 }}>
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// Content Block Renderer
// ════════════════════════════════════════════════════════════

function RenderBlock({ block, accentColor, accentBg }: { block: ContentBlock; accentColor: string; accentBg: string }) {
  switch (block.type) {
    case "paragraph":
      return <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: 20 }}>{block.text}</p>;

    case "heading":
      return <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginTop: 40, marginBottom: 14, letterSpacing: "-0.01em" }}>{block.text}</h2>;

    case "subheading":
      return <h3 className="font-serif" style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", marginTop: 28, marginBottom: 10 }}>{block.text}</h3>;

    case "list":
      return (
        <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: 6 }}>{item}</li>
          ))}
        </ul>
      );

    case "tip":
      return (
        <div style={{
          padding: "16px 20px", borderRadius: 14, marginBottom: 20,
          background: "#eef6f2", borderLeft: "3px solid #5a9e7a",
        }}>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3d7a5a", margin: 0 }}>{block.text}</p>
        </div>
      );

    case "prompt-example":
      return (
        <div style={{
          padding: "20px 22px", borderRadius: 16, marginBottom: 16,
          background: "var(--bg-warm)", border: "1.5px solid var(--border)",
        }}>
          <p className="font-serif" style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-primary)", fontStyle: "italic", margin: 0, marginBottom: block.note ? 10 : 0 }}>
            &ldquo;{block.prompt}&rdquo;
          </p>
          {block.note && (
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-muted)", margin: 0, paddingTop: 8, borderTop: "1px solid var(--border)" }}>
              {block.note}
            </p>
          )}
        </div>
      );

    case "callout":
      return (
        <div style={{
          padding: "20px 24px", borderRadius: 16, marginBottom: 24, marginTop: 24,
          background: accentBg, border: `1.5px solid ${accentColor}30`,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
        }}>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-primary)", margin: 0, flex: 1, minWidth: 200 }}>{block.text}</p>
          {block.href && block.linkText && (
            <Link
              href={block.href}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                color: "white", background: accentColor, textDecoration: "none",
                whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              {block.linkText}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          )}
        </div>
      );

    case "image-placeholder":
      return (
        <div style={{
          padding: "48px 24px", borderRadius: 16, marginBottom: 20,
          background: "var(--bg-warm)", border: "1.5px dashed var(--border)",
          textAlign: "center",
        }}>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>{block.alt}</p>
          {block.caption && <p style={{ fontSize: 12, color: "var(--text-light)", margin: "6px 0 0" }}>{block.caption}</p>}
        </div>
      );

    default:
      return null;
  }
}

// ════════════════════════════════════════════════════════════
// Daily Prompt View (original layout, preserved)
// ════════════════════════════════════════════════════════════

function DailyPromptView({ post, slug }: { post: NonNullable<ReturnType<typeof getBlogPost>>; slug: string }) {
  const recent = getRecentBlogPosts(6).filter((p) => p.slug !== slug);
  const moodKey = post.mood.toLowerCase().replace(" ", "_");
  const theme = MOOD_THEMES[moodKey] ?? MOOD_THEMES[post.mood.toLowerCase()] ?? DEFAULT_THEME;

  const displayDate = new Date(slug + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Back */}
      <Link
        href="/blog"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 36 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        All challenges
      </Link>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 12px", borderRadius: 100,
            background: theme.bg, border: `1px solid ${theme.border}`,
            color: theme.color, fontSize: 11, fontWeight: 600, marginBottom: 16,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: theme.color, display: "inline-block" }} />
          {post.mood}
        </div>
        <h1
          className="font-serif"
          style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 6 }}
        >
          Daily Drawing Prompt for {displayDate}
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>A {post.mood.toLowerCase()} {post.theme.toLowerCase()} scene featuring {post.subject.toLowerCase()}</p>
      </div>

      {/* Prompt card */}
      <div
        style={{
          background: theme.bg, border: `1.5px solid ${theme.border}`,
          borderRadius: 20, padding: "32px 28px", marginBottom: 28,
          boxShadow: `0 4px 24px ${theme.color}15`,
        }}
      >
        <p
          className="font-serif"
          style={{ fontSize: "clamp(16px, 2.5vw, 20px)", lineHeight: 1.7, color: "var(--text-primary)", fontStyle: "italic", marginBottom: 24 }}
        >
          &ldquo;{post.prompt}&rdquo;
        </p>
        <button
          id="copy-btn"
          data-text={post.prompt}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "8px 16px", borderRadius: 10,
            border: "1px solid var(--border)", background: "white",
            color: "var(--text-secondary)", fontSize: 13, fontWeight: 500, cursor: "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
          </svg>
          Copy Prompt
          <script dangerouslySetInnerHTML={{ __html: `
            document.getElementById('copy-btn').addEventListener('click',function(){
              navigator.clipboard.writeText(this.dataset.text).then(()=>{
                this.textContent='Copied!';
                setTimeout(()=>{this.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy Prompt';},2000);
              });
            });
          `}} />
        </button>
      </div>

      {/* Dimension breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 36 }}>
        {[
          { label: "Theme", value: post.theme, color: "#7b9eb8", bg: "#eef4f8", border: "#c8dce8" },
          { label: "Subject", value: post.subject, color: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8" },
          { label: "Mood", value: post.mood, color: theme.color, bg: theme.bg, border: theme.border },
        ].filter((d) => d.value).map((d) => (
          <div key={d.label} style={{ background: d.bg, border: `1.5px solid ${d.border}`, borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: d.color, marginBottom: 5 }}>{d.label}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{d.value}</div>
          </div>
        ))}
      </div>

      {/* Showcase */}
      <div className="card" style={{ padding: "28px 24px", textAlign: "center", marginBottom: 36 }}>
        <h2 className="font-serif" style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
          Share Your Artwork
        </h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
          Drew something from this prompt? We&apos;d love to feature it here.
        </p>
        <Link href="/contact" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
          Submit your artwork &rarr;
        </Link>
      </div>

      {/* Internal links */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
<Link href="/ai-prompts/photography" style={{ textDecoration: "none", fontSize: 12, padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", color: "var(--text-secondary)" }}>Photography Prompts</Link>
<Link href="/ai-prompts/poster-design" style={{ textDecoration: "none", fontSize: 12, padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", color: "var(--text-secondary)" }}>Poster Design</Link>
<Link href="/ai-prompts/game-art" style={{ textDecoration: "none", fontSize: 12, padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", color: "var(--text-secondary)" }}>Game Art</Link>
        <Link href="/gpt-image-2-prompts" style={{ textDecoration: "none", fontSize: 12, padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", color: "var(--text-secondary)" }}>AI Prompts</Link>
      </div>

      {/* Related */}
      <div>
        <h2 className="font-serif" style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", marginBottom: 14 }}>
          More Challenges
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {recent.slice(0, 4).map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", textDecoration: "none" }}
            >
              <div>
                <div style={{ fontSize: 11, color: "var(--text-light)", marginBottom: 3 }}>
                  {new Date(p.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
                <p className="font-serif" style={{ fontSize: 13, color: "var(--text-secondary)", fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 420 }}>
                  {p.prompt}
                </p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-light)", flexShrink: 0, marginLeft: 12 }}>
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
