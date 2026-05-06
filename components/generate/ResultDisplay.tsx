"use client";

interface ResultDisplayProps {
  imageUrl: string;
  creditsCost: number;
  creditsRemaining: number;
  generationId: string;
}

export default function ResultDisplay({
  imageUrl,
  creditsCost,
  creditsRemaining,
  generationId,
}: ResultDisplayProps) {
  const handleDownload = async () => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `drawprompt-${generationId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      // Fallback: open in new tab
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        border: "1px solid #e0ddd8",
        textAlign: "center",
      }}
    >
      <img
        src={imageUrl}
        alt="Generated image"
        style={{
          maxWidth: "100%",
          maxHeight: 512,
          borderRadius: 12,
          marginBottom: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={handleDownload}
          style={{
            background: "#2d2926",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          ⬇️ Download
        </button>

        <span style={{ fontSize: 12, color: "#8c7b6b" }}>
          Used {creditsCost} credit{creditsCost > 1 ? "s" : ""} · {creditsRemaining} remaining
        </span>
      </div>
    </div>
  );
}
