/**
 * Drawing Prompt Generator — Core Prompt Library
 *
 * 交互模型：用户在 6 个独立维度中各选一个选项，组合生成 Prompt
 * 维度：Theme / Subject / Mood / Color Palette / Style / Challenge
 *
 * 详见：PROMPT_LIBRARY_SPEC.md
 */

// ─────────────────────────────────────────────
// 类型定义
// ─────────────────────────────────────────────

export interface DimensionOption {
  id: string;
  label: string;       // 显示给用户的名称
  emoji: string;       // 图标
  description: string; // 简短说明（hover 提示）
  values: string[];    // 该选项下的词库
}

export interface Dimension {
  key: DimensionKey;
  label: string;       // 维度名称（对应卡片标题）
  description: string; // 维度说明
  options: DimensionOption[];
}

export type DimensionKey =
  | "theme"
  | "subject"
  | "mood"
  | "colorPalette"
  | "style"
  | "challenge";

// ─────────────────────────────────────────────
// 维度一：Theme（场景主题）
// 决定画面发生在什么世界/背景下
// ─────────────────────────────────────────────

const themeDimension: Dimension = {
  key: "theme",
  label: "Theme",
  description: "The world your drawing takes place in",
  options: [
    {
      id: "fantasy",
      label: "Fantasy",
      emoji: "",
      description: "Magic, dragons, ancient kingdoms",
      values: [
        "in an enchanted forest where the trees whisper secrets",
        "at the top of a tower that pierces through the clouds",
        "inside a library that exists between dimensions",
        "on a floating island drifting through a sea of clouds",
        "in a valley where it rains upward",
        "at the ruins of a castle swallowed by an ancient glacier",
        "in a city built entirely on the back of a sleeping giant",
        "at a crossroads where four different seasons meet",
        "inside a clock tower that controls the flow of time",
        "on a mountain peak where the gods once held council",
        "in a forest where every tree is a petrified ancient warrior",
        "at the shore of a lake that reflects a different sky",
        "in a vast underground cavern lit by bioluminescent fungi",
        "on a bridge made of frozen lightning over an abyss",
        "in a meadow where flowers bloom only at midnight",
      ],
    },
    {
      id: "scifi",
      label: "Near Future",
      emoji: "",
      description: "Tomorrow's world, quietly changed",
      values: [
        "in a small apartment where the windows show a city that never fully sleeps",
        "at a train station where the platforms are half-empty at 6am",
        "in a community garden on the roof of a high-rise",
        "at a corner café where people still meet face to face",
        "in a neighborhood that used to be something else entirely",
        "on a commuter ferry crossing a harbor at dawn",
        "in a public library that has become the last quiet place in the city",
        "at a night market where old recipes are sold alongside new ones",
        "in a small repair shop where broken things are given a second life",
        "on a balcony overlooking a street that is slowly being reclaimed by plants",
        "in a school classroom after the last student has gone home",
        "at a bus stop where strangers share a bench in the rain",
        "in a community center where three generations are learning together",
        "on a rooftop where someone has planted a small vegetable garden",
        "in a laundromat where the regulars have become something like family",
      ],
    },
    {
      id: "nature",
      label: "Nature",
      emoji: "",
      description: "Forests, oceans, mountains, wilderness",
      values: [
        "at the edge of a cliff overlooking a sea of morning clouds",
        "deep in an old-growth forest where sunlight barely reaches the ground",
        "on a rocky coastline battered by enormous waves",
        "in a meadow of wildflowers during a summer thunderstorm",
        "at the base of a waterfall in a hidden jungle valley",
        "on a glacier slowly calving into a steel-grey sea",
        "in a desert at night, under a sky blazing with stars",
        "at the mouth of a cave behind a curtain of falling water",
        "on a volcanic island where new land is being born",
        "in a bamboo forest during a gentle rain",
        "at the summit of a mountain above the clouds",
        "in a kelp forest swaying in the ocean current",
        "on a tundra during the brief, explosive Arctic summer",
        "in a mangrove forest at high tide",
        "on a salt flat that stretches to the horizon",
      ],
    },
    {
      id: "urban",
      label: "Urban",
      emoji: "",
      description: "City life, streets, modern spaces",
      values: [
        "on a rain-slicked street reflecting neon signs",
        "in a subway car at 3am with only a few passengers",
        "on a rooftop overlooking a city waking up at dawn",
        "in a crowded market where every stall sells something different",
        "at a crosswalk in the middle of a city downpour",
        "in a laundromat at midnight, the only customer",
        "on a fire escape overlooking an alley full of street art",
        "in a diner where the same regulars come every morning",
        "in a park where the city noise fades to a distant hum",
        "on a bridge over a river cutting through the city",
        "in a bookshop that somehow survives in the age of the internet",
        "in a hospital waiting room at 4am",
        "on a rooftop bar as a thunderstorm rolls in",
        "in a construction site where a new building is rising",
        "at a bus stop where the bus is always late",
        "in a small noodle shop where the owner has been cooking the same dish for 30 years",
        "on a side street where children are playing after school",
        "in a flower market at dawn before the city wakes up",
        "at a neighborhood barbershop on a Saturday afternoon",
        "in a community garden squeezed between two apartment buildings",
      ],
    },
    {
      id: "dark",
      label: "Shadow & Quiet",
      emoji: "",
      description: "The darker side of ordinary life",
      values: [
        "in a 24-hour convenience store at 3am with one other customer",
        "in an empty school hallway the day after the last day of term",
        "at a kitchen table where a difficult conversation just ended",
        "in a childhood bedroom that has been left exactly as it was",
        "on a park bench where someone has left flowers with no note",
        "in a hospital corridor where the lights flicker at the end",
        "at a window watching the street below in the middle of the night",
        "in a house where all the clocks stopped at the same time",
        "on a road through a town that used to be full of people",
        "in a cathedral where the stained glass shows scenes of the future",
        "in a ballroom where the dancers have been frozen mid-step",
        "inside a mirror that shows a world slightly wrong",
        "at the edge of a forest that no one who enters ever leaves",
        "in a graveyard where the headstones are all blank",
        "on a moor in the middle of a moonless night",
      ],
    },
    {
      id: "cozy",
      label: "Cozy",
      emoji: "",
      description: "Warmth, comfort, everyday magic",
      values: [
        "in a kitchen that smells of cinnamon and fresh bread",
        "in a cozy reading nook with rain pattering on the window",
        "in a garden full of overgrown roses and old stone paths",
        "in a small cottage with a fire burning in the hearth",
        "on a porch swing watching a summer thunderstorm roll in",
        "in a treehouse built by a parent for a child",
        "in a bakery before it opens, when the bread is still warm",
        "in a library where the shelves go up to the ceiling",
        "on a beach at the end of a long summer day",
        "in a greenhouse full of plants that have outgrown their pots",
        "in a small town on the first day of autumn",
        "in a bedroom with fairy lights and too many pillows",
        "at a farmers market on a crisp autumn morning",
        "in a cabin in the woods during the first snowfall",
        "in a kitchen where three generations are cooking together",
        "at a corner table in a café, watching the rain outside",
        "in a sunlit room where laundry is drying on a line by the window",
        "in a small garden where someone has just planted seeds for spring",
        "on a slow Sunday morning when there is nowhere to be",
        "in a second-hand bookshop where the owner knows every customer by name",
      ],
    },
    {
      id: "surreal",
      label: "Surreal",
      emoji: "",
      description: "Dreams, paradoxes, impossible worlds",
      values: [
        "in a landscape where the sky and the ground have switched places",
        "in a room where all the furniture is growing toward the ceiling",
        "on a staircase that leads to itself",
        "in a desert where the sand is made of broken clocks",
        "in a forest where the trees are made of books",
        "on a road that folds back on itself like a ribbon",
        "in a city where every building is a different scale",
        "on a beach where the waves are made of fabric",
        "in a garden where the flowers are made of light",
        "on a train that travels through memories instead of places",
        "in a house where every door opens to the same room",
        "in a landscape that is slowly being erased",
        "on a bridge between two worlds that don't know about each other",
        "in a room that is both inside and outside at the same time",
        "in a library where the books read themselves aloud",
      ],
    },
    {
      id: "historical",
      label: "Historical",
      emoji: "",
      description: "Ancient civilizations, the weight of history",
      values: [
        "at the foot of a monument being built by a thousand hands",
        "in a medieval great hall during a feast that masks a conspiracy",
        "on the deck of a ship approaching an unknown shore",
        "in a Roman bathhouse where deals are made in whispers",
        "at the gates of a city that is about to fall",
        "in a monastery library where forbidden knowledge is kept",
        "on a battlefield the morning after the fighting has ended",
        "in a market at the crossroads of three civilizations",
        "at the court of a ruler who holds the fate of thousands",
        "on a road that has been walked by armies for a thousand years",
        "in a temple where the old gods are being replaced by new ones",
        "at a harbor where ships from a dozen nations are docked",
        "in a throne room where power is about to change hands",
        "on a hill overlooking a city that will not exist in a century",
        "in a workshop where the tools of a craft are laid out with care",
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// 维度二：Subject（主体人物/生物/物体）
// 决定画面的主角是谁
// ─────────────────────────────────────────────

const subjectDimension: Dimension = {
  key: "subject",
  label: "Subject",
  description: "The main character or focus of your drawing",
  options: [
    {
      id: "human_character",
      label: "Human Character",
      emoji: "",
      description: "People with rich backstories",
      values: [
        "a weary lighthouse keeper",
        "a street musician who hasn't eaten in two days",
        "a retired soldier tending a garden",
        "a child prodigy who has lost their gift",
        "a grandmother who was once a spy",
        "a street artist with a magical paintbrush",
        "a chef who cooks only for people who are grieving",
        "a cartographer mapping a world that keeps changing",
        "a clockmaker who builds clocks that count down to death",
        "a woman who collects other people's lost memories",
        "a blind painter who sees with her hands",
        "a detective who solves crimes that haven't happened yet",
        "a librarian who has read every book in the world",
        "a dancer whose movements can change the weather",
        "a healer who takes on the pain of those she cures",
        "a wandering bard whose songs can change the weather",
        "a shadow thief who steals people's darkest memories",
        "a diplomat who speaks every language except her own",
        "a gravedigger who has been doing this job for 200 years",
        "a night-shift security guard who sees things no one else does",
      ],
    },
    {
      id: "mythical_creature",
      label: "Mythical Creature",
      emoji: "",
      description: "Dragons, spirits, and legendary beings",
      values: [
        "an ancient dragon coiled around a hoard of glowing crystals",
        "a forest spirit with antlers wreathed in autumn leaves",
        "a sea witch with hair made of living seaweed",
        "a phoenix reborn from a pile of ash and embers",
        "a giant made of living coral and barnacles",
        "a mermaid who traded her voice for a pair of wings",
        "a celestial guardian made entirely of starlight",
        "a river goddess emerging from a waterfall at dawn",
        "a shapeshifter who has forgotten their original form",
        "a death god who has fallen in love with a mortal",
        "a crow that carries messages between the living and the dead",
        "a wolf raised by humans who longs to return to the wild",
        "a goblin inventor with a workshop full of impossible machines",
        "a kitsune with nine tails made of moonlight",
        "a leviathan sleeping beneath a frozen sea",
      ],
    },
    {
      id: "animal",
      label: "Animal",
      emoji: "",
      description: "Wildlife and creatures in their element",
      values: [
        "a lone wolf standing at the edge of a frozen lake",
        "a great horned owl perched on a branch in the rain",
        "a humpback whale breaching in a storm-tossed sea",
        "a fox kit taking its first steps in fresh snow",
        "a bear and her cubs watching the northern lights",
        "a monarch butterfly emerging from its chrysalis",
        "a mountain goat standing on an impossibly narrow ledge",
        "a pod of orcas hunting in the shadow of an iceberg",
        "a herd of wild horses running through a wildfire",
        "a storm petrel flying through the eye of a hurricane",
        "a spider web covered in morning dew, catching the first light",
        "a pack of wolves howling at a full moon",
        "a lone tree on a hilltop struck by lightning",
        "a cat sleeping in a patch of afternoon sunlight",
        "a dog waiting by the door for its owner to come home",
      ],
    },
    {
      id: "everyday_person",
      label: "Everyday Person",
      emoji: "",
      description: "Ordinary people in quiet, real moments",
      values: [
        "a baker who arrives at 4am to start the day's bread",
        "an elderly man who feeds the same pigeons every morning",
        "a teenager sitting alone at lunch, drawing in a notebook",
        "a mother watching her child sleep from the doorway",
        "a street vendor packing up at the end of a long day",
        "a young woman reading on a crowded train, lost to the world",
        "a father teaching his daughter to ride a bicycle",
        "an old woman tending a window box of herbs on the third floor",
        "a night-shift nurse eating alone in a hospital cafeteria at 2am",
        "a child pressing their face against a bakery window",
        "a man sitting on his front step, watching the neighborhood wake up",
        "a pair of friends walking home after a long night, not saying much",
        "a teacher staying late to mark papers by lamplight",
        "a young couple sharing one set of earphones on a park bench",
        "a grandmother teaching her grandchild a recipe from memory",
      ],
    },
    {
      id: "object_personified",
      label: "Object / Concept",
      emoji: "",
      description: "Objects and ideas given life",
      values: [
        "a figure made of clocks, all showing different times",
        "a woman whose hair is made of living roots",
        "a man carrying a house on his back like a snail",
        "a child whose shadow is a different person entirely",
        "a figure made of folded paper slowly unfolding",
        "a woman who is slowly becoming a tree",
        "a man whose face is a window looking into another world",
        "a figure walking on the surface of a mirror",
        "a woman whose tears are seeds that grow where they fall",
        "a man whose body is a birdcage containing his own heart",
        "a child whose dreams leak out of their head while they sleep",
        "a figure standing at the intersection of past and future",
        "a woman made entirely of shadows and broken glass",
        "a skeleton in a wedding dress waiting at the altar",
        "a figure made of smoke and old regrets",
      ],
    },
    {
      id: "duo_group",
      label: "Duo / Group",
      emoji: "",
      description: "Two or more figures with a story between them",
      values: [
        "twin sisters — one made of fire, one made of ice",
        "an old man and a young child fishing in silence",
        "two strangers sharing an umbrella at a bus stop",
        "a knight and a dragon who have called a truce",
        "a mother and daughter who look exactly the same age",
        "two soldiers from opposite sides sharing a meal",
        "a ghost and the person who can see her",
        "a child and an ancient tree spirit who have been friends for decades",
        "a couple having an argument in the rain outside a restaurant",
        "a wolf and a lamb sleeping side by side",
        "a robot and an elderly woman playing chess",
        "two explorers at the edge of a map that says 'here be dragons'",
        "a god and a mortal who have fallen in love",
        "a teacher and a student at the moment everything changes",
        "a group of friends on the last night before they go their separate ways",
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// 维度三：Mood（情绪/氛围）
// 决定画面的情感基调
// ─────────────────────────────────────────────

const moodDimension: Dimension = {
  key: "mood",
  label: "Mood",
  description: "The emotional tone of your drawing",
  options: [
    {
      id: "melancholic",
      label: "Melancholic",
      emoji: "",
      description: "Quiet sadness, longing, nostalgia",
      values: [
        "melancholic and dreamlike",
        "quietly sorrowful",
        "heavy with nostalgia",
        "bittersweet and tender",
        "aching with longing",
        "soft with grief",
        "wistful and fading",
        "haunted by what was",
        "gentle and heartbroken",
        "still with loss",
      ],
    },
    {
      id: "epic",
      label: "Epic",
      emoji: "",
      description: "Grand, powerful, awe-inspiring",
      values: [
        "epic and awe-inspiring",
        "triumphant and overwhelming",
        "vast and humbling",
        "charged with destiny",
        "monumental and fierce",
        "thunderous and inevitable",
        "heroic and defiant",
        "grand and unstoppable",
        "legendary and timeless",
        "powerful beyond measure",
      ],
    },
    {
      id: "mysterious",
      label: "Mysterious",
      emoji: "",
      description: "Secrets, shadows, the unknown",
      values: [
        "mysterious and ancient",
        "shrouded in secrets",
        "quietly uncanny",
        "tense with hidden meaning",
        "eerie and still",
        "unsettling and beautiful",
        "dark with possibility",
        "veiled and unknowable",
        "strange and familiar at once",
        "heavy with unspoken things",
      ],
    },
    {
      id: "hopeful",
      label: "Hopeful",
      emoji: "",
      description: "Light, possibility, new beginnings",
      values: [
        "quietly hopeful",
        "fragile but luminous",
        "tender with new beginnings",
        "warm with possibility",
        "gentle and optimistic",
        "soft with wonder",
        "bright despite everything",
        "hopeful yet fragile",
        "full of quiet promise",
        "lit from within",
      ],
    },
    {
      id: "tense",
      label: "Tense",
      emoji: "",
      description: "Danger, urgency, the moment before",
      values: [
        "tense and foreboding",
        "urgent and desperate",
        "charged with danger",
        "the moment before everything changes",
        "claustrophobic and pressing",
        "electric with dread",
        "breathless and still",
        "coiled like a spring",
        "on the edge of catastrophe",
        "silent before the storm",
      ],
    },
    {
      id: "peaceful",
      label: "Peaceful",
      emoji: "",
      description: "Calm, serene, contemplative",
      values: [
        "quiet and contemplative",
        "serene and timeless",
        "deeply at rest",
        "soft and unhurried",
        "still as a held breath",
        "gentle and meditative",
        "warm and content",
        "peaceful beyond words",
        "slow and sacred",
        "at ease with the world",
      ],
    },
    {
      id: "whimsical",
      label: "Whimsical",
      emoji: "",
      description: "Playful, magical, delightfully strange",
      values: [
        "playfully absurd",
        "whimsical and light",
        "delightfully strange",
        "magical and surprising",
        "full of wonder and mischief",
        "joyfully impossible",
        "charming and unexpected",
        "bright with imagination",
        "silly and sincere",
        "enchanting and odd",
      ],
    },
    {
      id: "dark_romantic",
      label: "Dark Romantic",
      emoji: "",
      description: "Gothic beauty, tragic love, haunting elegance",
      values: [
        "gothic and romantic",
        "tragically beautiful",
        "dark with longing",
        "mournful and dignified",
        "hauntingly tender",
        "elegantly doomed",
        "passionate and sorrowful",
        "beautiful in its darkness",
        "aching and inevitable",
        "tender and terrifying",
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// 维度四：Color Palette（色彩倾向）
// 给绘画者明确的色调指引
// ─────────────────────────────────────────────

const colorPaletteDimension: Dimension = {
  key: "colorPalette",
  label: "Color Palette",
  description: "The color mood to guide your drawing",
  options: [
    {
      id: "golden_warm",
      label: "Golden Warm",
      emoji: "",
      description: "Amber, gold, burnt orange, warm brown",
      values: [
        "bathed in golden hour light",
        "in warm amber and burnt sienna tones",
        "lit by the orange glow of a setting sun",
        "in rich gold and deep brown hues",
        "with the warm palette of a harvest evening",
        "in honey and amber light",
        "with the glow of firelight on warm skin",
        "in the golden tones of late afternoon",
        "with a warm, sun-drenched color palette",
        "in ochre, gold, and deep orange",
      ],
    },
    {
      id: "cool_blue",
      label: "Cool Blue",
      emoji: "",
      description: "Deep blue, silver, icy white, midnight",
      values: [
        "in cold blue and silver tones",
        "under the pale light of a winter moon",
        "with an icy, crystalline color palette",
        "in deep navy and frost white",
        "lit by cold blue starlight",
        "in the blue-grey tones of a foggy morning",
        "with a cool, melancholic blue palette",
        "in midnight blue and silver",
        "with the cold clarity of a winter sky",
        "in steel blue and pale grey",
      ],
    },
    {
      id: "neon_vivid",
      label: "Neon & Vivid",
      emoji: "",
      description: "Electric purple, hot pink, neon green, cyan",
      values: [
        "in electric neon colors against deep black",
        "with a vivid cyberpunk color palette",
        "in hot pink, electric blue, and acid green",
        "with glowing neon accents in the darkness",
        "in a saturated, high-contrast color scheme",
        "with the vivid palette of a neon-lit city at night",
        "in electric purple and cyan",
        "with bold, oversaturated colors",
        "in the glowing palette of a rave or festival",
        "with neon light bleeding into deep shadow",
      ],
    },
    {
      id: "earthy_muted",
      label: "Earthy & Muted",
      emoji: "",
      description: "Terracotta, sage, dusty rose, warm grey",
      values: [
        "in muted earthy tones of terracotta and sage",
        "with a dusty, faded color palette",
        "in warm grey and dusty rose",
        "with the muted palette of an old photograph",
        "in soft, desaturated earth tones",
        "with the quiet colors of dried flowers",
        "in clay, sand, and weathered wood tones",
        "with a gentle, washed-out color palette",
        "in the muted greens and browns of the forest floor",
        "with a soft, vintage color palette",
      ],
    },
    {
      id: "monochrome",
      label: "Monochrome",
      emoji: "",
      description: "Black, white, and shades of grey",
      values: [
        "in stark black and white",
        "with a dramatic monochrome palette",
        "in deep shadow and bright highlight only",
        "with the high contrast of ink on white paper",
        "in a full range of grey tones",
        "with the graphic quality of a woodcut print",
        "in charcoal and white chalk on grey paper",
        "with a cinematic black-and-white palette",
        "in the deep blacks and bright whites of chiaroscuro",
        "with a minimal monochrome palette",
      ],
    },
    {
      id: "pastel_soft",
      label: "Pastel & Soft",
      emoji: "",
      description: "Lavender, blush, mint, soft yellow",
      values: [
        "in soft pastel tones of lavender and blush",
        "with a gentle, dreamy color palette",
        "in pale pink, mint, and soft yellow",
        "with the delicate palette of a watercolor sketch",
        "in soft, hazy pastels",
        "with the gentle colors of a spring morning",
        "in blush, cream, and pale lavender",
        "with a soft, romantic color palette",
        "in the light, airy tones of a clear spring day",
        "with a tender, washed-out pastel palette",
      ],
    },
    {
      id: "deep_jewel",
      label: "Deep Jewel Tones",
      emoji: "",
      description: "Emerald, sapphire, ruby, deep violet",
      values: [
        "in rich jewel tones of emerald and sapphire",
        "with a deep, saturated color palette",
        "in ruby red, deep violet, and forest green",
        "with the rich palette of a stained glass window",
        "in deep, luminous jewel colors",
        "with the opulent palette of a Byzantine mosaic",
        "in dark teal, deep purple, and gold",
        "with the rich, saturated colors of a fantasy painting",
        "in the deep, glowing tones of precious stones",
        "with a lush, jewel-toned color palette",
      ],
    },
    {
      id: "sunset_gradient",
      label: "Sunset Gradient",
      emoji: "",
      description: "Pink, orange, purple, transitional light",
      values: [
        "in the gradient of a dramatic sunset",
        "with colors shifting from deep orange to violet",
        "in the pink and purple tones of dusk",
        "with the warm-to-cool gradient of twilight",
        "in the layered colors of a painted sky",
        "with the transitional palette of golden hour to blue hour",
        "in coral, peach, and soft purple",
        "with the glowing palette of a sky on fire",
        "in the rich gradient of a summer sunset",
        "with colors bleeding from warm gold to deep indigo",
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// 维度五：Style（绘画风格）
// 给绘画者明确的技法/风格方向
// ─────────────────────────────────────────────

const styleDimension: Dimension = {
  key: "style",
  label: "Style",
  description: "The artistic style or technique to use",
  options: [
    {
      id: "watercolor",
      label: "Watercolor",
      emoji: "",
      description: "Soft edges, flowing color, translucent layers",
      values: [
        "rendered in loose, expressive watercolor",
        "with soft watercolor washes and bleeding edges",
        "in a delicate watercolor and ink style",
        "with the translucent layers of wet-on-wet watercolor",
        "in a painterly watercolor style with visible brushwork",
        "with the soft, hazy quality of watercolor on wet paper",
        "in a detailed watercolor illustration style",
        "with the spontaneous quality of a watercolor sketch",
      ],
    },
    {
      id: "ink_linework",
      label: "Ink & Linework",
      emoji: "",
      description: "Bold lines, crosshatching, pen and ink",
      values: [
        "in a detailed pen-and-ink style with fine crosshatching",
        "with bold ink lines and minimal color",
        "in a graphic novel ink style",
        "with the precision of technical pen illustration",
        "in a loose, expressive ink sketch style",
        "with dramatic ink washes and fine linework",
        "in the style of a Victorian engraving",
        "with bold black ink on white, no grey tones",
      ],
    },
    {
      id: "oil_painting",
      label: "Oil Painting",
      emoji: "",
      description: "Rich texture, layered color, classical technique",
      values: [
        "in a rich, painterly oil painting style",
        "with the thick impasto texture of oil paint",
        "in the style of a classical oil painting",
        "with the dramatic chiaroscuro of Baroque oil painting",
        "in a loose, impressionistic oil painting style",
        "with the luminous glazing technique of Old Masters",
        "in a contemporary realist oil painting style",
        "with the bold brushwork of a plein air oil painting",
      ],
    },
    {
      id: "digital_concept",
      label: "Digital Concept Art",
      emoji: "",
      description: "Polished, cinematic, high-detail digital illustration",
      values: [
        "in a polished digital concept art style",
        "with the cinematic quality of a film concept painting",
        "in a hyper-detailed digital illustration style",
        "with the clean, professional look of game concept art",
        "in a dramatic digital painting with strong lighting",
        "with the detailed environment art style of a fantasy game",
        "in a high-contrast digital illustration style",
        "with the epic scale of a cinematic matte painting",
      ],
    },
    {
      id: "anime_manga",
      label: "Anime / Manga",
      emoji: "",
      description: "Japanese animation and comic art style",
      values: [
        "in a detailed anime illustration style",
        "with the expressive linework of manga",
        "in the style of a Studio Ghibli background painting",
        "with the clean, colorful aesthetic of modern anime",
        "in a shonen manga action style",
        "with the soft, emotional style of a shoujo illustration",
        "in the painterly style of anime key visuals",
        "with the detailed character design of a JRPG",
      ],
    },
    {
      id: "folk_naive",
      label: "Folk & Naïve Art",
      emoji: "",
      description: "Flat shapes, bold patterns, folk art tradition",
      values: [
        "in a bold folk art style with flat shapes",
        "with the decorative quality of traditional folk illustration",
        "in a naïve art style with childlike sincerity",
        "with the pattern-rich aesthetic of folk textile art",
        "in a flat, graphic folk art style",
        "with the warm, handmade quality of folk painting",
        "in the style of a traditional woodblock print",
        "with the bold, simplified forms of folk art",
      ],
    },
    {
      id: "sketch_rough",
      label: "Sketch / Rough",
      emoji: "",
      description: "Loose, gestural, raw and immediate",
      values: [
        "in a loose, gestural sketch style",
        "with the raw energy of a quick observational drawing",
        "in a rough, expressive charcoal sketch style",
        "with the immediacy of a sketchbook drawing",
        "in a loose pencil sketch with minimal detail",
        "with the spontaneous quality of a life drawing",
        "in a rough, energetic gesture drawing style",
        "with the honest imperfection of a working sketch",
      ],
    },
    {
      id: "surrealist_painterly",
      label: "Surrealist",
      emoji: "",
      description: "Dreamlike realism, impossible rendered beautifully",
      values: [
        "in a hyper-realistic surrealist painting style",
        "with the dreamlike precision of Salvador Dalí",
        "in a Magritte-inspired impossible realism style",
        "with the detailed, dreamlike quality of surrealist oil painting",
        "in a painterly surrealist style with perfect impossible detail",
        "with the uncanny realism of a dream rendered in paint",
        "in a metaphysical painting style with deep shadows",
        "with the beautiful wrongness of a surrealist masterpiece",
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// 维度六：Challenge（挑战约束）
// 给绘画者一个额外的技法/构图挑战
// ─────────────────────────────────────────────

const challengeDimension: Dimension = {
  key: "challenge",
  label: "Challenge",
  description: "An extra constraint to push your skills",
  options: [
    {
      id: "no_outlines",
      label: "No Outlines",
      emoji: "",
      description: "Define shapes with color and value only",
      values: [
        "using no outlines — define all shapes with color and value alone",
        "without any linework — let edges emerge from contrasting colors",
        "using only shapes of color, no defining lines",
        "with all forms suggested by light and shadow, no outlines",
      ],
    },
    {
      id: "limited_palette",
      label: "3-Color Limit",
      emoji: "",
      description: "Use only 3 colors (plus black and white)",
      values: [
        "using only 3 colors plus black and white",
        "with a strictly limited palette of 3 hues",
        "using no more than 3 colors in the entire piece",
        "with a minimal 3-color palette to force creative choices",
      ],
    },
    {
      id: "single_light_source",
      label: "Single Light Source",
      emoji: "",
      description: "All light comes from one dramatic source",
      values: [
        "lit by a single dramatic light source",
        "with all light coming from one candle or lamp",
        "using only one light source to define the entire scene",
        "with extreme chiaroscuro from a single point of light",
      ],
    },
    {
      id: "silhouette",
      label: "Silhouette Only",
      emoji: "",
      description: "Tell the story through silhouette alone",
      values: [
        "depicted entirely as a silhouette against a bright background",
        "told through silhouette alone — no interior detail",
        "as a pure silhouette with all story in the outline",
        "using only the silhouette to convey emotion and narrative",
      ],
    },
    {
      id: "one_continuous_line",
      label: "One Continuous Line",
      emoji: "",
      description: "Draw without lifting your pen",
      values: [
        "drawn in a single continuous line without lifting the pen",
        "as a one-line drawing where the line never crosses itself",
        "using one unbroken line to capture the entire scene",
        "in a continuous line drawing style",
      ],
    },
    {
      id: "texture_focus",
      label: "Texture Focus",
      emoji: "",
      description: "Make texture the star of the piece",
      values: [
        "with extreme attention to surface texture as the main focus",
        "where contrasting textures tell the story",
        "with every surface texture rendered in obsessive detail",
        "making texture the primary visual interest of the piece",
      ],
    },
    {
      id: "negative_space",
      label: "Negative Space",
      emoji: "",
      description: "Use empty space as a powerful compositional tool",
      values: [
        "using negative space as a powerful compositional element",
        "where the empty space is as important as the subject",
        "with bold use of negative space to create a second image",
        "using the white of the page as an active part of the composition",
      ],
    },
    {
      id: "rule_of_thirds",
      label: "Rule of Thirds",
      emoji: "",
      description: "Place the subject off-center for dynamic composition",
      values: [
        "with the subject placed off-center using the rule of thirds",
        "using a dynamic off-center composition",
        "with the focal point at a rule-of-thirds intersection",
        "using asymmetric composition for maximum visual tension",
      ],
    },
    {
      id: "worm_eye_view",
      label: "Worm's Eye View",
      emoji: "",
      description: "Extreme low angle, looking up",
      values: [
        "from an extreme low angle, looking up",
        "from a worm's eye view that makes everything monumental",
        "with a dramatic upward perspective",
        "seen from ground level, looking up at the subject",
      ],
    },
    {
      id: "bird_eye_view",
      label: "Bird's Eye View",
      emoji: "",
      description: "Looking straight down from above",
      values: [
        "from directly above, a bird's eye view",
        "looking straight down at the scene from high above",
        "from an aerial perspective that reveals the full picture",
        "with a top-down view that changes how we see the subject",
      ],
    },
    {
      id: "no_challenge",
      label: "Free Draw",
      emoji: "",
      description: "No extra constraints — just draw",
      values: [
        "",
        "",
        "",
        "",
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// 汇总所有维度
// ─────────────────────────────────────────────

export const dimensions: Record<DimensionKey, Dimension> = {
  theme: themeDimension,
  subject: subjectDimension,
  mood: moodDimension,
  colorPalette: colorPaletteDimension,
  style: styleDimension,
  challenge: challengeDimension,
};

export const dimensionKeys: DimensionKey[] = [
  "theme",
  "subject",
  "mood",
  "colorPalette",
  "style",
  "challenge",
];

// ─────────────────────────────────────────────
// 工具函数
// ─────────────────────────────────────────────

/** 从数组中随机取一个元素 */
export function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** 获取某个维度的所有选项（用于 UI 渲染） */
export function getDimensionOptions(key: DimensionKey): DimensionOption[] {
  return dimensions[key].options;
}

// ─────────────────────────────────────────────
// 选择状态类型
// ─────────────────────────────────────────────

export interface SelectionState {
  theme: string | null;       // option id
  subject: string | null;
  mood: string | null;
  colorPalette: string | null;
  style: string | null;
  challenge: string | null;
}

export const emptySelection: SelectionState = {
  theme: null,
  subject: null,
  mood: null,
  colorPalette: null,
  style: null,
  challenge: null,
};

// ─────────────────────────────────────────────
// 核心生成函数
// ─────────────────────────────────────────────

export interface GeneratedPrompt {
  text: string;
  selections: SelectionState;
}

/**
 * 根据用户选择生成 Prompt
 * 未选择的维度自动随机填充
 */
export function generatePrompt(
  userSelections: Partial<SelectionState> = {}
): GeneratedPrompt {
  // 1. 对每个维度，用用户选择或随机选一个 option
  const resolvedSelections: SelectionState = {
    theme: null,
    subject: null,
    mood: null,
    colorPalette: null,
    style: null,
    challenge: null,
  };

  const resolvedValues: Record<DimensionKey, string> = {
    theme: "",
    subject: "",
    mood: "",
    colorPalette: "",
    style: "",
    challenge: "",
  };

  for (const key of dimensionKeys) {
    const dim = dimensions[key];
    const userOptionId = userSelections[key];

    // 找到对应 option（用户选的或随机）
    const option = userOptionId
      ? dim.options.find((o) => o.id === userOptionId) ?? randomFrom(dim.options)
      : randomFrom(dim.options);

    resolvedSelections[key] = option.id;

    // 从该 option 的 values 里随机取一个词
    const value = randomFrom(option.values.filter((v) => v.trim() !== ""));
    resolvedValues[key] = value;
  }

  // 2. 组合成 Prompt 文本
  const text = buildPromptText(resolvedValues);

  return {
    text,
    selections: resolvedSelections,
  };
}

/**
 * 将各维度的值组合成自然语言 Prompt
 *
 * 结构：
 * {mood}, {subject} {theme}, {colorPalette}, {style}{challenge}
 */
function buildPromptText(
  values: Record<DimensionKey, string>
): string {
  const { theme, subject, mood, colorPalette, style, challenge } = values;

  // 基础结构
  let parts: string[] = [];

  // 情绪开头（首字母大写）
  if (mood) {
    parts.push(capitalize(mood));
  }

  // 主体 + 场景
  if (subject && theme) {
    parts.push(`${subject} ${theme}`);
  } else if (subject) {
    parts.push(subject);
  } else if (theme) {
    parts.push(theme);
  }

  // 色彩
  if (colorPalette) {
    parts.push(colorPalette);
  }

  // 风格
  if (style) {
    parts.push(style);
  }

  // 挑战约束（追加在末尾）
  if (challenge && challenge.trim()) {
    parts.push(challenge);
  }

  return parts.join(", ");
}

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ─────────────────────────────────────────────
// 随机生成（完全随机，忽略用户选择）
// ─────────────────────────────────────────────

export function generateRandom(): GeneratedPrompt {
  return generatePrompt({});
}

// ─────────────────────────────────────────────
// 每日挑战（基于日期种子，全球同一天相同）
// ─────────────────────────────────────────────

export function getDailyChallenge(): GeneratedPrompt {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  const selections: SelectionState = {
    theme: null,
    subject: null,
    mood: null,
    colorPalette: null,
    style: null,
    challenge: null,
  };

  const resolvedValues: Record<DimensionKey, string> = {
    theme: "",
    subject: "",
    mood: "",
    colorPalette: "",
    style: "",
    challenge: "",
  };

  // 用种子确定性地选择每个维度的 option 和 value
  const primes = [2, 3, 5, 7, 11, 13];
  dimensionKeys.forEach((key, i) => {
    const dim = dimensions[key];
    const optionIndex = (seed * primes[i]) % dim.options.length;
    const option = dim.options[optionIndex];
    selections[key] = option.id;

    const validValues = option.values.filter((v) => v.trim() !== "");
    const valueIndex = (seed * primes[i] * 7) % validValues.length;
    resolvedValues[key] = validValues[valueIndex];
  });

  return {
    text: buildPromptText(resolvedValues),
    selections,
  };
}

// ─────────────────────────────────────────────
// 自定义生成（用户锁定部分维度，其余随机）
// ─────────────────────────────────────────────

/**
 * 用户可以锁定任意维度，未锁定的维度随机生成
 * 例如：用户选了 mood=melancholic，其余随机
 */
export function generateCustom(
  lockedSelections: Partial<SelectionState>
): GeneratedPrompt {
  return generatePrompt(lockedSelections);
}
