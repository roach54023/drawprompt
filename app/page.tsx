import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Drawing Prompt Generator — Free, Random & Instant",
  description:
    "The best free drawing prompt generator. Get random drawing prompts instantly — no sign-up, no AI fluff. Perfect for daily sketching, character design, and beating creative block.",
  keywords: [
    "drawing prompt generator",
    "random drawing prompt generator",
    "drawing prompts generator",
    "free drawing prompt generator",
    "best drawing prompt generator",
    "drawing prompt generator no ai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Drawing Prompt Generator — Free, Random & Instant",
    description:
      "Get a fresh drawing prompt in seconds. 150B+ combinations across mood, subject, palette, and style. Free, no sign-up.",
    type: "website",
    url: "/",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
