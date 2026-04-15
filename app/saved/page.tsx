import type { Metadata } from "next";
import SavedClient from "@/components/SavedClient";

export const metadata: Metadata = {
  title: "Saved Prompts — Your Drawing Inspiration Collection",
  description: "Your saved drawing prompts. Revisit your favorite creative briefs anytime.",
};

export default function SavedPage() {
  return <SavedClient />;
}
