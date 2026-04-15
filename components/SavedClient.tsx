"use client";

import { useState, useEffect } from "react";
import { dimensions } from "@/lib/promptData";
import type { SelectionState } from "@/lib/promptData";

interface SavedPrompt {
  text: string;
  selections: SelectionState;
  savedAt: string;
  difficulty?: string;
  isDaily?: boolean;
}

const MOOD_THEMES: Record<string, { color: string; bg: string; border: string }> = {
  melancholic:   { color: "#7b9eb8", bg: "#eef4f8", border: "#c8dce8" },
  epic:          { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8" },
  mysterious:    { color: "#8b7ab8", bg: "#f2f0f8", border: "#d0c8e8" },
  hopeful:       { color: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8" },
  tense:         { color: "#b85a5a", bg: "#fdf0f0", border: "#e8c0c0" },
  peaceful:      { color: "#6aab8a", bg: "#eef7f2", border: "#b8dcc8" },
  whimsical:     { color: "#c47ab8", bg: "#faf0f8", border: "#e8c0e0" },
  dark_romantic: { color: "#8b5a7a", bg: "#f8f0f4", border: "#d8b8cc" },
};
const DEFAULT_THEME = { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8" };

export default function SavedClient() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    try { setPrompts(JSON.parse(localStorage.getItem("saved_prompts") || "[]")); } catch {}
  }, []);

  const handleDelete = (i: number) => {
    const updated = prompts.filter((_, idx) => idx !== i);
    setPrompts(updated);
    localStorage.setItem("saved_prompts", JSON.stringify(updated));
  };

  const handleCopy = async (text: string, i: number) => {
    try { await navigator.clipboard.writeText(text); setCopiedIdx(i); setTimeout(() => setCopiedIdx(null), 2000); } catch {}
  };

  const handleClearAll = () => {
    if (confirm("Remove all saved prompts?")) {
      setPrompts([]);
      localStorage.setItem("saved_prompts", JSON.stringify([]));
    }
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 6 }}>
            Saved Prompts
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)" }}>{prompts.length} / 50 saved</p>
        </div>
        {prompts.length > 0 && (
          <button
            onClick={handleClearAll}
            className="btn-ghost"
            style={{ marginTop: 6 }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Storage notice */}
      <div style={{
        display: "flex", alignItems: "flex-start", gap: 10,
        padding: "12px 16px", borderRadius: 12,
        background: "#fdf8f0", border: "1px solid #f0e0c0",
        marginBottom: 28,
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b8924a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p style={{ fontSize: 13, color: "#8a6a3a", lineHeight: 1.6, margin: 0 }}>
          Prompts are saved in your browser and may be lost if you clear your cache or switch devices.
          For anything you love, copy the text and keep it somewhere safe.
        </p>
      </div>

      {/* Progress bar */}
      {prompts.length > 0 && (
        <div style={{ height: 4, borderRadius: 4, background: "var(--surface-3)", marginBottom: 32, overflow: "hidden" }}>
          <div
            style={{
              height: "100%", borderRadius: 4,
              width: `${(prompts.length / 50) * 100}%`,
              background: "linear-gradient(90deg, #c4714a, #8b7ab8)",
              transition: "width 0.4s ease",
            }}
          />
        </div>
      )}

      {/* Empty state */}
      {prompts.length === 0 && (
        <div
          className="card"
          style={{ padding: "64px 32px", textAlign: "center", border: "1.5px dashed var(--border)", background: "var(--surface-2)" }}
        >
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
            No saved prompts yet
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>
            Hit the heart icon on any prompt to save it here
          </p>
          <a
            href="/"
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", padding: "12px 24px" }}
          >
            Generate a prompt
          </a>
        </div>
      )}

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {prompts.map((p, i) => {
          const moodId = p.selections.mood ?? "";
          const theme = MOOD_THEMES[moodId] ?? DEFAULT_THEME;
          const moodOption = moodId ? dimensions.mood.options.find((o) => o.id === moodId) : null;
          const savedDate = new Date(p.savedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

          return (
            <div
              key={i}
              style={{
                background: theme.bg,
                border: `1.5px solid ${theme.border}`,
                borderRadius: 18,
                padding: "20px 22px",
                transition: "all 0.15s",
              }}
            >
              {/* Tags */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                {moodOption && (
                  <span
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      padding: "3px 10px", borderRadius: 100,
                      background: "white", border: `1px solid ${theme.border}`,
                      color: theme.color, fontSize: 11, fontWeight: 600,
                    }}
                  >
                    {moodOption.label}
                  </span>
                )}
                {p.isDaily && (
                  <span style={{ padding: "3px 10px", borderRadius: 100, background: "#fdf4e8", border: "1px solid #f0d4a8", color: "#b8924a", fontSize: 11, fontWeight: 600 }}>
                    Daily
                  </span>
                )}
                <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-light)" }}>{savedDate}</span>
              </div>

              {/* Text */}
              <p
                className="font-serif"
                style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-primary)", fontStyle: "italic", marginBottom: 16 }}
              >
                &ldquo;{p.text}&rdquo;
              </p>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => handleCopy(p.text, i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 14px", borderRadius: 9, fontSize: 12, fontWeight: 500,
                    border: `1px solid ${copiedIdx === i ? theme.border : "var(--border)"}`,
                    background: "white",
                    color: copiedIdx === i ? theme.color : "var(--text-secondary)",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {copiedIdx === i ? (
                    <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Copied</>
                  ) : (
                    <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy</>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 14px", borderRadius: 9, fontSize: 12, fontWeight: 500,
                    border: "1px solid #e8c0c0", background: "white",
                    color: "#b85a5a", cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
