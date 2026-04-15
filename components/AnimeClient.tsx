"use client";

import { useState, useCallback, useEffect } from "react";
import {
  dimensions,
  randomFrom,
  type GeneratedPrompt,
  type SelectionState,
} from "@/lib/promptData";
import PromptCard from "@/components/PromptCard";

// Anime-appropriate themes and subjects
const ANIME_THEME_IDS   = ["fantasy", "scifi", "nature", "urban", "cozy", "surreal"];
const ANIME_SUBJECT_IDS = ["human_character", "mythical_creature", "everyday_person", "duo_group"];

function buildAnimePrompt(): GeneratedPrompt {
  const themeDim   = dimensions.theme;
  const moodDim    = dimensions.mood;
  const subjectDim = dimensions.subject;
  const paletteDim = dimensions.colorPalette;

  const themeOption   = randomFrom(themeDim.options.filter((o) => ANIME_THEME_IDS.includes(o.id)));
  const moodOption    = randomFrom(moodDim.options);
  const subjectOption = randomFrom(subjectDim.options.filter((o) => ANIME_SUBJECT_IDS.includes(o.id)));
  const paletteOption = randomFrom(paletteDim.options);

  const theme   = randomFrom(themeOption.values.filter((v) => v.trim() !== ""));
  const mood    = randomFrom(moodOption.values.filter((v) => v.trim() !== ""));
  const subject = randomFrom(subjectOption.values.filter((v) => v.trim() !== ""));
  const palette = randomFrom(paletteOption.values.filter((v) => v.trim() !== ""));

  // Always lock style to anime/manga
  const animeStyleOption = dimensions.style.options.find((o) => o.id === "anime_manga")!;
  const style = randomFrom(animeStyleOption.values);

  const moodCap = mood[0].toUpperCase() + mood.slice(1);
  const text = `${moodCap}, ${subject} ${theme}, ${palette}, ${style}`;

  const selections: SelectionState = {
    theme: themeOption.id,
    subject: subjectOption.id,
    mood: moodOption.id,
    colorPalette: paletteOption.id,
    style: "anime_manga",
    challenge: null,
  };

  return { text, selections };
}

export default function AnimeClient() {
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
    const result = buildAnimePrompt();
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
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#c47ab8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          Anime & Manga
        </p>
        <h1 className="font-serif" style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 600, color: "#2c2416", letterSpacing: "-0.02em", marginBottom: 12 }}>
          Anime Drawing Prompt Generator
        </h1>
        <p style={{ fontSize: 15, color: "#6b5d4a", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
          Drawing prompts built for anime and manga artists. Every prompt locks the style to anime illustration — so you get a complete brief that fits your aesthetic.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, padding: "5px 14px", borderRadius: 100, background: "#faf0f8", border: "1px solid #e8c0e0" }}>
          <span style={{ fontSize: 12, color: "#c47ab8", fontWeight: 600 }}>Style always: Anime / Manga</span>
        </div>
      </div>

      {/* Prompt card */}
      <div key={animKey} className={prompt ? "animate-scale-in" : ""}>
        {prompt ? (
          <PromptCard
            prompt={prompt}
            isSaved={saved}
            onSave={handleSave}
            difficulty="Anime"
            difficultyColor="#c47ab8"
          />
        ) : (
          <div className="card" style={{ padding: "48px 32px", textAlign: "center", border: "1.5px dashed #e8c0e0", background: "#fdf8fc" }}>
            <p style={{ color: "#c47ab8", fontSize: 14 }}>Hit generate for your next anime drawing prompt</p>
          </div>
        )}
      </div>

      {/* Generate button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <button
          className="btn-primary"
          onClick={generate}
          style={{ display: "flex", alignItems: "center", gap: 10, background: "#c47ab8" }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Generate Anime Prompt
        </button>
      </div>

      {/* SEO copy */}
      <div style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid #e8e0d0" }}>
        <h2 className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: "#2c2416", marginBottom: 14 }}>
          Anime drawing prompts for every skill level
        </h2>
        <p style={{ fontSize: 13, color: "#7a6a56", lineHeight: 1.8, marginBottom: 12 }}>
          Whether you draw in a Studio Ghibli style, shonen action, or soft shoujo illustration, this generator gives you a complete creative brief with the anime aesthetic locked in. Every prompt includes a character, a scene, a mood, and a color palette — all you need to start sketching.
        </p>
        <p style={{ fontSize: 13, color: "#7a6a56", lineHeight: 1.8 }}>
          Great for daily manga practice, character design warm-ups, or finding inspiration for your next illustration. Free, no sign-up, unlimited generates.
        </p>
      </div>
    </div>
  );
}
