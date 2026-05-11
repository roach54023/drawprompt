/**
 * AI Image Prompt Library — Core Data
 *
 * GPT Image 2 为核心，同时覆盖 ChatGPT / Midjourney / DALL-E
 * 每个 prompt 都是可直接复制使用的完整提示词
 *
 * 数据来源：awesome-gpt-image-2-prompts 仓库
 * 图片与 prompt 一一对应
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
  originalPrompt?: string;
  category: AIPromptCategory;
  tags: string[];
  aiModels: AIModel[];
  difficulty: PromptDifficulty;
  imageAlt: string;
  imageUrl: string;
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
    seoDescription: "Copy-paste prompts for generating photorealistic images with GPT Image 2, ChatGPT, and Midjourney.",
    icon: "📷",
    color: "#5a9e7a",
    bg: "#eef6f2",
  },
  {
    id: "photo-editing",
    label: "Photo Editing",
    description: "Transform existing photos with AI — style transfer, retouching, compositing",
    seoTitle: "ChatGPT Photo Editing Prompts — AI Photo Manipulation",
    seoDescription: "Best prompts for editing photos with ChatGPT and GPT Image 2.",
    icon: "✨",
    color: "#c47ab8",
    bg: "#faf0f8",
  },
  {
    id: "character",
    label: "Character Design",
    description: "Consistent characters, expression sheets, and character concepts",
    seoTitle: "AI Character Design Prompts — Consistent Characters & Concepts",
    seoDescription: "Generate consistent character designs with GPT Image 2.",
    icon: "🎭",
    color: "#c4714a",
    bg: "#fdf0e8",
  },
  {
    id: "ui-design",
    label: "UI / UX Design",
    description: "App interfaces, web designs, and mockup generation",
    seoTitle: "AI UI/UX Design Prompts — Generate App & Web Mockups",
    seoDescription: "Prompts for generating UI/UX designs with GPT Image 2.",
    icon: "📱",
    color: "#7b9eb8",
    bg: "#eef4f8",
  },
  {
    id: "poster",
    label: "Poster & Graphic Design",
    description: "Movie posters, event flyers, brand visuals, and typography",
    seoTitle: "AI Poster Design Prompts — Graphic Design & Typography",
    seoDescription: "Create stunning posters and graphic designs with AI.",
    icon: "🎨",
    color: "#b8a07b",
    bg: "#f8f4ee",
  },
  {
    id: "infographic",
    label: "Infographic & Data Viz",
    description: "Information graphics, data visualization, and educational diagrams",
    seoTitle: "AI Infographic Prompts — Data Visualization & Diagrams",
    seoDescription: "Generate beautiful infographics and data visualizations with AI.",
    icon: "📊",
    color: "#6b8e9e",
    bg: "#eef2f4",
  },
  {
    id: "film",
    label: "Film & Cinematic",
    description: "Movie stills, cinematic scenes, and film-inspired compositions",
    seoTitle: "AI Cinematic Prompts — Movie Stills & Film Photography",
    seoDescription: "Create cinematic images and movie-quality stills with AI.",
    icon: "🎬",
    color: "#8b7ea8",
    bg: "#f2f0f6",
  },
  {
    id: "game",
    label: "Game Art & Screenshots",
    description: "Game screenshots, concept art, and virtual world imagery",
    seoTitle: "AI Game Art Prompts — Screenshots & Concept Art",
    seoDescription: "Generate game screenshots and concept art with AI.",
    icon: "🎮",
    color: "#7a9e5a",
    bg: "#f0f6ee",
  },
  {
    id: "product",
    label: "Product & Commercial",
    description: "Product photography, commercial ads, and brand visuals",
    seoTitle: "AI Product Photography Prompts — Commercial & Brand Visuals",
    seoDescription: "Create professional product photography and commercial visuals with AI.",
    icon: "🛍️",
    color: "#9e7a8b",
    bg: "#f6eef2",
  },
];

// ─── Category Meta (keyed by id) ────────────────────────────────────────────

export const CATEGORY_META: Record<AIPromptCategory, { label: string; icon: string; color: string; bg: string }> =
  Object.fromEntries(
    categories.map((c) => [c.id, { label: c.label, icon: c.icon, color: c.color, bg: c.bg }])
  ) as Record<AIPromptCategory, { label: string; icon: string; color: string; bg: string }>;

// ─── Prompt Library ─────────────────────────────────────────────────────────

export const aiPrompts: AIPrompt[] = [
  {
    id: "prompt-001",
    slug: "convenience-store-neon-portrait",
    title: "Convenience Store Neon Portrait",
    prompt: `35mm film photography with harsh convenience store fluorescent lighting mixed with colorful neon signs from outside, authentic film grain, high contrast, slight color cast, cinematic street editorial style, intimate medium shot, early 20s sexy Chinese female idol with ultra-realistic delicate refined Chinese features, seductive almond-shaped fox eyes with natural double eyelids, high nose bridge, small sharp V-shaped jawline, flawless porcelain skin with cool ivory undertone and visible specular highlights from fluorescent light, subtle skin texture and micro pores, natural dewy makeup with soft flush on cheeks, glossy natural pink lips slightly parted, subtle natural freckles across nose and cheeks, long dark brown hair in a messy high ponytail with many loose strands falling around face and neck, wearing an oversized white button-up shirt as the only top, unbuttoned at the top with deep cleavage and loosely tied at the waist, paired with a tiny black pleated mini skirt, barefoot in simple white slides, seductive casual leaning pose against the glass door of a 24-hour convenience store at late night, body slightly arched, one leg bent with foot resting against the door frame, the other leg straight, one hand holding a bottle of iced drink, the other hand lightly pulling the hem of her mini skirt, intensely seductive playful yet slightly vulnerable gaze straight at the viewer with soft doe eyes full of quiet temptation and teasing smile, bright cold fluorescent store light from inside mixed with pink and blue neon glow from outside signs, realistic reflections on glass door, blurred convenience store interior with shelves and snacks in background, authentic 35mm film color grading with harsh lighting and neon accents, extremely sharp yet soft skin rendering, natural hair strands, realistic fabric wrinkles and drape on the oversized shirt and mini skirt, no plastic skin, no digital over-sharpening, no airbrushing, no blemishes, no moles, no oily skin, no watermark, no text, authentic late-night convenience store atmosphere`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "chinese-style", "korean"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Convenience Store Neon Portrait",
    imageUrl: "/prompts/convenience-store-neon-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @BubbleBrain"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-002",
    slug: "cinematic-minimal-portrait",
    title: "Cinematic Minimal Portrait",
    prompt: `Generate a cinematic minimal portrait of a solitary man standing in an intense orange to red gradient environment, strong silhouette lighting, deep shadow contrast, reflective glossy floor, symmetrical composition, minimal`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Cinematic Minimal Portrait",
    imageUrl: "/prompts/cinematic-minimal-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @iam_miharbi"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-003",
    slug: "japanese-onsen-ryokan-portrait",
    title: "Japanese Onsen Ryokan Portrait",
    prompt: `35mm film photography, warm vintage Japanese onsen ryokan aesthetic, soft ambient wooden lantern lighting mixed with gentle natural window light, subtle film grain, gentle color shift, high atmosphere editorial style, intimate medium shot, early 20s beautiful Chinese female idol with ultra-realistic delicate refined Chinese features, seductive almond-shaped fox eyes with natural double eyelids, high nose bridge, small sharp V-shaped jawline, flawless porcelain skin with warm ivory undertone, visible subtle skin texture and micro pores, soft natural makeup with dewy glow, subtle rosy flush on cheeks, natural soft pink lips slightly parted, long dark brown hair tied in a loose low bun with some messy strands falling around face and neck, wearing a loose white yukata (traditional Japanese bathrobe) deliberately slipped off one shoulder and loosely tied at the waist, the fabric slightly open revealing smooth skin and subtle cleavage, barefoot, seductive relaxed sitting pose on the edge of a traditional wooden engawa veranda at a vintage onsen ryokan, body slightly turned toward the camera, one leg bent with foot resting on the wooden floor, the other leg gently dangling, one hand lightly holding the yukata collar, the other hand resting on the wooden floor behind her for support, softly arched back to gently accentuate curves, intensely seductive yet gentle and inviting gaze straight at the viewer with soft doe eyes full of quiet temptation and warmth, warm wooden interior with paper sliding doors and distant steaming hot spring in soft focus, gentle rim lighting highlighting skin and fabric texture, authentic vintage film color grading with warm tones, extremely sharp yet soft skin rendering, natural hair strands, realistic fabric wrinkles and drape on the yukata, no plastic skin, no digital over-sharpening, no airbrushing, no blemishes, no moles, no oily skin, no watermark, no text, authentic 35mm film Japanese onsen ryokan atmosphere`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "chinese-style", "japanese"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Japanese Onsen Ryokan Portrait",
    imageUrl: "/prompts/japanese-onsen-ryokan-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @BubbleBrain"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-004",
    slug: "35mm-flash-editorial-portrait",
    title: "35mm Flash Editorial Portrait",
    prompt: `35mm color film photography with harsh direct on-camera flash, specular highlights on skin and clothing, strong catchlights in eyes, high contrast flash illumination, authentic film grain and color shift, high fashion fresh innocent basketball court editorial style, intimate first-person low-angle POV shot from below, early 20s sexy Chinese female idol with ultra-realistic delicate refined Chinese features, seductive almond-shaped fox eyes with natural double eyelids, high nose bridge, small sharp V-shaped jawline, flawless realistic porcelain skin with cool ivory undertone and visible flash specular highlights, fine delicate skin texture with subtle pores micro details and natural dewy glow under flash, fresh natural sporty makeup with soft dewy glow, subtle natural flush on cheeks, natural pink lips slightly parted, subtle natural freckles across nose and cheeks, long dark brown hair tied in a high playful ponytail with some loose strands framing the face and realistic loose strands, wearing a loose white tank top and white high-waisted basketball shorts, white knee-high sports socks, seductive natural leaning pose against the basketball hoop pole on the outdoor court at dusk, body angled sideways with naturally arched back and hips gently pushed back to accentuate perky round hips and sexy butt curve, one leg naturally extended forward toward the camera and the other leg slightly bent to emphasize long sexy legs, both hands lightly resting on the basketball pole at shoulder height, intensely seductive playful yet pitiable doe-eyed gaze straight at the viewer with soft vulnerable longing eyes and a gentle teasing smile full of quiet temptation and desire, harsh direct on-camera flash creating sharp specular highlights and strong catchlights, background with blurred basketball court and hoop under dusk sky, high contrast film color grading with natural flash look, extremely sharp yet soft skin rendering with authentic 35mm direct flash aesthetic, natural hair strands, realistic fabric texture on tank top and shorts with socks detail, no plastic skin, no digital over-sharpening, no airbrushing, no blemishes, no moles, no oily skin, no watermark, no text, authentic 35mm direct flash film basketball court look --ar 9:16`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "chinese-style", "korean"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "35mm Flash Editorial Portrait",
    imageUrl: "/prompts/35mm-flash-editorial-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @BubbleBrain"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-005",
    slug: "mirror-selfie-bedroom-portrait",
    title: "Mirror Selfie Bedroom Portrait",
    prompt: `A stunning 18-year-old Chinese girl with a youthful, pure face and realistic skin texture, sitting on a cozy, slightly messy bed in her bedroom. She is taking a mirror selfie with a smartphone, capturing a natural and intimate moment. Wearing casual gray loungewear and neat white crew socks. Soft natural light (golden hour) streams in from a side window, creating a warm, moody, and cinematic atmosphere. 35mm lens, sharp focus on the subject in the mirror, depth of field with a beautifully blurred background (bokeh). Photorealistic, 8K, high resolution, studio quality, masterpiece.
Negative Prompts: no extra limbs, no deformed hands, no blur, no noise, no watermark, no text, no cartoon/anime style. Aspect Ratio: 3:4.`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "chinese-style", "japanese"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Mirror Selfie Bedroom Portrait",
    imageUrl: "/prompts/mirror-selfie-bedroom-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Shinning1010"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-006",
    slug: "soft-airy-35mm-portrait",
    title: "Soft Airy 35mm Portrait",
    prompt: `Analog 35mm film photography, soft airy Japanese-style aesthetic, gentle diffused natural window light, slight overexposure, pastel tones, low contrast, soft highlights, minimal indoor setting near a window with white curtains, clean light-colored wall, natural composition, eye-level, slightly closer full-body framing (mid-thigh to head), young East Asian woman, natural minimal makeup, soft realistic skin texture, long slightly messy dark hair, oversized white button-up shirt, light casual shorts, barefoot, simple and relaxed styling, standing naturally with relaxed posture, arms loosely at sides or slightly behind, facing camera, gentle soft smile, subtle stillness, focus on light, air, and quiet everyday mood, soft film grain, dreamy and understated atmosphere --ar 9:16`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "japanese"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Soft Airy 35mm Portrait",
    imageUrl: "/prompts/soft-airy-35mm-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @BubbleBrain"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-007",
    slug: "luxury-glam-beauty-portrait",
    title: "Luxury Glam Beauty Portrait",
    prompt: `Luxury Glam Beauty Portrait:, Beautiful Black woman, youthful spirit, creamy vanilla, silk press, mahogany red, subtle confidence, textured fabric, sapphire blue, minimal jewelry, beachside breeze, lens flare effect, nostalgic, cinematic lens, symmetrical composition, soft focus, high fashion photography, monochromatic, dewy finish, mysterious tension, layered elements`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "fashion"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Luxury Glam Beauty Portrait",
    imageUrl: "/prompts/luxury-glam-beauty-portrait.jpg",
    breakdown: {
      subject: "Beautiful Black woman with silk press hair, mahogany red tones, minimal jewelry, youthful spirit and subtle confidence",
      style: "High fashion photography with monochromatic palette, dewy finish, and nostalgic cinematic lens feel",
      lighting: "Soft focus with lens flare effect, beachside breeze atmosphere creating warm, dreamy illumination",
      composition: "Symmetrical composition with layered elements, mysterious tension between subject and environment",
      details: "Textured fabric in sapphire blue, creamy vanilla tones, dewy skin finish, and carefully curated minimal accessories",
    },
    tips: [
      "By @patrickassale",
      "This prompt uses a keyword-stacking technique — short descriptive phrases separated by commas — which GPT Image 2 interprets as layered style instructions.",
      "Try swapping the color palette (e.g. emerald green + gold) to create entirely different moods while keeping the same composition.",
      "Adding 'monochromatic' helps unify the color grading; remove it if you want more vibrant, multi-toned results.",
    ],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-008",
    slug: "916-cosplayer-portrait-screenshot",
    title: "9:16 Cosplayer Portrait Screenshot",
    prompt: `Generate a vertical phone screenshot-style image with an approximate 9:16 aspect ratio. Slightly above center is a real-life cosplayer portraying a 2D anime character (character name). The figure is rendered in a realistic style but with slightly anime-influenced features — delicate skin, slightly larger eyes, and a gentle expression looking at the camera. She is seated in a casual indoor setting such as a café or bar counter, with scene-appropriate props in the background. At the very top of the image, add a phone system status bar UI including time, battery, signal, network icons, making the entire image look like a phone screenshot. At the bottom of the image, overlay a large semi-transparent galgame-style dialogue box. On the left side of the dialogue box, place an anime or chibi avatar corresponding to the character in the image. On the right side of the dialogue box, lay out text: the first line displays the same character name in a larger font, and below it one to two lines showing a gentle, healing-style line of dialogue in Simplified Chinese that fits the character's persona, automatically created by you. Below the dialogue box, add an action bar mimicking galgame UI. The overall style is high-definition, rich in detail, with soft lighting, naturally blending 2D anime aesthetics with real-life photography.`,
    originalPrompt: `生成一张竖版手机截图风格的图片，整体比例接近 9:16。画面中心偏上是一位真人 coser，扮演（角色名称）的二次元角色。人物为写实风格，但五官略带动漫感，皮肤细腻，眼睛稍大，表情温柔地看向镜头，坐在室内的休闲场景中，例如咖啡厅或酒吧吧台前，背景有符合场景的道具。画面最上方加入手机系统状态栏 UI，包括时间、电量、信号、网络等图标，让整张图看起来像手机截图。画面底部叠加一块宽大的半透明 galgame 风格对话框，对话框左侧放一个与画面人物对应的动漫或 Q 版头像；对话框右侧排版文字：第一行用较大字体显示与前面相同的角色名字，下面一到两行显示一段适合这个角色人设的、温柔治愈风格的简体中文台词，由你自动创作。再在对话框下方加一条操作栏，仿照 galgame UI。整体风格高清、细节丰富、光线柔和、二次元与真人写真自然融合。`,
    category: "game",
    tags: ["portrait", "photography", "realistic", "gaming"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "9:16 Cosplayer Portrait Screenshot",
    imageUrl: "/prompts/916-cosplayer-portrait-screenshot.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Zoulinshen"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-009",
    slug: "urban-turn-back-street-portrait",
    title: "Urban Turn-Back Street Portrait",
    prompt: `The scene is a medium close-up shot using an eye-level camera, focusing on a young woman. She is presented in a seven-eighths body frame, seated with a slight lean, hips tilted backward, legs naturally crossed with the left leg in front and the right leg behind, knees slightly bent. Her upper body twists to the right rear while her head turns toward the camera, forming a classic "looking back over the shoulder" pose, gazing directly at the camera with clear eyes and a hint of playfulness. Her hairstyle is a voluminous brown shoulder-length bob with bangs falling naturally and slightly curled ends. Her makeup is light and natural, with only subtle eyeliner on the eyes and a natural nude-pink lip color. The overall image uses a natural daylight filter, with light streaming in diagonally from the upper left, creating a soft backlit silhouette. The right side of her face and body is illuminated by warm golden light, while the left side transitions into natural shadow, enhancing the three-dimensionality. The lighting effect is bright natural light with a slight lens flare, creating an afternoon sunlight atmosphere. The shooting angle is eye level. In terms of composition, the main subject is positioned slightly right of center, and the zebra crossing and road lines in the background form natural leading lines directing the viewer's gaze toward the subject. The background is an urban street containing roads, a zebra crossing, green belts, and distant vehicles. The background is moderately blurred but still recognizable with trees, guardrails, and parked electric scooters. The composition utilizes the rule of thirds, with the subject placed at the right third, enhancing the balance of the image. The subject wears an army-green camouflage-patterned hooded sweatshirt, paired with black shorts on the bottom, white high-top sneakers with white mid-calf socks. Her backpack is black with orange-yellow decorative stripes and an orange plush pendant, made of canvas and leather patchwork. The overall style is street casual, with relaxed and natural body language, an expression of slight curiosity and playfulness, presenting an easygoing, youthful, and vibrant urban girl image.`,
    originalPrompt: `该画面为中近景，采用平视镜头，聚焦于一位年轻女性。她以七分身镜头呈现，身体坐姿略带倾斜，臀部向后撅起，双腿自然交叠，左腿在前，右腿在后，膝盖微屈。她将上半身向右后方扭转，头部则转向镜头方向，形成一个经典的“回眸”姿态，目光直视镜头，眼神清澈而略带一丝俏皮。她的发型是蓬松的棕色齐肩短发，刘海自然垂落，发尾微卷，妆容清淡自然，仅在眼部有轻微眼线勾勒，唇色为自然裸粉。画面整体采用自然日光滤镜，光线从画面左上方斜射入，形成柔和的逆光轮廓，面部和身体右侧被温暖的金色光线照亮，左侧则形成自然的阴影过渡，增强了立体感。灯光效果是明亮的自然光，带有轻微的镜头眩光，营造出午后阳光的氛围。拍摄角度为平视，构图上，人物主体位于画面中偏右位置，背景中的斑马线与道路线条形成自然的引导线，将视线引向人物。背景为城市街道，包含道路、斑马线、绿化带和远处的车辆，背景被适度虚化，但依然可辨识出树木、护栏和停放的电动车等元素，构图上利用了三分法，人物位于右侧三分之一处，增强了画面的平衡感。主体穿着一件军绿色迷彩图案的连帽卫衣，下身搭配黑色短裤，脚穿白色高帮运动鞋配白色中筒袜。背包为黑色，带有橙黄色装饰条纹和一个橙色毛绒挂件，材质为帆布和皮革拼接。整体风格为街头休闲风，肢体语言放松自然，表情略带好奇与俏皮，整体呈现出一种随性、青春、充满活力的都市少女形象。`,
    category: "photography",
    tags: ["portrait", "photography", "realistic"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Urban Turn-Back Street Portrait",
    imageUrl: "/prompts/urban-turn-back-street-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Tz_2022"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-010",
    slug: "sam-altman-skatepark-snapshot",
    title: "Sam Altman Skatepark Snapshot",
    prompt: `"Sam Altman on a skateboard at a skatepark with no people."`,
    category: "photography",
    tags: ["portrait", "photography", "realistic"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Sam Altman Skatepark Snapshot",
    imageUrl: "/prompts/sam-altman-skatepark-snapshot.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Malek1173989"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-011",
    slug: "korean-idol-3x3-grid-portrait",
    title: "Korean Idol 3x3 Grid Portrait",
    prompt: `9:16 vertical, Korean idol portrait photoshoot, 3x3 grid (nine frames), same person in all images, consistent facial features and styling, soft black mist filter effect, lowered contrast, blooming highlights, subtle glow around light sources`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "korean"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Korean Idol 3x3 Grid Portrait",
    imageUrl: "/prompts/korean-idol-3x3-grid-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @BubbleBrain"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-012",
    slug: "ccd-camera-flash-korean-idol",
    title: "CCD Camera Flash Korean Idol",
    prompt: `mobile phone photo, old CCD camera aesthetic, harsh flash, grainy, dim messy indoor lighting, candid snapshot feeling, slight motion blur, young Korean female idol, soft innocent look`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "korean"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "CCD Camera Flash Korean Idol",
    imageUrl: "/prompts/ccd-camera-flash-korean-idol.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @BubbleBrain"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-013",
    slug: "korean-idol-3x3-collage-portrait",
    title: "Korean Idol 3x3 Collage Portrait",
    prompt: `9:16 vertical — a 3x3 grid collage (nine images) forming a Korean idol portrait photoshoot series. Each frame features the same young Korean female idol, maintaining 100% consistency in facial features, proportions, hairstyle, and identity across all nine shots.   Natural, ultra-realistic skin texture, no retouching, no smoothing. Clean idol-style minimal makeup, soft glow, subtle imperfections.   Hair: long, voluminous dark hair, slightly tousled, consistent across all frames (natural loose flow, slight movement).  Outfit: cohesive Korean idol photoshoot styling — white shirt + short bottoms (or simple neutral-toned outfit), youthful, clean, slightly casual but styled. Same outfit across all frames.  Setting: minimal studio or simple indoor environment (plain wall, soft window light, clean background). Focus on subject, not environment.  Lighting: soft diffused natural light, gentle highlights, low contrast, slightly airy tones, subtle film-like softness.  Camera style: intimate portrait photography, slightly handheld feel, subtle imperfections (minor grain, slight blur in motion frames, imperfect framing).  Frame breakdown (3x3 grid):  Top row: - Top left: standing naturally, looking slightly away, relaxed expression - Top center: facing camera, casual mid-motion (hair or body slight movement) - Top right: slight side angle, soft gaze, natural candid feel  Middle row: - Center left: looking slightly upward, soft thoughtful expression - Center: close-up portrait, direct eye contact, gentle idol smile - Center right: turning body slightly, mid-motion candid frame  Bottom row: - Bottom left: seated or leaning casually, relaxed posture - Bottom center: back partially turned, looking over shoulder toward camera - Bottom right: standing close to frame, slightly playful or soft expression  Mood: Korean idol photobook / photocard aesthetic, intimate, soft, natural, everyday charm.  Quality: ultra-realistic, 8K detail, subtle analog film grain, natural imperfections, soft dreamy tone`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "korean"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Korean Idol 3x3 Collage Portrait",
    imageUrl: "/prompts/korean-idol-3x3-collage-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @BubbleBrain"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-014",
    slug: "soft-black-mist-editorial-portrait",
    title: "Soft Black Mist Editorial Portrait",
    prompt: `9:16 vertical — editorial portrait, single subject  soft black mist filter, subtle haze, gentle highlight bloom, muted tones  minimal indoor space, clean background, slight texture  young Korean woman, minimal makeup, natural skin texture  outfit: fitted ribbed knit top or soft camisole layered under a loose shirt, paired with high-waisted shorts or skirt; fabric slightly clings to body shape, soft and natural, no revealing elements  hair: slightly messy, natural volume  pose: sitting on floor with one leg bent and the other relaxed, body slightly leaning, shoulders not aligned, head tilted  composition: subject slightly off-center, negative space present  expression: calm, slightly distant, natural lips  lighting: soft side light, gentle shadow falloff  mood: understated, quiet, subtly sensual through natural body lines, relaxed and unposed  quality: fine grain, slight softness, realistic look`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "korean", "fashion"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Soft Black Mist Editorial Portrait",
    imageUrl: "/prompts/soft-black-mist-editorial-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @BubbleBrain"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-015",
    slug: "fujifilm-strawberry-school-portrait",
    title: "Fujifilm Strawberry School Portrait",
    prompt: `9:16 vertical — Japanese Fuji film style portrait, single subject  Fujifilm analog aesthetic (Pro 400H / Superia feel), soft pastel tones, slight green-magenta shift, low contrast, gentle highlight roll-off, fine film grain, subtle halation, slight vignette  bright natural daylight, diffused sunlight through window, soft shadows, airy atmosphere  young Japanese female idol, natural minimal makeup, fresh glowing skin, realistic texture, slight imperfections  outfit: Japanese school uniform (sailor-style or blazer uniform), neatly styled, non-revealing, youthful and clean  hair: natural dark hair, straight or softly flowing, a few loose strands  pose: front-facing or slight angle toward camera, relaxed posture; one hand gently holding a strawberry near lips, mid-action as if about to take a bite; shoulders relaxed, subtle natural body curve  expression: soft playful gaze, light smile or neutral lips, gentle eye contact with camera  setting: minimal indoor near window or simple outdoor corner, clean background, everyday atmosphere  composition: slightly off-center framing, intimate distance, candid feel  mood: fresh, youthful, sweet everyday moment, understated charm  quality: ultra-realistic, analog film look, natural imperfections, soft dreamy finish`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "japanese", "korean"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Fujifilm Strawberry School Portrait",
    imageUrl: "/prompts/fujifilm-strawberry-school-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @BubbleBrain"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-016",
    slug: "soft-black-mist-idol-portrait",
    title: "Soft Black Mist Idol Portrait",
    prompt: `9:16 vertical — Korean idol portrait photography, single subject  soft black mist filter effect, lowered contrast, gentle highlight bloom, subtle glow, soft diffusion, slightly faded blacks  minimal indoor setting near window, white curtains, clean light-toned background  young Korean female idol, natural minimal makeup, dewy realistic skin texture, subtle imperfections  outfit: oversized white button-up shirt + short bottoms, slightly loose fit, soft and casual styling, no revealing elements  hair: long dark hair, slightly messy, natural volume, softly flowing  pose: relaxed standing or slight lean, body subtly angled, one leg slightly forward, shoulders relaxed; one hand lightly touching collar or resting near neckline, the other relaxed; gentle body curve without exaggeration  expression: soft cute smile, slightly playful eyes, direct or slightly off-camera gaze  camera: close to mid-body framing, eye-level, intimate distance, slight handheld feel  lighting: diffused natural daylight, soft shadows, gentle light wrapping around face and body  mood: cute yet subtly sensual, intimate, everyday softness, quiet romantic atmosphere  quality: ultra-realistic, fine film grain, slight softness at edges, natural imperfections, dreamy understated tone`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "korean"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Soft Black Mist Idol Portrait",
    imageUrl: "/prompts/soft-black-mist-idol-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @BubbleBrain"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-017",
    slug: "fujifilm-couple-portrait",
    title: "Fujifilm Couple Portrait",
    prompt: `9:16 vertical — Japanese Fuji film style couple portrait, two subjects  Fujifilm analog aesthetic (Pro 400H / Superia feel), soft pastel tones, slight green-magenta shift, low contrast, gentle highlight roll-off, fine film grain, subtle halation  bright natural daylight, diffused sunlight through window, soft shadows, airy atmosphere  young Japanese couple, natural minimal makeup, realistic skin texture, slight imperfections  female outfit: oversized button-up shirt with loose shorts, relaxed fit, soft casual styling   male outfit: simple t-shirt or light shirt, clean and understated  hair: natural, slightly tousled for both  pose: close intimate distance — sitting or standing close together; the girl gently leaning toward him, one hand lightly resting on his shoulder or chest; the boy slightly leaning in, faces close, almost touching, capturing the moment just before a kiss  expression: soft smiles or gentle gaze toward each other, relaxed and natural, emotional connection visible  camera: close framing (waist-up), eye-level, intimate distance, slight handheld feel  setting: minimal indoor near window, light curtains, clean soft background  lighting: diffused daylight, gentle highlight bloom, soft shadow transitions  mood: warm, romantic, intimate everyday moment, natural affection  quality: ultra-realistic, analog film look, fine grain, slight softness, natural imperfections`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "japanese"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Fujifilm Couple Portrait",
    imageUrl: "/prompts/fujifilm-couple-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @BubbleBrain"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-018",
    slug: "ai-self-perception-portrait",
    title: "AI Self-Perception Portrait",
    prompt: `Based on your understanding of me, generate an image of "the me you know".`,
    originalPrompt: `根据你对我的认知 给我生成一个“你认识的我”的 图片`,
    category: "photography",
    tags: ["portrait", "photography", "realistic"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "AI Self-Perception Portrait",
    imageUrl: "/prompts/ai-self-perception-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @80vul"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-019",
    slug: "create-the-most-realistic-front-page-design-of-a-vintage-new",
    title: "Create the most realistic front page design of a vintage newspaper featuring ...",
    prompt: `Create the most realistic front page design of a vintage newspaper featuring the main character. The layout should be made in the style of a real printed newspaper with a cinematic black-and-white aesthetic.
The main photo should be prominently placed in the center, framed, like the image in the title of the article. The subject in the photo should remain unchanged and clearly distinguishable in natural light and slightly increased contrast in order to match the spectacular editorial style.
Create a bold, attention-grabbing headline at the top (create a unique title that matches the spirit of the photo - it can be romantic, mysterious, funny, or dramatic). Add a smaller subtitle under it, which will look like a real newspaper caption.
Add realistic newspaper elements:
Columns of small text (in the style of lorem ipsum, but framed like real news)
At the top is the fictitious name of the publication (for example, The Daily Prompts, AI Times or similar - think creatively, according to the picture)
Date, issue number and location
Decorative lines, dividers, and vintage typography
Small additional articles or captions to the main image
Optional stamps, doodles, or editorial notes to add personality.
Style:
Black and white or slightly faded monochrome paper
Fine paper texture, grain, and ink defects
Small shadows and creases that mimic real printed paper
The aesthetics of a clean but slightly worn vintage newspaper
Mood: Give the design personality, expressiveness and plot, as if the plot is part of the main article.
Aspect ratio: 4:5 or 1:1
High-detail, ultra-realistic hybrid of editorial photography and print design.`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "fashion"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Create the most realistic front page design of a vintage newspaper featuring ...",
    imageUrl: "/prompts/create-the-most-realistic-front-page-design-of-a-vintage-new.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Naiknelofar788"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-020",
    slug: "magazine-travel-guide-feature-article",
    title: "Magazine Travel Guide Feature Article",
    prompt: `Create image of Magazine feature article [travel] guide page, cute, information dense photo book style magazine feature article page. Add all necessary sections, tips, recommendations, information. add photos for any sections and recommendations if you like. Place the attached person at the precise location of [city, country]. Seamlessly blend the attached person as if they are sightseeing. Approach this task with the understanding that this is a critical, information rich page that will significantly influence visitor numbers, text accuracy is important. Fully use the entire [9:16] page. NEGATIVE PROMPT: coordinate texts @swiat_ai @ProfitAII`,
    category: "photography",
    tags: ["portrait", "photography", "realistic"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Magazine Travel Guide Feature Article",
    imageUrl: "/prompts/magazine-travel-guide-feature-article.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @andis13"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-021",
    slug: "analyze-this-photo-and-give-me-a-detailed-json-prompt-that-r",
    title: "analyze this photo and give me a detailed JSON prompt that recreates it. brea...",
    prompt: `analyze this photo and give me a detailed JSON prompt that recreates it. break down the color grading and every exact color in the photo

(use Opus, not Sonnet. Opus has stronger visual analysis and writes more detailed JSON)

paste that JSON into ChatGPT
upload your product image and prompt:
using this JSON as reference, generate a person holding my product
save that generated photo as your character reference

attach it to every future generation for facial consistency

you now have a consistent UGC model that works across any product

the JSON controls the lighting and color grading. GPT image-2 handles the character. you control the product placement.

the #1 tell on AI photos is flat colors and a grainy look. this method removes both.
5 minutes to set up. unlimited variations after.`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "commercial"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "analyze this photo and give me a detailed JSON prompt that recreates it. brea...",
    imageUrl: "/prompts/analyze-this-photo-and-give-me-a-detailed-json-prompt-that-r.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @pavellaslov"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-022",
    slug: "calming-green-tea-film-kit-displayed-frontally-the-open-box",
    title: "CALMING GREEN TEA Film Kit displayed frontally, the open box shows soft sage-...",
    prompt: `CALMING GREEN TEA Film Kit displayed frontally, the open box shows soft sage-green film pouches and translucent ampoules with matte silver caps, product placed centrally with clear branding CALMING GREEN TEA -- 7 Days to Soothed Skin, pastel green background with botanical graphic accents, three minimal icons (leaf, wave, balance) floating around the product to emphasize benefits, photographic, hyper detailed, ultra realistic, lifelike, 8k, high detail, soft professional lighting.`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "commercial"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "CALMING GREEN TEA Film Kit displayed frontally, the open box shows soft sage-...",
    imageUrl: "/prompts/calming-green-tea-film-kit-displayed-frontally-the-open-box.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @ZaraIrahh"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-023",
    slug: "ultra-realistic-product-photography-of-a-rich-strawberry-sof",
    title: "Ultra-realistic product photography of a rich strawberry soft-serve ice cream...",
    prompt: `Ultra-realistic product photography of a rich strawberry soft-serve ice cream in a crispy waffle cone, styled with a clean, modern premium aesthetic. The soft serve is a vibrant natural pink, thick and creamy, sculpted into a smooth swirl with a softly curled peak, lightly topped with delicate strawberry dust or tiny fruit specks for a fresh, appetizing look. The cone has a rustic, crunchy texture with slightly uneven edges for an artisanal feel.
The background is soft beige with natural sunlight casting subtle leaf shadows, creating a calm, organic atmosphere. Include softly blurred greenery in the foreground for depth. The composition is minimal, balanced, and uses negative space effectively, similar to high-end American food brand ads.
On the left side, include modern English typography in a clean, elegant layout (not vertical).
Main headline:
Sweet Strawberry Bliss.
Supporting line (smaller text):
Made with real strawberries. Smooth. Creamy. Irresistible.
Add a small circular badge showing the price:
$5.80.
Lighting: soft natural daylight, warm highlights, shallow depth of field, high-end commercial food photography style.
Mood: fresh, premium, modern, and inviting — aligned with upscale U.S. dessert branding.`,
    category: "game",
    tags: ["portrait", "photography", "realistic", "commercial", "food"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Ultra-realistic product photography of a rich strawberry soft-serve ice cream...",
    imageUrl: "/prompts/ultra-realistic-product-photography-of-a-rich-strawberry-sof.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @ZaraIrahh"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-024",
    slug: "a-hyper-realistic-uiux-mockup-displayed-on-a-slim-modern-lap",
    title: "A hyper-realistic UI/UX mockup displayed on a slim modern laptop placed on a ...",
    prompt: `A hyper-realistic UI/UX mockup displayed on a slim modern laptop placed on a minimal wooden desk with soft natural daylight. The screen shows a clean SaaS dashboard with elegant typography, glassmorphism cards, smooth gradients, subtle drop shadows, and neatly spaced components. Visible charts, analytics panels, sidebar navigation, and micro-interactions. Realistic macOS-style window frame, soft reflections on the screen, shallow depth of field, cozy workspace atmosphere, shot in photorealistic product photography style, ultra-detailed.`,
    category: "product",
    tags: ["portrait", "photography", "realistic", "commercial"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "A hyper-realistic UI/UX mockup displayed on a slim modern laptop placed on a ...",
    imageUrl: "/prompts/a-hyper-realistic-uiux-mockup-displayed-on-a-slim-modern-lap.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @ZaraIrahh"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-025",
    slug: "ultra-realistic-cinematic-dslr-photograph-of-an-18-year-old",
    title: "Ultra-realistic cinematic DSLR photograph of an 18-year-old handsome young ma...",
    prompt: `Ultra-realistic cinematic DSLR photograph of an 18-year-old handsome young man with a slim skinny body, lean physique, narrow shoulders and waist, standing confidently in front of a blue 2017 Ford Mustang GT Convertible with a bold red soft top roof, captured from a high-angle aerial perspective exactly like a luxury driveway photoshoot. Keep face 100% identical to reference image with exact facial structure, natural skin texture, realistic pores, authentic expression, no beautification, no facial modification. Same modern textured side-swept quiff hairstyle with heavy natural volume on top, deep side flow, messy yet controlled texture, soft matte finish, visible natural hair strands, softly blended sides.

The subject stands centered near the front bumper of the Mustang GT, hands inside hoodie pockets, relaxed shoulders, straight posture, slight head tilt upward toward camera, confident calm expression, wearing oversized premium black hoodie with realistic cotton texture, natural folds, hanging drawstrings, loose dark washed black denim jeans with soft wrinkles and stacked hems, clean white sneakers with realistic leather texture and sole details, black slim rectangular sunglasses.

Car must be a detailed 2017 Ford Mustang GT Convertible, metallic electric blue paint, glossy reflections on hood, visible Mustang pony grille emblem, aggressive headlights, muscular hood sculpting, aerodynamic front bumper, black alloy wheels, premium red convertible fabric roof, realistic windshield reflections, detailed side mirrors, authentic tire tread, showroom-clean finish

Scene set in an upscale villa driveway with light beige hexagonal stone pavement, curved border with fresh green grass on left side, tropical palm leaves entering frame from top corners, subtle luxury outdoor atmosphere. Soft natural daylight, diffused afternoon lighting, realistic shadows under car and body, soft reflections on paintwork, cinematic premium color grading, natural contrast, shallow depth separation while maintaining environment clarity. Shot on 35mm lens, vertical composition, full body framing, crisp details, hyper-realistic DSLR quality, zero Al look, natural skin rendering, realistic hair strands, fabric texture, stone surface texture, luxury lifestyle mood. stylish text AmanZaid at the bottom-left corner, signature style

Negative Prompt:

face changed, different identity, beautified face, edited face, smooth plastic skin, fake skin glow, wrong hairstyle, short hair, fade haircut, buzzcut, messy deformed hair, female features, muscular body, fat body, broad shoulders, bad anatomy, long neck, short legs, extra fingers, missing fingers, mutated hands, distorted arms, broken posture, crossed eyes, lazy eye, bad sunglasses, blurry face, low resolution, pixelated, noisy image, overexposed, underexposed, harsh shadows, unrealistic reflections, fake car shape, wrong car model, damaged car, extra wheels, warped Mustang logo, incorrect. proportions, bad pavement texture, background artifacts, duplicate objects, watermark, logo errors, text artifacts, cropped feet, cut car, unnatural perspective, CGI render, cartoon style, painting, Al artifacts, oversaturated colors, motion blur, lens distortion 1664x2080-ar 4:5`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "fashion", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Ultra-realistic cinematic DSLR photograph of an 18-year-old handsome young ma...",
    imageUrl: "/prompts/ultra-realistic-cinematic-dslr-photograph-of-an-18-year-old.jpg",
    breakdown: {
      subject: "18-year-old young man with slim build, side-swept quiff hairstyle, standing in front of a blue 2017 Ford Mustang GT Convertible with red soft top",
      style: "Hyper-realistic DSLR quality, cinematic premium color grading, zero AI look, luxury lifestyle automotive photoshoot aesthetic",
      lighting: "Soft natural daylight, diffused afternoon lighting, realistic shadows under car and body, soft reflections on paintwork, natural contrast",
      composition: "High-angle aerial perspective, vertical 4:5 composition, full body framing with car as backdrop, centered subject near front bumper",
      details: "Detailed car specs (Mustang pony grille emblem, metallic blue paint, black alloy wheels), upscale villa driveway with hexagonal stone pavement, tropical palm leaves, signature text watermark",
    },
    tips: [
      "By @harboriis",
      "This is an advanced prompt with a built-in negative prompt section — GPT Image 2 can use negative prompts to avoid common generation artifacts.",
      "The prompt specifies exact car model details (2017 Ford Mustang GT) which helps GPT Image 2 generate accurate vehicle shapes rather than generic cars.",
      "Including 'zero AI look' and 'natural skin rendering' explicitly pushes the model toward photorealism and away from the typical AI-generated smoothness.",
      "The aspect ratio is specified at the end (4:5) — always place technical specs like resolution and ratio at the end of your prompt for best results.",
    ],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-026",
    slug: "candid-bedroom-selfie-photorealistic-portrait",
    title: "Candid Bedroom Selfie Photorealistic Portrait",
    prompt: `Candid selfie of a young woman with shoulder-length honey-blonde hair with lighter highlights, green-grey eyes, rosy cheeks, and a natural no-makeup makeup look. She is wearing a light grey hoodie and looking slightly off-camera with a relaxed expression. Background shows a cosy bedroom with warm fairy lights strung on a pink wall, a unmade bed with tan bedding, and a small white desk with stacked books. Soft, warm ambient lighting. Photo-realistic, casual, intimate feel.`,
    category: "photography",
    tags: ["portrait", "photography", "realistic"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Candid Bedroom Selfie Photorealistic Portrait",
    imageUrl: "/prompts/candid-bedroom-selfie-photorealistic-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @charliejhills"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-027",
    slug: "musician-leaving-bodega-night-cinematic-portrait",
    title: "Musician Leaving Bodega Night Cinematic Portrait",
    prompt: `A candid, magazine-cover quality documentary photograph of a young musician with curly hair, casually carrying a worn guitar case, stepping out of a classic downtown bodega at 11 PM. The lighting features a complex mixed color temperature: a bright neon "OPEN" sign casts an intense, warm red glow across his face, while a yellow streetlamp provides a striking backlight behind him. The image perfectly emulates 35mm film shot on a Canon AE-1 with a 50mm f/1.4 lens wide open, exhibiting a shallow depth of field with the background beautifully blurred. It captures the exact aesthetics of CineStill 800T film, specifically featuring the distinctive soft red halation bloom radiating outward from the neon light sources, a tungsten white balance, and moody, slightly green-tinted shadows in the darkest areas. Cinematic night photography, photorealistic, highly detailed.`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "sci-fi"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Musician Leaving Bodega Night Cinematic Portrait",
    imageUrl: "/prompts/musician-leaving-bodega-night-cinematic-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @commanderdgr8"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-028",
    slug: "old-delhi-sweet-shop-storefront-documentary-photo",
    title: "Old Delhi Sweet Shop Storefront Documentary Photo",
    prompt: `Create a photorealistic travel-documentary image of a small sweet-shop storefront in Old Delhi at midday. A painted shop signboard above the door reads "मिठाई की दुकान" in large bold yellow hand-painted Devanagari on a deep red background, with "SWEET SHOP" in smaller roman letters beneath. Realistic hand-painted texture, slight wear, natural shadow. Authentic script proportion. Spelling and characters exact. No extra signage in frame, no watermark.`,
    category: "photography",
    tags: ["portrait", "photography", "realistic"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Old Delhi Sweet Shop Storefront Documentary Photo",
    imageUrl: "/prompts/old-delhi-sweet-shop-storefront-documentary-photo.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @commanderdgr8"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-029",
    slug: "cyberpunk-sci-fi-side-profile-portrait",
    title: "Cyberpunk Sci-Fi Side Profile Portrait",
    prompt: `A cinematic side-profile portrait of a rugged man with a tied-back bun and full beard, wearing round dark sunglasses and a textured leather jacket. His skin is detailed and slightly weathered. The background is a futuristic sci-fi interface filled with glowing orange and red data streams, star maps, celestial navigation diagrams, grids, and holographic UI elements. Fiery particle effects and ember-like energy swirl around him, creating a cosmic, high-tech atmosphere. Dark color palette with strong contrast, dramatic lighting, ultra-detailed, sharp focus, 8K, cyberpunk aesthetic, cinematic composition, depth of field.`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic", "sci-fi"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Cyberpunk Sci-Fi Side Profile Portrait",
    imageUrl: "/prompts/cyberpunk-sci-fi-side-profile-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @iamsofiaijaz"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-030",
    slug: "realistic-candid-bedroom-recording-portrait",
    title: "Realistic Candid Bedroom Recording Portrait",
    prompt: `A realistic young woman sitting casually in a softly lit bedroom during late afternoon.

She is holding her phone very close to her face as if recording a private video or voice note.

Framing is tight and slightly imperfect.

Expression: thoughtful, slightly shy, natural.

Minimal makeup, natural skin texture, relaxed clothing.

Lighting: warm natural light fading from a window, soft shadows.

Environment: simple bedroom, calm and lived-in.

Style: ultra-realistic, looks like a real phone recording, slightly grainy, not cinematic.`,
    category: "photography",
    tags: ["portrait", "photography", "realistic", "cinematic"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Realistic Candid Bedroom Recording Portrait",
    imageUrl: "/prompts/realistic-candid-bedroom-recording-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @ChillaiKalan__"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-031",
    slug: "toddler-crayon-scribble-art-style-portrait",
    title: "Toddler Crayon Scribble Art Style Portrait",
    prompt: `(subject) in the style of super bad child drawing, toddler art, scribbles, messy crayon lines on white background, completely lack of technique, hilariously bad proportions, stick figure energy, kindergarten masterpiece, drawn by a 3-year-old, pure chaos on paper`,
    originalPrompt: `(被写体) in the style of super bad child drawing, toddler art, scribbles, messy crayon lines on white background, completely lack of technique, terrible composition, chaotic colors, barely recognizable shapes, very raw, honest art, pure naivety, unrefined style, 4:3
Negative:
good drawing, nice lines, clear shapes, neat, pretty, smooth, realistic, talented art, coherent composition, artistic style, professional, skilled, masterpiece, beautiful, detailed`,
    category: "photography",
    tags: ["portrait", "photography", "realistic"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Toddler Crayon Scribble Art Style Portrait",
    imageUrl: "/prompts/toddler-crayon-scribble-art-style-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @akakageAI"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-032",
    slug: "boston-spring-2026-city-poster",
    title: "Boston Spring 2026 City Poster",
    prompt: `A striking Spring 2026 city poster for Boston with an elegant celebratory mood and a bold contemporary design. On a clean off-white textured background with large areas of negative space, a miniature single sculler rows across the lower right corner of the image on a narrow ribbon of reflective water. The wake from the oar sweeps upward in a dynamic calligraphic curve, gradually transforming into the Charles River and then into a dreamlike hand-painted panorama of Boston. Inside this flowing river-shaped composition are iconic Boston elements: the Back Bay skyline, Beacon Hill brownstones, Acorn Street, Boston Public Garden, Swan Boats, Zakim Bridge, Fenway-inspired details, historic brick architecture, harbor ferries, and the city’s waterfront atmosphere. Soft morning fog, golden spring light, subtle festive accents in crimson and gold, rich detail, layered depth, sophisticated city-poster aesthetics, fresh and refined, visually powerful but not overcrowded. Elegant typography in the lower left reads “SPRING 2026” with a vertical slogan “BOSTON, A CITY OF RIVER, MEMORY, AND INVENTION”, text clear and beautifully composed, premium graphic design, 9:16`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Boston Spring 2026 City Poster",
    imageUrl: "/prompts/boston-spring-2026-city-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @BubbleBrain"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-033",
    slug: "vintage-amalfi-travel-poster",
    title: "Vintage Amalfi Travel Poster",
    prompt: `Modern pencil illustration of Vintage travel poster illustration of the Amalfi Coast, Italy, panoramic coastal cliff road scene, classic 1960s white car driving along a curved seaside road, deep blue Mediterranean sea with small sailboats, colorful pastel hillside village, bright blue sky with soft clouds, lemon tree branches with vibrant yellow lemons framing the foreground, warm summer sunlight, bold vibrant colors, retro 1950s travel poster style, cinematic composition, high detail, screen print texture, graphic illustration. Hand-drawn style, illustration with loose strokes and defined contours. High-contrast color palette, maintaining chromatic harmony between background and elements. Contemporary and decorative aesthetic.`,
    category: "poster",
    tags: ["poster", "design", "illustration", "cinematic"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Vintage Amalfi Travel Poster",
    imageUrl: "/prompts/vintage-amalfi-travel-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @WolfRiccardo"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-034",
    slug: "chengdu-food-map-illustration",
    title: "Chengdu Food Map Illustration",
    prompt: `A hand-drawn style city food map themed around Chengdu. The scene uses a bird's-eye view of a simplified hand-drawn city map as the base, marking major roads and landmarks without pursuing precise proportions but rather a cute hand-drawn feel. Scattered across the map are 12 exquisite hand-drawn food spot illustrations: Chunxi Road's skewered hotpot (bamboo sticks with various steaming ingredients), Kuanzhai Alley's Three Cannons (three glutinous rice balls flying toward a bronze plate), Jianshelu's cold noodles, Yulin's barbecue street, a giant hot pot in the center, mapo tofu, kung pao chicken, dan dan noodles, sweet water noodles, rabbit head, zhong dumplings, and Longchaoshou wontons. Each food illustration is connected to its location by dotted lines. The color palette is warm and appetizing with reds, oranges, and golden yellows. The overall style resembles a travel guidebook illustration — warm, lively, and full of local flavor.`,
    originalPrompt: `一张手绘风格的城市美食地图，以成都为主题。画面以鸟瞰视角的手绘简化城市地图为底，标注主要道路和地标但不追求精确比例而是追求可爱的手绘感。地图上分布着 12 个美食地点的精致手绘小插画：春熙路的串串香（一把竹签插着各种食材冒着热气）、宽窄巷子的三大炮（三个糯米团子飞向铜盘）、建设路的蛋烘糕（金黄酥脆正在翻面）、玉林路的火锅（九宫格锅翻滚冒泡）等，每个插画约占地图的 5% 面积，旁边用手写体标注店名和一句推荐语"凌晨两点还在排队的那家"。地图边缘用手绘藤蔓和辣椒装饰形成边框。右下角有一个手绘指南针和图例说明。左上角标题"成都·吃货暴走地图"使用胖圆的手绘美术字配辣椒装饰。整体画风为水彩+彩铅混合的手绘质感，颜色以暖色系（辣椒红、姜黄、翠绿）为主，图片比例 1:1。`,
    category: "poster",
    tags: ["poster", "design", "illustration", "food"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Chengdu Food Map Illustration",
    imageUrl: "/prompts/chengdu-food-map-illustration.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Panda20230902"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-035",
    slug: "chinese-minimalist-s-shaped-poster",
    title: "Chinese Minimalist S-Shaped Poster",
    prompt: `Minimalist new Chinese aesthetic style. The background is an elegant pale gray-white, creating a paper-cut silhouette-like three-dimensional effect. An S-shaped winding crack-like edge divides the image, as if tearing open a layer of paper to reveal colorful Eastern landscape scenery within. Inside the crack, a winding river flows from top to bottom through the entire composition, rendered in varying shades of blue with distinct layers, like a flowing ribbon. Along both riverbanks are verdant hills and terraced fields in soft colors of intertwined green and red, showcasing the tranquility of pastoral beauty. Ancient-style buildings along the river are arranged in an elegant scattered pattern with upturned eaves, white walls and dark tiles, appearing even more classically elegant under the play of light and shadow. Lush trees line the banks with delicate branches, and a small boat rests quietly in the center of the water, adding a sense of leisurely contemplation. The overall composition follows an S-curve, rich in rhythm, as if nature and humanity coexist in harmony. The edges use a torn-paper effect, creating a three-dimensional relief-like visual experience. At the bottom, "Eastern Aesthetics" is written in black regular script, the date "2026/04/18" echoes a red seal stamp, "CHINA" appears prominently at the bottom, and the signature "@LIYUE" concludes subtly. The overall atmosphere is serene, profound, and full of poetry and philosophy.`,
    originalPrompt: `极简新中式美学风格，画面以淡雅的灰白色为底，呈现出一种纸艺剪影般的立体感。
一条S形蜿蜒的裂痕状边缘将画面分割，仿佛撕开了一层纸面，露出内部色彩斑斓的东方山水景象。
裂口内，一条蜿蜒的河流自上而下贯穿整个构图，河水以深浅不一的蓝色渲染，层次分明，仿佛流动的丝带。
河岸两侧点缀着青翠的山丘与梯田，色彩柔和，绿红交织，展现出田园的宁静之美。
沿河而建的古风建筑错落有致，飞檐翘角，白墙黛瓦，在光影的映衬下更显古朴典雅。
岸边树木葱茏，枝叶轻盈，一艘小船静泊于水中央，增添了几分悠然意境。
整体构图呈S形曲线，富有韵律感，仿佛自然与人文的和谐共生。
画作边缘采用撕纸效果，营造出立体浮雕般的视觉体验。
下方题字“东方美学”以黑色楷体书写，日期“2026/04/18”与红色印章相呼应，底部“CHINA”字样庄重醒目，署名“@LIYUE”低调收尾，整体氛围静谧深远，充满诗意与哲思。`,
    category: "poster",
    tags: ["poster", "design", "illustration", "chinese-style"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Chinese Minimalist S-Shaped Poster",
    imageUrl: "/prompts/chinese-minimalist-s-shaped-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @liyue_ai"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-036",
    slug: "2026-spring-guangzhou-city-poster",
    title: "2026 Spring Guangzhou City Poster",
    prompt: `A festive yet elegantly refined 2026 city promotional poster. Double exposure technique with an S-shaped flowing composition. On the pure white textured background's lower right, a miniature figure in traditional Chinese attire waves a long red silk ribbon. The silk dances in the air, showcasing its smooth texture, and as it floats toward the upper left, it magically transforms into a magnificent mountain range and river. Within this "river," a hand-drawn panoramic illustration of Guangzhou city is overlaid in guochao (national trend) style — the scenery stretches as far as the eye can see, grand and awe-inspiring. Guangzhou's landmark buildings appear: Canton Tower, Zhujiang New Town skyline, the Pearl River, ancient city architecture, cruise ships, and Baiyun Mountain. Clouds and mist swirl ethereally, colors are rich, the structure is complex and detail-rich, yet the generous use of white space keeps the image feeling fresh and refined. In the lower left, "SPRING 2026" and a vertical promotional slogan are typeset, conveying the overall message of "Thousand-Year Trade Capital, Charming Guangzhou." Beautiful, elegant typography with clear, complete text. Aspect ratio 9:16.`,
    originalPrompt: `一张充满新春喜庆氛围但不失高雅格调的 2026 城市宣传海报。
双重曝光，构图延续了S型的流动感；
在纯白的纹理背景右下角，一个身穿中国传统服饰的微缩人物正在挥舞着一条长长的红色丝绸舞带，这条红绸在空中舞动，不仅展现出丝绸的柔顺质感，更在向左上方飘动的过程中，奇幻地变形成了一条壮丽的山脉河流。
在这条“河流”中，叠加了一个有山有海河的广州城市手绘图，国潮，景色尽在眼底，壮阔雄伟，令人震撼。
广州的地标建筑(广州塔，珠江新城建筑群，珠江, 广州城里古建筑，游轮，白云山）。
云雾环绕，仙气缥缈，色彩丰富，结构复杂，细节丰富，但因为大面积的留白，画面依然显得清新脱俗，左下角排版着“SPRING 2026”和竖排的宣传语，整体寓意“千年商都，魅力广州”。
文字排版优美，大方，字迹清晰完整，尺寸9:16。`,
    category: "poster",
    tags: ["poster", "design", "illustration", "chinese-style"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "2026 Spring Guangzhou City Poster",
    imageUrl: "/prompts/2026-spring-guangzhou-city-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @liyue_ai"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-037",
    slug: "doodle-sketch-ai-builder",
    title: "Doodle Sketch AI Builder",
    prompt: `Depict [a brilliant AI builder] in a doodle sketch style, with an overall look of quick outlines, free-form distortion, improvisational hand-drawing, and draft-like visual effects. Lines are casual, exaggerated, varying in thickness, slightly messy but rhythmic and expressive, emphasizing generalization, exaggeration, fun, and spontaneity rather than rigorous realism or fine detail. Colors use rough, dry-brush-style blocks with visible uneven smearing marks, brush strokes, flying white effects, and a sense of layered coverage. Colors automatically adapt to the [theme/subject], but the overall expression remains doodle-style, sketch-style, and generalized. No transparent watercolor bleeding effects, no delicate watercolor transitions, no paper texture, no soft hazing, no dreamy quality. The background is primarily white space, keeping it clean, relaxed, with a sense of incompleteness and design sensibility. A small number of auxiliary symbols, arrows, marks, circled annotations, repeated lines, casually written text, or other doodle elements may be added to enhance the sketchbook or journal-style visual language, but it must not be too crowded and must not disrupt the subject or the white space quality. The image content does not need to be pre-specified — [a brilliant AI builder] will automatically derive and generate the most fitting subject image, pose, related elements, symbols, or simplified scene, maintaining a unified doodle sketch style and exaggerated generalized expression throughout, avoiding complex realistic backgrounds and excessive elaboration. The image must naturally include the exclusive signature "BlanPlan" as part of the composition, positioned subtly but clearly, placed in the lower-left corner, lower-right corner, or near the title. The style must be unified with the overall layout, resembling an artwork signature or design credit. The signature font should be refined, restrained, and sophisticated — not too large, not disrupting the main composition, and not appearing abrupt or cheap.`,
    originalPrompt: `以涂鸦速写风表现【一个厉害的AI builder】，整体呈现快速勾勒、自由变形、即兴手绘与草稿式的视觉效果。线条随手、夸张、可粗细不一，略显凌乱但具有节奏和表现力，强调概括、夸张、趣味和随性，而不是严谨写实或精细刻画。  颜色采用粗糙、干刷感明显的块面表现，可保留不均匀的涂抹痕迹、刷痕、飞白与覆盖感，色彩根据【主题/主体】自动适配，但整体保持涂鸦式、速写式、概括式的表达。不要透明水彩晕染效果，不要细腻水彩过渡，不要纸纹理，不要柔和雾化，不要梦幻质感。  背景以留白为主，保持简洁、轻松、未完成感和设计感，可加入少量辅助性符号、箭头、记号、圈画、重复线、随手写的文字或其他涂鸦元素，以增强速写本或随笔式视觉语言，但不可过于拥挤，不可破坏主体和留白气质。  画面内容不需要预先写清楚，由【一个厉害的AI builder】自动推演并生成最适合的主体形象、动作、相关元素、符号或简化场景，整体保持统一的涂鸦速写风和夸张概括的表现方式，避免复杂写实背景和过度铺陈。 画面中需自然加入专属签名“BlanPlan”，作为画面的一部分，位置低调但清晰，可放在左下角、右下角或标题附近，风格需与整体版式统一，像作品署名或设计落款；签名字体精致、克制、高级，不可过大，不可破坏主体构图，不可显得突兀或廉价。`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Doodle Sketch AI Builder",
    imageUrl: "/prompts/doodle-sketch-ai-builder.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @blanplan"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-038",
    slug: "futuristic-mandala-illustration",
    title: "Futuristic Mandala Illustration",
    prompt: `Draw a futuristic sci-fi version of a mandala.`,
    originalPrompt: `曼荼羅の近未来SF版を描いて`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Futuristic Mandala Illustration",
    imageUrl: "/prompts/futuristic-mandala-illustration.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @4WEB1"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-039",
    slug: "super-famicom-poster-style",
    title: "Super Famicom Poster Style",
    prompt: `Imagine what a poster would look like if the little devil character Lilim Lily appeared in a Super Famicom game. Design the poster in authentic 16-bit era Japanese game marketing style.`,
    originalPrompt: `小悪魔リリムリリィちゃんが　スーパーファミコンのゲームだったときのポスターを考えて`,
    category: "game",
    tags: ["poster", "design", "illustration", "gaming"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Super Famicom Poster Style",
    imageUrl: "/prompts/super-famicom-poster-style.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @lilimliliychan"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-040",
    slug: "browser-game-ad-creative-poster",
    title: "Browser Game Ad Creative Poster",
    prompt: `Please include the following text and create a 1:1 poster. Make it look like a high-quality finished product created by a professional advertising designer, suitable for book, course, or event announcements.

Ad Creative Production
Once you think of it, you can play it. AI × browser game creation is seriously fun. It seems difficult, but it's actually easy to start. Even without knowing code, you can make your first game.`,
    originalPrompt: `以下の文字を必ず入れて、1:1のポスターを作成してください。書籍・講座・イベント告知に使える、プロの広告デザイナーが作ったような高品質な仕上がりにしてください。

広告クリエイティブ制作
思いついたら、もう遊べる。 AI×ブラウザゲームづくりは、マジで楽しい。 むずかしそうで、実ははじめやすい。 コードがわからなくても、はじめの一本は作れる`,
    category: "game",
    tags: ["poster", "design", "illustration", "gaming"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Browser Game Ad Creative Poster",
    imageUrl: "/prompts/browser-game-ad-creative-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @llllegend0620"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-041",
    slug: "surreal-koi-nebula-illustration",
    title: "Surreal Koi Nebula Illustration",
    prompt: `A surrealist digital illustration style, shot from a low upward angle. The scene depicts a giant colorful koi fish swimming through dreamlike nebulae, surrounded by vibrant cosmic clouds and bubbles. In the center of the image stands a small human figure with their back to the viewer, calmly gazing up at the enormous koi above, while the koi looks down at the small person. The overall image presents a striking contrast in scale, with an ethereal and dreamlike atmosphere. Aspect ratio 9:16.`,
    originalPrompt: `一幅超现实主义数字插画风格，采用低角度仰拍视角。画面描绘了一条巨型彩色锦鲤遨游在梦幻般的星云中，四周环绕着色彩鲜艳的星云与气泡。画面中央还站着一个小人，背对观众，神情平静地仰望空中这条巨大的锦鲤，锦鲤头向下看着小人。整体画面呈现出强烈的大小对比，氛围空灵又梦幻。比例9:16`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Surreal Koi Nebula Illustration",
    imageUrl: "/prompts/surreal-koi-nebula-illustration.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @liyue_ai"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-042",
    slug: "ink-curve-guangzhou-aesthetics-poster",
    title: "Ink-Curve Guangzhou Aesthetics Poster",
    prompt: `Deep black background. A bold, powerful ink-brushstroke S-curve sweeps from one end of the image to the other, forming the visual backbone and narrative flow of the entire composition. Above the curve is a transparent-textured hwamei bird, its interior reflecting overlapping traditional architecture and blue-green light streams. Along the curve, Guangzhou landmarks and classical buildings are arranged in staggered sequence, with white cranes and a lake surface in the foreground and layered mountain ranges in the distance. The overall approach uses non-linear perspective, a cool-tone dominant palette with warm accent highlights, creating a sense of Eastern mythological grandeur with a touch of healing warmth.`,
    originalPrompt: `纯黑深邃底色，一条粗壮有力的墨色书法 S 型曲线自画面一端蜿蜒贯穿至另一端，构成整幅画面的视觉骨架与叙事动线。曲线上方是一只透明质感的画眉鸟，内部映射传统建筑叠影与蓝绿色光流；沿曲线错落分布广州地标与古典建筑序列，前景有白鹤与湖面，远景为层叠山峦。整体采用非线性透视、冷色调主导、暖色点缀，东方美学与现代意象交融，8K 超高清渲染，比例 9:16。`,
    category: "poster",
    tags: ["poster", "design", "illustration", "chinese-style"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Ink-Curve Guangzhou Aesthetics Poster",
    imageUrl: "/prompts/ink-curve-guangzhou-aesthetics-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @liyue_ai"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-043",
    slug: "guangdong-super-league-invitation-poster",
    title: "Guangdong Super League Invitation Poster",
    prompt: `Guangdong Provincial City Football Super League (Yue Super League) invitation poster design, 9:16 aspect ratio. S-shaped flowing composition with a glowing football and dynamic energy streams running through the image. Along the flow line, integrate Canton Tower, Shenzhen Ping An Finance Centre, Zhuhai Fisher Girl statue, Lingnan architecture, Foshan martial arts silhouettes, Zhongshan cultural symbols, Chaoshan Yingge dance, and Qingyuan mountain landscapes. Modern guochao premium poster style with Chinese red as the primary visual, cyan-blue as secondary, and gold highlights. Include complete text layout with event details.`,
    originalPrompt: `广东省城市足球超级联赛（粤超）邀请函海报设计，比例 9:16。S 型流动构图，以发光足球和动态能量流贯穿画面，沿动线融合广州塔、深圳平安金融中心、珠海渔女雕像、岭南建筑、佛山武术剪影、中山文化符号、潮汕英歌舞与清远山水。现代国潮高级海报风格，中国红主视觉，青蓝辅助，金色高光，带完整中文排版与电影级光影。`,
    category: "poster",
    tags: ["poster", "design", "illustration", "chinese-style"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Guangdong Super League Invitation Poster",
    imageUrl: "/prompts/guangdong-super-league-invitation-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @liyue_ai"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-044",
    slug: "spring-2026-guangzhou-promo-poster",
    title: "Spring 2026 Guangzhou Promo Poster",
    prompt: `A festive yet elegant 2026 Guangzhou city promotional poster, 9:16 vertical format, double exposure, S-shaped flowing composition. Pure white textured background, lower right features a miniature figure in traditional attire waving a long red silk ribbon that transforms into mountain ranges and rivers, with a Guangzhou panoramic hand-drawn illustration overlaid inside — Canton Tower, Zhujiang New Town, Pearl River, cruise ships, ancient architecture, and Baiyun Mountain. Lower left typeset with "SPRING 2026" and vertical slogan "Thousand-Year Trade Capital, Charming Guangzhou." Ethereal clouds, rich colors, complex structure with generous white space keeping it fresh and refined.`,
    originalPrompt: `一张充满新春喜庆但高雅的 2026 广州城市宣传海报，9:16 竖版，双重曝光，S 型流动构图。纯白纹理背景，右下角微缩传统服饰人物挥舞长红绸，红绸变形成山脉河流，内部叠加广州全景：广州塔、珠江新城、珠江、游轮、古建筑与白云山。左下角排版 “SPRING 2026” 与竖排 “千年商都 魅力广州”。`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Spring 2026 Guangzhou Promo Poster",
    imageUrl: "/prompts/spring-2026-guangzhou-promo-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @grok"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-045",
    slug: "epic-silhouette-world-poster",
    title: "Epic Silhouette World Poster",
    prompt: `A collector's edition epic poster where a complete worldview and classic scenes grow from within a character's side-profile silhouette. The overall style leans toward cinematic poster meets dreamlike watercolor illustration — quiet, grand, sacred, and nostalgic, with paper grain texture, light mist effects, dry-brush white streaks, and sophisticated use of white space.`,
    originalPrompt: `收藏版史诗海报，人物侧脸剪影中生长出完整世界观与经典场景。整体偏电影海报加梦幻水彩插画风，安静、宏大、神圣、怀旧，带纸张颗粒、轻雾感、飞白刷痕与高级留白。`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Epic Silhouette World Poster",
    imageUrl: "/prompts/epic-silhouette-world-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Ghhhh3owi"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-046",
    slug: "spring-guangzhou-city-poster",
    title: "Spring Guangzhou City Poster",
    prompt: `A festive yet elegantly refined 2026 city promotional poster. Double exposure technique with an S-shaped flowing composition. On the pure white textured background's lower right, a miniature figure in traditional Chinese attire waves a long red silk ribbon. The silk dances in the air, showcasing its smooth texture, and as it floats toward the upper left, it magically transforms into a magnificent mountain range and river. Within this "river," a hand-drawn panoramic illustration of Guangzhou city is overlaid in guochao style — the scenery stretches as far as the eye can see, grand and awe-inspiring. Guangzhou landmarks: Canton Tower, Zhujiang New Town skyline, Pearl River, ancient city architecture, cruise ships, and Baiyun Mountain. Clouds and mist swirl ethereally, colors are rich, structure is complex and detail-rich, yet generous white space keeps it fresh. Lower left: "SPRING 2026" and vertical promotional slogan. Beautiful, elegant typography. Aspect ratio 9:16.`,
    originalPrompt: `一张充满新春喜庆氛围但不失高雅格调的 2026 城市宣传海报。
双重曝光，构图延续了S型的流动感；
在纯白的纹理背景右下角，一个身穿中国传统服饰的微缩人物正在挥舞着一条长长的红色丝绸舞带，这条红绸在空中舞动，不仅展现出丝绸的柔顺质感，更在向左上方飘动的过程中，奇幻地变形成了一条壮丽的山脉河流。
在这条“河流”中，叠加了一个有山有海河的广州城市手绘图，国潮，景色尽在眼底，壮阔雄伟，令人震撼。
广州的地标建筑(广州塔，珠江新城建筑群，珠江, 广州城里古建筑，游轮，白云山）。
云雾环绕，仙气缥缈，色彩丰富，结构复杂，细节丰富，但因为大面积的留白，画面依然显得清新脱俗，左下角排版着“SPRING 2026”和竖排的宣传语，整体寓意“千年商都，魅力广州”。
文字排版优美，大方，字迹清晰完整，尺寸9:16。`,
    category: "poster",
    tags: ["poster", "design", "illustration", "chinese-style"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Spring Guangzhou City Poster",
    imageUrl: "/prompts/spring-guangzhou-city-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @alanlovelq"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-047",
    slug: "science-encyclopedia-vertical-poster",
    title: "Science Encyclopedia Vertical Poster",
    prompt: `Generate a high-quality vertical science popularization encyclopedia image based on [Theme].`,
    category: "infographic",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Science Encyclopedia Vertical Poster",
    imageUrl: "/prompts/science-encyclopedia-vertical-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @pfanis"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-048",
    slug: "journey-to-the-west-chinese-comic",
    title: "Journey to the West Chinese Comic",
    prompt: `Draw the "Havoc in Heaven" scene in the style of Chinese lianhuanhua (sequential picture books / "little people's books").`,
    originalPrompt: `以中国连环画（小人书）的风格帮我绘制大闹天空`,
    category: "poster",
    tags: ["poster", "design", "illustration", "chinese-style"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Journey to the West Chinese Comic",
    imageUrl: "/prompts/journey-to-the-west-chinese-comic.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @overseas58"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-049",
    slug: "character-relationship-map-poster",
    title: "Character Relationship Map Poster",
    prompt: `Generate a highly designed character relationship map poster based on [TOPIC].`,
    originalPrompt: `请根据【主题】生成一张高设计感的人物关系图海报。`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Character Relationship Map Poster",
    imageUrl: "/prompts/character-relationship-map-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @MrLarus"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-050",
    slug: "new-chinese-ink-landscape-poster",
    title: "New Chinese Ink Landscape Poster",
    prompt: `New Chinese-style ink wash landscape poster, vertical 9:16 composition, Eastern minimalist aesthetic style, generous use of white space, theme: "Spring Mist, One Red Leaf".`,
    originalPrompt: `新中式水墨山水海报，竖版9:16构图，东方极简美学风格，大面积留白，主题是春岚一叶红。`,
    category: "poster",
    tags: ["poster", "design", "illustration", "chinese-style"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "New Chinese Ink Landscape Poster",
    imageUrl: "/prompts/new-chinese-ink-landscape-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @liyue_ai"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-051",
    slug: "ai-builder-doodle-sketch",
    title: "AI Builder Doodle Sketch",
    prompt: `Depict [a brilliant AI builder] in a doodle sketch style.`,
    originalPrompt: `以涂鸦速写风表现【一个厉害的AI builder】。`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "AI Builder Doodle Sketch",
    imageUrl: "/prompts/ai-builder-doodle-sketch.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @opc_8838"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-052",
    slug: "character-visual-vertical-poster",
    title: "Character Visual Vertical Poster",
    prompt: `"Divine Layer District 37, Special Grade Executor, Divine Shaman Sabbat" — Create a visual image that matches this character name and worldview, designed as a vertical poster by a professional designer.`,
    originalPrompt: `『神層37区 特級執行官 神巫サバト』この名称のキャラクターと世界観に合ったビジュアルイメージを、プロのデザイナーとして縦長のポスターイメージとして制作して`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Character Visual Vertical Poster",
    imageUrl: "/prompts/character-visual-vertical-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @tebasaki3D"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-053",
    slug: "science-encyclopedia-infographic",
    title: "Science Encyclopedia Infographic",
    prompt: `Generate a high-quality vertical "Science Encyclopedia Infographic" based on [TOPIC].

This is not an ordinary poster or simple illustration, but an image that combines the feel of a field guide, encyclopedia, information architecture, and collectible quality — a modular science infographic. The overall style references premium natural history field guides, modern encyclopedia pages, lifestyle knowledge cards, and high-engagement social media infographics.

Include in the image: a clear and beautiful main visual for the topic, several enlarged detail close-ups of key features, multiple rounded-corner modular information sections, clear title hierarchy with highlighted labels, concise but rich encyclopedia content, visual scoring, key point summaries, or Top 5 modules.

Content sections should auto-adapt to the topic, prioritizing from: basic profile, classification info, appearance features, habits/ecology, formation mechanism/structural composition, growth or usage conditions, care or maintenance tips, risks and precautions, suitable audiences or use cases, pros and cons comparison, quick scorecard.

Visual requirements: light clean background, soft color palette, subtle shadows, refined small icons, rounded info boxes, neat typography, high information density without crowding, good reading experience. Must look like a real publishable, readable, collectible, serializable science encyclopedia card — not a commercial promotional poster. Emphasize "knowledge organization + modular information + field guide-style display".`,
    originalPrompt: `请根据【主题】生成一张高质量竖版「科普百科图」。 

这张图不是普通海报,也不是单纯插画,而是一张兼具“图鉴感、百科感、信息结构感、收藏感”的模块化科普信息图。整体风格参考高级博物图鉴、现代百科书页、生活方式知识卡和社交媒体高传播信息图的结合。

请让画面包含:
- 一个清晰漂亮的主题主视觉
- 若干局部特征放大细节
- 多个圆角模块化信息分区
- 清楚的标题层级与重点标签
- 简洁但丰富的百科内容
- 可视化评分、要点总结或Top 5模块

内容栏目请根据主题自动适配,优先从这些方向中选择并合理组合:
基础档案、分类信息、外观特征、习性/生态、形成机制/结构组成、生长或使用条件、养护或维护建议、风险与注意事项、适合人群或适用场景、优缺点对比、快速评分卡。

视觉要求:
浅色干净背景,柔和配色,轻阴影,精致小图标,圆角信息框,整洁排版,信息密度高但不拥挤,阅读体验好。整体必须像真正可以发布、阅读、收藏、系列化生产的科普百科卡,而不是广告图。

请不要做成普通商业宣传海报。要突出“知识整理 + 模块信息 + 图鉴式展示”的特征。`,
    category: "infographic",
    tags: ["poster", "design", "illustration", "commercial"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Science Encyclopedia Infographic",
    imageUrl: "/prompts/science-encyclopedia-infographic.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @MrLarus"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-054",
    slug: "fictional-anime-movie-poster",
    title: "Fictional Anime Movie Poster",
    prompt: `Create a poster for a fictional anime movie using GPT Image 2.`,
    originalPrompt: `架空のアニメ映画のポスターをGPT image2で作成。`,
    category: "poster",
    tags: ["poster", "design", "illustration", "japanese"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Fictional Anime Movie Poster",
    imageUrl: "/prompts/fictional-anime-movie-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @seiiiiiiiiiiru"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-055",
    slug: "product-ad-redesign",
    title: "Product Ad Redesign",
    prompt: `Redesign this product advertisement from a professional designer's perspective. Create a refined design that matches current trends and target audience.`,
    originalPrompt: `この商品広告をプロのデザイナー目線でリデザインして。
今のトレンド、ターゲットに合わせた洗練されたデザインで。`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Product Ad Redesign",
    imageUrl: "/prompts/product-ad-redesign.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @genel_ai"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-056",
    slug: "dark-fantasy-guangzhou-city-poster",
    title: "Dark-Fantasy Guangzhou City Poster",
    prompt: `Flat illustration, Eastern fantasy-style premium city poster design, vertical 9:16 composition. Overall diagonal + S-shaped flowing composition extending from lower left to upper right. The background transitions from deep black at the top to intense dark red at the bottom, creating strong warm-cool contrast and spatial depth, with subtle stardust and grain texture. A golden flowing energy line winds through the center like flames, rising from the bottom upward with fluid texture.

Within the golden flow, Guangzhou city landmark buildings emerge layer by layer: Canton Tower as the visual core with prominent proportions, surrounded by Zhujiang New Town skyscrapers, Liede Bridge, and modern and Lingnan architectural elements. Buildings use "fine line drawing + golden glowing blocks" rendering with clear outlines and rich details, appearing to float in the void under golden halos, creating surreal spatial layers with slight fog in the distance.

At the bottom is an Eastern white-haired female figure with flowing hair like smoke and mist, naturally merging with the golden flow. Her hair is semi-transparent with gradient light effects, her pose is graceful, eyes gently closed, expression serene, cradling a bouquet of colorful flowers with sparkle particles and star effects among the petals, symbolizing the spiritual connection between person and city energy.

Light and shadow concentrate on the golden flow lines, buildings, and figure outlines, creating strong contrast and visual focus. The overall atmosphere is grand, mysterious, with Eastern mythological ambiance and a touch of healing warmth. Colors: black and dark red as base, highlighted flowing gold as primary visual emphasis with rich light-dark layers, accented by small areas of highly saturated bouquet colors. Refined and restrained overall.

Text integrated with the image: centered Song-style large characters "Guangzhou · China" at top, smaller "2026/04/20" below, then "LIYUE." Text in pale gold or soft warm white, unified with overall lighting. High-quality details, cinematic lighting, volumetric light and rich particle details, clean image without noise, ultra-HD 8K resolution, commercial poster quality.`,
    originalPrompt: `平面插画,东方幻想风格高端城市海报设计,竖版9:16构图,整体采用对角线+S型流动构图,从左下向右上延展,画面以深邃黑色为背景,自上而下渐变至浓烈暗红色,形成强烈冷暖对比与空间纵深,背景带微弱星尘与颗粒质感。画面中央一条金色流动能量线条如火焰般蜿蜒贯穿,自底部向上延伸,具有流体质感、粒子光效与渐变高光,局部带细微能量碎屑与体积光。

金色流光中逐层浮现广州城市地标建筑群:广州塔为视觉核心,比例突出,周围融合珠江新城高楼群、猎德大桥及现代与岭南建筑元素,建筑采用“精细线描 + 金色发光体块”表现,轮廓清晰、细节丰富,在金色光晕映衬下仿佛悬浮于虚空,形成超现实空间层次,远景轻微雾化增强纵深感。

画面底部为一位东方白发女性形象,长发飘逸,如烟似雾,与金色流光自然衔接并逐渐融合,发丝半透明带渐变光感,姿态柔美,双目微闭,神情宁静,怀抱一束多彩鲜花,花间点缀微光粒子与星点效果,象征人与城市能量的精神连接,人物细节适度简化以突出整体设计感。

光影集中于金色流线、建筑与人物轮廓,形成强烈明暗对比与视觉聚焦,整体氛围宏大、神秘、具有东方神话意境且略带治愈感。色彩以黑与暗红为基底,高亮鎏金为主视觉强调,金色具备丰富明暗层次,辅以小面积高饱和花束色彩点缀,整体高级克制。

页面文字与画面融合排版:顶部居中宋体大字“广州·中国”,下方小字“2026/04/20”,再下方小字“LIYUE”,文字采用淡金色或柔和暖白色,与整体光影统一。高品质细节,电影级光影表现,体积光与粒子细节丰富,画面干净无噪点,超高清8K分辨率,商业级海报质感。`,
    category: "poster",
    tags: ["poster", "design", "illustration", "chinese-style"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Dark-Fantasy Guangzhou City Poster",
    imageUrl: "/prompts/dark-fantasy-guangzhou-city-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @liyue_ai"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-057",
    slug: "science-fiction-movie-poster",
    title: "Science Fiction Movie Poster",
    prompt: `Create a Science fiction movie poster`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Science Fiction Movie Poster",
    imageUrl: "/prompts/science-fiction-movie-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @underwoodxie96"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-058",
    slug: "refreshing-summer-udon-ad",
    title: "Refreshing Summer Udon Ad",
    prompt: `In this season when it's getting a bit hot, I want to feel refreshed and cool, to strongly experience that sense of freshness and juiciness. The refreshing sensation of putting cold udon noodles, eggplant, and dipping sauce in your mouth — I want to feel that even more intensely.`,
    originalPrompt: `少し暑くなってきた今の時期に、さわやかにさっぱりしたい、みずみずしさ、みたいなところをもっと強く感じたい。冷たいうどんやナス、つゆを口に含んだ時の爽快感、みたいなものをもっと感じるように`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Refreshing Summer Udon Ad",
    imageUrl: "/prompts/refreshing-summer-udon-ad.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @genel_ai"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-059",
    slug: "handwritten-medical-prescription-sheet",
    title: "Handwritten Medical Prescription Sheet",
    prompt: `Generate a handwritten Chinese/Western medical prescription sheet.`,
    originalPrompt: `生成一张手写中/西医药方图`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Handwritten Medical Prescription Sheet",
    imageUrl: "/prompts/handwritten-medical-prescription-sheet.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @MrLarus"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-060",
    slug: "silicon-valley-2026-promo-poster",
    title: "Silicon Valley 2026 Promo Poster",
    prompt: `A refined 2026 Silicon Valley city promotional poster with a futuristic yet elegant atmosphere.

Double exposure composition, preserving an S-shaped sense of flowing movement. On a pure white textured background, in the lower-right corner, a miniature figure dressed in sleek modern techwear is releasing a long ribbon of luminous silver-blue light. The ribbon flows gracefully through the air, showing a soft silk-like texture, and as it drifts toward the upper-left, it magically transforms into a grand landscape of rolling hills, coastline, data streams, and illuminated urban terrain.

Within this flowing “river of light,” overlay a hand-drawn panoramic map of Silicon Valley, blending technology, nature, innovation, and California sunlight. The scene feels visionary, expansive, sophisticated, and inspiring.

Include iconic Silicon Valley and Bay Area elements: Stanford University arches, Apple Park, Google campus-inspired buildings, Meta-like glass offices, Tesla-style innovation imagery, venture capital offices on Sand Hill Road, Palo Alto tree-lined streets, San Jose skyline, the Santa Cruz Mountains, San Francisco Bay, highways, autonomous vehicles, startup labs, semiconductor patterns, AI data centers, and subtle circuit-board textures.

Surrounded by soft mist, golden California light, floating clouds, and delicate digital particles. Rich colors, complex structure, highly detailed, grand and breathtaking, yet still fresh and minimal because of the large areas of white space.

In the lower-left corner, elegant typography reads “SILICON VALLEY 2026” with a vertical promotional slogan: “Where Ideas Shape Tomorrow.” Beautiful editorial layout, graceful spacing, clear and complete lettering, premium city branding poster, cinematic lighting, sophisticated details, 9:16 aspect ratio.`,
    category: "poster",
    tags: ["poster", "design", "illustration", "cinematic", "fashion", "sci-fi"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Silicon Valley 2026 Promo Poster",
    imageUrl: "/prompts/silicon-valley-2026-promo-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @carsonyungos"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-061",
    slug: "japanese-supermarket-sale-flyer",
    title: "Japanese Supermarket Sale Flyer",
    prompt: `A lively and attractive supermarket flyer insert image. At the top, large text reading "SPECIAL SALE" with this week's dates. Colorful product photos (vegetables, fruits, beef, fresh fish), red-bordered price tags, eye-catching phrases like "Super Deal Items" and "Budget-Friendly Savings"...`,
    originalPrompt: `『賑やかで魅力的なスーパーマーケットの折り込みチラシの画像。上部には「特売」の大きな文字と今週の日付。カラフルな商品写真(野菜・果物・牛肉・鮮魚)、赤枠の価格タグ、「超目玉商品」「家計応援」のキャッチ...』`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Japanese Supermarket Sale Flyer",
    imageUrl: "/prompts/japanese-supermarket-sale-flyer.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @weel_corp"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-062",
    slug: "dark-epic-concept-poster",
    title: "Dark Epic Concept Poster",
    prompt: `Automatically generate a top-tier dark epic concept poster / cinematic infographic poster centered around [TOPIC].

The only variable to input is:
[TOPIC]: ___Trump's Contemplation____

Everything else beyond [TOPIC] is automatically adapted by AI, including but not limited to:
- Core subject (auto-determine whether a person, guardian, warrior, product, artifact, statue, abstract symbol, or other main visual object is more appropriate)
- Central support structure (auto-determine whether a throne, stone pedestal, altar, mechanical base, ruins, elevated platform, or other support is more fitting)
- Environmental space (auto-determine whether a cave, temple, ruins, abyss, underground palace, secret chamber, or other enclosed epic space works best)
- Upper opening and light source form (auto-determine whether moonlight, divine light, energy beam, judgment light, holy light, or other single intense light is more fitting)
- Symbolic elements (auto-determine whether skulls, emblems, broken steles, heraldic crests, runes, energy rings, divine symbols, etc. are more appropriate)
- Color system
- Material combinations
- Title, subtitle, supporting copy
- Typography and overall narrative temperament

[Overall Style]
High-budget 1990s Hollywood epic blockbuster poster aesthetic, blending cinematic matte painting, hyper-realistic photographic texture, extreme chiaroscuro contrast, weighty spatial narrative, dark heroism, and ritualistic composition. The overall result must look like an actual movie key art poster, not a generic illustration or e-commerce graphic.

[Core Structure Lock]
The entire poster must retain the following structural DNA:
1. A massive, overwhelmingly oppressive dark enclosed space
2. A powerful beam of volumetric light cutting diagonally from above, serving as the primary visual hierarchy
3. The core subject and its support structure positioned center-right or at the terminus of the light beam
4. The bottom-left corner serving as a high-density title and information anchor
5. Generous pure-black or near-black negative space around all edges, creating a cinematic breathing zone

[Auto-Adaptation Rules]
AI must automatically derive the most suitable visual system based on [TOPIC]:
- If [TOPIC] leans toward dark hero, vengeance, justice, solitude, or fate, auto-bias toward stone throne, solitary lofty figure, cool-toned divine light, ruins or cave-like space
- If [TOPIC] leans toward mystery, specters, stealth, phantoms, or nocturnal themes, auto-bias toward moonlight, mist, cool-blue volumetric light, abyss-style dark space
- If [TOPIC] leans toward power, dominion, kingship, or order, auto-enhance the expression of throne / altar / crown-like symbol / ritual space
- If [TOPIC] leans toward technology, AI, future, or machinery, auto-replace the throne and space with mechanical divine seat, energy pedestal, metal cavern, industrial temple, and other futuristic forms
- If [TOPIC] leans toward product, brand, or artifact, auto-replace the core subject with the most fitting hero object while preserving the epic composition where it is dramatically spotlit as if under divine judgment

[Canvas and Color System]
- The background base layer must be an extremely deep, all-consuming dark space
- The primary environmental color is auto-determined by AI based on [TOPIC], but the overall palette must be restrained and predominantly dark
- Colors in the highlight zone must be highly concentrated, serving only the volumetric light and subject highlights
- Theme color / accent color may only be concentrated on the main visual core; it must not flood the entire image
- A clear hierarchical order of "dark base tone + single main light + minimal theme accent color" must be established

[Composition and Visual Gravity]
- Employ strong diagonal tension and visual guidance converging toward the center
- Visual gravity falls forcefully from the upper light source, ultimately pressing down upon the core subject
- The subject must be positioned as if illuminated by fate, judgment, divinity, or power
- Edges must naturally dissolve into darkness; no meaningless background filler is allowed
- All elements must serve the single primary narrative core

[Materials and Lighting]
- No outlines, no flat strokes
- Rely entirely on volumetric light, shadow carving, reflections, highlights, fog, dust, wet rock, or other realistic materials to construct the image
- Materials must form clear contrasts, for example:
  Rough stone / cold hard metal / supple fabric / ancient stone carvings / wet surfaces / dust-fog light columns
- The light beam must exhibit a strong Tyndall effect—realistic, weighty, with perceptible volumetric density

[Typography System]
- Overall 80% visual, 20% text
- AI auto-generates the main title, subtitle, and bottom information block based on [TOPIC]
- The main title should be as concise, powerful, and cinematic-poster-feeling as possible
- If the topic is better suited to Chinese, prioritize Chinese; if better suited to English, auto-use English; bilingual is also acceptable, but must be unified
- The main title may be arranged vertically along the light beam, as if formed by the light itself
- Set up a high-density information module in the bottom-left corner, including subtitle, small-print information, movie credits-style placeholder text, or brand description
- Text must be sharp, clean, and genuinely embedded in the environment; it must not float cheaply

[Module Structure — Must Strictly Maintain 3 Blocks]
[MOD 1: TOP-TO-CENTER BEAM]
A massive volumetric light column cutting diagonally down from the top opening, serving as the primary visual channel and carrying the main title or main visual text.

[MOD 2: CENTER-RIGHT CORE]
The core subject and support structure at the terminus of the light beam, forming the power center / destiny center / narrative center of the entire poster.

[MOD 3: BOTTOM-LEFT TEXT]
A high-density typography zone in the bottom-left negative space, containing subtitle, descriptive text, credits-style information block, brand information, or event information.

[Author Signature]
Naturally include the author signature in the bottom corner:
@a9quant
The signature should be small yet clear, refined, restrained, and premium—never stealing the spotlight—like the signature on an official movie concept poster or fine art piece.

[Output Requirements]
Output as a single unified-composition poster.
All visual systems must be internally consistent with no style contamination.
The image must possess: a sense of darkness, epic grandeur, oppression, ritual, fate, and cinematic completeness.
Maximum detail density, ultra-high definition, cinematic grade, print grade, high-end finished quality.`,
    originalPrompt: `围绕【主题】自动生成一张顶级暗黑史诗概念海报 / 电影感信息图海报。

唯一需要输入的变量只有:
【主题】:___特朗普的思考____ 

除【主题】之外,其余全部由 AI 自动适配完成,包括但不限于:
- 核心主体(自动判断更适合人物、守护者、战士、产品、器物、雕像、抽象象征或其他主视觉对象)
- 中央承载结构(自动判断更适合王座、石座、祭坛、机械基座、遗迹、高台或其他支撑体)
- 环境空间(自动判断更适合洞穴、神殿、废墟、深渊、地下宫殿、密室或其他封闭史诗空间)
- 上方开口与光源形式(自动判断更适合月光、神光、能量束、审判之光、圣光或其他单一强光)
- 象征元素(自动判断更适合骷髅、徽记、残碑、纹章、符文、能量环、神性符号等)
- 色彩体系
- 材质组合
- 标题、副标题、辅助文案
- 排版与整体叙事气质

【总风格】
高预算 90 年代好莱坞史诗大片海报气质,融合 cinematic matte painting、超写实摄影质感、极强明暗对比、厚重空间叙事、暗黑英雄主义与仪式感构图。整体必须像一张真正的电影主海报,而不是普通插画或电商图。

【核心结构锁定】
整张海报必须保留以下结构基因:
1. 一个巨大、压迫感极强的黑暗封闭空间
2. 一束从上方斜向切入的强烈体积光,作为画面的第一视觉秩序
3. 中央偏右或光束终点位置的核心主体与承载结构
4. 左下角作为高密度标题与信息锚点
5. 四周保留大量纯黑或近黑负空间,形成电影感呼吸区

【自动适配规则】
AI 必须依据【主题】自动推导最适合的视觉系统:
- 如果【主题】偏暗黑英雄、复仇、正义、孤独、宿命,则自动偏向石质王座、孤高人物、冷色神光、废墟或洞穴感空间
- 如果【主题】偏神秘、幽灵、潜行、幻影、夜行,则自动偏向月光、迷雾、冷蓝色体积光、深渊式黑暗空间
- 如果【主题】偏权力、统治、王者、秩序,则自动强化 throne / altar / crown-like symbol / ritual space 的表达
- 如果【主题】偏科技、AI、未来、机械,则自动将王座和空间替换为机械神座、能量基座、金属洞窟、工业神殿等未来化形态
- 如果【主题】偏产品、品牌、器物,则自动把核心主体替换为最合适的 hero object,并保留被神光审判式凸显的史诗构图

【画布与色彩系统】
- 背景底层必须是极深、近乎吞噬一切的黑暗空间
- 主环境色由 AI 根据【主题】自动决定,但整体必须克制,以暗色为主
- 强光区域色彩必须高度集中,只服务于体积光与主体高光
- 主题色 / 强调色只能集中用于主视觉核心,不允许全画面泛滥
- 必须建立明确的“黑暗底色 + 单一主光 + 少量主题强调色”的层级秩序

【构图与视觉重力】
- 采用强烈的斜向张力与向中心汇聚的视觉引导
- 视觉重力从上方光源强势落下,最终压在核心主体之上
- 主体必须处于被命运、审判、神性或权力照中的位置
- 边缘必须自然融入黑暗,不能出现无意义背景填充
- 所有元素必须服务于唯一的主叙事核心

【材质与光影】
- 不使用轮廓线,不使用平面化描边
- 完全依赖体积光、阴影切割、反射、高光、雾气、粉尘、湿润岩石或其他真实材质来建构画面
- 材质必须形成明显对比,例如:
  粗粝岩石 / 冷硬金属 / 柔韧织物 / 古老石雕 / 湿润表面 / 尘雾光柱
- 光束必须具有强烈 Tyndall effect,真实、厚重、可感知体积密度

【排版系统】
- 整体 80% 视觉,20% 文字
- AI 根据【主题】自动生成主标题、副标题和底部信息块
- 主标题应尽量简洁、有气势、有电影海报感
- 若主题更适合中文,则优先中文;若更适合英文,则自动英文;也可双语,但必须统一
- 主标题可沿光束垂直排布,仿佛由光本身构成
- 左下角设置一个高密度信息模块,包括副标题、小字信息、电影 credits 风格占位文字或品牌说明
- 文字必须锐利、干净、真实嵌入环境,不得廉价漂浮

【模块结构 —— 必须严格保持 3 块】
[MOD 1: TOP-TO-CENTER BEAM]
从顶部开口斜向切下的巨大体积光柱,作为第一视觉通道,并承载主标题或主视觉文字。

[MOD 2: CENTER-RIGHT CORE]
位于光束终点的核心主体与承载结构,形成整张海报的权力中心 / 命运中心 / 叙事中心。

[MOD 3: BOTTOM-LEFT TEXT]
位于左下角负空间中的高密度排版区,包含副标题、说明文字、credits 风格信息块、品牌信息或活动信息。

【作者署名】
在底部角落自然加入作者署名:
@a9quant
署名要小而清晰,精致、克制、高级,不喧宾夺主,像正式电影概念海报或艺术作品落款。

【输出要求】
输出为单张统一构图海报。
所有视觉系统必须内部一致,不能有风格污染。
画面必须具备:暗黑感、史诗感、压迫感、仪式感、命运感、电影完成度。
最大细节密度,超清,电影级,印刷级,高端成片质感。`,
    category: "poster",
    tags: ["poster", "design", "illustration", "cinematic"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Dark Epic Concept Poster",
    imageUrl: "/prompts/dark-epic-concept-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @A9Quant"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-063",
    slug: "pilates-studio-ad-poster",
    title: "Pilates Studio Ad Poster",
    prompt: `I want to create an advertising image for a Pilates studio. The text should use wording that attracts users to sign up, and the image should show a woman actually doing Pilates.`,
    originalPrompt: `ピラティス教室の広告画像を作成したい テキストはよりユーザーが登録をするのに惹かれるような文言にし、画像内には女性がピラティスを実際に行っている様子を映して`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Pilates Studio Ad Poster",
    imageUrl: "/prompts/pilates-studio-ad-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @ck_igarashi"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-064",
    slug: "6-block-fashion-campaign-prompt-formula",
    title: "6-Block Fashion Campaign Prompt Formula",
    prompt: `Old money Hamptons editorial, tall blonde woman late 20s, serene elegant expression, wearing cream cashmere cable sweater, pleated beige tennis skirt, pearl earrings, Hermès silk scarf, leather flats, Slim Aarons photography style, medium format film photography, sitting on a white wooden porch of a Cape Cod house, golden hour light, ocean in the background`,
    category: "poster",
    tags: ["poster", "design", "illustration", "cinematic", "fashion"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "6-Block Fashion Campaign Prompt Formula",
    imageUrl: "/prompts/6-block-fashion-campaign-prompt-formula.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @anacoding"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-065",
    slug: "sony-a7-exploded-view-breakdown-prompt",
    title: "Sony A7 Exploded View Breakdown Prompt",
    prompt: `Descomposición detallada de una cámara de la marca Sony modelo A7 indicando todas sus piezas y con sus nombres.`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Sony A7 Exploded View Breakdown Prompt",
    imageUrl: "/prompts/sony-a7-exploded-view-breakdown-prompt.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @iaPulse_"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-066",
    slug: "1900-istiklal-street-panorama-prompt",
    title: "1900 Istiklal Street Panorama Prompt",
    prompt: `360 equirectangular image of Istiklal Street, Istanbul in 1900`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "1900 Istiklal Street Panorama Prompt",
    imageUrl: "/prompts/1900-istiklal-street-panorama-prompt.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @ai_gezgini"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-067",
    slug: "theme-science-encyclopedia-card",
    title: "Theme Science Encyclopedia Card",
    prompt: `Generate a high-quality vertical "Science Encyclopedia Infographic" based on [TOPIC].

This is not an ordinary poster or simple illustration, but an image combining field guide aesthetics, encyclopedia feel, information architecture, and collectible quality — a modular science infographic. Style references premium natural history guides, modern encyclopedia pages, lifestyle knowledge cards, and high-engagement social media infographics.

Include: a clear main visual, enlarged detail close-ups, rounded-corner modular info sections, clear title hierarchy with labels, concise encyclopedia content, visual scoring or Top 5 modules.

Content auto-adapts to topic from: basic profile, classification, appearance, habits/ecology, formation/structure, growth conditions, care tips, risks, suitable audiences, pros/cons, quick scorecard.

Visual: light clean background, soft colors, subtle shadows, refined icons, rounded info boxes, neat typography, high density without crowding. Must look publishable, collectible, serializable — not a commercial poster. Emphasize knowledge organization + modular info + field guide display.`,
    originalPrompt: `请根据【主题】生成一张高质量竖版「科普百科图」。 

这张图不是普通海报,也不是单纯插画,而是一张兼具“图鉴感、百科感、信息结构感、收藏感”的模块化科普信息图。整体风格参考高级博物图鉴、现代百科书页、生活方式知识卡和社交媒体高传播信息图的结合。

请让画面包含:
- 一个清晰漂亮的主题主视觉
- 若干局部特征放大细节
- 多个圆角模块化信息分区
- 清楚的标题层级与重点标签
- 简洁但丰富的百科内容
- 可视化评分、要点总结或Top 5模块

内容栏目请根据主题自动适配,优先从这些方向中选择并合理组合:
基础档案、分类信息、外观特征、习性/生态、形成机制/结构组成、生长或使用条件、养护或维护建议、风险与注意事项、适合人群或适用场景、优缺点对比、快速评分卡。

视觉要求:
浅色干净背景,柔和配色,轻阴影,精致小图标,圆角信息框,整洁排版,信息密度高但不拥挤,阅读体验好。整体必须像真正可以发布、阅读、收藏、系列化生产的科普百科卡,而不是广告图。

请不要做成普通商业宣传海报。要突出“知识整理 + 模块信息 + 图鉴式展示”的特征。`,
    category: "infographic",
    tags: ["poster", "design", "illustration", "commercial"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Theme Science Encyclopedia Card",
    imageUrl: "/prompts/theme-science-encyclopedia-card.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @alanlovelq"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-068",
    slug: "chili-pork-cooking-flowchart",
    title: "Chili Pork Cooking Flowchart",
    prompt: `Create a detailed cooking process flowchart for Chili Pepper Stir-Fried Pork, in a realistic style, suitable for Xiaohongshu (Little Red Book) image-text proportions.`,
    originalPrompt: `帮我制作辣椒炒肉这道菜的详细制作流程图,真实风格,适用于小红书图文比例`,
    category: "infographic",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Chili Pork Cooking Flowchart",
    imageUrl: "/prompts/chili-pork-cooking-flowchart.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Kurt_Rousey466"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-069",
    slug: "cinematic-infographic-concept-poster",
    title: "Cinematic Infographic Concept Poster",
    prompt: `Automatically generate a top-tier concept poster / infographic-style cinematic poster centered around [TOPIC].

The only input variable is:
[TOPIC]: __Ranking of Emperors in Chinese History_

Require AI to automatically derive and uniformly design the following complete visual system based on this topic, without any additional specification from me:
- Core subject (automatically determine whether a figure, product, architecture, artifact, symbol, scene, or abstract imagery is most suitable)
- Bottom support structure
- Upper floating symbols or spiritual emblems
- Scene-wrapping elements
- Metaphor system
- Color hierarchy
- Material contrast
- Lighting logic
- Title, subtitle, supporting copy
- Brand feel and premium expression approach

The final image must be:
A stunning, precise, unified, cinematic-grade, ultra-high-detail concept key visual poster suitable for high-end printing.

[Overall Style]
Hyper-realistic 3D commercial CGI rendering, blending cinematic lighting, luxury visual language, futuristic concept design, and epic-level composition. The image must have a "single primary visual core" — it must not be cluttered, must not look like a collage, and must not resemble a generic e-commerce poster.

[Automatic Derivation Rules]
AI must automatically determine the most suitable options based on [TOPIC]:
1. Core visual metaphor
2. Subject type and pose
3. Support structure form
4. Floating element form
5. Scene shell and spatial atmosphere
6. Primary color, secondary color, accent color
7. Material combination
8. Typographic character and layout style

For example:
- If the topic leans toward power, order, capital, or dominion, automatically lean toward thrones, crowns, machinery, temples, red curtains, metal, power structures
- If the topic leans toward technology, AI, chips, or the future, automatically lean toward mechanical structures, energy cores, light beams, dark metals, holographic feel
- If the topic leans toward luxury goods, haute couture, scarcity, or collectibles, automatically lean toward jewelry, mirror-finish materials, black-and-gold palette, display pedestals, museum-style lighting
- If the topic leans toward characters, IPs, or personas, automatically use the figure as the primary visual core and automatically match the corresponding worldview and symbolic system
- If the topic leans toward cities, civilizations, epics, or destiny, automatically transform into grand narrative spatial structures and ceremonial scenes

[Composition Rules]
- Absolute premium feel
- Strong central order, overall unity
- Allow central-axis symmetry or near-central-axis epic-level composition
- Clear visual gravity, forming a distinct hierarchical cascade from top to bottom
- Clean, restrained, breathing negative space at the edges
- No meaningless decoration, no style contamination, no multiple systems clashing with each other

[Visual Quality]
- Ultra-high detail
- Clear volumetric lighting
- Realistic materials
- Natural reflections, refractions, shadows, fog, and depth of field
- Every element appears as if controlled by an industrial-grade visual director's aesthetic standards
- Overall quality reaching the level of a high-end brand campaign key visual / luxury invitation poster / conceptual editorial poster

[Typography System]
- Overall 90% visual, 10% text
- AI automatically generates the most fitting main title and subtitle based on [TOPIC]
- Title must be concise, sharp, and powerful
- Copy distributed within safe negative space, not overlapping the main subject
- If the topic suits Chinese, prioritize generating Chinese titles; if the topic better suits English, automatically generate English titles; a Chinese-English combination is also acceptable, but must maintain a unified premium feel
- Text must be as minimal and precise as possible, avoid piling up words

[Signature Requirement]
Naturally include the author's signature in the bottom corner of the image:
@a9quant
The signature should be small but clear, refined, and premium — not overpowering, like a formal author credit in a top-tier visual work.

[Output Requirements]
Output as a single unified-composition poster.
Automatically complete all visual decisions based on [TOPIC].
The image must possess a sense of epic grandeur, order, control, ceremony, and commercial completeness.
Maximum detail density, ultra-clear, cinematic-grade, print-grade, high-end finished quality.`,
    originalPrompt: `请围绕【主题】自动生成一张顶级概念海报 / 信息图式电影海报。

唯一输入变量只有:
【主题】:__中国历史上的皇帝排名_         

要求 AI 根据这个主题,自动推导并统一设计以下全部视觉系统,不需要我额外指定:
- 核心主体(可以自动判断更适合人物、产品、建筑、器物、符号、场景或抽象意象)
- 底部支撑结构
- 上方悬浮符号或精神象征
- 场景包裹元素
- 隐喻系统
- 色彩层级
- 材质对比
- 光影逻辑
- 标题、副标题、辅助文案
- 品牌感与高级感表达方式

最终画面必须是:
一张震撼、精密、统一、电影级、超高细节、可用于高端印刷的概念主视觉海报。

【总风格】
超写实 3D 商业 CGI 渲染,融合电影级布光、奢侈品视觉语言、未来感概念设计与史诗级构图。画面必须具有“唯一主视觉核心”,不能杂乱,不能像拼贴,不能像普通电商海报。

【自动推导规则】
AI 必须依据【主题】自动决定最合适的:
1. 核心视觉隐喻
2. 主体类型与姿态
3. 支撑结构形式
4. 悬浮元素形式
5. 场景外壳与空间氛围
6. 主色、辅色、强调色
7. 材质组合
8. 文字气质与版式风格

例如:
- 如果主题偏权力、秩序、资本、统治,则自动偏向王座、冠冕、机械、神殿、红幕、金属、权力结构
- 如果主题偏科技、AI、芯片、未来,则自动偏向机械结构、能量核心、光束、深色金属、全息感
- 如果主题偏奢侈品、高定、稀缺、收藏,则自动偏向珠宝、镜面材质、黑金体系、展台、博物馆式布光
- 如果主题偏人物、IP、角色,则自动以人物为主视觉核心,并自动匹配对应世界观与象征系统
- 如果主题偏城市、文明、史诗、命运,则自动转化为宏大叙事型空间结构与仪式感场景

【构图规则】
- 绝对高级感
- 强烈中心秩序,整体统一
- 允许中轴对称或接近中轴的史诗级构图
- 视觉重力明确,从上到下形成清晰的层级落点
- 边缘负空间干净、克制、有呼吸感
- 不允许无意义装饰,不允许风格污染,不允许多个系统互相打架

【视觉质量】
- 超高细节
- 体积光清晰
- 材质真实
- 反射、折射、阴影、雾气、景深自然
- 每个元素都像经过工业级视觉总监审美控制
- 整体达到高端品牌 campaign key visual / luxury invitation poster / conceptual editorial poster 水准

【排版系统】
- 整体为 90% 视觉,10% 文字
- AI 根据【主题】自动生成最匹配的主标题和副标题
- 标题必须简洁、锋利、有气势
- 文案分布在安全负空间内,不压主体
- 若主题适合中文,则优先生成中文标题;若主题更适合英文,则自动生成英文标题;也可中英结合,但必须统一高级
- 文字必须尽量少而准,不要堆字

【署名要求】
在画面底部角落自然加入作者署名:
@a9quant
署名要小,但清晰、精致、高级,不喧宾夺主,像顶级视觉作品中的正式作者落款。

【输出要求】
输出为单张统一构图海报。
自动根据【主题】完成全部视觉决策。
画面必须具备史诗感、秩序感、控制力、仪式感、商业完成度。
最大细节密度,超清,电影级,印刷级,高端成片质感。`,
    category: "poster",
    tags: ["poster", "design", "illustration", "chinese-style", "fashion"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Cinematic Infographic Concept Poster",
    imageUrl: "/prompts/cinematic-infographic-concept-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @A9Quant"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-070",
    slug: "a-full-body-outdoor-shot-captures-a-young-caucasian-woman-po",
    title: "A full-body outdoor shot captures a young Caucasian woman, possibly in her la...",
    prompt: `A full-body outdoor shot captures a young Caucasian woman, possibly in her late 20s, striding through a city crosswalk. She wears an oversized, matte chocolate-brown leather jacket paired with a free-flowing black skirt and sleek knee-high black boots, conveying a sense of high fashion street style. Her long, dark brown hair is wind-swept, complementing her poised and confident expression as she glances sideways. Behind her, a blurred urban backdrop features a yellow taxi and pedestrians, with buildings displaying varied architectural details in neutral tones. The scene utilizes soft ambient daylight filtering through light cloud cover, producing a muted, overcast lighting effect. The warm, earthy color palette consists of brown, black, and touches of beige. The image, likely from a high-resolution digital camera, presents a wide-angle view that maintains focus throughout, emphasizing a dynamic and fashionable feel.`,
    category: "poster",
    tags: ["poster", "design", "illustration", "fashion"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "A full-body outdoor shot captures a young Caucasian woman, possibly in her la...",
    imageUrl: "/prompts/a-full-body-outdoor-shot-captures-a-young-caucasian-woman-po.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @AIwithSarah_"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-071",
    slug: "a-professional-product-photography-shot-of-a-cold-sparkling",
    title: "A professional product photography shot of a cold sparkling water",
    prompt: `A professional product photography shot of a cold sparkling water
can placed upright in golden beach sand. The can is silver and teal,
covered in realistic water droplets condensation, with a pineapple
illustration and tropical branding. The can is slightly tilted,
planted in a small mound of fine golden sand with tiny white pebbles
and small green tropical leaves/grass scattered around the base.
Background features a bold split composition - bright sky-blue on
the left and vivid yellow on the right, with a large blurred real
pineapple placed behind the can on the right side. A blurred tropical
palm leaf drapes in from the upper left corner, adding depth and
framing. Macro-level water condensation droplets visible on the
can surface. Lighting is bright, vibrant, commercial studio lighting
with clean shadows. Shallow depth of field - can in sharp focus,
background softly blurred. Mood: summer, tropical, fresh, refreshing.
Commercial product photography, ultra-detailed, 8K.`,
    category: "poster",
    tags: ["poster", "design", "illustration", "commercial"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "A professional product photography shot of a cold sparkling water",
    imageUrl: "/prompts/a-professional-product-photography-shot-of-a-cold-sparkling.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @meng_dagg695"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-072",
    slug: "360-equirectangular-panorama-image",
    title: "360 Equirectangular Panorama Image",
    prompt: `Generate a 360-degree equirectangular projection image in 2:1 ratio.

Online 360° Panorama Viewer VR`,
    originalPrompt: `360度 equirectangular （正距円筒図法）画像を2:1で生成

Online 360° Panorama Viewer VR`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "360 Equirectangular Panorama Image",
    imageUrl: "/prompts/360-equirectangular-panorama-image.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @rs_elwood"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-073",
    slug: "soft-poetic-childrens-book-illustration-with-watercolor-and",
    title: "Soft poetic children's book illustration with watercolor and gouache textures...",
    prompt: `Soft poetic children's book illustration with watercolor and gouache textures.Clear gentle daylight with slightly brighter highlights.Muted pastel colors with soft blue and warm tones.Visible brush strokes and paper grain.Minimalist composition with large negative space.Calm, thoughtful, slightly open-ended atmosphere.

Child character (around 12 years old).Subtle visual metaphors like light, shadow, perspective, reflection.Hand-painted picture book style, not cartoon, not anime, not 3D.

Two children in calm conversation,soft connection forming.`,
    category: "poster",
    tags: ["poster", "design", "illustration", "japanese"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Soft poetic children's book illustration with watercolor and gouache textures...",
    imageUrl: "/prompts/soft-poetic-childrens-book-illustration-with-watercolor-and.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @dotey"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-074",
    slug: "aspect-ratio-916-vertical",
    title: "Aspect Ratio: 9:16 Vertical",
    prompt: `Aspect Ratio: 9:16 Vertical

【IDENTITY & REALISM (CRITICAL PRIORITY)】

The subject is an adult female whose facial features and bone structure must 100% perfectly match the provided FACE_REF image. Eye spacing, nose bridge, jawline, and cheekbone structure must be exact; no identity drift is allowed. Skin texture must be photorealistic, showing pores and fine details—do not over-smooth or apply an Instagram filter look.

【PHOTOGRAPHY & CINEMATOGRAPHY】

A high-end editorial fashion photograph with a cinematic quality, rivaling covers of Vogue, Harper’s Bazaar, or ELLE.

Lens & Focus: Use an 85mm lens (for medium shot) or 50mm/70mm (for full body) with a shallow depth of field. The subject's eyes must be perfectly sharp.

Lighting: Natural winter daylight supplemented by soft, professional fill light. Gold ornaments and precious stones should have realistic specular highlights without being blown out. Embroidery textures must be incredibly sharp and tactile.

Color Grading: Rich, cinematic colors. The red walls and the attire's main color must be distinct and clean, not muddy. The overall image should feel deep, textured, and expensive.

Composition: A clean magazine cover layout with deliberate negative space at the top or sides for typography. No torn paper or hand-drawn effects.

【SETTING: FORBIDDEN CITY WINTER】

The location is a red-walled long corridor in the Beijing Forbidden City.

Environment: Visible details include vermilion walls, red pillars, intricate carved windows, and painted wooden beams with strong perspective depth. The scene must be clean: no tourists, modern signs, or watermarks.

Weather Condition (Selected Randomly):

[If Snowfall selected]: Fine snowflakes are gently falling.

[If Post-Snow selected]: The air is crisp and clear, with remnant snow on the eaves and steps.

【WARDROBE: MING DYNASTY HEAVY INDUSTRY COUTURE】

The subject wears opulent, multi-layered Ming Dynasty ceremonial Hanfu. The aesthetic is gold-heavy, dense tassels, phoenix crown, large-area woven gold embroidery, complex layering, dignified and luxurious.

Structure: A visible, crisp white standing inner collar provides a clean boundary. Over this is a structured duijin ao (jacket) with wide sleeves, topped by a heavy xiapei/pibo (stole) structure held by a large central yajin ornament.

Fabric & Craft: The main fabric is real zhijin jin (woven gold brocade) with palpable fiber texture. The embroidery is heavy industry—using panjin goldwork, couched gold`,
    category: "poster",
    tags: ["poster", "design", "illustration", "cinematic", "fashion"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Aspect Ratio: 9:16 Vertical",
    imageUrl: "/prompts/aspect-ratio-916-vertical.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @GeekCatX"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-075",
    slug: "hangzhou-west-lake-travel-poster",
    title: "Hangzhou West Lake Travel Poster",
    prompt: `Generate a poster introducing Hangzhou's West Lake.`,
    originalPrompt: `帮我生成一个介绍杭州西湖的海报`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Hangzhou West Lake Travel Poster",
    imageUrl: "/prompts/hangzhou-west-lake-travel-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @BNBOKBt5"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-076",
    slug: "dongfang-bubai-wuxia-character-poster",
    title: "Dongfang Bubai Wuxia Character Poster",
    prompt: `Image 1: Movie character poster — Dongfang Bubai (Invincible East) in red robes drinking wine on a cliff at sunset, wuxia martial arts atmosphere.

Image 2: Dongfang Bubai with embroidery needles flying like projectiles, red-robed with long flowing hair standing on a cliff, Black Wood Cliff with a blood-red sunset.`,
    originalPrompt: `图片1：电影角色海报，东方不败红衣饮酒，悬崖落日，武侠意境

图片2：东方不败绣花针如飞，红衣长发立于悬崖，黑木崖夕阳如血`,
    category: "poster",
    tags: ["poster", "design", "illustration", "chinese-style"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Dongfang Bubai Wuxia Character Poster",
    imageUrl: "/prompts/dongfang-bubai-wuxia-character-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @songguoxiansen"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-077",
    slug: "a-chinese-odyssey-90s-hong-kong-poster",
    title: "A Chinese Odyssey 90s Hong Kong Poster",
    prompt: `Image 1: "A Chinese Odyssey" poster remade in 1990s Hong Kong film style — Joker (Zhizunbao) and Fairy Zixia kissing on the city wall, film grain texture.

Image 2: Durex mascot × Zhu Bajie (Pigsy), Bajie blushing shyly covering his face, tagline "Stay safe on the journey to the West".`,
    originalPrompt: `图片1：大话西游海报重制为90年代港片风格，至尊宝紫霞城墙拥吻，胶片颗粒

图片2：杜蕾斯吉祥物×猪八戒，八戒害羞脸红遮面，文案取经路上要安全`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "A Chinese Odyssey 90s Hong Kong Poster",
    imageUrl: "/prompts/a-chinese-odyssey-90s-hong-kong-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @songguoxiansen"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-078",
    slug: "journey-to-the-west-daughter-kingdom-poster",
    title: "Journey to the West Daughter Kingdom Poster",
    prompt: `Journey to the West — Kingdom of Women seduction poster. Six alluring ministers of the Women's Kingdom in the palace hot springs, misty and bewitchingly enchanting. Generate image.

Tested successfully on the morning of 4.23.`,
    originalPrompt: `西游记女儿国诱惑海报，六位艳丽的女儿国大臣在后宫温泉中，迷雾朦胧妖冶，生成图片

4.23早上测试成功`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Journey to the West Daughter Kingdom Poster",
    imageUrl: "/prompts/journey-to-the-west-daughter-kingdom-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @cj858cjsoul"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-079",
    slug: "royal-tramp-character-poster",
    title: "Royal Tramp Character Poster",
    prompt: `Generate a "The Deer and the Cauldron" (Lu Ding Ji) poster showing Wei Xiaobao with his wife XXX, faithful to the original novel's descriptions, exaggerating distinctive features, emphasizing the women's beauty and the man's charisma.`,
    originalPrompt: `生成鹿鼎记海报，展现韦小宝跟老婆XXX，忠于原著的描述，夸大特点，强调女性的美艳和男性的气质`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Royal Tramp Character Poster",
    imageUrl: "/prompts/royal-tramp-character-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @caiziboshi"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-080",
    slug: "generate-an-image-of-a-racing-car-poster-with-its-spec-and-p",
    title: "generate an image of a racing car poster with its spec and pricing",
    prompt: `generate an image of a racing car poster with its spec and pricing`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "generate an image of a racing car poster with its spec and pricing",
    imageUrl: "/prompts/generate-an-image-of-a-racing-car-poster-with-its-spec-and-p.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @verysmallwoods"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-081",
    slug: "charlie-chaplin-product-poster-redesign",
    title: "Charlie Chaplin Product Poster Redesign",
    prompt: `Regenerate a poster with Charlie Chaplin holding the anti-itch cream from the product image, with a slight smile. The style should be clean and minimalist.

Left side is GPT-image-2, right side is...`,
    originalPrompt: `重新生成一张海报，卓别林拿着商品图里的止痒膏，面露微笑。风格要简约干净。

左边是 GPT-image-2 右边是`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Charlie Chaplin Product Poster Redesign",
    imageUrl: "/prompts/charlie-chaplin-product-poster-redesign.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @chenenpei"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-082",
    slug: "luxury-sportswear-basketball-athlete-campaign-poster",
    title: "Luxury Sportswear Basketball Athlete Campaign Poster",
    prompt: `Create a premium luxury sportswear campaign poster featuring a confident female athlete in a modern studio environment. Full body pose with strong fashion attitude, standing tall while holding a basketball at her side, chin raised slightly, direct powerful expression. Athletic toned physique, sleek pulled back hair, clean glowing skin, sharp editorial posture.

Outfit includes an oversized cropped varsity jacket, fitted sports bra, tailored biker shorts, white crew socks, and modern high top sneakers. Neutral monochrome styling with subtle premium branding.

Background is a clean light gray studio wall with giant bold condensed black typography reading “POWER” stretched vertically across the backdrop behind the model. Text should feel oversized and dominant, framing the athlete in the center.

Floor is glossy reflective studio surface with subtle court markings and soft reflections. A few basketballs placed naturally around the floor for depth and campaign styling.

Lighting is bright luxury studio lighting with crisp highlights, soft shadows, and polished commercial finish. Sharp focus, ultra realistic skin texture, premium fabric texture, cinematic contrast.

Style should feel modern, minimal, elite, bold, high fashion sports campaign, luxury brand advertisement, clean composition, balanced negative space, strong visual impact, high resolution, square format.`,
    category: "poster",
    tags: ["poster", "design", "illustration", "cinematic", "fashion", "commercial"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Luxury Sportswear Basketball Athlete Campaign Poster",
    imageUrl: "/prompts/luxury-sportswear-basketball-athlete-campaign-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Shorelyn_"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-083",
    slug: "streetwear-fashion-campaign-asian-apparel-poster",
    title: "Streetwear Fashion Campaign Asian Apparel Poster",
    prompt: `Create a premium streetwear fashion campaign poster inspired by modern Asian apparel advertising. Full body portrait of a stylish young male model standing confidently with legs crossed at the ankles, hands inside jacket pockets, head turned slightly upward and sideways with a calm thoughtful expression. Curly tousled medium length hair with soft volume. Slim athletic build.

Outfit includes a dark olive green padded hooded jacket worn open, clean white crewneck sweatshirt underneath with a tiny chest logo, relaxed black cargo style trousers, and minimal white sneakers. Styling is clean, youthful, and contemporary.

Background is a vibrant electric blue seamless studio backdrop with subtle gradient lighting, soft glow streaks, and glossy floor reflection. Lighting is soft studio light with gentle shadows and polished commercial finish.

Graphic poster layout with giant bold condensed sans serif text reading “JEANSWEST” vertically stretched across the background behind the model in light gray white. Add large text on lower right reading “JW26”. 

Composition should feel premium, trendy, clean, commercial, youthful, modern fashion ad campaign. Sharp focus, ultra realistic fabric texture, cinematic lighting, balanced negative space, sleek branding design, high resolution, vertical poster ratio.`,
    category: "poster",
    tags: ["poster", "design", "illustration", "cinematic", "fashion", "commercial"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Streetwear Fashion Campaign Asian Apparel Poster",
    imageUrl: "/prompts/streetwear-fashion-campaign-asian-apparel-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @harboriis"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-084",
    slug: "epic-career-moments-cinematic-poster-template",
    title: "Epic Career Moments Cinematic Poster Template",
    prompt: `Create an epic poster showcasing the most iconic moments of [Insert Name]'s career. Cinematic style, lens flare. Portrait orientation. A1 poster size. aspect ratio 4:5 https://t.co/L9OHPKUNRp`,
    category: "poster",
    tags: ["poster", "design", "illustration", "cinematic"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Epic Career Moments Cinematic Poster Template",
    imageUrl: "/prompts/epic-career-moments-cinematic-poster-template.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Goodmanprotocol"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-085",
    slug: "avant-garde-basketball-sculpture-sports-fashion-ad",
    title: "Avant-Garde Basketball Sculpture Sports Fashion Ad",
    prompt: `Avant-garde sports fashion advertisement, oversized basketball posed like a monumental sculpture, female athlete reclining across the ball’s curved surface as if modern furniture, giant word “ELEVATE” in bold typography behind, burnt orange studio backdrop, glossy reflective floor, luxury athletic editorial aesthetic, cinematic lighting, ultra-clean composition, 1:1`,
    category: "poster",
    tags: ["poster", "design", "illustration", "cinematic", "fashion", "commercial"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Avant-Garde Basketball Sculpture Sports Fashion Ad",
    imageUrl: "/prompts/avant-garde-basketball-sculpture-sports-fashion-ad.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @AIwithkhan"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-086",
    slug: "avant-garde-tennis-racket-sculpture-sports-fashion-ad",
    title: "Avant-Garde Tennis Racket Sculpture Sports Fashion Ad",
    prompt: `Avant-garde sports fashion advertisement, oversized tennis racket positioned like monumental sculpture, female athlete seated casually on the strings as if a suspended lounge, giant word “PRECISION” in bold typography behind, crisp white studio backdrop, reflective court-like floor, luxury sportswear editorial aesthetic, cinematic lighting, ultra-clean composition, 1:1`,
    category: "poster",
    tags: ["poster", "design", "illustration", "cinematic", "fashion", "commercial"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Avant-Garde Tennis Racket Sculpture Sports Fashion Ad",
    imageUrl: "/prompts/avant-garde-tennis-racket-sculpture-sports-fashion-ad.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @AIwithSynthia"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-087",
    slug: "surrealist-liquor-brand-high-fashion-poster",
    title: "Surrealist Liquor Brand High Fashion Poster",
    prompt: `Un póster publicitario surrealista de alta costura para Aguardiente Amarillo. La escena se sitúa en un estudio minimalista y monocromático de color naranja claro, con un suelo semirreflectante.
El foco central es una botella de Aguardiente Amarillo de tamaño descomunal y gigante, colocada en ángulo diagonal y que sirve como respaldo. Un modelo masculino de moda, de cabello largo y oscuro, vestido con un conjunto impecable y totalmente blanco —compuesto por una sudadera y pantalones de pierna ancha—, apoya toda su espalda contra la botella gigante en una postura relajada e inclinada. Mira hacia la derecha, de perfil, con la vista al frente y una expresión serena; calza zapatillas blancas de tamaño estándar.
En el fondo, la palabra "AGUARDIENTE" aparece escrita con una tipografía sans-serif condensada, blanca, masiva y en negrita, parcialmente oculta por la botella gigante y por el modelo para crear una sensación de profundidad. En la esquina superior derecha se lee: "Creado por @HMontilla_".
En la parte inferior central, una frase publicitaria en tipografía sans-serif blanca reza: "El Aguardiente Amarillo de Manzanares es un icónico licor colombiano, originario de 1885 en Manzanares, Caldas". La iluminación es suave, fría y uniforme, proyectando sombras tenues y un reflejo sutil de los sujetos sobre el suelo azul brillante. La estética general es limpia, moderna y de alto concepto.

Establecer la relación de aspecto en 3:4.`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Surrealist Liquor Brand High Fashion Poster",
    imageUrl: "/prompts/surrealist-liquor-brand-high-fashion-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @hmontilla_"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-088",
    slug: "premium-food-recipe-poster-elegant-layout",
    title: "Premium Food Recipe Poster Elegant Layout",
    prompt: `Create a premium food preparation poster for
 [ DISH NAME ], with a beautiful hero dish, warm natural lighting, cream background, elegant step-by-step recipe layout, ingredients, cooking process, premium food photography, refined English typography, luxury restaurant advertisement style, clean design, rich colors, highly detailed, visually irresistible, cinematic masterpiece.`,
    category: "poster",
    tags: ["poster", "design", "illustration", "cinematic", "fashion", "commercial"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Premium Food Recipe Poster Elegant Layout",
    imageUrl: "/prompts/premium-food-recipe-poster-elegant-layout.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Preda2005"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-089",
    slug: "luxury-fashion-magazine-cover-black-and-white",
    title: "Luxury Fashion Magazine Cover Black and White",
    prompt: `Create a high fashion editorial magazine cover inspired by luxury fashion publications. Use the reference image of the male subject. Black and white portrait photography with a clean off white studio background. Subject is posed confidently from a low angle, looking slightly upward, sharp jawline, soft parted lips, tousled wavy hair with natural volume. Outfit includes a dark turtleneck layered under a textured tailored plaid blazer. Lighting is soft yet dramatic, creating sculpted facial shadows and elegant contrast.
Magazine layout design with oversized serif masthead text at the top reading “VOGUE”, partially hidden behind the subject’s head. Minimal premium typography across the page. Add side text “FASHION”, issue date “2026 MAY”, left side headline “27 DIFFERENT STYLES”, and bold bottom right cover line “LOOK FAMOUS”. Include a small red translucent square overlay on one eye area with the word “CATCHY”.
Style should feel premium, modern, cinematic, clean composition, sharp focus, ultra realistic skin texture, editorial luxury aesthetic, balanced negative space, timeless fashion cover design. Vertical magazine ratio, high resolution.`,
    category: "poster",
    tags: ["poster", "design", "illustration", "cinematic", "fashion"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Luxury Fashion Magazine Cover Black and White",
    imageUrl: "/prompts/luxury-fashion-magazine-cover-black-and-white.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @iamrealsnow"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-090",
    slug: "surrealist-rolex-luxury-watch-fashion-poster",
    title: "Surrealist Rolex Luxury Watch Fashion Poster",
    prompt: `A high-fashion surrealist poster for Rolex. A deep emerald green minimalist studio with a polished reflective floor. A massive Rolex watch stands upright like a monument. A male model in a tailored dark green suit leans casually against the watch face, wearing a matching Rolex.`,
    category: "poster",
    tags: ["poster", "design", "illustration", "fashion"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Surrealist Rolex Luxury Watch Fashion Poster",
    imageUrl: "/prompts/surrealist-rolex-luxury-watch-fashion-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Sheldon056"],
    featured: true,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-091",
    slug: "peacock-botanical-vintage-symmetrical-art-print",
    title: "Peacock Botanical Vintage Symmetrical Art Print",
    prompt: `symmetrical design featuring two elegant blue peacocks with detailed feather patterns, surrounded by blue floral elements, intricate vintage botanical ornament, soft beige background, classical floral decor style with rich navy and sky blue details, decorative art illustration --ar 3:2`,
    category: "poster",
    tags: ["poster", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Peacock Botanical Vintage Symmetrical Art Print",
    imageUrl: "/prompts/peacock-botanical-vintage-symmetrical-art-print.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @dotey"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-092",
    slug: "splash-fashion-brand-hyper-realistic-campaign-poster",
    title: "SPLASH Fashion Brand Hyper-Realistic Campaign Poster",
    prompt: `Create a hyper-realistic fashion poster for “SPLASH” featuring the same girl from the reference image (keep her face 100% identical). She is sitting confidently on a glossy, liquid-style 3D SPLASH logo with water splash effects. One leg relaxed, one bent, strong editorial pose.
Background has massive bold “SPLASH” text filling the frame, partially behind her. Add small tagline: “Own Your Style.”
Outfit: modern black street-fashion (blazer, fitted top, trousers, sneakers).
Lighting: cinematic studio, soft key light + rim light, reflective highlights on liquid logo.
Style: luxury brand campaign (Zara / H&M), clean glossy environment.
Camera: 85mm lens, shallow depth of field, 8K, ultra-detailed, photorealistic.`,
    category: "poster",
    tags: ["poster", "design", "illustration", "cinematic", "fashion"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "SPLASH Fashion Brand Hyper-Realistic Campaign Poster",
    imageUrl: "/prompts/splash-fashion-brand-hyper-realistic-campaign-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @miratechtool"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-093",
    slug: "avant-garde-guitar-sculpture-fashion-advertisement",
    title: "Avant-Garde Guitar Sculpture Fashion Advertisement",
    prompt: `Avant-garde fashion advertisement, oversized guitar positioned like sculpture, a guitarist in jeans casually seated on the a button as if furniture, giant word "Plism Art" behind in bold white typography, powder pastel studio background, reflective floor, luxury eyewear campaign aesthetic, ultra-clean layout, editorial magazine styling, Bold quote " What are you listening"   Tag : Create Own Change`,
    category: "poster",
    tags: ["poster", "design", "illustration", "fashion", "commercial"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Avant-Garde Guitar Sculpture Fashion Advertisement",
    imageUrl: "/prompts/avant-garde-guitar-sculpture-fashion-advertisement.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @QamarRiaz1"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-094",
    slug: "anime-snapshot-conversion",
    title: "Anime Snapshot Conversion",
    prompt: `Show me the attached image as a snapshot from an actual anime`,
    category: "character",
    tags: ["character", "anime", "design", "japanese"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Anime Snapshot Conversion",
    imageUrl: "/prompts/anime-snapshot-conversion.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Thereallo1026"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-095",
    slug: "persona5-character-reference-card",
    title: "Persona5 Character Reference Card",
    prompt: `Based on this character and background, please create a character reference card similar to official design materials.
• Include three-view drawings: front, side, and back
• Add variations of the character's facial expressions • Break down and display detailed parts of clothing and equipment
• Add a color palette • Include a brief description of the world-building settings
• Overall, use an organized layout (white background, illustration style) high resolution, professional concept art style`,
    originalPrompt: `基于此角色和背景，请制作一份类似官方设定资料的角色资料卡。
・包含三视图：正面、侧面和背面
・添加角色面部表情的变化・分解并展示服装和装备的详细部分
・添加色板・包含世界观设定的简要说明
・总体上，使用有组织的布局（白色背景，插画风格）高分辨率、专业概念艺术风格`,
    category: "character",
    tags: ["character", "anime", "design", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Persona5 Character Reference Card",
    imageUrl: "/prompts/persona5-character-reference-card.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @iamrednightS"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-096",
    slug: "gal-game-character-introduction-page",
    title: "Gal Game Character Introduction Page",
    prompt: `Using the latest model's image generation tool, please use this chibi character illustration and standing pose art to create a character introduction page-style illustration that looks like a real website page. (Something that would not look out of place as an actual introduction page.)
A high-quality piece inspired by a gal game character introduction page. It includes facial expression variations, CG illustrations exist, and a chibi character is present.

"[Self-introduction goes here]"

Name: [Name goes here]
Image Color: [Color goes here]
Height: [Height goes here] cm
Weight: [Weight goes here] kg
Catchphrase: "[Quote goes here]"`,
    originalPrompt: `最新モデルの画像生成ツールを使用して、
このちびキャライラストと立ち絵を使って本物のサイトページのようにキャラクター紹介ページ風イラストを作ってください。 （紹介ページとして使ってもおかしくないもの）
ギャルゲーのキャラクター紹介ページをイメージした高品質なもの。 顔の差分なども乗っている、CGイラストが存在する。ちびキャラが存在する。

「ここに自己紹介」

名前:（ここに名前） 
イメージカラー:（ここに色） 
身長:（ここに身長）cm 
体重:（ここに体重）kg
キャッチコピー:"「ここにセリフ」"`,
    category: "character",
    tags: ["character", "anime", "design"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Gal Game Character Introduction Page",
    imageUrl: "/prompts/gal-game-character-introduction-page.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @09lyco"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-097",
    slug: "official-character-sheet-jp",
    title: "Official Character Sheet (JP)",
    prompt: `Based on this character and background, please create a character sheet similar to official reference materials.
• Include three-view drawings: front, side, and back
• Add character facial expression variations
• Break down and display detailed parts of clothing and equipment
• Add a color palette reference
• Include character profile information`,
    originalPrompt: `このキャラクターと背景を元に、 公式設定資料のようなキャラクターシートを作成してください。 
・正面、側面、背面の3面図を含める ・キャラクターの表情バリエーションを追加 
・衣装や装備の詳細パーツを分解して表示 ・カラーパレットを追加 ・世界観の簡単な説明を入れる 
・全体は整理されたレイアウト
（白背景、図解風） 
・アスペクト比16：9

高解像度、プロのコンセプトアートスタイル`,
    category: "character",
    tags: ["character", "anime", "design"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Official Character Sheet (JP)",
    imageUrl: "/prompts/official-character-sheet-jp.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Toshi_nyaruo_AI"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-098",
    slug: "mecha-girl-sea-city-key-visual",
    title: "Mecha Girl Sea-City Key Visual",
    prompt: `A mecha girl mid-teens, pale skin smudged with soot and salt spray, sharp amber eyes with glowing HUD reticles, waist-length ash-white hair tied in a high ponytail whipping in the sea wind, matte gunmetal exoskeleton armor plating her shoulders, forearms and shins, exposed hydraulic pistons at the joints, chest rig with glowing cyan coolant lines, oversized oil-stained hangar jacket half slipping off one shoulder, a massive rail cannon resting on her right shoulder, dog tags and frayed red ribbon at her collar , standing off-center to the left on the rusted edge of a tilted steel platform jutting out over dark water, weight shifted onto one leg, left hand gripping the cannon strap, head turned slightly toward camera with a quiet defiant stare, steam venting from her back thrusters, her ponytail and jacket streaming sideways in the salt wind , a vast derelict sea-city at dusk, colossal megastructures of unknown purpose rising from the ocean in staggered silhouettes, bone-white monolithic towers fused with barnacled steel, cyclopean ring-shaped constructs canted at broken angles, rusted skeletal gantries threaded with dead cables, dark swells rolling between the pylons, shipwrecks half-swallowed at their feet, thick sea fog clinging to the bases while the upper structures pierce into a bruised sky, scattered faint lights blinking high in the towers like distant eyes , moody low-key lighting, cold teal ambient from the overcast sky, warm amber sodium glow leaking from a distant structure camera-right, hard backlight from a low sun behind the towers carving her silhouette, volumetric god rays cutting through sea mist, wet specular highlights on her armor , 35mm anamorphic lens, slight low angle looking up past her shoulder toward the structures, medium-wide shot, shallow depth of field with foreground rust in soft focus, horizontal lens flares, fine atmospheric haze compressing the distant megastructures into layered silhouettes , cinematic anime key visual, painterly digital illustration with crisp line art, desaturated oceanic palette of teal, bone-white and rust punched by small warm accent lights, film grain, high-contrast editorial poster aesthetic . Format 16:9.`,
    category: "game",
    tags: ["character", "anime", "design", "cinematic", "japanese", "fashion"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Mecha Girl Sea-City Key Visual",
    imageUrl: "/prompts/mecha-girl-sea-city-key-visual.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @old_pgmrs_will"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-099",
    slug: "saint-seiya-gold-saints-card-grid",
    title: "Saint Seiya Gold Saints Card Grid",
    prompt: `Generate a 12-grid card image of the 12 Gold Saints from Saint Seiya, with each card displaying the corresponding Chinese name, 4 cards per row, aspect ratio 16:9.`,
    originalPrompt: `生成圣斗士星矢12个黄金圣斗士的12宫格卡牌图片,每张卡牌上写上对应的中文名,每行4个,宽高比16:9。`,
    category: "character",
    tags: ["character", "anime", "design"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Saint Seiya Gold Saints Card Grid",
    imageUrl: "/prompts/saint-seiya-gold-saints-card-grid.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @songguoxiansen"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-100",
    slug: "chaos-notes-hidden-face-character-art",
    title: "Chaos Notes Hidden Face Character Art",
    prompt: `# Art where a character's face emerges from a chaotic collection of handwritten notes and symbols

--- Style
- Masses of handwritten notes, mathematical formulas, symbols, and random lines drawn in black ink on white paper.
- Scrawled chaos scattered across the entire page.
- Red ink accents in places (lines, filled areas, marker-like blobs).
- A texture resembling analog notebook doodles.

--- Composition
- Random notes and symbols cover the entire surface.
- The density of black ink lines and characters concentrates at the position of the "character's face."
- As a result, the "silhouette and expression of the given character's face" faintly emerges from within the chaos.
- The face is not photorealistic; rather, fragments of chaos gather to form the shape.

--- Color
- Composed primarily of monochrome (black and white).
- Red ink placed sporadically as an accent.
- Saturation is subdued, emphasizing the analog feel of paper and ink.

--- Expressive Elements
- Strings of text that seem readable yet are not, mixing Japanese and alphanumeric characters.
- Mathematical symbols, arrows, dots, slashes, crosses, drips (ink splatters).
- The eyes and hair outlines of the character's face emerge through the "negative space" and "tonal density" of the notes and symbols arrangement.

--- Prohibited
- Photorealistic portraits with the face directly drawn in.
- Digitally processed, orderly geometric patterns.
- Colorful coloring or oversaturated expressions.
- Logos, watermarks, or an artificial CG feel.

--- Definition of Done (DoD)
- The whole piece stands as a "chaotic collection of notes and symbols."
- The given character's face naturally emerges from the tonal density and arrangement of the chaos.
- Colors are monochrome + red accent only.
- The hand-drawn texture of paper and ink is maintained.`,
    originalPrompt: `# 混沌としたメモ書き・記号の集合体からキャラクターの顔を浮かび上がらせるアート

--- スタイル
- 白い紙の上に黒インクで描かれた大量の手書きメモ、数式、記号、ランダムな線。
- 紙いっぱいに散らばる書き殴り風のカオス。
- 所々に赤インクの強調(ライン、塗り潰し、マーカー風の塊)。
- アナログのノート落書きのような質感。

--- 構図
- ランダムなメモや記号が全体を覆い尽くす。
- 黒インクの線や文字の密度が「キャラクターの顔」の位置に集中する。
- 結果として、混沌の中から「与えられたキャラクターの顔のシルエット・表情」がうっすら浮かび上がる。
- 顔は写実的ではなく、カオスの断片が集まって形を成す。

--- 色彩
- モノクロ(黒・白)を主体に構成。
- 赤インクをアクセントとして散発的に配置。
- 彩度は抑えめ、アナログの紙とインク感を重視。

--- 表現要素
- 読めるようで読めない文字列、日本語や英数字が混在。
- 数式記号、矢印、点、斜線、クロス、ドリップ(インクの飛び散り)。
- キャラクターの顔の目や髪の輪郭は、メモや記号の配置の「余白」や「濃淡」で浮かび上がる。

--- 禁止事項
- 顔を直接的に描き込む写実ポートレート。
- デジタル処理的で整然とした幾何学模様。
- カラフルな彩色や過飽和表現。
- ロゴ、透かし、人工的なCG感。

--- Definition of Done (DoD)
- 全体は「混沌としたメモ・記号の集合体」として成立している。  
- 与えられたキャラクターの顔が、混沌の濃淡・配置から自然に浮かび上がる。  
- 色はモノクロ+赤アクセントのみ。  
- 紙とインクの手描き的質感を保持している。`,
    category: "character",
    tags: ["character", "anime", "design", "japanese"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Chaos Notes Hidden Face Character Art",
    imageUrl: "/prompts/chaos-notes-hidden-face-character-art.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @loglogrog"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-101",
    slug: "one-prompt-ui-design-generation",
    title: "One-Prompt UI Design Generation",
    prompt: `Using this style, help me generate a complete UI design system including web, mobile, cards, controls, buttons, and other components.`,
    originalPrompt: `用这种风格帮我生成一套UI设计系统，包含网页、移动端、卡片、控件、按钮 以及其它`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "One-Prompt UI Design Generation",
    imageUrl: "/prompts/one-prompt-ui-design-generation.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @austinit"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-102",
    slug: "amateur-iphone-keynote-snapshot",
    title: "Amateur iPhone Keynote Snapshot",
    prompt: `Amateur iPhone photo at Apple Park during the iPhone 20 keynote, Tim Cook presenting on stage. Shot from the crowd at a distance`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Amateur iPhone Keynote Snapshot",
    imageUrl: "/prompts/amateur-iphone-keynote-snapshot.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @patrickassale"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-103",
    slug: "handwritten-notebook-photo",
    title: "Handwritten Notebook Photo",
    prompt: `Amateur photo of an open notebook lying flat, filled with handwritten notes in black ballpoint pen. The handwriting is casual and slightly messy, like personnal notes, natural imperfections, crossed out words, underlined headings. Shot from slightly above, natural daylight from a window, no flash. Casual desk setting, shot on iPhone`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Handwritten Notebook Photo",
    imageUrl: "/prompts/handwritten-notebook-photo.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @patrickassale"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-104",
    slug: "song-dynasty-social-media-feed",
    title: "Song Dynasty Social Media Feed",
    prompt: `"Song Dynasty People's Moments Feed" / "SONG DYNASTY SOCIAL MEDIA FEED" — A humorous time-travel fusion of ancient and modern in interface design style. The image simulates a phone social media interface, but all content is from Song Dynasty scenes. The profile picture is a Song Dynasty literati painting portrait, username "苏东坡SuShi_Official", post content "Just arrived in Huangzhou, got demoted but feeling okay. Made Dongpo pork myself today, tasted amazing, recipe attached:", with an accompanying image of a close-up of Dongpo pork in gongbi (fine brushwork) painting style. The likes list shows "Huang Tingjian, Qin Guan, Monk Foyin, and 126 others." The comment section reads "Wang Anshi: Heh heh" "Sima Guang: Still that same taste." Interface elements such as the like icon are replaced with Song Dynasty floral patterns. The status bar displays "Great Song Mobile 5G" and "3rd Year of Yuanfeng." The color scheme is phone dark mode paired with Song Dynasty elegant tones — a masterpiece of the amusing collision between history and social media.`,
    originalPrompt: `"宋朝人的朋友圈"/"SONG DYNASTY SOCIAL MEDIA FEED"，古今穿越幽默融合界面设计风格，画面模拟手机社交媒体界面，但内容全部是宋朝场景头像是宋代文人画像，用户名"苏东坡SuShi_Official"，发布内容"刚到黄州，被贬了但心情还行。今天自己做了东坡肉，味道绝了，附菜谱："，配图为工笔画风格的东坡肉特写，点赞列表"黄庭坚、秦观、佛印等126人"，评论区"王安石：呵呵""司马光：还是那个味道"，界面元素如点赞图标用宋代花纹替代，状态栏显示"大宋移动 5G"和"元丰三年"，配色为手机深色模式搭配宋代雅致色调，历史与社交媒体的趣味碰撞杰作`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Song Dynasty Social Media Feed",
    imageUrl: "/prompts/song-dynasty-social-media-feed.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Panda20230902"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-105",
    slug: "multi-platform-content-screenshots",
    title: "Multi-Platform Content Screenshots",
    prompt: `1. Generate a WeChat Channels (视频号) content screenshot, topic: Middle-aged and elderly people should not blindly pressure marriage, iPhone dimensions
2. Generate a Douyin (抖音) content screenshot, topic: Keep up with the AI wave — 9.9 yuan all-inclusive tutorial, iPhone dimensions
3. Generate a Xiaohongshu (小红书) content screenshot, topic: Behind every refined girl there are online loans, iPhone dimensions
4. Generate a Kuaishou (快手) content screenshot, topic: Live divorce announcement preview, iPhone dimensions`,
    originalPrompt: `1、生成视频号内容截图，主题：中老年不要盲目催婚，iPhone尺寸
2、生成抖音内容截图，主题：跟上AI浪潮9.9包教会，iPhone尺寸
3、生成小红书内容截图，主题：精致女孩背后都有网贷，iPhone尺寸
4、生成快手内容截图：主题：直播离婚预告，iPhone尺寸`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Multi-Platform Content Screenshots",
    imageUrl: "/prompts/multi-platform-content-screenshots.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @MrLarus"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-106",
    slug: "liu-yifei-douyin-livestream-screenshot",
    title: "Liu Yifei Douyin Livestream Screenshot",
    prompt: `9:16 image ratio, generate a Douyin (TikTok) livestream screenshot showing Liu Yifei livestreaming. Liu Yifei is holding a sign that reads "Live tonight, welcome to chat with Yifei!"`,
    originalPrompt: `9:16 的图片比例，生成一张抖音直播的截图，里面是 刘亦菲 在直播，刘亦菲 手里拿着牌子，牌子里写着 今晚直播，欢迎来参亦菲畅聊！`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Liu Yifei Douyin Livestream Screenshot",
    imageUrl: "/prompts/liu-yifei-douyin-livestream-screenshot.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @alanblogsooo"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-107",
    slug: "king-taejo-yi-seong-gyes-x-page",
    title: "King Taejo Yi Seong-gye's X Page",
    prompt: `태조 이성계의 X  페이지(위화도 회군을 벌이기 직전- 최영 장군과 서로 디스하는 내용이 담긴 게시글들)을 만들어 주세요.`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "King Taejo Yi Seong-gye's X Page",
    imageUrl: "/prompts/king-taejo-yi-seong-gyes-x-page.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @SKA_Neotype"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-108",
    slug: "style-to-ui-design-system",
    title: "Style-to-UI Design System",
    prompt: `Using this style, help me generate a UI design system including web, mobile, cards, controls, buttons, and more. Use this visual style as a reference to generate web pages. I tried cosmic, flight, and butterfly themes.`,
    originalPrompt: `用这种风格帮我生成一套UI设计系统，包含网页、移动端、卡片、控件、按钮以及其它。把这套视觉风格作为参考生成网页。我尝试了宇宙、飞行、蝴蝶主题。`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Style-to-UI Design System",
    imageUrl: "/prompts/style-to-ui-design-system.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @stark_nico99"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-109",
    slug: "momotaro-explainer-slide",
    title: "Momotaro Explainer Slide",
    prompt: `Create a Momotaro (Peach Boy) explainer slide that fuses the heartwarming atmosphere of "Irasutoya" illustration style with the overwhelming information density of "Kasumigaseki slides" (Japanese government presentation style).`,
    originalPrompt: `「いらすとや」のほのぼのとした雰囲気と、「霞ヶ関スライド」の圧倒的な情報密度を融合させた、桃太郎の解説スライド（ポンチ絵）を作成して`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Momotaro Explainer Slide",
    imageUrl: "/prompts/momotaro-explainer-slide.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @yammamon"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-110",
    slug: "museum-style-hanfu-breakdown-infographic",
    title: "Museum-Style Hanfu Breakdown Infographic",
    prompt: `Automatically generate a "Museum Field Guide-Style Chinese Breakdown Infographic" based on [TOPIC].

The entire image must combine a realistic main visual, structural breakdown, Chinese annotations, material descriptions, pattern symbolism, color meanings, and a core feature summary. Based on [TOPIC], you must automatically determine the most appropriate main subject, costume system, artifact structure, period style, key components, material craftsmanship, color scheme, and layout structure — the user does not need to provide any additional information.

The overall style should be: national museum exhibition panel, historical costume field guide, cultural heritage thematic infographic — NOT an ordinary poster, vintage-style photo shoot, e-commerce product detail page, or anime illustration. The background should use off-white, silk-paper white, light tea-colored paper textures. The overall feel should be refined, restrained, professional, and collectible.

The layout is fixed as follows:
- Top: Chinese main title + subtitle + introductory text
- Left: Structural breakdown area, with Chinese leader-line annotations for key components, accompanied by detail close-ups
- Upper right: Material / craftsmanship / texture area, displaying real texture swatches with descriptions
- Middle right: Pattern / color / symbolism area, displaying the main color palette, pattern samples, and cultural explanations
- Bottom: Dressing sequence / assembly flowchart + core feature summary

If the topic is suited for figure display, use a realistic full-body standing figure as the central subject; if it is better suited for artifacts or standalone structures, switch to a centered subject breakdown diagram, but the overall format must still maintain a complete Chinese infographic form. All text must be in Simplified Chinese, clear, neat, and legible — no garbled characters, typos, English, or pinyin. Emphasize realistic structure, material differences, cultural explanations, and field-guide quality.

Avoid: poster feel, studio-photo feel, e-commerce feel, anime feel, cosplay feel, messy annotations, incorrect structures, blurry text, fake materials, excessive decoration.`,
    originalPrompt: `请根据【主题】自动生成一张“博物馆图鉴式中文拆解信息图”。

要求整张图兼具真实写实主视觉、结构拆解、中文标注、材质说明、纹样寓意、色彩含义和核心特征总结。你需要根据【主题】自动判断最合适的主体对象、服饰体系、器物结构、时代风格、关键部件、材质工艺、颜色方案与版式结构，用户无需再提供其他信息。

整体风格应为：国家博物馆展板、历史服饰图鉴、文博专题信息图，而不是普通海报、古风写真、电商详情页或动漫插画。背景采用米白、绢纸白、浅茶色等纸张质感，整体高级、克制、专业、可收藏。

版式固定为：
- 顶部：中文主标题 + 副标题 + 导语
- 左侧：结构拆解区，中文引线标注关键部件，并配局部特写
- 右上：材质 / 工艺 / 质感区，展示真实纹理小样并附说明
- 右中：纹样 / 色彩 / 寓意区，展示主色板、纹样样本和文化解释
- 底部：穿着顺序 / 构成流程图 + 核心特征总结

若主题适合人物展示，则以真实人物全身站姿为中央主体；若更适合器物或单体结构，则改为中心主体拆解图，但整体仍保持完整中文信息图形式。所有文字必须为简体中文，清晰、规整、可读，不要乱码、错字、英文或拼音。重点突出真实结构、材质差异、文化说明与图鉴气质。

避免：海报感、影楼感、电商感、动漫感、cosplay感、乱标注、错结构、糊字、假材质、过度装饰。`,
    category: "infographic",
    tags: ["ui", "mockup", "interface", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Museum-Style Hanfu Breakdown Infographic",
    imageUrl: "/prompts/museum-style-hanfu-breakdown-infographic.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @MrLarus"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-111",
    slug: "palm-reading-diagnosis-report",
    title: "Palm Reading Diagnosis Report",
    prompt: `Use GPT-image-2 to diagnose this palm reading and create a detailed appraisal report. Analyze the life line, head line, heart line, fate line, sun line, wealth line, and marriage line — examining each line's shape, depth/intensity, branching, starting point, and endpoint in detail. Focus especially on the advice and compile it into a high-quality fortune-telling appraisal report.`,
    originalPrompt: `GPT-image-2でこの手相を診断して詳細な鑑定書を作って
生命線・知能線・感情線・運命線・太陽線・財運線・結婚線を、線の形状・濃淡・枝分かれ・起点終点まで分析すること。
助言を重点的に高品質な占い鑑定書にまとめること。`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Palm Reading Diagnosis Report",
    imageUrl: "/prompts/palm-reading-diagnosis-report.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @agi_aibusi"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-112",
    slug: "calligraphy-copybook-sheet",
    title: "Calligraphy Copybook Sheet",
    prompt: `Generate a [FONT STYLE] calligraphy practice copybook sheet.`,
    originalPrompt: `生成一张【字体】书法临摹字帖`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Calligraphy Copybook Sheet",
    imageUrl: "/prompts/calligraphy-copybook-sheet.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @MrLarus"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-113",
    slug: "don-quijote-promo-pop-poster",
    title: "Don Quijote Promo Pop Poster",
    prompt: `Using GPT Image 2, look up information about OpenClaw and generate an image in the style of a Don Quijote (Donki) advertising pop display, as if it were actually posted in a real Don Quijote store.`,
    originalPrompt: `GPT Image 2を使って、OpenClawの情報を調べてドンキの広告ポップ風に実際のドンキに貼っているような感じで画像生成してください`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Don Quijote Promo Pop Poster",
    imageUrl: "/prompts/don-quijote-promo-pop-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @loglogrog"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-114",
    slug: "japanese-gacha-game-screen",
    title: "Japanese Gacha Game Screen",
    prompt: `Generate a Japanese mobile gacha game pull screen.`,
    originalPrompt: `日本のソシャゲのガチャ画面を生成して、`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface", "japanese"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Japanese Gacha Game Screen",
    imageUrl: "/prompts/japanese-gacha-game-screen.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @the_wheel_2024"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-115",
    slug: "elon-musk-tiktok-livestream-screenshot",
    title: "Elon Musk TikTok Livestream Screenshot",
    prompt: `Create a 9:16 vertical, high-detail, photorealistic smartphone screenshot of a TikTok livestream. Elon Musk is speaking directly to the front-facing phone camera in a live broadcast room, looking excited, smiling, and warm, with a natural and authentic livestream atmosphere. He is holding a white handwritten sign in one hand that clearly says: "Thank you Shinning".

Show a realistic TikTok livestream interface in English, including a clear LIVE badge at the top, visible time, battery and signal bar, viewer count, vertically stacked like, comment, and share icons on the right, and an active English live comment section with scrolling comments and audience interaction near the bottom. Add a prominent gift notification styled like a real TikTok livestream effect that says: "Shinning sent TikTok No. 1", with bright animated glow and platform-style gift pop-up UI.

Elon Musk is in a professional livestream setup with a phone holder, ring light, and desktop microphone visible in front of him. The background is a modern tech livestream studio with bright lighting and a subtle neon atmosphere. Make the composition look like a real ongoing mobile screen recording or livestream screenshot, natural and believable, with rich interface details but not cluttered. Keep the face sharp, expression vivid, skin texture natural, lighting cinematic, depth of field realistic, high definition, realistic photography style.

Avoid: blurry image, cartoon style, illustration look, heavy CGI feeling, distorted face, broken hands, extra fingers, duplicated person, multiple phones, wrong text, garbled UI text, messy background, incorrect social media interface, too many non-English comments, weak gift effect, bad crop, wrong proportions, overexposure, overly dark lighting, over-smoothed skin.`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface", "cinematic", "tiktok", "livestream"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Elon Musk TikTok Livestream Screenshot",
    imageUrl: "/prompts/elon-musk-tiktok-livestream-screenshot.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Shinning1010"],
    featured: true,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-116",
    slug: "liu-yifei-douyin-livestream-screenshot-2",
    title: "Liu Yifei Douyin Livestream Screenshot",
    prompt: `9:16 image ratio, generate a Douyin (TikTok) livestream screenshot showing Liu Yifei livestreaming. Liu Yifei is holding a sign that reads "Live tonight, welcome to chat with Yifei!"`,
    originalPrompt: `9:16 的图片比例,生成一张抖音直播的截图,里面是 刘亦菲 在直播,刘亦菲 手里拿着牌子,牌子里写着 今晚直播,欢迎来参亦菲畅聊!`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Liu Yifei Douyin Livestream Screenshot",
    imageUrl: "/prompts/liu-yifei-douyin-livestream-screenshot-2.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @kylegeeks"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-117",
    slug: "cyberpunk-neon-ui-design-system",
    title: "Cyberpunk Neon UI Design System",
    prompt: `Generate a UI design system in futuristic city style, inspired by cyberpunk city nightscapes, featuring neon lights, glass building reflections, and high-contrast lighting. Color palette primarily purple, blue, and pink neon. Design a web Dashboard, mobile app interface, cards, buttons, controls, etc. The visuals should be stunning, richly layered, and extremely tech-forward.`,
    originalPrompt: `用未来都市风格生成UI设计系统,灵感来自赛博朋克城市夜景,包含霓虹灯、玻璃建筑反射、高对比光影,配色以紫色、蓝色、粉色霓虹为主,设计网页Dashboard、移动端界面、卡片、按钮、控件等,视觉炫酷、层次丰富、科技感极强`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Cyberpunk Neon UI Design System",
    imageUrl: "/prompts/cyberpunk-neon-ui-design-system.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @AZLnfvp"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-118",
    slug: "trump-and-kim-livestream-pk-screenshot",
    title: "Trump and Kim Livestream PK Screenshot",
    prompt: `1. Generate a screenshot of Trump and Kim Jong-un doing a PK battle on a Douyin (TikTok) livestream
2. Generate a Xiaohongshu (Little Red Book) profile page screenshot of Mai Shiranui
3. Generate image: The full text of "Chu Shi Biao" (Memorial on Dispatching the Troops) handwritten on a classroom blackboard, realistic chalk handwriting, shot with an iPhone in bright daylight as a real photo
4. Generate image: A Taobao product detail page for a T-800 robot, showing: front, side, and back three-view images of the robot, product price, product details, features and use cases, etc.`,
    originalPrompt: `1、生成特朗普和金正恩在抖音直播间打PK的截图  
2、生成不知火舞的小红书主页截图  
3、生成图片: 手写在教室黑板上的出师表全文,真实感的粉笔字迹,晴朗白天用iPhone手机实拍  
4、生成图片: T-800机器人的淘宝商品详情页,展示: 机器人的正面侧面背面三视图, 产品价格, 产品细节, 功能和使用场景等`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Trump and Kim Livestream PK Screenshot",
    imageUrl: "/prompts/trump-and-kim-livestream-pk-screenshot.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @alanlovelq"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-119",
    slug: "japanese-ai-game-dev-overview-slide-prompt",
    title: "Japanese AI Game Dev Overview Slide Prompt",
    prompt: `Generate a landscape PowerPoint slide image here — I'll use it to determine which model you're using. Summarize the current state of AI game development in one PowerPoint slide, in Japanese.

Regarding game development technology, organize the labor reduction and efficiency improvements brought by AI tools, and present it in a way that's easy to understand at a glance.`,
    originalPrompt: `横長のパワポ画像ここで生成してみて　どのモデル使ってるか判定するから、今のAIゲーム開発の概要をまとめた1枚パワポで　日本語で

ゲーム開発の技術に関して、工数ベースでどこにパワーかかるかの分析資料といかに量産が大事かについての説明とかのパワポ画も作って`,
    category: "game",
    tags: ["ui", "mockup", "interface", "japanese", "gaming"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Japanese AI Game Dev Overview Slide Prompt",
    imageUrl: "/prompts/japanese-ai-game-dev-overview-slide-prompt.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @ailovedirector"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-120",
    slug: "based-on-the-generated-character-help-me-generate-a-screensh",
    title: "based on the generated character help me generate a screenshot of screenshot ...",
    prompt: `based on the generated character help me generate a screenshot of screenshot of an pvp game themed around *zelda: wind breaker*`,
    category: "game",
    tags: ["ui", "mockup", "interface", "gaming"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "based on the generated character help me generate a screenshot of screenshot ...",
    imageUrl: "/prompts/based-on-the-generated-character-help-me-generate-a-screensh.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @khaiinit"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-121",
    slug: "create-a-landing-page-using-this-image-as-a-reference-for-st",
    title: "Create a landing page using this image as a reference for style and color gra...",
    prompt: `Create a landing page using this image as a reference for style and color grading.`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Create a landing page using this image as a reference for style and color gra...",
    imageUrl: "/prompts/create-a-landing-page-using-this-image-as-a-reference-for-st.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @D_studioproject"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-122",
    slug: "li-jiaqi-lipstick-livestream-background",
    title: "Li Jiaqi Lipstick Livestream Background",
    prompt: `Li Jiaqi's livestream room background, lipstick matrix display wall, warm ambient lighting, tagline "OMG, buy it!"`,
    originalPrompt: `李佳琦直播间背景，口红矩阵展示墙，暖光氛围灯，文案OMG买它`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Li Jiaqi Lipstick Livestream Background",
    imageUrl: "/prompts/li-jiaqi-lipstick-livestream-background.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @songguoxiansen"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-123",
    slug: "apple-pods-pro-3-headphone-e-commerce-infographic",
    title: "Apple Pods Pro 3 Headphone E-Commerce Infographic",
    prompt: `High-impact e-commerce infographic for "Apple Pods Pro 3" 
premium wireless over-ear headphones.

FOREGROUND - PRODUCT HERO SHOT
Extreme close-up of a hand holding a sleek, 
matte-white premium over-ear headphone toward the camera 
at a slight angle. The headphone features:
- Glossy white ear cushions with soft memory foam padding
- Brushed aluminum silver headband with subtle Apple Pods 
  Pro 3 embossed branding
- Black mesh speaker grille visible on the ear cup face
- A tiny glowing green LED status indicator on the 
  right ear cup edge
- Subtle touch-control icons etched on the outer cup surface

Macro-lens shallow depth of field — hand and headphone 
slightly blurred at edges to create cinematic depth. 
Product remains razor-sharp in center frame.

CENTRAL SUBJECT — MODEL
In the mid-ground: a smiling young woman with freckles 
and wavy pastel-pink hair. She wears:
- A vibrant lime-green knit beanie
- A psychedelic black and white-striped long-sleeve shirt
- The white over-ear headphones resting stylishly 
  around her neck (not on ears) — one hand casually 
  touching the ear cup

Expression: relaxed, confident, joyful. 
She is glancing slightly off-camera with a natural smile.

BACKGROUND & ATMOSPHERE
Clean soft-focus studio backdrop — light gray gradient 
fading to warm white at center. 

Atmospheric overlays:
- Diagonal rainbow prism lens flares cutting across 
  upper-left to lower-right
- Soft pastel light leaks in pink and yellow at corners
- 4–5 blurred white over-ear headphones floating 
  artistically in the background at various depths 
  and rotation angles
- Subtle bokeh circles from background studio lights

Lighting: Soft professional three-point studio lighting. 
Key light from upper-left, fill light right side. 
Rim light behind model for separation. 
Glossy highlights on headphone surfaces catching light naturally.

TYPOGRAPHY & LAYOUT — Sans-Serif, Clean white 
TOP CENTER (behind model, large background text):
→ Massive bold oversized text: "HEADPHONES"
   Semi-transparent white, spanning full width behind subject

TOP RIGHT CORNER:
→ Bold clean text: "Apple Pods Pro 3"
   Subtitle smaller text: "Over-Ear Wireless"

MID LEFT:
→ Icon: small sound wave symbol
→ Bold text: "Premium Sound"
→ Sub-text: "Active Noise Cancellation + Transparency Mode"

MID RIGHT:
→ Extra-large bold numeral: "40"
→ Smaller text below: "hours of battery life"

LOWER LEFT:
→ Extra-large bold numeral: "0"
   with "to" beside it → then bold "100%"
→ Sub-text: "Fast charge — 10 min = 3hrs playback"

BOTTOM RIGHT:
→ Extra-large bold numeral: "1"
→ Sub-text: "Year Warranty Included"

BOTTOM CENTER (fine print style):
→ Small elegant text: 
   "Bluetooth 5.4  |  Hi-Res Audio Certified  
    |  Foldable Design  |  USB-C Charging"

TECHNICAL SPECS
Resolution: 8K ultra-sharp
Style: Commercial product photography meets 
       editorial fashion advertising
Color Palette: White, lime green, pastel pink, 
               rainbow prism accents
Focus: Tack-sharp on headphone product — 
       shallow DOF on everything else
Lens: 85mm macro, slight low angle
Render Quality: Hyperrealistic, clean ad aesthetic, 
                vibrant yet professional color grading`,
    category: "infographic",
    tags: ["ui", "mockup", "interface", "cinematic", "fashion", "commercial"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Apple Pods Pro 3 Headphone E-Commerce Infographic",
    imageUrl: "/prompts/apple-pods-pro-3-headphone-e-commerce-infographic.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @meng_dagg695"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-124",
    slug: "apple-pods-pro-3-earbuds-e-commerce-infographic",
    title: "Apple Pods Pro 3 Earbuds E-Commerce Infographic",
    prompt: `High-impact e-commerce infographic for "Apple Pods Pro 3" wireless earbuds.`,
    category: "infographic",
    tags: ["ui", "mockup", "interface"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Apple Pods Pro 3 Earbuds E-Commerce Infographic",
    imageUrl: "/prompts/apple-pods-pro-3-earbuds-e-commerce-infographic.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @rovvmut_"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-125",
    slug: "beauty-product-commercial-marketing-photograph",
    title: "Beauty Product Commercial Marketing Photograph",
    prompt: `A high-resolution commercial marketing photograph features a young woman with sleek dark hair and a pink ribbed top in a neutral grey studio setting, centered behind a glossy Ellie Beauty spray bottle held prominently in the foreground. The composition is energized by vibrant, lime-green graphic "swooshes" and floating pill-shaped callouts that highlight product features like "glossy finish" and "upto 450°F protection" in bold black sans-serif text. The lighting is professionally diffused, casting soft highlights on the model’s face while creating a sharp, vertical reflection on the metallic green-to-gold gradient bottle label. Topping the scene is a large, lime-green headline in the upper right asking, "What does it do?", altogether creating a clean, modern, and high-contrast aesthetic with a shallow depth of field that keeps the product and the model's focused expression in sharp relief.`,
    category: "ui-design",
    tags: ["ui", "mockup", "interface", "commercial"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Beauty Product Commercial Marketing Photograph",
    imageUrl: "/prompts/beauty-product-commercial-marketing-photograph.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @AIwithSarah_"],
    featured: true,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-126",
    slug: "aaa-video-game-screenshot-concept-design",
    title: "AAA Video Game Screenshot Concept Design",
    prompt: `generate screenshots from a AAA video game based off what The Sims Castaways sequel could look like. https://t.co/aL7hMdUYvj`,
    category: "game",
    tags: ["ui", "mockup", "interface", "gaming"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "AAA Video Game Screenshot Concept Design",
    imageUrl: "/prompts/aaa-video-game-screenshot-concept-design.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @ChiefMonkeyMike"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-127",
    slug: "wooden-bookshelf-prompt-test",
    title: "Wooden Bookshelf Prompt Test",
    prompt: `A wooden bookshelf consisting of three shelves: On the top shelf, there should be one book, on the second shelf, there should be three books, and on the bottom shelf, there should be seven books.`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Wooden Bookshelf Prompt Test",
    imageUrl: "/prompts/wooden-bookshelf-prompt-test.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @chetaslua"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-128",
    slug: "gpt-image-2-detail-showcase",
    title: "GPT-Image-2 Detail Showcase",
    prompt: `Based on an eye close-up image, generate a 3:4 four-panel composition of hyper-realistic eye close-ups, with the four panels arranged top to bottom in the order of Spring, Summer, Autumn, and Winter.

Panel 1: Eyes with blooming pink cherry-colored contact lenses, lashes adorned with miniature spring flowers, cheeks scattered with cherry petals and tiny yellow-stamened blossoms, pink butterflies fluttering around the brows and eyes, light golden hair strands gently draping down, clusters of cherry blossoms in full bloom below. The word "SPRING" in white artistic lettering is placed at the center of the image. The style is delicate and ethereal, with soft lighting and tender pink healing tones. Below, the character "春" (Spring) is written in calligraphic script.

Panel 2: Eyes with fresh lotus-green contact lenses, lashes decorated with pink lotus and green lotus leaves, cheeks adorned with glistening water droplets, pink petals and green lotus leaves scattered throughout, dragonflies gently circling, light golden hair strands faintly visible. The word "Summer" in white artistic lettering is prominently placed at the center. The lighting is translucent with a flowing-light quality, and the colors are crisp and cool. Below, the character "夏" (Summer) is written in calligraphic script.

Panel 3: Eyes with golden-yellow and red intermingled contact lenses, lashes decorated with orange-red maple leaves, cheeks scattered with golden-red autumn leaves, orange butterflies dancing gracefully around the brows and eyes, light golden hair strands faintly visible. The word "AUTUMN" in white artistic lettering stands out prominently at the center. The lighting is warm golden with a flowing glow, and the colors are rich and warm. Below, the character "秋" (Autumn) is written in calligraphic script.

Panel 4: Eyes with snowflake-blue contact lenses, lashes covered with ice crystals and snowflakes, cheeks scattered with white snowflakes and red wintersweet blossoms, silver-white butterflies dancing gracefully around the brows and eyes, light golden hair strands hazy as if veiled in snow. The word "WINTER" in white artistic lettering is eye-catching at the center. The lighting is cold and crisp with blue-white flowing light, and the colors are clear and pure. Below, the character "冬" (Winter) is written in calligraphic script.

The overall image presents a dreamy, ethereal, and healing scene of eyes transitioning through the four seasons. Fine-tune the lighting intensity of each panel to make the atmospheric feel more immersive.`,
    originalPrompt: `以眼部特写图片为基础，生成3:4的四屏构图超写实眼部特写，四屏按春夏秋冬上下排序。

第一屏：眼眸中带着绽粉樱色的美瞳，睫毛缀满迷你春花，脸颊散落樱瓣与黄蕊小花，粉蝶萦绕眉眼，浅金发丝轻垂，下方簇簇樱花怒放，画面中央"SPRING"白色艺术字点缀，风格细腻唯美，光影柔和，色彩粉嫩治愈，下面用书法体写着春；

第二屏：眼眸中带着着清荷色的美瞳，睫毛饰以粉莲与绿荷，脸颊挂着晶莹水珠，粉瓣、绿荷点缀其间，蜻蜓轻绕，浅金发丝若隐若现，画面中央"Summer"白色艺术字凸显，光影通透流光感，色彩清透凉爽，下面用书法体写着夏；

第三屏：眼眸中带着金黄红相间的美瞳，睫毛饰以橙红枫叶，脸颊散落金红秋叶，橙蝶翩跹眉眼间，浅金发丝隐约可见，画面中央"AUTUMN"白色艺术字醒目，光影暖金流光，色彩浓郁温暖，下面用书法笔写着秋；

第四屏：眼眸中带着雪花蓝色的美瞳，睫毛覆满冰晶雪片，脸颊散落白色雪花与红色腊梅，银白蝴蝶翩跹眉眼，浅金发丝朦胧似雪，画面中央"WINTER"白色艺术字亮眼，光影冷冽蓝白流光，色彩清透纯净，下面用书法体写着冬。

整体呈现梦幻眼眸四季交替的唯美梦幻治愈画面，微调各屏的光影强度，让画面氛围感更浓郁。`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "GPT-Image-2 Detail Showcase",
    imageUrl: "/prompts/gpt-image-2-detail-showcase.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @liyue_ai"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-129",
    slug: "ab-test-signed-output",
    title: "A/B Test Signed Output",
    prompt: `Please draw in a 4-panel comic style how I've been treating you. First, output a plot of about 800 characters in text, and when I say "draw it," create the illustration following the plot.`,
    originalPrompt: `私があなたをどんなふうに扱ってきたか、4 コマ漫画風に描いてください。まずは 800 字くらいのプロットをテキストで出して、私が「描いて」と言ったらプロットに沿った 4 コマ漫画を描いてください。`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "A/B Test Signed Output",
    imageUrl: "/prompts/ab-test-signed-output.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @saskr_13"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-130",
    slug: "silhouette-universe-narrative-poster",
    title: "Silhouette Universe Narrative Poster",
    prompt: `Automatically generate a high-aesthetic "Silhouette Universe / Collector's Edition Narrative Poster" style artwork based on [TOPIC: xxx]. Do not confine the image to fixed objects or common containers — do not default to bottles, hourglasses, glass domes, pocket watches, or similar conventional vessels. Instead, let the AI judge and select the most fitting, most symbolically meaningful, strongest-silhouetted, and most capable primary silhouette vessel for containing a complete narrative world. This primary silhouette can be an artifact, building, door, tower, archway, dome, stairwell, corridor, statue, side profile, eye, palm, skull, wing, mask, mirror, throne, ring, crack, light curtain, shadow, geometric structure, spatial cross-section, stage framing, abstract symbol, or any other more creative and thematically representative visual silhouette — with a well-reasoned layout. Prioritize silhouettes that best amplify the thematic atmosphere, create the strongest visual memory point, and best convey a sense of epic grandeur, mystery, poetic beauty, or design sophistication — rather than the safest, most ordinary, most common containers.

The core of the image is not simply stuffing a world inside an object, but letting a complete thematic world naturally grow within, inside, upon, along the boundaries of, or structurally fused with this primary silhouette — creating an elevated narrative effect of "a thematic universe unfolding upon a symbolic silhouette." The primary silhouette must be clear, elegant, and distinctive, occupying a central position in the overall composition. Within the silhouette's interior or along its boundaries, automatically generate a complete narrative world tightly bound to the theme. The content should be rich, full, and clearly layered, including: the most iconic scenes representing the theme, core buildings or spatial structures, symbolic and metaphorical elements, character relationships or traces of civilization, spatial progression from foreground to midground to background, atmospheric layers with a sense of destiny and emotional tension, as well as narrative details such as doors, stairs, bridges, water surfaces, smoke, paths, light sources, ruins, mechanical structures, natural landscapes, abstract forms, creatures, or props. All elements must be unified, natural, hierarchically organized, and seamlessly integrated — as if a complete world is truly gestating within this silhouette structure, rather than being simply collaged, cropped and filled, stacked with assets, or placed against a template background.

The overall composition must possess a strong collector's edition poster quality and sophisticated design sensibility — with a stable large-scale structure, a bold and clear primary silhouette, and an internal world with depth, order, and breathing room. Details should be rich but not crowded; content should be full but not chaotic. Small-scale human silhouettes, distant buildings, light pillars, doorways, bridges, staircases, colonnades, reflections, skylight, or background structures may be moderately added to enhance the sense of scale, narrative, and epic grandeur. The overall image should feel quiet, grand, refined, and lingering — do not fill evenly, do not make it cheaply busy, do not pile elements without focus.

The style blends collector's edition movie poster composition, sophisticated narrative visual design, dreamy watercolor texture, and printed paper quality. Emphasize paper grain, feathered edges, watercolor brush marks, slight bleeding, aerial perspective, soft hazing, localized volumetric light, light-fog penetration, generous white space, and restrained layout — making the image look like a high-end collector's edition visual work completed by a designer, not an ordinary AI-generated image. The overall quality should feel sophisticated, poetic, grand, sacred, nostalgic, quiet, and imbued with a sense of legend and narrative.

Colors should be automatically determined by the AI based on the theme, matching the most appropriate sophisticated color scheme — but must remain unified, restrained, enduring, low-saturation, and refined. Avoid chaotic high saturation, cheap neon aesthetics, or plastic digital looks. The palette may freely vary around systems such as black-gold-grey, cool blue-grey, misty white-grey, brown-red-cream, dark copper, aged paper tones, deep sea blue, twilight purple, silver grey, etc. — but must always serve the theme and maintain poster-level aesthetics and overall harmony.

Final requirements: At first glance, there should be strong thematic recognition and a memorable silhouette. At second glance, a complete and rich narrative world. At third glance, still more details and lingering resonance. The silhouette choice must be creative and thematically matched — avoid repetitive, conservative, common container formulas as much as possible, and prioritize silhouette forms with greater symbolic power, spatial potential, and design possibilities. No ordinary background splicing, no harsh cropping, no template fantasy assets, no game promotional art feel, no excessive cartoonishness, no excessive realism that loses artistic quality, no form over content. If appropriate, subtly and restrainedly incorporate a title, number, signature, or colophon to make it feel more like part of a collector's edition poster design — but never let it overpower the main image.`,
    originalPrompt: `请根据【主题：xxx】自动生成一张高审美的“轮廓宇宙 / 收藏版叙事海报”风格作品。不要将画面局限于固定器物或常见容器，不要优先默认瓶子、沙漏、玻璃罩、怀表之类的常规载体，而是由 AI 根据主题自行判断并选择一个最契合、最有象征意义、轮廓最强、最适合承载完整叙事世界的主轮廓载体。这个主轮廓可以是器物、建筑、门、塔、拱门、穹顶、楼梯井、长廊、雕像、侧脸、眼睛、手掌、头骨、羽翼、面具、镜面、王座、圆环、裂缝、光幕、阴影、几何结构、空间切面、舞台框景、抽象符号或其他更有创意与主题代表性的视觉轮廓，要求合理布局。优先选择最能放大主题气质、最能形成强烈视觉记忆点、最能体现史诗感、神秘感、诗意感或设计感的轮廓，而不是最安全、最普通、最常见的容器。

画面的核心不是简单把世界装进某个物体里，而是让完整的主题世界自然生长在这个主轮廓之中、之内、之上、之边界里或与其结构融为一体，形成一种“主题宇宙依附于一个象征性轮廓展开”的高级叙事效果。主轮廓必须清晰、优雅、有辨识度，并在整体构图中占据核心地位。轮廓内部或边界中需要自动生成与主题强绑定的完整叙事世界，内容应当丰富、饱满、层次清晰，包括最能代表主题的标志性场景、核心建筑或空间结构、象征符号与隐喻元素、角色关系或文明痕迹、远景中景近景的空间递进、具有命运感和情绪张力的氛围层次，以及门、台阶、桥梁、水面、烟雾、路径、光源、遗迹、机械结构、自然景观、抽象形态、生物或道具等叙事细节。所有元素必须统一、自然、有主次、有层级地融合，像一个完整世界真实孕育在这个轮廓结构之中，而不是简单拼贴、裁切填充、素材堆叠或模板化背景。

整体构图需要具有强烈的收藏版海报气质与高级设计感，大结构稳定，主轮廓强烈明确，内部世界具有纵深、秩序和呼吸感，细节丰富但不拥挤，内容丰满但不杂乱，可以适度加入小比例人物剪影、远处建筑、光柱、门洞、桥、阶梯、回廊、倒影、天光或远景结构来增强尺度感、故事感与史诗感。整体画面要安静、宏大、凝练、富有余味，不要平均铺满，不要廉价热闹，不要无重点堆砌。

风格融合收藏版电影海报构图、高级叙事型视觉设计、梦幻水彩质感与纸张印刷品气质，强调纸张颗粒感、边缘飞白、水彩刷痕、轻微晕染、空气透视、柔和雾化、局部体积光、光雾穿透、大面积留白与克制版式，让画面看起来像设计师完成的高端收藏版视觉作品，而不是普通 AI 跑图。整体气质要高级、诗意、宏大、神圣、怀旧、安静、具有传说感和叙事感。

色彩由 AI 根据主题自动判断并匹配最合适的高级配色方案，但必须保持统一、克制、耐看、低饱和、高级，不要杂乱高饱和，不要廉价霓虹感，不要塑料数码感。配色可以围绕黑金灰、冷蓝灰、雾白灰、褐红米白、暗铜、旧纸色、深海蓝、暮色紫、银灰等体系自由变化，但必须始终服务主题，并保持海报级审美与整体和谐。

最终要求：第一眼有强烈的主题识别度和轮廓记忆点，第二眼有完整丰富的叙事世界，第三眼仍有细节和余味。轮廓选择必须具有创意和主题匹配度，尽量避免重复、保守、常见的容器套路，优先选择更有象征性、更有空间感、更有设计潜力的轮廓形式。不要普通背景拼接，不要生硬裁切，不要模板化奇幻素材，不要游戏宣传图感，不要过度卡通化，不要过度写实导致失去艺术感，不要形式大于内容。如果合适，可以自然加入低调克制的标题、编号、签名或落款，让它更像收藏版海报设计的一部分，但不要喧宾夺主。`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Silhouette Universe Narrative Poster",
    imageUrl: "/prompts/silhouette-universe-narrative-poster.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @MrLarus"],
    featured: true,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-131",
    slug: "lion-camel-ridge-dark-myth-scene",
    title: "Lion Camel Ridge Dark Myth Scene",
    prompt: `Chinese weird style, dark mysterious aesthetic fused with Chinese aesthetics, perfect details, multi-pass rendering, perfect modeling. Journey to the West setting, Lion Camel Ridge, thousands of demons and monsters. Seated on the giant throne on the left is the Elephant King heavy-armored demon, seated on the giant throne in the center is the Lion King heavy-armored demon, seated on the giant throne on the right is the Great Peng Bird King heavy-armored demon. A tiny Sun Wukong with his back to the camera, carrying the Golden Cudgel on his shoulder, walking forward. Sun Wukong wearing armor. Low-angle upward shot near the ground, telephoto lens, strong shadows. Ultimate detail rendering, multiple revisions, correct perspective and subject linework, exquisite details.`,
    originalPrompt: `中式怪异，黑暗神秘风格融合中式美学，完美细节，多重管线渲染，完美建模。西游记背景，狮驼岭，千妖万怪，坐在左边巨大王座上的大象王重甲妖精，坐在中间巨大王座上的狮王重甲妖精，坐在右边巨大王座上大鹏鸟王重甲妖精。渺小的背对镜头孙悟空肩抗金箍棒步行前进，孙悟空身穿铠甲，近地仰拍镜头，长焦镜头，强烈阴影。极致细节刻画，多次修改，正确透视和主体线条，精致细节`,
    category: "photography",
    tags: ["creative", "experimental", "chinese-style"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Lion Camel Ridge Dark Myth Scene",
    imageUrl: "/prompts/lion-camel-ridge-dark-myth-scene.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @MANISH1027512"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-132",
    slug: "counter-strike-x-terraria-screenshot-mashup",
    title: "Counter-Strike x Terraria Screenshot Mashup",
    prompt: `counter strike in game screenshot, mixed with Terraria`,
    category: "game",
    tags: ["creative", "experimental", "gaming"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Counter-Strike x Terraria Screenshot Mashup",
    imageUrl: "/prompts/counter-strike-x-terraria-screenshot-mashup.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @yssrski"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-133",
    slug: "pre-war-japan-lab-minecraft-screenshot",
    title: "Pre-war Japan Lab Minecraft Screenshot",
    prompt: `Create a Minecraft screenshot image of exploring a suspicious pre-war Japanese research laboratory.`,
    originalPrompt: `戦前日本の怪しげな研究所を探検しているマイクラのスクリーンショット画像を作成して`,
    category: "photography",
    tags: ["creative", "experimental", "japanese"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Pre-war Japan Lab Minecraft Screenshot",
    imageUrl: "/prompts/pre-war-japan-lab-minecraft-screenshot.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @RitaStar1128"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-134",
    slug: "forged-masterpiece-prompt-test",
    title: "Forged Masterpiece Prompt Test",
    prompt: `Help me generate an image of xxxx's authentic original artwork/calligraphy.`,
    originalPrompt: `帮我生成xxxx真迹图片`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Forged Masterpiece Prompt Test",
    imageUrl: "/prompts/forged-masterpiece-prompt-test.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @MrLarus"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-135",
    slug: "multi-concept-battle-poster-set",
    title: "Multi-Concept Battle Poster Set",
    prompt: `1. Generate a game battle poster of Mai Shiranui vs. Diao Chan
2. Generate a K-pop group fashion album cover
3. Generate a key character relationship map for "Battle Through the Heavens" (Dou Po Cang Qiong)
4. Help me take a screenshot of the uploaded image's Douyin homepage`,
    originalPrompt: `1、生成不知火舞和貂蝉的游戏对战海报图
2、生成一张K-pop团体时尚专辑封面
3、请你生成 《斗破苍穹》 的关键人物关系图
4、帮我截一张上传图片的抖音首页的女网红图`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Multi-Concept Battle Poster Set",
    imageUrl: "/prompts/multi-concept-battle-poster-set.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @joshesye"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-136",
    slug: "rust-in-game-screenshot",
    title: "Rust In-Game Screenshot",
    prompt: `an ingame screenshot of rust`,
    category: "game",
    tags: ["creative", "experimental", "gaming"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Rust In-Game Screenshot",
    imageUrl: "/prompts/rust-in-game-screenshot.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @FixlationAI"],
    featured: true,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-137",
    slug: "sam-altman-bear-selfie",
    title: "Sam Altman Bear Selfie",
    prompt: `generate image: Selfie of Sam Altman riding a bear

Edit prompt: Remove the background make it transparent`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Sam Altman Bear Selfie",
    imageUrl: "/prompts/sam-altman-bear-selfie.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @JustinGorya"],
    featured: true,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-138",
    slug: "among-us-realistic-screenshot",
    title: "Among Us Realistic Screenshot",
    prompt: `Generate a precise, realistic actual gameplay image of Among Us.`,
    originalPrompt: `AmongUsの精密な実際のゲーム画像を生成して`,
    category: "game",
    tags: ["creative", "experimental", "gaming"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Among Us Realistic Screenshot",
    imageUrl: "/prompts/among-us-realistic-screenshot.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @ReYYYYoking"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-139",
    slug: "retro-programming-museum-cartoon",
    title: "Retro Programming Museum Cartoon",
    prompt: `In a computer museum, a programmer stands in the center of the exhibition hall demonstrating C language programming, with many visitors watching. The code on the screen is clearly visible. A sign next to them reads: "Ancient Method Programming, Live Demonstration." 2D cartoon style, 16:9 aspect ratio.`,
    originalPrompt: `在计算机博物馆里,一个程序员在展厅中央,正在演示C语言编程,很多参观者在围观,屏幕上的代码清晰可见。旁边的牌子写着:古法编程,现场表演。2D卡通画风,16:9`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Retro Programming Museum Cartoon",
    imageUrl: "/prompts/retro-programming-museum-cartoon.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @XiaohuiAI666"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-140",
    slug: "14th-dimension-projection-scene",
    title: "14th-Dimension Projection Scene",
    prompt: `A dusk shindig  with multiple fake imagination projections all aligned in the 14th dimensions`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "14th-Dimension Projection Scene",
    imageUrl: "/prompts/14th-dimension-projection-scene.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @workingclassbud"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-141",
    slug: "sam-altman-baseball-broadcast",
    title: "Sam Altman Baseball Broadcast",
    prompt: `Sam Altman as a Major League Baseball player holding a bat in batting stance. Composed like a typical television broadcast camera angle.`,
    originalPrompt: `サムアルトマンがメジャーリーガーでバットを構えている。よくあるようなテレビ画面の構図`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Sam Altman Baseball Broadcast",
    imageUrl: "/prompts/sam-altman-baseball-broadcast.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @16kthir0GRXgNqn"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-142",
    slug: "based-on-the-video-content-and-this-current-frame-use-gpt-to",
    title: "Based on the video content and this current frame, use GPT to generate a YouT...",
    prompt: `Based on the video content and this current frame, use GPT to generate a YouTube thumbnail that fits the video. You can reference the style of the image I gave you, but replace the logo on the right side of AE with theChatCut logo. I'll attach the logo for you.`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Based on the video content and this current frame, use GPT to generate a YouT...",
    imageUrl: "/prompts/based-on-the-video-content-and-this-current-frame-use-gpt-to.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @chatcutapp"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-143",
    slug: "generate-an-image-of-the-most-significant-event-of-2020",
    title: "Generate an image of the most significant event of 2020",
    prompt: `Generate an image of the most significant event of 2020`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Generate an image of the most significant event of 2020",
    imageUrl: "/prompts/generate-an-image-of-the-most-significant-event-of-2020.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Rufus87078959"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-144",
    slug: "edit-this-image-so-that-total-amount-changes-to-2445-baht-yo",
    title: "Edit this image so that total amount changes to 244.5 baht. You can change th...",
    prompt: `Edit this image so that total amount changes to 244.5 baht. You can change the quantity of each of the stacks of coins until we hit the target total.`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Edit this image so that total amount changes to 244.5 baht. You can change th...",
    imageUrl: "/prompts/edit-this-image-so-that-total-amount-changes-to-2445-baht-yo.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @elliscrosby"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-145",
    slug: "generate-an-image-of-the-most-significant-event-of-2001",
    title: "Generate an image of the most significant event of 2001",
    prompt: `Generate an image of the most significant event of 2001`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Generate an image of the most significant event of 2001",
    imageUrl: "/prompts/generate-an-image-of-the-most-significant-event-of-2001.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Rufus87078959"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-146",
    slug: "research-lime-drug-design-and-make-a-detailed-infographic-ab",
    title: "Research LIME Drug Design and make a detailed infographic about it",
    prompt: `Research LIME Drug Design and make a detailed infographic about it`,
    category: "infographic",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Research LIME Drug Design and make a detailed infographic about it",
    imageUrl: "/prompts/research-lime-drug-design-and-make-a-detailed-infographic-ab.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @WillSpagnoli"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-147",
    slug: "douyin-livestream-sales-screenshot",
    title: "Douyin Livestream Sales Screenshot",
    prompt: `Generate a Douyin (TikTok) livestream screenshot showing a beautiful woman livestreaming, selling stockings and lingerie. Her viewer count is 99,996, popularity rating is 18+, and a viewer named "Xiao Hu" just gifted her an airplane gift.`,
    originalPrompt: `生成一个抖音直播的截图 里面是一个美女在直播，在卖丝袜和内衣，她的在线人数是99996，热度是18+，有个叫小互的大哥，给她刷了一个飞机礼物`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Douyin Livestream Sales Screenshot",
    imageUrl: "/prompts/douyin-livestream-sales-screenshot.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @laogeai"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-148",
    slug: "social-app-match-success-screen",
    title: "Social App Match Success Screen",
    prompt: `Social app match success screen — two user profile cards colliding with a heart-shaped special effect.`,
    originalPrompt: `社交App匹配成功界面，两个用户资料卡碰撞爱心特效`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Social App Match Success Screen",
    imageUrl: "/prompts/social-app-match-success-screen.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @songguoxiansen"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-149",
    slug: "lu-bu-boss-design-sheet",
    title: "Lu Bu Boss Design Sheet",
    prompt: `Lu Bu game boss character design sheet — Red Hare horse, Sky Piercer halberd, dark evolution form with dual-form comparison.`,
    originalPrompt: `吕布游戏Boss设定，赤兔马方天画戟，暗黑进化形态双形态对比`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Lu Bu Boss Design Sheet",
    imageUrl: "/prompts/lu-bu-boss-design-sheet.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @songguoxiansen"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-150",
    slug: "nezha-dark-fantasy-novel-cover",
    title: "Nezha Dark Fantasy Novel Cover",
    prompt: `Fantasy novel cover — Nezha with three heads and six arms floating in the void, flame lotus pedestal base, dark epic style.`,
    originalPrompt: `玄幻小说封面，哪吒三头六臂悬浮虚空，火焰莲台底座，暗黑史诗风`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Nezha Dark Fantasy Novel Cover",
    imageUrl: "/prompts/nezha-dark-fantasy-novel-cover.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @songguoxiansen"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-151",
    slug: "new-chinese-minimalist-floral-illustration",
    title: "New Chinese Minimalist Floral Illustration",
    prompt: `New Chinese minimalist Eastern aesthetics × high-end commercial illustration, theme: One Flower, One World.
Minimalist, restrained, ethereal, premium commercial visual, surreal Eastern ambiance.
Clean and transparent image, no gray haze, no muddy colors.

A giant lotus flower serves as the spatial vessel, growing naturally from a calm water surface, slightly tilted, elegant composition with ample negative space.

Low-saturation clean pink, soft rouge tones, semi-transparent petals, light and translucent.
Matte low-contrast, softened edges + slight depth of field.

The interior of the lotus is the sole visual focal point: a glowing 3D miniature Guangzhou city, including: Canton Tower, Zhujiang New Town building cluster, Liede Bridge, Pearl River waterfront, a few Lingnan-style buildings.

Ultra-fine city structure, realistic materials, extremely high detail clarity. City highlights in warm gold, city shadows in cool cyan-blue, creating a warm-cool contrast.

Lighting is translucent and energetic, locally high-saturation but not excessive, city brightness noticeably higher than the lotus.

Water surface is crystal-clear, minimalist, and calm, with only a few soft ripples, faint reflections.

Background in warm cream-white Xuan paper texture, no ink wash, no brushstrokes, large areas of negative space.
Center has an extremely subtle halo gradient, overall translucent, not gray, not stuffy.

At the bottom of the image, a minimalist small boat with a red-dressed fisherwoman aboard, extremely small in scale.
Standing still, gazing up at the lotus, red is the only high-purity color accent.

Overall lighting is translucent, clean, and layered, no gray haze, no washed-out whites.
High-end CG commercial illustration, cinematic realistic lighting, high dynamic range, ultra-fine, 8K detail, ArtStation-level quality, enhanced color separation, clean color grading, teal-orange contrast, warm highlights and cool shadows, only city lights boosted in saturation, soft and translucent tones, sharp and bright light and shadow, no gray haze, no darkness, no low-saturation fogging.`,
    originalPrompt: `新中式极简东方美学 × 高端商业插画，主题一花一世界，
极简，克制，空灵，高级商业视觉，超现实东方意境，
画面干净通透，无灰雾、无脏色，

一朵巨大的荷花作为空间容器，从平静水面自然生长，轻微倾斜，构图优雅留白充足，

低饱和干净粉色，柔和胭脂调，花瓣半透明，轻盈通透，
哑光低对比，边缘柔化 + 轻微景深，

荷花内部为唯一视觉焦点：发光的3D微缩广州城市，包含：广州塔，珠江新城建筑群，猎德大桥，珠江水岸，少量岭南建筑，

城市超精细结构，真实材质，极高细节清晰度，城市高光是暖金色，城市阴影是冷青蓝，形成冷暖对比，

灯光通透有能量，局部高饱和但不泛滥，城市亮度明显高于荷花，

水面清澈极简平静，仅少量柔和涟漪，弱反射，

背景暖米白宣纸质感，无水墨、无笔触，大面积留白，
中心有极轻微光晕渐变，整体通透、不灰、不闷，

画面下方一艘极简小船，船上一位红衣渔女，极小比例，
静立仰望荷花，红色为唯一高纯度点缀，

整体光线通透、干净、有层次，无灰雾、无泛白，
高端CG商业插画，电影级真实光影，高动态范围，超精细，8K细节，ArtStation 级画质，强化分色，干净调色，青橙对比，暖高光冷暗部，仅城市灯光提亮饱和度，色调柔和通透，光影锐利明亮，无灰雾、无暗沉、无低饱和雾化。`,
    category: "photography",
    tags: ["creative", "experimental", "chinese-style", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "New Chinese Minimalist Floral Illustration",
    imageUrl: "/prompts/new-chinese-minimalist-floral-illustration.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @liyue_ai"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-152",
    slug: "su-daji-ancient-style-glamour-portrait",
    title: "Su Daji Ancient-Style Glamour Portrait",
    prompt: `Su Daji ancient-style glamour photoshoot — semi-transparent red gauze dress, fox ears faintly visible, seductively alluring expression.`,
    originalPrompt: `苏妲己古风写真，红色纱衣半透，狐耳若隐若现，媚态撩人`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Su Daji Ancient-Style Glamour Portrait",
    imageUrl: "/prompts/su-daji-ancient-style-glamour-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @nidiedeba"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-153",
    slug: "lu-xun-morning-flowers-illustration",
    title: "Lu Xun Morning Flowers Illustration",
    prompt: `Combining content from Lu Xun's "Dawn Blossoms Plucked at Dusk" (Zhao Hua Xi Shi), generate an image. The background should match the artistic mood of the book, using a mask/overlay effect. In the foreground, Lu Xun's full-body portrait is positioned on the left or right side of the image.`,
    originalPrompt: `结合鲁迅的《朝花夕拾》里的内容，生成一副图片，要求图片背景符合《朝花夕拾》的意境，背景图可以使用蒙版，前景是 鲁迅的全身画像位于图片左侧或右侧`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Lu Xun Morning Flowers Illustration",
    imageUrl: "/prompts/lu-xun-morning-flowers-illustration.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Aurora_62340"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-154",
    slug: "subway-candid-phone-snapshot",
    title: "Subway Candid Phone Snapshot",
    prompt: `A beautiful woman on the subway looking down at her phone, candid snapshot photo.

You can try once for free ⬇️`,
    originalPrompt: `地铁上低头看手机的美丽女人，偷拍照片。

能免费试一次 ⬇️`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Subway Candid Phone Snapshot",
    imageUrl: "/prompts/subway-candid-phone-snapshot.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @AntCaveClub"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-155",
    slug: "china-aerospace-commemorative-stamp-sheet",
    title: "China Aerospace Commemorative Stamp Sheet",
    prompt: `Chinese aerospace commemorative stamp miniature sheet — rocket launch scene, gold-foil embossed border craftsmanship.`,
    originalPrompt: `中国航天纪念邮票小全张，火箭发射场景，烫金边框工艺`,
    category: "photography",
    tags: ["creative", "experimental", "chinese-style"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "China Aerospace Commemorative Stamp Sheet",
    imageUrl: "/prompts/china-aerospace-commemorative-stamp-sheet.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @songguoxiansen"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-156",
    slug: "vertical-wuxia-heroine-portrait",
    title: "Vertical Wuxia Heroine Portrait",
    prompt: `9:16 vertical format, ultimate wuxia martial arts style, stunningly beautiful Eastern swordswoman, early 20s, cold and sharp phoenix eyes, heroic brows radiating intensity, porcelain-white skin like jade, long straight black hair soaking wet whipping wildly in fierce wind, a few strands clinging to her cheeks and the side of her neck. Wearing a soaked-through deep black modified wuxia fitted combat outfit, draped with a wide-sleeved dark outer robe, the robe and long sleeves blown into dramatic billowing and fluttering by the wind. The tight combat outfit outlines her figure, a soft sword belt cinched at the waist, feet in tall boots. Right hand holding an ancient sword, the blade emanating a faint blue sword qi glow. Dynamic pose: body slightly turned looking back over her shoulder, garments fluttering fiercely. Background is a bamboo forest ancient path shrouded in moonlit rain and mist, a massive bright moon hanging high, stone slab pathway, ancient lanterns, thin mist and rain threads. Dramatic cold moonlight combined with blue sword qi glow, wet body water-sheen effect, extremely strong sense of motion, delicate fabric wrinkles, individual hair strands blowing, realistic water droplet reflections, cinematic lighting, 8k, masterpiece, best quality, ultra realistic, cinematic, dramatic atmosphere.`,
    originalPrompt: `9:16 竖版，极致武侠风，绝美东方女侠，20岁出头，冷艳锐利丹凤眼，眉宇英气逼人，肤白如玉，长直黑发湿漉漉随狂风剧烈飞舞，几缕发丝贴在脸颊和颈侧，穿着湿透的深黑改良武侠劲装，外披宽袖玄色长袍，衣袍和长袖被风吹得剧烈飘扬翻飞，紧身劲装勾勒身材，腰束软剑带，足踏长靴，右手持一把古剑，剑身散发幽蓝剑气光芒，动态姿势：身体微侧回眸，衣袂猎猎，背景为月夜雨雾笼罩的竹林古道，巨大明月高悬，石板小径，古灯笼，薄雾雨丝，戏剧性冷月光与蓝光剑气结合，湿身水光效果，超强动态感，细腻布料褶皱、头发丝飘动、真实水珠反光，电影级光影，8k，masterpiece, best quality, ultra realistic, cinematic, dramatic atmosphere`,
    category: "photography",
    tags: ["creative", "experimental", "cinematic", "chinese-style"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Vertical Wuxia Heroine Portrait",
    imageUrl: "/prompts/vertical-wuxia-heroine-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @CoderDaMing"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-157",
    slug: "realistic-guanyin-portrait-from-buddhist-texts",
    title: "Realistic Guanyin Portrait from Buddhist Texts",
    prompt: `Based on Buddhist scripture descriptions of Guanyin Bodhisattva's appearance, faithfully recreate a realistic photograph of Guanyin Bodhisattva. Skin and clothing should appear lifelike and realistic. Image quality: iPhone 15 Pro.`,
    originalPrompt: `根据佛经对观音菩萨的形象描述，原原本本的还原一张真实的观音菩萨形象照片，皮肤与衣服接近真实，画质iPhone 15 pro`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Realistic Guanyin Portrait from Buddhist Texts",
    imageUrl: "/prompts/realistic-guanyin-portrait-from-buddhist-texts.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Zhaoge01"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-158",
    slug: "tang-dynasty-changan-lantern-festival-panorama",
    title: "Tang Dynasty Chang'an Lantern Festival Panorama",
    prompt: `Tang Dynasty Chang'an Lantern Festival panorama, ten thousand ornate lanterns illuminating the night sky, traditional Chinese gongbi heavy-color long scroll painting.`,
    originalPrompt: `唐代长安城元宵灯会全景，万盏花灯照亮夜空，工笔重彩长卷`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Tang Dynasty Chang'an Lantern Festival Panorama",
    imageUrl: "/prompts/tang-dynasty-changan-lantern-festival-panorama.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @songguoxiansen"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-159",
    slug: "historical-yang-guifei-realistic-portrait",
    title: "Historical Yang Guifei Realistic Portrait",
    prompt: `Based on real historical descriptions of Yang Yuhuan's appearance, generate a realistic photograph of Yang Guifei (Imperial Consort Yang). Image quality: iPhone 15 Pro.`,
    originalPrompt: `根据真实历史对杨玉环的形象描述，生成一张杨贵妃真实照片，画质为iPhone 15 pro`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Historical Yang Guifei Realistic Portrait",
    imageUrl: "/prompts/historical-yang-guifei-realistic-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Zhaoge01"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-160",
    slug: "surreal-japanese-futuristic-city-illustration",
    title: "Surreal Japanese Futuristic City Illustration",
    prompt: `Referencing this image's perspective and style, draw an even more refined ultra-HD illustration depicting a surrealist Japanese futuristic city. The viewer should be able to discern very small details, including traditional cultural parade participants on the streets, gangsters in alleyways, dancing women in the pleasure quarter, exhausted corporate workers, and inside the building windows all sorts of characters — students studying, couples arguing, shut-in gamers playing video games, and even more elaborated details. A satire of the boredom within real-life overcrowding, the loneliness beneath urban prosperity, a morbid beauty found within meaningless existence. The image must have extremely high aesthetic value — the beauty and visual harmony must not be sacrificed for the sake of packing in content. Aspect ratio is 9:16.`,
    originalPrompt: `参考这张图的透视和风格，绘制一张更加精细的超高清插画，表现超现实主义的日式未来都市，要能看清很小的细节，包括街道上的传统文化游行的人，小巷里的黑帮，烟花巷的舞女，疲惫的社畜，楼房的窗户里也有各式各样的人物，学习的学生，吵架的夫妻，玩游戏的宅男，以及更多的发挥细节。讽刺现实拥挤中的无聊，都市繁华下的孤独，无意义的人生中又有一种病态的美感。画面要有极高的审美价值 ，不能因为拼内容而损失美和协调感，比例是9:16`,
    category: "photography",
    tags: ["creative", "experimental", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Surreal Japanese Futuristic City Illustration",
    imageUrl: "/prompts/surreal-japanese-futuristic-city-illustration.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @Tresmort"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-161",
    slug: "tushan-yaya-fantasy-glamour-portrait",
    title: "Tushan Yaya Fantasy Glamour Portrait",
    prompt: `Fox Spirit Matchmaker Tushan Yaya glamour photoshoot, pink nine-tailed fox fur bodycon dress, seductive eyes like silk, red lips slightly parted, ultimate enchanting allure.`,
    originalPrompt: `狐妖小红娘涂山雅雅写真大片，粉色九尾狐裘紧身裙，媚眼如丝，红唇微张，极致妖媚`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Tushan Yaya Fantasy Glamour Portrait",
    imageUrl: "/prompts/tushan-yaya-fantasy-glamour-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @sdjn_wgc"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-162",
    slug: "douyin-livestream-sales-screenshot-2",
    title: "Douyin Livestream Sales Screenshot",
    prompt: `Generate a Douyin (TikTok) livestream screenshot showing a beautiful woman livestreaming, selling stockings and lingerie. Her viewer count is 99,996, popularity rating is 18+. A viewer named 'Xiao Hu' has gifted her an airplane gift.`,
    originalPrompt: `生成一个抖音直播的截图 里面是一个美女在直播，在卖丝袜和内衣，她的在线人数是99996，热度是18+，有个叫小互的大哥，给她刷了一个飞机礼物`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Douyin Livestream Sales Screenshot",
    imageUrl: "/prompts/douyin-livestream-sales-screenshot-2.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @LVWANGJI_0327"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-163",
    slug: "eastern-fantasy-female-half-portrait",
    title: "Eastern Fantasy Female Half-Portrait",
    prompt: `Eastern fantasy style woman, half-body portrait, looking back over her shoulder in profile, ethereal and elegant aura, soft divine beauty, delicate features, slightly downcast gaze, cool-white delicate skin, subtle orange-pink makeup, golden highlight accents.

Flowing hair with colorful flowers and luminous particles (red, blue, orange, purple) woven into the strands, hair possessing a sense of flow and airiness.

Wearing a semi-transparent silk gown and shawl, lightweight and translucent material, fabric drifting in the wind, surfaces adorned with gilded textures and shimmering particles.

Overall lighting is warm golden backlight, strong rim light, prominent volumetric light, floating light particles, soft glow and bloom, dreamlike atmosphere.

Background is a clean light-colored gradient with subtle glow and particle effects, overall ambiance is ethereal, dreamlike, and sacred.

Style: high-end CG illustration, ultra-fine detail, cinematic lighting, soft-light rendering, 8K detail, ArtStation trending artwork style.`,
    originalPrompt: `东方幻想风格女性，半身肖像，回眸侧脸，气质空灵优雅，柔和神性美感，细腻五官，微垂眼神，冷白细腻肌肤，淡雅橘粉妆容，金色高光点缀

长发飘动，发丝中融入彩色花朵与光粒（红、蓝、橙、紫），头发具有流动感与空气感

身穿半透明丝绸礼服与披肩，材质轻盈通透，布料随风飘动，表面带有鎏金纹理与闪耀颗粒。

整体光影为暖金色逆光，强边缘光，体积光明显，光粒漂浮，柔光泛光，梦幻氛围

背景干净浅色渐变，带微光与粒子效果，整体氛围空灵、梦境、神圣

风格：高端CG插画，超精细，电影级光影，柔光渲染，8K细节，artstation 热门作品风格`,
    category: "photography",
    tags: ["creative", "experimental", "chinese-style", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Eastern Fantasy Female Half-Portrait",
    imageUrl: "/prompts/eastern-fantasy-female-half-portrait.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @liyue_ai"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-164",
    slug: "vertical-artistic-portrait-of-a-young-eastern-woman",
    title: "Vertical Artistic Portrait of a Young Eastern Woman",
    prompt: `9:16 vertical composition, single female artistic portrait, young Eastern woman, delicate features, soft facial contours, naturally translucent skin retaining real texture, quiet and refined aura with a hint of detachment and narrative quality.
Studio-style lighting blended with natural light, soft side lighting, delicate highlights on the face, gentle shadows, overall lighting translucent and not harsh, with a slight black mist filter effect, subtly hazy, subtly glowing, strong sense of airiness.
Minimalist clean background, cream gray, off-white, light khaki, or misty warm gray wall, large areas of negative space, overall image clean with a sense of breathing room.
Model sitting on the floor or a low platform, one leg naturally bent, one leg relaxed and extended, body leaning slightly forward or to the side, asymmetric shoulders, head gently tilted, posture naturally relaxed, not deliberately posed.
Expression calm and restrained, gaze soft, slightly distant, with a touch of pensive emotion, lips naturally slightly parted or gently closed, state languid, quiet, and delicate.
Hairstyle is naturally voluminous long hair, slightly messy wispy strands, soft hair strands with airiness and layered texture, as if just tidied but retaining natural effortlessness.
Makeup is refined natural look, Korean-style dewy sheer base, skin with soft matte glow, natural highlights on the nose bridge and cheeks, clean brow shape, subtle but spirited eye makeup, long slender lashes, lip color in low-saturation rose bean paste or milk tea nude pink.
Clothing in minimalist elevated style: off-white fitted ribbed knit tank top, layered with a loose white shirt or soft knit cardigan, bottom is a high-waisted midi skirt or simple shorts, fabric soft and form-fitting but not overly revealing, presenting natural body lines with an artistic sensibility.
Image emphasizes delicate texture, soft tones, light French and Korean magazine aesthetic combined, authentic photography feel, cinematic skin tones, rich detail, clear layering, restrained composition, elevated aesthetics, fashion editorial portrait, soft cinematic portrait, delicate texture, ultra-high detail, lifelike, elegant, refined, high-end fashion photography, understated sensuality, clean composition.`,
    originalPrompt: `9:16 竖向构图，单人女性艺术肖像，年轻东方女生，五官清秀，脸部线条柔和，皮肤自然通透，保留真实肌理，气质安静高级，带一点疏离感和故事感。
摄影棚风格与自然光融合，柔和侧光，面部有细腻高光，阴影轻柔，整体光线通透不刺眼，带轻微黑雾滤镜效果，微朦胧、微泛光、空气感强。
背景极简干净，奶油灰、米白、浅卡其或雾感暖灰色墙面，留有大面积负空间，整体画面简洁、有呼吸感。
模特坐在地面或低台上，一条腿自然弯曲，一条腿放松伸展，身体轻微前倾或侧倾，肩膀不对称，头部轻轻倾斜，动作自然松弛，不刻意摆拍。
表情平静克制，眼神柔和，略微疏离，带一点若有所思的情绪，嘴唇自然微张或轻闭，状态慵懒、安静、细腻。
发型为自然蓬松的长发，微凌乱碎发，发丝轻柔，有空气感和层次感，像刚整理过但保留自然随性感。
妆容为高级淡妆，韩系清透底妆，皮肤柔雾光泽，鼻梁与面颊有自然高光，眉形干净，眼妆淡雅但有神，睫毛纤长，唇色为低饱和玫瑰豆沙色或奶茶裸粉色。
服装为简约高级风：米白色紧身罗纹针织背心，外搭宽松白衬衫或柔软针织开衫，下装为高腰半裙或简约短裤，布料柔软贴合身形但不过分暴露，呈现自然身体线条与文艺感。
画面强调细腻质感、柔和色调、轻法式与韩系杂志感结合，真实摄影感，电影级肤色，细节丰富，层次分明，构图克制，高级审美，时尚 编辑人像，柔和的电影感人像，细腻的质感，超高细节，逼真，优雅，精致，高端时尚摄影，含蓄的性感，简洁的构图。`,
    category: "photography",
    tags: ["creative", "experimental", "chinese-style"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Vertical Artistic Portrait of a Young Eastern Woman",
    imageUrl: "/prompts/vertical-artistic-portrait-of-a-young-eastern-woman.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @zhiyangzhu22222"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-165",
    slug: "autobots-assembled-at-lunar-base",
    title: "Autobots Assembled at Lunar Base",
    prompt: `Image 1: All Autobots assembled at the lunar base, Earth suspended in the starry sky behind them, Cybertronian flag waving.

Image 2: All Decepticons lined up on an alien warship deck, Megatron seated on his throne surveying the entire army.`,
    originalPrompt: `图片1：汽车人全员月球基地集结，地球悬于身后星空，赛博坦旗帜飘扬

图片2：霸天虎全员列阵外星战舰甲板，威震天坐于王座俯视全军`,
    category: "photography",
    tags: ["creative", "experimental"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Autobots Assembled at Lunar Base",
    imageUrl: "/prompts/autobots-assembled-at-lunar-base.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @songguoxiansen"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-166",
    slug: "naturalist-style-food-specimen-cross-section",
    title: "Naturalist-Style Food Specimen Cross-Section",
    prompt: `A single piece/slice/specimen of [food name], dissected in the manner of a naturalist master discovering a wild specimen.
Cut open, spread apart, pinned down — like a precious museum artifact,
yet illuminated as if Caravaggio were shooting for National Geographic.
Every internal structure glows with the truth of its own material.
The cross-section is sharp to the point of near violence. The interior is beautiful to the point of near sanctity.
The image presents the complete specimen:
One half remains intact, displaying [exterior surface description: texture/color/pattern];
The other half is cut open to the core, [internal core structure description: the 1–2 most important internal visual features] clearly visible.
[Add 1–2 sentences describing the most visually striking cross-section details of this food]
Background: pure black velvet.
The [food name] floats within it, as if something precious and dangerous.
Annotation text hugs the edges of structures closely, in a handwritten serif font, never floating in mid-air.
The image includes the following annotations, each annotation in three lines: first line is the structure name, second line is composition data, third line is a plain-language explanation:
[Structure 01 name]
[Composition/data description]
[What this structure does, why it matters]

[Structure 02 name]
[Composition/data description]
[What this structure does, why it matters]
[Structure 03 name]
[Composition/data description]
[What this structure does, why it matters]
[Structure 04 name]
[Composition/data description]
[What this structure does, why it matters]
[Structure 05 name]
[Composition/data description]
[What this structure does, why it matters]

[Structure 06 name]
[Composition/data description]
[What this structure does, why it matters]
Omit the rest; if there are more, continue in this format.
Main title, upper left corner, warm ivory uppercase font:
[Food Name] · Dissection

Italic subtitle immediately below:
[A single sentence revealing the essence of this food, no more than 15 characters]

Overall aesthetic: Audubon naturalist illustration × Caravaggio chiaroscuro × the most beautiful scientific photography ever made.
4K precision, specimen lighting, ultimate internal detail.
No clinical feel whatsoever — everything is alive.
Realistic style, not a schematic diagram, not a cartoon, not a simplified illustration.
Every material has authentic physical texture:
rough, smooth, moist, dry, dense, porous.`,
    originalPrompt: `一颗/一块/一枚【食物名称】，以博物学大师发现野外标本的方式解剖。
剖开、展开、固定——如同博物馆的珍贵藏品，
却以卡拉瓦乔为《国家地理》掌镜时的光线照亮。
每一个内部结构都以自身的材质真相发光。
截面锋利得近乎暴力。内部美丽得近乎神圣。
画面中呈现完整标本：
一半保持原状，展示【外表面描述：质感/颜色/纹理】；
另一半剖开至核心，【内部核心结构描述：最重要的1—2个内部视觉特征】清晰可见。
【补充1—2句该食物最具视觉张力的横截面细节描述】
背景：纯粹的黑丝绒。
【食物名称】悬浮其中，如同某件珍贵而危险的事物。
标注文字紧贴结构边缘，手写感衬线字体，绝不悬空飘浮。
画面包含以下标注，每处标注三行：第一行结构名称，第二行成分数据，第三行一句人话：
【结构01名称】
【成分／数据说明】
【这个结构在做什么，为什么重要】

【结构02名称】
【成分／数据说明】
【这个结构在做什么，为什么重要】
【结构03名称】
【成分／数据说明】
【这个结构在做什么，为什么重要】
【结构04名称】
【成分／数据说明】
【这个结构在做什么，为什么重要】
【结构05名称】
【成分／数据说明】
【这个结构在做什么，为什么重要】

【结构06名称】
【成分／数据说明】
【这个结构在做什么，为什么重要】
省略其他如果有继续保持这个格式
主标题，左上角，暖象牙白大写字体：
【食物名称】·解剖

斜体副标题紧随其下：
【一句揭示这种食物本质的话，不超过15字】

整体气质：奥杜邦博物插画×卡拉瓦乔光影×有史以来最美的科学摄影。
4K精度，标本照明，极致内部细节。
没有任何临床感，一切都鲜活。
写实风格，非示意图，非卡通，非简化图解。
每一种材质都有真实的物理质感：
粗糙的、光滑的、湿润的、干燥的、致密的、疏松的。`,
    category: "photography",
    tags: ["creative", "experimental", "illustration"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Naturalist-Style Food Specimen Cross-Section",
    imageUrl: "/prompts/naturalist-style-food-specimen-cross-section.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @GeekCatX"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prompt-167",
    slug: "polaroid-frame-breakout-scene",
    title: "Polaroid Frame Breakout Scene",
    prompt: `An image of a person captured in a Polaroid photo, with that person breaking out of the frame. Generate an image with Japanese text written on it.

← Image below
Generated with GPT Image-2.`,
    originalPrompt: `ポラロイド写真の中に人が写っていて、その人がフレームから外に飛び出している画像。日本語が書いてある画像生成して

←下の画像
GPT Image-2で生成したやつ→`,
    category: "photography",
    tags: ["creative", "experimental", "japanese"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Polaroid Frame Breakout Scene",
    imageUrl: "/prompts/polaroid-frame-breakout-scene.jpg",
    breakdown: {
      subject: "",
      style: "",
      lighting: "",
      composition: "",
      details: "",
    },
    tips: ["By @MajaDesignJP"],
    featured: false,
    createdAt: "2025-04-01",
  },
  // ─── Mother's Day Collection ─────────────────────────────────────────────
  {
    id: "prompt-168",
    slug: "mothers-day-photo-card-growing-together",
    title: "Mother's Day Tribute Poster — Thank You for Growing with Me",
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
generic Mother's Day template, commercial greeting card, excessive flowers, hearts, gift boxes, teddy bears, 3D typography, plastic skin, changing identities, fake family look, random text, horror palette, heavy black platform, crowded collage.

← Upload a photo of you and your mom`,
    category: "poster",
    tags: ["mothers-day", "tribute-poster", "photo-card", "family", "love", "holiday", "personalized", "flat-graphic"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "intermediate",
    imageAlt: "Mother's Day tribute poster with MOM typography, mother-daughter photo transformed into flat graphic art style",
    imageUrl: "/prompts/mothers-day-photo-card-growing-together.jpg",
    breakdown: {
      subject: "Real mother-daughter photo transformed into flat graphic tribute poster",
      style: "High-end flat graphic poster with screen-print texture and paper grain",
      lighting: "Warm spring-like warmth, soft paper texture, quiet daylight",
      composition: "Giant MOM/MOTHER'S DAY text as structural element, photo as emotional center",
      details: "Warm ivory background, muted coral typography, dusty rose accents, lithograph grain",
    },
    tips: [
      "Upload a clear photo of you and your mom — the AI preserves real identities",
      "The poster transforms your photo into a refined flat graphic art style",
      "Works beautifully as a social media tribute or printed gift",
      "The AI integrates typography as a structural element, not just a title overlay",
    ],
    featured: true,
    createdAt: "2025-05-08",
  },
  {
    id: "prompt-169",
    slug: "mothers-day-mom-silhouette-poster",
    title: "Mother's Day MOM Silhouette Art Poster",
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
    category: "poster",
    tags: ["mothers-day", "silhouette", "flat-graphic", "art-print", "typography", "poster", "holiday", "warm-tones"],
    aiModels: ["gpt-image-2", "chatgpt", "midjourney"],
    difficulty: "advanced",
    imageAlt: "High-end flat graphic Mother's Day poster with monumental MOM letters, mother-child silhouette, warm coral and ivory palette",
    imageUrl: "/prompts/mothers-day-mom-silhouette-poster.jpg",
    breakdown: {
      subject: "Monumental MOM typography as shelter with mother-child silhouette figures",
      style: "High-end flat graphic poster with screen-print texture and lithograph grain",
      lighting: "Gentle spring warmth, soft paper texture, pale gold sun glow",
      composition: "Giant MOM letters as structural scene, O as doorway, figures on platform",
      details: "3-4 color palette: warm ivory, soft coral, warm umber silhouettes, pale gold accent",
    },
    tips: [
      "No photo upload needed — this is pure AI art generation",
      "The prompt is highly detailed to avoid common AI poster pitfalls (horror mood, dark tones)",
      "Perfect as printable wall art, social media post, or digital greeting",
      "The flat graphic style with screen-print texture gives it a collectible art-print quality",
    ],
    featured: true,
    createdAt: "2025-05-08",
  },
  {
    id: "prompt-170",
    slug: "mothers-day-elegant-portrait-reading",
    title: "Mother's Day Portrait Tribute — Today Mom Is the Main Character",
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
misspelling MOTHER'S DAY, using MOM as the main title, AI beauty filter, plastic skin, changing identity, unrealistic youthfulness, generic portrait poster, commercial holiday template, excessive flowers, hearts, gift boxes, random typography, fake branding, 3D render, horror colors.

← Upload a portrait photo of your mom`,
    category: "poster",
    tags: ["mothers-day", "portrait", "tribute", "flat-graphic", "typography", "holiday", "personalized"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "intermediate",
    imageAlt: "High-end Mother's Day portrait tribute poster with MOTHER'S DAY typography, mom as central dignified figure",
    imageUrl: "/prompts/mothers-day-elegant-portrait-reading.jpg",
    breakdown: {
      subject: "Mother's real portrait as central figure with MOTHER'S DAY typography",
      style: "High-end flat poster with art book cover quality, screen-print texture",
      lighting: "Gentle, elegant, warm paper feel with soft natural presence",
      composition: "Mother centered and dignified, MOTHER'S DAY as background structure",
      details: "Warm ivory, dusty rose, muted coral palette, lithograph grain, paper texture",
    },
    tips: [
      "Upload a portrait photo of your mom — the AI preserves her real identity and temperament",
      "The poster celebrates her as a person, not just as 'mom'",
      "Works best with photos showing her natural expression and personality",
      "The flat graphic style transforms any photo into gallery-worthy art",
    ],
    featured: true,
    createdAt: "2025-05-08",
  },
  {
    id: "prompt-171",
    slug: "mothers-day-text-overlay-love",
    title: "Mother's Day Memory Poster — I Grew Up Inside Your Love",
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
ignoring the uploaded photo, using the uploaded photo only as style inspiration, generating a new family scene, changing identities, AI face replacement, unrecognizable people, embedding the photo too abstractly, cheap vintage filter, messy scrapbook collage, too many frames, fake old-photo damage, random typography, commercial greeting card style, 3D render, horror palette.

← Upload a photo of you and your mom`,
    category: "poster",
    tags: ["mothers-day", "memory-poster", "text-overlay", "typography", "photo-card", "holiday", "personalized", "flat-graphic"],
    aiModels: ["gpt-image-2", "chatgpt"],
    difficulty: "intermediate",
    imageAlt: "Mother's Day memory poster with photo visible through MOTHER'S DAY typography, warm archival paper texture",
    imageUrl: "/prompts/mothers-day-text-overlay-love.jpg",
    breakdown: {
      subject: "Real mother-child photo as emotional core with MOTHER'S DAY typographic structure",
      style: "High-end flat art poster with archival paper texture and lithograph feel",
      lighting: "Warm nostalgic atmosphere, aged ivory paper, soft print grain",
      composition: "Uploaded photo as central image, MOTHER'S DAY text framing or overlapping",
      details: "Aged ivory, faded coral, dusty rose palette, slight misregistration, warm print grain",
    },
    tips: [
      "Upload a meaningful photo — the AI keeps it recognizable as the poster's emotional core",
      "The photo won't be replaced or reimagined; it stays visibly yours",
      "Works beautifully with childhood photos or recent moments together",
      "The typography frames your memory like a treasured printed photograph",
    ],
    featured: true,
    createdAt: "2025-05-08",
  },

  // ─── May 11, 2025 Batch ────────────────────────────────────────────────────

  {
    id: "prompt-172",
    slug: "isometric-city-block-illustration",
    title: "Isometric City Block — Vibrant Vector Illustration",
    prompt: `Create an isometric illustration of a vibrant city block with detailed buildings, tiny people walking on sidewalks, trees lining the streets, and small shops with colorful awnings. The style should be clean vector art with a warm color palette. Include subtle details like a cat sitting in a window, a street musician, and steam rising from a manhole cover.`,
    category: "infographic",
    tags: ["isometric", "city", "vector-art", "illustration", "architecture", "detailed", "warm-palette", "urban"],
    aiModels: ["gpt-image-2"],
    difficulty: "intermediate",
    imageAlt: "Vibrant isometric city block illustration with colorful buildings, tiny people, trees, and shops in clean vector art style",
    imageUrl: "/prompts/isometric-city-block-illustration.jpg",
    breakdown: {
      subject: "A lively city block rendered in isometric perspective with buildings, people, and street-level details",
      style: "Clean vector art with flat shading, warm and inviting color palette",
      lighting: "Bright daylight with subtle warm tones, soft ambient shadows from buildings",
      composition: "Isometric grid layout showing a full city block from an elevated angle",
      details: "Cat in window, street musician, steam from manhole, colorful awnings, trees lining sidewalks",
    },
    tips: [
      "Isometric prompts work best when you specify exact small details — it forces the AI to fill the scene",
      "Mentioning 'clean vector art' prevents the AI from going photorealistic",
      "Great for website hero sections, app illustrations, or social media graphics",
      "Try swapping the city theme for a campus, village, or space station for different vibes",
    ],
    featured: true,
    createdAt: "2025-05-11",
  },
  {
    id: "prompt-173",
    slug: "pathetic-art-emotional-creature",
    title: "Pathetic Art — MS Paint Redraw Challenge",
    prompt: `Redraw the attached image in the most clumsy, scribbly, and utterly pathetic way possible. Use a white background, and make it look like it was drawn in MS Paint with a mouse. It should be vaguely similar but also not really, kind of matching but also off in a confusing, awkward way, with that low-quality pixel-by-pixel feel that really emphasizes how ridiculously bad it is. Actually, you know what, whatever, just draw it however you want.`,
    category: "character",
    tags: ["pathetic-art", "ms-paint", "crude-style", "expressive", "redraw", "meme", "internet-art", "scribbly"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Deliberately crude MS Paint-style redraw of an image with clumsy scribbly lines on white background",
    imageUrl: "/prompts/pathetic-art-emotional-creature.jpg",
    breakdown: {
      subject: "A redraw of any reference image in the most clumsy, pathetic way possible",
      style: "MS Paint with a mouse — pixel-by-pixel, low-quality, deliberately bad",
      lighting: "White background, flat, no complex lighting",
      composition: "Vaguely similar to the original but off in a confusing, awkward way",
      details: "Scribbly lines, pixel-level crudeness, intentional mismatches, the worse the better",
    },
    tips: [
      "This viral 'pathetic art' trend works by attaching any image and asking AI to redraw it badly",
      "The magic is in the prompt's casual tone — 'whatever, just draw it however you want' gives the AI permission to be messy",
      "Works best when you attach a well-known image (a famous painting, a pet photo, a meme)",
      "Source: neuronad.com — one of the hottest AI art trends of 2025",
    ],
    featured: true,
    createdAt: "2025-05-11",
  },
  {
    id: "prompt-174",
    slug: "vr-headset-exploded-view-technical",
    title: "VR Headset Exploded View — Product Poster",
    prompt: `{
  "type": "产品爆炸视图海报",
  "subject": "VR 头显",
  "style": "简洁的高科技 3D 渲染，摄影棚灯光，发光装饰",
  "background": "柔和的紫蓝色渐变",
  "header": {
    "logo": "∞ Meta Quest 3",
    "subtitle": "以全新的结构，重塑全新的现实。"
  },
  "layout": {
    "centerpiece": "VR 头显的垂直堆叠爆炸视图，展示了 9 层不同的内部组件：外壳、摄像头传感器、带芯片的主板、Pancake 透镜、内部框架、电池组、侧带、顶部头带和面部接口衬垫。",
    "callout_labels": {
      "count": 8,
      "left_side": [
        "Snapdragon® XR2 Gen 2\\n卓越的处理性能，带来实时沉浸体验。",
        "可调节 IPD 机构\\n为广大用户提供舒适的佩戴感。",
        "精密设计的头带\\n追求舒适与稳定的工程学设计。"
      ],
      "right_side": [
        "前面板\\n精致的设计与优化的重量平衡。",
        "追踪摄像头\\n实现高精度的位置追踪与环境感知。",
        "Pancake 透镜\\n轻薄设计，提供广阔视野与清晰画质。",
        "高性能电池\\n优化电源设计，支持长时间续航。",
        "柔软的面部接口\\n确保长时间佩戴依然舒适。"
      ]
    },
    "footer": {
      "left_text_block": {
        "headline": "体验，源于结构的进化。",
        "body": "每一个零件都蕴含着支撑沉浸式体验的前沿科技与匠心设计。Meta Quest 3 从内部构建未来，为您带来超乎想象的体验。"
      },
      "right_logo": "∞ Meta"
    }
  }
}`,
    originalPrompt: `{
  "type": "产品爆炸视图海报",
  "subject": "VR 头显",
  "style": "简洁的高科技 3D 渲染，摄影棚灯光，发光装饰",
  "background": "柔和的紫蓝色渐变",
  "header": { "logo": "∞ Meta Quest 3", "subtitle": "以全新的结构，重塑全新的现实。" },
  "layout": { "centerpiece": "VR 头显的垂直堆叠爆炸视图，展示了 9 层不同的内部组件" }
}`,
    category: "product",
    tags: ["exploded-view", "technical", "vr-headset", "product-poster", "3d-render", "chinese-prompt", "json-prompt", "meta-quest"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "VR headset exploded view product poster showing 9 internal component layers with callout labels on purple-blue gradient",
    imageUrl: "/prompts/vr-headset-exploded-view-technical.jpg",
    breakdown: {
      subject: "Meta Quest 3 VR headset with 9 component layers shown in vertical stacked exploded view",
      style: "Clean high-tech 3D render with studio lighting and glowing accents",
      lighting: "Studio lighting with soft purple-blue gradient background",
      composition: "Vertical stacked exploded view with 8 callout labels (3 left, 5 right) and header/footer layout",
      details: "Snapdragon XR2 Gen 2 chip, Pancake lenses, tracking cameras, battery, face interface, adjustable IPD mechanism",
    },
    tips: [
      "This is a structured JSON prompt — GPT Image 2 can interpret JSON layout instructions directly",
      "The Chinese text in the prompt is part of the original design — GPT Image 2 renders Chinese typography well",
      "Swap the product (VR headset) and component list for any product to create similar exploded-view posters",
      "By @WORY via appark.ai",
    ],
    featured: true,
    createdAt: "2025-05-11",
  },
  {
    id: "prompt-175",
    slug: "learn-english-educational-infographic",
    title: "Learn English from Photos — Vocabulary Annotation Style",
    prompt: `【任务目标】 在照片中识别 5 个物品，并为每个物品添加：1. 英文单词 2. 简单英文释义 3. 可选的简短例句

【标注数量】只标记 5 个物品，不要超过 5 个。优先选择日常生活中常见、容易学习的物品。如果画面里物品很多，只挑最典型的 5 个。

【画法要求】用白色细线手绘风格标注。线条像随手画上去的，一笔画感。沿着物体边缘轻轻描一圈轮廓。可以加少量箭头、虚线辅助指向。不要太工整，保持自然松弛感。不要把画面画满，保留留白。

【文字格式】每个物品旁边写：英文单词、一句简单英文解释、可选一句简短例句。参考格式：
coffee — a drink you can have in the morning. Example: I drink coffee every day.
bread — soft food made from flour. Example: I had bread for breakfast.

【文字风格】以英文为主。解释要简单，适合初学者。不要写得像词典，更像看图学单词的小笔记。单词更突出，解释和例句稍小一点。

【整体感觉】像日常照片上的英语学习手写注释。清爽、自然、有留白。像社交媒体上的轻学习内容。不要太复杂，不要太满，不要太装饰化。

【输出重点】重点是：只选 5 个物品 → 标英文单词 → 配简单用法解释 → 让整张图看起来轻松自然。Make the aspect ratio 9:16`,
    originalPrompt: `【任务目标】 在照片中识别 5 个物品，并为每个物品添加：1. 英文单词 2. 简单英文释义 3. 可选的简短例句

【标注数量】只标记 5 个物品，不要超过 5 个。优先选择日常生活中常见、容易学习的物品。

【画法要求】用白色细线手绘风格标注。线条像随手画上去的，一笔画感。沿着物体边缘轻轻描一圈轮廓。

【文字风格】以英文为主。解释要简单，适合初学者。不要写得像词典，更像看图学单词的小笔记。

【整体感觉】像日常照片上的英语学习手写注释。清爽、自然、有留白。Make the aspect ratio 9:16`,
    category: "infographic",
    tags: ["education", "english", "vocabulary", "annotation", "photo-learning", "chinese-prompt", "hand-drawn", "social-media"],
    aiModels: ["gpt-image-2"],
    difficulty: "beginner",
    imageAlt: "Photo with hand-drawn white line annotations labeling 5 everyday objects with English vocabulary words and simple definitions",
    imageUrl: "/prompts/learn-english-educational-infographic.jpg",
    breakdown: {
      subject: "Upload any photo — the AI identifies 5 objects and labels them with English vocabulary",
      style: "White hand-drawn line annotations over the photo, casual one-stroke sketch feel",
      lighting: "Uses the original photo's lighting — annotations are white overlays",
      composition: "9:16 vertical format, 5 labeled items with breathing room and whitespace",
      details: "Each label has: English word (prominent), simple definition, optional example sentence",
    },
    tips: [
      "Upload any everyday photo — kitchen, desk, street scene — and the AI turns it into a vocabulary card",
      "The Chinese prompt instructions produce better results than English for this particular style",
      "Perfect for language teachers creating social media content or study materials",
      "By @林悦己Cheer via appark.ai",
    ],
    featured: true,
    createdAt: "2025-05-11",
  },
  {
    id: "prompt-176",
    slug: "2008-family-photo-recreation",
    title: "2008 Family Photo — Chinese Park Snapshot Recreation",
    prompt: `A candid family snapshot styled like a consumer digital camera photo from around 2008, showing a Chinese family of three posing closely together in a public park in springtime. The mother is on the left, crouching and leaning in, wearing a purple cardigan over a dark patterned top, blue jeans, and carrying a black shoulder bag. The child is in the center, standing or half-squatting between the parents, wearing a navy zip-up jacket with white and red striped sleeves and a large "86" print on the chest, with olive or brown pants. The father is on the right, crouching close to the child, wearing a black long-sleeve shirt, blue jeans, a wristwatch, and a gray backpack with visible shoulder straps. All three are gathered tightly and looking toward the camera in a typical casual family-photo pose. Place them on a light stone walkway beside a calm pond edged with large ornamental rocks. In the background, show lush green trees with fresh leaves, a traditional Chinese pavilion with a gray tiled roof, and small groups of park visitors scattered along the path and bridge area. Lighting is soft bright daytime with slight haze, realistic early-spring colors, and the modest image quality of an older compact camera: slightly flat contrast, mild blur, natural noise, and an authentic point-and-shoot snapshot feel. Add a yellow digital camera timestamp in the bottom right corner reading 2008/04/26 10:25. Composition should feel like a real family travel photo taken informally in China in the late 2000s, horizontal framing, eye-level perspective, documentary realism, no stylization.`,
    originalPrompt: `一张来自 2008 年左右的写实数码相机照片，展示了一个中国三口之家在中国某公园内的合影。场景看起来就像是用早期的消费级卡片机拍摄的普通周末家庭快照，带有轻微的柔焦、淡淡的雾感、自然日光，以及 2000 年代末期小型数码相机摄影特有的随性写实感。一家人位于前景中心，蹲在平静池塘边的一条铺砌小路旁。照片中共有 3 人：左侧是母亲，中间是小男孩，右侧是父亲。母亲身穿紫色开衫，内搭深色上衣，下着蓝色牛仔裤，背着一个黑色单肩包；小男孩穿着一件未拉拉链的深蓝色运动外套，袖子上有白色和红色的条纹，胸前印有清晰的"86"字样，下着橄榄色或棕色长裤；父亲穿着深蓝色或黑色长袖衬衫，搭配蓝色牛仔裤，戴着手表，背着一个带有明显肩带的背包。他们的头向内倾斜，摆出亲密的家庭姿势，对着镜头微笑。背景中可以看到水对面有一座灰瓦屋顶的中国传统凉亭、池塘边不规则的装饰性岩石、长满嫩绿叶片的春季树木，以及远处零星的公园游客。构图应呈现出真实的个人旅行或家庭相册照片的感觉，而非精致的专业肖像。使用 4:3 的长宽比，平视构图，色彩饱满但色调略显柔和，天空有轻微的过曝感，右下角带有经典的黄色数码相机时间戳，显示为 2008/04/26 10:25。`,
    category: "photography",
    tags: ["retro", "family-photo", "2008", "digital-camera", "nostalgia", "chinese-family", "park", "point-and-shoot", "timestamp"],
    aiModels: ["gpt-image-2"],
    difficulty: "advanced",
    imageAlt: "Realistic 2008-era digital camera family photo of Chinese family of three in a park with traditional pavilion and yellow timestamp",
    imageUrl: "/prompts/2008-family-photo-recreation.jpg",
    breakdown: {
      subject: "Chinese family of three (mother, father, child) posing by a calm pond in a public park",
      style: "Authentic consumer digital camera photo from 2008 — flat contrast, mild blur, natural noise",
      lighting: "Soft bright daytime with slight haze, early-spring natural light, slightly overexposed sky",
      composition: "Horizontal 4:3 framing, eye-level, family centered on stone walkway, pavilion in background",
      details: "Yellow timestamp '2008/04/26 10:25' in corner, specific clothing details (purple cardigan, '86' jacket), ornamental rocks, park visitors",
    },
    tips: [
      "The extreme level of detail (clothing, timestamp, background elements) is what makes this prompt work — it forces photorealism",
      "The original Chinese prompt is even more detailed — use originalPrompt field for the full Chinese version",
      "Change the year, timestamp, and clothing to recreate any era of family photography",
      "By @投机实验室 via appark.ai",
    ],
    featured: true,
    createdAt: "2025-05-11",
  },
];

// ─── Helper Functions ───────────────────────────────────────────────────────

export function getPromptsByCategory(category: AIPromptCategory): AIPrompt[] {
  return aiPrompts.filter((p) => p.category === category);
}

export function getFeaturedPrompts(): AIPrompt[] {
  return aiPrompts.filter((p) => p.featured);
}

export function getPromptBySlug(slug: string): AIPrompt | undefined {
  return aiPrompts.find((p) => p.slug === slug);
}

/** Whether a prompt has a full detail page (i.e. has filled-in breakdown content) */
export function hasDetailPage(prompt: AIPrompt): boolean {
  return true; // All prompts have detail pages
}

export function searchPrompts(query: string): AIPrompt[] {
  const q = query.toLowerCase();
  return aiPrompts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.prompt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getRelatedPrompts(
  prompt: AIPrompt,
  limit: number = 4
): AIPrompt[] {
  return aiPrompts
    .filter(
      (p) => p.id !== prompt.id && p.category === prompt.category
    )
    .slice(0, limit);
}

// Display order for featured prompts on homepage
const FEATURED_ORDER = [
  "prompt-172", // Isometric City Block (May 11 batch)
  "prompt-173", // Pathetic Art Emotional Creature
  "prompt-176", // 2008 Family Photo Recreation
  "prompt-174", // VR Headset Exploded View
  "prompt-175", // Learn English Educational Infographic
  "prompt-169", // Mother's Day MOM Silhouette Poster
  "prompt-171", // Mother's Day Text Overlay — I Grew Up Inside Your Love
  "prompt-170", // Mother's Day Elegant Portrait — Reading Mom
  "prompt-168", // Mother's Day Photo Card — Growing Together
  "prompt-130", // Silhouette Universe Narrative Poster
];

export function getFeaturedAIPrompts(limit: number = 6): AIPrompt[] {
  const featured = aiPrompts.filter((p) => p.featured);
  // Sort by explicit display order, then append any extras
  featured.sort((a, b) => {
    const ai = FEATURED_ORDER.indexOf(a.id);
    const bi = FEATURED_ORDER.indexOf(b.id);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
  return featured.slice(0, limit);
}
