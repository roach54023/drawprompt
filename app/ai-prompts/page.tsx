import type { Metadata } from "next";
import AIPromptsClient from "./AIPromptsClient";

export const metadata: Metadata = {
  title: "AI Image Prompts — 167+ Prompts for GPT Image 2, ChatGPT & Midjourney",
  description:
    "Browse 167+ curated AI image prompts for GPT Image 2, ChatGPT image generator, Midjourney & DALL-E. 9 categories — photography, character design, poster, UI/UX, game art & more. Copy-paste ready with breakdowns.",
  keywords: [
    "ai image prompts",
    "ai image prompt",
    "gpt image 2 prompts",
    "chatgpt image generator prompts",
    "chatgpt image prompts",
    "best ai image prompts",
    "ai art prompts",
    "midjourney prompt examples",
    "image prompt",
    "ai photo prompts",
  ],
  alternates: { canonical: "https://drawprompt.org/ai-prompts/" },
  openGraph: {
    title: "AI Image Prompts — 167+ Prompts for GPT Image 2, ChatGPT & Midjourney",
    description:
      "167+ curated AI image prompts organized by 9 categories. Copy-paste prompts for GPT Image 2, ChatGPT image generator, Midjourney & DALL-E.",
    type: "website",
    url: "https://drawprompt.org/ai-prompts/",
  },
};

export default function AIPromptsPage() {
  return <AIPromptsClient />;
}
