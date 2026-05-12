"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ─── Template Data ───────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: "template-1",
    slug: "mothers-day-mom-silhouette-poster",
    title: "MOM Silhouette",
    description: "No photo needed — pure AI art",
    imageUrl: "/prompts/mothers-day-mom-silhouette-poster.jpg",
    needsPhoto: false,
    prompt: `Create a warm high-end flat graphic Mother's Day concept poster, aspect ratio 3:4.
Core text: MOM
Theme: Mother's Day
Visual direction:
Create a bold contemporary flat graphic poster with strong typography and screen-print texture, but the mood must be gentle, warm, safe, and intimate.
It should feel like a refined Mother's Day art print, not a horror poster, not a war poster, not a dramatic political poster, not a dark monument.
Main concept:
Visually translate "MOM" into shelter, protection, support, home, and quiet love.
The word "MOM" must become the main structural element of the poster, like huge flat printed blocks, a soft wall, a protective gate, or a symbolic home.
Composition:
Use a minimal scene with a clear horizontal platform across the lower part of the poster.
The platform should be light, warm, and calm, not black, not heavy, not like a cliff or stage of danger.
Place the giant "MOM" text across the center and lower half of the image. The letters must be huge, bold, flat, readable, and integrated into the scene.
The "O" should become a warm doorway, soft circular opening, or protective home-like space.
The two "M" letters should feel like sheltering walls or gentle arms around the mother and child.
Main subjects:
Use only small simple silhouette figures with softened dark brown or warm umber color, not pure black.
Show a mother and child as tiny figures against the monumental "MOM" structure.
The mother may kneel to adjust the child's scarf, hold the child's hand, carry the child, or gently touch the child's cheek.
Their relationship must be readable through simple posture and spacing.
Do not show detailed facial features. Avoid photorealistic people.
Color palette:
Use a soft Mother's Day print palette, 3 to 4 colors maximum:
warm ivory paper background,
soft coral, dusty rose, muted peach, or warm terracotta for the "MOM" letters,
warm umber or soft brown for the silhouettes,
pale gold, butter yellow, or light apricot for a small sun or glow.
The red must be soft, warm, and low-saturation, never dark blood red, never aggressive crimson.
Avoid dominant black. Avoid heavy dark blocks. Avoid harsh red-black contrast.
Lighting and mood:
Use gentle spring-like warmth, soft paper texture, quiet daylight, and a calm emotional atmosphere.
If using a sun or circle, make it pale gold or soft apricot, subtle and comforting, not ominous.
The image should feel tender and collectible, like a warm art book cover or handmade Mother's Day print.
Style:
Flat graphic poster, strong typography, minimal narrative, refined art-print quality.
Use screen-print texture, lithograph grain, handmade paper fibers, slight ink imperfections, and soft edges.
No glossy 3D lighting, no realistic interior render, no AI plastic smoothness.
Text integration:
The giant "MOM" must be physically part of the composition.
The mother and child should stand on the platform in front of the letters, inside the "O", or partially framed by the letters.
The typography, figures, platform, and negative space must form one complete visual sentence.
The text must not look like a digital overlay.
Supporting text:
A very small "MOTHER'S DAY" may appear at the bottom, clean and restrained.
No other text.
Avoid:
horror mood, blood red, aggressive crimson, dominant black, heavy black platform, dark monument, war-poster feeling, political propaganda feeling, ominous sun, dramatic threat, harsh shadows, pure black silhouettes, 3D render, realistic home interior, glossy AI lighting, cute greeting card style, excessive flowers, hearts, gift boxes, teddy bears, decorative branches, random small text, fake signatures, fake numbers, commercial holiday template, crowded composition, photorealistic faces.`,
  },
  {
    id: "template-2",
    slug: "mothers-day-text-overlay-love",
    title: "Memory Poster",
    description: "Photo framed by typography",
    imageUrl: "/prompts/mothers-day-text-overlay-love.jpg",
    needsPhoto: true,
    prompt: `Create a warm, high-end flat graphic Mother's Day memory poster based on the single uploaded photo, aspect ratio 3:4.
Main title: MOTHER'S DAY
Use only one uploaded photo.
Critical image-reference rule:
The uploaded photo must be visibly used as the main image in the final poster.
Do not merely use the uploaded photo as inspiration.
Do not generate a new imagined mother-child scene.
Do not replace the uploaded photo with a different family, different people, or a newly invented composition.
The people, relationship, pose, clothing, facial features, and emotional moment from the uploaded photo must remain recognizable.
The final poster should clearly look like a designed poster version of the uploaded photo.
Use case:
This poster should be suitable for sharing a memory on Mother's Day, either sent directly to the mother or posted on social media. It should feel like a visual message: "I grew up, but this moment stayed."
Photo handling:
Use the uploaded photo as the central visible photograph or central visible image area.
Preserve identities, relationship, age feeling, clothing, posture, facial features, and real memory atmosphere.
Do not swap faces, do not change relationships, do not invent fake family members, and do not create a different scene.
You may gently restore, crop, simplify, color-grade, and apply subtle poster-print treatment, but the original uploaded photo must remain visibly recognizable.
Keep the photo's core composition unless a slight crop is needed for poster framing.
Theme:
"I grew up inside your love."
Express time, memory, companionship, growth, and gratitude.
Composition:
Place the uploaded photo as the emotional core of the poster.
The photo should appear as a treasured printed photograph, a large central paper image, or a visible framed image integrated with the typography.
The main visual text must be "MOTHER'S DAY".
The typography may frame the uploaded photo, sit behind it, partially overlap its edges, or form a paper structure around it.
Do not embed the photo so deeply into the letters that the original image becomes unrecognizable.
Keep the layout simple: one visible uploaded photo, one large typographic structure, one clear horizontal base.
Visual style:
High-end flat art poster, archival paper texture, warm print grain, slight misregistration, soft lithograph feel.
Nostalgic but not sad, warm but not sentimental.
The poster may have a refined printed texture, but it must not erase the uploaded photo's identity.
Color palette:
Aged ivory paper, faded coral, dusty rose, warm brown, muted peach, pale gold.
Avoid dirty sepia, heavy black, dark blood red, horror contrast, and excessive distressing.
Text:
The main visual text must be "MOTHER'S DAY" only, large, clear, correctly spelled, and integrated into the image.
Do not use MOM, FOR MOM, HER DAY, or STILL HOME as the main title.
Optional small line: "I grew up inside your love." or "Happy Mother's Day."
No fake dates, fake archive numbers, fake exhibition labels, or meaningless text.
Avoid:
ignoring the uploaded photo, using the uploaded photo only as style inspiration, generating a new family scene, changing identities, AI face replacement, unrecognizable people, embedding the photo too abstractly, cheap vintage filter, messy scrapbook collage, too many frames, fake old-photo damage, random typography, commercial greeting card style, 3D render, horror palette.`,
  },
  {
    id: "template-3",
    slug: "mothers-day-elegant-portrait-reading",
    title: "Portrait Tribute",
    description: "Mom as the main character",
    imageUrl: "/prompts/mothers-day-elegant-portrait-reading.jpg",
    needsPhoto: true,
    prompt: `Create a high-end flat graphic Mother's Day tribute poster based on one uploaded portrait photo of the user's mother, aspect ratio 3:4.
Main title: MOTHER'S DAY
Use only one uploaded photo.
Use case:
This poster should make the mother feel seen, valued, and celebrated. It should feel like a personal tribute poster the user can send to their mother, not a generic holiday greeting image.
Use GPT Image 2's strengths: preserve the real portrait identity, render clear large typography, and reconstruct the photo into a refined flat graphic design poster.
Photo handling:
Preserve her real identity, face shape, hairstyle, age, expression, temperament, and clothing silhouette.
Do not make her unrealistically younger, do not over-beautify, do not make her look like a celebrity, and do not swap her face.
Transform the photo into a flat art-poster style while keeping her real presence, with paper texture and print grain.
Theme:
"Today, Mom is the main character."
The image should express that she is not only a mother; she is also herself.
Composition:
Place the mother as the central figure, calm, warm, and dignified.
The giant main visual text must be "MOTHER'S DAY".
The typography should become a background structure, paper frame, warm aura, or protective visual field, not a normal title.
Keep the layout clean with a clear supporting surface at the bottom.
Visual style:
High-end flat poster, art book cover, screen-print texture, lithograph grain, warm paper feel.
Gentle, elegant, intimate, and respectful.
No 3D render, no studio portrait template, no commercial promotion style.
Color palette:
Warm ivory, soft cream, dusty rose, muted coral, pale gold, warm brown.
Avoid dark red, heavy black, cold gray, neon pink, and dramatic hard lighting.
Text:
The main visual text must be "MOTHER'S DAY" only, large, clear, correctly spelled, and integrated into the image.
Do not use MOM, FOR MOM, or HER DAY as the main title.
Optional small line: "Happy Mother's Day, Mom." or "Today is your day."
No fake magazine cover text, random numbers, fake coordinates, or decorative small type.
Avoid:
misspelling MOTHER'S DAY, using MOM as the main title, AI beauty filter, plastic skin, changing identity, unrealistic youthfulness, generic portrait poster, commercial holiday template, excessive flowers, hearts, gift boxes, random typography, fake branding, 3D render, horror colors.`,
  },
  {
    id: "template-4",
    slug: "mothers-day-photo-card-growing-together",
    title: "Growing Together",
    description: "Your photo as flat graphic art",
    imageUrl: "/prompts/mothers-day-photo-card-growing-together.jpg",
    needsPhoto: true,
    prompt: `Create a warm, high-end flat graphic Mother's Day tribute poster based on one uploaded photo of the user and their mother, aspect ratio 3:4.
Use only one uploaded photo. Do not create a multi-photo collage.
Use case:
This poster should feel like something the user would want to send directly to their mother on Mother's Day, or share on social media as a personal tribute. It must feel sincere, warm, personal, and memorable, not like a generic holiday template.
Use GPT Image 2's strengths: preserve real identities accurately, maintain the relationship between people, render clear readable typography, and transform a real photo into a refined flat graphic poster.
Photo handling:
Preserve the real identities, facial features, age difference, relationship, and natural emotion in the photo.
Do not swap faces, do not change the relationship, and do not turn the people into strangers.
You may transform the photo into a flat poster style with paper grain, screen-print texture, subtle ink edges, and warm colors.
Theme:
"Thank you for growing with me."
The image should express companionship, protection, growth, and gratitude between mother and child.
Composition:
Use the uploaded photo as the emotional center.
The giant main visual text can be "MOM" or "MOTHER'S DAY".
The typography must be huge, clear, flat, and integrated into the composition as a paper wall, memory frame, doorway, protective space, or warm supporting structure.
The people may stand in front of the text, inside the letters, partially framed by the typography, or layered with it.
There must be a clear horizontal supporting surface at the bottom.
Color palette:
Warm ivory, soft cream, muted coral, dusty rose, warm brown, pale gold.
Avoid blood red, dominant black, harsh horror contrast, tacky pink, cheap gradients.
Text:
Main visual text: "MOM" or "MOTHER'S DAY".
Optional small line: "Thank you for growing with me." or "Happy Mother's Day."
No random slogans, fake signatures, fake numbers, fake magazine text, or meaningless small type.
Avoid:
generic Mother's Day template, commercial greeting card, excessive flowers, hearts, gift boxes, teddy bears, 3D typography, plastic skin, changing identities, fake family look, random text, horror palette, heavy black platform, crowded collage.`,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function MothersDayClient() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TEMPLATES[0] | null>(null);
  const [prompt, setPrompt] = useState("");
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [referenceFileName, setReferenceFileName] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);

  const handleSelectTemplate = (template: typeof TEMPLATES[0]) => {
    setSelectedTemplate(template);
    setPrompt(template.prompt);
    setTimeout(() => {
      step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      alert("Image must be under 20MB");
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

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/mothers-day?ref=share`
    : "https://drawprompt.org/mothers-day?ref=share";

  const handleShare = (platform: string) => {
    const text = encodeURIComponent("I made a Mother's Day poster with this — try it:");
    const url = encodeURIComponent(shareUrl);
    const links: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };
    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }
    window.open(links[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <div className="md-page">
      <style jsx global>{`
        .md-page {
          --c-fg: #1c1917;
          --c-fg-2: #57534e;
          --c-fg-3: #a8a29e;
          --c-bg: #faf9f7;
          --c-surface: #ffffff;
          --c-border: #e7e5e4;
          --c-accent: #b45309;
          --c-accent-light: #fef3c7;
          --c-accent-hover: #92400e;
          --radius-sm: 6px;
          --radius-md: 12px;
          --radius-lg: 20px;
          background: var(--c-bg);
          min-height: 100vh;
          color: var(--c-fg);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* ─── Hero ─── */
        .md-hero {
          max-width: 720px;
          margin: 0 auto;
          padding: 80px 24px 56px;
          text-align: center;
        }
        .md-hero h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.1;
          margin: 0 0 20px;
        }
        .md-hero h1 em {
          font-style: normal;
          color: var(--c-accent);
        }
        .md-hero .subtitle {
          font-size: 1.05rem;
          color: var(--c-fg-2);
          line-height: 1.65;
          margin: 0 auto;
          max-width: 520px;
        }

        /* ─── Steps bar ─── */
        .md-steps-bar {
          max-width: 600px;
          margin: 0 auto 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 0 24px;
        }
        .md-step-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--c-fg-2);
          font-weight: 500;
          white-space: nowrap;
        }
        .md-step-num {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--c-fg);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .md-step-line {
          width: 40px;
          height: 1px;
          background: var(--c-border);
          margin: 0 16px;
          flex-shrink: 0;
        }

        /* ─── Section ─── */
        .md-section {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px 72px;
        }
        .md-section-narrow {
          max-width: 640px;
          margin: 0 auto;
          padding: 0 24px 72px;
        }
        .md-section-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--c-fg-3);
          margin: 0 0 8px;
        }
        .md-section-title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 32px;
          color: var(--c-fg);
        }

        /* ─── Template Grid (2x2, large images) ─── */
        .md-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .md-card {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          background: var(--c-surface);
          border: 2px solid transparent;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }
        .md-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.1);
        }
        .md-card.active {
          border-color: var(--c-accent);
          box-shadow: 0 0 0 1px var(--c-accent), 0 16px 48px rgba(180,83,9,0.12);
        }
        .md-card-image {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
        }
        .md-card-body {
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .md-card-body h3 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0;
          color: var(--c-fg);
        }
        .md-card-body p {
          font-size: 0.8rem;
          color: var(--c-fg-3);
          margin: 2px 0 0;
        }
        .md-card-select {
          padding: 8px 18px;
          border-radius: 100px;
          border: 1px solid var(--c-border);
          background: var(--c-surface);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--c-fg-2);
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .md-card-select:hover {
          border-color: var(--c-accent);
          color: var(--c-accent);
        }
        .md-card.active .md-card-select {
          background: var(--c-accent);
          border-color: var(--c-accent);
          color: #fff;
        }

        /* ─── Editor ─── */
        .md-editor-card {
          background: var(--c-surface);
          border: 1px solid var(--c-border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .md-editor-card textarea {
          width: 100%;
          min-height: 140px;
          padding: 20px;
          border: none;
          background: transparent;
          font-size: 0.88rem;
          line-height: 1.7;
          color: var(--c-fg);
          resize: vertical;
          font-family: inherit;
          outline: none;
        }
        .md-editor-card textarea::placeholder {
          color: var(--c-fg-3);
        }
        .md-editor-toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border-top: 1px solid var(--c-border);
          background: #fafaf9;
        }
        .md-upload-trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px dashed var(--c-border);
          border-radius: var(--radius-sm);
          background: transparent;
          font-size: 0.8rem;
          color: var(--c-fg-2);
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .md-upload-trigger:hover { border-color: var(--c-accent); color: var(--c-accent); }
        .md-upload-trigger.has-file {
          border-style: solid;
          border-color: #86efac;
          background: #f0fdf4;
          color: #166534;
        }
        .md-upload-trigger .preview-thumb {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          object-fit: cover;
        }
        .md-upload-remove {
          background: none;
          border: none;
          font-size: 0.75rem;
          color: var(--c-fg-3);
          cursor: pointer;
          text-decoration: underline;
          margin-left: 4px;
        }
        .md-toolbar-spacer { flex: 1; }
        .md-btn-generate {
          padding: 10px 24px;
          background: var(--c-accent);
          color: #fff;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .md-btn-generate:hover { background: var(--c-accent-hover); }
        .md-btn-generate:disabled { opacity: 0.4; cursor: not-allowed; }
        .md-btn-copy {
          padding: 10px 16px;
          background: transparent;
          color: var(--c-fg-2);
          border: 1px solid var(--c-border);
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .md-btn-copy:hover { border-color: var(--c-accent); color: var(--c-accent); }
        .md-editor-hint {
          margin-top: 12px;
          font-size: 0.78rem;
          color: var(--c-fg-3);
        }
        .md-editor-hint a { color: var(--c-accent); text-decoration: none; }
        .md-editor-hint a:hover { text-decoration: underline; }

        /* ─── Share ─── */
        .md-share-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          padding-top: 32px;
          border-top: 1px solid var(--c-border);
        }
        .md-share-label {
          font-size: 0.8rem;
          color: var(--c-fg-3);
          font-weight: 500;
        }
        .md-share-btn {
          padding: 7px 14px;
          border: 1px solid var(--c-border);
          border-radius: 100px;
          background: var(--c-surface);
          font-size: 0.78rem;
          color: var(--c-fg-2);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .md-share-btn:hover { border-color: var(--c-accent); color: var(--c-accent); }

        /* ─── Footer ─── */
        .md-footer {
          max-width: 640px;
          margin: 0 auto;
          padding: 0 24px 56px;
          font-size: 0.78rem;
          color: var(--c-fg-3);
          line-height: 1.7;
        }
        .md-footer a { color: var(--c-accent); text-decoration: none; }
        .md-footer a:hover { text-decoration: underline; }

        /* ─── Responsive ─── */
        @media (max-width: 768px) {
          .md-hero { padding: 56px 20px 40px; }
          .md-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
          .md-steps-bar { flex-wrap: wrap; gap: 8px; justify-content: center; }
          .md-step-line { display: none; }
          .md-editor-toolbar { flex-wrap: wrap; }
          .md-btn-generate { width: 100%; text-align: center; }
        }
      `}</style>

      {/* ─── Hero ─── */}
      <section className="md-hero">
        <h1>
          How to Make a Mother&apos;s Day<br />
          Poster for <em>Mom</em>
        </h1>
        <p className="subtitle">
          Pick a template, upload your photo, generate a gallery-quality art poster.
          Three steps, five minutes, one happy mom.
        </p>
      </section>

      {/* ─── Steps bar ─── */}
      <div className="md-steps-bar">
        <div className="md-step-item">
          <span className="md-step-num">1</span>
          Choose template
        </div>
        <div className="md-step-line" />
        <div className="md-step-item">
          <span className="md-step-num">2</span>
          Generate
        </div>
        <div className="md-step-line" />
        <div className="md-step-item">
          <span className="md-step-num">3</span>
          Share
        </div>
      </div>

      {/* ─── Step 1: Templates ─── */}
      <section className="md-section">
        <p className="md-section-label">Step 1</p>
        <h2 className="md-section-title">Choose a poster template</h2>

        <div className="md-grid">
          {TEMPLATES.map((t) => (
            <div
              key={t.id}
              className={`md-card ${selectedTemplate?.id === t.id ? "active" : ""}`}
              onClick={() => handleSelectTemplate(t)}
            >
              <div className="md-card-image">
                <Image
                  src={t.imageUrl}
                  alt={`Mother's Day poster design — ${t.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="md-card-body">
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                </div>
                <button
                  className="md-card-select"
                  onClick={(e) => { e.stopPropagation(); handleSelectTemplate(t); }}
                >
                  {selectedTemplate?.id === t.id ? "Selected" : "Use this"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Step 2: Generate ─── */}
      <section className="md-section-narrow" ref={step2Ref}>
        <p className="md-section-label">Step 2</p>
        <h2 className="md-section-title">Generate your poster</h2>

        <div className="md-editor-card">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Select a template above to load its prompt, or write your own..."
          />
          <div className="md-editor-toolbar">
            {selectedTemplate?.needsPhoto !== false && (
              <div
                className={`md-upload-trigger ${referenceImage ? "has-file" : ""}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {referenceImage ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={referenceImage} alt="" className="preview-thumb" />
                    <span>{referenceFileName}</span>
                    <button
                      className="md-upload-remove"
                      onClick={(e) => { e.stopPropagation(); removeImage(); }}
                    >
                      remove
                    </button>
                  </>
                ) : (
                  <span>+ Add photo</span>
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
            <div className="md-toolbar-spacer" />
            <button className="md-btn-copy" onClick={handleCopyPrompt}>
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              className="md-btn-generate"
              onClick={handleGenerate}
              disabled={!prompt.trim()}
            >
              Generate
            </button>
          </div>
        </div>
        <p className="md-editor-hint">
          You can also paste this prompt into{" "}
          <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer">ChatGPT</a>{" "}
          with your photo. Same result.
        </p>
      </section>

      {/* ─── Step 3: Share ─── */}
      <section className="md-section-narrow">
        <p className="md-section-label">Step 3</p>
        <h2 className="md-section-title">Surprise her</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--c-fg-2)", margin: "0 0 24px", lineHeight: 1.65 }}>
          Print it and slip it into her bag, frame it on the wall, or simply
          text it with a &ldquo;love you, Mom.&rdquo; She&apos;ll know you meant it.
        </p>

        <div className="md-share-row">
          <span className="md-share-label">Share:</span>
          <button className="md-share-btn" onClick={() => handleShare("twitter")}>X</button>
          <button className="md-share-btn" onClick={() => handleShare("facebook")}>Facebook</button>
          <button className="md-share-btn" onClick={() => handleShare("whatsapp")}>WhatsApp</button>
          <button className="md-share-btn" onClick={() => handleShare("copy")}>
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="md-footer">
        <p>
          <Link href="/">DrawPrompt</Link> — free Mother&apos;s Day poster templates
          and design ideas. Browse <Link href="/ai-prompts">all prompts</Link>,
          try <Link href="/gpt-image-2-prompts">GPT Image 2 prompts</Link>,
          or create adorable <Link href="/chibi-prompt">chibi art</Link> from your photos.
        </p>
      </footer>
    </div>
  );
}
