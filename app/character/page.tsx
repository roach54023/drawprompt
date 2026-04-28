import type { Metadata } from "next";
import CharacterClient from "@/components/CharacterClient";

export const metadata: Metadata = {
  title: "Character Drawing Prompt Generator — Figure Drawing & Character Design",
  description:
    "Generate character drawing prompts for figure drawing practice, character design, and illustration. Human characters, mythical creatures, and everyday people — complete briefs with pose, mood, and setting. Free, no sign-up.",
  keywords: [
    "character drawing prompt generator",
    "character drawing prompts",
    "character design prompt",
    "figure drawing prompt",
    "character art prompt",
    "drawing prompt character",
  ],
  alternates: { canonical: "https://drawprompt.org/character/" },
  openGraph: {
    title: "Character Drawing Prompt Generator — Figure Drawing & Character Design",
    description:
      "Prompts built for character artists and figure drawing practice. Human, mythical, everyday — every prompt is a complete character brief.",
    type: "website",
    url: "https://drawprompt.org/character/",
  },
};

export default function CharacterPage() {
  return <CharacterClient />;
}
