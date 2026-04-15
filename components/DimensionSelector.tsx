"use client";

import { dimensions, dimensionKeys, type SelectionState, type DimensionKey } from "@/lib/promptData";

// Subtle accent dot per dimension — no colored backgrounds
const DIM_ACCENT: Record<DimensionKey, string> = {
  theme:        "#7b9eb8",
  subject:      "#5a9e7a",
  mood:         "#8b7ab8",
  colorPalette: "#c4714a",
  style:        "#c47ab8",
  challenge:    "#b8924a",
};

interface Props {
  selections: SelectionState;
  activeKeys?: (keyof SelectionState)[];
  readOnly?: boolean;
  onSelect?: (key: DimensionKey, optionId: string) => void;
  lockedKeys?: Set<DimensionKey>;
  onToggleLock?: (key: DimensionKey) => void;
}

export default function DimensionSelector({
  selections,
  activeKeys,
  readOnly = false,
  onSelect,
  lockedKeys,
  onToggleLock,
}: Props) {
  const keysToShow = (activeKeys ?? dimensionKeys) as DimensionKey[];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
      {keysToShow.map((key) => {
        const dim = dimensions[key];
        const selectedId = selections[key];
        const selectedOption = dim.options.find((o) => o.id === selectedId);
        const accent = DIM_ACCENT[key];
        const isLocked = lockedKeys?.has(key);

        return (
          <div
            key={key}
            style={{
              background: "#ffffff",
              border: "1px solid #e8e0d0",
              borderRadius: 12,
              padding: "11px 14px",
              transition: "border-color 0.15s",
            }}
          >
            {/* Label row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {/* Small color dot instead of colored bg */}
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: accent, flexShrink: 0, display: "inline-block",
                }} />
                <span style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.06em",
                  textTransform: "uppercase", color: "#a8967e",
                }}>
                  {dim.label}
                </span>
              </div>

              {!readOnly && onToggleLock && (
                <button
                  onClick={() => onToggleLock(key)}
                  title={isLocked ? "Locked" : "Click to lock"}
                  style={{
                    background: "none", border: "none", cursor: "pointer", padding: 2,
                    color: isLocked ? accent : "#c4b49a",
                    transition: "color 0.15s",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                    {isLocked ? (
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    ) : (
                      <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"/>
                    )}
                  </svg>
                </button>
              )}
            </div>

            {/* Value — no emoji, just clean text */}
            {selectedOption ? (
              <span style={{ fontSize: 13, fontWeight: 500, color: "#2c2416", lineHeight: 1.3, display: "block" }}>
                {selectedOption.label}
              </span>
            ) : (
              <span style={{ fontSize: 12, color: "#c4b49a", fontStyle: "italic" }}>Random</span>
            )}

            {/* Option picker (non-readonly) */}
            {!readOnly && onSelect && (
              <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 4 }}>
                <button
                  onClick={() => onSelect(key, "")}
                  style={{
                    padding: "3px 8px", borderRadius: 6, fontSize: 11,
                    border: `1px solid ${!selectedId ? accent : "#e8e0d0"}`,
                    background: !selectedId ? `${accent}12` : "transparent",
                    color: !selectedId ? accent : "#a8967e",
                    cursor: "pointer", transition: "all 0.12s", fontWeight: 500,
                  }}
                >
                  Random
                </button>
                {dim.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onSelect(key, opt.id)}
                    title={opt.description}
                    style={{
                      padding: "3px 8px", borderRadius: 6, fontSize: 11,
                      border: `1px solid ${selectedId === opt.id ? accent : "#e8e0d0"}`,
                      background: selectedId === opt.id ? `${accent}12` : "transparent",
                      color: selectedId === opt.id ? accent : "#a8967e",
                      cursor: "pointer", transition: "all 0.12s", fontWeight: 500,
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
