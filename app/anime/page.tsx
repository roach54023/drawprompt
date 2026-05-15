import type { Metadata } from "next";
import AnimeClient from "@/components/AnimeClient";

export const metadata: Metadata = {
  title: "Anime Drawing Prompt Generator — Manga & Anime Art Ideas",
  description:
    "Generate anime and manga drawing prompts instantly. Every prompt is styled for anime illustration — characters, scenes, and moods in a Japanese animation aesthetic. Free, no sign-up.",
  keywords: [
    "anime drawing prompt generator",
    "manga drawing prompt generator",
    "anime art prompt",
    "anime character prompt generator",
    "manga prompt generator",
  ],
  alternates: { canonical: "https://drawprompt.org/anime/" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Anime Drawing Prompt Generator — Manga & Anime Art Ideas",
    description:
      "Drawing prompts built for anime and manga artists. Characters, scenes, moods — all in an anime aesthetic. Free.",
    type: "website",
    url: "https://drawprompt.org/anime/",
  },
};

export default function AnimePage() {
  return <AnimeClient />;
}
