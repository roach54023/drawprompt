/**
 * AI Image Prompt Library — Core Data
 *
 * GPT Image 2 为核心，同时覆盖 ChatGPT / Midjourney / DALL-E
 * 每个 prompt 都是可直接复制使用的完整提示词
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export type AIPromptCategory =
  | "photography"
  | "photo-editing"
  | "character"
  | "ui-design"
  | "poster"
  | "infographic"
  | "film"
  | "game"
  | "product";

export type AIModel = "gpt-image-2" | "chatgpt" | "midjourney" | "dall-e";
export type PromptDifficulty = "beginner" | "intermediate" | "advanced";

export interface AIPrompt {
  id: string;
  slug: string;
  title: string;
  prompt: string;
  category: AIPromptCategory;
  tags: string[];
  aiModels: AIModel[];
  difficulty: PromptDifficulty;
  /** Placeholder image description — will be replaced with real images later */
  imageAlt: string;
  imageUrl: string;
  /** Prompt breakdown for educational value */
  breakdown: {
    subject: string;
    style: string;
    lighting: string;
    composition: string;
    details: string;
  };
  tips: string[];
  featured: boolean;
  createdAt: string;
}

export interface CategoryInfo {
  id: AIPromptCategory;
  label: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  icon: string;
  color: string;
  bg: string;
}

// ─── Category Definitions ───────────────────────────────────────────────────

export const categories: CategoryInfo[] = [
  {
    id: "photography",
    label: "Realistic Photography",
    description: "Photorealistic images that look like they were taken with a real camera",
    seoTitle: "AI Photography Prompts — Photorealistic Image Generation",
    seoDescription: "Copy-paste prompts for generating photorealistic images with GPT Image 2, ChatGPT, and Midjourney. Portraits, street photography, macro shots, and more.",
    icon: "📷",
    color: "#5a9e7a",
    bg: "#eef6f2",
  },
  {
    id: "photo-editing",
    label: "Photo Editing",
    description: "Transform existing photos with AI — style transfer, retouching, compositing",
    seoTitle: "ChatGPT Photo Editing Prompts — AI Photo Manipulation",
    seoDescription: "Best prompts for editing photos with ChatGPT and GPT Image 2. Style transfer, background replacement, color grading, and creative compositing.",
    icon: "✨",
    color: "#c47ab8",
    bg: "#faf0f8",
  },
  {
    id: "character",
    label: "Character Design",
    description: "Consistent characters, expression sheets, and character concepts",
    seoTitle: "AI Character Design Prompts — Consistent Characters & Concepts",
    seoDescription: "Generate consistent character designs with GPT Image 2. Expression sheets, outfit variations, turnaround views, and character concept art prompts.",
    icon: "🎭",
    color: "#c4714a",
    bg: "#fdf0e8",
  },
  {
    id: "ui-design",
    label: "UI / UX Design",
    description: "App interfaces, web designs, and mockup generation",
    seoTitle: "AI UI/UX Design Prompts — Generate App & Web Mockups",
    seoDescription: "Prompts for generating UI/UX designs with GPT Image 2. App mockups, web interfaces, dashboard designs, and mobile UI concepts.",
    icon: "📱",
    color: "#7b9eb8",
    bg: "#eef4f8",
  },
  {
    id: "poster",
    label: "Poster & Graphic Design",
    description: "Movie posters, event flyers, brand visuals, and typography",
    seoTitle: "AI Poster Design Prompts — Graphic Design & Typography",
    seoDescription: "Create stunning posters and graphic designs with AI. Movie posters, event flyers, brand visuals, and creative typography prompts for GPT Image 2.",
    icon: "🎨",
    color: "#b8924a",
    bg: "#fdf8e8",
  },
  {
    id: "infographic",
    label: "Infographic & Data Viz",
    description: "Information graphics, educational diagrams, and visual explainers",
    seoTitle: "AI Infographic Prompts — Data Visualization & Visual Explainers",
    seoDescription: "Generate beautiful infographics and data visualizations with GPT Image 2. Educational diagrams, process flows, and visual explainer prompts.",
    icon: "📊",
    color: "#6aab8a",
    bg: "#eef7f2",
  },
  {
    id: "film",
    label: "Film & Cinematic",
    description: "Movie stills, cinematic compositions, and film-inspired visuals",
    seoTitle: "AI Cinematic Prompts — Film Stills & Movie-Style Images",
    seoDescription: "Generate cinematic images with GPT Image 2. Movie stills, film noir, sci-fi scenes, and dramatic cinematic compositions with AI.",
    icon: "🎬",
    color: "#8b7ab8",
    bg: "#f2f0f8",
  },
  {
    id: "game",
    label: "Game Art",
    description: "Game assets, concept art, pixel art, and game UI",
    seoTitle: "AI Game Art Prompts — Game Concept Art & Assets",
    seoDescription: "Create game art with GPT Image 2. Concept art, pixel art, game UI, character sprites, and environment design prompts for game developers.",
    icon: "🎮",
    color: "#b85a5a",
    bg: "#fdf0f0",
  },
  {
    id: "product",
    label: "Product & E-commerce",
    description: "Product photography, packaging design, and e-commerce visuals",
    seoTitle: "AI Product Photography Prompts — E-commerce & Packaging Design",
    seoDescription: "Generate professional product photos with GPT Image 2. E-commerce photography, packaging mockups, and product visualization prompts.",
    icon: "🛍️",
    color: "#8b5a7a",
    bg: "#f8f0f4",
  },
];

export function getCategoryInfo(id: AIPromptCategory): CategoryInfo {
  return categories.find((c) => c.id === id)!;
}

// ─── Prompt Data ────────────────────────────────────────────────────────────

export const aiPrompts: AIPrompt[] = [
  {
    id: "photo-004",
    slug: "ai-portrait-prompt-golden-hour-natural",
    title: "AI Portrait Prompt — Golden Hour Natural Photography",
    prompt: "A close-up portrait of a young woman with freckles, shot during golden hour. Warm sunlight catches individual strands of her auburn hair, creating a glowing halo effect. Her green eyes reflect the sunset. Natural skin texture visible — pores, fine peach fuzz, a small scar on her chin. No makeup, no retouching. Shot on Canon EOS R5, 85mm f/1.2, bokeh background of out-of-focus wildflowers. Photorealistic, editorial quality.",
    category: "photography",
    tags: ["ai portrait prompt", "golden hour photography", "natural portrait", "freckles portrait", "editorial photography prompt", "bokeh portrait", "realistic AI portrait"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "intermediate",
    imageAlt: "Close-up portrait of freckled woman in golden hour light with bokeh wildflowers",
    imageUrl: "/prompts/celebrity-real-life.webp",
    breakdown: {
      subject: "Young woman with freckles, auburn hair, green eyes",
      style: "Canon EOS R5, 85mm f/1.2, editorial quality",
      lighting: "Golden hour sunlight, halo effect on hair",
      composition: "Close-up portrait, bokeh wildflower background",
      details: "Natural skin texture, pores, peach fuzz, small scar, no retouching",
    },
    tips: [
      "Mentioning imperfections (scar, pores, peach fuzz) makes AI portraits more realistic",
      "'No makeup, no retouching' prevents the AI from generating overly polished skin",
      "85mm f/1.2 is the classic portrait lens combo — the AI knows this look well",
    ],
    featured: true,
    createdAt: "2026-04-24",
  },
  {
    id: "char-001",
    slug: "ai-character-expression-sheet-prompt",
    title: "AI Character Expression Sheet Prompt — 16 Emotions Grid",
    prompt: "Create a 4x4 grid character expression sheet for an anime-style girl with short blue hair, large amber eyes, and a small bandage on her left cheek. Each of the 16 cells shows the same character with a different expression: happy, sad, angry, surprised, confused, embarrassed, sleepy, excited, scared, disgusted, smug, crying, laughing, determined, love-struck, and deadpan. Consistent character design across all 16 expressions. Clean white background, anime illustration style, vibrant colors. Each cell is clearly separated by thin grey lines.",
    category: "character",
    tags: ["ai character expression sheet", "character design prompt", "anime expression grid", "character consistency", "emotion sheet AI", "GPT image character", "16 expressions"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "intermediate",
    imageAlt: "4x4 grid of anime character showing 16 different facial expressions",
    imageUrl: "/prompts/character-reference-sheet.webp",
    breakdown: {
      subject: "Anime girl with blue hair, amber eyes, bandage on cheek",
      style: "Anime illustration, clean lines, vibrant colors",
      lighting: "Flat, even lighting for reference sheet",
      composition: "4x4 grid with thin grey line separators",
      details: "16 distinct expressions, consistent character across all cells",
    },
    tips: [
      "Listing all 16 expressions explicitly prevents the AI from repeating or skipping any",
      "The 'small bandage on left cheek' is a distinctive feature that helps maintain consistency",
      "Specifying 'thin grey lines' between cells keeps the grid clean and organized",
    ],
    featured: true,
    createdAt: "2026-04-24",
  },
  {
    id: "edit-001",
    slug: "ghibli-style-ai-prompt",
    title: "Studio Ghibli Style AI Prompt — Photo to Anime Transformation",
    prompt: "Transform this photograph into a Studio Ghibli anime style illustration. Keep the exact same composition, poses, and spatial relationships between all elements. Convert realistic textures to Ghibli's signature hand-painted watercolor aesthetic — soft edges, warm color palette with slightly desaturated tones, visible brushstrokes in the sky. Add Ghibli-style cumulus clouds. Maintain facial expressions but simplify features to anime proportions. The lighting should feel like a warm summer afternoon in a Miyazaki film.",
    category: "photo-editing",
    tags: ["ghibli style ai prompt", "photo to anime", "studio ghibli filter", "miyazaki style", "anime style transfer", "ChatGPT ghibli", "AI anime transformation"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "beginner",
    imageAlt: "Photo transformed into Studio Ghibli anime style with watercolor aesthetic",
    imageUrl: "/prompts/song-dynasty-social.webp",
    breakdown: {
      subject: "Any photograph (upload your own)",
      style: "Studio Ghibli hand-painted watercolor aesthetic",
      lighting: "Warm summer afternoon, Miyazaki film quality",
      composition: "Preserved from original photo",
      details: "Soft edges, visible brushstrokes, anime proportions, cumulus clouds",
    },
    tips: [
      "This is an image-to-image prompt — upload your photo along with this text",
      "Emphasizing 'keep the exact same composition' prevents the AI from changing the layout",
      "The Ghibli style is one of the most reliable style transfers in GPT Image 2",
    ],
    featured: true,
    createdAt: "2026-04-24",
  },
  {
    id: "coffee-brewing-infographic",
    slug: "ai-infographic-prompt-coffee-brewing",
    title: "AI Infographic Prompt — Coffee Brewing Methods Guide",
    prompt: "A beautiful vertical infographic about coffee brewing methods. Title: 'The Art of Coffee Brewing' in elegant serif font. 6 sections arranged vertically, each showing a brewing method with a cute illustrated icon: 1) Pour Over - V60 dripper icon, brew time 3-4 min, flavor: clean & bright; 2) French Press - plunger icon, brew time 4 min, flavor: full & rich; 3) Espresso - portafilter icon, brew time 25-30 sec, flavor: intense & concentrated; 4) AeroPress - device icon, brew time 1-2 min, flavor: smooth & versatile; 5) Cold Brew - jar icon, brew time 12-24 hrs, flavor: sweet & mellow; 6) Moka Pot - pot icon, brew time 5 min, flavor: strong & bold. Color palette: warm browns (#8B4513, #D2691E), cream (#FFF8DC), and coffee black (#1C1C1C). Each section has a small temperature indicator and grind size recommendation. Footer: 'drawprompt.org' in small text. Aspect ratio 9:16, 4K.",
    category: "infographic",
    tags: ["ai infographic prompt", "coffee infographic", "data visualization AI", "educational graphic prompt", "vertical infographic", "GPT image infographic"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "advanced",
    imageAlt: "Vertical infographic showing six coffee brewing methods with illustrated icons",
    imageUrl: "/prompts/museum-infographic.webp",
    breakdown: {
      subject: "6 coffee brewing methods with icons and details",
      style: "Clean infographic with illustrated icons",
      lighting: "Flat design, no dramatic lighting",
      composition: "Vertical layout (9:16), 6 sections stacked",
      details: "Specific brew times, flavor profiles, color hex codes, grind sizes",
    },
    tips: [
      "Numbered sections with clear hierarchy help GPT Image 2 organize complex layouts",
      "Including specific data (times, temperatures) makes infographics look professional",
      "9:16 aspect ratio is perfect for social media stories and pins",
    ],
    featured: true,
    createdAt: "2025-04-15",
  },
  {
    id: "cartoon-avatar-pixar",
    slug: "pixar-style-ai-prompt-3d-avatar",
    title: "Pixar Style AI Prompt — 3D Cartoon Avatar from Photo",
    prompt: "Transform this photo into a Pixar-style 3D animated character. The character should have: slightly exaggerated proportions (larger head-to-body ratio, about 1:4), big expressive eyes with detailed iris reflections, a warm friendly smile showing slight dimples, and smooth stylized skin with subtle subsurface scattering. Hair should be rendered as thick, sculpted strands with natural movement and shine — not individual strands but chunky, animated-style hair masses. Clothing should match the original photo but rendered in the Pixar aesthetic: slightly simplified fabric folds, vibrant saturated colors, and a clean matte-to-satin material finish. The character stands in a 3/4 pose with one hand on hip, looking at the camera with a confident expression. Background: a soft gradient from warm peach (#FFE5CC) to light sky blue (#CCE5FF), with subtle bokeh circles. Lighting: classic Pixar three-point setup — warm key light from upper right, cool fill from left, and a rim light creating a subtle glow around the hair. Render quality: Pixar feature film, 4K.",
    category: "character",
    tags: ["pixar style ai prompt", "3d cartoon avatar", "photo to pixar", "AI avatar generator prompt", "cartoon portrait AI", "ChatGPT pixar style", "Disney style prompt"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "beginner",
    imageAlt: "Pixar-style 3D animated character avatar with expressive eyes and warm lighting",
    imageUrl: "/prompts/music-player-nano.webp",
    breakdown: {
      subject: "Person transformed into a Pixar-style 3D animated character",
      style: "Pixar feature film quality 3D animation",
      lighting: "Three-point Pixar setup — warm key, cool fill, rim light on hair",
      composition: "3/4 pose, gradient background with bokeh, character centered",
      details: "Exaggerated proportions (1:4 head ratio), chunky hair strands, iris reflections, dimples, specific gradient hex codes",
    },
    tips: [
      "Upload your own photo for a personalized Pixar avatar — one of the most popular ChatGPT image uses",
      "Specifying 'chunky, animated-style hair masses' prevents GPT Image 2 from rendering realistic individual strands",
      "The three-point lighting setup is signature Pixar and makes the character pop",
    ],
    featured: true,
    createdAt: "2025-04-25",
  },
  {
    id: "90s-game-character-photo",
    slug: "ai-90s-retro-game-character-prompt",
    title: "AI 90s Retro Prompt — Video Game Character Candid Photo",
    prompt: "A grungy analog photograph of Mario (the Nintendo character) sitting on the floor of a dimly lit 1990s bedroom, playing Super Mario Bros on a CRT television connected to a Nintendo Entertainment System. He is holding an NES controller in both hands, looking back at the camera mid-action with a surprised expression. His red cap is slightly tilted, and his overalls look like real denim fabric. Beside him: a half-eaten slice of pizza on a paper plate, a can of Coca-Cola, and a stack of game cartridges. The room has wood-paneled walls, a shag carpet, and a lava lamp glowing orange in the corner. The TV screen shows the actual game with pixel graphics. Shot with candid paparazzi flash photography — harsh direct flash creating sharp shadows, slight red-eye effect, visible film grain (ISO 800), and the raw, unedited look of a disposable camera photo from 1994. Color palette: warm yellows, muted greens, and the blue glow of the CRT.",
    category: "film",
    tags: ["ai 90s retro prompt", "video game character photo", "retro gaming aesthetic", "analog photography AI", "nostalgia prompt", "Mario AI art", "disposable camera style"],
    aiModels: ["gpt-image-2", "chatgpt", "midjourney"],
    difficulty: "intermediate",
    imageAlt: "Mario sitting in a 90s bedroom playing NES on a CRT TV in candid flash photography style",
    imageUrl: "/prompts/movie-collage-superman.webp",
    breakdown: {
      subject: "Mario (Nintendo) as a real person in a 90s bedroom playing his own game",
      style: "Candid analog photography, disposable camera aesthetic, 1994 vibes",
      lighting: "Harsh direct flash + CRT screen glow + lava lamp ambient",
      composition: "Floor-level shot, character looking back at camera, room context visible",
      details: "Real fabric textures on costume, period-accurate props (NES, CRT, lava lamp), film grain, red-eye",
    },
    tips: [
      "Replace 'Mario' with any game character and their respective game/console for endless variations",
      "The 'candid paparazzi flash' instruction is key to getting the authentic 90s snapshot look",
      "Period-specific props (lava lamp, shag carpet, wood paneling) sell the era",
    ],
    featured: true,
    createdAt: "2025-04-25",
  },
  {
    id: "christmas-family-portrait",
    slug: "ai-christmas-photo-prompt-family-portrait",
    title: "AI Christmas Photo Prompt — Family Portrait with Matching Pajamas",
    prompt: "A warm, photorealistic Christmas family portrait. A family of four (parents in their 30s, a boy around 7, a girl around 4) sitting on a cozy couch in front of a decorated Christmas tree. Everyone wearing matching red plaid pajamas. The tree has warm white string lights, gold and red ornaments, and a gold star on top. Soft presents wrapped in kraft paper with red ribbons underneath. A golden retriever lying at their feet wearing a small Santa hat. The room has a brick fireplace with stockings hung (4 stockings + 1 small one for the dog). Warm, soft lighting from the tree and fireplace. Shot on Canon R5, 35mm f/1.8, creating a warm bokeh from the tree lights. Color grading: warm, slightly desaturated, cozy holiday feel.",
    category: "photography",
    tags: ["ai christmas photo prompt", "christmas family portrait", "holiday photo AI", "matching pajamas photo", "cozy christmas aesthetic", "seasonal AI prompt"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "intermediate",
    imageAlt: "Warm Christmas family portrait with matching red plaid pajamas by decorated tree",
    imageUrl: "/prompts/apple-park-keynote.webp",
    breakdown: {
      subject: "Family of four with golden retriever in matching pajamas",
      style: "Warm photorealistic portrait photography",
      lighting: "Christmas tree lights + fireplace, warm bokeh",
      composition: "Family on couch, tree behind, presents below, dog at feet",
      details: "Matching pajamas, specific ornament colors, stocking count, camera settings",
    },
    tips: [
      "Matching outfits create visual cohesion in family portraits",
      "Specifying the number of stockings (including the dog's) adds charming detail",
      "Warm color grading descriptions help achieve the cozy holiday feel",
    ],
    featured: true,
    createdAt: "2025-04-03",
  },
  {
    id: "toy-action-figure-blister-pack",
    slug: "ai-action-figure-prompt-custom-toy",
    title: "AI Action Figure Prompt — Custom Toy in Blister Pack",
    prompt: "Create a stylized action figure of a person in a premium collectible toy blister pack. The figure should be approximately 6 inches tall, standing upright inside clear plastic packaging mounted on a printed cardboard backing. The figure has a friendly, confident smile with clearly recognizable features. It wears a navy blue hoodie with a small embroidered logo, dark jeans, and white sneakers. The blister pack header card reads 'CREATIVE DIRECTOR' in bold sans-serif font with a gradient from electric blue to purple. Below the title: 'Series 1 — Limited Edition' in smaller text. The packaging includes 4 miniature accessories displayed in a separate compartment: a tiny laptop, a coffee mug that says 'DESIGN', a pair of miniature headphones, and a small sketchbook. The cardboard backing has a subtle geometric pattern in silver foil. The figure has the slightly glossy, injection-molded plastic look of a real collectible toy. Studio product photography on a clean white background with soft even lighting. 4K, photorealistic packaging.",
    category: "product",
    tags: ["ai action figure prompt", "custom toy AI", "blister pack generator", "collectible figure prompt", "viral AI trend", "GPT image toy", "personalized action figure"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "intermediate",
    imageAlt: "Custom action figure in a premium blister pack with accessories and branded packaging",
    imageUrl: "/prompts/ecommerce-app-homepage.webp",
    breakdown: {
      subject: "6-inch action figure in collectible blister pack packaging",
      style: "Product photography of a premium collectible toy",
      lighting: "Soft even studio lighting on white background",
      composition: "Front-facing product shot showing figure and accessories in packaging",
      details: "Specific text on packaging, 4 named accessories, material descriptions (injection-molded plastic, silver foil), clothing details",
    },
    tips: [
      "Upload your own photo and ask GPT Image 2 to base the figure on your likeness",
      "Change the title and accessories to match any profession or hobby",
      "This trend went massively viral — customize the 'Series' number and edition type for uniqueness",
    ],
    featured: true,
    createdAt: "2025-04-25",
  },
  {
    id: "3d-fluffy-icon-set",
    slug: "ai-3d-icon-design-prompt-fluffy",
    title: "AI 3D Icon Design Prompt — Fluffy Plush App Icons",
    prompt: "A set of 9 app icons arranged in a 3x3 grid, each rendered as a 3D fluffy/plush object on a clean pastel background. Each icon is a soft, puffy, tactile-looking 3D object with visible fabric texture like velvet or fleece. The icons represent: 1) Camera — a fluffy pink camera with a round lens, 2) Music — a fluffy purple music note, 3) Messages — a fluffy green speech bubble, 4) Weather — a fluffy yellow sun with orange rays, 5) Calendar — a fluffy red calendar page showing '25', 6) Settings — a fluffy grey gear/cog, 7) Photos — a fluffy blue flower (like the macOS Photos icon), 8) Mail — a fluffy white envelope with a red heart seal, 9) Clock — a fluffy mint green alarm clock. Each icon sits on a matching pastel-colored rounded square background (iOS style, 180x180px feel). The objects cast soft shadows. Style: 3D render with subsurface scattering to show the plush translucency. Lighting: soft studio lighting from upper left. The overall feel should be cute, tactile, and satisfying — like you want to squeeze them. 4K, clean white background behind the grid.",
    category: "ui-design",
    tags: ["ai 3d icon prompt", "fluffy icon design", "plush app icons", "cute UI design AI", "3D render prompt", "kawaii icon set", "GPT image icons"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "intermediate",
    imageAlt: "3x3 grid of cute 3D fluffy plush app icons on pastel backgrounds",
    imageUrl: "/prompts/custom-style-ui-system.webp",
    breakdown: {
      subject: "9 app icons as 3D fluffy/plush objects",
      style: "3D render with subsurface scattering, cute and tactile",
      lighting: "Soft studio lighting from upper left, soft shadows",
      composition: "3x3 grid on clean white background, iOS-style rounded squares",
      details: "Specific icon for each slot, fabric texture (velvet/fleece), individual colors, shadow casting",
    },
    tips: [
      "Specifying the material (velvet, fleece) and rendering technique (subsurface scattering) is key to the fluffy look",
      "This style is trending for app icon redesigns and social media content",
      "You can replace the 9 icons with any set — social media apps, tools, food items, etc.",
    ],
    featured: true,
    createdAt: "2025-04-25",
  },
  {
    id: "ui-001",
    slug: "ai-app-ui-design-prompt-music-player",
    title: "AI App UI Design Prompt — Dark Mode Music Player",
    prompt: "Design a mobile music player app screen (iPhone 15 Pro dimensions, 393x852px). Dark mode UI with a deep navy (#0a0e1a) background. Currently playing: 'Midnight Rain' by Aurora. Large album art in the center (abstract watercolor of rain on a window at night). Below: song title in white SF Pro Display Bold 18px, artist name in grey 14px. Progress bar with a glowing blue (#4a9eff) accent. Playback controls: previous, play/pause (large circle), next. Bottom: volume slider, AirPlay icon, queue icon. Subtle glassmorphism card behind the album art. Clean, minimal, Apple Music-inspired aesthetic.",
    category: "ui-design",
    tags: ["ai ui design prompt", "app mockup AI", "music player UI", "dark mode design", "iOS app design prompt", "glassmorphism UI", "GPT image UI"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "intermediate",
    imageAlt: "Dark mode music player app screen with album art and playback controls",
    imageUrl: "/prompts/music-player-ui.webp",
    breakdown: {
      subject: "Mobile music player app screen",
      style: "Dark mode, Apple Music-inspired, glassmorphism",
      lighting: "Dark UI with glowing blue accents",
      composition: "iPhone 15 Pro dimensions, centered album art",
      details: "Specific colors, font sizes, UI elements, and layout positions",
    },
    tips: [
      "GPT Image 2 can render text in UI mockups with high accuracy — specify exact text content",
      "Providing hex color codes gives precise control over the color scheme",
      "Mentioning specific device dimensions helps the AI generate correct proportions",
    ],
    featured: true,
    createdAt: "2026-04-24",
  },
  {
    id: "noir-detective-alley",
    slug: "film-noir-ai-art-prompt",
    title: "Film Noir AI Art Prompt — Cinematic Detective Scene",
    prompt: "A cinematic film noir scene. A lone detective in a trench coat and fedora stands in a rain-soaked alley at night. The only light comes from a flickering neon sign reading 'HOTEL' in red. Wet cobblestones reflect the neon glow. Steam rises from a manhole cover. Shot in black and white with the neon sign as the only color element. High contrast, deep shadows, 35mm film grain. Aspect ratio 2.39:1. The detective's face is half-hidden in shadow, cigarette smoke curling upward.",
    category: "film",
    tags: ["film noir ai prompt", "cinematic AI art", "detective scene prompt", "noir photography", "rain scene AI", "dramatic lighting prompt", "black and white AI"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "advanced",
    imageAlt: "Film noir detective in rain-soaked alley with red neon sign reflection",
    imageUrl: "/prompts/tiktok-live-screenshot.webp",
    breakdown: {
      subject: "Lone detective in trench coat and fedora",
      style: "Film noir — black and white with selective color",
      lighting: "Single neon sign light source, high contrast shadows",
      composition: "Alley setting, detective as silhouette, 2.39:1 cinematic",
      details: "Rain, wet reflections, steam, cigarette smoke, film grain",
    },
    tips: [
      "Selective color (one colored element in B&W) is a powerful technique GPT Image 2 handles well",
      "Specifying atmospheric elements like rain, steam, and smoke adds depth",
    ],
    featured: true,
    createdAt: "2025-04-19",
  },
  {
    id: "edit-002",
    slug: "ai-background-replacement-prompt-fantasy",
    title: "AI Background Replacement Prompt — Fantasy Landscape",
    prompt: "Keep the person in the foreground exactly as they are — same pose, clothing, lighting on their body, and facial expression. Replace the entire background with a breathtaking fantasy landscape: floating islands with waterfalls cascading into clouds, a massive double moon in a twilight purple-orange sky, bioluminescent plants glowing along the cliff edges. Match the lighting direction on the background to the existing light on the person so the composite looks natural. Cinematic color grading.",
    category: "photo-editing",
    tags: ["ai background replacement", "fantasy background prompt", "photo compositing AI", "creative photo editing", "GPT image editing", "background swap prompt"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "intermediate",
    imageAlt: "Person with original pose composited into fantasy landscape with floating islands",
    imageUrl: "/prompts/black-myth-wukong-nano.webp",
    breakdown: {
      subject: "Original person preserved, fantasy background added",
      style: "Cinematic compositing with color grading",
      lighting: "Matched direction between subject and new background",
      composition: "Foreground person + fantasy landscape background",
      details: "Floating islands, waterfalls, double moon, bioluminescent plants",
    },
    tips: [
      "The key instruction is 'match the lighting direction' — this makes composites look natural",
      "Being specific about what to keep ('same pose, clothing, lighting') prevents unwanted changes",
      "GPT Image 2 handles foreground/background separation very well with clear instructions",
    ],
    featured: true,
    createdAt: "2026-04-24",
  },
  {
    id: "edit-003",
    slug: "vintage-film-color-grading-ai-prompt",
    title: "Vintage Film Color Grading AI Prompt — 1970s Kodachrome",
    prompt: "Apply a vintage 1970s film color grade to this photo. Shift shadows toward teal/cyan, highlights toward warm amber/orange. Reduce overall contrast slightly. Add subtle film grain (ISO 800 equivalent). Slightly desaturate greens and blues while boosting warm tones. Add a very subtle light leak in the upper right corner with a warm orange glow. Soften the image slightly as if shot through a vintage lens with lower contrast coatings. The overall feel should be nostalgic and warm, like a faded Kodachrome slide.",
    category: "photo-editing",
    tags: ["vintage color grading prompt", "film look AI", "retro photo filter", "1970s aesthetic", "kodachrome style", "AI photo editing prompt", "film grain effect"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "beginner",
    imageAlt: "Photo with vintage 1970s film color grading, warm tones and subtle grain",
    imageUrl: "/prompts/handwritten-notebook.webp",
    breakdown: {
      subject: "Any photograph (upload your own)",
      style: "1970s Kodachrome film emulation",
      lighting: "Teal shadows, amber highlights, light leak",
      composition: "Preserved from original",
      details: "Film grain, desaturated cool tones, boosted warm tones, soft focus",
    },
    tips: [
      "Naming a specific film stock (Kodachrome) gives the AI a clear color target",
      "Describing shadow and highlight color shifts separately gives more control",
      "Light leaks should be 'subtle' — the AI tends to overdo them otherwise",
    ],
    featured: true,
    createdAt: "2026-04-24",
  },
  {
    id: "edit-004",
    slug: "ai-pet-photo-editing-prompt-outfit",
    title: "AI Pet Photo Editing Prompt — Dress Your Pet in Outfits",
    prompt: "Take this photo of my cat/dog and dress them in a tiny, perfectly tailored business suit — complete with a miniature tie, pocket square, and cufflinks. The suit should look physically real, with proper fabric folds and shadows that match the existing lighting in the photo. Keep the pet's exact pose, expression, and fur texture unchanged. The suit should look like it was custom-made for this specific animal's body shape. Add a tiny briefcase next to them. Photorealistic compositing, no cartoon elements.",
    category: "photo-editing",
    tags: ["ai pet photo prompt", "pet outfit AI", "dress pet in clothes", "funny pet photo", "ChatGPT pet editing", "photorealistic pet composite", "viral pet trend"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "beginner",
    imageAlt: "Cat or dog wearing a perfectly tailored miniature business suit",
    imageUrl: "/prompts/pet-brand-collab.webp",
    breakdown: {
      subject: "Pet in original photo, dressed in business suit",
      style: "Photorealistic compositing, no cartoon elements",
      lighting: "Matched to existing photo lighting",
      composition: "Original pet pose preserved, suit added",
      details: "Fabric folds, shadows, tie, pocket square, cufflinks, tiny briefcase",
    },
    tips: [
      "This is one of the most viral GPT Image 2 use cases — pet outfit composites",
      "Emphasizing 'physically real fabric folds and shadows' prevents cartoon-looking results",
      "'No cartoon elements' is important — the AI sometimes defaults to illustrated pet clothing",
    ],
    featured: true,
    createdAt: "2026-04-24",
  },
  {
    id: "manga-colorization",
    slug: "ai-manga-colorization-prompt",
    title: "AI Manga Colorization Prompt — Black & White to Color",
    prompt: "Take this black and white manga panel and colorize it with a vibrant anime color palette. The character has: blue-black hair with purple highlights, fair skin with warm undertones, emerald green eyes. School uniform: navy blue blazer, white shirt, red plaid tie. Background: cherry blossom trees in full bloom (soft pink #FFB7C5), clear blue sky (#87CEEB). Add depth with: warm sunlight from upper right casting soft shadows, light bloom effect on the cherry blossoms, subtle ambient occlusion on the uniform folds. Keep the original linework visible but soften it slightly. Style: modern anime coloring with cel-shading and soft gradients.",
    category: "photo-editing",
    tags: ["ai manga colorization", "manga coloring prompt", "anime colorization AI", "black and white to color", "cel shading prompt", "GPT image manga"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "advanced",
    imageAlt: "Black and white manga panel colorized with vibrant anime palette and cherry blossoms",
    imageUrl: "/prompts/character-relationship-map.webp",
    breakdown: {
      subject: "Manga character in school uniform under cherry blossoms",
      style: "Modern anime coloring with cel-shading",
      lighting: "Warm sunlight from upper right, light bloom on blossoms",
      composition: "Original manga panel layout preserved",
      details: "Specific hair color, eye color, uniform colors, hex codes for background elements",
    },
    tips: [
      "When colorizing, specify 'keep the original linework visible' to preserve the manga style",
      "Providing exact color values for each element ensures consistent colorization",
      "Mentioning lighting effects (bloom, ambient occlusion) adds professional polish",
    ],
    featured: false,
    createdAt: "2025-04-10",
  },
  {
    id: "next-gen-game-remaster",
    slug: "ai-game-remaster-prompt-next-gen",
    title: "AI Game Remaster Prompt — Classic to Next-Gen Graphics",
    prompt: "Recreate this classic video game screenshot as a next-generation AAA title, as if the game was remade in 2025 with Unreal Engine 5. Enhance all textures to photorealistic quality: brick walls show individual mortar lines, metal surfaces have realistic scratches and reflections, fabric has visible thread patterns. Upgrade lighting to ray-traced global illumination with realistic light bounce, volumetric fog, and god rays through windows. Characters should have hyper-detailed skin with visible pores, subsurface scattering, and realistic hair strands. Keep the original camera angle, composition, and color mood of the scene intact. Add subtle cinematic effects: chromatic aberration at edges, film grain at ISO 400, and a shallow depth of field with bokeh on background elements. 8K resolution, HDR, photorealistic.",
    category: "game",
    tags: ["ai game remaster prompt", "next gen graphics AI", "video game remaster", "unreal engine 5 style", "photorealistic game art", "GPT image gaming", "retro to modern"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "intermediate",
    imageAlt: "Classic video game screenshot reimagined as a photorealistic next-gen AAA title",
    imageUrl: "/prompts/hitman-game-screenshot.webp",
    breakdown: {
      subject: "Classic video game scene upgraded to modern AAA quality",
      style: "Photorealistic game graphics, Unreal Engine 5 aesthetic",
      lighting: "Ray-traced global illumination, volumetric fog, god rays",
      composition: "Original camera angle preserved, cinematic depth of field",
      details: "Skin pores, subsurface scattering, realistic hair, chromatic aberration, film grain",
    },
    tips: [
      "Upload a screenshot of any classic game and use this prompt to 'remaster' it",
      "Specifying the engine (Unreal Engine 5) helps GPT Image 2 target the right visual style",
      "Mentioning specific texture details (mortar lines, thread patterns) prevents the AI from being vague",
    ],
    featured: true,
    createdAt: "2025-04-25",
  },
  {
    id: "perfume-bottle-luxury",
    slug: "ai-product-photography-prompt-luxury",
    title: "AI Product Photography Prompt — Luxury Perfume Shot",
    prompt: "A luxury perfume bottle product photography shot. The bottle is made of deep amber glass with a gold geometric cap. Brand name 'AURELIA' embossed in gold serif font. The bottle sits on a black marble surface. Background: gradient from deep burgundy to black. Key light from upper left creating a bright highlight on the glass. Fill light from right at 30% intensity. A single white orchid petal resting beside the bottle. Water droplets on the marble surface catching the light. Shot with a 100mm macro lens, f/2.8, creating a shallow depth of field. 4K resolution, photorealistic.",
    category: "product",
    tags: ["ai product photography prompt", "luxury product shot", "perfume photography AI", "e-commerce photo prompt", "studio product lighting", "GPT image product"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "advanced",
    imageAlt: "Luxury amber glass perfume bottle on black marble with dramatic studio lighting",
    imageUrl: "/prompts/terminator-taobao.webp",
    breakdown: {
      subject: "Luxury perfume bottle with gold cap",
      style: "High-end product photography, photorealistic",
      lighting: "Key light upper-left, fill light right at 30%, highlight on glass",
      composition: "Centered product on marble, shallow DOF, macro lens",
      details: "Brand name, material (amber glass, gold), props (orchid petal, water droplets), camera settings",
    },
    tips: [
      "Including camera settings (lens, aperture) helps GPT Image 2 simulate realistic photography",
      "Specifying light direction and intensity creates professional-looking product shots",
      "Material descriptions (amber glass, black marble) are crucial for realism",
    ],
    featured: true,
    createdAt: "2025-04-17",
  },
  {
    id: "oil-painting-style-transfer",
    slug: "ai-oil-painting-prompt-dutch-masters",
    title: "AI Oil Painting Prompt — Dutch Masters Style Transfer",
    prompt: "Transform this photograph into a classic oil painting in the style of the Dutch Golden Age masters (Vermeer, Rembrandt). The image should look like it was painted on a stretched linen canvas — visible canvas weave texture showing through the paint in thinner areas. Apply thick impasto brushstrokes on highlights (especially on skin, fabric folds, and metallic objects) where the paint appears to physically rise from the surface. Shadows should use thin, translucent glazes with warm undertones (raw umber, burnt sienna). Skin tones should have the luminous quality of Vermeer — built up in layers with a warm base, cool mid-tones, and warm highlights. The background should be darker and less detailed than the subject, using the chiaroscuro technique. Add a subtle craquelure pattern (fine aging cracks) across the entire surface to simulate a painting that's 300 years old. The color palette should shift toward the warm, muted tones typical of oil paintings: less saturated blues, warmer shadows, and golden highlights. Include a thin gilded frame border around the image. Aspect ratio 4:5.",
    category: "photo-editing",
    tags: ["ai oil painting prompt", "dutch masters style", "vermeer style AI", "rembrandt style prompt", "photo to oil painting", "fine art AI", "classic art style transfer"],
    aiModels: ["gpt-image-2", "chatgpt", "midjourney"],
    difficulty: "intermediate",
    imageAlt: "Photograph transformed into a Dutch Golden Age oil painting with visible brushstrokes and craquelure",
    imageUrl: "/prompts/douyin-livestream.webp",
    breakdown: {
      subject: "Original photograph reimagined as a 300-year-old oil painting",
      style: "Dutch Golden Age masters (Vermeer, Rembrandt), oil on linen canvas",
      lighting: "Chiaroscuro — dramatic light/dark contrast, luminous skin tones",
      composition: "4:5 aspect ratio with gilded frame border, dark background",
      details: "Impasto highlights, translucent shadow glazes, canvas weave texture, craquelure aging cracks, specific pigment names",
    },
    tips: [
      "Upload any portrait photo to transform it into a museum-worthy oil painting",
      "Naming specific pigments (raw umber, burnt sienna) gives GPT Image 2 accurate color targets",
      "The craquelure (aging cracks) detail is what sells the 'old master' illusion",
    ],
    featured: false,
    createdAt: "2025-04-25",
  },
  {
    id: "structured-selfie-portrait",
    slug: "ai-selfie-prompt-photorealistic",
    title: "AI Selfie Prompt — Photorealistic Lifestyle Portrait",
    prompt: "Generate a photorealistic selfie portrait using the following structured parameters. Scene: bedroom interior, natural daylight streaming through white-framed windows with horizontal blinds. Subject: a young woman lying prone on a bed, facing the camera with left arm extended in a selfie pose, knees bent upward with ankles crossed, head resting on a white pillow with floral pattern. Appearance: long straight brown hair, gentle smile with direct eye contact, fair complexion with rosy cheeks. Attire: light green ribbed tank top with spaghetti straps, matching light green gym shorts with ruffled hem, white crew socks. Environment: white rumpled sheets, puffy white duvet, a side table with skincare products, a pink mug, a small potted succulent, and a tissue box. Composition: high-angle selfie, medium shot, sharp focus on subject with soft bokeh background. The image should feel candid, cozy, and authentic — like a real morning selfie, not a studio photo.",
    category: "photography",
    tags: ["ai selfie prompt", "photorealistic portrait AI", "lifestyle photography prompt", "structured AI prompt", "candid photo AI", "GPT image portrait"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "advanced",
    imageAlt: "Photorealistic casual morning selfie portrait in a cozy bedroom with natural light",
    imageUrl: "/prompts/ecommerce-app-nano.webp",
    breakdown: {
      subject: "Young woman in casual outfit taking a morning selfie on bed",
      style: "Candid lifestyle photography, authentic and unposed",
      lighting: "Natural daylight through window blinds, soft and warm",
      composition: "High-angle selfie, medium shot, sharp subject with soft background",
      details: "Specific clothing colors, bedding textures, side table props, facial expression",
    },
    tips: [
      "Structured prompts with explicit parameters for each element give GPT Image 2 maximum control",
      "Describing the 'feel' (candid, cozy, authentic) helps avoid the typical AI-polished look",
      "Including small environmental details (skincare products, tissue box) adds realism",
    ],
    featured: true,
    createdAt: "2025-04-25",
  },
  {
    id: "photo-001",
    slug: "ai-street-photography-prompt-rainy-tokyo",
    title: "AI Street Photography Prompt — Rainy Tokyo Night",
    prompt: "A candid street photograph taken in Tokyo on a rainy evening. A lone figure with a transparent umbrella walks past a row of glowing izakaya lanterns. Wet asphalt reflects neon signs in red and gold. Shot on a 35mm film camera, Kodak Portra 400 color palette, shallow depth of field, slight motion blur on passing taxis. The mood is melancholic yet beautiful. 3:4 aspect ratio, 4K resolution.",
    category: "photography",
    tags: ["ai street photography prompt", "tokyo night photography", "rain photography", "neon reflections", "film photography prompt", "35mm aesthetic", "GPT image prompt"],
    aiModels: ["gpt-image-2", "chatgpt", "midjourney"],
    difficulty: "intermediate",
    imageAlt: "Rainy Tokyo street at night with neon reflections and a lone figure with umbrella",
    imageUrl: "/prompts/convenience-store-night.webp",
    breakdown: {
      subject: "A lone figure with a transparent umbrella",
      style: "35mm film camera, Kodak Portra 400",
      lighting: "Neon signs in red and gold, wet reflections",
      composition: "Street-level candid shot, shallow depth of field",
      details: "Motion blur on taxis, wet asphalt reflections",
    },
    tips: [
      "Specifying a real film stock (Kodak Portra 400) gives GPT Image 2 a strong color reference",
      "Adding '3:4 aspect ratio, 4K' at the end helps control output dimensions",
      "Mentioning 'candid' prevents the AI from creating posed-looking shots",
    ],
    featured: true,
    createdAt: "2026-04-24",
  },
  {
    id: "photo-002",
    slug: "ai-macro-photography-prompt-eye-detail",
    title: "AI Macro Photography Prompt — Eye with Four Seasons",
    prompt: "An extreme macro photograph of a human eye, shot at 1:1 magnification. The iris contains an impossibly detailed reflection of four seasons — spring cherry blossoms in the upper left, summer sunflowers in the upper right, autumn maple leaves in the lower right, winter snowflakes in the lower left. Each season transitions smoothly into the next. Ring light catchlight visible in the pupil. Clinical sharpness, f/2.8, focus stacked. Photorealistic, 4K.",
    category: "photography",
    tags: ["ai macro photography prompt", "eye photography", "creative photography prompt", "four seasons", "photorealistic AI art", "detail photography", "GPT image 2"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "advanced",
    imageAlt: "Extreme macro of a human eye with four seasons reflected in the iris",
    imageUrl: "/prompts/porcelain-diagram.webp",
    breakdown: {
      subject: "Human eye at extreme macro magnification",
      style: "Clinical macro photography, focus stacked",
      lighting: "Ring light with visible catchlight in pupil",
      composition: "1:1 magnification, four quadrants for four seasons",
      details: "Cherry blossoms, sunflowers, maple leaves, snowflakes in iris",
    },
    tips: [
      "GPT Image 2 excels at 'impossible but photorealistic' concepts like this",
      "Specifying exact quadrant positions helps the AI place elements correctly",
      "Adding technical camera terms (f/2.8, focus stacked) increases realism",
    ],
    featured: true,
    createdAt: "2026-04-24",
  },
  {
    id: "photo-003",
    slug: "ai-photography-prompt-japanese-convenience-store",
    title: "AI Photography Prompt — Japanese Convenience Store at Night",
    prompt: "A photorealistic image of a Japanese convenience store (konbini) at 2am. Warm fluorescent light spills out through floor-to-ceiling glass windows onto the empty sidewalk. Inside, a lone clerk reads a manga behind the counter. Shelves are perfectly stocked with colorful onigiri, bento boxes, and drinks. A cat sits outside the automatic door. Shot on Sony A7III, 24mm wide angle, f/1.8, slight film grain. The atmosphere is lonely but comforting. 16:9.",
    category: "photography",
    tags: ["ai photography prompt", "japanese convenience store", "konbini aesthetic", "night photography", "atmospheric photography", "cozy aesthetic", "lo-fi vibes"],
    aiModels: ["gpt-image-2", "chatgpt", "midjourney"],
    difficulty: "intermediate",
    imageAlt: "Japanese convenience store at 2am with warm light spilling onto empty sidewalk",
    imageUrl: "/prompts/convenience-store-nano.webp",
    breakdown: {
      subject: "Japanese convenience store with lone clerk and a cat",
      style: "Sony A7III, 24mm wide angle, slight film grain",
      lighting: "Warm fluorescent interior vs dark exterior",
      composition: "Wide angle through glass windows, inside-outside contrast",
      details: "Colorful onigiri, bento boxes, manga, automatic door",
    },
    tips: [
      "Naming specific products (onigiri, bento) adds authenticity",
      "The inside/outside lighting contrast creates natural visual interest",
      "Specifying camera model and lens gives the AI a clear 'look' to aim for",
    ],
    featured: true,
    createdAt: "2026-04-24",
  },
  {
    id: "photo-006",
    slug: "ai-food-photography-prompt-ramen",
    title: "AI Food Photography Prompt — Professional Ramen Shot",
    prompt: "Professional food photography of a bowl of tonkotsu ramen. Rich, creamy white broth with a thin layer of pork fat glistening on the surface. Perfectly sliced chashu pork with caramelized edges, a soft-boiled ajitama egg cut in half showing the jammy orange yolk, fresh green negi, nori sheet, and thin noodles lifted by chopsticks mid-air with steam rising. Dark moody background, single overhead softbox light creating dramatic shadows. Shot on Phase One IQ4, 80mm, f/4. Food styling level detail. 4:5.",
    category: "photography",
    tags: ["ai food photography prompt", "ramen photography", "japanese food photography", "professional food photo", "studio food photography", "GPT image food"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "advanced",
    imageAlt: "Professional food photo of tonkotsu ramen with chopsticks lifting noodles and steam",
    imageUrl: "/prompts/chinese-tea-poster.webp",
    breakdown: {
      subject: "Tonkotsu ramen bowl with all traditional toppings",
      style: "Professional food photography, Phase One IQ4",
      lighting: "Single overhead softbox, dark moody background",
      composition: "Chopsticks lifting noodles mid-air, steam rising",
      details: "Jammy egg yolk, caramelized chashu edges, glistening pork fat",
    },
    tips: [
      "Naming specific Japanese food terms (chashu, ajitama, negi) produces more authentic results",
      "The 'chopsticks lifting noodles mid-air' is a classic food photography technique the AI understands",
      "Specifying a medium format camera (Phase One) signals ultra-high-quality output",
    ],
    featured: true,
    createdAt: "2026-04-24",
  },
];

// ─── Helper functions ───────────────────────────────────────────────

export function getAIPromptBySlug(slug: string): AIPrompt | undefined {
  return aiPrompts.find((p) => p.slug === slug);
}

export function getAIPromptsByCategory(category: AIPromptCategory): AIPrompt[] {
  return aiPrompts.filter((p) => p.category === category);
}

export function getAIPromptsByTag(tag: string): AIPrompt[] {
  return aiPrompts.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
}

export function getAIPromptsByModel(model: AIModel): AIPrompt[] {
  return aiPrompts.filter((p) => p.aiModels.includes(model));
}

export function getFeaturedAIPrompts(count: number = 12): AIPrompt[] {
  // Return a curated selection — prioritize GPT Image 2 prompts
  const gptImage2First = aiPrompts.filter((p) => p.aiModels.includes("gpt-image-2"));
  return gptImage2First.slice(0, count);
}

export function getRelatedPrompts(promptId: string, count: number = 4): AIPrompt[] {
  const prompt = aiPrompts.find((p) => p.id === promptId);
  if (!prompt) return [];

  // Find related prompts by same category and shared tags
  const sameCategory = aiPrompts
    .filter((p) => p.category === prompt.category && p.id !== promptId)
    .sort((a, b) => {
      const aShared = a.tags.filter((t) => prompt.tags.includes(t)).length;
      const bShared = b.tags.filter((t) => prompt.tags.includes(t)).length;
      return bShared - aShared;
    });

  return sameCategory.slice(0, count);
}

export const CATEGORY_META: Record<AIPromptCategory, { label: string; description: string; emoji: string; slug: string }> = {
  photography: {
    label: "Photography",
    description: "Photorealistic prompts for portraits, street photography, macro, and more",
    emoji: "📸",
    slug: "photography",
  },
  "photo-editing": {
    label: "Photo Editing",
    description: "Transform, colorize, and enhance images with AI editing prompts",
    emoji: "✨",
    slug: "photo-editing",
  },
  character: {
    label: "Character Design",
    description: "Character sheets, expressions, outfits, and consistency prompts",
    emoji: "🎭",
    slug: "character",
  },
  "ui-design": {
    label: "UI / UX Design",
    description: "Dashboard, app, and web interface design prompts",
    emoji: "💻",
    slug: "ui-design",
  },
  poster: {
    label: "Poster & Cover",
    description: "Event posters, book covers, and promotional design prompts",
    emoji: "🎨",
    slug: "poster",
  },
  infographic: {
    label: "Infographic",
    description: "Data visualization, educational graphics, and information design",
    emoji: "📊",
    slug: "infographic",
  },
  film: {
    label: "Film & Cinematic",
    description: "Movie-style scenes, cinematic lighting, and film aesthetics",
    emoji: "🎬",
    slug: "film",
  },
  game: {
    label: "Game Art",
    description: "Pixel art, isometric, and game asset design prompts",
    emoji: "🎮",
    slug: "game",
  },
  product: {
    label: "Product & E-commerce",
    description: "Product photography, advertising, and e-commerce visual prompts",
    emoji: "🛍️",
    slug: "product",
  },
};
