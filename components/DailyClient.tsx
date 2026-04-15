"use client";

import { useState, useEffect } from "react";
import { getDailyChallenge, dimensions, type GeneratedPrompt } from "@/lib/promptData";
import PromptCard from "@/components/PromptCard";

const MOOD_COLORS: Record<string, string> = {
  melancholic: "#7b9eb8", epic: "#c4714a", mysterious: "#8b7ab8",
  hopeful: "#5a9e7a", tense: "#b85a5a", peaceful: "#6aab8a",
  whimsical: "#c47ab8", dark_romantic: "#8b5a7a",
};

function getStreak(): { streak: number; best: number } {
  try {
    const data = JSON.parse(localStorage.getItem("daily_streak") || '{"streak":0,"lastDate":"","best":0}');
    const today = new Date().toISOString().split("T")[0];
    if (data.lastDate === today) return { streak: data.streak, best: data.best };
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split("T")[0];
    const newStreak = data.lastDate === yStr ? data.streak + 1 : 1;
    const newBest = Math.max(newStreak, data.best);
    localStorage.setItem("daily_streak", JSON.stringify({ streak: newStreak, lastDate: today, best: newBest }));
    return { streak: newStreak, best: newBest };
  } catch { return { streak: 1, best: 1 }; }
}

export default function DailyClient() {
  const [prompt, setPrompt] = useState<GeneratedPrompt | null>(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    const daily = getDailyChallenge();
    setPrompt(daily);
    const todayStr = new Date().toISOString().split("T")[0];
    setToday(todayStr);
    const { streak: s, best: b } = getStreak();
    setStreak(s); setBest(b);
    try {
      const saved = JSON.parse(localStorage.getItem("saved_prompts") || "[]");
      setIsSaved(saved.some((p: { text: string }) => p.text === daily.text));
    } catch {}
  }, []);

  const handleSave = () => {
    if (!prompt) return;
    try {
      const saved = JSON.parse(localStorage.getItem("saved_prompts") || "[]");
      if (isSaved) {
        localStorage.setItem("saved_prompts", JSON.stringify(saved.filter((p: { text: string }) => p.text !== prompt.text)));
        setIsSaved(false);
      } else {
        localStorage.setItem("saved_prompts", JSON.stringify([
          { text: prompt.text, selections: prompt.selections, savedAt: new Date().toISOString(), difficulty: "challenge", isDaily: true, date: today },
          ...saved,
        ]));
        setIsSaved(true);
      }
    } catch {}
  };

  const moodId = prompt?.selections.mood ?? "";
  const moodColor = MOOD_COLORS[moodId] ?? "#c4714a";

  const dateDisplay = today
    ? new Date(today + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "";

  const breakdown = prompt
    ? Object.entries(prompt.selections)
        .filter(([, v]) => v !== null)
        .map(([key, optionId]) => {
          const dim = dimensions[key as keyof typeof dimensions];
          const opt = dim?.options.find((o) => o.id === optionId);
          return opt ? { key, label: dim.label, option: opt } : null;
        }).filter(Boolean)
    : [];

  const DIM_COLORS: Record<string, { color: string; bg: string; border: string }> = {
    theme:        { color: "#7b9eb8", bg: "#eef4f8", border: "#c8dce8" },
    subject:      { color: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8" },
    mood:         { color: "#8b7ab8", bg: "#f2f0f8", border: "#d0c8e8" },
    colorPalette: { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8" },
    style:        { color: "#c47ab8", bg: "#faf0f8", border: "#e8c0e0" },
    challenge:    { color: "#b8924a", bg: "#fdf4e8", border: "#e8d0a8" },
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }} className="animate-fade-up">
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 14px", borderRadius: 100,
            background: "#fdf4e8", border: "1px solid #f0d4a8",
            color: "#b8924a", fontSize: 12, fontWeight: 600, marginBottom: 18,
          }}
        >
          Daily Challenge
        </div>
        <h1
          className="font-serif"
          style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 8 }}
        >
          Daily Drawing Challenge
        </h1>
        <p style={{ fontSize: 15, color: "var(--text-secondary)" }}>{dateDisplay}</p>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
          Same prompt for every artist worldwide today
        </p>
      </div>

      {/* Streak */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
        {[
          { value: streak, label: "Current Streak", color: "#b8924a", bg: "#fdf4e8", border: "#f0d4a8" },
          { value: best,   label: "Best Streak",    color: "#8b7ab8", bg: "#f2f0f8", border: "#d0c8e8" },
        ].map((item) => (
          <div
            key={item.label}
            className="card"
            style={{ padding: "20px 16px", textAlign: "center", background: item.bg, border: `1.5px solid ${item.border}` }}
          >
            <div style={{ fontSize: 32, fontWeight: 700, color: item.color, marginBottom: 4 }}>
              {item.value}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Prompt */}
      {prompt && (
        <div className="animate-scale-in">
          <PromptCard prompt={prompt} isSaved={isSaved} onSave={handleSave} difficulty="challenge" difficultyColor={moodColor} />
        </div>
      )}

      {/* Elements breakdown */}
      {breakdown.length > 0 && (
        <div style={{ marginTop: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-light)", textAlign: "center", marginBottom: 14 }}>
            Today&apos;s Elements
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
            {breakdown.map((item) => {
              if (!item) return null;
              const { key, label, option } = item;
              const c = DIM_COLORS[key] ?? { color: "#c4714a", bg: "#fdf0e8", border: "#f0c4a8" };
              return (
                <div key={key} style={{ background: c.bg, border: `1.5px solid ${c.border}`, borderRadius: 14, padding: "12px 14px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: c.color, marginBottom: 6 }}>{label}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{option.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Showcase placeholder */}
      <div
        className="card"
        style={{ marginTop: 40, padding: "32px 24px", textAlign: "center" }}
      >
        <h2 className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
          Today&apos;s Showcase
        </h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
          Share your artwork with us to be featured here.
        </p>
        <a
          href="/contact"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "9px 20px", borderRadius: 10,
            border: "1px solid var(--border)", background: "var(--surface-3)",
            color: "var(--text-secondary)", fontSize: 13, fontWeight: 500,
            textDecoration: "none", transition: "all 0.15s",
          }}
        >
          Submit artwork →
        </a>
      </div>

      {/* Past challenges */}
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <a href="/blog" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>
          Browse past challenges →
        </a>
      </div>
    </div>
  );
}
