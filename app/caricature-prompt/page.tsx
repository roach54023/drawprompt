import type { Metadata } from "next";
import CaricaturePromptClient from "./CaricaturePromptClient";

export const metadata: Metadata = {
  title: "AI Caricature Prompt — Turn Your Photo Into a Caricature | DrawPrompt",
  description:
    "Best AI caricature prompts for ChatGPT and Midjourney. Corporate headshot, street artist sketch, magazine cover, bobblehead, and courtroom sketch styles. Free copy-paste prompts.",
  keywords: [
    "ai caricature prompt",
    "caricature generator ai",
    "chatgpt caricature",
    "ai caricature from photo",
    "caricature prompt chatgpt",
    "ai portrait caricature",
    "funny caricature ai",
    "professional caricature prompt",
    "midjourney caricature",
    "bobblehead prompt ai",
    "editorial caricature ai",
    "street artist caricature prompt",
  ],
  alternates: { canonical: "https://drawprompt.org/caricature-prompt/" },
  openGraph: {
    title: "AI Caricature Prompt — Photo to Caricature with ChatGPT",
    description:
      "5 viral AI caricature styles: corporate headshot, street artist, magazine cover, bobblehead, and courtroom sketch. Works with ChatGPT and Midjourney.",
    type: "website",
    url: "https://drawprompt.org/caricature-prompt/",
    images: [
      {
        url: "https://drawprompt.org/prompts/ai-caricature-corporate-headshot.jpg",
        width: 1200,
        height: 900,
        alt: "AI Caricature Corporate Headshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Caricature Prompt — Photo to Caricature | DrawPrompt",
    description:
      "Best AI caricature prompts for ChatGPT. 5 styles from professional to fun — corporate, street artist, magazine cover, bobblehead & courtroom sketch.",
    images: ["https://drawprompt.org/prompts/ai-caricature-corporate-headshot.jpg"],
  },
};

/* ── JSON-LD: CollectionPage + ItemList ────────────────────────────── */
const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI Caricature Prompt — 5 Viral Caricature Art Styles",
  description:
    "A curated collection of the best AI caricature prompts for GPT Image 2, ChatGPT, and Midjourney. Includes Corporate Headshot, Street Artist Sketch, Magazine Cover Portrait, 3D Bobblehead Figurine, and Courtroom Sketch styles.",
  url: "https://drawprompt.org/caricature-prompt/",
  image: "https://drawprompt.org/prompts/ai-caricature-corporate-headshot.jpg",
  datePublished: "2026-05-17",
  dateModified: new Date().toISOString().split("T")[0],
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 5,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Corporate Headshot Caricature",
        description:
          "Professional caricature illustration with slightly exaggerated but flattering proportions, perfect for LinkedIn and corporate profiles.",
        url: "https://drawprompt.org/caricature-prompt/#corporate-headshot",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Street Artist Sketch Caricature",
        description:
          "Traditional boardwalk-style hand-drawn caricature with marker strokes, cross-hatching, and comical exaggerated features.",
        url: "https://drawprompt.org/caricature-prompt/#street-artist",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Magazine Cover Portrait Caricature",
        description:
          "Sophisticated editorial caricature styled as a premium magazine cover with painterly brushwork and typography.",
        url: "https://drawprompt.org/caricature-prompt/#magazine-cover",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "3D Bobblehead Figurine Caricature",
        description:
          "Photorealistic custom bobblehead figurine with oversized head, signature pose, and hand-painted collectible quality.",
        url: "https://drawprompt.org/caricature-prompt/#bobblehead",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Courtroom Sketch Style Caricature",
        description:
          "Dramatic courtroom sketch artist illustration with pastel and charcoal strokes and a humorous caricature twist.",
        url: "https://drawprompt.org/caricature-prompt/#courtroom-sketch",
      },
    ],
  },
  publisher: {
    "@type": "Organization",
    name: "DrawPrompt",
    url: "https://drawprompt.org",
  },
};

/* ── JSON-LD: BreadcrumbList ──────────────────────────────────────── */
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://drawprompt.org/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "AI Prompts",
      item: "https://drawprompt.org/ai-prompts/",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Caricature Prompt",
      item: "https://drawprompt.org/caricature-prompt/",
    },
  ],
};

/* ── JSON-LD: FAQPage ─────────────────────────────────────────────── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an AI caricature prompt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI caricature prompt is a text instruction you give to AI image generators like ChatGPT or Midjourney to create exaggerated but recognizable artistic portraits of people. The prompt tells the AI which features to exaggerate, what style to use (corporate, street artist, editorial, bobblehead, or courtroom sketch), and how to handle the uploaded photo while preserving the subject's identity.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get the best caricature from ChatGPT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To get the best AI caricature from ChatGPT, upload a clear, well-lit headshot photo, specify which facial features to exaggerate (e.g., big smile, distinctive jawline, voluminous hair), mention the style you want (corporate, street artist, magazine cover, bobblehead, or courtroom sketch), and include instructions to keep the result flattering rather than mean-spirited. Our templates include all of these elements for consistent, high-quality results.",
      },
    },
    {
      "@type": "Question",
      name: "Are these caricature prompts free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — all caricature prompts on this page are free to copy and paste. You can use them with ChatGPT (Plus, Pro, or Team) or Midjourney at no extra cost beyond your existing subscription. Browsing, copying, and pasting is completely free with no signup required.",
      },
    },
    {
      "@type": "Question",
      name: "Which caricature style is most popular?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Corporate Headshot Caricature is the most popular style for professional use like LinkedIn profiles and company team pages. For fun gifts and social media, the Street Artist Sketch and 3D Bobblehead Figurine styles are trending fast. The Courtroom Sketch style has also gone viral as a humorous way to make friends look dramatically important.",
      },
    },
    {
      "@type": "Question",
      name: "Can the AI make caricatures that are mean or offensive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our prompts are specifically designed to produce flattering, fun caricatures. Every template includes instructions like \"flattering,\" \"never mean-spirited,\" and \"warm and charming\" to guide the AI away from unflattering or offensive exaggerations. The goal is playful personality enhancement, not insult comedy.",
      },
    },
  ],
};

export default function CaricaturePromptPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CaricaturePromptClient />
    </>
  );
}
