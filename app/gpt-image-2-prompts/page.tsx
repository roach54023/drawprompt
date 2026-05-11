import type { Metadata } from "next";
import Script from "next/script";
import GPTImage2Client from "./GPTImage2Client";

/* ── FAQ JSON-LD for rich snippets ──────────────────────────── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is GPT Image 2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GPT Image 2 is OpenAI's latest image generation model integrated into ChatGPT. It produces photorealistic images, typography, and complex compositions from text prompts with significantly improved quality over DALL-E 3.",
      },
    },
    {
      "@type": "Question",
      name: "How do I write good prompts for GPT Image 2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Good GPT Image 2 prompts are specific and descriptive. Include the subject, style, lighting, camera angle, color palette, and mood. For example: 'A surrealist luxury watch poster with melting clock elements, shot in studio lighting with a dark moody background.' Browse our 180+ tested prompts for inspiration.",
      },
    },
    {
      "@type": "Question",
      name: "Can I copy and paste these prompts directly into ChatGPT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! All 180+ prompts on DrawPrompt are designed to be copy-pasted directly into ChatGPT's image generator. Each prompt has been tested with GPT Image 2 and includes the actual generated result so you can see what to expect.",
      },
    },
    {
      "@type": "Question",
      name: "What categories of GPT Image 2 prompts are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DrawPrompt offers 9 categories: Photography & Portrait, Character Design, Poster & Graphic Design, UI/UX & Product Design, Game Art & Concept, Infographic & Data Visualization, Cultural & Historical, Food & Lifestyle, and Creative & Experimental.",
      },
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "GPT Image 2 Prompts",
  description: "180+ tested prompts for ChatGPT image generator",
  numberOfItems: 180,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Photography & Portrait Prompts" },
    { "@type": "ListItem", position: 2, name: "Character Design Prompts" },
    { "@type": "ListItem", position: 3, name: "Poster & Graphic Design Prompts" },
    { "@type": "ListItem", position: 4, name: "UI/UX & Product Design Prompts" },
    { "@type": "ListItem", position: 5, name: "Game Art & Concept Prompts" },
    { "@type": "ListItem", position: 6, name: "Infographic & Data Visualization Prompts" },
    { "@type": "ListItem", position: 7, name: "Cultural & Historical Prompts" },
    { "@type": "ListItem", position: 8, name: "Food & Lifestyle Prompts" },
    { "@type": "ListItem", position: 9, name: "Creative & Experimental Prompts" },
  ],
};

export const metadata: Metadata = {
  title: "GPT Image 2 Prompts — 180+ Copy-Paste Prompts for ChatGPT Image Generator (2026)",
  description:
    "The best GPT Image 2 prompts library with 180+ tested prompts. Copy-paste prompts for ChatGPT image generator — photography, character design, poster, UI mockups, game art & more. Free, with breakdowns and tips.",
  keywords: [
    "gpt image 2 prompts",
    "gpt image 2 prompt",
    "gpt image 2",
    "chatgpt image 2",
    "chat gpt image 2",
    "chatgpt image generator",
    "chatgpt image generator prompts",
    "gpt image 2 prompts copy paste",
    "how to use gpt image 2",
    "gpt-image-2",
    "gpt image 2.0",
    "gpt image2",
    "openai image generation prompts",
    "ai image generation prompts",
    "best ai image prompts",
  ],
  alternates: { canonical: "https://drawprompt.org/gpt-image-2-prompts/" },
  openGraph: {
    title: "GPT Image 2 Prompts — 180+ Copy-Paste Prompt Library for ChatGPT (2026)",
    description:
      "180+ curated prompts optimized for GPT Image 2 and ChatGPT image generator. Photography, character design, poster, UI design, game art, and more.",
    type: "website",
    url: "https://drawprompt.org/gpt-image-2-prompts/",
  },
};

export default function GPTImage2PromptsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <GPTImage2Client />
    </>
  );
}
