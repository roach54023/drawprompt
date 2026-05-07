import type { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/lib/blogData";
import { aiPrompts } from "@/lib/aiPromptData";

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
      url: `${BASE}/pricing/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/drawing-prompts/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE}/how-to-use-gpt-image-2/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  // ── Drawing generator & tools ────────────────────────────────────
  const toolPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/generator/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/random/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/daily-challenge/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${BASE}/character/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/anime/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/for-kids/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/oc/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE}/custom/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE}/gallery/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
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

  return [...aiPages, ...toolPages, ...promptPages, ...articlePages, ...blogPages];
}
