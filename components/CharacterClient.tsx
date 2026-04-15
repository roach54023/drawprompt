"use client";

import { useState, useCallback, useEffect } from "react";
import {
  dimensions,
  randomFrom,
  type GeneratedPrompt,
  type SelectionState,
} from "@/lib/promptData";
import PromptCard from "@/components/PromptCard";

// Character-focused subject options only
const CHARACTER_SUBJECT_IDS = ["human_character", "mythical_creature", "everyday_person", "duo_group"];

function buildCharacterPrompt(subjectId?: string): GeneratedPrompt {
  const subjectDim = dimensions.subject;
  const moodDim = dimensions.mood;
  const themeDim = dimensions.theme;
  const paletteDim = dimensions.colorPalette;

  // Pick subject — either locked or random from character options
  const subjectOptions = subjectDim.options.filter((o) => CHARACTER_SUBJECT_IDS.includes(o.id));
  const subjectOption = subjectId
    ? subjectDim.options.find((o) => o.id === subjectId) ?? randomFrom(subjectOptions)
    : randomFrom(subjectOptions);
  const subject = randomFrom(subjectOption.values.filter((v) => v.trim() !== ""));

  // Mood
  const moodOption = randomFrom(moodDim.options);
  const mood = randomFrom(moodOption.values.filter((v) => v.trim() !== ""));

  // Theme — prefer cozy/urban/nature/historical for character scenes
  const preferredThemes = ["cozy", "urban", "nature", "historical", "fantasy"];
  const themeOptions = themeDim.options.filter((o) => preferredThemes.includes(o.id));
  const themeOption = randomFrom(themeOptions);
  const theme = randomFrom(themeOption.values.filter((v) => v.trim() !== ""));

  // Palette
  const paletteOption = randomFrom(paletteDim.options);
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

const SUBJECT_TABS = [
  { id: undefined,           label: "Any",           color: "#c4714a", bg: "#fdf0e8" },
  { id: "human_character",   label: "Human",         color: "#5a9e7a", bg: "#eef6f2" },
  { id: "everyday_person",   label: "Everyday",      color: "#7b9eb8", bg: "#eef4f8" },
  { id: "mythical_creature", label: "Mythical",      color: "#8b7ab8", bg: "#f2f0f8" },
  { id: "duo_group",         label: "Duo / Group",   color: "#b8924a", bg: "#fdf4e8" },
];

export default function CharacterClient() {
  const [activeSubject, setActiveSubject] = useState<string | undefined>(undefined);
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

  const generate = useCallback((subjectId?: string) => {
    const result = buildCharacterPrompt(subjectId);
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

  const activeCfg = SUBJECT_TABS.find((t) => t.id === activeSubject) ?? SUBJECT_TABS[0];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#8b7ab8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          Character Prompts
        </p>
        <h1 className="font-serif" style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 600, color: "#2c2416", letterSpacing: "-0.02em", marginBottom: 12 }}>
          Character Drawing Prompt Generator
        </h1>
        <p style={{ fontSize: 15, color: "#6b5d4a", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
          Prompts built for character artists. Choose a character type or go fully random — every prompt gives you a complete brief for your next OC, figure study, or character design.
        </p>
      </div>

      {/* Subject filter tabs */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
        <div style={{ display: "flex", gap: 4, padding: 4, background: "#ffffff", border: "1px solid #e8e0d0", borderRadius: 16, flexWrap: "wrap", justifyContent: "center" }}>
          {SUBJECT_TABS.map((tab) => {
            const active = activeSubject === tab.id;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveSubject(tab.id)}
                style={{
                  padding: "8px 16px", borderRadius: 12, border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: active ? 600 : 400,
                  background: active ? tab.bg : "transparent",
                  color: active ? tab.color : "#a8967e",
                  transition: "all 0.18s",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Prompt card */}
      <div key={animKey} className={prompt ? "animate-scale-in" : ""}>
        {prompt ? (
          <PromptCard
            prompt={prompt}
            isSaved={saved}
            onSave={handleSave}
            difficulty="Character"
            difficultyColor={activeCfg.color}
          />
        ) : (
          <div className="card" style={{ padding: "48px 32px", textAlign: "center", border: "1.5px dashed #e8e0d0", background: "#faf8f4" }}>
            <p style={{ color: "#a8967e", fontSize: 14 }}>Choose a character type and hit generate</p>
          </div>
        )}
      </div>

      {/* Generate button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <button
          className="btn-primary"
          onClick={() => generate(activeSubject)}
          style={{ display: "flex", alignItems: "center", gap: 10, background: activeCfg.color }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Generate Character Prompt
        </button>
      </div>

      {/* SEO copy */}
      <div style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid #e8e0d0" }}>
        <h2 className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: "#2c2416", marginBottom: 14 }}>
          Character drawing prompts for every style
        </h2>
        <p style={{ fontSize: 13, color: "#7a6a56", lineHeight: 1.8, marginBottom: 12 }}>
          Whether you&apos;re designing an original character (OC), practicing figure drawing, or looking for your next illustration subject, a good character prompt gives you more than just a name — it gives you a mood, a setting, and a visual direction.
        </p>
        <p style={{ fontSize: 13, color: "#7a6a56", lineHeight: 1.8 }}>
          Use the filter tabs to focus on a specific character type, or leave it on &quot;Any&quot; for a fully random character brief. Every prompt combines a character with a scene, mood, and color palette so you can start drawing immediately.
        </p>
      </div>
    </div>
  );
}
