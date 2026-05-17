"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ─── Template Data ───────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: "polaroid-vintage-instant",
    slug: "ai-polaroid-vintage-instant-photo",
    title: "Vintage Instant Photo",
    tag: "Most Popular",
    description:
      "A single Polaroid-style instant photo with the classic white border, slightly faded colors, and soft vignette — just like pulling a fresh shot from the camera.",
    imageUrl: "/prompts/ai-polaroid-vintage-instant-photo.jpg",
    needsPhoto: true,
    featured: true,
    prompt: `Transform the uploaded photo into a vintage Polaroid instant-film photo. Add the iconic thick white border at the bottom (wider than the other three sides), slightly faded and warm color tones with subtle color shifts, soft vignette darkening at the edges, and faint film grain. The image should look like it was just developed — with that characteristic slightly overexposed, dreamy quality of real instant film. Add a subtle light leak on one corner. The photo should rest on a warm wooden surface at a slight angle with a soft shadow underneath. Keep the subject recognizable but give it that nostalgic, analog feel. No text on the white border unless it looks handwritten with a marker.`,
  },
  {
    id: "polaroid-scattered-memories",
    slug: "polaroid-scattered-memories-flatlay",
    title: "Scattered Memories Flatlay",
    tag: "Aesthetic",
    description:
      "Multiple Polaroid photos scattered across a cozy surface — a visual diary of memories laid out in an aesthetic flatlay composition.",
    imageUrl: "/prompts/polaroid-scattered-memories-flatlay.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create a beautiful flatlay composition of 5-7 Polaroid-style instant photos scattered naturally across a cozy surface (light linen fabric, knitted blanket, or light wooden table). Each Polaroid should have the classic white border with the wider bottom section. The photos should show different moments and angles of the same subject from the uploaded image — close-up, full body, candid, profile, from behind — as if capturing a day of memories. The Polaroids should be slightly overlapping, rotated at natural angles, with some tilted more than others. Add soft, warm, natural window lighting casting gentle shadows. Include small aesthetic props between the photos: dried flowers, a cup of coffee, a pen, sunglasses, or a small notebook. Color palette: warm, slightly faded tones with a nostalgic film quality. The overall mood should feel like a cozy, intimate memory board — personal and Pinterest-worthy.`,
  },
  {
    id: "polaroid-held-against-scene",
    slug: "polaroid-held-against-real-scene",
    title: "Held Against Real Scene",
    tag: "Creative",
    description:
      "A Polaroid photo held up in front of the actual location where it was taken — the instant photo frames the subject while the real scene extends beyond.",
    imageUrl: "/prompts/polaroid-held-against-real-scene.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create a photo of a hand holding up a Polaroid instant photo in front of the real-life scene where the original image was taken. The Polaroid should have the classic white border with the wider bottom section and show a slightly faded, warm-toned version of the subject. The real background scene extends beyond the edges of the held Polaroid — creating a beautiful "photo within a photo" effect. The hand holding the Polaroid should be visible from a first-person perspective, slightly off-center. The Polaroid should be aligned so the scene in the photo matches and blends with the real background behind it. Add subtle depth of field — the Polaroid in focus, the background slightly soft. Warm, natural lighting. The overall effect should feel magical and nostalgic, as if holding a captured memory up to the real world. Slight film grain on the Polaroid image, no text on the border.`,
  },
  {
    id: "polaroid-photo-booth-strip",
    slug: "polaroid-photo-booth-strip",
    title: "Photo Booth Strip",
    tag: "Fun",
    description:
      "A vertical photo booth strip with 4 candid Polaroid-style frames — like those classic mall booth strips with sequential poses.",
    imageUrl: "/prompts/polaroid-photo-booth-strip.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create a vertical photo booth strip featuring 4 sequential Polaroid-style frames of the person from the uploaded photo. Each frame shows a different pose and expression: frame 1 — neutral/sweet smile looking at camera, frame 2 — silly face or tongue out, frame 3 — making a heart with fingers or peace sign, frame 4 — big laughing expression. The strip should have a classic photo booth layout: vertical format, thin white borders between each frame, slightly wider white border on the left and right edges. Each frame has that characteristic Polaroid/instant-film look — slightly warm, faded colors, subtle grain. The strip should appear to be hanging or resting against a surface with a slight curl at the bottom. Add a handwritten-style date stamp at the bottom of the strip. The overall mood is fun, candid, and nostalgic — like a keepsake from a day out with friends. Warm, soft lighting throughout.`,
  },
  {
    id: "polaroid-string-lights",
    slug: "polaroid-string-lights-wall-display",
    title: "String Lights Wall Display",
    tag: "Cozy",
    description:
      "Polaroid photos clipped to a string of fairy lights on a bedroom wall — a warm, dreamy display of favorite memories.",
    imageUrl: "/prompts/polaroid-string-lights-wall-display.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create a cozy scene of 5-6 Polaroid instant photos clipped with small wooden clothespins to a string of warm fairy lights hung across a bedroom wall. The wall should be a soft, warm neutral color (cream, light pink, or soft white). Each Polaroid has the classic white border with wider bottom and shows a different moment of the person from the uploaded photo — candid, smiling, laughing, a close-up, a full-body shot. The fairy lights cast a warm golden glow on the photos and the wall, creating soft bokeh in the background. The string of lights should drape naturally between small hooks or washi tape. Add small decorative elements: a dried flower tucked behind one clothespin, a small handwritten note on one Polaroid's border, tiny star decorations. The photos should have that vintage, slightly faded instant-film quality with warm tones and subtle grain. The overall mood is intimate, dreamy, and personal — a late-night bedroom aesthetic, warm and nostalgic. Soft ambient lighting throughout.`,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function PolaroidPromptClient() {
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
      ? `${window.location.origin}/polaroid-prompt?ref=share`
      : "https://drawprompt.org/polaroid-prompt?ref=share";

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(
      "I made my photos look like vintage Polaroids with this — try it:"
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
    <div className="pl-page">
      <style jsx global>{`
        /* ═══════════════════════════════════════════════════════════════════
           Polaroid Prompt — Page Styles
           Structure: Hero (split) → Horizontal Strip → Editor → Share → More → SEO → FAQ → Footer
           ═══════════════════════════════════════════════════════════════════ */

        .pl-page {
          --pl-fg: #1c1917;
          --pl-fg-2: #57534e;
          --pl-fg-3: #a8a29e;
          --pl-bg: #fafaf9;
          --pl-surface: #ffffff;
          --pl-border: #e7e5e4;
          --pl-accent: #b45309;
          --pl-accent-light: #fef3c7;
          --pl-accent-hover: #92400e;
          --pl-warm: #d97706;
          --radius: 16px;
          background: var(--pl-bg);
          min-height: 100vh;
          color: var(--pl-fg);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        /* ─── Section shared ─── */
        .pl-section-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--pl-accent);
          margin: 0 0 8px;
        }
        .pl-section-title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          margin: 0 0 6px;
          color: var(--pl-fg);
        }

        /* ─── Hero: Split layout (text left, image right) ─── */
        .pl-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 24px 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .pl-hero-text { max-width: 520px; }
        .pl-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          background: var(--pl-accent-light);
          color: var(--pl-accent);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          margin-bottom: 20px;
        }
        .pl-hero h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin: 0 0 20px;
        }
        .pl-hero h1 .pl-gradient {
          background: linear-gradient(135deg, var(--pl-accent), var(--pl-warm));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pl-hero-desc {
          font-size: 1.05rem;
          color: var(--pl-fg-2);
          line-height: 1.7;
          margin: 0 0 32px;
        }
        .pl-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: var(--pl-accent);
          color: #fff;
          border: none;
          border-radius: 100px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .pl-hero-cta:hover { background: var(--pl-accent-hover); transform: translateY(-1px); }
        .pl-hero-image-wrap {
          position: relative;
          border-radius: var(--radius);
          overflow: hidden;
          aspect-ratio: 4/3;
          cursor: pointer;
          box-shadow: 0 24px 80px rgba(180,83,9,0.12), 0 8px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s;
        }
        .pl-hero-image-wrap:hover { transform: scale(1.01); }
        .pl-hero-img-badge {
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

        /* ─── Horizontal scroll strip ─── */
        .pl-strip {
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 0 0;
        }
        .pl-strip-header {
          padding: 0 24px;
          margin-bottom: 24px;
        }
        .pl-strip-scroll {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding: 0 24px 12px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .pl-strip-scroll::-webkit-scrollbar { display: none; }
        .pl-strip-card {
          flex: 0 0 260px;
          scroll-snap-align: start;
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--pl-surface);
          border: 2px solid transparent;
          cursor: pointer;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .pl-strip-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        .pl-strip-card.active {
          border-color: var(--pl-accent);
          box-shadow: 0 0 0 1px var(--pl-accent), 0 20px 60px rgba(180,83,9,0.15);
        }
        .pl-strip-card-image {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
        }
        .pl-strip-card-tag {
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
          color: var(--pl-accent);
          letter-spacing: 0.04em;
        }
        .pl-strip-card-body {
          padding: 16px;
        }
        .pl-strip-card-body h3 {
          font-size: 0.9rem;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .pl-strip-card-body p {
          font-size: 0.78rem;
          color: var(--pl-fg-3);
          margin: 0 0 12px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pl-strip-use {
          display: block;
          width: 100%;
          padding: 9px;
          border: 1px solid var(--pl-border);
          border-radius: 10px;
          background: var(--pl-surface);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--pl-fg-2);
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pl-strip-use:hover { border-color: var(--pl-accent); color: var(--pl-accent); }
        .pl-strip-card.active .pl-strip-use {
          background: var(--pl-accent);
          border-color: var(--pl-accent);
          color: #fff;
        }

        /* ─── Editor ─── */
        .pl-editor-section {
          max-width: 720px;
          margin: 0 auto;
          padding: 72px 24px 0;
        }
        .pl-editor-card {
          background: var(--pl-surface);
          border: 1px solid var(--pl-border);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .pl-editor-card textarea {
          width: 100%;
          min-height: 160px;
          padding: 20px;
          border: none;
          background: transparent;
          font-size: 0.88rem;
          line-height: 1.7;
          color: var(--pl-fg);
          resize: vertical;
          font-family: inherit;
          outline: none;
        }
        .pl-editor-card textarea::placeholder { color: var(--pl-fg-3); }
        .pl-editor-toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border-top: 1px solid var(--pl-border);
          background: #fafbfc;
        }
        .pl-upload-trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px dashed var(--pl-border);
          border-radius: 8px;
          background: transparent;
          font-size: 0.8rem;
          color: var(--pl-fg-2);
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .pl-upload-trigger:hover { border-color: var(--pl-accent); color: var(--pl-accent); }
        .pl-upload-trigger.has-file {
          border-style: solid;
          border-color: #86efac;
          background: #f0fdf4;
          color: #166534;
        }
        .pl-upload-trigger .preview-thumb {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          object-fit: cover;
        }
        .pl-upload-remove {
          background: none;
          border: none;
          font-size: 0.75rem;
          color: var(--pl-fg-3);
          cursor: pointer;
          text-decoration: underline;
          margin-left: 4px;
        }
        .pl-toolbar-spacer { flex: 1; }
        .pl-btn-copy {
          padding: 10px 16px;
          background: transparent;
          color: var(--pl-fg-2);
          border: 1px solid var(--pl-border);
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .pl-btn-copy:hover { border-color: var(--pl-accent); color: var(--pl-accent); }
        .pl-btn-generate {
          padding: 10px 28px;
          background: var(--pl-accent);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .pl-btn-generate:hover { background: var(--pl-accent-hover); }
        .pl-btn-generate:disabled { opacity: 0.4; cursor: not-allowed; }
        .pl-editor-hint {
          margin-top: 14px;
          font-size: 0.78rem;
          color: var(--pl-fg-3);
          line-height: 1.6;
        }
        .pl-editor-hint a { color: var(--pl-accent); text-decoration: none; }
        .pl-editor-hint a:hover { text-decoration: underline; }

        /* ─── Share ─── */
        .pl-share-section {
          max-width: 720px;
          margin: 0 auto;
          padding: 56px 24px 0;
        }
        .pl-share-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          padding: 24px;
          background: var(--pl-surface);
          border: 1px solid var(--pl-border);
          border-radius: var(--radius);
        }
        .pl-share-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--pl-fg);
          margin-right: 8px;
        }
        .pl-share-btn {
          padding: 8px 16px;
          border: 1px solid var(--pl-border);
          border-radius: 100px;
          background: var(--pl-surface);
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--pl-fg-2);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .pl-share-btn:hover { border-color: var(--pl-accent); color: var(--pl-accent); }

        /* ─── More Prompts (image card grid) ─── */
        .pl-more {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 24px 0;
        }
        .pl-more-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 24px;
        }
        .pl-more-card {
          display: block;
          background: var(--pl-surface);
          border: 1px solid var(--pl-border);
          border-radius: var(--radius);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .pl-more-card:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .pl-more-card-image {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
        }
        .pl-more-card-body {
          padding: 14px 16px;
        }
        .pl-more-card-body h3 {
          font-size: 0.82rem;
          font-weight: 700;
          margin: 0 0 4px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pl-more-card-body p {
          font-size: 0.72rem;
          color: var(--pl-fg-3);
          margin: 0;
          line-height: 1.4;
        }
        .pl-more-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
          padding: 12px 28px;
          border: 1px solid var(--pl-border);
          border-radius: 100px;
          background: var(--pl-surface);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--pl-fg);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .pl-more-cta:hover { border-color: var(--pl-accent); color: var(--pl-accent); transform: translateY(-1px); }

        /* ─── SEO content block ─── */
        .pl-seo-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 72px 24px 0;
        }
        .pl-seo-content h2 {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0 0 16px;
          color: var(--pl-fg);
        }
        .pl-seo-content p {
          font-size: 0.92rem;
          color: var(--pl-fg-2);
          line-height: 1.8;
          margin: 0 0 16px;
        }
        .pl-seo-content a {
          color: var(--pl-accent);
          text-decoration: none;
        }
        .pl-seo-content a:hover { text-decoration: underline; }

        /* ─── FAQ ─── */
        .pl-faq {
          max-width: 720px;
          margin: 0 auto;
          padding: 80px 24px 56px;
        }
        .pl-faq-item {
          border-bottom: 1px solid var(--pl-border);
          padding: 24px 0;
        }
        .pl-faq-item:first-of-type { border-top: 1px solid var(--pl-border); }
        .pl-faq-item h3 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0 0 10px;
          color: var(--pl-fg);
        }
        .pl-faq-item p {
          font-size: 0.88rem;
          color: var(--pl-fg-2);
          line-height: 1.7;
          margin: 0;
        }

        /* ─── Footer ─── */
        .pl-footer {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 24px 56px;
          font-size: 0.78rem;
          color: var(--pl-fg-3);
          line-height: 1.7;
        }
        .pl-footer a { color: var(--pl-accent); text-decoration: none; }
        .pl-footer a:hover { text-decoration: underline; }

        /* ─── Responsive ─── */
        @media (max-width: 768px) {
          .pl-hero {
            grid-template-columns: 1fr;
            padding: 48px 20px 0;
            gap: 32px;
          }
          .pl-hero-text { max-width: 100%; }
          .pl-hero h1 { font-size: 1.8rem; }
          .pl-hero-image-wrap { aspect-ratio: 4/3; }
          .pl-strip { padding: 48px 0 0; }
          .pl-strip-card { flex: 0 0 240px; }
          .pl-editor-section { padding: 48px 20px 0; }
          .pl-editor-toolbar { flex-wrap: wrap; }
          .pl-btn-generate { width: 100%; text-align: center; }
          .pl-more-grid { grid-template-columns: 1fr 1fr; }
          .pl-seo-content { padding: 48px 20px 0; }
          .pl-share-row { justify-content: center; }
        }
      `}</style>

      {/* ═══ Hero: Split Layout — Text Left + Featured Image Right ═══ */}
      <section className="pl-hero">
        <div className="pl-hero-text">
          <div className="pl-hero-badge">📷 AI Polaroid Trend</div>
          <h1>
            Best <span className="pl-gradient">AI Polaroid Prompt</span> &amp;
            Instant Film Effect Maker
          </h1>
          <p className="pl-hero-desc">
            The internet&apos;s hottest AI photo trend — turn your photos into dreamy Polaroid instant-film
            memories. Vintage singles, scattered flatlays, photo-within-photo, booth strips &amp; string
            light walls. Five viral Polaroid styles, free prompt maker, one click to generate.
          </p>
          <button
            className="pl-hero-cta"
            onClick={() => handleSelectTemplate(TEMPLATES[0])}
          >
            Try Vintage Instant Photo →
          </button>
        </div>
        <div
          className="pl-hero-image-wrap"
          onClick={() => handleSelectTemplate(TEMPLATES[0])}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") handleSelectTemplate(TEMPLATES[0]); }}
        >
          <span className="pl-hero-img-badge">#1 Most Popular</span>
          <Image
            src={TEMPLATES[0].imageUrl}
            alt="AI Polaroid Vintage Instant Photo — viral instant film effect showing a Polaroid-style photo"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </section>

      {/* ═══ Horizontal Scroll Strip: Other 4 Styles ═══ */}
      <section className="pl-strip">
        <div className="pl-strip-header">
          <p className="pl-section-label">More Polaroid Styles</p>
          <h2 className="pl-section-title">Pick Your Favorite AI Polaroid Prompt Style</h2>
        </div>
        <div className="pl-strip-scroll">
          {TEMPLATES.slice(1).map((t) => (
            <div
              key={t.id}
              className={`pl-strip-card ${selectedTemplate?.id === t.id ? "active" : ""}`}
              onClick={() => handleSelectTemplate(t)}
            >
              <div className="pl-strip-card-image">
                <span className="pl-strip-card-tag">{t.tag}</span>
                <Image
                  src={t.imageUrl}
                  alt={`${t.title} — AI polaroid prompt style`}
                  fill
                  sizes="260px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="pl-strip-card-body">
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <button
                  className="pl-strip-use"
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
      <section className="pl-editor-section" ref={editorRef}>
        <p className="pl-section-label">Free Polaroid Prompt Maker</p>
        <h2 className="pl-section-title" style={{ marginBottom: 24 }}>
          {selectedTemplate ? `Polaroid Maker: ${selectedTemplate.title}` : "Select a Polaroid style above to start"}
        </h2>

        <div className="pl-editor-card">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Pick a Polaroid style above to load its prompt, or write your own instant film prompt here…"
          />
          <div className="pl-editor-toolbar">
            {selectedTemplate?.needsPhoto !== false && (
              <div
                className={`pl-upload-trigger ${referenceImage ? "has-file" : ""}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {referenceImage ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={referenceImage} alt="" className="preview-thumb" />
                    <span>{referenceFileName}</span>
                    <button
                      className="pl-upload-remove"
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
            <div className="pl-toolbar-spacer" />
            <button className="pl-btn-copy" onClick={handleCopyPrompt}>
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              className="pl-btn-generate"
              onClick={handleGenerate}
              disabled={!prompt.trim()}
            >
              Generate Polaroid
            </button>
          </div>
        </div>
        <p className="pl-editor-hint">
          Pro tip: paste this prompt into{" "}
          <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer">ChatGPT</a>{" "}
          with your photo for the same result. Works with GPT Image 2.
        </p>
      </section>

      {/* ═══ Share ═══ */}
      <section className="pl-share-section">
        <div className="pl-share-row">
          <span className="pl-share-label">Share this collection:</span>
          <button className="pl-share-btn" onClick={() => handleShare("twitter")}>X / Twitter</button>
          <button className="pl-share-btn" onClick={() => handleShare("facebook")}>Facebook</button>
          <button className="pl-share-btn" onClick={() => handleShare("whatsapp")}>WhatsApp</button>
          <button className="pl-share-btn" onClick={() => handleShare("copy")}>
            {copiedShare ? "Copied!" : "Copy link"}
          </button>
        </div>
      </section>

      {/* ═══ More AI Prompts You Might Like ═══ */}
      <section className="pl-more">
        <p className="pl-section-label">Explore More</p>
        <h2 className="pl-section-title">Trending AI Art Prompts to Try Next</h2>
        <div className="pl-more-grid">
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
            <Link key={item.slug} href={`/prompts/${item.slug}`} className="pl-more-card">
              <div className="pl-more-card-image">
                <Image
                  src={`/prompts/${item.slug}.jpg`}
                  alt={`${item.title} — AI art prompt`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
              <div className="pl-more-card-body">
                <h3>{item.title}</h3>
                <p>{item.cat}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <Link href="/ai-prompts" className="pl-more-cta">
            Browse all AI prompts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* ═══ SEO Content: What is AI Polaroid? ═══ */}
      <section className="pl-seo-content">
        <h2>What Is an AI Polaroid Prompt? The Instant Film Photo Trend Explained</h2>
        <p>
          An <strong>AI Polaroid prompt</strong> is a text instruction that tells AI image generators like
          ChatGPT to transform your photo into a realistic Polaroid or instant-film style image — complete
          with the iconic white border, faded colors, film grain, and that dreamy, nostalgic quality of
          real instant film. The Polaroid aesthetic has been a beloved photography style since the original
          Polaroid cameras of the 1940s, and it&rsquo;s now one of the biggest AI photo trends of 2025.
        </p>
        <p>
          In 2025, <strong>Polaroid prompts</strong> have exploded across social media. The trend started
          with simple vintage single-shot Polaroids and quickly expanded to creative compositions like
          scattered memory flatlays, the viral &ldquo;photo-within-a-photo&rdquo; held-against-scene effect,
          classic photo booth strips, and cozy string-lights wall displays. Google Trends shows{" "}
          <strong>&ldquo;AI Polaroid prompt&rdquo;</strong> surging +380% and{" "}
          <strong>&ldquo;Polaroid effect prompt&rdquo;</strong> hitting breakout status in the past month.
        </p>
        <p>
          That&rsquo;s why we built this free <strong>Polaroid prompt maker</strong>: pick one of five viral{" "}
          <strong>instant film styles</strong>, upload your photo, and generate in one click using{" "}
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
      <section className="pl-faq">
        <h2 className="pl-section-title" style={{ marginBottom: 0 }}>AI Polaroid Prompt FAQ — Common Questions</h2>
        <div className="pl-faq-item">
          <h3>What is an AI Polaroid prompt?</h3>
          <p>
            An AI Polaroid prompt is a text instruction you give to AI image generators like ChatGPT with
            GPT Image 2 to create realistic Polaroid or instant-film style images. These prompts specify
            the characteristic white border, faded colors, film grain, vignette effects, and nostalgic
            analog quality that make photos look like they were taken with a real instant camera.
          </p>
        </div>
        <div className="pl-faq-item">
          <h3>How do I use these Polaroid effect prompts?</h3>
          <p>
            Pick a Polaroid style you like, click &ldquo;Use this prompt&rdquo; to load it into our free
            Polaroid prompt maker, upload your photo, then hit &ldquo;Generate Polaroid.&rdquo; You can also
            copy the prompt and paste it directly into ChatGPT along with your photo for the same result.
          </p>
        </div>
        <div className="pl-faq-item">
          <h3>Is this Polaroid prompt maker free?</h3>
          <p>
            Yes — browsing and copying all Polaroid prompts is completely free. To generate on DrawPrompt
            directly, free users get limited generations per day. You can also paste any prompt into ChatGPT
            (Plus, Pro, or Team) to generate with GPT Image 2 at no extra cost.
          </p>
        </div>
        <div className="pl-faq-item">
          <h3>Which Polaroid style is the most popular right now?</h3>
          <p>
            The &ldquo;Vintage Instant Photo&rdquo; style is currently the most viral AI Polaroid prompt —
            it creates a single, classic Polaroid with the iconic white border and faded colors. The
            &ldquo;Held Against Real Scene&rdquo; photo-within-a-photo effect and the &ldquo;Scattered
            Memories Flatlay&rdquo; are also trending fast on Instagram and TikTok.
          </p>
        </div>
        <div className="pl-faq-item">
          <h3>Can I use these Polaroid prompts with Midjourney?</h3>
          <p>
            These prompts are optimized for GPT Image 2 via ChatGPT, but many Polaroid effect prompts work
            with Midjourney or DALL-E with minor adjustments. The photo-upload features (like preserving your
            face in the Polaroid style) work best with GPT Image 2 since it can process reference images
            directly.
          </p>
        </div>
        <div className="pl-faq-item">
          <h3>What makes a good AI Polaroid prompt?</h3>
          <p>
            A great AI Polaroid prompt should specify the instant-film style details (white border width,
            color fading, grain, vignette), the composition (single photo, flatlay, held in hand, booth
            strip, wall display), the mood (vintage, cozy, nostalgic, dreamy), and how to handle the
            uploaded photo (preserve identity, apply film effects). Our templates include all of these
            elements so you get consistent, high-quality Polaroid results every time.
          </p>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="pl-footer">
        <p>
          <Link href="/">DrawPrompt</Link> — the best AI Polaroid prompts for instant film photo effects.
          Browse <Link href="/ai-prompts">all prompts</Link>,
          try <Link href="/gpt-image-2-prompts">GPT Image 2 prompts</Link>,
          or make a <Link href="/chibi-prompt">chibi photo</Link>.
        </p>
      </footer>
    </div>
  );
}