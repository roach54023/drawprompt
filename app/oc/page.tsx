import type { Metadata } from "next";
import OcClient from "@/components/OcClient";

export const metadata: Metadata = {
  title: "OC Drawing Prompt Generator — Fandom & Original Character Ideas",
  description:
    "Generate OC drawing prompts with built-in backstory, personality, and narrative moment. Perfect for fandom artists, comic creators, and writers building original characters with real depth. Free, no sign-up.",
  keywords: [
    "oc drawing prompt generator",
    "original character prompt generator",
    "oc art prompt",
    "oc design prompt",
    "oc prompt ideas",
  ],
  alternates: { canonical: "/oc" },
  openGraph: {
    title: "OC Drawing Prompt Generator — Fandom & Original Character Ideas",
    description:
      "OC prompts with backstory and narrative moment built in. For fandom artists, comic creators, and writers — not just a look, but a story.",
    type: "website",
    url: "/oc",
  },
};

export default function OcPage() {
  return <OcClient />;
}
