import type { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/lib/blogData";
import { aiPrompts } from "@/lib/aiPromptData";
import { categoryContent } from "@/lib/categoryContent";

const BASE = "https://drawprompt.org";

/** Generate YYYY-MM-DD strings for the past N days */
function getRecentDates(count: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Core AI prompt pages (highest priority) ──────────────────────
  const aiPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE}/ai-prompts/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE}/gpt-image-2-prompts/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/generate/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE}/chatgpt-photo-prompts/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/mothers-day/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/chibi-prompt/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/pricing/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/how-to-use-gpt-image-2/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  // ── Category landing pages (only include categories with 5+ prompts) ──
  const categoryPages: MetadataRoute.Sitemap = Object.entries(categoryContent)
    .filter(([catId]) => aiPrompts.filter((p) => p.category === catId).length >= 5)
    .map(([, cat]) => ({
      url: `${BASE}/ai-prompts/${cat.slug}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  // ── Utility & info pages ────────────────────────────────────────
  const toolPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/blog/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: `${BASE}/about/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE}/contact/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // ── ALL prompt detail pages ─────────────────────────────────────
  const promptPages: MetadataRoute.Sitemap = aiPrompts.map((p) => ({
    url: `${BASE}/prompts/${p.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Hand-written article pages ──────────────────────────────────
  const articlePages: MetadataRoute.Sitemap = getAllArticleSlugs().map((slug) => ({
    url: `${BASE}/blog/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Dynamic blog/[date] pages ────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = getRecentDates(14).map((date, i) => ({
    url: `${BASE}/blog/${date}/`,
    lastModified: new Date(date + "T12:00:00"),
    changeFrequency: "never" as const,
    priority: i === 0 ? 0.6 : 0.4,
  }));

  return [...aiPages, ...categoryPages, ...toolPages, ...promptPages, ...articlePages, ...blogPages];
}
