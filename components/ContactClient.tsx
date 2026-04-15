"use client";

const SUBMIT_EMAIL = "roach54023@foxmail.com";

const MAILTO = `mailto:${SUBMIT_EMAIL}?subject=${encodeURIComponent("[DrawingPrompt] Artwork Submission")}&body=${encodeURIComponent(
  "Hi,\n\nI'd like to submit my artwork for the daily prompt.\n\n" +
  "Date of prompt: \n" +
  "Name / Handle: \n" +
  "Social link: \n\n" +
  "[Please attach your image to this email]\n\nThanks!"
)}`;

export default function ContactClient() {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>

      <h1 className="font-serif" style={{ fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 600, color: "#2c2416", letterSpacing: "-0.02em", marginBottom: 14 }}>
        Submit your artwork
      </h1>

      <p style={{ fontSize: 15, color: "#6b5d4a", lineHeight: 1.8, marginBottom: 10 }}>
        Drew something from one of our prompts?<br />
        Send your image to:
      </p>

      <a
        href={`mailto:${SUBMIT_EMAIL}`}
        style={{ fontSize: 17, fontWeight: 600, color: "#c4714a", textDecoration: "none", borderBottom: "2px solid #f0c4a8", paddingBottom: 2 }}
      >
        {SUBMIT_EMAIL}
      </a>

      <p style={{ fontSize: 13, color: "#a8967e", lineHeight: 1.7, margin: "20px 0 32px" }}>
        Include the date of the prompt, your name or handle,<br />
        and a link to your social if you&apos;d like credit.
      </p>

      {/* CTA */}
      <a
        href={MAILTO}
        className="btn-primary"
        style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        Open email app
      </a>

      <p style={{ fontSize: 12, color: "#c4b49a", marginTop: 20 }}>
        Works on desktop &amp; mobile · No account needed
      </p>
    </div>
  );
}
