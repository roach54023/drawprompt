import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: {
    default: "AI Image Prompts — GPT Image 2, ChatGPT & Midjourney | DrawPrompt",
    template: "%s | DrawPrompt",
  },
  description:
    "Copy-paste AI image prompts for GPT Image 2, ChatGPT, Midjourney, and DALL-E. Also includes a free drawing prompt generator for human artists.",
  keywords: [
    "ai image prompts",
    "gpt image 2 prompts",
    "chatgpt photo prompt",
    "midjourney prompts",
    "dall-e prompts",
    "drawing prompt generator",
    "art prompt generator",
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
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ backgroundColor: "#f8f6f1", colorScheme: "light" }}>
      <body style={{ backgroundColor: "#f8f6f1", color: "#1a1714", margin: 0 }}>
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
                Curated AI image prompts and a drawing prompt generator
                for artists of every kind.
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
          </div>
        </footer>

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
