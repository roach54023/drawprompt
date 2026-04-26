import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  aiPrompts,
  getAIPromptBySlug,
  getRelatedPrompts,
  getCategoryInfo,
} from "@/lib/aiPromptData";
import PromptDetailClient from "./PromptDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return aiPrompts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getAIPromptBySlug(slug);
  if (!prompt) return { title: "Prompt Not Found" };
  return {
    title: `${prompt.title} — AI Image Prompt | DrawPrompt`,
    description: `${prompt.prompt.slice(0, 155)}...`,
    alternates: { canonical: `https://drawprompt.org/ai-prompts/${slug}/` },
    openGraph: {
      title: `${prompt.title} — AI Image Prompt`,
      description: `${prompt.prompt.slice(0, 155)}...`,
      type: "article",
      url: `https://drawprompt.org/ai-prompts/${slug}/`,
    },
  };
}

export default async function PromptDetailPage({ params }: Props) {
  const { slug } = await params;
  const prompt = getAIPromptBySlug(slug);
  if (!prompt) notFound();

  const catInfo = getCategoryInfo(prompt.category);
  const related = getRelatedPrompts(prompt.id, 4);

  return (
    <PromptDetailClient
      prompt={prompt}
      catInfo={catInfo}
      related={related}
    />
  );
}
