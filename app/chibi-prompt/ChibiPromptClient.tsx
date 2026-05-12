"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ─── Template Data ───────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: "chibi-mini-me",
    slug: "chibi-3d-mini-me",
    title: "Chibi 3D Mini Me",
    tag: "Most Popular",
    description:
      "Tiny 3D chibi versions of you appear around the original photo — sitting, climbing, playing, interacting with objects.",
    imageUrl: "/prompts/chibi-3d-mini-me-hero.jpg",
    needsPhoto: true,
    featured: true,
    prompt: `Mini "chibi 3D" versions of the same person appear around the original photo — sitting, climbing, playing, interacting with objects — with realistic shadows and depth. Keep base image unchanged. Add soft handwritten text: "Little versions of me… living my quiet moments." Include tiny props text like "You got this ♡". Cinematic, cozy, viral aesthetic.`,
  },
  {
    id: "chibi-gashapon",
    slug: "chibi-gashapon-capsule",
    title: "Gashapon Capsule Chibi",
    tag: "Trending",
    description:
      "A hand holds a transparent gashapon capsule toy with an adorable chibi figurine of you inside.",
    imageUrl: "/prompts/chibi-3d-mini-me.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create a hyper-realistic photograph of a hand gently holding a transparent gashapon capsule toy. Inside the capsule is an ultra-cute chibi 3D figurine version of the person in the uploaded photo — big head, tiny body, glossy anime-figure finish, same hairstyle, same outfit, same facial features preserved perfectly. The figurine sits in a natural pose on a small round base inside the capsule. The capsule is clear with a pastel-colored top half (soft pink or mint). Background is softly blurred (bokeh) showing a bright, clean pastel-toned room or toy store shelf. Lighting is soft studio-quality, showing reflections on the capsule surface. The overall mood is cute, collectible, and Instagram-worthy. The person's identity must be 100% recognizable in the chibi figurine.`,
  },
  {
    id: "chibi-zodiac",
    slug: "chibi-zodiac-yumi-cells",
    title: "Zodiac Yumi Cells",
    tag: "Personality",
    description:
      "Yumi's Cells-inspired poster with chibi mini-characters reflecting your zodiac personality traits.",
    imageUrl: "/prompts/chibi-zodiac-yumi-cells.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `I am "{Your Zodiac Sign}." Create a poster inspired by Yumi's Cells with the same soft, aesthetic, slice-of-life vibe and background style, the zodiac theme is fully reflected in the design. The subject's face must remain completely unchanged and untouched. Surround the subject with multiple small, raw yet realistic cute chibi-style mini 3D versions of the subject, designed like expressive "cells" with oversized heads, glossy high-detail finishes, and playful emotions. Each mini character should reflect zodiac personality traits — show them in different actions like reading, relaxing, being stubborn, holding snacks, looking sleepy, clinging onto the subject's arm, and showing playful energy. Add playful hand-drawn doodles interacting directly with the subject and chibi characters — outlining poses, sketching cozy cushions, steam from drinks, tiny flowers, sparkle details, and calm motion accents. Include small hand-lettered zodiac trait labels near each chibi character. Soft, dreamy, pastel color palette with warm lighting. Style: aesthetic poster art, Yumi's Cells inspired, glossy 3D chibi figures, kawaii, cozy slice-of-life mood. Aspect ratio 3:4.`,
  },
  {
    id: "chibi-scrapbook",
    slug: "chibi-cozy-scrapbook-alter-egos",
    title: "Scrapbook Alter Egos",
    tag: "Aesthetic",
    description:
      "Cozy scrapbook-style photo with mini chibi alter-ego figurines placed naturally around the scene.",
    imageUrl: "/prompts/chibi-cozy-scrapbook-alter-egos.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Transform the provided reference image into a cozy aesthetic scrapbook-style composition while strictly preserving the original subject, identity, pose, lighting, and background. Add multiple small "mini version" characters of the same person (chibi / doll-like style), placed naturally around the scene (on objects, table, shoulder, etc.). These mini figures must match the subject's face, hairstyle, outfit, and vibe consistently, styled as cute 3D collectible figurines. Show them doing different activities (reading, posing, taking photos, relaxing). Overlay handwritten-style doodles and annotations across the image: arrows, hearts, stars, sparkles, icons, and playful captions connected to elements in the scene. Use a soft pastel color palette (white base with pink, peach, blue accents). Keep the frame visually rich and filled but balanced and clean. Style: warm, cozy lighting, dreamy Instagram scrapbook aesthetic, soft depth of field, highly detailed, polished but playful. The final result must look like the SAME original image enhanced with mini alter-egos and aesthetic annotations — not a recreated or different scene.`,
  },
  {
    id: "chibi-sticker-diary",
    slug: "chibi-sticker-diary-collage",
    title: "Sticker Diary Collage",
    tag: "Fun",
    description:
      "Your photo surrounded by adorable chibi stickers of yourself, handwritten notes, and diary-style doodles.",
    imageUrl: "/prompts/chibi-zodiac-taurus-yumi-cells.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create a vibrant sticker diary collage using the uploaded photo as the center. Keep the original photo completely unchanged and recognizable. Surround it with 6-8 adorable chibi sticker versions of the same person — each chibi should have an oversized head, the same hairstyle and face as the original person, a tiny body, and be styled as a cute peelable sticker with a thin white border. Each chibi sticker shows a different mood or activity: one happy and waving, one sleepy with a tiny pillow, one eating a snack, one taking a selfie, one reading, one doing a heart pose, one looking surprised. Scatter hand-drawn diary doodles around the composition: arrows, speech bubbles with handwritten text like "mood today ☆", "snack time!", "zzz...", tiny hearts, stars, sparkles, washi tape strips, and small date stamps. Background is a soft pastel notebook page or grid paper texture. The overall vibe is cute, personal, and journal-like — as if someone decorated their diary page with custom chibi stickers of themselves. Color palette: soft pastels (pink, lavender, mint, cream, peach). Style: kawaii sticker art, bullet journal aesthetic, highly detailed chibi figures, warm and playful mood.`,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ChibiPromptClient() {
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
    // Pass the uploaded image via sessionStorage (too large for URL)
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
      ? `${window.location.origin}/chibi-prompt?ref=share`
      : "https://drawprompt.org/chibi-prompt?ref=share";

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(
      "I turned my photo into adorable chibi art with this — try it:"
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
    <div className="cb-page">
      <style jsx global>{`
        /* ═══════════════════════════════════════════════════════════════════
           Chibi Prompt — Page Styles
           Structure: Hero (split) → Horizontal Strip → Editor → Share → More → FAQ → Footer
           ═══════════════════════════════════════════════════════════════════ */

        .cb-page {
          --cb-fg: #0f172a;
          --cb-fg-2: #475569;
          --cb-fg-3: #94a3b8;
          --cb-bg: #f8fafc;
          --cb-surface: #ffffff;
          --cb-border: #e2e8f0;
          --cb-accent: #7c3aed;
          --cb-accent-light: #ede9fe;
          --cb-accent-hover: #6d28d9;
          --cb-pink: #ec4899;
          --radius: 16px;
          background: var(--cb-bg);
          min-height: 100vh;
          color: var(--cb-fg);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        /* ─── Section shared ─── */
        .cb-section-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--cb-accent);
          margin: 0 0 8px;
        }
        .cb-section-title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          margin: 0 0 6px;
          color: var(--cb-fg);
        }

        /* ─── Hero: Split layout (text left, image right) ─── */
        .cb-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 24px 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .cb-hero-text { max-width: 520px; }
        .cb-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          background: var(--cb-accent-light);
          color: var(--cb-accent);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          margin-bottom: 20px;
        }
        .cb-hero h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin: 0 0 20px;
        }
        .cb-hero h1 .cb-gradient {
          background: linear-gradient(135deg, var(--cb-accent), var(--cb-pink));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cb-hero-desc {
          font-size: 1.05rem;
          color: var(--cb-fg-2);
          line-height: 1.7;
          margin: 0 0 32px;
        }
        .cb-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: var(--cb-accent);
          color: #fff;
          border: none;
          border-radius: 100px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .cb-hero-cta:hover { background: var(--cb-accent-hover); transform: translateY(-1px); }
        .cb-hero-image-wrap {
          position: relative;
          border-radius: var(--radius);
          overflow: hidden;
          aspect-ratio: 4/3;
          cursor: pointer;
          box-shadow: 0 24px 80px rgba(124,58,237,0.15), 0 8px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s;
        }
        .cb-hero-image-wrap:hover { transform: scale(1.01); }
        .cb-hero-img-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 2;
          padding: 6px 14px;
          border-radius: 100px;
          background: rgba(124,58,237,0.9);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          backdrop-filter: blur(8px);
        }

        /* ─── Horizontal scroll strip ─── */
        .cb-strip {
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 0 0;
        }
        .cb-strip-header {
          padding: 0 24px;
          margin-bottom: 24px;
        }
        .cb-strip-scroll {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding: 0 24px 12px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .cb-strip-scroll::-webkit-scrollbar { display: none; }
        .cb-strip-card {
          flex: 0 0 260px;
          scroll-snap-align: start;
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--cb-surface);
          border: 2px solid transparent;
          cursor: pointer;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .cb-strip-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        .cb-strip-card.active {
          border-color: var(--cb-accent);
          box-shadow: 0 0 0 1px var(--cb-accent), 0 20px 60px rgba(124,58,237,0.15);
        }
        .cb-strip-card-image {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
        }
        .cb-strip-card-tag {
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
          color: var(--cb-accent);
          letter-spacing: 0.04em;
        }
        .cb-strip-card-body {
          padding: 16px;
        }
        .cb-strip-card-body h3 {
          font-size: 0.9rem;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .cb-strip-card-body p {
          font-size: 0.78rem;
          color: var(--cb-fg-3);
          margin: 0 0 12px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cb-strip-use {
          display: block;
          width: 100%;
          padding: 9px;
          border: 1px solid var(--cb-border);
          border-radius: 10px;
          background: var(--cb-surface);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--cb-fg-2);
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cb-strip-use:hover { border-color: var(--cb-accent); color: var(--cb-accent); }
        .cb-strip-card.active .cb-strip-use {
          background: var(--cb-accent);
          border-color: var(--cb-accent);
          color: #fff;
        }

        /* ─── Editor ─── */
        .cb-editor-section {
          max-width: 720px;
          margin: 0 auto;
          padding: 72px 24px 0;
        }
        .cb-editor-card {
          background: var(--cb-surface);
          border: 1px solid var(--cb-border);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .cb-editor-card textarea {
          width: 100%;
          min-height: 160px;
          padding: 20px;
          border: none;
          background: transparent;
          font-size: 0.88rem;
          line-height: 1.7;
          color: var(--cb-fg);
          resize: vertical;
          font-family: inherit;
          outline: none;
        }
        .cb-editor-card textarea::placeholder { color: var(--cb-fg-3); }
        .cb-editor-toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border-top: 1px solid var(--cb-border);
          background: #fafbfc;
        }
        .cb-upload-trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px dashed var(--cb-border);
          border-radius: 8px;
          background: transparent;
          font-size: 0.8rem;
          color: var(--cb-fg-2);
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .cb-upload-trigger:hover { border-color: var(--cb-accent); color: var(--cb-accent); }
        .cb-upload-trigger.has-file {
          border-style: solid;
          border-color: #86efac;
          background: #f0fdf4;
          color: #166534;
        }
        .cb-upload-trigger .preview-thumb {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          object-fit: cover;
        }
        .cb-upload-remove {
          background: none;
          border: none;
          font-size: 0.75rem;
          color: var(--cb-fg-3);
          cursor: pointer;
          text-decoration: underline;
          margin-left: 4px;
        }
        .cb-toolbar-spacer { flex: 1; }
        .cb-btn-copy {
          padding: 10px 16px;
          background: transparent;
          color: var(--cb-fg-2);
          border: 1px solid var(--cb-border);
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .cb-btn-copy:hover { border-color: var(--cb-accent); color: var(--cb-accent); }
        .cb-btn-generate {
          padding: 10px 28px;
          background: var(--cb-accent);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .cb-btn-generate:hover { background: var(--cb-accent-hover); }
        .cb-btn-generate:disabled { opacity: 0.4; cursor: not-allowed; }
        .cb-editor-hint {
          margin-top: 14px;
          font-size: 0.78rem;
          color: var(--cb-fg-3);
          line-height: 1.6;
        }
        .cb-editor-hint a { color: var(--cb-accent); text-decoration: none; }
        .cb-editor-hint a:hover { text-decoration: underline; }

        /* ─── Share ─── */
        .cb-share-section {
          max-width: 720px;
          margin: 0 auto;
          padding: 56px 24px 0;
        }
        .cb-share-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          padding: 24px;
          background: var(--cb-surface);
          border: 1px solid var(--cb-border);
          border-radius: var(--radius);
        }
        .cb-share-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--cb-fg);
          margin-right: 8px;
        }
        .cb-share-btn {
          padding: 8px 16px;
          border: 1px solid var(--cb-border);
          border-radius: 100px;
          background: var(--cb-surface);
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--cb-fg-2);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .cb-share-btn:hover { border-color: var(--cb-accent); color: var(--cb-accent); }

        /* ─── More Prompts (image card grid) ─── */
        .cb-more {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 24px 0;
        }
        .cb-more-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 24px;
        }
        .cb-more-card {
          display: block;
          background: var(--cb-surface);
          border: 1px solid var(--cb-border);
          border-radius: var(--radius);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .cb-more-card:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .cb-more-card-image {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
        }
        .cb-more-card-body {
          padding: 14px 16px;
        }
        .cb-more-card-body h3 {
          font-size: 0.82rem;
          font-weight: 700;
          margin: 0 0 4px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cb-more-card-body p {
          font-size: 0.72rem;
          color: var(--cb-fg-3);
          margin: 0;
          line-height: 1.4;
        }
        .cb-more-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
          padding: 12px 28px;
          border: 1px solid var(--cb-border);
          border-radius: 100px;
          background: var(--cb-surface);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--cb-fg);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .cb-more-cta:hover { border-color: var(--cb-accent); color: var(--cb-accent); transform: translateY(-1px); }
        /* ─── SEO content block ─── */
        .cb-seo-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 72px 24px 0;
        }
        .cb-seo-content h2 {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0 0 16px;
          color: var(--cb-fg);
        }
        .cb-seo-content p {
          font-size: 0.92rem;
          color: var(--cb-fg-2);
          line-height: 1.8;
          margin: 0 0 16px;
        }
        .cb-seo-content a {
          color: var(--cb-accent);
          text-decoration: none;
        }
        .cb-seo-content a:hover { text-decoration: underline; }

        /* ─── FAQ ─── */
        .cb-faq {
          max-width: 720px;
          margin: 0 auto;
          padding: 80px 24px 56px;
        }
        .cb-faq-item {
          border-bottom: 1px solid var(--cb-border);
          padding: 24px 0;
        }
        .cb-faq-item:first-of-type { border-top: 1px solid var(--cb-border); }
        .cb-faq-item h3 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0 0 10px;
          color: var(--cb-fg);
        }
        .cb-faq-item p {
          font-size: 0.88rem;
          color: var(--cb-fg-2);
          line-height: 1.7;
          margin: 0;
        }

        /* ─── Footer ─── */
        .cb-footer {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 24px 56px;
          font-size: 0.78rem;
          color: var(--cb-fg-3);
          line-height: 1.7;
        }
        .cb-footer a { color: var(--cb-accent); text-decoration: none; }
        .cb-footer a:hover { text-decoration: underline; }

        /* ─── Responsive ─── */
        @media (max-width: 768px) {
          .cb-hero {
            grid-template-columns: 1fr;
            padding: 48px 20px 0;
            gap: 32px;
          }
          .cb-hero-text { max-width: 100%; }
          .cb-hero h1 { font-size: 1.8rem; }
          .cb-hero-image-wrap { aspect-ratio: 4/3; }
          .cb-strip { padding: 48px 0 0; }
          .cb-strip-card { flex: 0 0 240px; }
          .cb-editor-section { padding: 48px 20px 0; }
          .cb-editor-toolbar { flex-wrap: wrap; }
          .cb-btn-generate { width: 100%; text-align: center; }
          .cb-more-grid { grid-template-columns: 1fr 1fr; }
          .cb-seo-content { padding: 48px 20px 0; }
          .cb-share-row { justify-content: center; }
        }
      `}</style>

      {/* ═══ Hero: Split Layout — Text Left + Featured Image Right ═══ */}
      <section className="cb-hero">
        <div className="cb-hero-text">
          <div className="cb-hero-badge">✦ New AI Photo Trend Prompt</div>
          <h1>
            Best <span className="cb-gradient">Chibi Prompt</span> &amp;
            Chibi Cartoon Prompt Maker
          </h1>
          <p className="cb-hero-desc">
            The internet&apos;s hottest new AI photo trend prompt. Upload your photo and watch tiny chibi
            versions of yourself come alive — climbing, playing, and being ridiculously cute.
            Five viral chibi styles, free chibi maker, one click to generate.
          </p>
          <button
            className="cb-hero-cta"
            onClick={() => handleSelectTemplate(TEMPLATES[0])}
          >
            Try Chibi 3D Mini Me →
          </button>
        </div>
        <div
          className="cb-hero-image-wrap"
          onClick={() => handleSelectTemplate(TEMPLATES[0])}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") handleSelectTemplate(TEMPLATES[0]); }}
        >
          <span className="cb-hero-img-badge">#1 Most Popular</span>
          <Image
            src={TEMPLATES[0].imageUrl}
            alt="Chibi 3D Mini Me — viral chibi prompt effect showing tiny 3D versions of a person"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </section>

      {/* ═══ Horizontal Scroll Strip: Other 4 Styles ═══ */}
      <section className="cb-strip">
        <div className="cb-strip-header">
          <p className="cb-section-label">More Chibi Styles</p>
          <h2 className="cb-section-title">Pick Your Favorite Chibi Cartoon Prompt Style</h2>
        </div>
        <div className="cb-strip-scroll">
          {TEMPLATES.slice(1).map((t) => (
            <div
              key={t.id}
              className={`cb-strip-card ${selectedTemplate?.id === t.id ? "active" : ""}`}
              onClick={() => handleSelectTemplate(t)}
            >
              <div className="cb-strip-card-image">
                <span className="cb-strip-card-tag">{t.tag}</span>
                <Image
                  src={t.imageUrl}
                  alt={`${t.title} — chibi prompt style`}
                  fill
                  sizes="260px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="cb-strip-card-body">
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <button
                  className="cb-strip-use"
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
      <section className="cb-editor-section" ref={editorRef}>
        <p className="cb-section-label">Free Chibi Maker</p>
        <h2 className="cb-section-title" style={{ marginBottom: 24 }}>
          {selectedTemplate ? `Chibi Maker: ${selectedTemplate.title}` : "Select a chibi style above to start"}
        </h2>

        <div className="cb-editor-card">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Pick a chibi style above to load its prompt, or write your own chibi prompt here…"
          />
          <div className="cb-editor-toolbar">
            {selectedTemplate?.needsPhoto !== false && (
              <div
                className={`cb-upload-trigger ${referenceImage ? "has-file" : ""}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {referenceImage ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={referenceImage} alt="" className="preview-thumb" />
                    <span>{referenceFileName}</span>
                    <button
                      className="cb-upload-remove"
                      onClick={(e) => { e.stopPropagation(); removeImage(); }}
                    >
                      remove
                    </button>
                  </>
                ) : (
                  <span>+ Upload your photo</span>
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
            <div className="cb-toolbar-spacer" />
            <button className="cb-btn-copy" onClick={handleCopyPrompt}>
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              className="cb-btn-generate"
              onClick={handleGenerate}
              disabled={!prompt.trim()}
            >
              Generate Chibi
            </button>
          </div>
        </div>
        <p className="cb-editor-hint">
          Pro tip: paste this prompt into{" "}
          <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer">ChatGPT</a>{" "}
          with your photo for the same result. Works with GPT Image 2.
        </p>
      </section>

      {/* ═══ Share ═══ */}
      <section className="cb-share-section">
        <div className="cb-share-row">
          <span className="cb-share-label">Share this collection:</span>
          <button className="cb-share-btn" onClick={() => handleShare("twitter")}>X / Twitter</button>
          <button className="cb-share-btn" onClick={() => handleShare("facebook")}>Facebook</button>
          <button className="cb-share-btn" onClick={() => handleShare("whatsapp")}>WhatsApp</button>
          <button className="cb-share-btn" onClick={() => handleShare("copy")}>
            {copiedShare ? "Copied!" : "Copy link"}
          </button>
        </div>
      </section>

      {/* ═══ More AI Prompts You Might Like ═══ */}
      <section className="cb-more">
        <p className="cb-section-label">Explore More</p>
        <h2 className="cb-section-title">Trending AI Art Prompts to Try Next</h2>
        <div className="cb-more-grid">
          {[
            { slug: "anime-snapshot-conversion", title: "Anime Snapshot Conversion", cat: "Character" },
            { slug: "gal-game-character-introduction-page", title: "Gal Game Character Page", cat: "Character" },
            { slug: "persona5-character-reference-card", title: "Persona 5 Character Card", cat: "Character" },
            { slug: "pathetic-art-emotional-creature", title: "Pathetic Art — MS Paint Redraw", cat: "Character" },
            { slug: "toddler-crayon-scribble-art-style-portrait", title: "Toddler Crayon Scribble Portrait", cat: "Photography" },
            { slug: "fictional-anime-movie-poster", title: "Fictional Anime Movie Poster", cat: "Poster" },
            { slug: "character-visual-vertical-poster", title: "Character Visual Vertical Poster", cat: "Poster" },
            { slug: "saint-seiya-gold-saints-card-grid", title: "Saint Seiya Gold Saints Card", cat: "Character" },
          ].map((item) => (
            <Link key={item.slug} href={`/prompts/${item.slug}`} className="cb-more-card">
              <div className="cb-more-card-image">
                <Image
                  src={`/prompts/${item.slug}.jpg`}
                  alt={`${item.title} — AI art prompt`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
              <div className="cb-more-card-body">
                <h3>{item.title}</h3>
                <p>{item.cat}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <Link href="/ai-prompts" className="cb-more-cta">
            Browse all AI prompts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* ═══ SEO Content: What is Chibi Art? ═══ */}
      <section className="cb-seo-content">
        <h2>What Is a Chibi Cartoon Prompt? The New AI Photo Trend Explained</h2>
        <p>
          A <strong>chibi cartoon prompt</strong> is a text instruction that tells AI image generators like
          ChatGPT to transform your photo into an adorable, miniature cartoon character in the Japanese
          chibi style — big head, tiny body, exaggerated expressions. The word &ldquo;chibi&rdquo; (ちび)
          literally means &ldquo;short&rdquo; or &ldquo;small&rdquo; in Japanese, and the style has been a
          staple in manga, anime, and kawaii culture for decades.
        </p>
        <p>
          In 2025, <strong>chibi prompts</strong> have become the biggest <strong>new AI photo trend prompt</strong>{" "}
          category on social media. The viral explosion started with the &ldquo;Chibi 3D Mini Me&rdquo; effect —
          tiny 3D versions of yourself climbing around your own photo — and quickly expanded to gashapon capsule
          figurines, zodiac personality cells, scrapbook alter egos, and sticker diary collages. Google Trends shows{" "}
          <strong>&ldquo;chibi cartoon prompt&rdquo;</strong> surging +450% and <strong>&ldquo;chibi maker&rdquo;</strong>{" "}
          hitting breakout status this week alone.
        </p>
        <p>
          That&rsquo;s why we built this free <strong>chibi maker</strong>: pick one of five viral{" "}
          <strong>chibi style</strong> templates, upload your photo, and generate in one click using{" "}
          <Link href="/gpt-image-2-prompts">GPT Image 2</Link>. Every template on this page has been
          tested across hundreds of photos to ensure consistent, high-quality results. You can also
          copy the prompt and paste it directly into ChatGPT or browse our full{" "}
          <Link href="/ai-prompts">AI prompt library</Link> with 170+ prompts across categories
          like <Link href="/ai-prompts?category=character">character design</Link>,{" "}
          <Link href="/ai-prompts?category=poster">poster design</Link>, and{" "}
          <Link href="/ai-prompts?category=photography">photography</Link>.
        </p>
      </section>

      {/* ═══ FAQ (SEO Content) ═══ */}
      <section className="cb-faq">
        <h2 className="cb-section-title" style={{ marginBottom: 0 }}>Chibi Prompt FAQ — Common Questions</h2>
        <div className="cb-faq-item">
          <h3>What is a chibi prompt?</h3>
          <p>
            A chibi prompt (also called a chibi cartoon prompt) is a text instruction you give to AI image
            generators like ChatGPT with GPT Image 2 to create cute, miniature cartoon versions of people —
            typically with oversized heads, small bodies, and adorable expressions. The chibi style originated
            from Japanese manga and anime, and has become one of the most viral new AI photo trend prompts in 2025.
          </p>
        </div>
        <div className="cb-faq-item">
          <h3>How do I use these chibi cartoon prompts?</h3>
          <p>
            Pick a chibi style you like, click &ldquo;Use this prompt&rdquo; to load it into our free chibi maker,
            upload your photo, then hit &ldquo;Generate Chibi.&rdquo; You can also copy the prompt and paste it
            directly into ChatGPT along with your photo for the same result.
          </p>
        </div>
        <div className="cb-faq-item">
          <h3>Is this chibi maker free?</h3>
          <p>
            Yes — browsing and copying all chibi prompts is completely free. To generate on DrawPrompt directly,
            free users get limited generations per day. You can also paste any prompt into ChatGPT (Plus, Pro, or
            Team) to generate with GPT Image 2 at no extra cost.
          </p>
        </div>
        <div className="cb-faq-item">
          <h3>Which chibi style is the most popular right now?</h3>
          <p>
            The &ldquo;Chibi 3D Mini Me&rdquo; style is currently the most viral chibi cartoon prompt — it places
            tiny 3D chibi versions of you around your original photo. The Gashapon Capsule chibi style and Zodiac
            Yumi Cells are also trending fast according to Google Trends data.
          </p>
        </div>
        <div className="cb-faq-item">
          <h3>Can I use these chibi prompts with Midjourney or DALL-E?</h3>
          <p>
            These prompts are optimized for GPT Image 2 via ChatGPT, but many chibi cartoon prompts work with
            other AI image generators like Midjourney or DALL-E with minor adjustments. The photo-upload features
            (like preserving your face in chibi style) work best with GPT Image 2.
          </p>
        </div>
        <div className="cb-faq-item">
          <h3>What makes a good chibi cartoon prompt?</h3>
          <p>
            A great chibi cartoon prompt should specify the chibi style (3D figurine, flat sticker, anime cell),
            how to handle the uploaded photo (preserve identity, face, hairstyle), the composition (where the chibi
            versions appear), and the overall mood (cute, kawaii, cozy). Our templates include all of these elements
            so you get consistent, high-quality results every time.
          </p>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="cb-footer">
        <p>
          <Link href="/">DrawPrompt</Link> — the best chibi prompts for AI image generation.
          Browse <Link href="/ai-prompts">all prompts</Link>,
          try <Link href="/gpt-image-2-prompts">GPT Image 2 prompts</Link>,
          or make a <Link href="/mothers-day">Mother&apos;s Day poster</Link>.
        </p>
      </footer>
    </div>
  );
}
