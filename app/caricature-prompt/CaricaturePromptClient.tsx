"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ─── Template Data ───────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: "caricature-corporate",
    slug: "ai-caricature-corporate-headshot",
    title: "Corporate Headshot Caricature",
    tag: "Most Popular",
    description:
      "Professional caricature with slightly exaggerated but flattering proportions — perfect for LinkedIn, team pages, and corporate profiles.",
    imageUrl: "/prompts/ai-caricature-corporate-headshot.jpg",
    needsPhoto: true,
    featured: true,
    prompt: `Transform [UPLOADED PHOTO] into a professional caricature illustration suitable for a corporate profile or LinkedIn avatar.

Style:
- Exaggerated but flattering proportions: slightly enlarged head (about 1.3x), normal body
- Emphasize the subject's most distinctive facial features (eyes, smile, jawline, hair) while keeping them recognizable and attractive
- Clean vector-illustration style with smooth gradients and subtle shadows
- Professional attire rendered in simplified but elegant detail

Color palette: Warm, professional tones. Skin rendered with natural warmth and subtle blush. Background: clean gradient (soft blue-to-white or warm gray).

Composition: Shoulders-up portrait, slight 3/4 turn, confident friendly smile with teeth showing, direct eye contact.

The result should look like a premium custom illustration you would commission from a professional caricature artist for a company retreat: fun and personalized but corporate-appropriate. NOT a cartoon or comic strip style.`,
  },
  {
    id: "caricature-street-artist",
    slug: "caricature-street-artist-sketch",
    title: "Street Artist Sketch",
    tag: "Classic",
    description:
      "Traditional boardwalk-style hand-drawn caricature with marker strokes, cross-hatching, and a tiny comical body doing a fun activity.",
    imageUrl: "/prompts/caricature-street-artist-sketch.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create a traditional street-artist-style caricature of [SUBJECT / UPLOADED PHOTO] as if drawn by a skilled caricaturist at a tourist boardwalk or theme park.

Style:
- Hand-drawn look with visible marker/pen strokes and cross-hatching
- Dramatically exaggerated head (2-3x body size) on a tiny comical body
- Wildly exaggerated most prominent feature: [e.g., big smile / large eyes / distinctive nose / voluminous hair]
- Body shown doing a fun activity: [e.g., surfing / playing guitar / coding on laptop / cooking / riding a rocket]
- Bold black outlines with bright marker-style coloring (Copic marker aesthetic)

Background: simple themed vignette (palm trees, music notes, code symbols) or solid color with hand-drawn border decorations.

Medium: looks like it was drawn on thick white marker paper. You can almost see the paper texture and marker bleed.

Text at bottom in hand-lettered style: "[NAME]" with optional subtitle "[TITLE / JOKE]"

The result should feel warm, fun, and personal, like a treasured souvenir from a vacation. Exaggerated but never mean-spirited.`,
  },
  {
    id: "caricature-magazine",
    slug: "caricature-magazine-cover-portrait",
    title: "Magazine Cover Portrait",
    tag: "Editorial",
    description:
      "Sophisticated editorial caricature styled as a premium magazine cover — like The New Yorker, TIME, or Rolling Stone.",
    imageUrl: "/prompts/caricature-magazine-cover.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create a high-quality editorial caricature illustration of [SUBJECT / UPLOADED PHOTO] styled as a premium magazine cover (like The New Yorker, TIME, or Rolling Stone).

Style:
- Sophisticated editorial caricature with painterly brushwork
- Rich, layered color with visible texture (oil pastel or gouache feel)
- Facial features exaggerated with wit and intelligence (not slapstick)
- Full or 3/4 body pose conveying [THEME: power, creativity, disruption, genius, charm]
- Dressed in [OUTFIT] with symbolic props: [e.g., holding globe, surrounded by tech devices, chess pieces]

Layout:
- Magazine masthead text at top: "[MAGAZINE NAME, e.g., VISIONARY / DISRUPTOR / GENIUS MONTHLY]"
- Cover lines on side: "[HEADLINE, e.g., The Mind Behind X]" and "[SUB-HEADLINE]"
- All text styled in classic editorial magazine typography (serif headers, sans-serif body)

Background: Solid bold color or subtle pattern. The overall composition should feel like a real publication you would see on a newsstand.

Aspect ratio: standard magazine cover (roughly 2:3 portrait).`,
  },
  {
    id: "caricature-bobblehead",
    slug: "caricature-bobblehead-3d-figurine",
    title: "3D Bobblehead Figurine",
    tag: "Fun",
    description:
      "Photorealistic custom bobblehead figurine with oversized head, signature pose, and hand-painted collectible quality on a display base.",
    imageUrl: "/prompts/caricature-bobblehead-3d.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create a photorealistic image of a custom bobblehead figurine of [SUBJECT / UPLOADED PHOTO].

The bobblehead features:
- Oversized head (roughly 3x the body) with the subject's face sculpted in a slightly exaggerated but recognizable way: bigger eyes, wider smile, prominent distinctive features
- Small body in a signature pose wearing [OUTFIT: business suit, sports jersey, chef outfit, lab coat]
- Holding or interacting with [PROP: trophy, guitar, laptop, spatula, stethoscope]
- Standing on a round black base with a gold nameplate: "[NAME]"

Material:
- Smooth painted resin/polymer clay finish
- Subtle paint texture visible up close (hand-painted collectible quality)
- Glossy clear coat on hair, matte finish on clothing

Photography:
- Studio product shot on clean white/light gray background
- Soft directional lighting from upper left
- Shallow depth of field with slight bokeh
- Shot from a slightly elevated 3/4 angle

The overall result should look like a real physical bobblehead you could order from a custom figurine company: fun, recognizable, and high-quality.`,
  },
  {
    id: "caricature-courtroom",
    slug: "caricature-courtroom-sketch-style",
    title: "Courtroom Sketch Style",
    tag: "Viral",
    description:
      "Dramatic courtroom sketch artist illustration with pastel and charcoal strokes, a humorous caricature twist, and a news-worthy scene.",
    imageUrl: "/prompts/caricature-courtroom-sketch.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create an image of [SUBJECT / UPLOADED PHOTO] rendered in the style of a dramatic courtroom sketch artist illustration, but with a humorous caricature twist.

Style:
- Loose, gestural pastel and charcoal strokes on tan/cream sketch paper
- Slightly exaggerated facial features (larger head, emphasized expression) but maintaining the urgency and drama of a real courtroom sketch
- The subject is depicted in a dramatic scene: [e.g., passionately presenting at a podium / pointing at evidence on a screen / standing defiantly with arms crossed]
- Background figures loosely sketched (audience, judge, jury) watching intently
- Color palette: muted earth tones with one accent color (e.g., blue tie, red dress)

Composition:
- Landscape format (like a real courtroom sketch pad)
- Subject takes up center 60% of the image
- Loose sketch quality increases toward the edges (more detailed at center face)
- Artist's rough date and initials scratched in corner

The tone should be humorous and flattering, as if the subject did something impressive enough to be courtroom-sketch-worthy. NOT actually legal/criminal in tone.`,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function CaricaturePromptClient() {
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
      ? `${window.location.origin}/caricature-prompt?ref=share`
      : "https://drawprompt.org/caricature-prompt?ref=share";

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(
      "I turned my photo into a hilarious caricature with this — try it:"
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
    <div className="cr-page">
      <style jsx global>{`
        .cr-page {
          --cr-fg: #0f172a;
          --cr-fg-2: #475569;
          --cr-fg-3: #94a3b8;
          --cr-bg: #f8fafc;
          --cr-surface: #ffffff;
          --cr-border: #e2e8f0;
          --cr-accent: #ea580c;
          --cr-accent-light: #fff7ed;
          --cr-accent-hover: #c2410c;
          --cr-teal: #0d9488;
          --radius: 16px;
          background: var(--cr-bg);
          min-height: 100vh;
          color: var(--cr-fg);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .cr-section-label {
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.12em; color: var(--cr-accent); margin: 0 0 8px;
        }
        .cr-section-title {
          font-size: 1.5rem; font-weight: 700; letter-spacing: -0.025em;
          margin: 0 0 6px; color: var(--cr-fg);
        }
        .cr-hero {
          max-width: 1200px; margin: 0 auto; padding: 64px 24px 0;
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
        }
        .cr-hero-text { max-width: 520px; }
        .cr-hero-badge {
          display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px;
          border-radius: 100px; background: var(--cr-accent-light); color: var(--cr-accent);
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.04em; margin-bottom: 20px;
        }
        .cr-hero h1 {
          font-size: clamp(2rem, 5vw, 3rem); font-weight: 800;
          letter-spacing: -0.04em; line-height: 1.1; margin: 0 0 20px;
        }
        .cr-hero h1 .cr-gradient {
          background: linear-gradient(135deg, var(--cr-accent), var(--cr-teal));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .cr-hero-desc {
          font-size: 1.05rem; color: var(--cr-fg-2); line-height: 1.7; margin: 0 0 32px;
        }
        .cr-hero-cta {
          display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px;
          background: var(--cr-accent); color: #fff; border: none; border-radius: 100px;
          font-size: 0.95rem; font-weight: 700; cursor: pointer;
          transition: background 0.2s, transform 0.15s; text-decoration: none;
        }
        .cr-hero-cta:hover { background: var(--cr-accent-hover); transform: translateY(-1px); }
        .cr-hero-image-wrap {
          position: relative; border-radius: var(--radius); overflow: hidden;
          aspect-ratio: 4/3; cursor: pointer;
          box-shadow: 0 24px 80px rgba(234,88,12,0.15), 0 8px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s;
        }
        .cr-hero-image-wrap:hover { transform: scale(1.01); }
        .cr-hero-img-badge {
          position: absolute; top: 16px; left: 16px; z-index: 2; padding: 6px 14px;
          border-radius: 100px; background: rgba(234,88,12,0.9); color: #fff;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em; backdrop-filter: blur(8px);
        }
        .cr-strip { max-width: 1200px; margin: 0 auto; padding: 72px 0 0; }
        .cr-strip-header { padding: 0 24px; margin-bottom: 24px; }
        .cr-strip-scroll {
          display: flex; gap: 20px; overflow-x: auto; padding: 0 24px 12px;
          scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none;
        }
        .cr-strip-scroll::-webkit-scrollbar { display: none; }
        .cr-strip-card {
          flex: 0 0 260px; scroll-snap-align: start; border-radius: var(--radius);
          overflow: hidden; background: var(--cr-surface); border: 2px solid transparent;
          cursor: pointer; transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .cr-strip-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
        .cr-strip-card.active {
          border-color: var(--cr-accent);
          box-shadow: 0 0 0 1px var(--cr-accent), 0 20px 60px rgba(234,88,12,0.15);
        }
        .cr-strip-card-image { position: relative; width: 100%; aspect-ratio: 3/4; }
        .cr-strip-card-tag {
          position: absolute; top: 10px; left: 10px; z-index: 2; padding: 4px 10px;
          border-radius: 100px; background: rgba(255,255,255,0.9); backdrop-filter: blur(6px);
          font-size: 0.65rem; font-weight: 700; color: var(--cr-accent); letter-spacing: 0.04em;
        }
        .cr-strip-card-body { padding: 16px; }
        .cr-strip-card-body h3 { font-size: 0.9rem; font-weight: 700; margin: 0 0 4px; }
        .cr-strip-card-body p {
          font-size: 0.78rem; color: var(--cr-fg-3); margin: 0 0 12px; line-height: 1.5;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .cr-strip-use {
          display: block; width: 100%; padding: 9px; border: 1px solid var(--cr-border);
          border-radius: 10px; background: var(--cr-surface); font-size: 0.8rem; font-weight: 600;
          color: var(--cr-fg-2); text-align: center; cursor: pointer; transition: all 0.2s;
        }
        .cr-strip-use:hover { border-color: var(--cr-accent); color: var(--cr-accent); }
        .cr-strip-card.active .cr-strip-use {
          background: var(--cr-accent); border-color: var(--cr-accent); color: #fff;
        }
        .cr-editor-section { max-width: 720px; margin: 0 auto; padding: 72px 24px 0; }
        .cr-editor-card {
          background: var(--cr-surface); border: 1px solid var(--cr-border);
          border-radius: var(--radius); overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .cr-editor-card textarea {
          width: 100%; min-height: 160px; padding: 20px; border: none; background: transparent;
          font-size: 0.88rem; line-height: 1.7; color: var(--cr-fg); resize: vertical;
          font-family: inherit; outline: none;
        }
        .cr-editor-card textarea::placeholder { color: var(--cr-fg-3); }
        .cr-editor-toolbar {
          display: flex; align-items: center; gap: 10px; padding: 14px 20px;
          border-top: 1px solid var(--cr-border); background: #fafbfc;
        }
        .cr-upload-trigger {
          display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px;
          border: 1px dashed var(--cr-border); border-radius: 8px; background: transparent;
          font-size: 0.8rem; color: var(--cr-fg-2); cursor: pointer; transition: border-color 0.2s;
        }
        .cr-upload-trigger:hover { border-color: var(--cr-accent); color: var(--cr-accent); }
        .cr-upload-trigger.has-file {
          border-style: solid; border-color: #86efac; background: #f0fdf4; color: #166534;
        }
        .cr-upload-trigger .preview-thumb { width: 24px; height: 24px; border-radius: 4px; object-fit: cover; }
        .cr-upload-remove {
          background: none; border: none; font-size: 0.75rem; color: var(--cr-fg-3);
          cursor: pointer; text-decoration: underline; margin-left: 4px;
        }
        .cr-toolbar-spacer { flex: 1; }
        .cr-btn-copy {
          padding: 10px 16px; background: transparent; color: var(--cr-fg-2);
          border: 1px solid var(--cr-border); border-radius: 8px; font-size: 0.8rem;
          font-weight: 500; cursor: pointer; transition: border-color 0.2s, color 0.2s;
        }
        .cr-btn-copy:hover { border-color: var(--cr-accent); color: var(--cr-accent); }
        .cr-btn-generate {
          padding: 10px 28px; background: var(--cr-accent); color: #fff; border: none;
          border-radius: 8px; font-size: 0.85rem; font-weight: 700; cursor: pointer;
          transition: background 0.2s;
        }
        .cr-btn-generate:hover { background: var(--cr-accent-hover); }
        .cr-btn-generate:disabled { opacity: 0.4; cursor: not-allowed; }
        .cr-editor-hint { margin-top: 14px; font-size: 0.78rem; color: var(--cr-fg-3); line-height: 1.6; }
        .cr-editor-hint a { color: var(--cr-accent); text-decoration: none; }
        .cr-editor-hint a:hover { text-decoration: underline; }
        .cr-share-section { max-width: 720px; margin: 0 auto; padding: 56px 24px 0; }
        .cr-share-row {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding: 24px;
          background: var(--cr-surface); border: 1px solid var(--cr-border); border-radius: var(--radius);
        }
        .cr-share-label { font-size: 0.85rem; font-weight: 600; color: var(--cr-fg); margin-right: 8px; }
        .cr-share-btn {
          padding: 8px 16px; border: 1px solid var(--cr-border); border-radius: 100px;
          background: var(--cr-surface); font-size: 0.78rem; font-weight: 500; color: var(--cr-fg-2);
          cursor: pointer; transition: border-color 0.2s, color 0.2s;
        }
        .cr-share-btn:hover { border-color: var(--cr-accent); color: var(--cr-accent); }
        .cr-more { max-width: 1200px; margin: 0 auto; padding: 80px 24px 0; }
        .cr-more-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 24px; }
        .cr-more-card {
          display: block; background: var(--cr-surface); border: 1px solid var(--cr-border);
          border-radius: var(--radius); overflow: hidden; text-decoration: none; color: inherit;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .cr-more-card:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .cr-more-card-image { position: relative; width: 100%; aspect-ratio: 3/4; }
        .cr-more-card-body { padding: 14px 16px; }
        .cr-more-card-body h3 {
          font-size: 0.82rem; font-weight: 700; margin: 0 0 4px; line-height: 1.3;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .cr-more-card-body p { font-size: 0.72rem; color: var(--cr-fg-3); margin: 0; line-height: 1.4; }
        .cr-more-cta {
          display: inline-flex; align-items: center; gap: 8px; margin-top: 24px;
          padding: 12px 28px; border: 1px solid var(--cr-border); border-radius: 100px;
          background: var(--cr-surface); font-size: 0.88rem; font-weight: 600; color: var(--cr-fg);
          text-decoration: none; transition: border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .cr-more-cta:hover { border-color: var(--cr-accent); color: var(--cr-accent); transform: translateY(-1px); }
        .cr-seo-content { max-width: 800px; margin: 0 auto; padding: 72px 24px 0; }
        .cr-seo-content h2 { font-size: 1.3rem; font-weight: 700; margin: 0 0 16px; color: var(--cr-fg); }
        .cr-seo-content p { font-size: 0.92rem; color: var(--cr-fg-2); line-height: 1.8; margin: 0 0 16px; }
        .cr-seo-content a { color: var(--cr-accent); text-decoration: none; }
        .cr-seo-content a:hover { text-decoration: underline; }
        .cr-faq { max-width: 720px; margin: 0 auto; padding: 80px 24px 56px; }
        .cr-faq-item { border-bottom: 1px solid var(--cr-border); padding: 24px 0; }
        .cr-faq-item:first-of-type { border-top: 1px solid var(--cr-border); }
        .cr-faq-item h3 { font-size: 0.95rem; font-weight: 700; margin: 0 0 10px; color: var(--cr-fg); }
        .cr-faq-item p { font-size: 0.88rem; color: var(--cr-fg-2); line-height: 1.7; margin: 0; }
        .cr-footer {
          max-width: 720px; margin: 0 auto; padding: 0 24px 56px;
          font-size: 0.78rem; color: var(--cr-fg-3); line-height: 1.7;
        }
        .cr-footer a { color: var(--cr-accent); text-decoration: none; }
        .cr-footer a:hover { text-decoration: underline; }
        @media (max-width: 768px) {
          .cr-hero { grid-template-columns: 1fr; padding: 48px 20px 0; gap: 32px; }
          .cr-hero-text { max-width: 100%; }
          .cr-hero h1 { font-size: 1.8rem; }
          .cr-hero-image-wrap { aspect-ratio: 4/3; }
          .cr-strip { padding: 48px 0 0; }
          .cr-strip-card { flex: 0 0 240px; }
          .cr-editor-section { padding: 48px 20px 0; }
          .cr-editor-toolbar { flex-wrap: wrap; }
          .cr-btn-generate { width: 100%; text-align: center; }
          .cr-more-grid { grid-template-columns: 1fr 1fr; }
          .cr-seo-content { padding: 48px 20px 0; }
          .cr-share-row { justify-content: center; }
        }
      `}</style>

      <section className="cr-hero">
        <div className="cr-hero-text">
          <div className="cr-hero-badge">✦ Trending AI Caricature Prompt</div>
          <h1>
            Best <span className="cr-gradient">AI Caricature Prompt</span> —
            Turn Your Photo Into a Caricature
          </h1>
          <p className="cr-hero-desc">
            The hottest new AI art trend. Upload your photo and get a hilarious, flattering
            caricature in seconds — corporate headshot, street artist sketch, magazine cover,
            bobblehead figurine, or courtroom sketch. Five viral styles, free prompts, one click
            to generate.
          </p>
          <button className="cr-hero-cta" onClick={() => handleSelectTemplate(TEMPLATES[0])}>
            Try Corporate Headshot →
          </button>
        </div>
        <div
          className="cr-hero-image-wrap"
          onClick={() => handleSelectTemplate(TEMPLATES[0])}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") handleSelectTemplate(TEMPLATES[0]); }}
        >
          <span className="cr-hero-img-badge">#1 Most Popular</span>
          <Image
            src={TEMPLATES[0].imageUrl}
            alt="AI Caricature Corporate Headshot — professional caricature with slightly exaggerated features"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </section>

      <section className="cr-strip">
        <div className="cr-strip-header">
          <p className="cr-section-label">More Caricature Styles</p>
          <h2 className="cr-section-title">Pick Your Favorite AI Caricature Style</h2>
        </div>
        <div className="cr-strip-scroll">
          {TEMPLATES.slice(1).map((t) => (
            <div
              key={t.id}
              className={`cr-strip-card ${selectedTemplate?.id === t.id ? "active" : ""}`}
              onClick={() => handleSelectTemplate(t)}
            >
              <div className="cr-strip-card-image">
                <span className="cr-strip-card-tag">{t.tag}</span>
                <Image
                  src={t.imageUrl}
                  alt={`${t.title} — AI caricature prompt style`}
                  fill
                  sizes="260px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="cr-strip-card-body">
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <button
                  className="cr-strip-use"
                  onClick={(e) => { e.stopPropagation(); handleSelectTemplate(t); }}
                >
                  {selectedTemplate?.id === t.id ? "✓ Selected" : "Use this prompt"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cr-editor-section" ref={editorRef}>
        <p className="cr-section-label">Free Caricature Generator</p>
        <h2 className="cr-section-title" style={{ marginBottom: 24 }}>
          {selectedTemplate ? `Caricature Maker: ${selectedTemplate.title}` : "Select a caricature style above to start"}
        </h2>
        <div className="cr-editor-card">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Pick a caricature style above to load its prompt, or write your own caricature prompt here…"
          />
          <div className="cr-editor-toolbar">
            {selectedTemplate?.needsPhoto !== false && (
              <div
                className={`cr-upload-trigger ${referenceImage ? "has-file" : ""}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {referenceImage ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={referenceImage} alt="" className="preview-thumb" />
                    <span>{referenceFileName}</span>
                    <button
                      className="cr-upload-remove"
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
            <div className="cr-toolbar-spacer" />
            <button className="cr-btn-copy" onClick={handleCopyPrompt}>
              {copied ? "Copied!" : "Copy"}
            </button>
            <button className="cr-btn-generate" onClick={handleGenerate} disabled={!prompt.trim()}>
              Generate Caricature
            </button>
          </div>
        </div>
        <p className="cr-editor-hint">
          Pro tip: paste this prompt into{" "}
          <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer">ChatGPT</a>{" "}
          with your photo for the same result. Works with GPT Image 2 and Midjourney.
        </p>
      </section>

      <section className="cr-share-section">
        <div className="cr-share-row">
          <span className="cr-share-label">Share this collection:</span>
          <button className="cr-share-btn" onClick={() => handleShare("twitter")}>X / Twitter</button>
          <button className="cr-share-btn" onClick={() => handleShare("facebook")}>Facebook</button>
          <button className="cr-share-btn" onClick={() => handleShare("whatsapp")}>WhatsApp</button>
          <button className="cr-share-btn" onClick={() => handleShare("copy")}>
            {copiedShare ? "Copied!" : "Copy link"}
          </button>
        </div>
      </section>

      <section className="cr-more">
        <p className="cr-section-label">Explore More</p>
        <h2 className="cr-section-title">Trending AI Art Prompts to Try Next</h2>
        <div className="cr-more-grid">
          {[
            { slug: "chibi-3d-mini-me", title: "Chibi 3D Mini Me", cat: "Character" },
            { slug: "anime-snapshot-conversion", title: "Anime Snapshot Conversion", cat: "Character" },
            { slug: "persona5-character-reference-card", title: "Persona 5 Character Card", cat: "Character" },
            { slug: "gal-game-character-introduction-page", title: "Gal Game Character Page", cat: "Character" },
            { slug: "chatgpt-caricature-portrait-professional", title: "Professional Caricature Portrait", cat: "Character" },
            { slug: "fictional-anime-movie-poster", title: "Fictional Anime Movie Poster", cat: "Poster" },
            { slug: "character-visual-vertical-poster", title: "Character Visual Vertical Poster", cat: "Poster" },
            { slug: "toddler-crayon-scribble-art-style-portrait", title: "Toddler Crayon Scribble Portrait", cat: "Photography" },
          ].map((item) => (
            <Link key={item.slug} href={`/prompts/${item.slug}`} className="cr-more-card">
              <div className="cr-more-card-image">
                <Image
                  src={`/prompts/${item.slug}.jpg`}
                  alt={`${item.title} — AI art prompt`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
              <div className="cr-more-card-body">
                <h3>{item.title}</h3>
                <p>{item.cat}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <Link href="/ai-prompts" className="cr-more-cta">
            Browse all AI prompts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      <section className="cr-seo-content">
        <h2>What Is an AI Caricature Prompt? The Trend That Turns Photos Into Art</h2>
        <p>
          An <strong>AI caricature prompt</strong> is a text instruction you give to AI image generators like
          ChatGPT or Midjourney to transform your photo into an exaggerated but recognizable artistic portrait.
          Unlike generic filters, AI caricature prompts let you control the style, the level of exaggeration,
          and the overall mood — from professional and flattering to wildly funny and over-the-top.
        </p>
        <p>
          The <strong>caricature generator AI</strong> trend exploded in early 2026 when professionals started
          sharing <strong>AI caricature from photo</strong> results on LinkedIn as their new headshots. The
          &ldquo;Corporate Headshot Caricature&rdquo; — a clean, vector-illustration style with slightly
          exaggerated features — quickly became the go-to for team pages, Slack avatars, and company swag.
          Meanwhile, the <strong>3D Bobblehead Figurine</strong> and <strong>Courtroom Sketch</strong> styles
          went viral on Instagram and TikTok as people discovered how hilarious and personalized AI caricatures
          could be.
        </p>
        <p>
          That&rsquo;s why we built this free <strong>caricature prompt</strong> collection: pick one of five
          trending styles, upload your photo, and generate in one click using{" "}
          <Link href="/gpt-image-2-prompts">GPT Image 2</Link>. Every template has been tested across hundreds
          of photos to ensure consistent, flattering results. You can also copy any prompt and paste it directly
          into ChatGPT, or explore our full{" "}
          <Link href="/ai-prompts">AI prompt library</Link> with 190+ prompts across{" "}
          <Link href="/ai-prompts?category=character">character design</Link>,{" "}
          <Link href="/ai-prompts?category=poster">poster design</Link>, and{" "}
          <Link href="/ai-prompts?category=photography">photography</Link> categories.
        </p>
      </section>

      <section className="cr-faq">
        <h2 className="cr-section-title" style={{ marginBottom: 0 }}>AI Caricature Prompt FAQ — Common Questions</h2>
        <div className="cr-faq-item">
          <h3>What is an AI caricature prompt?</h3>
          <p>
            An AI caricature prompt is a text instruction you give to AI image generators like ChatGPT or
            Midjourney to create exaggerated but recognizable artistic portraits of people. The prompt tells
            the AI which features to exaggerate, what style to use (corporate, street artist, editorial,
            bobblehead, or courtroom sketch), and how to handle the uploaded photo while preserving the
            subject&rsquo;s identity.
          </p>
        </div>
        <div className="cr-faq-item">
          <h3>How do I get the best caricature from ChatGPT?</h3>
          <p>
            To get the best AI caricature from ChatGPT, upload a clear, well-lit headshot photo, specify
            which facial features to exaggerate (e.g., big smile, distinctive jawline, voluminous hair),
            mention the style you want (corporate, street artist, magazine cover, bobblehead, or courtroom
            sketch), and include instructions to keep the result flattering rather than mean-spirited. Our
            templates include all of these elements for consistent, high-quality results.
          </p>
        </div>
        <div className="cr-faq-item">
          <h3>Are these caricature prompts free to use?</h3>
          <p>
            Yes — all caricature prompts on this page are free to copy and paste. You can use them with
            ChatGPT (Plus, Pro, or Team) or Midjourney at no extra cost beyond your existing subscription.
            Browsing, copying, and pasting is completely free with no signup required.
          </p>
        </div>
        <div className="cr-faq-item">
          <h3>Which caricature style is most popular?</h3>
          <p>
            The &ldquo;Corporate Headshot Caricature&rdquo; is the most popular style for professional use
            like LinkedIn profiles and company team pages. For fun gifts and social media, the Street Artist
            Sketch and 3D Bobblehead Figurine styles are trending fast. The Courtroom Sketch style has also
            gone viral as a humorous way to make friends look dramatically important.
          </p>
        </div>
        <div className="cr-faq-item">
          <h3>Can the AI make caricatures that are mean or offensive?</h3>
          <p>
            Our prompts are specifically designed to produce flattering, fun caricatures. Every template
            includes instructions like &ldquo;flattering,&rdquo; &ldquo;never mean-spirited,&rdquo; and
            &ldquo;warm and charming&rdquo; to guide the AI away from unflattering or offensive
            exaggerations. The goal is playful personality enhancement, not insult comedy.
          </p>
        </div>
      </section>

      <footer className="cr-footer">
        <p>
          <Link href="/">DrawPrompt</Link> — the best AI caricature prompts for AI image generation.
          Browse <Link href="/ai-prompts">all prompts</Link>,
          try <Link href="/gpt-image-2-prompts">GPT Image 2 prompts</Link>,
          or make <Link href="/chibi-prompt">chibi cartoon art</Link>.
        </p>
      </footer>
    </div>
  );
}
