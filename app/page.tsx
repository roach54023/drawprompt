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

/* ── FAQPage JSON-LD for rich snippets ─────────────────────── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are AI image prompts?",
      acceptedAnswer: { "@type": "Answer", text: "AI image prompts are text descriptions you feed into image generation models like GPT Image 2, Midjourney, or DALL-E to create specific visuals. A well-crafted prompt includes subject, style, lighting, composition, and technical details — the difference between a generic result and a stunning one." },
    },
    {
      "@type": "Question",
      name: "What is GPT Image 2 and why is it special?",
      acceptedAnswer: { "@type": "Answer", text: "GPT Image 2 is OpenAI's latest image generation model built into ChatGPT. It excels at following precise text instructions, rendering accurate typography, and maintaining consistency across edits. It's particularly strong at photorealistic images, UI mockups, and designs requiring text." },
    },
    {
      "@type": "Question",
      name: "Can I use these prompts in ChatGPT, Midjourney, and DALL-E?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. While each prompt is optimized for GPT Image 2, most work great across all major AI image generators. Each prompt page shows which models it's compatible with. You may need to adjust some model-specific parameters, but the core description transfers seamlessly." },
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
  title: "AI Image Prompts — 167+ Curated Prompts for GPT Image 2 & ChatGPT | DrawPrompt",
  description:
    "Browse 167+ tested AI image prompts for GPT Image 2, ChatGPT, Midjourney & DALL-E. Covers photography, poster design, character art, product photography and more. Copy any prompt and generate the same result on site.",
  keywords: [
    "ai image prompts",
    "ai image prompt library",
    "gpt image 2 prompts",
    "gpt image 2 prompt",
    "chatgpt image prompts",
    "chatgpt image generator prompts",
    "ai image generation prompts",
    "midjourney prompts",
    "dall-e prompts",
    "copy paste ai prompts",
    "ai photo prompts",
    "ai portrait prompt",
    "ai product photography prompt",
  ],
  alternates: { canonical: "https://drawprompt.org/" },
  openGraph: {
    title: "AI Image Prompts — 167+ Curated Prompts for GPT Image 2 & ChatGPT | DrawPrompt",
    description:
      "167+ tested AI image prompts for GPT Image 2, ChatGPT, Midjourney & DALL-E. Copy any prompt and generate the same result directly on DrawPrompt.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomeClient featured={featured} categories={categories} />
    </>
  );
}
