import type { Metadata } from "next";
import ChibiPromptClient from "./ChibiPromptClient";

export const metadata: Metadata = {
  title: "Chibi Prompt — Chibi Cartoon Prompt & Chibi Maker | DrawPrompt",
  description:
    "Best chibi prompt & chibi cartoon prompt for ChatGPT. 5 viral chibi styles — 3D Mini Me, Gashapon, Zodiac. Free chibi maker, one-click generate.",
  keywords: [
    "chibi prompt",
    "chibi cartoon prompt",
    "chibi style",
    "chibi maker",
    "new ai photo trend prompt",
    "chibi prompt gpt",
    "chibi 3d mini me prompt",
    "mini me prompt",
    "chibi art prompt",
    "chibi ai prompt",
    "cute chibi prompt generator",
    "gashapon capsule chibi prompt",
    "chibi sticker prompt",
    "chibi alter ego prompt",
    "yumi cells chibi prompt",
    "gpt image 2 chibi",
    "chatgpt chibi prompt",
    "chibi photo prompt",
  ],
  alternates: { canonical: "https://drawprompt.org/chibi-prompt/" },
  openGraph: {
    title: "Chibi Prompt — Chibi Cartoon Prompt & Chibi Maker for ChatGPT",
    description:
      "Turn your photo into adorable chibi art. 5 trending styles — 3D Mini Me, Gashapon Capsule, Zodiac Yumi Cells & more. Free prompts, one-click generate.",
    type: "website",
    url: "https://drawprompt.org/chibi-prompt/",
    images: [
      {
        url: "https://drawprompt.org/prompts/chibi-3d-mini-me-hero.jpg",
        width: 1200,
        height: 900,
        alt: "Chibi 3D Mini Me — tiny chibi versions of a person in a photo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chibi Prompt — Chibi Cartoon Prompt & Chibi Maker | DrawPrompt",
    description:
      "Best chibi cartoon prompt & chibi maker for ChatGPT. Turn your photo into adorable chibi art — 3D Mini Me, Gashapon, Zodiac & more.",
    images: ["https://drawprompt.org/prompts/chibi-3d-mini-me-hero.jpg"],
  },
};

/* ── JSON-LD: CollectionPage + ItemList ────────────────────────────── */
const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Chibi Prompt — 5 Viral Chibi Art Styles",
  description:
    "A curated collection of the best chibi prompts for GPT Image 2 and ChatGPT. Includes 3D Mini Me, Gashapon Capsule, Zodiac Yumi Cells, Scrapbook Alter Ego, and Sticker Diary styles.",
  url: "https://drawprompt.org/chibi-prompt/",
  image: "https://drawprompt.org/prompts/chibi-3d-mini-me-hero.jpg",
  datePublished: "2025-05-11",
  dateModified: new Date().toISOString().split("T")[0],
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 5,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Chibi 3D Mini Me",
        description:
          "Mini chibi 3D versions of you appear around the original photo — sitting, climbing, playing.",
        url: "https://drawprompt.org/chibi-prompt/#mini-me",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Gashapon Capsule Chibi",
        description:
          "A hand holding a transparent gashapon capsule with a cute chibi figurine version of you inside.",
        url: "https://drawprompt.org/chibi-prompt/#gashapon",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Zodiac Yumi Cells Chibi",
        description:
          "Yumi's Cells inspired poster with chibi characters reflecting zodiac personality traits.",
        url: "https://drawprompt.org/chibi-prompt/#zodiac",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Cozy Scrapbook Alter Egos",
        description:
          "Aesthetic scrapbook photo with mini chibi alter-ego figurines placed around the scene.",
        url: "https://drawprompt.org/chibi-prompt/#scrapbook",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Chibi Sticker Diary Collage",
        description:
          "Your photo surrounded by adorable chibi stickers, doodles, and handwritten diary notes.",
        url: "https://drawprompt.org/chibi-prompt/#sticker-diary",
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
      name: "Chibi Prompt",
      item: "https://drawprompt.org/chibi-prompt/",
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
      name: "What is a chibi prompt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A chibi prompt (also called a chibi cartoon prompt) is a text instruction you give to AI image generators like ChatGPT with GPT Image 2 to create cute, miniature cartoon versions of people — typically with oversized heads, small bodies, and adorable expressions. The chibi style originated from Japanese manga and anime, and has become one of the most viral new AI photo trend prompts in 2025.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use these chibi cartoon prompts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Pick a chibi style you like, click "Use this prompt" to load it into our free chibi maker, upload your photo, then hit "Generate Chibi." You can also copy the prompt and paste it directly into ChatGPT along with your photo for the same result.',
      },
    },
    {
      "@type": "Question",
      name: "Is this chibi maker free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — browsing and copying all chibi prompts is completely free. To generate on DrawPrompt directly, free users get limited generations per day. You can also paste any prompt into ChatGPT (Plus, Pro, or Team) to generate with GPT Image 2 at no extra cost.",
      },
    },
    {
      "@type": "Question",
      name: "Which chibi style is the most popular right now?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'The "Chibi 3D Mini Me" style is currently the most viral chibi cartoon prompt — it places tiny 3D chibi versions of you around your original photo. The Gashapon Capsule chibi style and Zodiac Yumi Cells are also trending fast according to Google Trends data.',
      },
    },
    {
      "@type": "Question",
      name: "Can I use these chibi prompts with Midjourney or DALL-E?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These prompts are optimized for GPT Image 2 via ChatGPT, but many chibi cartoon prompts work with other AI image generators like Midjourney or DALL-E with minor adjustments. The photo-upload features (like preserving your face in chibi style) work best with GPT Image 2.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good chibi cartoon prompt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A great chibi cartoon prompt should specify the chibi style (3D figurine, flat sticker, anime cell), how to handle the uploaded photo (preserve identity, face, hairstyle), the composition (where the chibi versions appear), and the overall mood (cute, kawaii, cozy). Our templates include all of these elements so you get consistent, high-quality results every time.",
      },
    },
  ],
};

export default function ChibiPromptPage() {
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
      <ChibiPromptClient />
    </>
  );
}
