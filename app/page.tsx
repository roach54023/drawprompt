import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { getFeaturedAIPrompts, categories, aiPrompts } from "@/lib/aiPromptData";
import { categoryContent } from "@/lib/categoryContent";

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

/* ── FAQPage JSON-LD for rich snippets ─────────────────────── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are AI image prompts?",
      acceptedAnswer: { "@type": "Answer", text: "AI image prompts are text descriptions you feed into image generation models like GPT Image 2 or Nano Banana 2 to create specific visuals. A well-crafted prompt includes subject, style, lighting, composition, and technical details — the difference between a generic result and a stunning one." },
    },
    {
      "@type": "Question",
      name: "What is GPT Image 2 and why is it special?",
      acceptedAnswer: { "@type": "Answer", text: "GPT Image 2 is OpenAI's latest image generation model built into ChatGPT. It excels at following precise text instructions, rendering accurate typography, and maintaining consistency across edits. It's particularly strong at photorealistic images, UI mockups, and designs requiring text. Nano Banana 2, powered by Google Gemini, is another top model with excellent natural language understanding and high visual fidelity." },
    },
    {
      "@type": "Question",
      name: "Can I use these prompts in ChatGPT, Midjourney, and DALL-E?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Our prompts are optimized for GPT Image 2 and Nano Banana 2, and most transfer well across other generators too. Each prompt page shows model compatibility. Minor parameter adjustments may be needed depending on the model." },
    },
    {
      "@type": "Question",
      name: "How do I find the best AI image prompts for my use case?",
      acceptedAnswer: { "@type": "Answer", text: "Browse by category — we have 9 categories covering Realistic Photography, Character Design, UI/UX, Poster Design, Film & Cinematic, Game Art, Product Photography, Infographic, and Photo Editing. Each prompt shows which AI model it works best with and includes a sample output image, so you can find the right style before you generate." },
    },
    {
      "@type": "Question",
      name: "Are these prompts free?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, completely free. No sign-up, no account, no paywall. Browse all AI prompts, use the drawing generator, and create. We add new content regularly across all categories." },
    },
    {
      "@type": "Question",
      name: "What categories of AI prompts do you have?",
      acceptedAnswer: { "@type": "Answer", text: "We cover nine categories: Realistic Photography, Photo Editing, Character Design, UI/UX Design, Poster & Graphic Design, Infographic & Data Viz, Film & Cinematic, Game Art, and Product & E-commerce. Each category has prompts ranging from beginner to advanced difficulty." },
    },
  ],
};

export const metadata: Metadata = {
  title: "AI Image Prompts — 180+ Curated Prompts for GPT Image 2 & Nano Banana 2 | DrawPrompt",
  description:
    "Browse 180+ tested AI image prompts for GPT Image 2 & Nano Banana 2. Covers photography, poster design, character art, product photography and more. Copy any prompt and generate the same result on site.",
  keywords: [
    "ai image prompts",
    "ai image prompt library",
    "gpt image 2 prompts",
    "gpt image 2 prompt",
    "nano banana 2 prompts",
    "nano banana prompts",
    "ai image generation prompts",
    "copy paste ai prompts",
    "ai photo prompts",
    "ai portrait prompt",
    "ai product photography prompt",
  ],
  alternates: { canonical: "https://drawprompt.org/" },
  openGraph: {
    title: "AI Image Prompts — 180+ Curated Prompts for GPT Image 2 & Nano Banana 2 | DrawPrompt",
    description:
      "180+ tested AI image prompts for GPT Image 2 & Nano Banana 2. Copy any prompt and generate the same result directly on DrawPrompt.",
    type: "website",
    url: "https://drawprompt.org/",
  },
};

function getHomeFeedPrompts(count: number) {
  // Sort by createdAt descending (newest first)
  const sorted = [...aiPrompts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  // Interleave categories so the feed is visually diverse
  const result: typeof aiPrompts = [];
  const usedCategories = new Set<string>();
  const remaining = [...sorted];

  while (result.length < count && remaining.length > 0) {
    // First pass: pick one from each unseen category
    const pick = remaining.findIndex(
      (p) => !usedCategories.has(p.category)
    );
    if (pick !== -1) {
      usedCategories.add(remaining[pick].category);
      result.push(remaining[pick]);
      remaining.splice(pick, 1);
    } else {
      // All categories seen in this round — reset and continue
      usedCategories.clear();
      // Pick the next available (still sorted by date)
      result.push(remaining.shift()!);
    }
  }
  return result;
}

export default function HomePage() {
  // Featured prompts for hero showcase + larger feed for the gallery section
  const featured = getFeaturedAIPrompts(6);
  const feedPrompts = getHomeFeedPrompts(24);

  // Build category → slug mapping for client-side links
  const categorySlugs: Record<string, string> = {};
  for (const [id, content] of Object.entries(categoryContent)) {
    categorySlugs[id] = content.slug;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomeClient featured={featured} feedPrompts={feedPrompts} categories={categories} categorySlugs={categorySlugs} />
    </>
  );
}
