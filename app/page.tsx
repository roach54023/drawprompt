import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { getFeaturedAIPrompts, categories } from "@/lib/aiPromptData";

export const metadata: Metadata = {
  title: "Drawing Prompt Generator & AI Image Prompts — ChatGPT, GPT-4o, Midjourney | DrawPrompt",
  description:
    "Free drawing prompt generator with 150B+ combinations for artists, plus copy-paste AI image prompts for ChatGPT image generator, GPT-4o, GPT Image 2, Midjourney & DALL-E. Tested prompts with breakdowns and tips.",
  keywords: [
    "drawing prompt generator",
    "ai image prompt generator",
    "chatgpt image generator prompts",
    "gpt-4o image generation prompts",
    "gpt image 2 prompts",
    "chatgpt image prompts",
    "midjourney prompts",
    "ai art prompts",
    "drawing prompts for artists",
    "dall-e prompts",
    "ai image prompt",
    "chatgpt photo editing prompts",
    "art prompt generator",
    "creative drawing ideas",
  ],
  alternates: { canonical: "https://drawprompt.org/" },
  openGraph: {
    title: "Drawing Prompt Generator & AI Image Prompts — ChatGPT, GPT-4o, Midjourney",
    description:
      "Free drawing prompt generator for artists + curated AI image prompts for ChatGPT, GPT-4o, Midjourney & DALL-E. Copy, paste, create.",
    type: "website",
    url: "https://drawprompt.org/",
  },
};

export default function HomePage() {
  // Fetch data on the server — only 6 prompts sent to client, not all 167
  const featured = getFeaturedAIPrompts(6);
  return <HomeClient featured={featured} categories={categories} />;
}
