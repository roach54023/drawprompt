"use client";

import { QUALITY_CONFIG, type QualityTier } from "@/lib/qualityConfig";
import { useUser } from "@/context/UserContext";

interface QualitySelectorProps {
  selected: QualityTier;
  onSelect: (quality: QualityTier) => void;
  recommendedQuality?: QualityTier;
}

export default function QualitySelector({
  selected,
  onSelect,
  recommendedQuality,
}: QualitySelectorProps) {
  const { userData } = useUser();
  const allowedQualities = userData?.membership.allowed_qualities || ["fast"];

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {(Object.keys(QUALITY_CONFIG) as QualityTier[]).map((tier) => {
        const config = QUALITY_CONFIG[tier];
        const isAllowed = allowedQualities.includes(tier);
        const isSelected = selected === tier;
        const isRecommended = recommendedQuality === tier;

        return (
          <button
            key={tier}
            onClick={() => isAllowed && onSelect(tier)}
            disabled={!isAllowed}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: isSelected
                ? "2px solid #c8a77a"
                : "1px solid #e0ddd8",
              background: isSelected ? "#faf6f0" : "#fff",
              cursor: isAllowed ? "pointer" : "not-allowed",
              opacity: isAllowed ? 1 : 0.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 4,
              minWidth: 120,
              position: "relative",
            }}
          >
            {isRecommended && (
              <span
                style={{
                  position: "absolute",
                  top: -8,
                  right: 8,
                  background: "#5a8a5e",
                  color: "#fff",
                  fontSize: 9,
                  padding: "2px 6px",
                  borderRadius: 6,
                  fontWeight: 600,
                }}
              >
                Recommended
              </span>
            )}
            <span style={{ fontSize: 14, fontWeight: 600, color: "#2d2926" }}>
              {config.label}
            </span>
            <span style={{ fontSize: 11, color: "#8c7b6b" }}>
              {config.credits} credit{config.credits > 1 ? "s" : ""}
            </span>
            <span style={{ fontSize: 10, color: "#a89a8c" }}>
              {config.description}
            </span>
            {!isAllowed && (
              <span style={{ fontSize: 10, color: "#d44" }}>
                Requires {config.minMembership}+
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
