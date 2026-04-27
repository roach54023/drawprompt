import type { Metadata } from "next";
import ChatGPTPhotoClient from "./ChatGPTPhotoClient";

export const metadata: Metadata = {
  title: "ChatGPT Photo Prompts — AI Photo Editing & Image Generation Prompts",
  description:
    "Best ChatGPT photo prompts for AI image editing and creation. Ghibli style transfer, background replacement, vintage film grading, manga colorization & more. Works with GPT-4o and GPT Image 2.",
  keywords: [
    "chatgpt photo prompts",
    "chatgpt photo editing prompts",
    "chatgpt image editing",
    "gpt-4o photo editing",
    "ai photo style transfer",
    "chatgpt ghibli style",
    "ai photo manipulation prompts",
  ],
  alternates: { canonical: "https://drawprompt.org/chatgpt-photo-prompts/" },
  openGraph: {
    title: "ChatGPT Photo Prompts — AI Photo Editing & Style Transfer",
    description:
      "Curated prompts for editing and creating photos with ChatGPT and GPT-4o. Style transfer, retouching, compositing, and more.",
    type: "website",
    url: "https://drawprompt.org/chatgpt-photo-prompts/",
  },
};

export default function ChatGPTPhotoPromptsPage() {
  return <ChatGPTPhotoClient />;
}
