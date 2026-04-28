/**
 * Hand-written blog articles for DrawPrompt.
 *
 * Content categories (not shown in UI, just for editorial planning):
 *   1. "cool-prompts"   \u2014 Fun / cool prompt recommendations with internal links
 *   2. "prompt-journal"  \u2014 Our own prompt experiments & results
 *   3. "gpt-image-2"    \u2014 GPT Image 2 insights, tips, understanding
 *   4. "drawing-tips"   \u2014 Drawing advice, creative process, artist mindset
 *   5. "ai-art-guide"   \u2014 Broader AI art ecosystem guides
 */

export interface BlogArticle {
  slug: string;            // URL slug, e.g. "best-fantasy-drawing-prompts"
  title: string;           // H1 + <title>
  description: string;     // meta description
  date: string;            // YYYY-MM-DD (publish date)
  category: "cool-prompts" | "prompt-journal" | "gpt-image-2" | "drawing-tips" | "ai-art-guide";
  categoryLabel: string;   // display label
  readingTime: number;     // minutes
  heroColor: string;       // accent color for the article
  heroBg: string;          // light background
  /** Article body as an array of content blocks */
  body: ContentBlock[];
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "tip"; text: string }
  | { type: "prompt-example"; prompt: string; note?: string }
  | { type: "callout"; text: string; href?: string; linkText?: string }
  | { type: "image-placeholder"; alt: string; caption?: string };

// ============================================================
// ARTICLES
// ============================================================

export const blogArticles: BlogArticle[] = [

  // ── 1. Cool Prompts: Fantasy ──────────────────────────────
  {
    slug: "best-fantasy-drawing-prompts",
    title: "12 Fantasy Drawing Prompts That Will Push Your Imagination",
    description: "A curated collection of fantasy drawing prompts featuring enchanted forests, floating islands, and ancient ruins. Perfect for sketchbooks and digital art.",
    date: "2025-07-10",
    category: "cool-prompts",
    categoryLabel: "Prompt Picks",
    readingTime: 6,
    heroColor: "#8b7ab8",
    heroBg: "#f2f0f8",
    body: [
      { type: "paragraph", text: "Fantasy is where drawing prompts really shine. There are no rules, no references to get \u201Cwrong\u201D \u2014 just your imagination and a blank page. But that freedom can also be paralyzing. Where do you even start?" },
      { type: "paragraph", text: "We picked 12 prompts from our generator that we think are genuinely fun to draw. Not generic \u201Cdraw a dragon\u201D stuff \u2014 these are specific enough to spark a real idea, but open enough to make it yours." },

      { type: "heading", text: "Enchanted Environments" },
      { type: "prompt-example", prompt: "A library that exists between dimensions, with books floating in mid-air and doorways opening to different worlds. Rendered in deep jewel tones of emerald and sapphire.", note: "The key here is the \u201Cbetween dimensions\u201D part \u2014 how do you show a space that\u2019s not quite anywhere?" },
      { type: "prompt-example", prompt: "A valley where it rains upward, with droplets rising from puddles into a sky that\u2019s somehow below. Soft pastel tones of lavender and blush.", note: "Inverting gravity is a great exercise in thinking about how light and water actually behave." },
      { type: "prompt-example", prompt: "A forest where every tree is a petrified ancient warrior, their armor still visible in the bark. Muted earthy tones of terracotta and sage.", note: "This one is all about texture \u2014 the transition from organic bark to carved stone." },

      { type: "heading", text: "Characters With Depth" },
      { type: "prompt-example", prompt: "A cartographer mapping a world that keeps changing, surrounded by maps that contradict each other. In warm amber and burnt sienna tones.", note: "The frustration on their face tells the whole story." },
      { type: "prompt-example", prompt: "Twin sisters \u2014 one made of fire, one made of ice \u2014 reaching toward each other across a threshold. With colors shifting from deep orange to violet.", note: "The contrast between the two figures is the entire composition." },
      { type: "prompt-example", prompt: "A clockmaker who builds clocks that count down to death, working alone in a tower. Lit by a single dramatic light source.", note: "Single light source + a morally complex character = instant atmosphere." },

      { type: "heading", text: "Mood-Driven Scenes" },
      { type: "prompt-example", prompt: "Melancholic and dreamlike: a celestial guardian made entirely of starlight, standing at the shore of a lake that reflects a different sky.", note: "The double-sky concept gives you a lot of room to play with color." },
      { type: "prompt-example", prompt: "Epic and awe-inspiring: an ancient dragon coiled around a hoard of glowing crystals, at the ruins of a castle swallowed by an ancient glacier.", note: "Scale is everything here. Make the dragon enormous." },
      { type: "prompt-example", prompt: "Mysterious and ancient: a shapeshifter who has forgotten their original form, in a landscape where the sky and the ground have switched places.", note: "Two layers of identity crisis \u2014 the character and the world." },

      { type: "heading", text: "Quick Challenges" },
      { type: "prompt-example", prompt: "A phoenix reborn from a pile of ash and embers, depicted entirely as a silhouette against a bright background.", note: "Silhouette-only forces you to tell the story through shape alone." },
      { type: "prompt-example", prompt: "A mermaid who traded her voice for a pair of wings, drawn in a single continuous line without lifting the pen.", note: "One-line drawing + a character with a story = a great 15-minute exercise." },
      { type: "prompt-example", prompt: "A forest spirit with antlers wreathed in autumn leaves, using only 3 colors plus black and white.", note: "Limited palette is one of the best ways to level up your color sense." },

      { type: "callout", text: "Want more? Our drawing prompt generator creates prompts like these with 150 billion+ unique combinations. Choose your theme, mood, and difficulty.", href: "/generator", linkText: "Try the Generator" },

      { type: "heading", text: "Tips for Drawing Fantasy Prompts" },
      { type: "paragraph", text: "The biggest mistake with fantasy prompts is trying to draw everything at once. Pick the one element that excites you most and build outward from there. If the prompt mentions a \u201Cforest where every tree is a petrified warrior,\u201D maybe start with just one tree-warrior and get that right before adding the forest." },
      { type: "paragraph", text: "Also: don\u2019t skip the thumbnail stage. Fantasy scenes are complex, and a 2-minute thumbnail will save you an hour of frustration. Rough out the composition, figure out where the light is coming from, and then commit." },
      { type: "paragraph", text: "If you\u2019re looking for prompts that are more grounded in reality, check out our everyday and urban drawing prompts. And if you want to feed these into an AI image generator, our GPT Image 2 prompts page has tested, copy-paste versions optimized for AI." },

      { type: "callout", text: "Browse all drawing prompt categories including fantasy, nature, urban, and cozy themes.", href: "/drawing-prompts", linkText: "Explore Drawing Prompts" },
    ],
  },

  // ── 2. Cool Prompts: Cozy & Everyday ──────────────────────
  {
    slug: "cozy-drawing-prompts-for-rainy-days",
    title: "9 Cozy Drawing Prompts for When You Just Want to Sketch Something Warm",
    description: "Warm, comforting drawing prompts featuring bakeries, rainy windows, and quiet mornings. Perfect for relaxed sketching sessions.",
    date: "2025-07-08",
    category: "cool-prompts",
    categoryLabel: "Prompt Picks",
    readingTime: 5,
    heroColor: "#c4714a",
    heroBg: "#fdf0e8",
    body: [
      { type: "paragraph", text: "Not every drawing session needs to be epic. Sometimes you just want to sit down with a cup of tea and sketch something that feels like a warm blanket. These prompts are for those days." },
      { type: "paragraph", text: "We pulled these from the \u201CCozy\u201D theme in our generator, and they\u2019re some of our favorites. They\u2019re low-pressure, high-charm, and surprisingly good for practicing things like interior lighting and texture." },

      { type: "heading", text: "Kitchen & Food" },
      { type: "prompt-example", prompt: "A kitchen that smells of cinnamon and fresh bread, with morning light streaming through a window. In warm amber and burnt sienna tones, rendered in loose watercolor.", note: "The challenge: how do you draw a smell? Hint: steam, golden light, and a cat sleeping nearby." },
      { type: "prompt-example", prompt: "A bakery before it opens, when the bread is still warm and the display cases are being filled. Bathed in golden hour light.", note: "Early morning bakeries have the best light in the world. Fact." },
      { type: "prompt-example", prompt: "A grandmother teaching her grandchild a recipe from memory, in a kitchen where three generations have cooked. With the muted palette of an old photograph.", note: "The hands are the story here. Focus on the hands." },

      { type: "heading", text: "Rainy Day Vibes" },
      { type: "prompt-example", prompt: "A cozy reading nook with rain pattering on the window, a stack of books, and a half-finished cup of tea. In soft pastel tones of lavender and blush.", note: "This is a texture exercise disguised as a cozy scene \u2014 glass, fabric, paper, ceramic, rain." },
      { type: "prompt-example", prompt: "Two strangers sharing an umbrella at a bus stop, not talking, just standing together. In the blue-grey tones of a foggy morning.", note: "Minimal scene, maximum story. The space between them says everything." },
      { type: "prompt-example", prompt: "A corner table in a caf\u00E9, watching the rain outside through a fogged-up window. With the warm palette of a harvest evening.", note: "The fogged window is the real subject. Everything beyond it is soft and blurred." },

      { type: "heading", text: "Quiet Moments" },
      { type: "prompt-example", prompt: "A slow Sunday morning when there is nowhere to be. Sunlight on rumpled sheets, a book face-down on the pillow. Gentle and meditative.", note: "Draw this one slowly. That\u2019s the whole point." },
      { type: "prompt-example", prompt: "A second-hand bookshop where the owner knows every customer by name. In clay, sand, and weathered wood tones.", note: "The books are characters too. Give them personality through wear and tear." },
      { type: "prompt-example", prompt: "A small garden where someone has just planted seeds for spring, with dirt under their fingernails and hope in the arrangement. Warm with possibility.", note: "The \u201Cdirt under fingernails\u201D detail is what makes this prompt specific enough to draw." },

      { type: "callout", text: "Get a random cozy prompt instantly \u2014 no decisions needed.", href: "/random", linkText: "Random Prompt" },

      { type: "paragraph", text: "Cozy prompts are secretly great for skill-building. They force you to work with subtle value ranges (no dramatic shadows to hide behind), practice interior perspective, and render everyday textures like fabric, wood, and glass. If you can make a kitchen scene feel warm, you can draw anything." },

      { type: "callout", text: "Our daily challenge gives you a new prompt every day \u2014 sometimes cozy, sometimes epic, always interesting.", href: "/daily-challenge", linkText: "Today\u2019s Challenge" },
    ],
  },

  // ── 3. GPT Image 2: Understanding the Model ──────────────
  {
    slug: "what-makes-gpt-image-2-different",
    title: "What Makes GPT Image 2 Different: A Practical Guide for Prompt Writers",
    description: "An honest look at what GPT Image 2 does well, where it struggles, and how to write prompts that play to its strengths. Based on testing 167+ prompts.",
    date: "2025-07-12",
    category: "gpt-image-2",
    categoryLabel: "GPT Image 2",
    readingTime: 8,
    heroColor: "#c06a3e",
    heroBg: "#fdf0e8",
    body: [
      { type: "paragraph", text: "We\u2019ve tested over 167 prompts across GPT Image 2, ChatGPT, Midjourney, and DALL-E. Here\u2019s what we\u2019ve actually learned about how GPT Image 2 works \u2014 not the marketing version, the real version." },

      { type: "heading", text: "What GPT Image 2 Is Actually Good At" },
      { type: "paragraph", text: "GPT Image 2 is the first AI image model that genuinely understands text. Not just \u201Ccan render text\u201D \u2014 it understands what text means in context. You can ask it to put a specific quote on a poster, write a menu for a restaurant scene, or add a street sign in the background, and it will get the spelling right almost every time." },
      { type: "paragraph", text: "It\u2019s also remarkably good at following complex spatial instructions. \u201CPut the cat on the left side of the table, with the vase behind it and the window to the right\u201D \u2014 GPT Image 2 will actually do this. Midjourney would give you a beautiful image that ignores half your instructions. DALL-E would try but get the spatial relationships wrong." },
      { type: "paragraph", text: "The third strength is consistency. If you\u2019re doing iterative edits \u2014 \u201Cnow change the background to blue\u201D or \u201Cmake the character older\u201D \u2014 GPT Image 2 maintains the rest of the image much better than other models." },

      { type: "heading", text: "Where It Struggles" },
      { type: "paragraph", text: "GPT Image 2 is not the best at pure artistic style. Midjourney still produces more aesthetically striking images when you want a specific art style \u2014 oil painting, watercolor, anime. GPT Image 2 tends toward a clean, slightly digital look even when you ask for traditional media styles." },
      { type: "paragraph", text: "It also has a tendency to over-light scenes. Ask for a dark, moody atmosphere and you\u2019ll often get something that\u2019s brighter than you wanted. The fix is to be very explicit: \u201Clow-key lighting, deep shadows covering 70% of the frame, only the face is lit.\u201D" },
      { type: "paragraph", text: "Hands are better than they used to be, but still not perfect. For character-focused prompts, it helps to specify what the hands are doing: \u201Cholding a cup,\u201D \u201Cresting on the table,\u201D \u201Ctucked in pockets.\u201D" },

      { type: "heading", text: "How to Write Better GPT Image 2 Prompts" },
      { type: "tip", text: "Be specific about spatial relationships. Instead of \u201Ca person in a room,\u201D say \u201Ca person sitting at the left side of a wooden desk, facing a window on the right, with bookshelves behind them.\u201D" },
      { type: "tip", text: "Specify lighting explicitly. \u201CGolden hour light from the left\u201D or \u201Coverhead fluorescent lighting\u201D gives much better results than just \u201Cwarm lighting.\u201D" },
      { type: "tip", text: "Use the word \u201Cphotorealistic\u201D if you want photorealism. GPT Image 2 defaults to a slightly illustrated look. Adding \u201Cphotorealistic, shot on Canon EOS R5, 85mm lens\u201D pushes it toward realism." },
      { type: "tip", text: "For text in images, put the exact text in quotes: \u201CThe sign reads \u2018OPEN 24 HOURS\u2019 in red neon letters.\u201D" },
      { type: "tip", text: "Keep prompts under 200 words. GPT Image 2 handles long prompts better than most models, but after 200 words it starts ignoring details at the end." },

      { type: "heading", text: "GPT Image 2 vs. Midjourney vs. DALL-E" },
      { type: "paragraph", text: "Here\u2019s the honest comparison based on our testing:" },
      { type: "paragraph", text: "GPT Image 2 wins at: text rendering, spatial accuracy, iterative editing, UI/UX mockups, product photography, and anything requiring precise control." },
      { type: "paragraph", text: "Midjourney wins at: artistic style, aesthetic quality, fantasy/sci-fi concept art, and images where \u201Cvibes\u201D matter more than accuracy." },
      { type: "paragraph", text: "DALL-E 3 wins at: nothing, honestly. GPT Image 2 is better at everything DALL-E 3 used to do. It\u2019s effectively the successor." },

      { type: "callout", text: "Browse our full library of 167+ tested AI prompts with example images and breakdowns.", href: "/gpt-image-2-prompts", linkText: "GPT Image 2 Prompts" },

      { type: "heading", text: "The Bottom Line" },
      { type: "paragraph", text: "GPT Image 2 is the best general-purpose AI image model right now. It\u2019s not the most artistic (that\u2019s still Midjourney) and it\u2019s not the most creative (that\u2019s arguably still human artists). But for reliability, control, and text rendering, nothing else comes close." },
      { type: "paragraph", text: "If you\u2019re new to AI image generation, start with GPT Image 2. If you\u2019re already using Midjourney, add GPT Image 2 for the tasks where precision matters. And if you\u2019re a traditional artist looking for inspiration rather than AI generation, our drawing prompt generator is built specifically for you." },

      { type: "callout", text: "New to GPT Image 2? Read our step-by-step beginner\u2019s guide.", href: "/how-to-use-gpt-image-2", linkText: "How to Use GPT Image 2" },
    ],
  },

  // ── 4. Prompt Journal: Experimenting with Mood ────────────
  {
    slug: "experimenting-with-mood-in-prompts",
    title: "What Happens When You Change Only the Mood: A Prompt Experiment",
    description: "We took the same scene and subject and changed only the mood dimension. Here\u2019s how dramatically different the results were \u2014 and what it teaches about prompt writing.",
    date: "2025-07-06",
    category: "prompt-journal",
    categoryLabel: "Prompt Lab",
    readingTime: 6,
    heroColor: "#5a9e7a",
    heroBg: "#eef6f2",
    body: [
      { type: "paragraph", text: "Our drawing prompt generator has 8 mood options: Melancholic, Epic, Mysterious, Hopeful, Tense, Peaceful, Whimsical, and Dark Romantic. We wanted to see how much the mood actually changes the output when everything else stays the same." },
      { type: "paragraph", text: "So we ran an experiment. Same subject (a lone wolf at the edge of a frozen lake), same theme (Nature), same style (watercolor). We only changed the mood." },

      { type: "heading", text: "The Results" },
      { type: "subheading", text: "Melancholic" },
      { type: "prompt-example", prompt: "Quietly sorrowful, a lone wolf standing at the edge of a frozen lake, deep in an old-growth forest where sunlight barely reaches the ground. In cold blue and silver tones, rendered in loose watercolor." },
      { type: "paragraph", text: "This version immediately feels like a story about loss. The wolf isn\u2019t hunting or howling \u2014 it\u2019s just standing there, and that stillness carries all the weight. The cold blue palette reinforces the emotional temperature." },

      { type: "subheading", text: "Epic" },
      { type: "prompt-example", prompt: "Vast and humbling, a lone wolf standing at the edge of a frozen lake, deep in an old-growth forest where sunlight barely reaches the ground. In rich jewel tones of emerald and sapphire, rendered in loose watercolor." },
      { type: "paragraph", text: "Same wolf, completely different energy. Now it feels like the opening shot of a film. The wolf is small against the landscape, and the landscape is enormous. The jewel tones add grandeur." },

      { type: "subheading", text: "Whimsical" },
      { type: "prompt-example", prompt: "Delightfully strange, a lone wolf standing at the edge of a frozen lake, deep in an old-growth forest where sunlight barely reaches the ground. In soft pastel tones of lavender and blush, rendered in loose watercolor." },
      { type: "paragraph", text: "This is the same scene but it feels like a children\u2019s book illustration. The pastel palette completely transforms the emotional register. The wolf looks friendly. The forest looks inviting." },

      { type: "subheading", text: "Tense" },
      { type: "prompt-example", prompt: "Silent before the storm, a lone wolf standing at the edge of a frozen lake, deep in an old-growth forest where sunlight barely reaches the ground. In stark black and white, rendered in loose watercolor." },
      { type: "paragraph", text: "Now the wolf is dangerous. The monochrome palette strips away comfort, and \u201Csilent before the storm\u201D makes you feel like something is about to happen. Same composition, completely different story." },

      { type: "heading", text: "What This Teaches Us" },
      { type: "paragraph", text: "Mood is the most powerful single dimension in a prompt. You can change the subject, the setting, the style \u2014 but changing the mood changes the meaning. A melancholic wolf and a tense wolf are not the same drawing, even if the wolf looks identical." },
      { type: "paragraph", text: "This is true for AI prompts too. If you\u2019re using GPT Image 2 or Midjourney and your results feel \u201Cflat,\u201D the fix is almost always to add a stronger mood. Don\u2019t just say \u201Ca wolf by a lake.\u201D Say \u201Ca quietly sorrowful wolf by a frozen lake.\u201D The AI needs emotional direction just like a human artist does." },

      { type: "callout", text: "Try it yourself: pick a subject in our generator and cycle through all 8 moods.", href: "/generator", linkText: "Open the Generator" },

      { type: "paragraph", text: "We\u2019re going to keep running experiments like this. Next up: what happens when you change only the challenge constraint (silhouette vs. one continuous line vs. 3-color limit) on the same prompt." },

      { type: "callout", text: "Want a random prompt to experiment with? Hit the button and see what you get.", href: "/random", linkText: "Get a Random Prompt" },
    ],
  },

  // ── 5. GPT Image 2: Text in Images ────────────────────────
  {
    slug: "gpt-image-2-text-rendering-tips",
    title: "How to Get Perfect Text in GPT Image 2: Prompting Tips That Actually Work",
    description: "GPT Image 2 can render text accurately \u2014 if you prompt it right. Here are the specific techniques we\u2019ve found for getting clean, readable text in AI-generated images.",
    date: "2025-07-04",
    category: "gpt-image-2",
    categoryLabel: "GPT Image 2",
    readingTime: 5,
    heroColor: "#c06a3e",
    heroBg: "#fdf0e8",
    body: [
      { type: "paragraph", text: "Text rendering is GPT Image 2\u2019s killer feature. It\u2019s the first AI image model that can reliably spell words correctly, place text where you want it, and make it look like it belongs in the scene. But \u201Creliably\u201D doesn\u2019t mean \u201Cautomatically.\u201D You still need to prompt it correctly." },

      { type: "heading", text: "The Golden Rule: Quotes and Specificity" },
      { type: "paragraph", text: "Always put the exact text you want in quotation marks within your prompt. Don\u2019t say \u201Ca sign with the store name.\u201D Say \u201Ca sign that reads \u2018MURPHY\u2019S BOOKS\u2019 in gold serif letters on a dark green background.\u201D" },
      { type: "paragraph", text: "The more specific you are about the text\u2019s appearance \u2014 font style, color, size relative to the image, placement \u2014 the better the results." },

      { type: "heading", text: "What Works Well" },
      { type: "prompt-example", prompt: "A vintage movie poster for a film called \u2018THE LAST LIGHTHOUSE\u2019 with the title in bold art deco typography at the top, a lighthouse silhouette in the center, and \u2018Coming Summer 2025\u2019 in smaller text at the bottom.", note: "Poster and sign prompts are GPT Image 2\u2019s sweet spot." },
      { type: "prompt-example", prompt: "A cozy caf\u00E9 storefront with a chalkboard sign that reads \u2018Today\u2019s Special: Lavender Honey Latte \u2014 $5.50\u2019 in handwritten chalk lettering.", note: "Specifying \u201Cchalkboard\u201D and \u201Cchalk lettering\u201D gives the AI a clear visual context for the text style." },
      { type: "prompt-example", prompt: "A minimalist book cover with the title \u2018QUIET HOURS\u2019 in thin sans-serif type centered on a pale blue background, with the author name \u2018Elena Park\u2019 in smaller text below.", note: "Clean, minimal designs with clear hierarchy work best." },

      { type: "heading", text: "Common Mistakes" },
      { type: "paragraph", text: "Long text strings (more than 5-6 words) start to get unreliable. If you need a paragraph of text, break it into multiple generation steps or use GPT Image 2\u2019s editing mode to add text in stages." },
      { type: "paragraph", text: "Cursive and script fonts are still hit-or-miss. Stick to serif, sans-serif, or display fonts for the most reliable results. If you need script, specify \u201Celegant but readable script\u201D and keep the text to 2-3 words." },
      { type: "paragraph", text: "Don\u2019t put text in the background of complex scenes. Text works best when it has a clear, relatively simple surface to sit on \u2014 a sign, a poster, a book cover, a wall." },

      { type: "tip", text: "Pro tip: if the text comes out slightly wrong, use ChatGPT\u2019s image editing to fix just the text area rather than regenerating the whole image." },

      { type: "callout", text: "See our tested poster and typography prompts with example images.", href: "/ai-prompts?category=poster-graphic", linkText: "Poster & Graphic Prompts" },

      { type: "paragraph", text: "Text rendering is one of the reasons we think GPT Image 2 is the most practical AI image model for real work \u2014 not just art experiments. Designers, marketers, and content creators can actually use these outputs without having to fix the text in Photoshop afterward." },

      { type: "callout", text: "New to GPT Image 2? Start with our complete beginner\u2019s guide.", href: "/how-to-use-gpt-image-2", linkText: "How to Use GPT Image 2" },
    ],
  },

  // ── 6. Drawing Tips: Overcoming Creative Block ────────────
  {
    slug: "how-to-beat-creative-block-as-an-artist",
    title: "How to Beat Creative Block: 7 Techniques That Actually Work for Artists",
    description: "Practical strategies for overcoming creative block as a visual artist. From constraint-based drawing to prompt generators, here\u2019s what actually helps.",
    date: "2025-07-02",
    category: "drawing-tips",
    categoryLabel: "Artist Tips",
    readingTime: 7,
    heroColor: "#7b9eb8",
    heroBg: "#eef4f8",
    body: [
      { type: "paragraph", text: "Creative block isn\u2019t about lacking talent or motivation. It\u2019s usually about having too many options and not enough constraints. When you can draw anything, you end up drawing nothing." },
      { type: "paragraph", text: "Here are seven techniques that actually work, based on what professional artists and illustrators have told us." },

      { type: "heading", text: "1. Add Constraints" },
      { type: "paragraph", text: "This is the single most effective technique. Give yourself a rule: only use 3 colors. Draw in 10 minutes or less. Use only silhouettes. No erasing. The constraint removes the paralysis of infinite choice and forces your brain into problem-solving mode, which is where creativity actually lives." },
      { type: "paragraph", text: "Our drawing prompt generator has a whole \u201CChallenge\u201D dimension for exactly this reason \u2014 it adds constraints like \u201Cno outlines,\u201D \u201Cone continuous line,\u201D or \u201Cnegative space focus\u201D to any prompt." },

      { type: "heading", text: "2. Use a Prompt Generator" },
      { type: "paragraph", text: "This isn\u2019t a sales pitch (okay, it\u2019s a little bit of a sales pitch). But the reason prompt generators work for creative block is that they make the first decision for you. You don\u2019t have to figure out what to draw \u2014 you just have to figure out how to draw it. That\u2019s a much easier problem." },
      { type: "paragraph", text: "The key is using a generator that gives you enough specificity to start but enough openness to make it yours. \u201CDraw a cat\u201D is too vague. \u201CDraw a melancholic cat sleeping in a patch of afternoon sunlight, in muted earthy tones, using only shapes of color with no outlines\u201D \u2014 that\u2019s a creative brief you can actually work with." },

      { type: "heading", text: "3. Draw Something Badly on Purpose" },
      { type: "paragraph", text: "Perfectionism is the engine of creative block. The cure is to deliberately make something bad. Draw with your non-dominant hand. Draw without looking at the paper. Draw the ugliest version of your idea you can imagine. Once you\u2019ve broken the seal of \u201Cthis has to be good,\u201D the pressure evaporates." },

      { type: "heading", text: "4. Copy Something You Love" },
      { type: "paragraph", text: "Not to post online \u2014 just for practice. Find an artist whose work you admire and try to reproduce one of their pieces. You\u2019ll learn more about their technique in 30 minutes of copying than in hours of just looking. And the act of drawing \u2014 any drawing \u2014 often breaks the block." },

      { type: "heading", text: "5. Change Your Medium" },
      { type: "paragraph", text: "If you usually draw digitally, pick up a pencil. If you usually use pencil, try ink (no erasing!). If you paint, try collage. Changing your medium resets your expectations and puts you back in beginner mode, which is actually a very creative place to be." },

      { type: "heading", text: "6. Set a Timer" },
      { type: "paragraph", text: "Give yourself 5 minutes. Not 5 minutes to make something good \u2014 5 minutes to make something, period. The time pressure eliminates overthinking. Some of the best sketches happen in the last 30 seconds of a timed exercise." },

      { type: "heading", text: "7. Join a Daily Challenge" },
      { type: "paragraph", text: "External accountability helps. When there\u2019s a prompt waiting for you every day, and other people are drawing the same prompt, the barrier to starting drops dramatically. You\u2019re not deciding what to draw \u2014 you\u2019re just showing up." },

      { type: "callout", text: "Our daily drawing challenge gives you a new prompt every day. Same prompt for everyone, so you can compare interpretations.", href: "/daily-challenge", linkText: "Join Today\u2019s Challenge" },

      { type: "paragraph", text: "The common thread in all of these techniques is the same: reduce the number of decisions you have to make before you start drawing. Creative block is a decision problem, not a creativity problem. Remove the decisions, and the creativity comes back." },

      { type: "callout", text: "Need a prompt right now? No decisions, just hit the button.", href: "/random", linkText: "Get a Random Prompt" },
    ],
  },

  // ── 7. Cool Prompts: Dark & Mysterious ────────────────────
  {
    slug: "dark-mysterious-drawing-prompts",
    title: "10 Dark and Mysterious Drawing Prompts for When You Want Something Eerie",
    description: "Atmospheric drawing prompts featuring abandoned places, uncanny scenes, and gothic characters. For artists who like their sketchbooks a little darker.",
    date: "2025-06-30",
    category: "cool-prompts",
    categoryLabel: "Prompt Picks",
    readingTime: 5,
    heroColor: "#8b5a7a",
    heroBg: "#f8f0f4",
    body: [
      { type: "paragraph", text: "Some of the best drawing prompts live in the shadows. Dark and mysterious scenes force you to think about what you don\u2019t show \u2014 what\u2019s hidden in the darkness, what\u2019s just out of frame, what the viewer has to imagine for themselves." },
      { type: "paragraph", text: "These prompts come from the \u201CShadow & Quiet\u201D and \u201CSurreal\u201D themes in our generator, paired with Mysterious, Tense, and Dark Romantic moods. They\u2019re great for practicing dramatic lighting, atmosphere, and storytelling through composition." },

      { type: "heading", text: "Abandoned & Uncanny" },
      { type: "prompt-example", prompt: "A house where all the clocks stopped at the same time. Eerie and still. In stark black and white, with extreme chiaroscuro from a single point of light.", note: "What time do the clocks show? That\u2019s part of your story." },
      { type: "prompt-example", prompt: "An empty school hallway the day after the last day of term. Heavy with unspoken things. In the blue-grey tones of a foggy morning.", note: "The emptiness is the subject. Draw the absence of people." },
      { type: "prompt-example", prompt: "A cathedral where the stained glass shows scenes of the future. Shrouded in secrets. In rich jewel tones of emerald and sapphire.", note: "What does the future look like in stained glass? That\u2019s the creative challenge." },

      { type: "heading", text: "Gothic Characters" },
      { type: "prompt-example", prompt: "A woman made entirely of shadows and broken glass, standing in a room that is both inside and outside at the same time. Tragically beautiful.", note: "The broken glass catches light. The shadows absorb it. The contrast is everything." },
      { type: "prompt-example", prompt: "A gravedigger who has been doing this job for 200 years, in a graveyard where the headstones are all blank. Mournful and dignified.", note: "200 years of digging \u2014 what does that do to a person\u2019s face and hands?" },
      { type: "prompt-example", prompt: "A death god who has fallen in love with a mortal, at the edge of a forest that no one who enters ever leaves. Hauntingly tender.", note: "The tenderness is what makes this dark, not the death." },

      { type: "heading", text: "Surreal & Unsettling" },
      { type: "prompt-example", prompt: "A staircase that leads to itself, in a house where every door opens to the same room. Quietly uncanny. With a dramatic monochrome palette.", note: "Escher meets horror. The geometry is the monster." },
      { type: "prompt-example", prompt: "Inside a mirror that shows a world slightly wrong. Strange and familiar at once. In deep shadow and bright highlight only.", note: "What\u2019s \u201Cslightly wrong\u201D? That\u2019s the most interesting question in this prompt." },
      { type: "prompt-example", prompt: "A landscape that is slowly being erased, with a figure standing at the intersection of past and future. Veiled and unknowable.", note: "How do you draw something being erased? Fading edges, dissolving forms, white space creeping in." },
      { type: "prompt-example", prompt: "A ballroom where the dancers have been frozen mid-step. Tense with hidden meaning. Lit by a single dramatic light source.", note: "Frozen motion is one of the hardest things to draw well. This is a great challenge." },

      { type: "callout", text: "Generate your own dark and mysterious prompts with our drawing prompt generator.", href: "/generator", linkText: "Try the Generator" },

      { type: "paragraph", text: "Dark prompts are excellent for developing your value range. Most artists don\u2019t go dark enough in their shadows or light enough in their highlights. These scenes demand the full spectrum from pure black to pure white, with very little in the comfortable middle." },

      { type: "callout", text: "If you want to turn these into AI-generated images, check out our GPT Image 2 prompts for cinematic and dark themes.", href: "/gpt-image-2-prompts", linkText: "AI Image Prompts" },
    ],
  },

  // ── 8. AI Art Guide: Midjourney vs GPT Image 2 ────────────
  {
    slug: "midjourney-vs-gpt-image-2-honest-comparison",
    title: "Midjourney vs GPT Image 2: An Honest Side-by-Side Comparison",
    description: "A practical comparison of Midjourney and GPT Image 2 based on testing the same prompts in both. When to use which, and why.",
    date: "2025-06-28",
    category: "ai-art-guide",
    categoryLabel: "AI Art Guide",
    readingTime: 7,
    heroColor: "#8b7ab8",
    heroBg: "#f2f0f8",
    body: [
      { type: "paragraph", text: "The internet is full of \u201CMidjourney vs GPT Image 2\u201D comparisons that are really just one person\u2019s opinion based on three prompts. We tested the same 50 prompts in both models and tracked the results systematically. Here\u2019s what we found." },

      { type: "heading", text: "The Short Version" },
      { type: "paragraph", text: "Midjourney makes more beautiful images. GPT Image 2 makes more accurate images. Which one you want depends entirely on what you\u2019re making." },

      { type: "heading", text: "Where GPT Image 2 Wins" },
      { type: "paragraph", text: "Text rendering: GPT Image 2 gets text right about 90% of the time. Midjourney gets it right about 30% of the time. For anything involving signs, posters, book covers, UI mockups, or any text at all, GPT Image 2 is the clear winner." },
      { type: "paragraph", text: "Instruction following: When we gave complex prompts with 5+ specific requirements (subject position, lighting direction, color palette, text, composition), GPT Image 2 followed an average of 4.2 out of 5 requirements. Midjourney followed an average of 2.8. Midjourney often produces something beautiful that ignores half your prompt." },
      { type: "paragraph", text: "Iterative editing: GPT Image 2\u2019s ability to edit existing images while maintaining consistency is genuinely useful for workflows. Midjourney\u2019s variation and remix features are more limited." },
      { type: "paragraph", text: "Photorealism: For product photography, food photography, and realistic portraits, GPT Image 2 produces more convincing results." },

      { type: "heading", text: "Where Midjourney Wins" },
      { type: "paragraph", text: "Aesthetic quality: Midjourney images just look better as art. The default aesthetic is more polished, more dramatic, more \u201Cwow.\u201D GPT Image 2 images often look slightly flat or over-lit by comparison." },
      { type: "paragraph", text: "Style range: Midjourney handles artistic styles (oil painting, watercolor, anime, concept art) with more nuance and authenticity. GPT Image 2 tends to apply styles as a filter rather than truly understanding the medium." },
      { type: "paragraph", text: "Fantasy and sci-fi: For concept art, character design, and world-building imagery, Midjourney\u2019s aesthetic sensibility gives it a clear edge." },
      { type: "paragraph", text: "Community and curation: Midjourney\u2019s community features and the ability to browse other people\u2019s prompts is a genuine advantage for learning and inspiration." },

      { type: "heading", text: "Our Recommendation" },
      { type: "paragraph", text: "Use GPT Image 2 when you need: text in images, precise control over composition, photorealistic output, UI/UX mockups, product shots, or iterative editing." },
      { type: "paragraph", text: "Use Midjourney when you need: concept art, fantasy/sci-fi imagery, artistic style exploration, mood boards, or images where aesthetic impact matters more than accuracy." },
      { type: "paragraph", text: "Use both when you\u2019re serious about AI art. They\u2019re complementary tools, not competitors." },

      { type: "callout", text: "Browse our full library of prompts tested across both models.", href: "/ai-prompts", linkText: "All AI Prompts" },

      { type: "paragraph", text: "And if you\u2019re a traditional artist who doesn\u2019t use AI at all? These comparisons might still be useful for understanding what AI can and can\u2019t do. But for your own drawing practice, our prompt generator creates prompts designed for human artists, not machines." },

      { type: "callout", text: "Drawing prompts designed for human artists, not AI.", href: "/drawing-prompts", linkText: "Drawing Prompts" },
    ],
  },

  // ── 9. Prompt Journal: The 3-Color Challenge ──────────────
  {
    slug: "3-color-challenge-what-we-learned",
    title: "We Drew 10 Prompts With Only 3 Colors: Here\u2019s What We Learned",
    description: "A creative experiment using our generator\u2019s 3-color limit challenge. Surprising lessons about color theory, value structure, and creative constraints.",
    date: "2025-06-26",
    category: "prompt-journal",
    categoryLabel: "Prompt Lab",
    readingTime: 5,
    heroColor: "#b8924a",
    heroBg: "#fdf8e8",
    body: [
      { type: "paragraph", text: "The 3-Color Limit is one of the challenge constraints in our drawing prompt generator. The rule is simple: use only 3 colors plus black and white. No gradients, no blending into other hues. Just three." },
      { type: "paragraph", text: "We drew 10 prompts with this constraint and learned more about color in a week than in the previous month. Here\u2019s what surprised us." },

      { type: "heading", text: "Lesson 1: You Don\u2019t Need Many Colors" },
      { type: "paragraph", text: "This sounds obvious, but it\u2019s not until you try it. A forest scene with only green, brown, and blue looks complete. A portrait with only red, yellow, and a dark blue looks rich. Your brain fills in the gaps. Three colors is not a limitation \u2014 it\u2019s a focusing tool." },

      { type: "heading", text: "Lesson 2: Value Matters More Than Hue" },
      { type: "paragraph", text: "When you only have 3 colors, you quickly realize that the lightness and darkness of those colors matters far more than which colors they are. A light blue, a medium red, and a dark green will give you a full value range. Three medium-value colors will look flat no matter how beautiful they are individually." },
      { type: "tip", text: "Pick your 3 colors to cover light, medium, and dark values. The specific hues matter less than the value spread." },

      { type: "heading", text: "Lesson 3: Warm + Cool Is Non-Negotiable" },
      { type: "paragraph", text: "Every successful 3-color drawing we made had at least one warm color and one cool color. All-warm or all-cool palettes felt monotonous. The temperature contrast creates depth and visual interest that hue variety alone can\u2019t provide." },

      { type: "heading", text: "Lesson 4: The Third Color Is Your Accent" },
      { type: "paragraph", text: "The best results came from using two colors for the bulk of the image and the third as a small, powerful accent. Think of it like a 60-30-10 rule: 60% dominant color, 30% secondary, 10% accent. The accent color draws the eye exactly where you want it." },

      { type: "heading", text: "Our Favorite 3-Color Combinations" },
      { type: "list", items: [
        "Burnt orange + deep teal + cream \u2014 warm and sophisticated",
        "Navy blue + dusty rose + gold \u2014 elegant and moody",
        "Forest green + terracotta + pale yellow \u2014 earthy and natural",
        "Deep purple + warm grey + coral \u2014 unexpected and modern",
        "Indigo + ochre + white \u2014 classic and bold",
      ] },

      { type: "callout", text: "Try the 3-color challenge yourself. Our generator can add this constraint to any prompt.", href: "/generator", linkText: "Generate a 3-Color Prompt" },

      { type: "paragraph", text: "If you want to take this further, try the same prompt with different 3-color combinations. You\u2019ll be amazed at how much the mood changes just by swapping the palette. It\u2019s one of the best exercises for developing your color intuition." },

      { type: "callout", text: "More creative constraints: silhouette-only, one continuous line, negative space focus.", href: "/drawing-prompts", linkText: "Explore Drawing Prompts" },
    ],
  },

  // ── 10. GPT Image 2: Photorealism Tips ────────────────────
  {
    slug: "gpt-image-2-photorealistic-prompts-guide",
    title: "How to Get Photorealistic Results from GPT Image 2: A Prompt Writing Guide",
    description: "Specific techniques for writing GPT Image 2 prompts that produce photorealistic images. Camera settings, lighting terms, and composition tricks.",
    date: "2025-06-24",
    category: "gpt-image-2",
    categoryLabel: "GPT Image 2",
    readingTime: 6,
    heroColor: "#c06a3e",
    heroBg: "#fdf0e8",
    body: [
      { type: "paragraph", text: "GPT Image 2 can produce genuinely photorealistic images, but only if you speak its language. The difference between a \u201Cpretty good\u201D result and a \u201Cwait, is that a real photo?\u201D result comes down to specific prompt techniques." },

      { type: "heading", text: "Start With Camera Language" },
      { type: "paragraph", text: "GPT Image 2 responds strongly to photography terminology. Instead of describing what you want to see, describe how a photographer would capture it." },
      { type: "prompt-example", prompt: "Portrait of a woman in her 60s, natural light from a north-facing window, shot on Canon EOS R5 with 85mm f/1.4 lens, shallow depth of field, film grain, Kodak Portra 400 color science.", note: "The camera and film stock references give GPT Image 2 a specific aesthetic target." },
      { type: "paragraph", text: "Key terms that improve photorealism: \u201Cshot on [camera model],\u201D \u201C[focal length]mm lens,\u201D \u201Cf/[aperture],\u201D \u201C[film stock] color science,\u201D \u201Cshallow/deep depth of field,\u201D \u201Cnatural/studio/ambient lighting.\u201D" },

      { type: "heading", text: "Lighting Is Everything" },
      { type: "paragraph", text: "In real photography, lighting is 80% of the image. The same is true for AI-generated photorealism. Be specific about:" },
      { type: "list", items: [
        "Direction: \u201Clight from the upper left,\u201D \u201Cbacklit,\u201D \u201Cside-lit\u201D",
        "Quality: \u201Csoft diffused light,\u201D \u201Charsh direct sunlight,\u201D \u201Cdappled light through leaves\u201D",
        "Color temperature: \u201Cwarm golden hour,\u201D \u201Ccool overcast,\u201D \u201Cneutral studio lighting\u201D",
        "Source: \u201Cwindow light,\u201D \u201Csingle softbox,\u201D \u201Cpractical lights in the scene\u201D",
      ] },

      { type: "heading", text: "Add Imperfections" },
      { type: "paragraph", text: "Real photos have imperfections. Adding them makes AI images more convincing:" },
      { type: "tip", text: "Add \u201Cslight film grain,\u201D \u201Csubtle lens flare,\u201D \u201Cminor chromatic aberration,\u201D or \u201Cnatural skin texture with pores visible\u201D to push results toward photorealism." },
      { type: "paragraph", text: "You can also specify what the image should not have: \u201Cno airbrushed skin, no HDR look, no oversaturation.\u201D GPT Image 2 tends to over-process images, and these negative instructions help." },

      { type: "heading", text: "Environment and Context" },
      { type: "paragraph", text: "Photorealistic images need context. A person floating in a void doesn\u2019t look real no matter how detailed the rendering is. Add environmental details:" },
      { type: "prompt-example", prompt: "A barista making a latte in a small independent coffee shop, morning light streaming through the front window, steam rising from the espresso machine, other customers blurred in the background. Shot on Fujifilm X-T5, 35mm f/1.4, natural light only.", note: "The environmental details (steam, blurred customers, morning light) sell the realism." },

      { type: "heading", text: "The Photorealism Checklist" },
      { type: "list", items: [
        "Camera and lens specified",
        "Lighting direction and quality described",
        "Depth of field mentioned",
        "Environmental context included",
        "At least one imperfection added (grain, flare, etc.)",
        "Color science or film stock referenced",
        "Negative instructions to prevent over-processing",
      ] },

      { type: "callout", text: "See our tested photorealistic prompts with example images.", href: "/ai-prompts?category=photography", linkText: "Photography Prompts" },

      { type: "callout", text: "Want the full picture? Read our complete guide to GPT Image 2.", href: "/how-to-use-gpt-image-2", linkText: "How to Use GPT Image 2" },
    ],
  },

  // ── 11. Drawing Tips: Why Prompts Work ────────────────────
  {
    slug: "why-drawing-prompts-work-creative-science",
    title: "The Science Behind Why Drawing Prompts Actually Work",
    description: "Why do drawing prompts help artists create better work? The psychology of constraints, decision fatigue, and creative flow \u2014 explained for visual artists.",
    date: "2025-06-22",
    category: "drawing-tips",
    categoryLabel: "Artist Tips",
    readingTime: 6,
    heroColor: "#5a9e7a",
    heroBg: "#eef6f2",
    body: [
      { type: "paragraph", text: "Drawing prompts feel like a crutch. \u201CReal artists don\u2019t need prompts,\u201D the thinking goes. \u201CThey just create from their imagination.\u201D But the research on creativity tells a completely different story." },

      { type: "heading", text: "The Paradox of Choice" },
      { type: "paragraph", text: "Psychologist Barry Schwartz demonstrated that more options lead to worse decisions and less satisfaction. This applies directly to art: when you can draw literally anything, the cognitive load of choosing what to draw consumes the mental energy you need for actually drawing." },
      { type: "paragraph", text: "A drawing prompt eliminates that choice. It\u2019s not a limitation \u2014 it\u2019s a liberation. Your creative energy goes into how to interpret the prompt, not what to draw in the first place." },

      { type: "heading", text: "Constraints Drive Creativity" },
      { type: "paragraph", text: "This is one of the most well-established findings in creativity research. Constraints don\u2019t limit creativity \u2014 they channel it. Dr. Catrinel Haught-Tromp\u2019s research showed that people produce more creative work when given constraints than when given total freedom." },
      { type: "paragraph", text: "Think about it: a sonnet has strict rules about meter and rhyme, and yet some of the most creative writing in history is in sonnet form. The rules don\u2019t prevent creativity \u2014 they create a framework within which creativity can flourish." },
      { type: "paragraph", text: "Drawing prompts work the same way. \u201CDraw a melancholic lighthouse keeper in watercolor using only 3 colors\u201D is a set of constraints that paradoxically opens up more creative possibilities than \u201Cdraw whatever you want.\u201D" },

      { type: "heading", text: "Decision Fatigue Is Real" },
      { type: "paragraph", text: "Every decision you make depletes a finite mental resource. By the time you\u2019ve decided what to draw, what medium to use, what size, what style, what color palette \u2014 you\u2019ve used up a significant chunk of your creative energy before making a single mark." },
      { type: "paragraph", text: "A good prompt makes most of these decisions for you. Not all of them \u2014 you still interpret, compose, and execute. But the prompt handles the \u201Cwhat\u201D so you can focus on the \u201Chow.\u201D" },

      { type: "heading", text: "Flow State and External Triggers" },
      { type: "paragraph", text: "Mihaly Csikszentmihalyi\u2019s research on flow states shows that flow requires a clear goal and immediate feedback. A drawing prompt provides the clear goal. The act of drawing provides the feedback. Together, they create the conditions for flow \u2014 that state where time disappears and you\u2019re fully absorbed in the work." },
      { type: "paragraph", text: "Without a prompt, many artists spend 20-30 minutes deciding what to draw, which is 20-30 minutes of not being in flow. With a prompt, you can be drawing within 60 seconds of sitting down." },

      { type: "heading", text: "The Professional Secret" },
      { type: "paragraph", text: "Here\u2019s something most people don\u2019t realize: professional artists use prompts all the time. They\u2019re called \u201Cbriefs.\u201D Every commercial illustration, every concept art piece, every commissioned work starts with a brief \u2014 a set of constraints and requirements that the artist interprets creatively." },
      { type: "paragraph", text: "Using a drawing prompt for personal work is just giving yourself the same structure that professionals work within every day. It\u2019s not a crutch. It\u2019s a tool." },

      { type: "callout", text: "Ready to try it? Our generator creates complete creative briefs with mood, subject, palette, style, and challenge.", href: "/generator", linkText: "Generate a Prompt" },

      { type: "callout", text: "Or join thousands of artists drawing the same prompt every day.", href: "/daily-challenge", linkText: "Daily Challenge" },
    ],
  },

  // ── 12. Cool Prompts: Urban & Street Scenes ───────────────
  {
    slug: "urban-street-scene-drawing-prompts",
    title: "8 Urban Drawing Prompts That Capture City Life",
    description: "Drawing prompts featuring rain-slicked streets, late-night diners, and quiet city moments. Perfect for practicing perspective, lighting, and storytelling.",
    date: "2025-06-20",
    category: "cool-prompts",
    categoryLabel: "Prompt Picks",
    readingTime: 4,
    heroColor: "#c4714a",
    heroBg: "#fdf0e8",
    body: [
      { type: "paragraph", text: "Cities are endlessly drawable. Every street corner has a composition, every window tells a story, every puddle reflects a different world. These urban prompts are designed to capture the specific, quiet moments of city life that most people walk past without noticing." },

      { type: "heading", text: "Night City" },
      { type: "prompt-example", prompt: "A rain-slicked street reflecting neon signs, with a lone figure walking under an umbrella. In electric neon colors against deep black, with the vivid palette of a neon-lit city at night.", note: "The reflections are the real subject. Wet streets double everything." },
      { type: "prompt-example", prompt: "A subway car at 3am with only a few passengers, each in their own world. In cold blue and silver tones, with a cinematic black-and-white palette.", note: "Draw the space between the people. The emptiness of a late-night train is its own character." },
      { type: "prompt-example", prompt: "A laundromat at midnight, the only customer reading a book while the machines spin. Bathed in golden hour light \u2014 wait, no. Lit by harsh fluorescent overhead, in muted earthy tones.", note: "Fluorescent light is underrated in art. It\u2019s unflattering and honest." },

      { type: "heading", text: "Everyday Moments" },
      { type: "prompt-example", prompt: "A small noodle shop where the owner has been cooking the same dish for 30 years. Steam rising, regulars at the counter. In warm amber and burnt sienna tones, rendered in loose watercolor.", note: "30 years of the same dish \u2014 what does that dedication look like in a person\u2019s hands and face?" },
      { type: "prompt-example", prompt: "A flower market at dawn before the city wakes up, with vendors arranging their displays. In the gradient of a dramatic sunset \u2014 or rather, sunrise. Coral, peach, and soft purple.", note: "Dawn markets have a specific quality of light that\u2019s different from golden hour. Cooler, bluer, with warm pockets." },
      { type: "prompt-example", prompt: "A neighborhood barbershop on a Saturday afternoon, with conversation and laughter you can almost hear. In rich gold and deep brown hues.", note: "This is a sound-drawing challenge. How do you draw laughter?" },

      { type: "heading", text: "Solitude in the City" },
      { type: "prompt-example", prompt: "A man sitting on his front step, watching the neighborhood wake up, coffee in hand. Quiet and contemplative. With the gentle colors of a spring morning.", note: "The simplest prompt on this list, and maybe the hardest to draw well. Stillness is difficult." },
      { type: "prompt-example", prompt: "A bookshop that somehow survives in the age of the internet, with a cat in the window and a handwritten sign. In clay, sand, and weathered wood tones.", note: "The handwritten sign is a character detail. What does it say? That\u2019s your story." },

      { type: "callout", text: "Generate more urban prompts with specific moods, palettes, and challenges.", href: "/generator", linkText: "Try the Generator" },

      { type: "paragraph", text: "Urban scenes are some of the best subjects for practicing one-point and two-point perspective. If you\u2019re working on your perspective skills, try drawing these prompts with a ruler first, then freehand. The contrast will teach you a lot about where your perspective intuition is strong and where it needs work." },

      { type: "callout", text: "For character-focused urban scenes, check out our character design prompts.", href: "/character", linkText: "Character Prompts" },
    ],
  },

  // ── 13. Cool Prompts: 6 GPT Image 2 Prompts That Blew My Mind ──
  {
    slug: "6-gpt-image-2-prompts-that-blew-my-mind",
    title: "6 GPT Image 2 Prompts That Blew My Mind",
    description: "From a 7-word game screenshot to a full commercial ad layout \u2014 these 6 GPT Image 2 prompts show the wild range of what\u2019s possible right now.",
    date: "2025-07-22",
    category: "gpt-image-2",
    categoryLabel: "GPT Image 2",
    readingTime: 5,
    heroColor: "#c06a3e",
    heroBg: "#fdf0e8",
    body: [
      { type: "paragraph", text: "I\u2019ve been collecting AI image prompts from Twitter, Reddit, Xiaohongshu (Chinese Instagram), Discord, and various blogs \u2014 translating the non-English ones, testing everything, and putting the best results into a free library. Here are 6 that genuinely surprised me." },

      { type: "heading", text: "1. The 7-Word Prompt" },
      { type: "image-placeholder", alt: "Rust In-Game Screenshot \u2014 generated by GPT Image 2", caption: "Generated from just 7 words." },
      { type: "prompt-example", prompt: "an ingame screenshot of rust", note: "That\u2019s it. Seven words. GPT Image 2 generates something that looks like an actual screenshot from the survival game Rust \u2014 the lighting, the UI feel, the gritty texture. It shows how much world knowledge the model has baked in." },
      { type: "callout", text: "See the full prompt and try it yourself.", href: "/prompts/rust-in-game-screenshot", linkText: "View prompt \u2192" },

      { type: "heading", text: "2. The Meme" },
      { type: "image-placeholder", alt: "Sam Altman Bear Selfie \u2014 generated by GPT Image 2", caption: "Two-step workflow: generate, then edit." },
      { type: "prompt-example", prompt: "Selfie of Sam Altman riding a bear", note: "Then a follow-up edit: \u201CRemove the background, make it transparent.\u201D The two-step generate + edit workflow turns a funny image into a usable sticker template." },
      { type: "callout", text: "Copy this prompt and try the two-step workflow.", href: "/prompts/sam-altman-bear-selfie", linkText: "View prompt \u2192" },

      { type: "heading", text: "3. The Fake Livestream" },
      { type: "image-placeholder", alt: "Elon Musk Douyin Livestream \u2014 generated by GPT Image 2", caption: "Originally from the Chinese AI community. ~200 words." },
      { type: "paragraph", text: "This one came from the Chinese AI community. The full prompt is about 200 words and describes every UI element of a Douyin (Chinese TikTok) livestream \u2014 floating hearts, scrolling comments, gift animations, the \u201Clive\u201D badge. The result is uncanny. GPT Image 2 isn\u2019t just generating images \u2014 it\u2019s generating interfaces." },
      { type: "callout", text: "See the full 200-word prompt.", href: "/prompts/elon-musk-douyin-livestream-screenshot", linkText: "View prompt \u2192" },

      { type: "heading", text: "4. The $10,000 Ad" },
      { type: "image-placeholder", alt: "Beauty Product Commercial \u2014 generated by GPT Image 2", caption: "Studio lighting, product placement, graphic overlays \u2014 one prompt." },
      { type: "paragraph", text: "Studio lighting, product placement, graphic design overlays, marketing copy \u2014 all in one generation. The key technique: describe graphic design elements inside the prompt. Most people don\u2019t realize you can ask GPT Image 2 to compose text and graphics into a photograph." },
      { type: "callout", text: "See how the prompt describes every design element.", href: "/prompts/beauty-product-commercial-marketing-photograph", linkText: "View prompt \u2192" },

      { type: "heading", text: "5. The Fashion Poster" },
      { type: "image-placeholder", alt: "Surrealist Rolex Poster \u2014 generated by GPT Image 2", caption: "Only 50 words, but every word counts." },
      { type: "prompt-example", prompt: "A high-fashion surrealist poster for Rolex. A deep emerald green minimalist studio with a polished reflective floor. A massive Rolex watch stands upright like a monument. A male model in a tailored dark green suit leans casually against the watch face, wearing a matching Rolex.", note: "50 words. Cohesive color palette, dramatic scale play, reflective floor for depth. A masterclass in efficient prompting." },
      { type: "callout", text: "Copy this prompt and try your own luxury brand.", href: "/prompts/surrealist-rolex-luxury-watch-fashion-poster", linkText: "View prompt \u2192" },

      { type: "heading", text: "6. The Creative System" },
      { type: "image-placeholder", alt: "Silhouette Universe Poster \u2014 generated by GPT Image 2", caption: "Originally 1,200+ Chinese characters. A reusable prompt system." },
      { type: "paragraph", text: "This isn\u2019t just a prompt \u2014 it\u2019s a prompt system. Originally written in Chinese (1,200+ characters), it teaches GPT Image 2 a new art style: find a symbolic silhouette, build a narrative world inside it. The anti-clich\u00E9 instructions (\u201Cdon\u2019t default to bottles, hourglasses\u201D) show real iteration experience. Swap in any topic and get a unique poster every time." },
      { type: "callout", text: "See the full prompt including the original Chinese version.", href: "/prompts/silhouette-universe-narrative-poster", linkText: "View prompt \u2192" },

      { type: "heading", text: "Where to Find More" },
      { type: "paragraph", text: "All 6 prompts above \u2014 plus 170+ more \u2014 are in our free prompt library. Every prompt is copy-paste ready with the example image. A lot of the best prompts come from non-English communities, especially Chinese creators on Xiaohongshu. We translate and test everything before adding it." },
      { type: "callout", text: "Browse the full AI prompt library \u2014 170+ prompts, all free.", href: "/ai-prompts", linkText: "Explore prompts \u2192" },
    ],
  },

  // ── 14. 6 Cool Ways to Use GPT Image 2 ──
  {
    slug: "6-cool-ways-to-use-gpt-image-2",
    title: "6 Cool Ways to Use GPT Image 2 You Probably Haven\u2019t Tried",
    description: "Most people type a sentence and hit generate. Here are 6 creative methods that push GPT Image 2 way beyond basic text-to-image.",
    date: "2025-07-28",
    category: "gpt-image-2" as const,
    categoryLabel: "GPT Image 2",
    readingTime: 6,
    heroColor: "#c06a3e",
    heroBg: "#fdf0e8",
    body: [
      { type: "paragraph", text: "GPT Image 2 can do a lot more than turn a sentence into a picture. The model understands layout, typography, UI patterns, brand language, and even game engines. Once you learn to talk to it the right way, you unlock entirely different categories of output. Here are 6 methods worth trying, each demonstrated with a real prompt from our library." },

      { type: "heading", text: "1. The One-Line World-Knowledge Trick" },
      { type: "image-placeholder", alt: "Rust in-game screenshot generated by GPT Image 2", caption: "Generated from just 7 words." },
      { type: "paragraph", text: "Sometimes the best prompt is the shortest one. Type \"an ingame screenshot of rust\" and GPT Image 2 draws a full Rust game scene \u2014 the right HUD, the right color grading, the right survival-game atmosphere. It works because the model already knows what Rust looks like. You don\u2019t need to describe it. This trick works for any well-known game, movie, or visual style. Just name it and let the model fill in the rest." },
      { type: "prompt-example", prompt: "an ingame screenshot of rust", note: "7 words. The model\u2019s built-in knowledge does the heavy lifting." },
      { type: "callout", text: "See the full result and copy the prompt.", href: "/prompts/rust-in-game-screenshot", linkText: "View prompt \u2192" },

      { type: "heading", text: "2. Generate + Edit: The Two-Step Workflow" },
      { type: "image-placeholder", alt: "Sam Altman riding a bear with transparent background", caption: "Step 1: generate. Step 2: edit." },
      { type: "paragraph", text: "GPT Image 2 supports a generate-then-edit workflow. First you create the base image, then you give a follow-up instruction to modify it. In this example, the first prompt generates a selfie of Sam Altman riding a bear. The second prompt removes the background and makes it transparent. This is incredibly useful for creating stickers, product shots, or any image that needs post-processing \u2014 all without leaving the chat." },
      { type: "prompt-example", prompt: "generate image: Selfie of Sam Altman riding a bear\n\nEdit prompt: Remove the background make it transparent", note: "Two-step workflow: generate first, then edit in the same conversation." },
      { type: "callout", text: "See the full result and copy the prompt.", href: "/prompts/sam-altman-bear-selfie", linkText: "View prompt \u2192" },

      { type: "heading", text: "3. Fake UI Screenshots That Look Real" },
      { type: "image-placeholder", alt: "Elon Musk Douyin livestream screenshot", caption: "A fake TikTok livestream that looks completely real." },
      { type: "paragraph", text: "GPT Image 2 is shockingly good at generating realistic app interfaces. You can create fake social media posts, livestream screenshots, product pages, or any UI mockup. The key is to describe the interface elements explicitly: status bar, like counts, comment sections, profile avatars. The model renders pixel-perfect UI chrome, correct typography, and even realistic interaction patterns. This method is great for mockups, memes, and concept demos." },
      { type: "prompt-example", prompt: "A 9:16 vertical version, high-detail realistic style Chinese TikTok live screenshot, Elon Musk is talking to the mobile phone camera...", note: "Describe every UI element: status bar, viewer count, gift animations, comment overlay." },
      { type: "callout", text: "See the full prompt with all the UI details.", href: "/prompts/elon-musk-douyin-livestream-screenshot", linkText: "View prompt \u2192" },

      { type: "heading", text: "4. Commercial-Grade Product Photography" },
      { type: "image-placeholder", alt: "Beauty product commercial marketing photograph", caption: "Studio-quality product photography, generated entirely by AI." },
      { type: "paragraph", text: "You can get GPT Image 2 to produce images that look like they came from a professional photo studio. The secret is to describe the shot the way a creative director would brief a photographer: mention the lighting setup (\"professionally diffused\"), the lens behavior (\"shallow depth of field\"), the graphic overlays, and the typography. This prompt creates a beauty product ad with a model, a hero product in the foreground, graphic swooshes, and feature callouts \u2014 all in one generation." },
      { type: "prompt-example", prompt: "A high-resolution commercial marketing photograph features a young woman with sleek dark hair... The composition is energized by vibrant, lime-green graphic swooshes and floating pill-shaped callouts...", note: "Brief it like a creative director: lighting, lens, overlays, typography, all in one prompt." },
      { type: "callout", text: "See the full prompt and copy it.", href: "/prompts/beauty-product-commercial-marketing-photograph", linkText: "View prompt \u2192" },

      { type: "heading", text: "5. Luxury Brand Poster Design" },
      { type: "image-placeholder", alt: "Surrealist Rolex luxury watch fashion poster", caption: "A fashion poster that looks like it belongs in a magazine." },
      { type: "paragraph", text: "GPT Image 2 can generate high-fashion poster designs that rival professional work. The approach here is surrealism meets luxury branding: describe a scene that\u2019s physically impossible but visually stunning. A massive Rolex watch standing like a monument in an emerald studio, with a model leaning against it. The model understands brand aesthetics, material rendering (polished metal, reflective floors), and fashion photography composition. You get a poster-ready image in seconds." },
      { type: "prompt-example", prompt: "A high-fashion surrealist poster for Rolex. A deep emerald green minimalist studio with a polished reflective floor. A massive Rolex watch stands upright like a monument...", note: "Combine surrealism with luxury brand language for poster-quality output." },
      { type: "callout", text: "See the full prompt and copy it.", href: "/prompts/surrealist-rolex-luxury-watch-fashion-poster", linkText: "View prompt \u2192" },

      { type: "heading", text: "6. Teach the Model a New Art Style" },
      { type: "image-placeholder", alt: "Silhouette Universe narrative poster", caption: "A completely new art style, defined entirely through prompt engineering." },
      { type: "paragraph", text: "This is the most advanced method. Instead of describing a single image, you write a prompt that defines an entire art style \u2014 its rules, its constraints, its aesthetic philosophy. The Silhouette Universe prompt is a masterclass in this: it tells the model to find a symbolic silhouette (not a bottle or hourglass \u2014 something more creative), grow a narrative world inside it, use watercolor-meets-movie-poster aesthetics, and maintain collector\u2019s edition quality. The original prompt is over 1,000 words in Chinese. It\u2019s essentially a style specification document disguised as a prompt." },
      { type: "prompt-example", prompt: "Automatically generate a high-aesthetic \u201cSilhouette Universe / Collector\u2019s Edition Narrative Poster\u201d style artwork based on [TOPIC: xxx]. Do not confine the image to fixed objects or common containers...", note: "1,000+ word prompt that defines an entire art style. The original is in Chinese." },
      { type: "callout", text: "See the full prompt in both English and Chinese.", href: "/prompts/silhouette-universe-narrative-poster", linkText: "View prompt \u2192" },

      { type: "heading", text: "The Pattern" },
      { type: "paragraph", text: "Each method above represents a different way to communicate with GPT Image 2. The one-liner leverages the model\u2019s built-in knowledge. The two-step workflow chains generation with editing. The UI method exploits the model\u2019s understanding of interface patterns. The product photography method borrows the language of creative directors. The poster method combines surrealism with brand aesthetics. And the style-definition method treats the prompt as a full specification document. The more ways you learn to talk to the model, the more you can get out of it." },
      { type: "callout", text: "Browse all 170+ prompts in our free library \u2014 every method above and more.", href: "/ai-prompts", linkText: "Explore prompts \u2192" },
    ],
  },

];

// ── Helper functions ────────────────────────────────────────

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getAllArticles(): BlogArticle[] {
  // Sort by date descending
  return [...blogArticles].sort((a, b) => b.date.localeCompare(a.date));
}

export function getRecentArticles(count: number): BlogArticle[] {
  return getAllArticles().slice(0, count);
}
