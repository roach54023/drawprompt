import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact DrawPrompt — Feedback, Bugs & Suggestions",
  description: "Get in touch with the DrawPrompt team. Submit artwork, report bugs, or share suggestions for our drawing prompt generator and AI image prompts.",
  alternates: { canonical: "https://drawprompt.org/contact/" },
  openGraph: {
    title: "Contact DrawPrompt",
    description: "Get in touch with the DrawPrompt team. Submit artwork, report bugs, or share suggestions.",
    type: "website",
    url: "https://drawprompt.org/contact/",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
