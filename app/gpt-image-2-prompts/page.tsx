import type { Metadata } from "next";
import GPTImage2Client from "./GPTImage2Client";

export const metadata: Metadata = {
  title: "GPT Image 2 Prompts — 167+ Copy-Paste Prompts for ChatGPT Image Generator (2025)",
  description:
    "The best GPT Image 2 prompts library with 167+ tested prompts. Copy-paste prompts for ChatGPT image generator — photography, character design, poster, UI mockups, game art & more. Free, with breakdowns and tips.",
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
    title: "GPT Image 2 Prompts — 167+ Copy-Paste Prompt Library for ChatGPT (2025)",
    description:
      "167+ curated prompts optimized for GPT Image 2 and ChatGPT image generator. Photography, character design, poster, UI design, game art, and more.",
    type: "website",
    url: "https://drawprompt.org/gpt-image-2-prompts/",
  },
};

export default function GPTImage2PromptsPage() {
  return <GPTImage2Client />;
}
