import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Image Generator — Generate Images with GPT Image 2 Online",
  description:
    "Generate stunning AI images from text prompts using GPT Image 2. Photorealistic quality, accurate text rendering, and instant generation. Sign up for 1 free credit — no card needed.",
  keywords: [
    "ai image generator",
    "gpt image 2 generator",
    "ai image generator free",
    "generate ai images online",
    "gpt image 2 online",
    "text to image ai",
    "chatgpt image generator online",
    "ai photo generator",
  ],
  alternates: {
    canonical: "https://drawprompt.org/generate/",
  },
  openGraph: {
    title: "AI Image Generator — Generate Images with GPT Image 2",
    description:
      "Create AI images from text descriptions. Photorealistic quality, precise text rendering, and multiple quality tiers. Try free.",
    url: "https://drawprompt.org/generate/",
    type: "website",
    images: [
      {
        url: "https://drawprompt.org/prompts/silhouette-universe-narrative-poster.jpg",
        width: 1200,
        height: 630,
        alt: "DrawPrompt AI Image Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Generator — GPT Image 2 Online | DrawPrompt",
    description:
      "Generate AI images from text prompts. Photorealistic, accurate text, instant results. 1 free credit on sign-up.",
    images: ["https://drawprompt.org/prompts/silhouette-universe-narrative-poster.jpg"],
  },
};

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
