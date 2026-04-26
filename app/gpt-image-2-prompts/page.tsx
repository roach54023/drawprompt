import type { Metadata } from "next";
import GPTImage2Client from "./GPTImage2Client";

export const metadata: Metadata = {
  title: "GPT Image 2 Prompts — 30+ Copy-Paste Prompts for OpenAI's Image Model",
  description:
    "The best GPT Image 2 prompts for photography, character design, UI/UX, posters, and more. Each prompt includes a detailed breakdown and tips. Copy, paste, and generate stunning AI images.",
  keywords: [
    "gpt image 2 prompts",
    "gpt image 2",
    "openai image generation",
    "gpt image prompts",
    "gpt-image-2 prompt examples",
  ],
  alternates: { canonical: "https://drawprompt.org/gpt-image-2-prompts/" },
  openGraph: {
    title: "GPT Image 2 Prompts — Copy-Paste Prompt Library",
    description:
      "30+ curated prompts optimized for GPT Image 2. Photography, characters, UI design, posters, infographics, and more.",
    type: "website",
    url: "https://drawprompt.org/gpt-image-2-prompts/",
  },
};

export default function GPTImage2PromptsPage() {
  return <GPTImage2Client />;
}
