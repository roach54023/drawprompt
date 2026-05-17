import type { Metadata } from "next";
import YoungerSelfPromptClient from "./YoungerSelfPromptClient";

export const metadata: Metadata = {
  title: "Meet Your Younger Self Prompt — AI Time Travel Photo Trend | DrawPrompt",
  description:
    "Best 'meet your younger self' AI prompts for ChatGPT. Create emotional photos of you meeting your childhood self — studio portrait, walking together, hugging, then-and-now split & letter scene. Viral trend 2025.",
  keywords: [
    "meet your younger self prompt",
    "younger self ai prompt",
    "ai childhood photo trend",
    "meet your younger self chatgpt",
    "time travel photo ai",
    "younger self portrait prompt",
    "childhood self ai image",
    "meet younger self gpt",
    "ai photo with childhood self",
    "younger self trend 2025",
    "hug your younger self ai",
    "then and now ai photo",
  ],
  alternates: { canonical: "https://drawprompt.org/younger-self-prompt/" },
  openGraph: {
    title: "Meet Your Younger Self Prompt — AI Time Travel Photos",
    description:
      "5 viral AI prompts to meet your younger self: studio portrait, walking together, emotional hug, then-and-now split, and letter scene. Works with ChatGPT GPT Image 2.",
    type: "website",
    url: "https://drawprompt.org/younger-self-prompt/",
    images: [
      {
        url: "https://drawprompt.org/prompts/meet-your-younger-self-studio-portrait.jpg",
        width: 1200,
        height: 900,
        alt: "Meet Your Younger Self Studio Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Your Younger Self Prompt — AI Time Travel | DrawPrompt",
    description:
      "Create emotional AI photos of meeting your childhood self. 5 viral prompt styles — studio portrait, walking together, hugging, then & now, and letter scene.",
    images: ["https://drawprompt.org/prompts/meet-your-younger-self-studio-portrait.jpg"],
  },
};

/* ── JSON-LD: CollectionPage + ItemList ────────────────────────────── */
const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Meet Your Younger Self Prompt — 5 Viral AI Time Travel Photo Styles",
  description:
    "A curated collection of the best 'meet your younger self' AI prompts for GPT Image 2 and ChatGPT. Includes Studio Portrait, Walking Together, Emotional Hug, Then & Now Split, and Letter Reading Scene styles.",
  url: "https://drawprompt.org/younger-self-prompt/",
  image: "https://drawprompt.org/prompts/meet-your-younger-self-studio-portrait.jpg",
  datePublished: "2025-05-17",
  dateModified: new Date().toISOString().split("T")[0],
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 5,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Studio Portrait",
        description:
          "A warm, softly lit portrait of your adult self and childhood self side by side — the most popular younger self prompt style.",
        url: "https://drawprompt.org/younger-self-prompt/#studio",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Walking Together",
        description:
          "An adult and their childhood self walking hand-in-hand down a sunlit street, as if a time portal brought them together.",
        url: "https://drawprompt.org/younger-self-prompt/#walking",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Emotional Hug",
        description:
          "An adult kneeling to embrace their childhood self in a tight, warm hug — the embodiment of self-compassion.",
        url: "https://drawprompt.org/younger-self-prompt/#hug",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Then & Now Split",
        description:
          "A side-by-side split-screen showing the same person recreating an iconic childhood photo as an adult.",
        url: "https://drawprompt.org/younger-self-prompt/#split",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Letter Reading Scene",
        description:
          "An adult sitting next to their childhood self, reading a handwritten letter together — wisdom passed across time.",
        url: "https://drawprompt.org/younger-self-prompt/#letter",
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
      name: "Younger Self Prompt",
      item: "https://drawprompt.org/younger-self-prompt/",
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
      name: "What is the 'meet your younger self' AI trend?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 'meet your younger self' AI trend is a viral phenomenon where people use AI image generators like ChatGPT with GPT Image 2 to create photorealistic images of their adult self meeting their childhood self. The results range from tender studio portraits to emotional hugs, and the trend has taken over social media in 2025 due to its deeply nostalgic and emotional impact.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create a 'meet your younger self' photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Upload a current photo and a childhood photo to ChatGPT with one of these prompts. Pick a style you like, click "Use this prompt" to load it into our free prompt maker, upload both photos, then hit "Generate Younger Self." You can also copy the prompt and paste it directly into ChatGPT along with both photos for the same result.',
      },
    },
    {
      "@type": "Question",
      name: "Do I need a childhood photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for the best result you should upload both a current photo and a childhood photo. The AI needs reference images for both ages to maintain likeness preservation — it needs to know what you look like now and what you looked like as a child. The closer the childhood photo is to the age you want to appear in the image (typically age 5-10), the more accurate the result.",
      },
    },
    {
      "@type": "Question",
      name: "Which AI model works best for this?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'ChatGPT with GPT Image 2 handles the dual-photo likeness preservation best. It can simultaneously maintain your likeness at two different ages in a single generated image, which is essential for the "meeting your younger self" effect. Other models may struggle to preserve both likenesses accurately in the same frame.',
      },
    },
    {
      "@type": "Question",
      name: "Why is this trend so emotional?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'The "meet your younger self" trend taps into universal feelings of nostalgia, self-compassion, and the desire to comfort our past selves. Seeing an image of yourself as an adult hugging or walking with your childhood self creates an instant emotional response — it\'s the visual embodiment of telling your younger self that everything is going to be okay. Many people report being moved to tears by their results.',
      },
    },
  ],
};

export default function YoungerSelfPromptPage() {
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
      <YoungerSelfPromptClient />
    </>
  );
}
