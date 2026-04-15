import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: {
    default: "Drawing Prompt Generator — Free Random Art Prompts",
    template: "%s | DrawingPrompt",
  },
  description:
    "Generate unlimited free drawing prompts instantly. No sign-up needed. Perfect for artists, beginners, and daily sketching practice.",
  keywords: [
    "drawing prompt generator",
    "art prompt generator",
    "random drawing prompt",
    "drawing ideas generator",
    "sketch prompt",
    "daily drawing challenge",
  ],
  metadataBase: new URL("https://drawprompt.org"),
  alternates: {
    canonical: "https://drawprompt.org",
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
    <html lang="en" style={{ backgroundColor: "#faf8f4", colorScheme: "light" }}>
      <body style={{ backgroundColor: "#faf8f4", color: "#2c2416", margin: 0 }}>
        <Nav />
        <main>{children}</main>

        <footer
          style={{
            marginTop: 96,
            paddingTop: 40,
            paddingBottom: 40,
            paddingLeft: 24,
            paddingRight: 24,
            textAlign: "center",
            borderTop: "1px solid #e8e0d0",
            backgroundColor: "#faf8f4",
          }}
        >
          <p style={{ fontSize: 13, color: "#a8967e", margin: 0 }}>
            © 2026 DrawingPrompt · Made for artists, by artists ·{" "}
            <a href="/about" style={{ color: "#a8967e", textDecoration: "none" }}>About</a>
            {" · "}
            <a href="/contact" style={{ color: "#a8967e", textDecoration: "none" }}>Contact</a>
          </p>
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
