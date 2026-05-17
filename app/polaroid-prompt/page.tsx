import type { Metadata } from "next";
import PolaroidPromptClient from "./PolaroidPromptClient";

export const metadata: Metadata = {
  title: "AI Polaroid Prompt — Instant Film Photo Effects for ChatGPT | DrawPrompt",
  description:
    "Best AI Polaroid prompts for ChatGPT and Midjourney. Create realistic instant-film photos: vintage single shots, scattered memory flatlays, photo-within-photo, booth strips & string light walls. Free prompts.",
  keywords: [
    "ai polaroid prompt",
    "polaroid effect prompt",
    "instant film ai",
    "chatgpt polaroid",
    "polaroid photo prompt",
    "vintage polaroid ai",
    "ai instant camera effect",
    "polaroid flatlay prompt",
    "photo booth strip ai",
    "retro film prompt",
    "midjourney polaroid",
    "nostalgic photo prompt",
  ],
  alternates: { canonical: "https://drawprompt.org/polaroid-prompt/" },
  openGraph: {
    title: "AI Polaroid Prompt — Instant Film Effects with ChatGPT",
    description:
      "5 viral AI Polaroid prompt styles: vintage instant photo, scattered memories, photo-within-photo, booth strip, and string lights display. Works with ChatGPT and Midjourney.",
    type: "website",
    url: "https://drawprompt.org/polaroid-prompt/",
    images: [
      {
        url: "https://drawprompt.org/prompts/ai-polaroid-vintage-instant.jpg",
        width: 1200,
        height: 900,
        alt: "AI Polaroid Vintage Instant Photo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Polaroid Prompt — Instant Film Effects | DrawPrompt",
    description:
      "Best AI Polaroid prompts for ChatGPT. 5 styles: vintage instant, scattered memories, photo-within-photo, booth strip & string lights wall.",
    images: ["https://drawprompt.org/prompts/ai-polaroid-vintage-instant.jpg"],
  },
};

/* ── JSON-LD: CollectionPage + ItemList ────────────────────────────── */
const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI Polaroid Prompt — 5 Viral Instant Film Photo Styles",
  description:
    "A curated collection of the best AI Polaroid prompts for GPT Image 2 and ChatGPT. Includes Vintage Instant Photo, Scattered Memories Flatlay, Held Against Real Scene, Photo Booth Strip, and String Lights Wall Display styles.",
  url: "https://drawprompt.org/polaroid-prompt/",
  image: "https://drawprompt.org/prompts/ai-polaroid-vintage-instant.jpg",
  datePublished: "2025-05-17",
  dateModified: new Date().toISOString().split("T")[0],
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 5,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Vintage Instant Photo",
        description:
          "A single Polaroid-style instant photo with the classic white border, faded colors, and soft vignette — like pulling a fresh shot from the camera.",
        url: "https://drawprompt.org/polaroid-prompt/#vintage-instant",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Scattered Memories Flatlay",
        description:
          "Multiple Polaroid photos scattered across a cozy surface in an aesthetic flatlay composition — a visual diary of memories.",
        url: "https://drawprompt.org/polaroid-prompt/#scattered-memories",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Held Against Real Scene",
        description:
          "A Polaroid photo held up in front of the actual location — creating a magical photo-within-a-photo effect.",
        url: "https://drawprompt.org/polaroid-prompt/#held-against-scene",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Photo Booth Strip",
        description:
          "A vertical photo booth strip with 4 candid Polaroid-style frames — classic mall booth strips with sequential poses.",
        url: "https://drawprompt.org/polaroid-prompt/#photo-booth-strip",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "String Lights Wall Display",
        description:
          "Polaroid photos clipped to a string of fairy lights on a bedroom wall — a warm, dreamy display of favorite memories.",
        url: "https://drawprompt.org/polaroid-prompt/#string-lights",
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
      name: "Polaroid Prompt",
      item: "https://drawprompt.org/polaroid-prompt/",
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
      name: "What is an AI Polaroid prompt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI Polaroid prompt is a text instruction you give to AI image generators like ChatGPT with GPT Image 2 to create realistic Polaroid or instant-film style images. These prompts specify the characteristic white border, faded colors, film grain, vignette effects, and nostalgic analog quality that make photos look like they were taken with a real instant camera.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use these Polaroid effect prompts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Pick a Polaroid style you like, click "Use this prompt" to load it into our free Polaroid prompt maker, upload your photo, then hit "Generate Polaroid." You can also copy the prompt and paste it directly into ChatGPT along with your photo for the same result.',
      },
    },
    {
      "@type": "Question",
      name: "Is this Polaroid prompt maker free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — browsing and copying all Polaroid prompts is completely free. To generate on DrawPrompt directly, free users get limited generations per day. You can also paste any prompt into ChatGPT (Plus, Pro, or Team) to generate with GPT Image 2 at no extra cost.",
      },
    },
    {
      "@type": "Question",
      name: "Which Polaroid style is the most popular right now?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'The "Vintage Instant Photo" style is currently the most viral AI Polaroid prompt — it creates a single, classic Polaroid with the iconic white border and faded colors. The "Held Against Real Scene" photo-within-a-photo effect and the "Scattered Memories Flatlay" are also trending fast on Instagram and TikTok.',
      },
    },
    {
      "@type": "Question",
      name: "Can I use these Polaroid prompts with Midjourney?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These prompts are optimized for GPT Image 2 via ChatGPT, but many Polaroid effect prompts work with Midjourney or DALL-E with minor adjustments. The photo-upload features (like preserving your face in the Polaroid style) work best with GPT Image 2 since it can process reference images directly.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good AI Polaroid prompt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A great AI Polaroid prompt should specify the instant-film style details (white border width, color fading, grain, vignette), the composition (single photo, flatlay, held in hand, booth strip, wall display), the mood (vintage, cozy, nostalgic, dreamy), and how to handle the uploaded photo (preserve identity, apply film effects). Our templates include all of these elements so you get consistent, high-quality Polaroid results every time.",
      },
    },
  ],
};

export default function PolaroidPromptPage() {
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
      <PolaroidPromptClient />
    </>
  );
}
