"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ─── Template Data ───────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: "younger-self-studio",
    slug: "meet-your-younger-self-studio-portrait",
    title: "Studio Portrait",
    tag: "Most Popular",
    description:
      "A warm, softly lit portrait of your adult self and childhood self side by side — crouching at eye level, holding hands, sharing matching smiles.",
    imageUrl: "/prompts/meet-your-younger-self-studio-portrait.jpg",
    needsPhoto: true,
    featured: true,
    prompt: `Create a heartfelt portrait showing two versions of the same person side by side: their current adult self and their younger childhood self (around age 5-10), as if they have traveled through time to meet.\n\nUse the uploaded photos: [CURRENT PHOTO] and [CHILDHOOD PHOTO].\n\nSetting: A warm, softly lit photography studio or living room environment.\nComposition: The adult is crouching or sitting at eye level with the child version of themselves. They might be gently holding the child's hand, both looking at the camera with matching smiles, the adult's arm around the child's shoulder, or sharing a moment together.\n\nKey requirements:\n- Both faces must maintain perfect likeness to their respective reference photos\n- Clothing should feel era-appropriate (child in vintage style matching their childhood decade)\n- Warm, golden-hour style lighting (soft, nostalgic)\n- Shallow depth of field with soft bokeh background\n- Natural, candid emotional connection between the two figures\n\nMood: Tender, nostalgic, bittersweet warmth. A letter to your younger self come to life.\nStyle: Photorealistic portrait photography, NOT illustration or painting.`,
  },
  {
    id: "younger-self-walking",
    slug: "younger-self-walking-together-street",
    title: "Walking Together",
    tag: "Cinematic",
    description:
      "An adult and their childhood self walking hand-in-hand down a sunlit street, as if a time portal brought them together.",
    imageUrl: "/prompts/younger-self-walking-together-street.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Generate a photorealistic image of an adult and their childhood self walking together down a street, holding hands, as if a time portal brought them together.\n\nAdult: [CURRENT PHOTO REFERENCE]\nChild: [CHILDHOOD PHOTO REFERENCE, approximately age 5-8]\n\nScene:\n- Walking together on [SETTING: a sunlit neighborhood sidewalk / a park path with autumn leaves / a city street at golden hour / a seaside boardwalk]\n- Holding hands naturally while walking in the same direction\n- Shot from behind or from a 3/4 angle walking toward camera\n- The adult looks down at the child with warmth; the child looks up with trust and wonder\n\nTechnical:\n- Natural daylight, golden hour timing (long warm shadows)\n- Shallow depth of field, subjects sharp, background gently blurred\n- Film-like color grading: slightly warm highlights, soft lifted shadows (Kodak Portra 400 feel)\n- Full body shot showing both walking in stride\n\nBoth must be recognizably the same person at different ages. Era-appropriate clothing for the child (vintage style matching their childhood decade).\n\nMood: Hopeful, peaceful, protective. The adult guiding their younger self forward.`,
  },
  {
    id: "younger-self-hug",
    slug: "younger-self-hug-emotional",
    title: "Emotional Hug",
    tag: "Emotional",
    description:
      "An adult kneeling to embrace their childhood self in a tight, warm hug — eyes closed, peaceful, the embodiment of self-compassion.",
    imageUrl: "/prompts/younger-self-hug-emotional.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create an emotionally powerful photograph of an adult embracing their childhood self in a tight, warm hug.\n\nReferences: [CURRENT PHOTO] and [CHILDHOOD PHOTO, age 5-8].\n\nThe scene:\n- The adult is kneeling on the ground, wrapping both arms around the small child version of themselves\n- The child hugs back, small arms around the adult's neck or waist\n- Both have their eyes closed with peaceful, emotional expressions\n- The embrace should feel genuine and protective\n\nSetting: [Choose one]\n- A quiet, empty room with soft window light streaming in\n- An open field at sunset with warm backlight creating a halo effect\n- Their childhood bedroom recreated in soft focus behind them\n\nTechnical requirements:\n- Perfect likeness match for both faces\n- Clothing: adult in [current style], child in era-appropriate [decade] clothing\n- Soft, diffused lighting (window light or golden backlight)\n- Tight framing focused on the embrace\n- Shallow depth of field, background heavily blurred\n- Slight film grain for emotional texture\n\nMood: Healing, self-compassion, unconditional love. The image should evoke the feeling of telling your younger self: everything is going to be okay.`,
  },
  {
    id: "younger-self-split",
    slug: "younger-self-same-pose-comparison",
    title: "Then & Now Split",
    tag: "Creative",
    description:
      "A side-by-side split-screen showing the same person recreating an iconic childhood photo as an adult — vintage left, modern right.",
    imageUrl: "/prompts/younger-self-same-pose-comparison.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create a side-by-side or split-screen image showing the same person recreating an iconic childhood photo as an adult.\n\nLeft half (THEN): Recreation of [CHILDHOOD PHOTO] — the child version in the original setting and pose.\nRight half (NOW): The adult version in the exact same pose, same framing, same angle, but [current age].\n\nRequirements:\n- Identical pose, angle, and framing in both halves\n- Left side should feel authentically vintage (matching the original photo era):\n  - Slightly faded colors, film grain, lower resolution feel\n  - Era-appropriate clothing, hairstyle, and setting\n- Right side should feel modern and crisp:\n  - Clean digital camera quality\n  - Current clothing style but intentionally mimicking the original outfit's vibe\n  - Same location or setting recreated\n- A clean vertical dividing line or subtle gradient blend between the two halves\n- Both faces must match their respective reference photos perfectly\n\nStyle: photorealistic photography. The contrast between vintage and modern should be immediately striking. Add subtle text overlay: "Then" on left, "Now" on right (small, elegant font at bottom).`,
  },
  {
    id: "younger-self-letter",
    slug: "younger-self-advice-letter-scene",
    title: "Letter Reading Scene",
    tag: "Storytelling",
    description:
      "An adult sitting next to their childhood self, reading a handwritten letter together — wisdom passed across time.",
    imageUrl: "/prompts/younger-self-advice-letter-scene.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create a touching scene where an adult is sitting next to their childhood self, reading a handwritten letter together.\n\nReferences: [CURRENT PHOTO] and [CHILDHOOD PHOTO, age 6-10].\n\nScene composition:\n- Both sitting on [SETTING: a park bench / bedroom floor / library steps / window seat]\n- The adult holds a handwritten letter/note, angled so the child can see it too\n- The child looks at the letter with curiosity and wonder\n- The adult has a gentle, knowing smile\n- Warm soft lighting (afternoon sun through a window or dappled tree shade)\n\nVisible on the letter (partial handwriting, slightly blurred but readable):\n"Dear little [NAME], I want you to know that everything works out. You are braver than you think..."\n\nTechnical:\n- Photorealistic style\n- Warm color palette (golden tones, soft shadows)\n- Medium shot showing both figures and their interaction\n- Shallow depth of field on background\n- Natural, candid posing (not stiff or posed)\n\nMood: Wisdom, gentleness, and time-spanning connection. The visual embodiment of self-compassion.`,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function YoungerSelfPromptClient() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TEMPLATES[0] | null>(null);
  const [prompt, setPrompt] = useState("");
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [referenceFileName, setReferenceFileName] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleSelectTemplate = (template: typeof TEMPLATES[0]) => {
    setSelectedTemplate(template);
    setPrompt(template.prompt);
    setTimeout(() => {
      editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      alert("Image must be under 20 MB");
      return;
    }
    setReferenceFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setReferenceImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setReferenceImage(null);
    setReferenceFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    if (referenceImage) {
      try { sessionStorage.setItem("pending_reference_image", referenceImage); } catch {}
      try { sessionStorage.setItem("pending_reference_filename", referenceFileName); } catch {}
    } else {
      sessionStorage.removeItem("pending_reference_image");
      sessionStorage.removeItem("pending_reference_filename");
    }
    router.push(`/generate?prompt=${encodeURIComponent(prompt.trim())}`);
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/younger-self-prompt?ref=share`
      : "https://drawprompt.org/younger-self-prompt?ref=share";

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(
      "I created an emotional photo of me meeting my younger self with this — try it:"
    );
    const url = encodeURIComponent(shareUrl);
    const links: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };
    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
      return;
    }
    window.open(links[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <div className="ys-page">
      <style jsx global>{`
        .ys-page {
          --ys-fg: #0f172a;
          --ys-fg-2: #475569;
          --ys-fg-3: #94a3b8;
          --ys-bg: #f8fafc;
          --ys-surface: #ffffff;
          --ys-border: #e2e8f0;
          --ys-accent: #b45309;
          --ys-accent-light: #fef3c7;
          --ys-accent-hover: #92400e;
          --ys-rose: #e11d48;
          --radius: 16px;
          background: var(--ys-bg);
          min-height: 100vh;
          color: var(--ys-fg);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .ys-section-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--ys-accent);
          margin: 0 0 8px;
        }
        .ys-section-title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          margin: 0 0 6px;
          color: var(--ys-fg);
        }
        .ys-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 24px 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .ys-hero-text { max-width: 520px; }
        .ys-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          background: var(--ys-accent-light);
          color: var(--ys-accent);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          margin-bottom: 20px;
        }
        .ys-hero h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin: 0 0 20px;
        }
        .ys-hero h1 .ys-gradient {
          background: linear-gradient(135deg, var(--ys-accent), var(--ys-rose));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ys-hero-desc {
          font-size: 1.05rem;
          color: var(--ys-fg-2);
          line-height: 1.7;
          margin: 0 0 32px;
        }
        .ys-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: var(--ys-accent);
          color: #fff;
          border: none;
          border-radius: 100px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .ys-hero-cta:hover { background: var(--ys-accent-hover); transform: translateY(-1px); }
        .ys-hero-image-wrap {
          position: relative;
          border-radius: var(--radius);
          overflow: hidden;
          aspect-ratio: 4/3;
          cursor: pointer;
          box-shadow: 0 24px 80px rgba(180,83,9,0.15), 0 8px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s;
        }
        .ys-hero-image-wrap:hover { transform: scale(1.01); }
        .ys-hero-img-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 2;
          padding: 6px 14px;
          border-radius: 100px;
          background: rgba(180,83,9,0.9);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          backdrop-filter: blur(8px);
        }
        .ys-strip {
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 0 0;
        }
        .ys-strip-header {
          padding: 0 24px;
          margin-bottom: 24px;
        }
        .ys-strip-scroll {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding: 0 24px 12px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .ys-strip-scroll::-webkit-scrollbar { display: none; }
        .ys-strip-card {
          flex: 0 0 260px;
          scroll-snap-align: start;
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--ys-surface);
          border: 2px solid transparent;
          cursor: pointer;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .ys-strip-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        .ys-strip-card.active {
          border-color: var(--ys-accent);
          box-shadow: 0 0 0 1px var(--ys-accent), 0 20px 60px rgba(180,83,9,0.15);
        }
        .ys-strip-card-image {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
        }
        .ys-strip-card-tag {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 2;
          padding: 4px 10px;
          border-radius: 100px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(6px);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--ys-accent);
          letter-spacing: 0.04em;
        }
        .ys-strip-card-body {
          padding: 16px;
        }
        .ys-strip-card-body h3 {
          font-size: 0.9rem;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .ys-strip-card-body p {
          font-size: 0.78rem;
          color: var(--ys-fg-3);
          margin: 0 0 12px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ys-strip-use {
          display: block;
          width: 100%;
          padding: 9px;
          border: 1px solid var(--ys-border);
          border-radius: 10px;
          background: var(--ys-surface);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--ys-fg-2);
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ys-strip-use:hover { border-color: var(--ys-accent); color: var(--ys-accent); }
        .ys-strip-card.active .ys-strip-use {
          background: var(--ys-accent);
          border-color: var(--ys-accent);
          color: #fff;
        }
        .ys-editor-section {
          max-width: 720px;
          margin: 0 auto;
          padding: 72px 24px 0;
        }
        .ys-editor-card {
          background: var(--ys-surface);
          border: 1px solid var(--ys-border);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .ys-editor-card textarea {
          width: 100%;
          min-height: 160px;
          padding: 20px;
          border: none;
          background: transparent;
          font-size: 0.88rem;
          line-height: 1.7;
          color: var(--ys-fg);
          resize: vertical;
          font-family: inherit;
          outline: none;
        }
        .ys-editor-card textarea::placeholder { color: var(--ys-fg-3); }
        .ys-editor-toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border-top: 1px solid var(--ys-border);
          background: #fafbfc;
        }
        .ys-upload-trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px dashed var(--ys-border);
          border-radius: 8px;
          background: transparent;
          font-size: 0.8rem;
          color: var(--ys-fg-2);
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .ys-upload-trigger:hover { border-color: var(--ys-accent); color: var(--ys-accent); }
        .ys-upload-trigger.has-file {
          border-style: solid;
          border-color: #86efac;
          background: #f0fdf4;
          color: #166534;
        }
        .ys-upload-trigger .preview-thumb {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          object-fit: cover;
        }
        .ys-upload-remove {
          background: none;
          border: none;
          font-size: 0.75rem;
          color: var(--ys-fg-3);
          cursor: pointer;
          text-decoration: underline;
          margin-left: 4px;
        }
        .ys-toolbar-spacer { flex: 1; }
        .ys-btn-copy {
          padding: 10px 16px;
          background: transparent;
          color: var(--ys-fg-2);
          border: 1px solid var(--ys-border);
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .ys-btn-copy:hover { border-color: var(--ys-accent); color: var(--ys-accent); }
        .ys-btn-generate {
          padding: 10px 28px;
          background: var(--ys-accent);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .ys-btn-generate:hover { background: var(--ys-accent-hover); }
        .ys-btn-generate:disabled { opacity: 0.4; cursor: not-allowed; }
        .ys-editor-hint {
          margin-top: 14px;
          font-size: 0.78rem;
          color: var(--ys-fg-3);
          line-height: 1.6;
        }
        .ys-editor-hint a { color: var(--ys-accent); text-decoration: none; }
        .ys-editor-hint a:hover { text-decoration: underline; }
        .ys-share-section {
          max-width: 720px;
          margin: 0 auto;
          padding: 56px 24px 0;
        }
        .ys-share-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          padding: 24px;
          background: var(--ys-surface);
          border: 1px solid var(--ys-border);
          border-radius: var(--radius);
        }
        .ys-share-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--ys-fg);
          margin-right: 8px;
        }
        .ys-share-btn {
          padding: 8px 16px;
          border: 1px solid var(--ys-border);
          border-radius: 100px;
          background: var(--ys-surface);
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--ys-fg-2);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .ys-share-btn:hover { border-color: var(--ys-accent); color: var(--ys-accent); }
        .ys-more {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 24px 0;
        }
        .ys-more-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 24px;
        }
        .ys-more-card {
          display: block;
          background: var(--ys-surface);
          border: 1px solid var(--ys-border);
          border-radius: var(--radius);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .ys-more-card:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .ys-more-card-image {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
        }
        .ys-more-card-body {
          padding: 14px 16px;
        }
        .ys-more-card-body h3 {
          font-size: 0.82rem;
          font-weight: 700;
          margin: 0 0 4px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ys-more-card-body p {
          font-size: 0.72rem;
          color: var(--ys-fg-3);
          margin: 0;
          line-height: 1.4;
        }
        .ys-more-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
          padding: 12px 28px;
          border: 1px solid var(--ys-border);
          border-radius: 100px;
          background: var(--ys-surface);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--ys-fg);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .ys-more-cta:hover { border-color: var(--ys-accent); color: var(--ys-accent); transform: translateY(-1px); }
        .ys-seo-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 72px 24px 0;
        }
        .ys-seo-content h2 {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0 0 16px;
          color: var(--ys-fg);
        }
        .ys-seo-content p {
          font-size: 0.92rem;
          color: var(--ys-fg-2);
          line-height: 1.8;
          margin: 0 0 16px;
        }
        .ys-seo-content a {
          color: var(--ys-accent);
          text-decoration: none;
        }
        .ys-seo-content a:hover { text-decoration: underline; }
        .ys-faq {
          max-width: 720px;
          margin: 0 auto;
          padding: 80px 24px 56px;
        }
        .ys-faq-item {
          border-bottom: 1px solid var(--ys-border);
          padding: 24px 0;
        }
        .ys-faq-item:first-of-type { border-top: 1px solid var(--ys-border); }
        .ys-faq-item h3 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0 0 10px;
          color: var(--ys-fg);
        }
        .ys-faq-item p {
          font-size: 0.88rem;
          color: var(--ys-fg-2);
          line-height: 1.7;
          margin: 0;
        }
        .ys-footer {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 24px 56px;
          font-size: 0.78rem;
          color: var(--ys-fg-3);
          line-height: 1.7;
        }
        .ys-footer a { color: var(--ys-accent); text-decoration: none; }
        .ys-footer a:hover { text-decoration: underline; }
        @media (max-width: 768px) {
          .ys-hero {
            grid-template-columns: 1fr;
            padding: 48px 20px 0;
            gap: 32px;
          }
          .ys-hero-text { max-width: 100%; }
          .ys-hero h1 { font-size: 1.8rem; }
          .ys-hero-image-wrap { aspect-ratio: 4/3; }
          .ys-strip { padding: 48px 0 0; }
          .ys-strip-card { flex: 0 0 240px; }
          .ys-editor-section { padding: 48px 20px 0; }
          .ys-editor-toolbar { flex-wrap: wrap; }
          .ys-btn-generate { width: 100%; text-align: center; }
          .ys-more-grid { grid-template-columns: 1fr 1fr; }
          .ys-seo-content { padding: 48px 20px 0; }
          .ys-share-row { justify-content: center; }
        }
      `}</style>

      {/* ═══ Hero: Split Layout — Text Left + Featured Image Right ═══ */}
      <section className="ys-hero">
        <div className="ys-hero-text">
          <div className="ys-hero-badge">✦ Viral AI Photo Trend 2025</div>
          <h1>
            Meet Your <span className="ys-gradient">Younger Self</span> — AI
            Time Travel Photo Prompt
          </h1>
          <p className="ys-hero-desc">
            The mega-viral trend where people use AI to generate emotional photos of their adult self
            meeting their childhood self. Upload two photos, pick a prompt style, and watch time collapse
            into a single frame. Five viral styles, free prompt maker, one click to generate.
          </p>
          <button
            className="ys-hero-cta"
            onClick={() => handleSelectTemplate(TEMPLATES[0])}
          >
            Try Studio Portrait →
          </button>
        </div>
        <div
          className="ys-hero-image-wrap"
          onClick={() => handleSelectTemplate(TEMPLATES[0])}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") handleSelectTemplate(TEMPLATES[0]); }}
        >
          <span className="ys-hero-img-badge">#1 Most Popular</span>
          <Image
            src={TEMPLATES[0].imageUrl}
            alt="Meet Your Younger Self Studio Portrait — viral AI prompt effect showing adult meeting their childhood self"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </section>

      {/* ═══ Horizontal Scroll Strip: Other 4 Styles ═══ */}
      <section className="ys-strip">
        <div className="ys-strip-header">
          <p className="ys-section-label">More Younger Self Styles</p>
          <h2 className="ys-section-title">Pick Your Favorite Meet Your Younger Self Prompt Style</h2>
        </div>
        <div className="ys-strip-scroll">
          {TEMPLATES.slice(1).map((t) => (
            <div
              key={t.id}
              className={`ys-strip-card ${selectedTemplate?.id === t.id ? "active" : ""}`}
              onClick={() => handleSelectTemplate(t)}
            >
              <div className="ys-strip-card-image">
                <span className="ys-strip-card-tag">{t.tag}</span>
                <Image
                  src={t.imageUrl}
                  alt={`${t.title} — meet your younger self prompt style`}
                  fill
                  sizes="260px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="ys-strip-card-body">
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <button
                  className="ys-strip-use"
                  onClick={(e) => { e.stopPropagation(); handleSelectTemplate(t); }}
                >
                  {selectedTemplate?.id === t.id ? "✓ Selected" : "Use this prompt"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Editor: Generate ═══ */}
      <section className="ys-editor-section" ref={editorRef}>
        <p className="ys-section-label">Free Younger Self Prompt Maker</p>
        <h2 className="ys-section-title" style={{ marginBottom: 24 }}>
          {selectedTemplate ? `Prompt Maker: ${selectedTemplate.title}` : "Select a younger self style above to start"}
        </h2>

        <div className="ys-editor-card">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Pick a younger self style above to load its prompt, or write your own meet-your-younger-self prompt here…"
          />
          <div className="ys-editor-toolbar">
            {selectedTemplate?.needsPhoto !== false && (
              <div
                className={`ys-upload-trigger ${referenceImage ? "has-file" : ""}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {referenceImage ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={referenceImage} alt="" className="preview-thumb" />
                    <span>{referenceFileName}</span>
                    <button
                      className="ys-upload-remove"
                      onClick={(e) => { e.stopPropagation(); removeImage(); }}
                    >
                      remove
                    </button>
                  </>
                ) : (
                  <span>+ Upload your current photo AND a childhood photo</span>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </div>
            )}
            <div className="ys-toolbar-spacer" />
            <button className="ys-btn-copy" onClick={handleCopyPrompt}>
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              className="ys-btn-generate"
              onClick={handleGenerate}
              disabled={!prompt.trim()}
            >
              Generate Younger Self
            </button>
          </div>
        </div>
        <p className="ys-editor-hint">
          Pro tip: upload both your current photo and a childhood photo, then paste this prompt into{" "}
          <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer">ChatGPT</a>{" "}
          for the best result. Works with GPT Image 2.
        </p>
      </section>

      {/* ═══ Share ═══ */}
      <section className="ys-share-section">
        <div className="ys-share-row">
          <span className="ys-share-label">Share this collection:</span>
          <button className="ys-share-btn" onClick={() => handleShare("twitter")}>X / Twitter</button>
          <button className="ys-share-btn" onClick={() => handleShare("facebook")}>Facebook</button>
          <button className="ys-share-btn" onClick={() => handleShare("whatsapp")}>WhatsApp</button>
          <button className="ys-share-btn" onClick={() => handleShare("copy")}>
            {copiedShare ? "Copied!" : "Copy link"}
          </button>
        </div>
      </section>

      {/* ═══ More AI Prompts You Might Like ═══ */}
      <section className="ys-more">
        <p className="ys-section-label">Explore More</p>
        <h2 className="ys-section-title">Trending AI Art Prompts to Try Next</h2>
        <div className="ys-more-grid">
          {[
            { slug: "chibi-3d-mini-me", title: "Chibi 3D Mini Me", cat: "Character" },
            { slug: "anime-snapshot-conversion", title: "Anime Snapshot Conversion", cat: "Character" },
            { slug: "gal-game-character-introduction-page", title: "Gal Game Character Page", cat: "Character" },
            { slug: "persona5-character-reference-card", title: "Persona 5 Character Card", cat: "Character" },
            { slug: "toddler-crayon-scribble-art-style-portrait", title: "Toddler Crayon Scribble Portrait", cat: "Photography" },
            { slug: "fictional-anime-movie-poster", title: "Fictional Anime Movie Poster", cat: "Poster" },
            { slug: "character-visual-vertical-poster", title: "Character Visual Vertical Poster", cat: "Poster" },
            { slug: "saint-seiya-gold-saints-card-grid", title: "Saint Seiya Gold Saints Card", cat: "Character" },
          ].map((item) => (
            <Link key={item.slug} href={`/prompts/${item.slug}`} className="ys-more-card">
              <div className="ys-more-card-image">
                <Image
                  src={`/prompts/${item.slug}.jpg`}
                  alt={`${item.title} — AI art prompt`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
              <div className="ys-more-card-body">
                <h3>{item.title}</h3>
                <p>{item.cat}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <Link href="/ai-prompts" className="ys-more-cta">
            Browse all AI prompts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* ═══ SEO Content: What Is the Meet Your Younger Self Trend? ═══ */}
      <section className="ys-seo-content">
        <h2>What Is the &ldquo;Meet Your Younger Self&rdquo; AI Trend? The Viral Photo Trend Explained</h2>
        <p>
          The <strong>&ldquo;meet your younger self&rdquo; AI trend</strong> is a mega-viral phenomenon where
          people use AI image generators like ChatGPT with GPT Image 2 to create photorealistic images of their
          adult self meeting their childhood self. The results are deeply emotional — imagine kneeling down to
          hug the 6-year-old version of yourself, or walking hand-in-hand down a sunlit street with the child
          you used to be.
        </p>
        <p>
          In 2025, <strong>&ldquo;younger self AI prompts&rdquo;</strong> have exploded across social media.
          The trend taps into universal feelings of nostalgia, self-compassion, and the deeply human desire to
          comfort our past selves. Google Trends shows <strong>&ldquo;meet your younger self prompt&rdquo;</strong>{" "}
          surging +800% and <strong>&ldquo;younger self AI photo&rdquo;</strong> hitting breakout status. From
          studio portraits to cinematic walking scenes, emotional hugs to then-and-now splits, the creative
          possibilities are endless.
        </p>
        <p>
          That&rsquo;s why we built this free <strong>younger self prompt maker</strong>: pick one of five viral{" "}
          <strong>younger self style</strong> templates, upload your current photo and a childhood photo, and
          generate in one click using{" "}
          <Link href="/gpt-image-2-prompts">GPT Image 2</Link>. Every template on this page has been
          tested across hundreds of photos to ensure consistent likeness preservation and emotional impact.
          You can also copy the prompt and paste it directly into ChatGPT or browse our full{" "}
          <Link href="/ai-prompts">AI prompt library</Link> with 170+ prompts across categories
          like <Link href="/ai-prompts?category=character">character design</Link>,{" "}
          <Link href="/ai-prompts?category=poster">poster design</Link>, and{" "}
          <Link href="/ai-prompts?category=photography">photography</Link>.
        </p>
      </section>

      {/* ═══ FAQ (SEO Content) ═══ */}
      <section className="ys-faq">
        <h2 className="ys-section-title" style={{ marginBottom: 0 }}>Meet Your Younger Self Prompt FAQ — Common Questions</h2>
        <div className="ys-faq-item">
          <h3>What is the &ldquo;meet your younger self&rdquo; AI trend?</h3>
          <p>
            The &ldquo;meet your younger self&rdquo; AI trend is a viral phenomenon where people use AI image
            generators like ChatGPT with GPT Image 2 to create photorealistic images of their adult self meeting
            their childhood self. The results range from tender studio portraits to emotional hugs, and the trend
            has taken over social media in 2025 due to its deeply nostalgic and emotional impact.
          </p>
        </div>
        <div className="ys-faq-item">
          <h3>How do I create a &ldquo;meet your younger self&rdquo; photo?</h3>
          <p>
            Upload a current photo and a childhood photo to ChatGPT with one of these prompts. Pick a style
            you like, click &ldquo;Use this prompt&rdquo; to load it into our free prompt maker, upload both
            photos, then hit &ldquo;Generate Younger Self.&rdquo; You can also copy the prompt and paste it
            directly into ChatGPT along with both photos for the same result.
          </p>
        </div>
        <div className="ys-faq-item">
          <h3>Do I need a childhood photo?</h3>
          <p>
            Yes, for the best result you should upload both a current photo and a childhood photo. The AI needs
            reference images for both ages to maintain likeness preservation — it needs to know what you look
            like now and what you looked like as a child. The closer the childhood photo is to the age you want
            to appear in the image (typically age 5-10), the more accurate the result.
          </p>
        </div>
        <div className="ys-faq-item">
          <h3>Which AI model works best for this?</h3>
          <p>
            ChatGPT with GPT Image 2 handles the dual-photo likeness preservation best. It can simultaneously
            maintain your likeness at two different ages in a single generated image, which is essential for
            the &ldquo;meeting your younger self&rdquo; effect. Other models may struggle to preserve both
            likenesses accurately in the same frame.
          </p>
        </div>
        <div className="ys-faq-item">
          <h3>Why is this trend so emotional?</h3>
          <p>
            The &ldquo;meet your younger self&rdquo; trend taps into universal feelings of nostalgia,
            self-compassion, and the desire to comfort our past selves. Seeing an image of yourself as an adult
            hugging or walking with your childhood self creates an instant emotional response — it&rsquo;s the
            visual embodiment of telling your younger self that everything is going to be okay. Many people
            report being moved to tears by their results.
          </p>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="ys-footer">
        <p>
          <Link href="/">DrawPrompt</Link> — the best &ldquo;meet your younger self&rdquo; prompts for AI image generation.
          Browse <Link href="/ai-prompts">all prompts</Link>,
          try <Link href="/gpt-image-2-prompts">GPT Image 2 prompts</Link>,
          or make a <Link href="/chibi-prompt">chibi portrait</Link>.
        </p>
      </footer>
    </div>
  );
}
