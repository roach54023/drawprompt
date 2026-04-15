import type { Metadata } from "next";
import CustomClient from "@/components/CustomClient";

export const metadata: Metadata = {
  title: "Custom Drawing Prompt Generator — Choose Your Own Elements",
  description:
    "Create your perfect drawing prompt by choosing theme, subject, mood, color palette, style, and challenge. Mix and match from hundreds of options.",
};

export default function CustomPage() {
  return <CustomClient />;
}
