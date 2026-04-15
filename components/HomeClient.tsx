"use client";

import { useState, useCallback, useEffect } from "react";
import {
  dimensions,
  dimensionKeys,
  randomFrom,
  getDailyChallenge,
  type GeneratedPrompt,
  type SelectionState,
  type DimensionKey,
} from "@/lib/promptData";
import PromptCard from "@/components/PromptCard";
import DimensionSelector from "@/components/DimensionSelector";

// ─── Daily limit helpers ───────────────────────────────────────────────────
const DAILY_LIMIT = 5;
const STORAGE_KEY = "random_gen_usage";

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getUsageToday(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const { date, count } = JSON.parse(raw);
    return date === getTodayKey() ? count : 0;
  } catch { return 0; }
}

function incrementUsage(): number {
  try {
    const count = getUsageToday() + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: getTodayKey(), count }));
    return count;
  } catch { return 1; }
}

// ─── Prompt builder ────────────────────────────────────────────────────────
type Difficulty = "beginner" | "intermediate" | "challenge";

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; keys: DimensionKey[]; desc: string; color: string; bg: string }
> = {
  beginner:     { label: "Beginner",     keys: ["theme", "subject"],                                          desc: "2 elements · warm up",  color: "#5a9e7a", bg: "#eef6f2" },
  intermediate: { label: "Intermediate", keys: ["theme", "subject", "mood", "colorPalette"],                  desc: "4 elements · balanced",  color: "#c4714a", bg: "#fdf0e8" },
  challenge:    { label: "Challenge",    keys: ["theme", "subject", "mood", "colorPalette", "style", "challenge"], desc: "6 elements · full brief", color: "#8b7ab8", bg: "#f2f0f8" },
};

function buildDifficultyPrompt(difficulty: Difficulty): GeneratedPrompt {
  const { keys } = DIFFICULTY_CONFIG[difficulty];
  const included = new Set(keys);
  const selections: SelectionState = { theme: null, subject: null, mood: null, colorPalette: null, style: null, challenge: null };
  const values: Record<string, string> = {};

  for (const key of dimensionKeys) {
    if (!included.has(key)) continue;
    const dim = dimensions[key];
    const option = randomFrom(dim.options);
    selections[key] = option.id;
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

  return { text: parts.join(", "), selections };
}

function cap(s: string) { return s ? s[0].toUpperCase() + s.slice(1) : s; }

// ─── Component ─────────────────────────────────────────────────────────────
export default function HomeClient() {
  // Daily prompt
  const [dailyPrompt, setDailyPrompt] = useState<GeneratedPrompt | null>(null);
  const [dailySaved, setDailySaved] = useState(false);

  // Random generator
  const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
  const [randomPrompt, setRandomPrompt] = useState<GeneratedPrompt | null>(null);
  const [randomSaved, setRandomSaved] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [usageToday, setUsageToday] = useState(0);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const daily = getDailyChallenge();
    setDailyPrompt(daily);
    setUsageToday(getUsageToday());
    try {
      const saved = JSON.parse(localStorage.getItem("saved_prompts") || "[]");
      const ids = new Set<string>(saved.map((p: { text: string }) => p.text));
      setSavedIds(ids);
      setDailySaved(ids.has(daily.text));
    } catch {}
  }, []);

  // Save helper
  const handleSave = (p: GeneratedPrompt, isSaved: boolean, setIsSaved: (v: boolean) => void) => {
    try {
      const saved = JSON.parse(localStorage.getItem("saved_prompts") || "[]");
      if (isSaved) {
        const updated = saved.filter((s: { text: string }) => s.text !== p.text);
        localStorage.setItem("saved_prompts", JSON.stringify(updated));
        setSavedIds((prev) => { const n = new Set(prev); n.delete(p.text); return n; });
        setIsSaved(false);
      } else {
        if (saved.length >= 50) { alert("Saved prompts limit reached (50)."); return; }
        localStorage.setItem("saved_prompts", JSON.stringify([
          { text: p.text, selections: p.selections, savedAt: new Date().toISOString(), difficulty },
          ...saved,
        ]));
        setSavedIds((prev) => new Set([...prev, p.text]));
        setIsSaved(true);
      }
    } catch {}
  };

  // Generate random
  const generate = useCallback((diff: Difficulty = difficulty) => {
    const usage = getUsageToday();
    if (usage >= DAILY_LIMIT) return;
    const newCount = incrementUsage();
    setUsageToday(newCount);
    const result = buildDifficultyPrompt(diff);
    setRandomPrompt(result);
    setRandomSaved(savedIds.has(result.text));
    setAnimKey((k) => k + 1);
  }, [difficulty, savedIds]);

  const handleDifficulty = (d: Difficulty) => {
    // Only switch the active tab — do NOT generate (that would consume a usage count)
    setDifficulty(d);
  };

  const remaining = DAILY_LIMIT - usageToday;
  const exhausted = remaining <= 0;
  const cfg = DIFFICULTY_CONFIG[difficulty];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* ══════════════════════════════════════════
          HERO — Brief intro
      ══════════════════════════════════════════ */}
      <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: 56 }}>
        <h1
          className="font-serif"
          style={{
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 600,
            color: "#2c2416",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 14,
          }}
        >
          Drawing Prompt Generator
        </h1>
        <p style={{ fontSize: 15, color: "#6b5d4a", maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
          Free random drawing prompts for artists of every level. Each prompt is a complete creative brief — mood, subject, palette, and style — so you can beat the blank page and start drawing in seconds.
        </p>
        {/* Subtle stat pills */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
          {[
            { label: "150B+ combinations" },
            { label: "New prompt daily" },
            { label: "Free, no sign-up" },
          ].map((pill) => (
            <span
              key={pill.label}
              style={{
                padding: "4px 12px",
                borderRadius: 100,
                background: "#ffffff",
                border: "1px solid #e8e0d0",
                fontSize: 12,
                color: "#a8967e",
                fontWeight: 500,
              }}
            >
              {pill.label}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1 — Today's Prompt
      ══════════════════════════════════════════ */}
      <div className="animate-fade-up" style={{ marginBottom: 64 }}>

        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "#e8e0d0" }} />
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#a8967e", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            Today&apos;s Prompt
          </span>
          <div style={{ flex: 1, height: 1, background: "#e8e0d0" }} />
        </div>

        {/* Date */}
        <p style={{ textAlign: "center", fontSize: 13, color: "#a8967e", marginBottom: 20 }}>
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>

        {/* Daily prompt card */}
        {dailyPrompt ? (
          <PromptCard
            prompt={dailyPrompt}
            isSaved={dailySaved}
            onSave={() => handleSave(dailyPrompt, dailySaved, setDailySaved)}
            difficulty="Daily"
            difficultyColor="#b8924a"
          />
        ) : (
          <div className="card" style={{ padding: "48px 32px", textAlign: "center" }}>
            <p style={{ color: "#a8967e", fontSize: 14 }}>Loading today&apos;s prompt…</p>
          </div>
        )}

        {/* Link to daily challenge page */}
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <a
            href="/daily-challenge"
            style={{ fontSize: 13, color: "#a8967e", textDecoration: "none", borderBottom: "1px solid #e8e0d0", paddingBottom: 1 }}
          >
            View streak &amp; past challenges →
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 2 — Random Generator
      ══════════════════════════════════════════ */}
      <div>

        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: "#e8e0d0" }} />
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#a8967e", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            Random Generator
          </span>
          <div style={{ flex: 1, height: 1, background: "#e8e0d0" }} />
        </div>

        {/* Difficulty tabs */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 4, padding: 4, background: "#ffffff", border: "1px solid #e8e0d0", borderRadius: 16 }}>
            {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => {
              const c = DIFFICULTY_CONFIG[d];
              const active = difficulty === d;
              return (
                <button
                  key={d}
                  onClick={() => handleDifficulty(d)}
                  disabled={exhausted}
                  style={{
                    padding: "8px 18px", borderRadius: 12, border: "none", cursor: exhausted ? "not-allowed" : "pointer",
                    fontSize: 13, fontWeight: active ? 600 : 400,
                    background: active ? c.bg : "transparent",
                    color: active ? c.color : "#a8967e",
                    opacity: exhausted ? 0.5 : 1,
                    transition: "all 0.18s",
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#c4b49a", marginBottom: 24 }}>
          {cfg.desc}
        </p>

        {/* Usage counter */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 100,
            background: exhausted ? "#fdf0f0" : "#faf8f4",
            border: `1px solid ${exhausted ? "#e8c0c0" : "#e8e0d0"}`,
          }}>
            {/* Pip indicators */}
            <div style={{ display: "flex", gap: 4 }}>
              {Array.from({ length: DAILY_LIMIT }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: i < usageToday
                      ? (exhausted ? "#b85a5a" : "#c4714a")
                      : "#e8e0d0",
                    transition: "background 0.2s",
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: 12, color: exhausted ? "#b85a5a" : "#a8967e", fontWeight: 500 }}>
              {exhausted ? "Daily limit reached" : `${remaining} of ${DAILY_LIMIT} left today`}
            </span>
          </div>
        </div>

        {/* Prompt card or exhausted state */}
        {exhausted && !randomPrompt ? (
          <div
            className="card"
            style={{ padding: "48px 32px", textAlign: "center", border: "1.5px dashed #e8e0d0", background: "#faf8f4" }}
          >
            <p style={{ fontSize: 15, fontWeight: 600, color: "#2c2416", marginBottom: 8 }}>
              You&apos;ve used all 5 prompts for today
            </p>
            <p style={{ fontSize: 13, color: "#a8967e", marginBottom: 20 }}>
              Come back tomorrow for 5 more. In the meantime, try the daily challenge above.
            </p>
            <a href="/daily-challenge" className="btn-primary" style={{ display: "inline-flex", textDecoration: "none", fontSize: 14, padding: "11px 24px" }}>
              View Daily Challenge
            </a>
          </div>
        ) : (
          <>
            <div key={animKey} className={randomPrompt ? "animate-scale-in" : ""}>
              {randomPrompt ? (
                <PromptCard
                  prompt={randomPrompt}
                  isSaved={randomSaved}
                  onSave={() => handleSave(randomPrompt, randomSaved, setRandomSaved)}
                  difficulty={difficulty}
                  difficultyColor={cfg.color}
                />
              ) : (
                <div className="card" style={{ padding: "48px 32px", textAlign: "center", border: "1.5px dashed #e8e0d0", background: "#faf8f4" }}>
                  <p style={{ color: "#a8967e", fontSize: 14 }}>Hit the button to generate your first random prompt</p>
                </div>
              )}
            </div>

            {/* Generate button */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
              <button
                className="btn-primary"
                onClick={() => generate()}
                disabled={exhausted}
                style={{ display: "flex", alignItems: "center", gap: 10, opacity: exhausted ? 0.4 : 1, cursor: exhausted ? "not-allowed" : "pointer" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Generate Random Prompt
              </button>
            </div>
          </>
        )}

        {/* Dimension breakdown */}
        {randomPrompt && (
          <div style={{ marginTop: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 500, color: "#c4b49a", marginBottom: 12, letterSpacing: "0.04em" }}>
              Elements in this prompt
            </p>
            <DimensionSelector
              selections={randomPrompt.selections}
              activeKeys={cfg.keys}
              readOnly
            />
          </div>
        )}

        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 40 }}>
          {[
            { href: "/custom",  title: "Custom Generator", sub: "Choose your elements" },
            { href: "/saved",   title: "Saved Prompts",    sub: "Your collection" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="card"
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", textDecoration: "none" }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#2c2416" }}>{item.title}</div>
                <div style={{ fontSize: 12, color: "#a8967e", marginTop: 2 }}>{item.sub}</div>
              </div>
            </a>
          ))}
        </div>

        {/* SEO FAQ */}
        <div style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid #e8e0d0" }}>
          <h2 className="font-serif" style={{ fontSize: 20, fontWeight: 600, color: "#2c2416", marginBottom: 28, letterSpacing: "-0.01em" }}>
            Drawing Prompt Generator — Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              {
                q: "What is a drawing prompt generator?",
                a: "A drawing prompt generator gives artists, illustrators, and sketchers a creative starting point — a scene, character, mood, and style — so you can skip the blank page and start drawing immediately. Unlike simple random word generators, each prompt here is a complete creative brief built from six dimensions: theme, subject, mood, color palette, style, and an optional challenge constraint.",
              },
              {
                q: "Is this drawing prompt generator free?",
                a: "Yes, completely free. No sign-up, no account, no paywall. The daily prompt is always free and unlimited. The random generator gives you 5 prompts per day — enough for a solid practice session.",
              },
              {
                q: "Does this use AI to generate prompts?",
                a: "No. Every prompt is built from a hand-curated library of words and phrases, combined by a deterministic algorithm. There's no AI model involved — which means prompts are always coherent, human-readable, and actually drawable. No hallucinated nonsense.",
              },
              {
                q: "What's the best drawing prompt generator for beginners?",
                a: "For beginners, use the Beginner difficulty in the Random Generator — it combines just two elements (theme and subject) so the brief is simple and approachable. The daily prompt is also a great starting point since it's the same for everyone and you can see how others interpret it.",
              },
              {
                q: "Can I use this as a character drawing prompt generator?",
                a: "Yes. Head to the Character Prompts page for prompts focused specifically on character design — human characters, mythical creatures, and everyday people in specific situations. You can also use the Custom Generator and lock the Subject dimension to your preferred character type.",
              },
              {
                q: "Is there a drawing prompt generator for kids?",
                a: "Yes — the Kids Drawing Prompts page uses only age-appropriate themes (cozy, nature, whimsical, fantasy) and keeps prompts simple and fun. No dark or mature content.",
              },
              {
                q: "How many drawing prompts are there?",
                a: "The library has over 150 billion possible combinations across six dimensions. In practice, you'll never see the same prompt twice.",
              },
              {
                q: "Can I save my favorite prompts?",
                a: "Yes. Hit the heart icon on any prompt to save it to your collection. Saved prompts are stored in your browser — no account needed. You can view and manage them on the Saved Prompts page.",
              },
            ].map(({ q, a }) => (
              <div key={q} style={{ borderBottom: "1px solid #e8e0d0", paddingBottom: 20 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#4a3c2c", marginBottom: 8 }}>{q}</h3>
                <p style={{ fontSize: 13, color: "#7a6a56", lineHeight: 1.75, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}
