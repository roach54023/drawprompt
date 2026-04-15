import type { Metadata } from "next";
import CharacterClient from "@/components/CharacterClient";

export const metadata: Metadata = {
  title: "Character Drawing Prompt Generator — OC & Character Design",
  description:
    "Generate character drawing prompts for original character design, OC art, and figure drawing practice. Human characters, mythical creatures, and everyday people — free, no sign-up.",
  keywords: [
    "character drawing prompt generator",
    "oc drawing prompt generator",
    "character design prompt",
    "original character prompt generator",
    "character art prompt",
  ],
  alternates: { canonical: "/character" },
  openGraph: {
    title: "Character Drawing Prompt Generator — OC & Character Design",
    description:
      "Prompts built for character artists. Human, mythical, everyday — every prompt is a complete character brief.",
    type: "website",
    url: "/character",
  },
};

export default function CharacterPage() {
  return <CharacterClient />;
}
