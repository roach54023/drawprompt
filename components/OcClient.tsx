"use client";

import { useState, useCallback, useEffect } from "react";
import {
  dimensions,
  randomFrom,
  type GeneratedPrompt,
  type SelectionState,
} from "@/lib/promptData";
import PromptCard from "@/components/PromptCard";

// OC-focused: rich character subjects + varied themes + all moods
const OC_SUBJECT_IDS = ["human_character", "mythical_creature", "everyday_person", "object_personified"];

// Personality/trait layer to add depth to OC prompts
const OC_TRAITS = [
  "who carries a secret they've never told anyone",
  "who is searching for something they lost long ago",
  "who has just made an irreversible decision",
  "who is pretending to be someone they're not",
  "who is meeting a stranger who changes everything",
  "who is returning somewhere they swore they'd never go back",
  "at the moment they realize they were wrong",
  "who is the last of their kind",
  "who has been waiting for this moment their whole life",
  "who is saying goodbye",
  "who is starting over",
  "who is hiding in plain sight",
];

function buildOcPrompt(): GeneratedPrompt {
  const subjectDim = dimensions.subject;
  const moodDim    = dimensions.mood;
  const themeDim   = dimensions.theme;
  const paletteDim = dimensions.colorPalette;
  const styleDim   = dimensions.style;

  const subjectOption = randomFrom(subjectDim.options.filter((o) => OC_SUBJECT_IDS.includes(o.id)));
  const moodOption    = randomFrom(moodDim.options);
  const themeOption   = randomFrom(themeDim.options);
  const paletteOption = randomFrom(paletteDim.options);
  const styleOption   = randomFrom(styleDim.options);

  const subject = randomFrom(subjectOption.values.filter((v) => v.trim() !== ""));
  const mood    = randomFrom(moodOption.values.filter((v) => v.trim() !== ""));
  const theme   = randomFrom(themeOption.values.filter((v) => v.trim() !== ""));
  const palette = randomFrom(paletteOption.values.filter((v) => v.trim() !== ""));
  const style   = randomFrom(styleOption.values.filter((v) => v.trim() !== ""));
  const trait   = randomFrom(OC_TRAITS);

  const moodCap = mood[0].toUpperCase() + mood.slice(1);
  const text = `${moodCap}, ${subject} ${trait}, ${theme}, ${palette}, ${style}`;

  const selections: SelectionState = {
    theme: themeOption.id,
    subject: subjectOption.id,
    mood: moodOption.id,
    colorPalette: paletteOption.id,
    style: styleOption.id,
    challenge: null,
  };

  return { text, selections };
}

export default function OcClient() {
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
    const result = buildOcPrompt();
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
        <p style={{ fontSize: 11, fontWeight: 600, color: "#7b9eb8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          OC Prompts
        </p>
        <h1 className="font-serif" style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 600, color: "#2c2416", letterSpacing: "-0.02em", marginBottom: 12 }}>
          OC Drawing Prompt Generator
        </h1>
        <p style={{ fontSize: 15, color: "#6b5d4a", maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
          Original character prompts with a twist — every brief includes a personality trait or narrative moment to give your OC depth, not just a look.
        </p>
      </div>

      {/* Prompt card */}
      <div key={animKey} className={prompt ? "animate-scale-in" : ""}>
        {prompt ? (
          <PromptCard
            prompt={prompt}
            isSaved={saved}
            onSave={handleSave}
            difficulty="OC"
            difficultyColor="#7b9eb8"
          />
        ) : (
          <div className="card" style={{ padding: "48px 32px", textAlign: "center", border: "1.5px dashed #c8dce8", background: "#f4f8fc" }}>
            <p style={{ color: "#7b9eb8", fontSize: 14 }}>Generate a prompt to meet your next original character</p>
          </div>
        )}
      </div>

      {/* Generate button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <button
          className="btn-primary"
          onClick={generate}
          style={{ display: "flex", alignItems: "center", gap: 10, background: "#7b9eb8" }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Generate OC Prompt
        </button>
      </div>

      {/* What makes OC prompts different */}
      <div style={{ marginTop: 48, padding: "24px 28px", borderRadius: 18, background: "#f4f8fc", border: "1px solid #c8dce8" }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "#4a6a7a", marginBottom: 10 }}>
          What makes these OC prompts different?
        </h2>
        <p style={{ fontSize: 13, color: "#6a8a9a", lineHeight: 1.75, margin: 0 }}>
          Most prompt generators give you a character type and a setting. These prompts add a <strong>narrative moment</strong> — a secret, a decision, a goodbye — so your OC has something to <em>feel</em>, not just something to look like. The result is a character with story built in from the first sketch.
        </p>
      </div>

      {/* SEO copy */}
      <div style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid #e8e0d0" }}>
        <h2 className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: "#2c2416", marginBottom: 14 }}>
          Original character prompts for artists and writers
        </h2>
        <p style={{ fontSize: 13, color: "#7a6a56", lineHeight: 1.8, marginBottom: 12 }}>
          An OC drawing prompt should do more than describe what a character looks like — it should give you a reason to draw them. These prompts combine a character archetype, a setting, a mood, a color palette, and a narrative moment so you have everything you need to create a character with genuine depth.
        </p>
        <p style={{ fontSize: 13, color: "#7a6a56", lineHeight: 1.8 }}>
          Whether you&apos;re building a character for a comic, a game, a novel, or just for fun, use these prompts as a starting point. Save the ones that spark something and come back to them later.
        </p>
      </div>
    </div>
  );
}
