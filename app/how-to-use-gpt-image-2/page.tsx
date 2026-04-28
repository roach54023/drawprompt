import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Use GPT Image 2 \u2014 Complete Guide to ChatGPT Image Generator (2025)",
  description:
    "Learn how to use GPT Image 2 in ChatGPT to create stunning AI images. Step-by-step guide with prompt writing tips, best practices, examples, and 167+ tested prompts you can copy-paste.",
  keywords: [
    "how to use gpt image 2",
    "gpt image 2",
    "gpt image 2 guide",
    "chatgpt image 2",
    "chat gpt image 2",
    "chatgpt image generator",
    "chatgpt image generator how to use",
    "gpt image 2 tutorial",
    "gpt image 2 tips",
    "how to generate images in chatgpt",
    "gpt-image-2",
    "gpt image 2.0",
    "openai image generation",
  ],
  alternates: { canonical: "https://drawprompt.org/how-to-use-gpt-image-2/" },
  openGraph: {
    title: "How to Use GPT Image 2 \u2014 Complete Guide to ChatGPT Image Generator",
    description: "Step-by-step guide to creating AI images with GPT Image 2 in ChatGPT. Prompt writing tips, best practices, and 167+ tested prompts.",
    type: "article",
    url: "https://drawprompt.org/how-to-use-gpt-image-2/",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use GPT Image 2 in ChatGPT",
  description: "A step-by-step guide to generating AI images with GPT Image 2 in ChatGPT.",
  step: [
    { "@type": "HowToStep", name: "Open ChatGPT", text: "Go to chat.openai.com and log in. GPT Image 2 is available to ChatGPT Plus, Pro, and Team users." },
    { "@type": "HowToStep", name: "Write your prompt", text: "Describe the image you want in detail. Include the subject, style, lighting, composition, and mood." },
    { "@type": "HowToStep", name: "Generate and iterate", text: "Hit send and wait for the image. Ask ChatGPT to adjust specific elements until it matches your vision." },
    { "@type": "HowToStep", name: "Download your image", text: "Click the generated image to view it full-size, then download it for use." },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is GPT Image 2 free to use?",
      acceptedAnswer: { "@type": "Answer", text: "GPT Image 2 is available to ChatGPT Plus ($20/month), Pro ($200/month), and Team users. Free-tier users have limited access with fewer generations per day." },
    },
    {
      "@type": "Question",
      name: "What is the difference between GPT Image 2 and DALL-E 3?",
      acceptedAnswer: { "@type": "Answer", text: "GPT Image 2 is significantly better at following detailed instructions, rendering text/typography accurately, maintaining photorealism, and handling complex compositions. DALL-E 3 is still available but GPT Image 2 is now the default." },
    },
    {
      "@type": "Question",
      name: "Can GPT Image 2 edit existing photos?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Upload a photo to ChatGPT and ask GPT Image 2 to edit it \u2014 change backgrounds, apply style transfers, remove objects, add text overlays, or transform the entire aesthetic." },
    },
    {
      "@type": "Question",
      name: "How do I write better prompts for GPT Image 2?",
      acceptedAnswer: { "@type": "Answer", text: "Focus on five elements: subject, style, lighting, composition, and mood. The more specific you are, the better the result. Browse our 167+ tested prompts for examples." },
    },
    {
      "@type": "Question",
      name: "What image sizes does GPT Image 2 support?",
      acceptedAnswer: { "@type": "Answer", text: "GPT Image 2 can generate images in various aspect ratios including square (1:1), landscape (16:9), portrait (9:16), and custom ratios. Specify the aspect ratio in your prompt." },
    },
  ],
};

const STEPS = [
  { num: "01", title: "Open ChatGPT", body: "Go to chat.openai.com and log in with your account. GPT Image 2 is available to ChatGPT Plus, Pro, and Team subscribers. Free-tier users get limited daily generations.", accent: "#c06a3e", bg: "#fdf0e8", border: "#f0c4a8" },
  { num: "02", title: "Write a detailed prompt", body: "Describe exactly what you want. Include the subject, art style, lighting, camera angle, color palette, and mood. The more specific you are, the better GPT Image 2 performs. For example: \u2018A surrealist luxury watch poster with melting clock elements, dramatic studio lighting, dark moody background, high-end fashion photography style.\u2019", accent: "#5a9e7a", bg: "#eef6f2", border: "#b8dcc8" },
  { num: "03", title: "Generate and review", body: "Hit send and wait a few seconds. GPT Image 2 will generate your image inline in the chat. Review it carefully \u2014 check if the composition, colors, text rendering, and overall feel match your vision.", accent: "#7b9eb8", bg: "#eef4f8", border: "#c8dce8" },
  { num: "04", title: "Iterate and refine", body: "This is where GPT Image 2 really shines. Ask ChatGPT to adjust specific elements: \u2018Make the lighting warmer\u2019, \u2018Add a tagline that says...\u2019, \u2018Change the background to a sunset\u2019. You can have a back-and-forth conversation to perfect your image.", accent: "#8b7ab8", bg: "#f2f0f8", border: "#d0c8e8" },
  { num: "05", title: "Download and use", body: "Click the generated image to view it full-size, then download. GPT Image 2 outputs high-resolution images suitable for social media posts, presentations, marketing materials, and even print.", accent: "#c47ab8", bg: "#faf0f8", border: "#e8c0e0" },
];

const PROMPT_TIPS = [
  { title: "Be specific, not vague", good: "A photorealistic close-up of a steaming espresso cup on a marble countertop, morning sunlight streaming through a window, shallow depth of field, warm tones", bad: "A picture of coffee" },
  { title: "Specify the art style", good: "In the style of a 1960s Japanese woodblock print, with bold outlines and flat color areas", bad: "Make it look cool" },
  { title: "Describe lighting explicitly", good: "Dramatic Rembrandt lighting from the upper left, deep shadows, single key light", bad: "Good lighting" },
  { title: "Include composition details", good: "Bird\u2019s-eye view, rule of thirds, the subject positioned in the lower-right third", bad: "Nice angle" },
  { title: "Add mood and atmosphere", good: "Melancholic, nostalgic atmosphere with muted desaturated colors and soft film grain", bad: "Make it emotional" },
];

export default function HowToUseGPTImage2Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div style={{ minHeight: "100vh" }}>
        {/* Hero */}
        <section style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto", padding: "56px 24px 48px" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Guide</p>
          <h1 className="font-serif" style={{ fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16 }}>
            How to use GPT Image 2 in <span style={{ color: "var(--accent)" }}>ChatGPT</span>
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: 600, marginBottom: 28 }}>
            GPT Image 2 is OpenAI&apos;s most powerful image generation model, built directly into ChatGPT. It creates photorealistic images, renders text accurately, and follows complex instructions better than any previous model. This guide shows you how to get the best results.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/gpt-image-2-prompts" className="btn-primary" style={{ textDecoration: "none" }}>Browse 167+ Tested Prompts</Link>
            <Link href="/ai-prompts" className="btn-secondary" style={{ textDecoration: "none" }}>All AI Prompts</Link>
          </div>
        </section>

        {/* What is GPT Image 2 */}
        <section style={{ background: "var(--bg-warm)", padding: "64px 24px" }}>
          <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
            <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
              What is GPT Image 2?
            </h2>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: 14 }}>
              <p>GPT Image 2 (also known as ChatGPT Image 2 or GPT-Image-2) is OpenAI&apos;s latest image generation model, released in 2025. Unlike DALL-E which runs as a separate model, GPT Image 2 is natively integrated into ChatGPT&apos;s main conversation model, meaning you can generate and edit images in the same chat where you discuss ideas.</p>
              <p>What makes GPT Image 2 special is its ability to follow detailed, multi-part instructions accurately. It excels at rendering text and typography within images (a major weakness of earlier models), maintaining photorealistic quality, handling complex multi-element compositions, and iterating on images through conversation.</p>
              <p>GPT Image 2 is available to ChatGPT Plus ($20/month), Pro ($200/month), and Team subscribers. Free-tier users get a limited number of generations per day. There&apos;s no separate charge for image generation &mdash; it&apos;s included in your ChatGPT subscription.</p>
            </div>
          </div>
        </section>

        {/* Step by step */}
        <section style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto", padding: "64px 24px" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 32 }}>
            How to generate images with GPT Image 2
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {STEPS.map((step) => (
              <div key={step.num} style={{ display: "flex", gap: 16, padding: "18px 20px", borderRadius: 16, background: step.bg, border: `1px solid ${step.border}` }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "white", border: `1.5px solid ${step.border}`, fontSize: 11, fontWeight: 700, color: step.accent, marginTop: 2 }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: step.accent, marginBottom: 4 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prompt writing tips */}
        <section style={{ background: "var(--bg-warm)", padding: "64px 24px" }}>
          <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
            <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
              How to write better GPT Image 2 prompts
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32 }}>
              The quality of your output depends entirely on the quality of your prompt. Here are the key principles, each with a good and bad example.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {PROMPT_TIPS.map((tip) => (
                <div key={tip.title} className="card" style={{ padding: "20px 24px" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>{tip.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#5a9e7a", background: "#eef6f2", padding: "2px 8px", borderRadius: 4, flexShrink: 0, marginTop: 2 }}>GOOD</span>
                      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>&quot;{tip.good}&quot;</p>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#b85a5a", background: "#fdf0f0", padding: "2px 8px", borderRadius: 4, flexShrink: 0, marginTop: 2 }}>BAD</span>
                      <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>&quot;{tip.bad}&quot;</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What GPT Image 2 is best at */}
        <section style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto", padding: "64px 24px" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
            What GPT Image 2 is best at
          </h2>
          <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: 14 }}>
            <p>GPT Image 2 particularly excels in several areas compared to other AI image generators. It handles text and typography rendering better than any competitor &mdash; you can ask it to create posters, book covers, and UI mockups with accurate, readable text. It maintains photorealistic quality for portraits, product photography, and architectural visualization.</p>
            <p>It&apos;s also uniquely good at photo editing workflows. You can upload an existing photo and ask it to change the background, apply a style transfer (like Studio Ghibli or vintage film), add or remove elements, or completely transform the aesthetic &mdash; all through natural conversation.</p>
            <p>For creative professionals, GPT Image 2 is strongest at poster and graphic design, UI/UX mockups, product photography, character concept art, and infographic creation. Browse our <Link href="/gpt-image-2-prompts" style={{ color: "var(--accent)", textDecoration: "underline" }}>167+ tested prompts</Link> to see real examples across all these categories.</p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "var(--bg-warm)", padding: "64px 24px" }}>
          <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto", textAlign: "center" }}>
            <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
              Ready to start creating?
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
              Skip the trial and error. Browse our library of 167+ prompts that have already been tested with GPT Image 2, complete with example images and detailed breakdowns.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/gpt-image-2-prompts" className="btn-primary" style={{ textDecoration: "none" }}>GPT Image 2 Prompts</Link>
              <Link href="/chatgpt-photo-prompts" className="btn-secondary" style={{ textDecoration: "none" }}>Photo Editing Prompts</Link>
              <Link href="/ai-prompts" className="btn-secondary" style={{ textDecoration: "none" }}>All AI Prompts</Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ borderTop: "1px solid var(--border)", padding: "64px 24px" }}>
          <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
            <h2 className="font-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 32 }}>
              Frequently asked questions
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {faqJsonLd.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }, i: number) => (
                <div key={item.name} style={{ padding: "24px 0", borderBottom: i < faqJsonLd.mainEntity.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.4 }}>{item.name}</h3>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
