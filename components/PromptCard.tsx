"use client";

import { useState } from "react";
import type { GeneratedPrompt } from "@/lib/promptData";

/* Mood → warm muted palette */
const MOOD_THEMES: Record<string, { color: string; bg: string; border: string; label: string }> = {
  melancholic:   { color: "#7b9eb8", bg: "#eef4f8", border: "#c8dce8", label: "Melancholic" },
  epic:          { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8", label: "Epic" },
  mysterious:    { color: "#8b7ab8", bg: "#f2f0f8", border: "#d0c8e8", label: "Mysterious" },
  hopeful:       { color: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8", label: "Hopeful" },
  tense:         { color: "#b85a5a", bg: "#fdf0f0", border: "#e8c0c0", label: "Tense" },
  peaceful:      { color: "#6aab8a", bg: "#eef7f2", border: "#b8dcc8", label: "Peaceful" },
  whimsical:     { color: "#c47ab8", bg: "#faf0f8", border: "#e8c0e0", label: "Whimsical" },
  dark_romantic: { color: "#8b5a7a", bg: "#f8f0f4", border: "#d8b8cc", label: "Dark Romantic" },
};

const DEFAULT_THEME = { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8", label: "" };

interface Props {
  prompt: GeneratedPrompt;
  isSaved: boolean;
  onSave: () => void;
  difficulty?: string;
  difficultyColor?: string;
}

export default function PromptCard({ prompt, isSaved, onSave, difficulty, difficultyColor }: Props) {
  const [copied, setCopied] = useState(false);

  const moodId = prompt.selections.mood ?? "";
  const theme = MOOD_THEMES[moodId] ?? DEFAULT_THEME;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div
      style={{
        background: theme.bg,
        border: `1.5px solid ${theme.border}`,
        borderRadius: 20,
        padding: "32px 32px 24px",
        boxShadow: `0 4px 24px ${theme.color}18, 0 1px 4px ${theme.color}10`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative corner squiggle */}
      <div
        style={{
          position: "absolute", top: 0, right: 0,
          width: 120, height: 120, opacity: 0.06,
          background: `radial-gradient(circle at top right, ${theme.color}, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Mood tag */}
      {theme.label && (
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 12px", borderRadius: 100,
            background: "white", border: `1px solid ${theme.border}`,
            color: theme.color, fontSize: 12, fontWeight: 600,
            marginBottom: 20, letterSpacing: "0.02em",
          }}
        >
          <span
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: theme.color, display: "inline-block",
            }}
          />
          {theme.label}
        </div>
      )}

      {/* Prompt text */}
      <p
        className="font-serif"
        style={{
          fontSize: "clamp(17px, 2.5vw, 21px)",
          lineHeight: 1.65,
          color: "var(--text-primary)",
          marginBottom: 28,
          fontWeight: 400,
          fontStyle: "italic",
          letterSpacing: "-0.01em",
        }}
      >
        &ldquo;{prompt.text}&rdquo;
      </p>

      {/* Actions row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {/* Copy */}
        <button
          onClick={handleCopy}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "8px 16px", borderRadius: 10,
            border: `1px solid ${copied ? theme.border : "var(--border)"}`,
            background: copied ? "white" : "white",
            color: copied ? theme.color : "var(--text-secondary)",
            fontSize: 13, fontWeight: 500, cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
              Copy
            </>
          )}
        </button>

        {/* Save */}
        <button
          onClick={onSave}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "8px 16px", borderRadius: 10,
            border: `1px solid ${isSaved ? theme.border : "var(--border)"}`,
            background: isSaved ? "white" : "white",
            color: isSaved ? theme.color : "var(--text-secondary)",
            fontSize: 13, fontWeight: 500, cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          <svg
            width="14" height="14" viewBox="0 0 24 24"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
          {isSaved ? "Saved" : "Save"}
        </button>

        {/* Difficulty badge */}
        {difficulty && (
          <div
            style={{
              marginLeft: "auto",
              padding: "5px 12px", borderRadius: 8,
              background: "white", border: "1px solid var(--border)",
              fontSize: 12, fontWeight: 500,
              color: difficultyColor ?? "var(--text-muted)",
            }}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </div>
        )}
      </div>
    </div>
  );
}
