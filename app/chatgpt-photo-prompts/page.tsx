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

export default function ChatGPTPhotoPromptsPage() {
  return <ChatGPTPhotoClient />;
}
