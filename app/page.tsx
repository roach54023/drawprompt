import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "AI Image Prompts — GPT Image 2, ChatGPT & Midjourney | DrawPrompt",
  description:
    "Copy-paste AI image prompts for GPT Image 2, ChatGPT, Midjourney, and DALL-E. Curated prompt library with breakdowns, tips, and examples across photography, character design, UI/UX, and more.",
  keywords: [
    "gpt image 2 prompts",
    "chatgpt photo prompt",
    "ai image prompt",
    "chatgpt photo editing prompts",
    "midjourney prompts",
    "dall-e prompts",
    "ai art prompts",
    "drawing prompt generator",
  ],
  alternates: { canonical: "https://drawprompt.org/" },
  openGraph: {
    title: "AI Image Prompts — GPT Image 2, ChatGPT & Midjourney",
    description:
      "Curated AI image prompts ready to copy & paste. GPT Image 2, ChatGPT, Midjourney, DALL-E — photography, characters, UI design, posters, and more.",
    type: "website",
    url: "https://drawprompt.org/",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
