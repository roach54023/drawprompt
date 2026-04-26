import type { Metadata } from "next";
import AIPromptsClient from "./AIPromptsClient";

export const metadata: Metadata = {
  title: "AI Image Prompts by Category — Photography, Characters, UI Design & More",
  description:
    "Browse curated AI image prompts organized by category. Photography, photo editing, character design, UI/UX, posters, infographics, film, game art, and product shots.",
  alternates: { canonical: "https://drawprompt.org/ai-prompts/" },
  openGraph: {
    title: "AI Image Prompts by Category — Photography, Characters, UI Design & More",
    description:
      "Browse curated AI image prompts organized by category. Photography, photo editing, character design, UI/UX, posters, infographics, film, game art, and product shots.",
    type: "website",
    url: "https://drawprompt.org/ai-prompts/",
  },
};

export default function AIPromptsPage() {
  return <AIPromptsClient />;
}
