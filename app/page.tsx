import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { getFeaturedAIPrompts, categories } from "@/lib/aiPromptData";

/* ── BreadcrumbList JSON-LD for homepage ─────────────────────── */
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://drawprompt.org",
    },
  ],
};

export const metadata: Metadata = {
  title: "Drawing Prompt Generator & AI Image Prompts — GPT Image 2, ChatGPT | DrawPrompt",
  description:
    "Free drawing prompt generator with 150B+ combinations for artists. 167+ copy-paste AI image prompts for GPT Image 2, ChatGPT image generator, Midjourney & DALL-E. Tested prompts with breakdowns and tips.",
  keywords: [
    "drawing prompt generator",
    "drawing prompts",
    "ai image prompts",
    "gpt image 2 prompts",
    "gpt image 2 prompt",
    "chatgpt image generator prompts",
    "chatgpt image 2",
    "chat gpt image 2",
    "ai image prompt",
    "midjourney prompts",
    "drawing prompts for artists",
    "random drawing prompt",
    "art prompt generator",
    "creative drawing prompts",
    "dall-e prompts",
  ],
  alternates: { canonical: "https://drawprompt.org/" },
  openGraph: {
    title: "Drawing Prompt Generator & 167+ AI Image Prompts — GPT Image 2, ChatGPT",
    description:
      "Free drawing prompt generator for artists + 167+ curated AI image prompts for GPT Image 2, ChatGPT, Midjourney & DALL-E. Copy, paste, create.",
    type: "website",
    url: "https://drawprompt.org/",
  },
};

export default function HomePage() {
  // Fetch data on the server — only 6 prompts sent to client, not all 167
  const featured = getFeaturedAIPrompts(6);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <HomeClient featured={featured} categories={categories} />
    </>
  );
}
