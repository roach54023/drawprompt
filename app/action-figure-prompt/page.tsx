import type { Metadata } from "next";
import ActionFigurePromptClient from "./ActionFigurePromptClient";

export const metadata: Metadata = {
  title: "AI Action Figure Prompt — Turn Yourself Into a Toy Collectible | DrawPrompt",
  description:
    "Best AI action figure prompts for ChatGPT and Midjourney. Blister pack, diorama, toy store, accessories flatlay, and battle scene styles. Free copy-paste prompts.",
  keywords: [
    "ai action figure prompt",
    "action figure generator ai",
    "chatgpt action figure",
    "ai action figure from photo",
    "action figure prompt chatgpt",
    "ai toy figure prompt",
    "blister pack action figure ai",
    "custom action figure prompt",
    "midjourney action figure",
    "ai collectible figure prompt",
    "action figure toy store prompt",
    "ai figure diorama prompt",
  ],
  alternates: { canonical: "https://drawprompt.org/action-figure-prompt/" },
  openGraph: {
    title: "AI Action Figure Prompt — Turn Yourself Into a Toy Collectible with ChatGPT",
    description:
      "5 viral AI action figure styles: blister pack, diorama, toy store shelf, accessories flatlay, and battle scene. Works with ChatGPT and Midjourney.",
    type: "website",
    url: "https://drawprompt.org/action-figure-prompt/",
    images: [
      {
        url: "https://drawprompt.org/prompts/ai-action-figure-blister-pack.jpg",
        width: 1200,
        height: 900,
        alt: "AI Action Figure Blister Pack — custom collectible toy figure prompt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Action Figure Prompt — Turn Yourself Into a Toy Collectible | DrawPrompt",
    description:
      "Best AI action figure prompts for ChatGPT. 5 styles from blister pack to battle scene — toy collectible, diorama, flatlay & more.",
    images: ["https://drawprompt.org/prompts/ai-action-figure-blister-pack.jpg"],
  },
};

/* ── JSON-LD: CollectionPage + ItemList ────────────────────────────── */
const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI Action Figure Prompt — 5 Viral Collectible Toy Figure Styles",
  description:
    "A curated collection of the best AI action figure prompts for GPT Image 2, ChatGPT, and Midjourney. Includes Blister Pack Figure, Open Box Diorama, Toy Store Shelf, Accessories Flatlay, and Dynamic Battle Scene styles.",
  url: "https://drawprompt.org/action-figure-prompt/",
  image: "https://drawprompt.org/prompts/ai-action-figure-blister-pack.jpg",
  datePublished: "2026-05-17",
  dateModified: new Date().toISOString().split("T")[0],
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 5,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blister Pack Action Figure",
        description:
          "Custom action figure sealed in retail blister packaging with accessories, like finding yourself on a toy store shelf.",
        url: "https://drawprompt.org/action-figure-prompt/#blister-pack",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Open Box Diorama Figure",
        description:
          "Premium collectible figure in an open-front diorama box with LED lighting, themed backdrop, and limited edition nameplate.",
        url: "https://drawprompt.org/action-figure-prompt/#diorama",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Toy Store Shelf Figure",
        description:
          "Action figure spotted on a real toy store shelf among other toys, complete with price tag and NEW badge.",
        url: "https://drawprompt.org/action-figure-prompt/#toy-store",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Accessories Flatlay Figure",
        description:
          "Top-down flatlay of unboxed figure with all accessories arranged symmetrically, like a collector review thumbnail.",
        url: "https://drawprompt.org/action-figure-prompt/#flatlay",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Dynamic Battle Scene Figure",
        description:
          "Figure in a dramatic action pose with cinematic lighting, sparks, and special effects, like premium toy photography.",
        url: "https://drawprompt.org/action-figure-prompt/#battle",
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
      name: "Action Figure Prompt",
      item: "https://drawprompt.org/action-figure-prompt/",
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
      name: "What is an AI action figure prompt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI action figure prompt is a text instruction you give to AI image generators like ChatGPT or Midjourney to create a photorealistic image of yourself (or anyone) as a collectible action figure toy. The prompt tells the AI which packaging style to use (blister pack, diorama, toy store shelf, flatlay, or battle scene), how the figure should look, what accessories to include, and what the surrounding environment should be.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make an action figure of myself with AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To make an AI action figure of yourself, upload a clear, well-lit photo to ChatGPT, copy one of our tested prompts, replace the placeholder text (like [SUBJECT], [NAME], [OUTFIT]) with your details, and hit generate. The Blister Pack style is the most popular and easiest to get great results. For best results, use a front-facing headshot and specify your distinctive features and favorite accessories.",
      },
    },
    {
      "@type": "Question",
      name: "Are these action figure prompts free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — all action figure prompts on this page are free to copy and paste. You can use them with ChatGPT (Plus, Pro, or Team) or Midjourney at no extra cost beyond your existing subscription. Browsing, copying, and pasting is completely free with no signup required.",
      },
    },
    {
      "@type": "Question",
      name: "Which action figure style is most popular?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Blister Pack Figure style is the most popular and most shared on social media — it looks exactly like finding yourself on a toy store shelf. The Toy Store Shelf style is also going viral for its candid retail photography feel. For collectors and serious hobbyists, the Open Box Diorama style delivers the most premium, high-end result that resembles real Hot Toys or Sideshow Collectibles figures.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these prompts for commercial purposes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The prompts themselves are free to use however you like. However, the images generated by AI tools are subject to each platform's terms of service. ChatGPT-generated images can generally be used for personal and commercial purposes per OpenAI's usage policy, but you should review the latest terms on each platform. Always ensure you have the right to use any reference photos you upload.",
      },
    },
  ],
};

export default function ActionFigurePromptPage() {
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
      <ActionFigurePromptClient />
    </>
  );
}
