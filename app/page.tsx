import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Drawing Prompt Generator — Free Random Art Ideas & Inspiration",
  description:
    "Generate unlimited drawing prompts instantly. Free drawing prompt generator for artists, beginners, and daily sketching practice — no sign-up, no AI fluff. 150B+ combinations.",
  keywords: [
    "drawing prompt generator",
    "drawing prompts generator",
    "random drawing prompt generator",
    "prompt generator drawing",
    "draw prompt generator",
    "free drawing prompt generator",
    "drawing prompt ideas generator",
  ],
  alternates: { canonical: "https://drawprompt.org/" },
  openGraph: {
    title: "Drawing Prompt Generator — Free Random Art Ideas & Inspiration",
    description:
      "Get a fresh drawing prompt in seconds. 150B+ combinations across mood, subject, palette, and style. Free, no sign-up.",
    type: "website",
    url: "https://drawprompt.org/",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
