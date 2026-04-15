import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact — DrawingPrompt",
  description: "Get in touch with the DrawingPrompt team. Submit artwork, report bugs, or share suggestions.",
};

export default function ContactPage() {
  return <ContactClient />;
}
