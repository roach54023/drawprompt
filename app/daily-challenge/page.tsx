import type { Metadata } from "next";
import DailyClient from "@/components/DailyClient";

export const metadata: Metadata = {
  title: "Daily Drawing Prompt Generator — New Challenge Every Day",
  description:
    "A new drawing prompt every single day. Free daily drawing challenge for artists of all levels — track your streak, build a habit, and improve your skills. No sign-up required.",
  keywords: [
    "daily drawing prompt generator",
    "daily drawing prompts generator",
    "daily drawing challenge",
    "drawing prompt of the day",
    "daily art prompt",
  ],
  alternates: { canonical: "https://drawprompt.org/daily-challenge/" },
  openGraph: {
    title: "Daily Drawing Prompt Generator — New Challenge Every Day",
    description:
      "A new drawing prompt every day. Free, no sign-up. Build your drawing habit one prompt at a time.",
    type: "website",
    url: "https://drawprompt.org/daily-challenge/",
  },
};

export default function DailyChallengePage() {
  return <DailyClient />;
}
