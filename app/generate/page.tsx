"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { QUALITY_CONFIG, type QualityTier } from "@/lib/qualityConfig";
import TurnstileWidget from "@/components/common/TurnstileWidget";

// ─── Types ───
interface GenerationRecord {
  generation_id: string;
  prompt_text: string;
  quality: string;
  credits_cost: number;
  image_url: string | null;
  status: string;
  created_at: string;
}

interface GenerateResult {
  image_url: string;
  credits_cost: number;
  credits_remaining: number;
  generation_id: string;
  model_used: string;
}

// ─── Recommended Prompts ───
const RECOMMENDED_PROMPTS = [
  {
    category: "Typography & Poster",
    prompt: "A vintage music festival poster with bold retro typography reading 'SUMMER SOUNDS 2026', sunset gradient background in orange and purple, silhouettes of people dancing, distressed texture overlay, letterpress style",
  },
  {
    category: "Product Photography",
    prompt: "A premium skincare bottle on a marble countertop, soft morning light from the left, water droplets on the surface, blurred botanical leaves in the background, editorial beauty photography style, 4K quality",
  },
  {
    category: "UI & Mockup",
    prompt: "A sleek mobile app interface for a meditation app, dark mode with soft purple gradients, showing a timer screen with the text '15:00 BREATHE', minimalist icons, glass-morphism card elements, device frame mockup",
  },
  {
    category: "Illustration",
    prompt: "A cozy Japanese ramen shop at night, warm lantern light glowing through the noren curtain, steam rising from bowls, watercolor illustration style with ink outlines, hand-drawn lettering on the shop sign",
  },
  {
    category: "Logo & Branding",
    prompt: "A modern minimalist logo for a coffee brand called 'RITUAL', geometric coffee cup icon formed by clean lines, earth-tone color palette, displayed on a kraft paper business card mockup with embossed effect",
  },
  {
    category: "Photorealistic",
    prompt: "An aerial photograph of a winding coastal road along dramatic cliffs, turquoise ocean waves crashing below, golden hour lighting, a vintage red convertible car on the road, cinematic landscape photography",
  },
  {
    category: "Social Media",
    prompt: "An Instagram story template for a bakery promotion: pastel pink background, a flatlay of fresh croissants and coffee, elegant script font reading 'Fresh Daily', scattered flour particles, soft shadows",
  },
  {
    category: "Architecture & Interior",
    prompt: "A Scandinavian-style living room with floor-to-ceiling windows overlooking a snowy forest, warm wood furniture, a lit fireplace, sheepskin throws, indoor plants, soft diffused natural light, interior design magazine photo",
  },
];

// ─── Main Page (wrapped in Suspense for useSearchParams) ───
export default function GeneratePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ color: "#8c7b6b" }}>Loading...</p></div>}>
      <GeneratePageContent />
    </Suspense>
  );
}

function GeneratePageContent() {
  const { data: session } = useSession();
  const { userData, refreshUserData } = useUser();

  // Read prompt from URL search params (e.g. ?prompt=xxx)
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt") || "";

  // Generation state
  const [prompt, setPrompt] = useState(initialPrompt);
  const [quality, setQuality] = useState<QualityTier>("fast");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResult | null>(null);

  // Image-to-image state
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [referenceFileName, setReferenceFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Turnstile state
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // History state
  const [history, setHistory] = useState<GenerationRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Progress simulation during generation
  useEffect(() => {
    if (!loading) {
      setProgress(0);
      return;
    }
    setProgress(5);
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p;
        // Fast at start, slow down later
        const increment = p < 30 ? 8 : p < 60 ? 4 : 1.5;
        return Math.min(90, p + increment);
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading]);

  // Load history
  const loadHistory = useCallback(async () => {
    if (!session) return;
    setHistoryLoading(true);
    try {
      const res = await fetch("/api/user/generations?limit=12");
      if (res.ok) {
        const data = await res.json();
        setHistory(data.generations || []);
      }
    } catch {} finally {
      setHistoryLoading(false);
    }
  }, [session]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Handle file upload for image-to-image
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      setError("Image must be under 20MB");
      return;
    }
    setReferenceFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setReferenceImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeReferenceImage = () => {
    setReferenceImage(null);
    setReferenceFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle generate
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt_text: prompt.trim(),
          quality,
          turnstile_token: turnstileToken,
          ...(referenceImage ? { reference_image: referenceImage } : {}),
        }),
      });

      // 先检查响应是否为 JSON
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await res.text();
        setError(`Server error (${res.status}): ${text.slice(0, 100)}`);
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        const detail = data.details ? ` (${data.details})` : "";
        setError((data.error || "Generation failed") + detail);
        return;
      }

      setProgress(100);
      setResult(data);
      await refreshUserData();
      // Refresh history after successful generation
      setTimeout(() => loadHistory(), 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  // Handle download
  const handleDownload = async (imageUrl: string, generationId: string) => {
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
    } catch {
      window.open(imageUrl, "_blank");
    }
  };

  // Load from history
  const loadFromHistory = (record: GenerationRecord) => {
    setPrompt(record.prompt_text);
    setQuality(record.quality as QualityTier);
    if (record.image_url && record.status === "success") {
      setResult({
        image_url: record.image_url,
        credits_cost: record.credits_cost,
        credits_remaining: userData?.credits.balance || 0,
        generation_id: record.generation_id,
        model_used: "gpt-image-2",
      });
    }
  };

  // ─── Not signed in ───
  if (!session) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "64px 24px 80px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 100, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c06a3e", background: "#fdf0e8", marginBottom: 16 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            Free to Try
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: "#2d2926", letterSpacing: "-0.02em" }}>
            AI Image Generator — GPT Image 2
          </h1>
          <p style={{ color: "#6b5e52", marginBottom: 28, lineHeight: 1.7, fontSize: 15, maxWidth: 560, margin: "0 auto 28px" }}>
            Create stunning images from text descriptions. Precise text rendering, photorealistic quality, and instant generation. Sign in with Google to get <strong>1 free credit</strong> — try your first image at no cost.
          </p>
          <a
            href="/api/auth/signin"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 32px",
              background: "#2d2926",
              color: "#fff",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 15,
              transition: "opacity 0.15s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign In with Google
          </a>
        </div>

        {/* Feature highlights */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
          {[
            { icon: "✨", title: "1 Free Credit on Sign-up", desc: "No credit card required. Your first image generation is on us." },
            { icon: "🎯", title: "Precise Text", desc: "GPT Image 2 renders accurate typography, perfect for posters & logos." },
            { icon: "🖼️", title: "Edit & Iterate", desc: "Upload a reference image and describe changes for seamless editing." },
            { icon: "⚡", title: "10s Generation", desc: "From prompt to image in about 10 seconds with Fast quality." },
          ].map((f) => (
            <div key={f.title} style={{ padding: "20px", borderRadius: 12, background: "#faf8f5", border: "1px solid #f0ece6" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#2d2926", marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: "#8c7b6b", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Pricing teaser */}
        <div style={{ background: "#faf8f5", borderRadius: 16, padding: "28px 32px", border: "1px solid #f0ece6", textAlign: "center" }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#2d2926", marginBottom: 8 }}>
            Need more? Upgrade anytime.
          </h3>
          <p style={{ fontSize: 13, color: "#8c7b6b", lineHeight: 1.6, marginBottom: 16, maxWidth: 480, margin: "0 auto 16px" }}>
            Starter ($5.90/mo) → 100 credits, Standard quality. Pro ($14.90/mo) → 300 credits, HD & Ultra quality.
          </p>
          <a
            href="/pricing"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
              color: "#c06a3e", border: "1px solid #f0c4a8", background: "#fdf0e8",
              textDecoration: "none",
            }}
          >
            View Plans & Pricing
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    );
  }

  // ─── Main Layout ───
  const config = QUALITY_CONFIG[quality];
  const balance = userData?.credits.balance || 0;
  const canGenerate = prompt.trim().length > 0 && !loading && balance >= config.credits;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 0" }}>
      {/* ─── Playground Header ─── */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#2d2926", marginBottom: 4 }}>
          Image Playground
        </h1>
        <p style={{ color: "#8c7b6b", fontSize: 13, margin: 0 }}>
          Text-to-image & image editing powered by GPT Image 2
        </p>
      </div>

      {/* ─── Two-Column Playground ─── */}
      <div className="dp-playground-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, minHeight: 520 }}>
        {/* ─── Left: Input Panel ─── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Prompt */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#2d2926", marginBottom: 6 }}>
              Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to create...&#10;&#10;e.g. A minimalist poster for a jazz concert, deep blue gradient background, golden saxophone silhouette, elegant serif typography"
              rows={6}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid #e0ddd8",
                fontSize: 13,
                lineHeight: 1.6,
                resize: "vertical",
                fontFamily: "inherit",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#c8a77a")}
              onBlur={(e) => (e.target.style.borderColor = "#e0ddd8")}
            />
          </div>

          {/* Reference Image Upload (Image-to-Image) */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#2d2926", marginBottom: 6 }}>
              Reference Image <span style={{ fontWeight: 400, color: "#8c7b6b" }}>(optional — for editing & style transfer)</span>
            </label>
            {referenceImage ? (
              <div style={{
                position: "relative",
                display: "inline-block",
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid #e0ddd8",
              }}>
                <img
                  src={referenceImage}
                  alt="Reference"
                  style={{ width: 120, height: 120, objectFit: "cover", display: "block" }}
                />
                <button
                  onClick={removeReferenceImage}
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    border: "none",
                    fontSize: 12,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ×
                </button>
                <div style={{ padding: "4px 8px", fontSize: 10, color: "#8c7b6b", background: "#faf8f5" }}>
                  {referenceFileName}
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: "10px 16px",
                  borderRadius: 10,
                  border: "1px dashed #d0cdc8",
                  background: "#faf8f5",
                  cursor: "pointer",
                  fontSize: 12,
                  color: "#8c7b6b",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                📎 Upload reference image (PNG/JPG, max 20MB)
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>

          {/* Quality & Settings Row */}
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#2d2926", marginBottom: 6 }}>
                Quality
              </label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value as QualityTier)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #e0ddd8",
                  fontSize: 13,
                  fontFamily: "inherit",
                  background: "#fff",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                {(Object.keys(QUALITY_CONFIG) as QualityTier[]).map((tier) => {
                  const c = QUALITY_CONFIG[tier];
                  const allowed = (userData?.membership.allowed_qualities || ["fast"]).includes(tier);
                  return (
                    <option key={tier} value={tier} disabled={!allowed}>
                      {c.label} — {c.credits} credit{c.credits > 1 ? "s" : ""}{!allowed ? ` (${c.minMembership}+)` : ""}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={{ fontSize: 11, color: "#8c7b6b", paddingBottom: 10, whiteSpace: "nowrap" }}>
              Balance: <strong style={{ color: "#2d2926" }}>{balance}</strong>
            </div>
          </div>

          {/* Turnstile Verification */}
          <TurnstileWidget
            onVerify={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken(null)}
          />

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || !turnstileToken}
            style={{
              width: "100%",
              padding: "13px 24px",
              borderRadius: 10,
              border: "none",
              background: canGenerate ? "#2d2926" : "#d0cdc8",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: canGenerate ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "background 0.2s",
            }}
          >
            {loading ? (
              <>
                <span style={{
                  display: "inline-block",
                  width: 14,
                  height: 14,
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }} />
                Generating...
              </>
            ) : (
              <>Generate · {config.credits} credit{config.credits > 1 ? "s" : ""}</>
            )}
          </button>

          {/* Error */}
          {error && (
            <div style={{
              padding: "10px 14px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: 8,
              color: "#dc2626",
              fontSize: 12,
            }}>
              {error}
            </div>
          )}

          {/* Low balance / upgrade nudge */}
          {balance < config.credits && !loading && (
            <div style={{
              padding: "14px 16px",
              background: "#fffbf5",
              border: "1px solid #f0dcc0",
              borderRadius: 10,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ fontSize: 20, flexShrink: 0 }}>💎</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#2d2926", marginBottom: 2 }}>
                  Not enough credits
                </div>
                <div style={{ fontSize: 12, color: "#8c7b6b", lineHeight: 1.5 }}>
                  You need {config.credits} credit{config.credits > 1 ? "s" : ""} for {config.label} quality. Current balance: {balance}.
                </div>
              </div>
              <a
                href="/pricing"
                style={{
                  padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                  color: "#fff", background: "#c06a3e", textDecoration: "none", whiteSpace: "nowrap",
                }}
              >
                Upgrade
              </a>
            </div>
          )}

          {/* Low balance warning (has some but running low) */}
          {balance >= config.credits && balance <= 5 && !loading && (
            <div style={{
              padding: "10px 14px",
              background: "#faf8f5",
              border: "1px solid #e8e5e0",
              borderRadius: 8,
              fontSize: 12,
              color: "#8c7b6b",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span>⚠️</span>
              <span>Running low on credits ({balance} remaining). <a href="/pricing" style={{ color: "#c06a3e", fontWeight: 600, textDecoration: "none" }}>Get more →</a></span>
            </div>
          )}
        </div>

        {/* ─── Right: Preview Panel ─── */}
        <div style={{
          background: "#f8f7f5",
          borderRadius: 16,
          border: "1px solid #e8e5e0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          position: "relative",
          overflow: "hidden",
          minHeight: 420,
        }}>
          {/* Progress Bar */}
          {loading && (
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: "#e8e5e0",
            }}>
              <div style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #c8a77a, #a88a5a)",
                transition: "width 0.5s ease-out",
                borderRadius: 2,
              }} />
            </div>
          )}

          {loading && (
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 48,
                height: 48,
                border: "3px solid #e0ddd8",
                borderTopColor: "#c8a77a",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px",
              }} />
              <p style={{ fontSize: 14, color: "#2d2926", fontWeight: 500, margin: "0 0 4px" }}>
                Generating your image...
              </p>
              <p style={{ fontSize: 12, color: "#8c7b6b", margin: 0 }}>
                ~{quality === "fast" ? "10" : quality === "standard" ? "15" : "20"}s estimated · {Math.round(progress)}%
              </p>
            </div>
          )}

          {!loading && !result && (
            <div style={{ textAlign: "center", color: "#a89a8c" }}>
              <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.5 }}>🖼️</div>
              <p style={{ fontSize: 13, margin: 0 }}>Your generated image will appear here</p>
            </div>
          )}

          {!loading && result && (
            <div style={{ width: "100%", textAlign: "center" }}>
              <img
                src={result.image_url}
                alt="Generated image"
                style={{
                  maxWidth: "100%",
                  maxHeight: 400,
                  borderRadius: 10,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
                }}
              />
              <div style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: "center", alignItems: "center" }}>
                <button
                  onClick={() => handleDownload(result.image_url, result.generation_id)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 8,
                    border: "none",
                    background: "#2d2926",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  ⬇ Download
                </button>
                <button
                  onClick={() => {
                    setReferenceImage(result.image_url);
                    setReferenceFileName("Previous generation");
                  }}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 8,
                    border: "1px solid #e0ddd8",
                    background: "#fff",
                    color: "#2d2926",
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  🔄 Edit this image
                </button>
                <span style={{ fontSize: 11, color: "#8c7b6b" }}>
                  {result.credits_cost} credit{result.credits_cost > 1 ? "s" : ""} used
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── History Panel ─── */}
      <div style={{ marginTop: 40 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#2d2926", margin: 0 }}>
            Recent Generations
          </h2>
          <button
            onClick={loadHistory}
            disabled={historyLoading}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid #e0ddd8",
              background: "#fff",
              fontSize: 11,
              color: "#8c7b6b",
              cursor: "pointer",
            }}
          >
            {historyLoading ? "Loading..." : "↻ Refresh"}
          </button>
        </div>

        {history.length === 0 && !historyLoading && (
          <p style={{ color: "#a89a8c", fontSize: 13 }}>
            No generations yet. Create your first image above!
          </p>
        )}

        {history.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 12,
          }}>
            {history
              .filter((h) => h.status === "success" && h.image_url)
              .map((record) => (
                <div
                  key={record.generation_id}
                  onClick={() => loadFromHistory(record)}
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    border: "1px solid #e8e5e0",
                    cursor: "pointer",
                    transition: "transform 0.15s, box-shadow 0.15s",
                    background: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <img
                    src={record.image_url!}
                    alt={record.prompt_text.slice(0, 40)}
                    style={{ width: "100%", height: 120, objectFit: "cover" }}
                    loading="lazy"
                  />
                  <div style={{ padding: "8px 10px" }}>
                    <p style={{
                      fontSize: 11,
                      color: "#2d2926",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {record.prompt_text.slice(0, 50)}
                    </p>
                    <p style={{ fontSize: 10, color: "#a89a8c", margin: "3px 0 0" }}>
                      {new Date(record.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* ─── SEO Content Section ─── */}
      <div style={{ marginTop: 64, paddingTop: 48, borderTop: "1px solid #f0ece6" }}>
        {/* Features */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#2d2926", marginBottom: 24 }}>
          Why Use DrawPrompts Image Generator?
        </h2>
        <div className="dp-features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 48 }}>
          <div style={{ padding: "20px", background: "#faf8f5", borderRadius: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#2d2926", marginBottom: 8 }}>
              Precise Text Rendering
            </h3>
            <p style={{ fontSize: 13, color: "#6b5e52", lineHeight: 1.6, margin: 0 }}>
              GPT Image 2 excels at generating images with accurate text, logos, and typography — perfect for posters, social media graphics, and marketing materials.
            </p>
          </div>
          <div style={{ padding: "20px", background: "#faf8f5", borderRadius: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#2d2926", marginBottom: 8 }}>
              Edit &amp; Iterate
            </h3>
            <p style={{ fontSize: 13, color: "#6b5e52", lineHeight: 1.6, margin: 0 }}>
              Upload a reference image and describe your changes. GPT Image 2 understands context and can modify style, add elements, or transform compositions while preserving intent.
            </p>
          </div>
          <div style={{ padding: "20px", background: "#faf8f5", borderRadius: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#2d2926", marginBottom: 8 }}>
              Multiple Quality Tiers
            </h3>
            <p style={{ fontSize: 13, color: "#6b5e52", lineHeight: 1.6, margin: 0 }}>
              Choose from Fast (quick exploration), Standard (detailed output), HD (poster-quality), or Ultra (commercial-grade wide format) to match your needs and budget.
            </p>
          </div>
        </div>

        {/* How it works */}
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#2d2926", marginBottom: 16 }}>
          How It Works
        </h2>
        <div style={{ fontSize: 13, color: "#6b5e52", lineHeight: 1.8, marginBottom: 48, maxWidth: 720 }}>
          <p style={{ marginBottom: 12 }}>
            DrawPrompts connects directly to OpenAI&apos;s GPT Image 2 model through a secure API. Simply type a description of your desired image — the more detailed, the better the result. You can specify art style, color palette, composition, text content, and more.
          </p>
          <p style={{ marginBottom: 12 }}>
            For image editing, upload an existing image as a reference. Then describe what you want to change: &ldquo;make the background a sunset&rdquo;, &ldquo;add a company logo in the top-left&rdquo;, or &ldquo;convert to watercolor style&rdquo;. The model understands spatial relationships and maintains visual coherence.
          </p>
          <p style={{ margin: 0 }}>
            All generated images are saved to your history, so you can revisit, download, or use them as reference for further iterations. Credits are only consumed on successful generations — if something goes wrong, you&apos;re automatically refunded.
          </p>
        </div>

        {/* Recommended Prompts */}
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#2d2926", marginBottom: 8 }}>
          Prompt Inspiration
        </h2>
        <p style={{ fontSize: 13, color: "#8c7b6b", marginBottom: 20, lineHeight: 1.6 }}>
          Click any prompt below to try it instantly. These examples showcase GPT Image 2&apos;s strengths in text rendering, photorealism, and creative styles.
        </p>
        <div className="dp-prompts-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 48 }}>
          {RECOMMENDED_PROMPTS.map((item, i) => (
            <button
              key={i}
              onClick={() => { setPrompt(item.prompt); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              style={{
                textAlign: "left",
                padding: "14px 16px",
                borderRadius: 10,
                border: "1px solid #e8e5e0",
                background: "#faf8f5",
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c8a77a"; e.currentTarget.style.background = "#fff8f0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e5e0"; e.currentTarget.style.background = "#faf8f5"; }}
            >
              <span style={{ fontSize: 11, fontWeight: 600, color: "#c8a77a", textTransform: "uppercase", letterSpacing: 0.5 }}>
                {item.category}
              </span>
              <p style={{ fontSize: 13, color: "#2d2926", margin: "6px 0 0", lineHeight: 1.5 }}>
                {item.prompt.length > 120 ? item.prompt.slice(0, 120) + "…" : item.prompt}
              </p>
            </button>
          ))}
        </div>

        {/* FAQ */}
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#2d2926", marginBottom: 16 }}>
          Frequently Asked Questions
        </h2>
        <div style={{ marginBottom: 64 }}>
          <FAQItem
            question="What is GPT Image 2?"
            answer="GPT Image 2 is OpenAI's second-generation image model released in April 2026. It offers dramatic improvements over previous models in text rendering, photorealism, instruction following, and compositional understanding. It can generate images with perfectly readable text, realistic UI mockups, and commercial-quality artwork."
          />
          <FAQItem
            question="What image sizes and formats are supported?"
            answer="Generated images are in PNG format. Fast, Standard, and HD quality tiers produce 1024×1024 images. Ultra quality generates at 1536×1024 (wide format). All images are suitable for both web and print use."
          />
          <FAQItem
            question="Can I edit an existing image?"
            answer="Yes! Upload a reference image and describe what changes you want. GPT Image 2 can modify colors, add text, change backgrounds, apply style transfers, and much more while understanding the context of your original image."
          />
          <FAQItem
            question="How are credits consumed?"
            answer="Credits are deducted when you click Generate. Fast costs 1 credit, Standard costs 3, HD costs 8, and Ultra costs 12. If generation fails for any reason, credits are automatically refunded to your account."
          />
          <FAQItem
            question="Are generated images saved?"
            answer="Yes, all successful generations are automatically saved to your history. You can revisit them anytime, download in full quality, or use them as a starting point for further edits."
          />
        </div>
      </div>

      {/* Animations & Responsive */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .dp-playground-grid { grid-template-columns: 1fr !important; }
          .dp-features-grid { grid-template-columns: 1fr !important; }
          .dp-prompts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─── FAQ Component ───
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: "1px solid #f0ece6",
      padding: "14px 0",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 500, color: "#2d2926" }}>{question}</span>
        <span style={{ fontSize: 18, color: "#8c7b6b", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && (
        <p style={{ fontSize: 13, color: "#6b5e52", lineHeight: 1.7, marginTop: 10, marginBottom: 0, paddingRight: 24 }}>
          {answer}
        </p>
      )}
    </div>
  );
}
