import type { Metadata } from "next";
import ForKidsClient from "@/components/ForKidsClient";

export const metadata: Metadata = {
  title: "Drawing Prompt Generator for Kids — Fun & Age-Appropriate",
  description:
    "Free drawing prompts for kids! Simple, fun, and age-appropriate creative briefs for young artists. Cozy, nature, fantasy, and whimsical themes only. No dark content.",
  keywords: [
    "drawing prompt generator for kids",
    "drawing prompts for kids",
    "kids art prompt generator",
    "drawing ideas for kids",
    "children drawing prompt",
  ],
  alternates: { canonical: "/for-kids" },
  openGraph: {
    title: "Drawing Prompt Generator for Kids — Fun & Age-Appropriate",
    description:
      "Simple, fun drawing prompts for young artists. Cozy, nature, and whimsical themes. Free, no sign-up.",
    type: "website",
    url: "/for-kids",
  },
};

export default function ForKidsPage() {
  return <ForKidsClient />;
}
