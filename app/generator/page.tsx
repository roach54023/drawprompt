import type { Metadata } from "next";
import DrawingGeneratorClient from "@/components/DrawingGeneratorClient";

export const metadata: Metadata = {
  title: "Drawing Prompt Generator — Free Art Prompt Ideas for Artists & Beginners",
  description:
    "Free drawing prompt generator with 150 billion+ unique combinations. Get random art prompts with mood, subject, palette, style & creative challenges. Perfect for daily sketching, art practice, and creative blocks.",
  keywords: [
    "drawing prompt generator",
    "art prompt generator",
    "drawing prompts",
    "random drawing ideas",
    "drawing prompts for artists",
    "sketch prompt generator",
    "creative drawing prompts",
    "daily drawing challenge",
    "art ideas generator",
  ],
  alternates: { canonical: "https://drawprompt.org/generator/" },
  openGraph: {
    title: "Drawing Prompt Generator — 150B+ Free Art Prompt Combinations",
    description:
      "Generate unlimited drawing prompts with mood, subject, palette, and style. Free for artists, beginners, and daily sketching practice.",
    type: "website",
    url: "https://drawprompt.org/generator/",
  },
};

export default function GeneratorPage() {
  return <DrawingGeneratorClient />;
}
