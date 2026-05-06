"use client";

import { QUALITY_CONFIG, type QualityTier } from "@/lib/qualityConfig";
import { useUser } from "@/context/UserContext";

interface GenerateButtonProps {
  quality: QualityTier;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

export default function GenerateButton({
  quality,
  disabled,
  loading,
  onClick,
}: GenerateButtonProps) {
  const { userData } = useUser();
  const config = QUALITY_CONFIG[quality];
  const balance = userData?.credits.balance || 0;

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading || balance < config.credits}
      style={{
        background: disabled || loading ? "#ccc" : "#2d2926",
        color: "#fff",
        border: "none",
        padding: "14px 28px",
        borderRadius: 10,
        fontSize: 15,
        fontWeight: 600,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "background 0.2s",
      }}
    >
      {loading ? (
        <>
          <span
            style={{
              display: "inline-block",
              width: 16,
              height: 16,
              border: "2px solid rgba(255,255,255,0.3)",
              borderTopColor: "#fff",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          Generating...
        </>
      ) : (
        <>
          ✨ Generate ({config.credits} credit{config.credits > 1 ? "s" : ""})
          <span style={{ opacity: 0.7, fontSize: 12 }}>
            Balance: {balance}
          </span>
        </>
      )}
    </button>
  );
}
