import type { Metadata } from "next";
import DrawingGeneratorClient from "@/components/DrawingGeneratorClient";

export const metadata: Metadata = {
  title: "Drawing Prompt Generator — Free Random Art Ideas for Artists",
  description:
    "Generate unlimited drawing prompts instantly. Free drawing prompt generator for artists, beginners, and daily sketching practice. 150B+ combinations.",
  keywords: [
    "drawing prompt generator",
    "drawing prompts",
    "art prompt generator",
    "random drawing ideas",
  ],
  alternates: { canonical: "https://drawprompt.org/generator/" },
};

export default function GeneratorPage() {
  return <DrawingGeneratorClient />;
}
