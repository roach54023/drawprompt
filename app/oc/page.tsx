import type { Metadata } from "next";
import OcClient from "@/components/OcClient";

export const metadata: Metadata = {
  title: "OC Drawing Prompt Generator — Original Character Ideas",
  description:
    "Generate original character (OC) drawing prompts for your next character design. Get a complete brief — personality, setting, mood, and visual style — to bring your OC to life.",
  keywords: [
    "oc drawing prompt generator",
    "original character prompt generator",
    "oc art prompt",
    "oc design prompt",
    "character drawing prompt generator",
  ],
  alternates: { canonical: "/oc" },
  openGraph: {
    title: "OC Drawing Prompt Generator — Original Character Ideas",
    description:
      "A complete creative brief for your next original character. Setting, mood, style — everything you need to start drawing.",
    type: "website",
    url: "/oc",
  },
};

export default function OcPage() {
  return <OcClient />;
}
