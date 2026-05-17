# DrawPrompt.org 每日 Prompt 发现报告
**日期**: 2026-05-17
**任务**: 每日 Prompt 发现（自动化执行）
**现有 Prompt 数量**: 180 个
**候选来源**: X/Twitter 趋势线索 · Reddit 搜索补充 · appark.ai · oimi.ai · getpromptsnap.com · 既有社区传播案例

---

## 候选 Prompt 列表（共 5 条，已去重）

---

### 候选 1 ✅ 推荐优先收录

**标题**: Live Stream UI Overlay Portrait
**建议 Slug**: `live-stream-ui-overlay-portrait`
**来源**: appark.ai《GPT Image 2 高阶提示词模板合集》
**趋势热度**: ⭐⭐⭐⭐⭐（直播电商 + 文字渲染 + 人像叠加，是 2026 年最容易扩散的截图型玩法之一）

**核心 Prompt（可直接使用）**:
```text
Generate a realistic live streaming UI mockup overlaid on a portrait of [HOST NAME], smiling, wearing a black T-shirt with white tech diagrams. Background shows screens with brand logos on left and right.

UI overlay includes:
- Top header: host avatar, name "[HOST NAME]", subtitle "556K likes this session", red "Follow" button, gold rank badge "Nationwide #1", viewer count "687K"
- Mid-left gift notifications: 2 items — "Tech Enthusiast sent 1314 hearts", "Stargazer sent 666 rockets"
- Bottom-left chat: 7 messages in Chinese/English from viewers
- Bottom-right product card: orange "HOT x1888" tag, product image "[PRODUCT]", price "[PRICE]", red "Grab" button
- Bottom bar: text input "Say something...", emoji/cart/gift/share icons
- Semi-transparent floating hearts rising along right edge

Aspect ratio 9:16, photorealistic portrait, mobile live stream aesthetic.
```

**为什么推荐**:
- 直接利用 GPT Image 2 的文字渲染能力，把人像、界面层、弹幕、礼物通知一次性融合
- 比普通 app mockup 更具“社交平台真实截图感”，传播效率高
- 可替换主播、商品、品牌和语言，适合持续扩写成系列内容

**去重确认**: 无重复（现有库有 `one-prompt-ui-design-generation`，但没有直播 UI + 人像叠加的社媒截图玩法）

**推荐分类**: `ui-design`
**推荐标签**: `live-stream`, `ui-overlay`, `social-media`, `screenshot`, `portrait`, `text-rendering`
**难度**: `advanced`

---

### 候选 2 ✅ 推荐优先收录

**标题**: Museum-Style Chinese Breakdown Infographic
**建议 Slug**: `museum-style-chinese-breakdown-infographic`
**来源**: oimi.ai《Top 50+ ChatGPT Images 2.0 热门提示词》
**趋势热度**: ⭐⭐⭐⭐⭐（中文文字渲染能力展示的强势玩法，适合知识卡片、文化科普、品牌内容）

**核心 Prompt（可直接使用）**:
```text
Generate a museum-style Chinese infographic breakdown of [TOPIC].

The image should combine photorealistic main visual, structural breakdown, Chinese annotations, material descriptions, pattern symbolism, color meanings, and key feature summary. Auto-determine the most appropriate subject, artifact structure, historical style, key components, material craftsmanship, color scheme, and layout.

Overall style: National Museum exhibition panel, historical costume atlas, cultural heritage infographic — NOT a poster, ancient-style photo, e-commerce detail page, or anime illustration.

Background: rice white / silk paper white / light tea color paper texture. Tone: refined, restrained, professional, collectible.

Fixed layout:
- Top: Chinese main title + subtitle + introduction
- Left: structural breakdown zone with Chinese callout lines and close-up details
- Upper right: material/craft/texture zone with real texture swatches
- Middle right: pattern/color/symbolism zone with color palette and cultural explanation
- Bottom: assembly sequence / construction flowchart + key feature summary

If topic suits human display: full-body standing figure as center. If better for artifacts: center exploded diagram. All text must be Simplified Chinese, clear and legible.

Avoid: poster feel, studio photo feel, e-commerce feel, anime feel, messy annotations, blurry text, fake materials, over-decoration.
```

**为什么推荐**:
- 专门吃到 GPT Image 2 的中文排版和信息图渲染优势
- 可用于服饰、文物、建筑、科技产品等多主题，扩展性极强
- 高质量中文知识图在小红书、公众号、微博等平台天然有传播空间

**去重确认**: 部分相近但可独立（现有库有 `science-encyclopedia-infographic` 和 `theme-science-encyclopedia-card`，但没有“博物馆展陈 + 中文拆解图鉴”这个更明确的文化知识视觉方向）

**推荐分类**: `infographic`
**推荐标签**: `chinese`, `museum`, `breakdown`, `infographic`, `knowledge-design`, `text-rendering`
**难度**: `advanced`

---

### 候选 3 ✅ 推荐收录

**标题**: 1980s Propaganda Poster Parody
**建议 Slug**: `1980s-propaganda-poster-parody`
**来源**: oimi.ai 热门提示词整理，来自 X/Twitter 社交传播案例
**趋势热度**: ⭐⭐⭐⭐（复古宣传画 + 现代科技事件/人物，反差强，容易形成 meme 式传播）

**核心 Prompt（可直接使用）**:
```text
Generate a 1980s Chinese propaganda poster style illustration celebrating [EVENT/ACHIEVEMENT].

Style: authentic Cultural Revolution / Reform and Opening Up era propaganda art — bold flat colors, heroic poses, red and gold palette, dramatic upward-looking composition, simplified graphic figures, bold Chinese calligraphy slogan at top.

Slogan text (render exactly): "[YOUR SLOGAN]"

Featured figures: [PERSON 1], [PERSON 2], [PERSON 3] — depicted in heroic propaganda style with slightly idealized features, wearing era-appropriate attire or modern clothing rendered in propaganda art style.

Background: radiant sunburst pattern, red flag elements, industrial or technological imagery appropriate to the theme.

Details: wheat sheaf borders, red star accents, bold outline strokes, flat color fills with minimal shading, vintage print texture with slight grain and color registration offset.

Aspect ratio 3:4, portrait orientation.
```

**为什么推荐**:
- 具备极强视觉记忆点，适合热点事件、产品发布、团队庆功等场景
- 现代人物/品牌与复古宣传画结合，天然适合社交媒体二创和转发
- 文案、人物、事件都可替换，模板稳定

**去重确认**: 无重复（现有 poster 库以现代海报和概念视觉为主，没有复古宣传画 parody 方向）

**推荐分类**: `poster`
**推荐标签**: `propaganda`, `retro`, `poster-design`, `meme`, `chinese-style`, `graphic-design`
**难度**: `intermediate`

---

### 候选 4 ✅ 推荐收录

**标题**: Hand-Drawn City Food Map
**建议 Slug**: `hand-drawn-city-food-map-template`
**来源**: oimi.ai 热门提示词整理与 X/Twitter 传播案例
**趋势热度**: ⭐⭐⭐⭐（城市地图 + 手绘食物插画 + 文字标注，实用性与分享性兼具）

**核心 Prompt（可直接使用）**:
```text
Generate a hand-drawn style city food map centered on [CITY NAME].

Layout: bird's-eye view simplified hand-drawn city map as base, marking major roads and landmarks without precise scale — prioritizing cute hand-drawn aesthetic over accuracy.

Distribute 12 food location illustrations across the map, each occupying ~5% of the map area. Each illustration shows a signature dish with steam/motion, accompanied by hand-lettered store name and one-line recommendation quote.

Map border: hand-drawn vines and [LOCAL INGREDIENT] decorations forming a frame. Lower right: hand-drawn compass and legend. Upper left: title "[CITY]·[THEME] Food Map" in fat rounded hand-lettered art style with decorative elements.

Overall style: watercolor + colored pencil mixed hand-drawn texture. Color palette: warm tones. Aspect ratio 1:1.

All text in [LANGUAGE], clear and legible, hand-lettered style.
```

**为什么推荐**:
- 城市、美食、旅游三类高传播题材合一，适合做系列专题
- GPT Image 2 对复杂布局、多插画和文字混排的能力在这个模板里很明显
- 除了美食，还可以拓展到咖啡馆地图、夜生活地图、景点地图

**去重确认**: 有近似，不建议优先（现有库已收录 `chengdu-food-map-illustration`，本候选更适合作为其“通用模板升级版”，不是完全全新的方向）

**推荐分类**: `poster`
**推荐标签**: `food-map`, `hand-drawn`, `city-guide`, `illustration`, `travel`, `infographic`
**难度**: `intermediate`

---

### 候选 5 ✅ 推荐优先收录

**标题**: Lo-Fi Realism Candid Lifestyle Shot
**建议 Slug**: `lofi-realism-candid-lifestyle-shot`
**来源**: getpromptsnap.com《Trending AI Image Styles in 2026》
**趋势热度**: ⭐⭐⭐⭐⭐（2026 年写实图像的重要趋势，从“AI 感大片”转向“像朋友随手拍的真实照片”）

**核心 Prompt（可直接使用）**:
```text
A candid photo of [SUBJECT], shot on an iPhone, slightly overexposed, warm afternoon light through a window, film grain, no filters, genuine and unstaged.

Technical details: 26mm equivalent lens, natural window light, slight motion blur on hands, authentic skin tones with visible pores, coffee cups and table clutter in frame, shallow depth of field with background softly out of focus.

Mood: the kind of photo someone actually takes of their friends — imperfect, warm, real. NOT a professional photoshoot. NOT posed. NOT retouched.

Color: warm, slightly faded, reminiscent of iPhone 12 camera output. Subtle lens flare from window light.

Aspect ratio 4:5.
```

**为什么推荐**:
- 非常符合 2026 年“去 AI 味”的内容趋势，适合社交平台日常内容创作
- 与复古一次性相机不同，这个方向强调“当下手机真实抓拍”
- 可替换人物、空间、活动场景，适合批量生成

**去重确认**: 无重复（现有库有 `2008-family-photo-recreation`、CCD/胶片类怀旧风，但没有针对当代 iPhone 随手拍真实感的专门模板）

**推荐分类**: `photography`
**推荐标签**: `lofi`, `candid`, `iphone-photo`, `realistic`, `lifestyle`, `social-media`
**难度**: `beginner`

---

## 去重排除记录

以下方向在筛选过程中被降级或排除：

| 候选方向 | 处理结论 | 相关现有 Slug |
|---------|---------|-------------|
| 历史人物朋友圈 / 历史人物发帖截图 | 排除，方向重复 | `song-dynasty-social-media-feed`, `historical-figure-social-media-post` |
| 完整 UI 设计系统展示 | 不优先，已有近似 | `one-prompt-ui-design-generation` |
| 通用手绘城市美食地图 | 保留但降级 | `chengdu-food-map-illustration` |
| 通用百科图鉴卡片 | 不优先，已有近似 | `science-encyclopedia-infographic`, `theme-science-encyclopedia-card` |

---

## 本次趋势总结

2026 年 5 月中旬的 AI 图片 prompt 热点，明显呈现出几个方向。第一，截图型内容继续升温，但重点已经从普通 App mockup 转向更有“在场感”的直播界面、社交帖子和互动层叠加画面。第二，中文排版和中文信息图的可用性大幅提升，带动了博物馆图鉴、拆解图、知识卡片一类内容快速流行。第三，视觉传播正在从“极致精修大片”分化出另一条路线，也就是 Lo-Fi Realism：故意保留手机抓拍、轻微过曝、动作模糊和生活杂物，让图片更像真实社交媒体照片。第四，带有文化反差和 meme 气质的视觉模板，例如复古宣传画 parody，依旧有很强的社交扩散能力。

---

## 操作建议

优先建议人工审核候选 1、候选 2、候选 5。这三类和现有库的重叠度最低，同时又最能体现 2026 年新的使用趋势。候选 3 适合作为热点或节庆专题补充。候选 4 可以保留，但更像对现有成都美食地图方向的模板泛化，不建议作为第一优先级。

---

*报告生成时间：2026-05-17 09:01 CST*
*数据来源：X/Twitter 公开传播线索 · Reddit 搜索补充 · appark.ai · oimi.ai · getpromptsnap.com*
