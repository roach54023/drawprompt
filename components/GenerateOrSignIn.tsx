"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

/**
 * Shows "Generate Image" link if signed in,
 * or "Sign in to Generate" if not signed in.
 */
export default function GenerateOrSignIn({ promptText }: { promptText: string }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <Link
        href={`/generate?prompt=${encodeURIComponent(promptText)}`}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
          color: "#fff", background: "#c06a3e", textDecoration: "none",
          transition: "opacity 0.15s",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        Generate Image
      </Link>
    );
  }

  return (
    <a
      href="/api/auth/signin"
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
        color: "#fff", background: "#2d2926", textDecoration: "none",
        transition: "opacity 0.15s",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
      Sign in to Generate
    </a>
  );
}
