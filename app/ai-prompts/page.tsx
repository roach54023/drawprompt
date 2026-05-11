import type { Metadata } from "next";
import AIPromptsClient from "./AIPromptsClient";

export const metadata: Metadata = {
  title: "AI Image Prompts — 180+ Prompts for GPT Image 2 & Nano Banana 2",
  description:
    "Browse 180+ curated AI image prompts for GPT Image 2 & Nano Banana 2. 9 categories — photography, character design, poster, UI/UX, game art & more. Copy-paste ready with breakdowns.",
  keywords: [
    "ai image prompts",
    "ai image prompt",
    "gpt image 2 prompts",
    "nano banana 2 prompts",
    "nano banana prompts",
    "best ai image prompts",
    "ai art prompts",
    "image prompt",
    "ai photo prompts",
  ],
  alternates: { canonical: "https://drawprompt.org/ai-prompts/" },
  openGraph: {
    title: "AI Image Prompts — 180+ Prompts for GPT Image 2 & Nano Banana 2",
    description:
      "180+ curated AI image prompts organized by 9 categories. Copy-paste prompts for GPT Image 2 & Nano Banana 2.",
    type: "website",
    url: "https://drawprompt.org/ai-prompts/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://drawprompt.org/" },
        { "@type": "ListItem", "position": 2, "name": "AI Image Prompts", "item": "https://drawprompt.org/ai-prompts/" },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are AI image prompts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI image prompts are text descriptions you give to AI image generators like GPT Image 2 or Nano Banana 2 to create specific images. A good prompt specifies subject, style, lighting, composition, and technical parameters. DrawPrompt's library provides 180+ tested prompts with example outputs.",
          },
        },
        {
          "@type": "Question",
          "name": "Which AI models work with these prompts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our prompts are tested and tagged for GPT Image 2 and Nano Banana 2. Each prompt page shows which models it's compatible with. Most prompts transfer well across AI image generators with minor adjustments.",
          },
        },
        {
          "@type": "Question",
          "name": "Are the AI image prompts free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — browsing and copying all 180+ AI image prompts is completely free, no account required. Generating images directly on DrawPrompt uses GPT Image 2 and requires a free account (1 free credit included).",
          },
        },
      ],
    },
  ],
};

export default function AIPromptsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Visually hidden H1 for crawlers — client component renders its own visible heading */}
      <h1
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          borderWidth: 0,
        }}
      >
        AI Image Prompts — 180+ Tested Prompts for GPT Image 2 & Nano Banana 2
      </h1>
      <AIPromptsClient />
    </>
  );
}
