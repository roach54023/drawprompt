import type { Metadata } from "next";
import GPTImage2Client from "./GPTImage2Client";

export const metadata: Metadata = {
  title: "GPT Image 2 Prompts — 23+ Copy-Paste Prompts for ChatGPT Image Generator",
  description:
    "The best GPT Image 2 and GPT-4o image generation prompts. Copy-paste prompts for character design, photo editing, UI mockups, game art & more. Each prompt includes breakdown and tips.",
  keywords: [
    "gpt image 2 prompts",
    "gpt-4o image generation",
    "chatgpt image generator",
    "openai image generation prompts",
    "gpt image prompt examples",
    "chatgpt image prompts copy paste",
    "ai image generation prompts",
  ],
  alternates: { canonical: "https://drawprompt.org/gpt-image-2-prompts/" },
  openGraph: {
    title: "GPT Image 2 Prompts — Copy-Paste Prompt Library for ChatGPT",
    description:
      "23+ curated prompts optimized for GPT Image 2 and GPT-4o. Character design, photo editing, UI design, game art, and more.",
    type: "website",
    url: "https://drawprompt.org/gpt-image-2-prompts/",
  },
};

export default function GPTImage2PromptsPage() {
  return <GPTImage2Client />;
}
