import type { Metadata } from "next";
import RandomClient from "@/components/RandomClient";

export const metadata: Metadata = {
  title: "Random Drawing Prompt Generator — Instant Inspiration",
  description:
    "Generate a random drawing prompt instantly. Every click gives you a completely new creative brief — mood, subject, color palette, and style. 5 free prompts per day, no sign-up, no AI.",
  keywords: [
    "random drawing prompt",
    "random drawing prompt generator",
    "random drawing prompts",
    "random art prompt generator",
    "give me a drawing prompt",
    "random drawing ideas",
  ],
  alternates: { canonical: "https://drawprompt.org/random/" },
  openGraph: {
    title: "Random Drawing Prompt Generator — Instant Inspiration",
    description:
      "Hit generate and get a completely random drawing prompt. 150B+ combinations. Free, no sign-up.",
    type: "website",
    url: "https://drawprompt.org/random/",
  },
};

export default function RandomPage() {
  return <RandomClient />;
}
