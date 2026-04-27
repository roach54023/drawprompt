import type { Metadata } from "next";
import AIPromptsClient from "./AIPromptsClient";

export const metadata: Metadata = {
  title: "AI Image Prompts — ChatGPT Image Generator & GPT-4o Prompts Library",
  description:
    "Browse 23+ curated AI image prompts for ChatGPT image generator, GPT-4o, GPT Image 2, Midjourney & DALL-E. Organized by category — character design, photo editing, UI/UX, game art, and more. Copy-paste ready.",
  keywords: [
    "ai image prompts",
    "chatgpt image generator prompts",
    "gpt-4o image prompts",
    "gpt image 2 prompts",
    "ai art prompts library",
    "midjourney prompt examples",
    "character design prompts",
    "ai photo editing prompts",
  ],
  alternates: { canonical: "https://drawprompt.org/ai-prompts/" },
  openGraph: {
    title: "AI Image Prompts — ChatGPT, GPT-4o & Midjourney Prompt Library",
    description:
      "Curated AI image prompts organized by category. Copy-paste prompts for ChatGPT image generator, GPT-4o, Midjourney & DALL-E.",
    type: "website",
    url: "https://drawprompt.org/ai-prompts/",
  },
};

export default function AIPromptsPage() {
  return <AIPromptsClient />;
}
