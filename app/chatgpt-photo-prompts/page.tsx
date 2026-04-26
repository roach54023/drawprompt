import type { Metadata } from "next";
import ChatGPTPhotoClient from "./ChatGPTPhotoClient";

export const metadata: Metadata = {
  title: "ChatGPT Photo Prompts — Edit, Transform & Create Photos with AI",
  description:
    "The best ChatGPT photo prompts for editing, transforming, and creating stunning images. Style transfer, background replacement, color grading, and creative compositing prompts.",
  keywords: [
    "chatgpt photo prompt",
    "chatgpt photo editing prompts",
    "chatgpt image prompts",
    "photo editing with chatgpt",
    "chatgpt photo manipulation",
  ],
  alternates: { canonical: "https://drawprompt.org/chatgpt-photo-prompts/" },
  openGraph: {
    title: "ChatGPT Photo Prompts — AI Photo Editing & Creation",
    description:
      "Curated prompts for editing and creating photos with ChatGPT. Style transfer, retouching, compositing, and more.",
    type: "website",
    url: "https://drawprompt.org/chatgpt-photo-prompts/",
  },
};

export default function ChatGPTPhotoPromptsPage() {
  return <ChatGPTPhotoClient />;
}
