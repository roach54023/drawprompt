"use client";

import { useState, useCallback, useEffect } from "react";
import {
  dimensions,
  randomFrom,
  type GeneratedPrompt,
  type SelectionState,
} from "@/lib/promptData";
import PromptCard from "@/components/PromptCard";

// Kid-safe theme and mood options only
const KIDS_THEME_IDS = ["cozy", "nature", "fantasy", "surreal"];
const KIDS_MOOD_IDS  = ["hopeful", "peaceful", "whimsical"];
const KIDS_SUBJECT_IDS = ["animal", "human_character", "everyday_person", "mythical_creature"];

function buildKidsPrompt(): GeneratedPrompt {
  const themeDim   = dimensions.theme;
  const moodDim    = dimensions.mood;
  const subjectDim = dimensions.subject;
  const paletteDim = dimensions.colorPalette;

  const themeOption   = randomFrom(themeDim.options.filter((o) => KIDS_THEME_IDS.includes(o.id)));
  const moodOption    = randomFrom(moodDim.options.filter((o) => KIDS_MOOD_IDS.includes(o.id)));
  const subjectOption = randomFrom(subjectDim.options.filter((o) => KIDS_SUBJECT_IDS.includes(o.id)));
  // Prefer bright palettes for kids
  const kidspalettes  = ["golden_warm", "pastel_soft", "sunset_gradient", "earthy_muted"];
  const paletteOption = randomFrom(paletteDim.options.filter((o) => kidspalettes.includes(o.id)));

  const theme   = randomFrom(themeOption.values.filter((v) => v.trim() !== ""));
  const mood    = randomFrom(moodOption.values.filter((v) => v.trim() !== ""));
  const subject = randomFrom(subjectOption.values.filter((v) => v.trim() !== ""));
  const palette = randomFrom(paletteOption.values.filter((v) => v.trim() !== ""));

  const moodCap = mood[0].toUpperCase() + mood.slice(1);
  const text = `${moodCap}, ${subject} ${theme}, ${palette}`;

  const selections: SelectionState = {
    theme: themeOption.id,
    subject: subjectOption.id,
    mood: moodOption.id,
    colorPalette: paletteOption.id,
    style: null,
    challenge: null,
  };

  return { text, selections };
}

export default function ForKidsClient() {
  const [prompt, setPrompt] = useState<GeneratedPrompt | null>(null);
  const [saved, setSaved] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("saved_prompts") || "[]");
      setSavedIds(new Set(s.map((p: { text: string }) => p.text)));
    } catch {}
  }, []);

  const generate = useCallback(() => {
    const result = buildKidsPrompt();
    setPrompt(result);
    setSaved(savedIds.has(result.text));
    setAnimKey((k) => k + 1);
  }, [savedIds]);

  const handleSave = () => {
    if (!prompt) return;
    try {
      const list = JSON.parse(localStorage.getItem("saved_prompts") || "[]");
      if (saved) {
        localStorage.setItem("saved_prompts", JSON.stringify(list.filter((s: { text: string }) => s.text !== prompt.text)));
        setSaved(false);
      } else {
        localStorage.setItem("saved_prompts", JSON.stringify([{ text: prompt.text, selections: prompt.selections, savedAt: new Date().toISOString() }, ...list]));
        setSaved(true);
      }
    } catch {}
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#5a9e7a", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          For Kids
        </p>
        <h1 className="font-serif" style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 600, color: "#2c2416", letterSpacing: "-0.02em", marginBottom: 12 }}>
          Drawing Prompt Generator for Kids
        </h1>
        <p style={{ fontSize: 15, color: "#6b5d4a", maxWidth: 400, margin: "0 auto", lineHeight: 1.7 }}>
          Fun, simple, and age-appropriate drawing prompts for young artists. Cozy, nature, fantasy, and whimsical themes only — nothing dark or scary.
        </p>
        {/* Safe content badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, padding: "5px 14px", borderRadius: 100, background: "#eef6f2", border: "1px solid #b8dcc8" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5a9e7a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span style={{ fontSize: 12, color: "#5a9e7a", fontWeight: 600 }}>Kid-safe content only</span>
        </div>
      </div>

      {/* Prompt card */}
      <div key={animKey} className={prompt ? "animate-scale-in" : ""}>
        {prompt ? (
          <PromptCard
            prompt={prompt}
            isSaved={saved}
            onSave={handleSave}
            difficulty="Kids"
            difficultyColor="#5a9e7a"
          />
        ) : (
          <div className="card" style={{ padding: "48px 32px", textAlign: "center", border: "1.5px dashed #b8dcc8", background: "#f4fbf7" }}>
            <p style={{ color: "#5a9e7a", fontSize: 14 }}>Press the button to get a drawing idea!</p>
          </div>
        )}
      </div>

      {/* Generate button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <button
          className="btn-primary"
          onClick={generate}
          style={{ display: "flex", alignItems: "center", gap: 10, background: "#5a9e7a" }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Get a Drawing Idea
        </button>
      </div>

      {/* What themes */}
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
        {[
          { label: "Cozy & Warm",   color: "#b8924a", bg: "#fdf4e8", border: "#f0d4a8" },
          { label: "Nature",        color: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8" },
          { label: "Fantasy",       color: "#8b7ab8", bg: "#f2f0f8", border: "#d0c8e8" },
          { label: "Whimsical",     color: "#c47ab8", bg: "#faf0f8", border: "#e8c0e0" },
        ].map((t) => (
          <div key={t.label} style={{ padding: "12px 16px", borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, textAlign: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: t.color }}>{t.label}</span>
          </div>
        ))}
      </div>

      {/* SEO copy */}
      <div style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid #e8e0d0" }}>
        <h2 className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: "#2c2416", marginBottom: 14 }}>
          Drawing prompts made for young artists
        </h2>
        <p style={{ fontSize: 13, color: "#7a6a56", lineHeight: 1.8, marginBottom: 12 }}>
          This generator is designed specifically for kids and young artists. Every prompt uses only cozy, nature, fantasy, and whimsical themes — no dark, scary, or mature content. Prompts are kept simple (two to three elements) so they&apos;re easy to understand and fun to draw.
        </p>
        <p style={{ fontSize: 13, color: "#7a6a56", lineHeight: 1.8 }}>
          Great for art class warm-ups, after-school drawing practice, or just a fun creative activity at home. Parents and teachers can use this freely — no account needed, no ads, completely free.
        </p>
      </div>
    </div>
  );
}
