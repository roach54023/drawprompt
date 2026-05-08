import type { Metadata } from "next";
import MothersDayClient from "./MothersDayClient";

export const metadata: Metadata = {
  title: "Mother's Day Poster — Free Templates & Ideas | DrawPrompt",
  description:
    "Make a Mother's Day poster in minutes. 4 free poster templates — choose a design, upload your photo, and generate a gallery-quality art print for Mom. No design skills needed.",
  keywords: [
    "mothers day poster",
    "mothers day poster ideas",
    "mothers day poster template",
    "free mothers day poster maker",
    "how to make a mothers day poster",
  ],
  alternates: { canonical: "https://drawprompt.org/mothers-day/" },
  openGraph: {
    title: "Mother's Day Poster — Free Templates & Ideas",
    description:
      "Make a Mother's Day poster in minutes. 4 free templates — upload your photo, generate a gallery-quality art print for Mom.",
    type: "website",
    url: "https://drawprompt.org/mothers-day/",
    images: [
      {
        url: "https://drawprompt.org/prompts/mothers-day-mom-silhouette-poster.jpg",
        width: 1086,
        height: 1448,
        alt: "Mother's Day poster example — MOM silhouette art print",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mother's Day Poster — Free Templates & Ideas",
    description:
      "4 free poster templates. Upload your photo, generate a gallery-quality art print for Mom.",
    images: ["https://drawprompt.org/prompts/mothers-day-mom-silhouette-poster.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Make a Mother's Day Poster",
  description:
    "Make a personalized Mother's Day poster in 3 steps using AI image generation. Free templates included.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose a poster template",
      text: "Pick from 4 curated Mother's Day poster designs. Each template produces a different style of flat-graphic art poster.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Upload your photo and generate",
      text: "Add a photo of you and your mom. The AI preserves real faces and turns it into a gallery-quality poster.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Share with Mom",
      text: "Download your poster, print it, frame it, or send it directly to Mom on Mother's Day.",
    },
  ],
  tool: [
    { "@type": "HowToTool", name: "ChatGPT with GPT Image 2" },
    { "@type": "HowToTool", name: "DrawPrompt" },
  ],
  totalTime: "PT5M",
  url: "https://drawprompt.org/mothers-day/",
  publisher: {
    "@type": "Organization",
    name: "DrawPrompt",
    url: "https://drawprompt.org",
  },
};

export default function MothersDayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MothersDayClient />
    </>
  );
}
