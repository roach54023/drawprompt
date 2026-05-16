/**
 * Unique SEO content for each category landing page.
 * This file is only imported by server components — never enters the client bundle.
 */

import type { AIPromptCategory } from "./aiPromptData";

export interface CategoryPageContent {
  slug: string; // URL slug: /ai-prompts/[slug]
  heroTitle: string;
  heroSubtitle: string; // ~80-120 words unique description
  howToTitle: string;
  tips: { title: string; description: string }[];
  breakdown: {
    promptTitle: string;
    promptSlug: string; // links to /prompts/[slug]
    explanation: string; // ~60 words explaining why this prompt works
  }[];
  modelRecommendation: string; // ~50 words: which models work best for this category
  faq: { q: string; a: string }[];
}

export const categoryContent: Record<AIPromptCategory, CategoryPageContent> = {
  photography: {
    slug: "photography",
    heroTitle: "AI Photography Prompts",
    heroSubtitle:
      "Generate photorealistic images indistinguishable from real camera shots. Our curated photography prompts cover portrait, street, landscape, fashion, and documentary photography — complete with lens specifications, lighting setups, film stock references, and color grading instructions that AI models understand natively. Each prompt is tested with GPT Image 2 and includes the exact camera settings, focal length, aperture, and post-processing style needed to reproduce the result. Whether you need editorial headshots, moody street scenes, or golden-hour landscapes, these copy-paste prompts deliver professional-quality results immediately.",
    howToTitle: "How to Write AI Photography Prompts",
    tips: [
      {
        title: "Specify Lens & Camera Body",
        description:
          "AI models respond well to real camera references. \"Shot on Sony A7IV with 85mm f/1.4 GM\" produces different bokeh and rendering than \"Canon 5D Mark IV with 35mm f/1.4\". Include focal length for composition control.",
      },
      {
        title: "Describe Lighting Like a DP",
        description:
          "Use cinematographer language: \"Key light at 45° camera-left, soft fill from a 4x4 silk, negative fill camera-right for contrast.\" The more specific your lighting direction, the more controlled the output.",
      },
      {
        title: "Include Film Stock or Color Science",
        description:
          "\"Kodak Portra 400 color science\" gives warm skin tones. \"Fujifilm Provia\" gives vivid saturation. \"CineStill 800T\" gives tungsten halation. These references dramatically shift the mood.",
      },
      {
        title: "Set Environment & Time of Day",
        description:
          "\"Golden hour, 15 minutes before sunset, long shadows\" is far more effective than \"good lighting\". Include weather (overcast, hazy, misty) and location specifics for authentic atmosphere.",
      },
      {
        title: "Define Composition Rules",
        description:
          "Reference composition techniques by name: rule of thirds, leading lines, frame-within-frame, negative space. AI models trained on photography datasets understand these conventions.",
      },
    ],
    breakdown: [
      {
        promptTitle: "Convenience Store Neon Portrait",
        promptSlug: "convenience-store-neon-portrait",
        explanation:
          "This prompt works because it combines specific lighting (neon store signs as practical light source), a clear mood (urban nightlife), camera specs (35mm f/1.4 wide open), and environmental context. The AI has strong training data for this aesthetic.",
      },
      {
        promptTitle: "Japanese Onsen Ryokan Portrait",
        promptSlug: "japanese-onsen-ryokan-portrait",
        explanation:
          "Effective because it specifies a culturally distinct location, natural steam as atmosphere element, soft diffused window light, and the calm emotional tone — all of which give the AI a cohesive creative direction.",
      },
    ],
    modelRecommendation:
      "GPT Image 2 excels at photorealistic output with accurate skin tones and natural lighting. For stylized editorial photography, Midjourney v6 offers more artistic interpretation. DALL-E 3 handles complex scenes but tends toward illustration.",
    faq: [
      {
        q: "What camera settings should I include in AI photography prompts?",
        a: "Include focal length (24mm, 50mm, 85mm, 200mm), aperture (f/1.4 for bokeh, f/8 for sharpness), and optionally shutter speed for motion effects. Reference specific camera bodies and lenses for the rendering style you want.",
      },
      {
        q: "How do I get realistic skin tones in AI-generated photos?",
        a: "Reference specific film stocks known for flattering skin (Kodak Portra 400/800, Fujifilm Pro 400H). Specify soft, diffused lighting and mention \"natural skin texture\" or \"no airbrushing\" to avoid the plastic look.",
      },
      {
        q: "Can AI generate photos that look like they were taken on film?",
        a: "Yes — specify the film stock, grain characteristics, and scanning method. \"Shot on Kodak Gold 200, scanned on Noritsu, visible grain, slightly lifted blacks\" produces convincing analog aesthetics.",
      },
      {
        q: "What's the difference between portrait and street photography prompts?",
        a: "Portrait prompts focus on subject isolation (shallow DOF, controlled lighting, posed composition). Street photography prompts emphasize candid moments, environmental context, wider lenses, and documentary lighting conditions.",
      },
    ],
  },

  "photo-editing": {
    slug: "photo-editing",
    heroTitle: "AI Photo Editing Prompts",
    heroSubtitle:
      "Transform existing photos with AI-powered editing — from style transfers and background replacements to retouching, color grading, and creative compositing. These prompts are specifically designed for ChatGPT's image editing mode where you upload a photo and describe the transformation you want. Learn how to instruct AI to modify lighting, swap backgrounds, apply cinematic color grades, remove unwanted elements, and create professional composites while preserving the original subject's identity. Each editing prompt template includes preservation instructions, change specifications, and quality guidelines.",
    howToTitle: "How to Write Photo Editing Prompts",
    tips: [
      {
        title: "Be Specific About What to Change",
        description:
          "\"Change the background to a sunset beach\" is better than \"make it look better\". Identify exactly which elements to modify and which to preserve. Use phrases like \"keep the subject unchanged\" for clarity.",
      },
      {
        title: "Reference Before & After States",
        description:
          "Describe the current state and desired state explicitly: \"The current photo has flat lighting — add dramatic side lighting with deep shadows on the right side of the face.\"",
      },
      {
        title: "Use Color Grading Language",
        description:
          "\"Apply a teal and orange color grade, lift shadows to deep blue, warm highlights, desaturate midtones by 20%\" gives precise control over the final look.",
      },
      {
        title: "Preserve Important Details",
        description:
          "Always specify what NOT to change. \"Maintain the original facial features, skin texture, and hair detail while changing the lighting\" prevents unwanted alterations.",
      },
    ],
    breakdown: [
      {
        promptTitle: "Cinematic Minimal Portrait",
        promptSlug: "cinematic-minimal-portrait",
        explanation:
          "This editing prompt works by providing a clear target aesthetic (cinematic color grade), specific technical parameters (lifted blacks, compressed highlights), and preservation instructions for the subject identity.",
      },
      {
        promptTitle: "Soft Airy 35mm Portrait",
        promptSlug: "soft-airy-35mm-portrait",
        explanation:
          "Demonstrates how to describe a complete visual transformation — specifying the target film stock look (soft grain, lifted shadows), lighting modification (backlit rim light), and color shift (warm golden tones) while maintaining the original composition.",
      },
    ],
    modelRecommendation:
      "GPT Image 2 in ChatGPT is the best choice for photo editing — it understands conversational editing instructions and can iteratively refine edits. Upload your photo, describe changes, and follow up with adjustments.",
    faq: [
      {
        q: "Can AI edit my existing photos?",
        a: "Yes — upload your photo to ChatGPT and describe the changes you want. GPT Image 2 can modify backgrounds, adjust lighting, apply color grades, remove objects, change styles, and composite elements while preserving your original subject.",
      },
      {
        q: "How do I get consistent edits across multiple photos?",
        a: "Use the same editing prompt template for each photo, specifying the exact color grade, lighting modifications, and style parameters. In ChatGPT, you can reference your previous edits in the conversation to maintain consistency.",
      },
      {
        q: "Will AI photo editing change my subject's face?",
        a: "It can if you don't specify otherwise. Always include instructions like \"preserve original facial features and proportions\" or \"do not alter the subject's face\" to prevent unwanted changes.",
      },
    ],
  },

  character: {
    slug: "character-design",
    heroTitle: "AI Character Design Prompts",
    heroSubtitle:
      "Create consistent characters with expression sheets, turnarounds, and concept variations. These prompts are specifically crafted for generating characters that maintain visual consistency across multiple generations — essential for comics, games, animation, and brand mascots. Learn techniques for defining detailed character sheets, specifying proportions and silhouettes, referencing specific art styles, and requesting multi-view reference sheets. From anime-style heroes to realistic NPCs to chibi mascots, each prompt demonstrates how to lock in a character's visual identity so AI reproduces them faithfully.",
    howToTitle: "How to Write Character Design Prompts",
    tips: [
      {
        title: "Define a Detailed Character Sheet",
        description:
          "Include physical attributes (height, build, skin tone), clothing design with specific details, accessories, color palette (use hex codes), and distinguishing features. The more specific, the more consistent across generations.",
      },
      {
        title: "Specify the Art Style Precisely",
        description:
          "\"Studio Ghibli character design\" vs \"Pixar 3D character\" vs \"DC Comics style\" produces wildly different results. Reference specific studios, artists, or games for the style you need.",
      },
      {
        title: "Request Multiple Poses/Expressions",
        description:
          "\"Character turnaround sheet showing front, 3/4, side, and back views\" or \"Expression sheet: happy, angry, surprised, sad, thinking\" gives you usable reference material.",
      },
      {
        title: "Include Proportion & Silhouette Notes",
        description:
          "\"Chibi proportions (2.5 heads tall)\" vs \"realistic proportions (7.5 heads tall)\" controls the fundamental look. Strong silhouettes make characters readable at any size.",
      },
    ],
    breakdown: [
      {
        promptTitle: "Anime Snapshot Conversion",
        promptSlug: "anime-snapshot-conversion",
        explanation:
          "This prompt succeeds at character design because it defines a complete visual identity — specifying the anime style reference, color palette constraints, and pose direction. The conversion framework ensures consistency by anchoring the character to recognizable visual conventions.",
      },
      {
        promptTitle: "Persona 5 Character Reference Card",
        promptSlug: "persona5-character-reference-card",
        explanation:
          "A masterclass in character design prompting — references a specific game's art style (Persona 5's bold graphic look), requests a structured reference card format with multiple views, and specifies the color palette and line style for maximum reproducibility.",
      },
    ],
    modelRecommendation:
      "GPT Image 2 produces the most consistent characters when given detailed descriptions. For anime/manga styles, it handles those well too. Midjourney excels at stylized character concepts but consistency across generations requires careful seed/style management.",
    faq: [
      {
        q: "How do I keep my AI character consistent across multiple images?",
        a: "Use extremely detailed descriptions covering every visual aspect — specific colors (hex codes), proportions, clothing details, and distinguishing features. In ChatGPT, maintain the same conversation thread and reference earlier generations.",
      },
      {
        q: "Can I create a character turnaround sheet with AI?",
        a: "Yes — request \"character turnaround sheet, white background, showing front view, 3/4 view, side view, and back view, clean linework, labeled\" in a single prompt. Results vary but often produce usable reference.",
      },
      {
        q: "What style references work best for character design?",
        a: "Reference specific studios (Ghibli, Pixar, Trigger), games (Persona, Fire Emblem, Genshin Impact), or art movements. Combining references like \"Ghibli color palette with Persona 5 fashion sense\" creates unique but grounded designs.",
      },
      {
        q: "How detailed should my character description be?",
        a: "Very detailed — include hair (style, color, length), eyes (shape, color), skin tone, body type, exact outfit description with colors, accessories, and any unique features. 100-200 words of description produces the most consistent results.",
      },
    ],
  },

  "ui-design": {
    slug: "ui-ux-design",
    heroTitle: "AI UI/UX Design Prompts",
    heroSubtitle:
      "Generate app interfaces, web designs, dashboard layouts, and interactive mockups with AI. These prompts produce high-fidelity UI concepts complete with realistic content, proper spacing, and modern design system aesthetics — perfect for rapid prototyping, stakeholder presentations, and design exploration. Learn how to specify platform conventions, design system tokens, real content data, component hierarchies, and interaction states in your prompts. From Material Design mobile apps to glassmorphism dashboards to native iOS interfaces, every prompt is structured like a real design brief.",
    howToTitle: "How to Write UI/UX Design Prompts",
    tips: [
      {
        title: "Specify the Design System",
        description:
          "\"Material Design 3 with dynamic color\" vs \"iOS 18 native\" vs \"Tailwind UI with shadcn components\" produces fundamentally different outputs. Name the system or describe its characteristics.",
      },
      {
        title: "Include Real Content, Not Lorem Ipsum",
        description:
          "AI generates better layouts when you provide real text content. \"Dashboard showing: Revenue $47.2K (+12%), Active Users 3,847, Conversion 4.2%\" produces more realistic results than generic placeholders.",
      },
      {
        title: "Define Screen Size & Platform",
        description:
          "\"iPhone 15 Pro Max, 393×852pt\" vs \"Desktop 1440px wide\" vs \"iPad landscape\" affects layout, navigation patterns, and component sizing. Always specify the target device.",
      },
      {
        title: "Reference Specific Components",
        description:
          "Name the UI components you need: \"bottom tab bar, floating action button, card-based feed, pull-to-refresh indicator, skeleton loading states\". This gives the AI concrete layout instructions.",
      },
      {
        title: "Specify Interaction States",
        description:
          "\"Show the button in pressed state with ripple effect\" or \"modal with 60% backdrop opacity, slide-up animation implied\" adds depth to static mockups.",
      },
    ],
    breakdown: [
      {
        promptTitle: "One-Prompt UI Design Generation",
        promptSlug: "one-prompt-ui-design-generation",
        explanation:
          "This prompt demonstrates the power of combining platform constraints (device frame), design system reference (Material Design/iOS), real content data (actual metrics and labels), and component specifications in a single generation — producing a complete, professional-looking interface.",
      },
      {
        promptTitle: "Song Dynasty Social Media Feed",
        promptSlug: "song-dynasty-social-media-feed",
        explanation:
          "A creative UI prompt that works by fusing a historical aesthetic direction with modern interface patterns. It specifies exact typography style, color palette, layout structure, and content format — proving that UI prompts can be both creative and precisely structured.",
      },
    ],
    modelRecommendation:
      "GPT Image 2 is the strongest choice for UI mockups thanks to its accurate text rendering — it can generate interfaces with readable labels, realistic data, and proper typography hierarchy. Midjourney produces more stylized UI concepts.",
    faq: [
      {
        q: "Can AI generate usable UI mockups?",
        a: "AI generates high-fidelity visual concepts, not production-ready code. They're excellent for exploring design directions, client presentations, and rapid ideation. For pixel-perfect specs, use them as references in Figma.",
      },
      {
        q: "How do I get AI to generate UI with readable text?",
        a: "GPT Image 2 handles text rendering well. Specify exact text content in your prompt (labels, headlines, data values) rather than leaving it to the AI. Shorter text strings render more accurately.",
      },
      {
        q: "What's the best aspect ratio for UI mockups?",
        a: "Use 9:16 for mobile screens, 16:9 for desktop, 4:3 for tablets. Specify the exact device frame if needed: \"iPhone 15 Pro mockup with Dynamic Island visible\" or \"MacBook Pro 14\" screen\".",
      },
      {
        q: "Can AI generate dark mode versions?",
        a: "Yes — specify \"dark mode\" or \"dark theme with OLED-true black (#000000) background, high-contrast text (#FFFFFF), and accent color #6366F1\". Reference specific dark mode conventions for the platform.",
      },
    ],
  },

  poster: {
    slug: "poster-design",
    heroTitle: "AI Poster & Graphic Design Prompts",
    heroSubtitle:
      "Create stunning movie posters, event flyers, brand visuals, album covers, and typographic compositions with AI. These prompts focus on layout hierarchy, bold typography, and visual impact — the fundamentals of great graphic design applied to AI image generation. Each prompt specifies exact text content, color palettes with hex codes, composition grids, typography hierarchy, and design movement references. Whether you need Swiss modernist minimalism, retro Art Deco elegance, or Y2K maximalism, these tested prompts produce print-ready graphic design with accurate text rendering and professional polish.",
    howToTitle: "How to Write Poster Design Prompts",
    tips: [
      {
        title: "Lead with Typography",
        description:
          "GPT Image 2 renders text accurately. Specify exact headline text in quotes, font style (\"bold condensed sans-serif\"), size hierarchy, and placement (\"centered top third\"). Typography should drive the composition.",
      },
      {
        title: "Define Visual Hierarchy",
        description:
          "\"Primary: title at 72pt bold. Secondary: tagline at 24pt light. Tertiary: credits block at 10pt\" mirrors real poster design where information has clear levels of importance.",
      },
      {
        title: "Specify Color Palette with Hex Codes",
        description:
          "\"Deep navy (#0a0a1a) background, gold accent (#d4a574), cream text (#f5f0e8)\" gives precise control. Limit to 2-3 colors plus neutrals for professional results.",
      },
      {
        title: "Reference Design Movements",
        description:
          "\"Swiss International Style grid\" vs \"Art Deco geometric patterns\" vs \"Y2K maximalism\" vs \"Japanese minimalist poster\" activates specific design language the AI has learned from millions of real posters.",
      },
      {
        title: "Include Production Specs",
        description:
          "\"A2 portrait format (420×594mm), 300dpi, CMYK color space, 5mm bleed\" communicates that this is a print-ready design, not a social media graphic — the AI adjusts detail level accordingly.",
      },
    ],
    breakdown: [
      {
        promptTitle: "Boston Spring 2026 City Poster",
        promptSlug: "boston-spring-2026-city-poster",
        explanation:
          "This poster prompt works because it specifies exact text content (city name, season, year), defines a clear visual theme (urban spring), establishes color palette constraints, and references a design tradition (travel poster) — giving the AI a complete creative brief.",
      },
      {
        promptTitle: "Vintage Amalfi Travel Poster",
        promptSlug: "vintage-amalfi-travel-poster",
        explanation:
          "Demonstrates how referencing a specific design era (mid-century travel poster) combined with location details, color direction, and typography style produces authentic-looking results. The AI has strong training data for this well-established genre.",
      },
    ],
    modelRecommendation:
      "GPT Image 2 is the top choice for posters because it renders text accurately, handles complex compositions, and follows layout instructions precisely. For more artistic/abstract poster concepts, Midjourney produces beautiful results but with less reliable text.",
    faq: [
      {
        q: "Can AI generate posters with accurate text?",
        a: "GPT Image 2 renders text with high accuracy, especially for headlines and short text blocks. Keep text to 5-10 words for best results. Longer body copy may have errors. Always specify the exact text in quotation marks.",
      },
      {
        q: "What aspect ratio should I use for posters?",
        a: "Standard poster ratios: A-series (1:√2 ≈ 1:1.41), movie poster (27×40\" ≈ 2:3), square (1:1 for social/album art). Specify both ratio and intended print size for appropriate detail level.",
      },
      {
        q: "How do I get AI to follow a specific layout grid?",
        a: "Describe the grid explicitly: \"6-column grid, title spanning columns 2-5 in the upper third, image bleeding full-width in the middle third, credits in lower-left columns 1-3.\" AI responds well to spatial instructions.",
      },
      {
        q: "Can I generate a series of matching posters?",
        a: "Yes — define a consistent template (same grid, color palette, typography system) and vary only the content and hero imagery. In ChatGPT, keep the conversation going to maintain style consistency across the series.",
      },
    ],
  },

  infographic: {
    slug: "infographic",
    heroTitle: "AI Infographic & Data Visualization Prompts",
    heroSubtitle:
      "Generate information graphics, data visualizations, educational diagrams, process flows, and statistical presentations with AI. These prompts produce clean, readable visuals that communicate complex data through effective visual hierarchy and chart design. Learn how to provide real data points, specify chart types (bar, donut, treemap, Sankey, isometric), define information architecture, and control typography hierarchy for maximum readability. From social media stat cards to full-page editorial infographics, each prompt includes the data format, layout structure, and visual style needed for polished data storytelling.",
    howToTitle: "How to Write Infographic Prompts",
    tips: [
      {
        title: "Provide Real Data Points",
        description:
          "AI generates more realistic infographics when given actual numbers: \"Show market share: Apple 28%, Samsung 21%, Xiaomi 13%, Others 38%\" is far better than \"show some data about phone brands\".",
      },
      {
        title: "Specify Chart Types",
        description:
          "Name the visualization type: \"horizontal bar chart\", \"donut chart with center label\", \"treemap\", \"Sankey diagram\", \"isometric icon array\". Each communicates data differently.",
      },
      {
        title: "Define the Information Architecture",
        description:
          "\"Three-section layout: top header with key stat, middle with 4 comparison cards, bottom with timeline\" structures the infographic before the AI starts rendering.",
      },
      {
        title: "Include Typography Hierarchy",
        description:
          "\"Title: 48pt bold black. Stat numbers: 36pt bold accent color. Labels: 14pt regular gray. Source: 10pt italic bottom-right.\" Clear type hierarchy makes infographics scannable.",
      },
    ],
    breakdown: [
      {
        promptTitle: "Science Encyclopedia Vertical Poster",
        promptSlug: "science-encyclopedia-vertical-poster",
        explanation:
          "This infographic prompt succeeds by providing structured content (scientific data with clear sections), specifying the layout format (vertical poster with numbered sections), defining visual hierarchy (headers, body text, diagram labels), and establishing an educational tone through color and typography choices.",
      },
      {
        promptTitle: "Chili Pork Cooking Flowchart",
        promptSlug: "chili-pork-cooking-flowchart",
        explanation:
          "Demonstrates how process-oriented infographics work in AI — by defining sequential steps, specifying flowchart visual language (arrows, boxes, decision points), providing real content for each step, and establishing a cohesive color-coded system for ingredients vs actions.",
      },
    ],
    modelRecommendation:
      "GPT Image 2 is ideal for infographics thanks to its text rendering accuracy — labels, numbers, and legends render correctly. For more artistic/editorial infographic styles, Midjourney produces beautiful but less precise results.",
    faq: [
      {
        q: "Can AI create infographics with accurate data?",
        a: "AI generates the visual design — you must provide the data. Include exact numbers, percentages, and labels in your prompt. The AI won't research or verify data; it visualizes what you provide.",
      },
      {
        q: "What makes a good infographic prompt?",
        a: "Include: the topic/title, 3-6 data points with values, preferred chart type, color scheme, and layout structure. The more structured your input, the more professional the output.",
      },
      {
        q: "Can AI generate interactive or animated infographics?",
        a: "AI generates static images only. For interactive visualizations, use the AI output as a design reference and implement it with D3.js, Chart.js, or similar tools. The AI excels at the design direction phase.",
      },
    ],
  },

  film: {
    slug: "film-cinematic",
    heroTitle: "AI Cinematic & Film Prompts",
    heroSubtitle:
      "Generate movie stills, cinematic scenes, film noir compositions, and director-inspired imagery with AI. These prompts reference real cinematography techniques — anamorphic lens characteristics, color timing, production design, and framing — to produce images that feel like authentic frames from films. Learn how to reference specific directors' visual styles, describe lens characteristics and aspect ratios, apply professional color grading language, specify atmospheric elements like volumetric light and haze, and set production design eras. From neo-noir to sci-fi to period drama, these prompts transform AI outputs into cinematic art.",
    howToTitle: "How to Write Cinematic Prompts",
    tips: [
      {
        title: "Reference Specific Directors or DPs",
        description:
          "\"Roger Deakins lighting\" vs \"Bradford Young underexposed\" vs \"Emmanuel Lubezki natural light long take\" activates specific visual languages. Name the filmmaker whose style you want.",
      },
      {
        title: "Describe the Lens Characteristics",
        description:
          "\"Anamorphic lens flares, oval bokeh, 2.39:1 aspect ratio\" immediately signals cinematic intent. \"Spherical lens, clean, clinical\" gives a different feel. Lens choice defines the look.",
      },
      {
        title: "Use Color Timing Language",
        description:
          "\"Teal shadows, orange highlights\" (the blockbuster look). \"Desaturated with one accent color\" (Schindler's List approach). \"Crushed blacks, blown highlights\" (Fincher). Color timing is half the cinematic feel.",
      },
      {
        title: "Set the Production Design Era",
        description:
          "\"1970s New York production design — wood paneling, shag carpet, mustard yellow and avocado green palette\" places the image in a specific world. Production design sells the cinematic quality.",
      },
      {
        title: "Include Atmospheric Elements",
        description:
          "\"Volumetric light through dusty air\", \"cigarette smoke catching backlight\", \"rain on window creating bokeh\", \"practical neon signs as motivated light\" — atmosphere separates cinematic from clinical.",
      },
    ],
    breakdown: [
      {
        promptTitle: "Convenience Store Neon Portrait",
        promptSlug: "convenience-store-neon-portrait",
        explanation:
          "This works as a cinematic prompt because it establishes a complete scene — location (convenience store at night), motivated practical lighting (neon signs as key light), atmospheric elements (urban haze), and an implied narrative tension. It reads like a shot description from a Wong Kar-wai screenplay.",
      },
      {
        promptTitle: "Cinematic Minimal Portrait",
        promptSlug: "cinematic-minimal-portrait",
        explanation:
          "Demonstrates the power of restraint in cinematic prompting — minimal set dressing focuses attention on lighting quality, color timing (desaturated palette with single accent), and negative space composition that mirrors arthouse cinema framing techniques.",
      },
    ],
    modelRecommendation:
      "GPT Image 2 excels at cinematic realism with accurate lighting and atmosphere. Midjourney v6 produces more stylized, painterly cinematic images that sometimes feel more \"cinematic\" but less photorealistic. Both handle this category well.",
    faq: [
      {
        q: "How do I make AI images look like movie stills?",
        a: "Key elements: widescreen aspect ratio (2.39:1 or 1.85:1), anamorphic lens characteristics, cinematic color grading, production design details, atmospheric elements (haze, smoke, rain), and motivated practical lighting sources.",
      },
      {
        q: "What aspect ratio should I use for cinematic images?",
        a: "2.39:1 (CinemaScope/anamorphic) for epic/dramatic scenes. 1.85:1 (Academy Flat) for intimate dramas. 16:9 for modern TV/streaming look. 4:3 for vintage/arthouse aesthetic. The aspect ratio alone communicates genre.",
      },
      {
        q: "Can I reference specific films in my prompts?",
        a: "Reference the visual style rather than specific copyrighted scenes: \"Blade Runner 2049 color palette and atmosphere\" or \"lighting style reminiscent of The Godfather\" works better than recreating specific frames.",
      },
    ],
  },

  game: {
    slug: "game-art",
    heroTitle: "AI Game Art & Concept Prompts",
    heroSubtitle:
      "Generate game screenshots, concept art, environment paintings, weapon designs, and virtual world imagery with AI. These prompts cover AAA photorealism, indie pixel art, stylized cel-shading, and everything in between — crafted for game developers, concept artists, and world builders. Learn how to specify game engine fidelity levels, reference iconic art styles from specific titles, include HUD elements for authentic screenshots, and define camera perspectives that ground images in interactive design. From Unreal Engine 5 photorealism to retro SNES pixel art, each prompt is structured as a game development art brief.",
    howToTitle: "How to Write Game Art Prompts",
    tips: [
      {
        title: "Specify the Game Engine Look",
        description:
          "\"Unreal Engine 5 Nanite geometry, Lumen global illumination\" vs \"Unity HDRP with stylized post-processing\" vs \"retro PS1 low-poly aesthetic\" defines the technical fidelity level.",
      },
      {
        title: "Reference Game Art Styles",
        description:
          "\"Elden Ring dark fantasy\" vs \"Zelda: Tears of the Kingdom cel-shaded\" vs \"Disco Elysium painterly\" activates specific aesthetic databases. Combine references for unique styles.",
      },
      {
        title: "Include UI Elements for Screenshots",
        description:
          "\"Screenshot with minimal HUD: health bar top-left, minimap bottom-right, interaction prompt center-bottom\" makes generated images look like actual in-game captures.",
      },
      {
        title: "Define the Camera Perspective",
        description:
          "\"Third-person over-shoulder\" vs \"isometric 45°\" vs \"first-person with weapon visible\" vs \"top-down roguelike\" defines how the player would see this scene, grounding it in game design.",
      },
    ],
    breakdown: [
      {
        promptTitle: "Super Famicom Poster Style",
        promptSlug: "super-famicom-poster-style",
        explanation:
          "This prompt works by anchoring to a specific console era (Super Famicom/SNES), which immediately constrains the color palette, pixel density, and art style. By referencing the era's promotional art style rather than in-game graphics, it produces higher-fidelity results with authentic retro character.",
      },
      {
        promptTitle: "Mecha Girl Sea-City Key Visual",
        promptSlug: "mecha-girl-sea-city-key-visual",
        explanation:
          "Demonstrates how game key visual prompts combine character design (mecha girl), environment (sea city), mood/narrative, and composition format (vertical key visual) into a single cohesive art direction. The specificity of the setting creates a unique world that feels like an actual game's concept art.",
      },
    ],
    modelRecommendation:
      "Midjourney excels at stylized game concept art and environment paintings. GPT Image 2 is stronger for photorealistic game screenshots and UI mockups with readable text. For pixel art and retro styles, both perform well with specific references.",
    faq: [
      {
        q: "Can AI generate game-ready assets?",
        a: "AI generates concept art and reference images, not production-ready game assets. Use them for mood boards, pitch decks, pre-production concepting, and design direction. Final assets still need 3D modeling, texturing, and optimization.",
      },
      {
        q: "How do I generate consistent game environments?",
        a: "Define a strict art bible: color palette (hex codes), lighting direction, material properties, and style references. Keep these constant across prompts. In ChatGPT, maintain conversation context for consistency.",
      },
      {
        q: "What prompts work for pixel art games?",
        a: "Specify resolution (\"32×32 sprite\", \"16-bit SNES style\"), palette limitations (\"4-color Game Boy palette\", \"NES color restrictions\"), and animation intent (\"idle animation sprite sheet, 4 frames\").",
      },
      {
        q: "Can AI generate game UI designs?",
        a: "Yes — GPT Image 2 handles game UI well. Specify the genre (RPG inventory, FPS HUD, strategy minimap), platform (mobile touch, PC, console), and reference games for style direction.",
      },
    ],
  },

  product: {
    slug: "product-photography",
    heroTitle: "AI Product & Commercial Photography Prompts",
    heroSubtitle:
      "Generate professional product shots, commercial advertisements, packaging mockups, and brand lifestyle imagery with AI. These prompts produce e-commerce ready visuals with proper studio lighting, clean backgrounds, and commercial polish — perfect for brands, DTC startups, and marketing teams needing volume content. Learn how to specify shot types (hero, flat-lay, lifestyle, macro detail), define studio lighting setups, choose surfaces and backgrounds that communicate brand positioning, and add lifestyle context. From white-background Amazon listings to editorial beauty shots, each prompt is structured as a commercial photography brief.",
    howToTitle: "How to Write Product Photography Prompts",
    tips: [
      {
        title: "Define the Shot Type",
        description:
          "\"Hero shot on white sweep\" vs \"lifestyle flat-lay\" vs \"in-context environmental shot\" vs \"macro detail shot\" — each serves a different purpose in the marketing funnel and produces vastly different compositions.",
      },
      {
        title: "Specify Studio Lighting Setup",
        description:
          "\"Two softboxes at 45°, hair light from above, white fill card below\" for clean product shots. \"Single hard light with dramatic shadows\" for premium/luxury positioning. Lighting communicates brand tier.",
      },
      {
        title: "Include Surface & Background",
        description:
          "\"Matte black surface with subtle reflection\" vs \"warm oak table with linen napkin\" vs \"infinity white cyclorama\" — the surface and background define the brand context.",
      },
      {
        title: "Add Lifestyle Context",
        description:
          "\"Coffee cup held by hands in a cozy sweater, morning light through window, shallow DOF\" turns a product shot into a lifestyle image. Context helps customers envision the product in their life.",
      },
    ],
    breakdown: [
      {
        promptTitle: "VR Headset Exploded View — Product Poster",
        promptSlug: "vr-headset-exploded-view-technical",
        explanation:
          "This product prompt succeeds by combining a specific product (VR headset), a creative shot concept (exploded view showing internal components), technical rendering style (clean product poster), and clear commercial intent — producing imagery suitable for product launches or tech marketing.",
      },
      {
        promptTitle: "Convenience Store Neon Portrait",
        promptSlug: "convenience-store-neon-portrait",
        explanation:
          "While primarily a photography prompt, it demonstrates key product/commercial principles: specific lighting motivation (neon as practical light), environmental storytelling that brands use for lifestyle campaigns, and a clear mood/atmosphere that would work for brand advertising contexts.",
      },
    ],
    modelRecommendation:
      "GPT Image 2 produces the most realistic product photography with accurate reflections, materials, and lighting. For stylized brand campaign imagery, Midjourney offers more artistic direction. Both handle text on packaging well.",
    faq: [
      {
        q: "Can I use AI product photos for my e-commerce store?",
        a: "AI-generated product images can be used for concept mockups, social media, and marketing materials. For actual product listings, many marketplaces require real photographs. Check platform policies before using AI images as primary product photos.",
      },
      {
        q: "How do I get clean white background product shots?",
        a: "Specify \"product photography on infinite white background, studio lighting, no shadows\" or \"pure white cyclorama (#FFFFFF), soft even lighting, product centered\". Add \"e-commerce style\" for the cleanest results.",
      },
      {
        q: "Can AI generate lifestyle product photography?",
        a: "Yes — describe the lifestyle context in detail: setting, lighting, hands/models, props, and mood. \"Skincare bottle on marble bathroom counter, morning sunlight, eucalyptus sprig, soft focus background\" works well for beauty brands.",
      },
      {
        q: "How do I get consistent branding across multiple AI-generated product images?",
        a: "Establish a style guide in your prompts: fix the background color (use hex codes), lighting direction, camera angle, and post-processing style. Reuse these parameters across all product shots for visual consistency.",
      },
    ],
  },
};
