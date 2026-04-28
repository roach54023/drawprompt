import type { Metadata } from "next";
import CustomClient from "@/components/CustomClient";

export const metadata: Metadata = {
  title: "Custom Drawing Prompt Generator — Build Your Own Art Brief",
  description:
    "Create your perfect drawing prompt by choosing theme, subject, mood, color palette, style, and challenge level. Mix and match from hundreds of options to build a custom art brief that fits exactly what you want to draw.",
  keywords: [
    "custom drawing prompt generator",
    "drawing prompt generator",
    "art prompt generator",
    "custom art prompt",
    "drawing idea generator",
  ],
  alternates: { canonical: "https://drawprompt.org/custom/" },
  openGraph: {
    title: "Custom Drawing Prompt Generator — Build Your Own Art Brief",
    description:
      "Choose your theme, mood, palette, and style to build a fully custom drawing prompt. Hundreds of combinations. Free.",
    type: "website",
    url: "https://drawprompt.org/custom/",
  },
};

export default function CustomPage() {
  return <CustomClient />;
}
