"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ─── Template Data ───────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: "af-blister-pack",
    slug: "ai-action-figure-blister-pack",
    title: "Blister Pack Figure",
    tag: "Most Popular",
    description:
      "Your custom action figure sealed in retail blister packaging with accessories, just like finding yourself on a toy store shelf.",
    imageUrl: "/prompts/ai-action-figure-blister-pack.jpg",
    needsPhoto: true,
    featured: true,
    prompt: `Create a hyper-realistic product photograph of a custom action figure of [SUBJECT] inside sealed retail blister packaging. The figure is a highly detailed 6-inch scale collectible action figure with glossy plastic skin, accurate clothing sculpt, painted facial features matching the subject precisely, and articulated joints visible at shoulders and hips. Packaging: Clear molded plastic blister shell showing the figure. Printed cardboard backing with bold stylized logo text: "[NAME]" at the top. Tagline at bottom: "[OCCUPATION / TITLE / CATCHPHRASE]". Accessories displayed beside the figure in the blister: [e.g., laptop, coffee cup, phone, headphones]. Barcode, "Ages 25+" warning, and small brand logo in corner. Style: Professional product photography. Clean white studio background. Soft even lighting with subtle reflections on the plastic shell. Photorealistic.`,
  },
  {
    id: "af-diorama",
    slug: "action-figure-open-box-diorama",
    title: "Open Box Diorama",
    tag: "Premium",
    description:
      "A premium collectible figure in an open-front diorama box with LED lighting, themed backdrop, and limited edition nameplate.",
    imageUrl: "/prompts/action-figure-open-box-diorama.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create a photorealistic image of a premium collectible action figure displayed in an open-front box diorama. Subject: A highly detailed 1/6 scale action figure of [SUBJECT]. The figure has realistic face paint with accurate likeness, detailed fabric clothing (not molded plastic), multiple points of articulation, and a natural standing pose. Display box: Open-front premium collector display box. Interior themed diorama backdrop: [e.g., office desk scene / city skyline / workshop]. LED-style accent lighting built into the box (warm glow). Velvet or dark foam base with nameplate: "[NAME] — Limited Edition [NUMBER]/500". Shot from a slight 3/4 angle. Shallow depth of field. Dark moody background with dramatic contrast. The figure should look like a real Hot Toys or Sideshow Collectibles premium figurine.`,
  },
  {
    id: "af-toy-store",
    slug: "action-figure-toy-store-shelf",
    title: "Toy Store Shelf",
    tag: "Viral",
    description:
      "Your action figure spotted on a real toy store shelf among other toys, complete with price tag and NEW badge.",
    imageUrl: "/prompts/action-figure-toy-store-shelf.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Generate a photorealistic image showing a sealed action figure package on a real toy store shelf, as if you are browsing and spotted it among other toys. The action figure package features: A 6-inch figure of [SUBJECT] visible through the clear plastic window. The figure wears [OUTFIT] and holds [ACCESSORY]. Colorful printed cardboard packaging. Large bold title text: "[NAME]". Subtitle: "[Series name, e.g., Tech Titans Series]". "NEW!" starburst badge in corner. Environment: Toy store shelf with other slightly blurred action figure packages on either side. Shelf price tag visible below: "$24.99". Natural retail store fluorescent lighting. Shot from eye-level as if a shopper is looking at the toy. Style: candid retail photography feel, utterly realistic.`,
  },
  {
    id: "af-flatlay",
    slug: "action-figure-accessories-flatlay",
    title: "Accessories Flatlay",
    tag: "Collector",
    description:
      "Top-down flatlay of your unboxed figure with all accessories arranged symmetrically, like a collector review or unboxing video thumbnail.",
    imageUrl: "/prompts/action-figure-accessories-flatlay.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create a top-down flatlay photograph of an unboxed action figure and all its accessories laid out neatly on a clean surface. Center: A 6-inch action figure of [SUBJECT] lying flat, viewed from directly above. Arranged symmetrically around the figure: 2 alternate hand sets (open palms, fists, pointing, phone-holding), 1 alternate head sculpt with different expression, 3-4 character-specific accessories: [e.g., laptop, coffee mug, book, headphones], 1 display stand base with nameplate, 1 small collector card. Surface: clean matte black background. Lighting: even, shadowless product photography lighting from above. Style: professional collectible figure review / unboxing flatlay. Each item is spaced evenly with mathematical precision.`,
  },
  {
    id: "af-battle",
    slug: "action-figure-battle-scene-dynamic",
    title: "Dynamic Battle Scene",
    tag: "Epic",
    description:
      "Your figure in a dramatic action pose with cinematic lighting, sparks, and special effects, like premium toy photography.",
    imageUrl: "/prompts/action-figure-battle-scene-dynamic.jpg",
    needsPhoto: true,
    featured: false,
    prompt: `Create a dramatic action photograph of a highly detailed collectible action figure in a dynamic battle/action pose. Figure: A 1/6 scale premium action figure of [SUBJECT] in [OUTFIT]. The figure is captured mid-action with a dynamic pose. Fabric clothing shows realistic wrinkles from motion. Hair and accessories show wind-blown movement. Environment: [SETTING: rooftop with city lights / burning building / futuristic lab]. Practical effects: sparks, debris, dust particles, motion blur on background. Dramatic rim lighting from behind with colored glow. Camera: low angle looking up at the figure, wide aperture with bokeh background. Style: like a high-budget action movie still but it is clearly a real physical action figure with visible joint articulation points and glossy plastic skin texture.`,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ActionFigurePromptClient() {
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
      ? `${window.location.origin}/action-figure-prompt?ref=share`
      : "https://drawprompt.org/action-figure-prompt?ref=share";

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(
      "I turned myself into an action figure with this — try it:"
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
    <div className="af-page">
      <style jsx global>{`
        .af-page {
          --af-fg: #0f172a;
          --af-fg-2: #475569;
          --af-fg-3: #94a3b8;
          --af-bg: #f0f4ff;
          --af-surface: #ffffff;
          --af-border: #dbe4f8;
          --af-accent: #2563eb;
          --af-accent-light: #eff6ff;
          --af-accent-hover: #1d4ed8;
          --af-electric: #3b82f6;
          --af-cyan: #06b6d4;
          --radius: 16px;
          background: var(--af-bg);
          min-height: 100vh;
          color: var(--af-fg);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .af-section-label {
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.12em; color: var(--af-accent); margin: 0 0 8px;
        }
        .af-section-title {
          font-size: 1.5rem; font-weight: 700; letter-spacing: -0.025em;
          margin: 0 0 6px; color: var(--af-fg);
        }
        .af-hero {
          max-width: 1200px; margin: 0 auto; padding: 64px 24px 0;
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
        }
        .af-hero-text { max-width: 520px; }
        .af-hero-badge {
          display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px;
          border-radius: 100px; background: var(--af-accent-light); color: var(--af-accent);
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.04em; margin-bottom: 20px;
        }
        .af-hero h1 {
          font-size: clamp(2rem, 5vw, 3rem); font-weight: 800;
          letter-spacing: -0.04em; line-height: 1.1; margin: 0 0 20px;
        }
        .af-hero h1 .af-gradient {
          background: linear-gradient(135deg, var(--af-accent), var(--af-cyan));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .af-hero-desc {
          font-size: 1.05rem; color: var(--af-fg-2); line-height: 1.7; margin: 0 0 32px;
        }
        .af-hero-cta {
          display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px;
          background: var(--af-accent); color: #fff; border: none; border-radius: 100px;
          font-size: 0.95rem; font-weight: 700; cursor: pointer;
          transition: background 0.2s, transform 0.15s; text-decoration: none;
        }
        .af-hero-cta:hover { background: var(--af-accent-hover); transform: translateY(-1px); }
        .af-hero-image-wrap {
          position: relative; border-radius: var(--radius); overflow: hidden;
          aspect-ratio: 4/3; cursor: pointer;
          box-shadow: 0 24px 80px rgba(37,99,235,0.18), 0 8px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s;
        }
        .af-hero-image-wrap:hover { transform: scale(1.01); }
        .af-hero-img-badge {
          position: absolute; top: 16px; left: 16px; z-index: 2; padding: 6px 14px;
          border-radius: 100px; background: rgba(37,99,235,0.9); color: #fff;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em; backdrop-filter: blur(8px);
        }
        .af-strip { max-width: 1200px; margin: 0 auto; padding: 72px 0 0; }
        .af-strip-header { padding: 0 24px; margin-bottom: 24px; }
        .af-strip-scroll {
          display: flex; gap: 20px; overflow-x: auto; padding: 0 24px 12px;
          scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none;
        }
        .af-strip-scroll::-webkit-scrollbar { display: none; }
        .af-strip-card {
          flex: 0 0 260px; scroll-snap-align: start; border-radius: var(--radius);
          overflow: hidden; background: var(--af-surface); border: 2px solid transparent;
          cursor: pointer; transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .af-strip-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
        .af-strip-card.active {
          border-color: var(--af-accent);
          box-shadow: 0 0 0 1px var(--af-accent), 0 20px 60px rgba(37,99,235,0.18);
        }
        .af-strip-card-image { position: relative; width: 100%; aspect-ratio: 3/4; }
        .af-strip-card-tag {
          position: absolute; top: 10px; left: 10px; z-index: 2; padding: 4px 10px;
          border-radius: 100px; background: rgba(255,255,255,0.9); backdrop-filter: blur(6px);
          font-size: 0.65rem; font-weight: 700; color: var(--af-accent); letter-spacing: 0.04em;
        }
        .af-strip-card-body { padding: 16px; }
        .af-strip-card-body h3 { font-size: 0.9rem; font-weight: 700; margin: 0 0 4px; }
        .af-strip-card-body p {
          font-size: 0.78rem; color: var(--af-fg-3); margin: 0 0 12px; line-height: 1.5;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .af-strip-use {
          display: block; width: 100%; padding: 9px; border: 1px solid var(--af-border);
          border-radius: 10px; background: var(--af-surface); font-size: 0.8rem; font-weight: 600;
          color: var(--af-fg-2); text-align: center; cursor: pointer; transition: all 0.2s;
        }
        .af-strip-use:hover { border-color: var(--af-accent); color: var(--af-accent); }
        .af-strip-card.active .af-strip-use {
          background: var(--af-accent); border-color: var(--af-accent); color: #fff;
        }
        .af-editor-section { max-width: 720px; margin: 0 auto; padding: 72px 24px 0; }
        .af-editor-card {
          background: var(--af-surface); border: 1px solid var(--af-border);
          border-radius: var(--radius); overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .af-editor-card textarea {
          width: 100%; min-height: 160px; padding: 20px; border: none; background: transparent;
          font-size: 0.88rem; line-height: 1.7; color: var(--af-fg); resize: vertical;
          font-family: inherit; outline: none;
        }
        .af-editor-card textarea::placeholder { color: var(--af-fg-3); }
        .af-editor-toolbar {
          display: flex; align-items: center; gap: 10px; padding: 14px 20px;
          border-top: 1px solid var(--af-border); background: #f8faff;
        }
        .af-upload-trigger {
          display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px;
          border: 1px dashed var(--af-border); border-radius: 8px; background: transparent;
          font-size: 0.8rem; color: var(--af-fg-2); cursor: pointer; transition: border-color 0.2s;
        }
        .af-upload-trigger:hover { border-color: var(--af-accent); color: var(--af-accent); }
        .af-upload-trigger.has-file {
          border-style: solid; border-color: #93c5fd; background: #eff6ff; color: #1e40af;
        }
        .af-upload-trigger .preview-thumb { width: 24px; height: 24px; border-radius: 4px; object-fit: cover; }
        .af-upload-remove {
          background: none; border: none; font-size: 0.75rem; color: var(--af-fg-3);
          cursor: pointer; text-decoration: underline; margin-left: 4px;
        }
        .af-toolbar-spacer { flex: 1; }
        .af-btn-copy {
          padding: 10px 16px; background: transparent; color: var(--af-fg-2);
          border: 1px solid var(--af-border); border-radius: 8px; font-size: 0.8rem;
          font-weight: 500; cursor: pointer; transition: border-color 0.2s, color 0.2s;
        }
        .af-btn-copy:hover { border-color: var(--af-accent); color: var(--af-accent); }
        .af-btn-generate {
          padding: 10px 28px; background: var(--af-accent); color: #fff; border: none;
          border-radius: 8px; font-size: 0.85rem; font-weight: 700; cursor: pointer;
          transition: background 0.2s;
        }
        .af-btn-generate:hover { background: var(--af-accent-hover); }
        .af-btn-generate:disabled { opacity: 0.4; cursor: not-allowed; }
        .af-editor-hint { margin-top: 14px; font-size: 0.78rem; color: var(--af-fg-3); line-height: 1.6; }
        .af-editor-hint a { color: var(--af-accent); text-decoration: none; }
        .af-editor-hint a:hover { text-decoration: underline; }
        .af-share-section { max-width: 720px; margin: 0 auto; padding: 56px 24px 0; }
        .af-share-row {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding: 24px;
          background: var(--af-surface); border: 1px solid var(--af-border); border-radius: var(--radius);
        }
        .af-share-label { font-size: 0.85rem; font-weight: 600; color: var(--af-fg); margin-right: 8px; }
        .af-share-btn {
          padding: 8px 16px; border: 1px solid var(--af-border); border-radius: 100px;
          background: var(--af-surface); font-size: 0.78rem; font-weight: 500; color: var(--af-fg-2);
          cursor: pointer; transition: border-color 0.2s, color 0.2s;
        }
        .af-share-btn:hover { border-color: var(--af-accent); color: var(--af-accent); }
        .af-more { max-width: 1200px; margin: 0 auto; padding: 80px 24px 0; }
        .af-more-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 24px; }
        .af-more-card {
          display: block; background: var(--af-surface); border: 1px solid var(--af-border);
          border-radius: var(--radius); overflow: hidden; text-decoration: none; color: inherit;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .af-more-card:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .af-more-card-image { position: relative; width: 100%; aspect-ratio: 3/4; }
        .af-more-card-body { padding: 14px 16px; }
        .af-more-card-body h3 {
          font-size: 0.82rem; font-weight: 700; margin: 0 0 4px; line-height: 1.3;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .af-more-card-body p { font-size: 0.72rem; color: var(--af-fg-3); margin: 0; line-height: 1.4; }
        .af-more-cta {
          display: inline-flex; align-items: center; gap: 8px; margin-top: 24px;
          padding: 12px 28px; border: 1px solid var(--af-border); border-radius: 100px;
          background: var(--af-surface); font-size: 0.88rem; font-weight: 600; color: var(--af-fg);
          text-decoration: none; transition: border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .af-more-cta:hover { border-color: var(--af-accent); color: var(--af-accent); transform: translateY(-1px); }
        .af-seo-content { max-width: 800px; margin: 0 auto; padding: 72px 24px 0; }
        .af-seo-content h2 { font-size: 1.3rem; font-weight: 700; margin: 0 0 16px; color: var(--af-fg); }
        .af-seo-content p { font-size: 0.92rem; color: var(--af-fg-2); line-height: 1.8; margin: 0 0 16px; }
        .af-seo-content a { color: var(--af-accent); text-decoration: none; }
        .af-seo-content a:hover { text-decoration: underline; }
        .af-faq { max-width: 720px; margin: 0 auto; padding: 80px 24px 56px; }
        .af-faq-item { border-bottom: 1px solid var(--af-border); padding: 24px 0; }
        .af-faq-item:first-of-type { border-top: 1px solid var(--af-border); }
        .af-faq-item h3 { font-size: 0.95rem; font-weight: 700; margin: 0 0 10px; color: var(--af-fg); }
        .af-faq-item p { font-size: 0.88rem; color: var(--af-fg-2); line-height: 1.7; margin: 0; }
        .af-footer {
          max-width: 720px; margin: 0 auto; padding: 0 24px 56px;
          font-size: 0.78rem; color: var(--af-fg-3); line-height: 1.7;
        }
        .af-footer a { color: var(--af-accent); text-decoration: none; }
        .af-footer a:hover { text-decoration: underline; }
        @media (max-width: 768px) {
          .af-hero { grid-template-columns: 1fr; padding: 48px 20px 0; gap: 32px; }
          .af-hero-text { max-width: 100%; }
          .af-hero h1 { font-size: 1.8rem; }
          .af-hero-image-wrap { aspect-ratio: 4/3; }
          .af-strip { padding: 48px 0 0; }
          .af-strip-card { flex: 0 0 240px; }
          .af-editor-section { padding: 48px 20px 0; }
          .af-editor-toolbar { flex-wrap: wrap; }
          .af-btn-generate { width: 100%; text-align: center; }
          .af-more-grid { grid-template-columns: 1fr 1fr; }
          .af-seo-content { padding: 48px 20px 0; }
          .af-share-row { justify-content: center; }
        }
      `}</style>

      <section className="af-hero">
        <div className="af-hero-text">
          <div className="af-hero-badge">⚡ Trending AI Action Figure Prompt</div>
          <h1>
            Best <span className="af-gradient">AI Action Figure Prompt</span> —
            Turn Yourself Into a Toy Collectible
          </h1>
          <p className="af-hero-desc">
            The hottest new AI art trend. Upload your photo and get a photorealistic
            action figure in seconds — blister pack, open box diorama, toy store shelf,
            accessories flatlay, or dynamic battle scene. Five viral styles, free prompts,
            one click to generate.
          </p>
          <button className="af-hero-cta" onClick={() => handleSelectTemplate(TEMPLATES[0])}>
            Try Blister Pack Figure →
          </button>
        </div>
        <div
          className="af-hero-image-wrap"
          onClick={() => handleSelectTemplate(TEMPLATES[0])}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") handleSelectTemplate(TEMPLATES[0]); }}
        >
          <span className="af-hero-img-badge">#1 Most Popular</span>
          <Image
            src={TEMPLATES[0].imageUrl}
            alt="AI Action Figure Blister Pack — custom collectible toy figure in sealed retail packaging"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </section>

      <section className="af-strip">
        <div className="af-strip-header">
          <p className="af-section-label">More Action Figure Styles</p>
          <h2 className="af-section-title">Pick Your Favorite AI Action Figure Style</h2>
        </div>
        <div className="af-strip-scroll">
          {TEMPLATES.slice(1).map((t) => (
            <div
              key={t.id}
              className={`af-strip-card ${selectedTemplate?.id === t.id ? "active" : ""}`}
              onClick={() => handleSelectTemplate(t)}
            >
              <div className="af-strip-card-image">
                <span className="af-strip-card-tag">{t.tag}</span>
                <Image
                  src={t.imageUrl}
                  alt={`${t.title} — AI action figure prompt style`}
                  fill
                  sizes="260px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="af-strip-card-body">
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <button
                  className="af-strip-use"
                  onClick={(e) => { e.stopPropagation(); handleSelectTemplate(t); }}
                >
                  {selectedTemplate?.id === t.id ? "✓ Selected" : "Use this prompt"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="af-editor-section" ref={editorRef}>
        <p className="af-section-label">Free Action Figure Generator</p>
        <h2 className="af-section-title" style={{ marginBottom: 24 }}>
          {selectedTemplate ? `Action Figure Maker: ${selectedTemplate.title}` : "Select an action figure style above to start"}
        </h2>
        <div className="af-editor-card">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Pick an action figure style above to load its prompt, or write your own action figure prompt here…"
          />
          <div className="af-editor-toolbar">
            {selectedTemplate?.needsPhoto !== false && (
              <div
                className={`af-upload-trigger ${referenceImage ? "has-file" : ""}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {referenceImage ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={referenceImage} alt="" className="preview-thumb" />
                    <span>{referenceFileName}</span>
                    <button
                      className="af-upload-remove"
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
            <div className="af-toolbar-spacer" />
            <button className="af-btn-copy" onClick={handleCopyPrompt}>
              {copied ? "Copied!" : "Copy"}
            </button>
            <button className="af-btn-generate" onClick={handleGenerate} disabled={!prompt.trim()}>
              Generate Action Figure
            </button>
          </div>
        </div>
        <p className="af-editor-hint">
          Pro tip: paste this prompt into{" "}
          <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer">ChatGPT</a>{" "}
          with your photo for the same result. Works with GPT Image 2 and Midjourney.
        </p>
      </section>

      <section className="af-share-section">
        <div className="af-share-row">
          <span className="af-share-label">Share this collection:</span>
          <button className="af-share-btn" onClick={() => handleShare("twitter")}>X / Twitter</button>
          <button className="af-share-btn" onClick={() => handleShare("facebook")}>Facebook</button>
          <button className="af-share-btn" onClick={() => handleShare("whatsapp")}>WhatsApp</button>
          <button className="af-share-btn" onClick={() => handleShare("copy")}>
            {copiedShare ? "Copied!" : "Copy link"}
          </button>
        </div>
      </section>

      <section className="af-more">
        <p className="af-section-label">Explore More</p>
        <h2 className="af-section-title">Trending AI Art Prompts to Try Next</h2>
        <div className="af-more-grid">
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
            <Link key={item.slug} href={`/prompts/${item.slug}`} className="af-more-card">
              <div className="af-more-card-image">
                <Image
                  src={`/prompts/${item.slug}.jpg`}
                  alt={`${item.title} — AI art prompt`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
              <div className="af-more-card-body">
                <h3>{item.title}</h3>
                <p>{item.cat}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <Link href="/ai-prompts" className="af-more-cta">
            Browse all AI prompts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      <section className="af-seo-content">
        <h2>What Is an AI Action Figure Prompt? The Trend That Turns Photos Into Collectible Toys</h2>
        <p>
          An <strong>AI action figure prompt</strong> is a text instruction you give to AI image generators like
          ChatGPT or Midjourney to transform your photo into a photorealistic collectible toy figure. Unlike
          simple filters, AI action figure prompts let you control the packaging style, the figure&apos;s pose
          and accessories, and the entire scene — from retail blister pack to cinematic battle diorama.
        </p>
        <p>
          The <strong>action figure generator AI</strong> trend exploded in early 2026 when people started
          sharing <strong>AI action figure from photo</strong> results on social media. The &ldquo;Blister Pack
          Figure&rdquo; — a photorealistic custom toy sealed in retail packaging — quickly became the most
          viral AI art style, with millions of users &ldquo;finding themselves on a toy store shelf.&rdquo;
          Meanwhile, the <strong>Open Box Diorama</strong> and <strong>Dynamic Battle Scene</strong> styles
          gained traction among collectors and toy photography enthusiasts for their premium, high-end aesthetic.
        </p>
        <p>
          That&apos;s why we built this free <strong>action figure prompt</strong> collection: pick one of five
          trending styles, upload your photo, and generate in one click using{" "}
          <Link href="/gpt-image-2-prompts">GPT Image 2</Link>. Every template has been tested across hundreds
          of photos to ensure consistent, photorealistic results. You can also copy any prompt and paste it directly
          into ChatGPT, or explore our full{" "}
          <Link href="/ai-prompts">AI prompt library</Link> with 190+ prompts across{" "}
          <Link href="/ai-prompts?category=character">character design</Link>,{" "}
          <Link href="/ai-prompts?category=poster">poster design</Link>, and{" "}
          <Link href="/ai-prompts?category=photography">photography</Link> categories.
        </p>
      </section>

      <section className="af-faq">
        <h2 className="af-section-title" style={{ marginBottom: 0 }}>AI Action Figure Prompt FAQ — Common Questions</h2>
        <div className="af-faq-item">
          <h3>What is an AI action figure prompt?</h3>
          <p>
            An AI action figure prompt is a text instruction you give to AI image generators like ChatGPT or
            Midjourney to create a photorealistic image of yourself (or anyone) as a collectible action figure
            toy. The prompt tells the AI which packaging style to use (blister pack, diorama, toy store shelf,
            flatlay, or battle scene), how the figure should look, what accessories to include, and what the
            surrounding environment should be.
          </p>
        </div>
        <div className="af-faq-item">
          <h3>How do I make an action figure of myself with AI?</h3>
          <p>
            To make an AI action figure of yourself, upload a clear, well-lit photo to ChatGPT, copy one of our
            tested prompts, replace the placeholder text (like [SUBJECT], [NAME], [OUTFIT]) with your details, and
            hit generate. The Blister Pack style is the most popular and easiest to get great results. For best
            results, use a front-facing headshot and specify your distinctive features and favorite accessories.
          </p>
        </div>
        <div className="af-faq-item">
          <h3>Are these action figure prompts free to use?</h3>
          <p>
            Yes — all action figure prompts on this page are free to copy and paste. You can use them with
            ChatGPT (Plus, Pro, or Team) or Midjourney at no extra cost beyond your existing subscription.
            Browsing, copying, and pasting is completely free with no signup required.
          </p>
        </div>
        <div className="af-faq-item">
          <h3>Which action figure style is most popular?</h3>
          <p>
            The &ldquo;Blister Pack Figure&rdquo; is the most popular and most shared on social media — it looks
            exactly like finding yourself on a toy store shelf. The &ldquo;Toy Store Shelf&rdquo; style is also
            going viral for its candid retail photography feel. For collectors and serious hobbyists, the &ldquo;Open
            Box Diorama&rdquo; style delivers the most premium, high-end result that resembles real Hot Toys or
            Sideshow Collectibles figures.
          </p>
        </div>
        <div className="af-faq-item">
          <h3>Can I use these prompts for commercial purposes?</h3>
          <p>
            The prompts themselves are free to use however you like. However, the images generated by AI tools are
            subject to each platform&apos;s terms of service. ChatGPT-generated images can generally be used for
            personal and commercial purposes per OpenAI&apos;s usage policy, but you should review the latest terms
            on each platform. Always ensure you have the right to use any reference photos you upload.
          </p>
        </div>
      </section>

      <footer className="af-footer">
        <p>
          <Link href="/">DrawPrompt</Link> — the best AI action figure prompts for AI image generation.
          Browse <Link href="/ai-prompts">all prompts</Link>,
          try <Link href="/gpt-image-2-prompts">GPT Image 2 prompts</Link>,
          or make <Link href="/caricature-prompt">AI caricatures</Link>.
        </p>
      </footer>
    </div>
  );
}
