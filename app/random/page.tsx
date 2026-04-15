import type { Metadata } from "next";
import RandomClient from "@/components/RandomClient";

export const metadata: Metadata = {
  title: "Random Drawing Prompt Generator — Instant Inspiration",
  description:
    "Generate a random drawing prompt instantly. Every click gives you a completely new creative brief — mood, subject, color palette, and style. 5 free prompts per day, no sign-up, no AI.",
  keywords: [
    "random drawing prompt generator",
    "random drawing prompts generator",
    "random drawing prompt",
    "random art prompt generator",
  ],
  alternates: { canonical: "/random" },
  openGraph: {
    title: "Random Drawing Prompt Generator — Instant Inspiration",
    description:
      "Hit generate and get a completely random drawing prompt. 150B+ combinations. Free, no sign-up.",
    type: "website",
    url: "/random",
  },
};

export default function RandomPage() {
  return <RandomClient />;
}
