import type { Metadata } from "next";
import ChatGPTPhotoClient from "./ChatGPTPhotoClient";

export const metadata: Metadata = {
  title: "ChatGPT Photo Prompts — AI Photo Editing & Generation with GPT Image 2",
  description:
    "Best ChatGPT photo prompts for AI image editing and creation. Ghibli style transfer, background replacement, vintage film grading & more. Works with GPT Image 2 and ChatGPT image generator.",
  keywords: [
    "chatgpt photo prompts",
    "chatgpt photo editing prompts",
    "chatgpt image editing",
    "gpt image 2 photo editing",
    "ai photo style transfer",
    "chatgpt ghibli style",
    "ai photo manipulation prompts",
    "best way to write image prompts",
  ],
  alternates: { canonical: "https://drawprompt.org/chatgpt-photo-prompts/" },
  openGraph: {
    title: "ChatGPT Photo Prompts — AI Photo Editing with GPT Image 2",
    description:
      "Curated prompts for editing and creating photos with ChatGPT and GPT Image 2. Style transfer, retouching, compositing, and more.",
    type: "website",
    url: "https://drawprompt.org/chatgpt-photo-prompts/",
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
        { "@type": "ListItem", "position": 3, "name": "ChatGPT Photo Prompts", "item": "https://drawprompt.org/chatgpt-photo-prompts/" },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are ChatGPT photo prompts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ChatGPT photo prompts are text instructions used with ChatGPT's image generation (powered by GPT Image 2) to edit existing photos or create photorealistic images. Examples include style transfers like Ghibli animation, background replacement, vintage film grading, and portrait retouching.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I use these prompts to edit my own photos in ChatGPT?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Upload your photo to ChatGPT and paste one of our prompts to apply transformations. GPT Image 2 supports image editing natively — our prompts are optimized for this workflow and include examples of before/after results.",
          },
        },
        {
          "@type": "Question",
          "name": "What's the difference between ChatGPT photo prompts and regular AI image prompts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Regular AI image prompts generate images from scratch. ChatGPT photo prompts are specifically crafted for photo editing tasks — they reference an uploaded image and describe a transformation (style, color, composition) rather than creating something new from nothing.",
          },
        },
      ],
    },
  ],
};

export default function ChatGPTPhotoPromptsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ChatGPTPhotoClient />
    </>
  );
}
