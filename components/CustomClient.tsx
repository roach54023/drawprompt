"use client";

import { useState, useCallback } from "react";
import {
  dimensions, dimensionKeys, randomFrom,
  type DimensionKey, type SelectionState, type GeneratedPrompt,
} from "@/lib/promptData";
import PromptCard from "@/components/PromptCard";

const DIM_COLORS: Record<DimensionKey, { color: string; bg: string; border: string }> = {
  theme:        { color: "#7b9eb8", bg: "#eef4f8", border: "#c8dce8" },
  subject:      { color: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8" },
  mood:         { color: "#8b7ab8", bg: "#f2f0f8", border: "#d0c8e8" },
  colorPalette: { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8" },
  style:        { color: "#c47ab8", bg: "#faf0f8", border: "#e8c0e0" },
  challenge:    { color: "#b8924a", bg: "#fdf4e8", border: "#e8d0a8" },
};

function buildPrompt(selections: Partial<SelectionState>, locked: Set<DimensionKey>, prev: GeneratedPrompt | null): GeneratedPrompt {
  const resolved: SelectionState = { theme: null, subject: null, mood: null, colorPalette: null, style: null, challenge: null };
  const values: Record<string, string> = {};

  for (const key of dimensionKeys) {
    const dim = dimensions[key];
    const choice = locked.has(key) && prev?.selections[key]
      ? prev.selections[key]
      : selections[key] ?? null;
    const option = choice
      ? dim.options.find((o) => o.id === choice) ?? randomFrom(dim.options)
      : randomFrom(dim.options);
    resolved[key] = option.id;
    const valid = option.values.filter((v) => v.trim() !== "");
    values[key] = randomFrom(valid);
  }

  const parts: string[] = [];
  if (values.mood) parts.push(cap(values.mood));
  if (values.subject && values.theme) parts.push(`${values.subject} ${values.theme}`);
  else if (values.subject) parts.push(values.subject);
  else if (values.theme) parts.push(values.theme);
  if (values.colorPalette) parts.push(values.colorPalette);
  if (values.style) parts.push(values.style);
  if (values.challenge?.trim()) parts.push(values.challenge);

  return { text: parts.join(", "), selections: resolved };
}

function cap(s: string) { return s ? s[0].toUpperCase() + s.slice(1) : s; }

export default function CustomClient() {
  const [selections, setSelections] = useState<Partial<SelectionState>>({});
  const [locked, setLocked] = useState<Set<DimensionKey>>(new Set());
  const [prompt, setPrompt] = useState<GeneratedPrompt | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const handleSelect = (key: DimensionKey, optionId: string) => {
    setSelections((prev) => ({ ...prev, [key]: optionId || null }));
  };

  const handleToggleLock = (key: DimensionKey) => {
    setLocked((prev) => {
      const n = new Set(prev);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });
  };

  const handleGenerate = useCallback(() => {
    const result = buildPrompt(selections, locked, prompt);
    setPrompt(result);
    setIsSaved(false);
    setAnimKey((k) => k + 1);
  }, [selections, locked, prompt]);

  const handleSave = () => {
    if (!prompt) return;
    try {
      const saved = JSON.parse(localStorage.getItem("saved_prompts") || "[]");
      if (isSaved) {
        localStorage.setItem("saved_prompts", JSON.stringify(saved.filter((p: { text: string }) => p.text !== prompt.text)));
        setIsSaved(false);
      } else {
        if (saved.length >= 50) { alert("Saved prompts limit reached (50)."); return; }
        localStorage.setItem("saved_prompts", JSON.stringify([
          { text: prompt.text, selections: prompt.selections, savedAt: new Date().toISOString(), difficulty: "challenge" },
          ...saved,
        ]));
        setIsSaved(true);
      }
    } catch {}
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }} className="animate-fade-up">
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 14px", borderRadius: 100,
            background: "#eef6f2", border: "1px solid #b8dcc8",
            color: "#5a9e7a", fontSize: 12, fontWeight: 600, marginBottom: 18,
          }}
        >
          Custom Generator
        </div>
        <h1
          className="font-serif"
          style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 10 }}
        >
          Build Your Own Prompt
        </h1>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 440, margin: "0 auto" }}>
          Choose any combination of dimensions. Lock the ones you love, randomize the rest.
        </p>
      </div>

      {/* Dimension cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14, marginBottom: 28 }}>
        {dimensionKeys.map((key) => {
          const dim = dimensions[key];
          const { color, bg, border } = DIM_COLORS[key];
          const selectedId = selections[key] ?? null;
          const isLocked = locked.has(key);

          return (
            <div
              key={key}
              className="card"
              style={{
                padding: "18px 20px",
                border: `1.5px solid ${isLocked ? border : "var(--border)"}`,
                background: isLocked ? bg : "var(--surface)",
                transition: "all 0.18s",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color, marginBottom: 2 }}>
                    {dim.label}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{dim.description}</div>
                </div>
                <button
                  onClick={() => handleToggleLock(key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "5px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                    border: `1px solid ${isLocked ? border : "var(--border)"}`,
                    background: isLocked ? bg : "var(--surface-3)",
                    color: isLocked ? color : "var(--text-muted)",
                    cursor: "pointer", transition: "all 0.15s", flexShrink: 0, marginLeft: 12,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
                    {isLocked
                      ? <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                      : <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"/>
                    }
                  </svg>
                  {isLocked ? "Locked" : "Lock"}
                </button>
              </div>

              {/* Options */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                <button
                  onClick={() => handleSelect(key, "")}
                  style={{
                    padding: "5px 11px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                    border: `1px solid ${!selectedId ? border : "var(--border)"}`,
                    background: !selectedId ? bg : "var(--surface-3)",
                    color: !selectedId ? color : "var(--text-muted)",
                    cursor: "pointer", transition: "all 0.12s",
                  }}
                >
                  Random
                </button>
                {dim.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(key, opt.id)}
                    style={{
                      padding: "5px 11px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                      border: `1px solid ${selectedId === opt.id ? border : "var(--border)"}`,
                      background: selectedId === opt.id ? bg : "var(--surface-3)",
                      color: selectedId === opt.id ? color : "var(--text-muted)",
                      cursor: "pointer", transition: "all 0.12s",
                    }}
                    title={opt.description}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Generate */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
        <button
          className="btn-primary"
          onClick={handleGenerate}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "linear-gradient(135deg, #5a9e7a, #7b9eb8)",
            boxShadow: "0 2px 16px rgba(90,158,122,0.3)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Generate Prompt
        </button>
      </div>

      {/* Result */}
      {prompt ? (
        <div key={animKey} className="animate-scale-in">
          <PromptCard prompt={prompt} isSaved={isSaved} onSave={handleSave} difficulty="custom" difficultyColor="#5a9e7a" />
        </div>
      ) : (
        <div
          className="card"
          style={{ padding: "48px 32px", textAlign: "center", border: "1.5px dashed var(--border)", background: "var(--surface-2)" }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            Select your dimensions above and hit Generate
          </p>
        </div>
      )}
    </div>
  );
}
