"use client";

import { useState, useCallback, useEffect } from "react";
import {
  dimensions,
  dimensionKeys,
  randomFrom,
  type GeneratedPrompt,
  type SelectionState,
  type DimensionKey,
} from "@/lib/promptData";
import PromptCard from "@/components/PromptCard";
import DimensionSelector from "@/components/DimensionSelector";

// ─── Daily limit (shared key with RandomClient) ─────────────────────────
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
  } catch {
    return 0;
  }
}
function incrementUsage(): number {
  try {
    const count = getUsageToday() + 1;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: getTodayKey(), count })
    );
    return count;
  } catch {
    return 1;
  }
}

// ─── Difficulty config ──────────────────────────────────────────────────
type Difficulty = "beginner" | "intermediate" | "challenge";

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  {
    label: string;
    keys: DimensionKey[];
    desc: string;
    color: string;
    bg: string;
  }
> = {
  beginner: {
    label: "Beginner",
    keys: ["theme", "subject"],
    desc: "2 elements \u00b7 warm up",
    color: "#5a9e7a",
    bg: "#eef6f2",
  },
  intermediate: {
    label: "Intermediate",
    keys: ["theme", "subject", "mood", "colorPalette"],
    desc: "4 elements \u00b7 balanced",
    color: "#c4714a",
    bg: "#fdf0e8",
  },
  challenge: {
    label: "Challenge",
    keys: ["theme", "subject", "mood", "colorPalette", "style", "challenge"],
    desc: "6 elements \u00b7 full brief",
    color: "#8b7ab8",
    bg: "#f2f0f8",
  },
};

function buildPrompt(difficulty: Difficulty): GeneratedPrompt {
  const { keys } = DIFFICULTY_CONFIG[difficulty];
  const included = new Set(keys);
  const selections: SelectionState = {
    theme: null,
    subject: null,
    mood: null,
    colorPalette: null,
    style: null,
    challenge: null,
  };
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
  if (values.mood)
    parts.push(values.mood[0].toUpperCase() + values.mood.slice(1));
  if (values.subject && values.theme)
    parts.push(`${values.subject} ${values.theme}`);
  else if (values.subject) parts.push(values.subject);
  else if (values.theme) parts.push(values.theme);
  if (values.colorPalette) parts.push(values.colorPalette);
  if (values.style) parts.push(values.style);
  if (values.challenge?.trim()) parts.push(values.challenge);

  return { text: parts.join(", "), selections };
}

// ─── Component ──────────────────────────────────────────────────────────
export default function DrawingGeneratorClient() {
  const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
  const [prompt, setPrompt] = useState<GeneratedPrompt | null>(null);
  const [saved, setSaved] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [usageToday, setUsageToday] = useState(0);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("saved_prompts") || "[]");
      setSavedIds(new Set(s.map((p: { text: string }) => p.text)));
    } catch {
      /* empty */
    }
    setUsageToday(getUsageToday());
  }, []);

  const generate = useCallback(
    (diff: Difficulty = difficulty) => {
      const usage = getUsageToday();
      if (usage >= DAILY_LIMIT) return;
      const newCount = incrementUsage();
      setUsageToday(newCount);
      const result = buildPrompt(diff);
      setPrompt(result);
      setSaved(savedIds.has(result.text));
      setAnimKey((k) => k + 1);
    },
    [difficulty, savedIds]
  );

  const handleSave = () => {
    if (!prompt) return;
    try {
      const list = JSON.parse(
        localStorage.getItem("saved_prompts") || "[]"
      );
      if (saved) {
        localStorage.setItem(
          "saved_prompts",
          JSON.stringify(
            list.filter((s: { text: string }) => s.text !== prompt.text)
          )
        );
        setSaved(false);
      } else {
        localStorage.setItem(
          "saved_prompts",
          JSON.stringify([
            {
              text: prompt.text,
              selections: prompt.selections,
              savedAt: new Date().toISOString(),
              difficulty,
            },
            ...list,
          ])
        );
        setSaved(true);
      }
    } catch {
      /* empty */
    }
  };

  const remaining = DAILY_LIMIT - usageToday;
  const exhausted = remaining <= 0;
  const cfg = DIFFICULTY_CONFIG[difficulty];

  return (
    <div
      style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}
    >
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#7b9eb8",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Drawing Prompt Generator
        </p>
        <h1
          className="font-serif"
          style={{
            fontSize: "clamp(26px, 5vw, 40px)",
            fontWeight: 600,
            color: "#2c2416",
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          Drawing Prompt Generator
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#6b5d4a",
            maxWidth: 420,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Every click is a completely new creative brief &mdash; mood, subject,
          palette, and style, all randomised. Over 150 billion combinations. 5
          prompts per day, free.
        </p>
      </div>

      {/* Difficulty tabs */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div
          style={{
            display: "flex",
            gap: 4,
            padding: 4,
            background: "#ffffff",
            border: "1px solid #e8e0d0",
            borderRadius: 16,
          }}
        >
          {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => {
            const c = DIFFICULTY_CONFIG[d];
            const active = difficulty === d;
            return (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                disabled={exhausted}
                style={{
                  padding: "8px 18px",
                  borderRadius: 12,
                  border: "none",
                  cursor: exhausted ? "not-allowed" : "pointer",
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
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
      <p
        style={{
          textAlign: "center",
          fontSize: 12,
          color: "#c4b49a",
          marginBottom: 20,
        }}
      >
        {cfg.desc}
      </p>

      {/* Usage counter */}
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 100,
            background: exhausted ? "#fdf0f0" : "#faf8f4",
            border: `1px solid ${exhausted ? "#e8c0c0" : "#e8e0d0"}`,
          }}
        >
          <div style={{ display: "flex", gap: 4 }}>
            {Array.from({ length: DAILY_LIMIT }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background:
                    i < usageToday
                      ? exhausted
                        ? "#b85a5a"
                        : "#c4714a"
                      : "#e8e0d0",
                  transition: "background 0.2s",
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: 12,
              color: exhausted ? "#b85a5a" : "#a8967e",
              fontWeight: 500,
            }}
          >
            {exhausted
              ? "Daily limit reached"
              : `${remaining} of ${DAILY_LIMIT} left today`}
          </span>
        </div>
      </div>

      {/* Prompt card or exhausted state */}
      {exhausted && !prompt ? (
        <div
          className="card"
          style={{
            padding: "48px 32px",
            textAlign: "center",
            border: "1.5px dashed #e8e0d0",
            background: "#faf8f4",
          }}
        >
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#2c2416",
              marginBottom: 8,
            }}
          >
            You&apos;ve used all 5 prompts for today
          </p>
          <p
            style={{ fontSize: 13, color: "#a8967e", marginBottom: 20 }}
          >
            Come back tomorrow for 5 more.
          </p>
          <a
            href="/daily-challenge"
            className="btn-primary"
            style={{
              display: "inline-flex",
              textDecoration: "none",
              fontSize: 14,
              padding: "11px 24px",
            }}
          >
            View Daily Challenge
          </a>
        </div>
      ) : (
        <>
          <div key={animKey} className={prompt ? "animate-scale-in" : ""}>
            {prompt ? (
              <PromptCard
                prompt={prompt}
                isSaved={saved}
                onSave={handleSave}
                difficulty={difficulty}
                difficultyColor={cfg.color}
              />
            ) : (
              <div
                className="card"
                style={{
                  padding: "48px 32px",
                  textAlign: "center",
                  border: "1.5px dashed #e8e0d0",
                  background: "#faf8f4",
                }}
              >
                <p style={{ color: "#a8967e", fontSize: 14 }}>
                  Hit the button to generate your first drawing prompt
                </p>
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <button
              className="btn-primary"
              onClick={() => generate()}
              disabled={exhausted}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: exhausted ? 0.4 : 1,
                cursor: exhausted ? "not-allowed" : "pointer",
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Generate Drawing Prompt
            </button>
          </div>
        </>
      )}

      {/* Dimension breakdown */}
      {prompt && (
        <div style={{ marginTop: 40 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "#c4b49a",
              marginBottom: 12,
              letterSpacing: "0.04em",
            }}
          >
            Elements in this prompt
          </p>
          <DimensionSelector
            selections={prompt.selections}
            activeKeys={cfg.keys}
            readOnly
          />
        </div>
      )}

      {/* SEO copy */}
      <div
        style={{
          marginTop: 64,
          paddingTop: 40,
          borderTop: "1px solid #e8e0d0",
        }}
      >
        <h2
          className="font-serif"
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#2c2416",
            marginBottom: 14,
          }}
        >
          What makes a good drawing prompt?
        </h2>
        <p
          style={{
            fontSize: 13,
            color: "#7a6a56",
            lineHeight: 1.8,
            marginBottom: 12,
          }}
        >
          A great drawing prompt isn&apos;t just a random word &mdash;
          it&apos;s a complete creative brief. This generator combines six
          dimensions (theme, subject, mood, color palette, style, and challenge)
          to give you a prompt that&apos;s specific enough to be useful but open
          enough to interpret your own way. With over 150 billion possible
          combinations, you&apos;ll never run out of inspiration.
        </p>
        <p
          style={{
            fontSize: 13,
            color: "#7a6a56",
            lineHeight: 1.8,
            marginBottom: 12,
          }}
        >
          Unlike AI-generated prompts, every combination here is hand-curated
          and guaranteed to be coherent and actually drawable. No hallucinated
          nonsense, no impossible scenes &mdash; just clean, inspiring creative
          briefs for artists of all levels.
        </p>
        <p style={{ fontSize: 13, color: "#7a6a56", lineHeight: 1.8 }}>
          Whether you&apos;re warming up with a quick 2-element sketch, working
          through a balanced 4-element study, or pushing yourself with a full
          6-element challenge, this drawing prompt generator adapts to your skill
          level and time. Use the difficulty tabs above to control complexity,
          and save your favourite prompts for later.
        </p>
      </div>
    </div>
  );
}
