import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";
import Nav from "@/components/Nav";
import Providers from "@/components/Providers";

/* ── Global JSON-LD: WebSite + SearchAction ─────────────────── */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DrawPrompt",
  url: "https://drawprompt.org",
  description:
    "180+ copy-paste AI image prompts for GPT Image 2 & Nano Banana 2. Plus a free drawing prompt generator with 150B+ combinations for artists.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://drawprompt.org/ai-prompts?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  title: {
    default: "AI Image Prompt Library — GPT Image 2 & Nano Banana 2 | DrawPrompt",
    template: "%s | DrawPrompt",
  },
  description:
    "DrawPrompt is a curated AI image prompt library. Browse 180+ tested prompts for GPT Image 2 & Nano Banana 2 — copy, paste, and generate the same result directly on site.",
  keywords: [
    "ai image prompts",
    "ai image prompt library",
    "gpt image 2 prompts",
    "gpt image 2 prompt",
    "nano banana 2 prompts",
    "nano banana prompts",
    "ai art prompts",
    "best ai image prompts",
  ],
  metadataBase: new URL("https://drawprompt.org"),
  alternates: {
    canonical: "https://drawprompt.org",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DrawPrompt",
    url: "https://drawprompt.org",
    title: "AI Image Prompt Library — GPT Image 2 & Nano Banana 2 | DrawPrompt",
    description:
      "DrawPrompt is a curated AI image prompt library with 180+ tested prompts for GPT Image 2 & Nano Banana 2. Copy, paste, and generate the same result on site.",
    images: [
      {
        url: "https://drawprompt.org/prompts/silhouette-universe-narrative-poster.jpg",
        width: 1200,
        height: 630,
        alt: "DrawPrompt — AI Image Prompt Library for GPT Image 2 & Nano Banana 2",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Prompt Library | DrawPrompt",
    description:
      "180+ tested AI image prompts for GPT Image 2 & Nano Banana 2. Browse, copy, and generate the same result on site.",
    images: ["https://drawprompt.org/prompts/silhouette-universe-narrative-poster.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ backgroundColor: "#f8f6f1", colorScheme: "light" }}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body style={{ backgroundColor: "#f8f6f1", color: "#1a1714", margin: 0 }}>
        {/* Global JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Providers>
        <Nav />
        <main>{children}</main>

        <footer
          style={{
            borderTop: "1px solid var(--border)",
            backgroundColor: "var(--bg-deep)",
            color: "var(--text-on-dark-2)",
            padding: "64px 32px 48px",
          }}
        >
          <div
            style={{
              maxWidth: "var(--max-w)",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 48,
            }}
          >
            {/* Brand */}
            <div style={{ maxWidth: 280 }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "var(--text-on-dark)",
                  letterSpacing: "-0.03em",
                  marginBottom: 12,
                }}
              >
                Draw<span style={{ color: "var(--accent)" }}>Prompt</span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "var(--text-on-dark-2)",
                  margin: 0,
                }}
              >
                A curated AI image prompt library with 180+ tested prompts
                for GPT Image 2 &amp; Nano Banana 2.
              </p>
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-on-dark-2)",
                    marginBottom: 16,
                  }}
                >
                  Prompts
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <Link href="/gpt-image-2-prompts" style={{ fontSize: 13, color: "var(--text-on-dark-2)", textDecoration: "none" }}>
                    GPT Image 2
                  </Link>
                  <Link href="/ai-prompts" style={{ fontSize: 13, color: "var(--text-on-dark-2)", textDecoration: "none" }}>
                    All Prompts
                  </Link>
                  <Link href="/chatgpt-photo-prompts" style={{ fontSize: 13, color: "var(--text-on-dark-2)", textDecoration: "none" }}>
                    Photo Prompts
                  </Link>
                  <Link href="/chibi-prompt" style={{ fontSize: 13, color: "var(--text-on-dark-2)", textDecoration: "none" }}>
                    Chibi Prompt
                  </Link>
                  <Link href="/mothers-day" style={{ fontSize: 13, color: "var(--text-on-dark-2)", textDecoration: "none" }}>
                    Mother&#39;s Day
                  </Link>
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-on-dark-2)",
                    marginBottom: 16,
                  }}
                >
                  Tools
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <Link href="/generator" style={{ fontSize: 13, color: "var(--text-on-dark-2)", textDecoration: "none" }}>
                    Drawing Generator
                  </Link>
                  <Link href="/random" style={{ fontSize: 13, color: "var(--text-on-dark-2)", textDecoration: "none" }}>
                    Random Prompt
                  </Link>
                  <Link href="/daily-challenge" style={{ fontSize: 13, color: "var(--text-on-dark-2)", textDecoration: "none" }}>
                    Daily Challenge
                  </Link>
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-on-dark-2)",
                    marginBottom: 16,
                  }}
                >
                  Info
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <Link href="/about" style={{ fontSize: 13, color: "var(--text-on-dark-2)", textDecoration: "none" }}>
                    About
                  </Link>
                  <Link href="/contact" style={{ fontSize: 13, color: "var(--text-on-dark-2)", textDecoration: "none" }}>
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              maxWidth: "var(--max-w)",
              margin: "48px auto 0",
              paddingTop: 24,
              borderTop: "1px solid var(--border-dark)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <p style={{ fontSize: 12, color: "var(--text-on-dark-2)", margin: 0, opacity: 0.7 }}>
              &copy; 2026 DrawPrompt. All rights reserved.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <a
                href="https://www.dexigner.com/directory/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", opacity: 0.3 }}
                title="Design Directory"
              >
                <img
                  src="https://www.dexigner.com/images/logo/dexigner-logo.svg"
                  alt="Design Directory"
                  style={{ height: 11, width: "auto", border: "none", filter: "invert(1)" }}
                />
              </a>
              <a
                href="https://cal.com/roach54023"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 10, color: "var(--text-on-dark-2)", textDecoration: "none", opacity: 0.3 }}
              >
                Schedule
              </a>
              <a
                href="https://sites.google.com/view/roach54023/%E9%A6%96%E9%A1%B5"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 10, color: "var(--text-on-dark-2)", textDecoration: "none", opacity: 0.3 }}
              >
                Portfolio
              </a>
              <a
                href="https://www.provenexpert.com/en-us/howie3/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 10, color: "var(--text-on-dark-2)", textDecoration: "none", opacity: 0.3 }}
              >
                Reviews
              </a>
              <a
                href="https://egolinks.online/@roach50423"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 10, color: "var(--text-on-dark-2)", textDecoration: "none", opacity: 0.3 }}
              >
                Links
              </a>
            </div>
          </div>

          {/* Badges — horizontal scroll on mobile */}
          <div style={{
            marginTop: 28,
            overflowX: "auto",
            overflowY: "hidden",
            WebkitOverflowScrolling: "touch" as any,
            scrollbarWidth: "none" as any,
            msOverflowStyle: "none" as any,
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: "0 16px",
              minWidth: "max-content",
              margin: "0 auto",
            }}>
              <a href="https://twelve.tools" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, transition: "opacity 0.15s", flexShrink: 0 }}>
                <img src="https://twelve.tools/badge3-white.svg" alt="Featured on Twelve Tools" style={{ height: 36, width: "auto", display: "block" }} />
              </a>
              <a href="https://wired.business" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, transition: "opacity 0.15s", flexShrink: 0 }}>
                <img src="https://wired.business/badge1-white.svg" alt="Featured on Wired Business" style={{ height: 36, width: "auto", display: "block" }} />
              </a>
              <a href="https://dayslaunch.com" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, transition: "opacity 0.15s", flexShrink: 0 }}>
                <img src="https://dayslaunch.com/badages-awards.svg" alt="Featured on Days Launch" style={{ height: 36, width: "auto", display: "block" }} />
              </a>
              <a href="https://starterbest.com" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, transition: "opacity 0.15s", flexShrink: 0 }}>
                <img src="https://starterbest.com/badages-awards.svg" alt="Starter Best 精选" style={{ height: 36, width: "auto", display: "block" }} />
              </a>
              <a href="https://newtool.site/item/drawprompt" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, transition: "opacity 0.15s", flexShrink: 0 }}>
                <img src="https://newtool.site/badges/newtool-light.svg" alt="NewTool.site 精选" style={{ height: 54, width: "auto", display: "block" }} />
              </a>
            </div>
          </div>
        </footer>
        </Providers>

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3ZL3HCMN6B"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3ZL3HCMN6B');
          `}
        </Script>
      </body>
    </html>
  );
}
