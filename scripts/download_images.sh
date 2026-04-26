#!/bin/bash
# Download real GPT Image 2 example images from awesome-gpt-image repo
# These are actual AI-generated images, not stock photos

OUT="/Users/jiangzihaojiangzihao/Desktop/新项目/drawing-prompt-generator/public/prompts"
mkdir -p "$OUT"

echo "=== Downloading GPT Image 2 example images ==="

# GitHub user-attachments (reliable, permanent)
echo "[1/20] Convenience Store Night (GPT Image 2 output)"
curl -sL "https://github.com/user-attachments/assets/91c95d69-1094-472e-9410-8a86bad9b086" -o "$OUT/convenience-store-night.png"

echo "[2/20] Celebrity in real life (Sam Altman etc)"
curl -sL "https://github.com/user-attachments/assets/45e4f24f-4f73-4426-947d-e6ed51291956" -o "$OUT/celebrity-real-life.png"

echo "[3/20] Hitman Style Game Screenshot"
curl -sL "https://github.com/user-attachments/assets/e89dc393-653c-42e7-87f8-cd7741640f12" -o "$OUT/hitman-game-screenshot.png"

echo "[4/20] Black Myth Wukong (GPT Image)"
curl -sL "https://github.com/user-attachments/assets/3e6a725a-a983-4556-93de-e4eb2ed135ed" -o "$OUT/black-myth-wukong.png"

echo "[5/20] TikTok Live Streaming Screenshot"
curl -sL "https://github.com/user-attachments/assets/be639d3b-617b-4332-98eb-4deb2484ac66" -o "$OUT/tiktok-live-screenshot.png"

echo "[6/20] E-commerce App Homepage (GPT Image)"
curl -sL "https://github.com/user-attachments/assets/c5589395-f03e-4e52-9a7f-a39adc9cc8bb" -o "$OUT/ecommerce-app-homepage.png"

echo "[7/20] Music Player UI (GPT Image)"
curl -sL "https://github.com/user-attachments/assets/ee3d40db-3918-4974-8b82-68cd166c97b2" -o "$OUT/music-player-ui.png"

echo "[8/20] Chinese Tea Poster"
curl -sL "https://github.com/user-attachments/assets/552ba84c-41cb-401d-a1b0-ee13a6f7aa41" -o "$OUT/chinese-tea-poster.png"

echo "[9/20] Movie Collage Superman"
curl -sL "https://github.com/user-attachments/assets/68495d40-f558-4d7a-aacf-40ef36264679" -o "$OUT/movie-collage-superman.png"

echo "[10/20] Pet Brand Collab (reference cat)"
curl -sL "https://github.com/user-attachments/assets/7efff353-b76b-4986-9894-24823e630dd7" -o "$OUT/pet-brand-collab.png"

echo "[11/20] Convenience Store (Nano Banana comparison)"
curl -sL "https://github.com/user-attachments/assets/d529419b-8f8f-4dd4-a5f2-46d5fcbcf607" -o "$OUT/convenience-store-nano.png"

echo "[12/20] E-commerce App (Nano Banana)"
curl -sL "https://github.com/user-attachments/assets/6b709a24-b00a-4942-8c77-8f10ac03e8f8" -o "$OUT/ecommerce-app-nano.png"

echo "[13/20] Music Player UI (Nano Banana)"
curl -sL "https://github.com/user-attachments/assets/88f33c6a-c307-4e7a-af7e-5f692cbf41a1" -o "$OUT/music-player-nano.png"

echo "[14/20] Black Myth Wukong (Nano Banana)"
curl -sL "https://github.com/user-attachments/assets/49e41036-4ad4-4908-a3a8-88a2f28f1148" -o "$OUT/black-myth-wukong-nano.png"

# Raw GitHub repo assets (OpenNana images)
echo "[15/20] Apple Park Keynote"
curl -sL "https://raw.githubusercontent.com/ZeroLu/awesome-gpt-image/main/assets/opennana/apple-park-tim-cook-keynote.jpg" -o "$OUT/apple-park-keynote.jpg"

echo "[16/20] Handwritten Notebook"
curl -sL "https://raw.githubusercontent.com/ZeroLu/awesome-gpt-image/main/assets/opennana/black-pen-handwritten-notes.jpg" -o "$OUT/handwritten-notebook.jpg"

echo "[17/20] Song Dynasty Social Feed"
curl -sL "https://raw.githubusercontent.com/ZeroLu/awesome-gpt-image/main/assets/opennana/song-dynasty-cyber-social-feed.jpg" -o "$OUT/song-dynasty-social.jpg"

echo "[18/20] Character Reference Sheet"
curl -sL "https://raw.githubusercontent.com/ZeroLu/awesome-gpt-image/main/assets/opennana/official-character-reference-sheet.jpeg" -o "$OUT/character-reference-sheet.jpeg"

echo "[19/20] Custom Style UI System"
curl -sL "https://raw.githubusercontent.com/ZeroLu/awesome-gpt-image/main/assets/opennana/custom-style-ui-system.jpeg" -o "$OUT/custom-style-ui-system.jpeg"

echo "[20/20] Douyin Livestream"
curl -sL "https://raw.githubusercontent.com/ZeroLu/awesome-gpt-image/main/assets/opennana/liu-yifei-douyin-live-chat.jpg" -o "$OUT/douyin-livestream.jpg"

# Additional: Terminator Taobao, Museum infographic, etc
echo "[bonus] Terminator Taobao Page"
curl -sL "https://raw.githubusercontent.com/ZeroLu/awesome-gpt-image/main/assets/opennana/terminator-taobao-page.jpeg" -o "$OUT/terminator-taobao.jpeg"

echo "[bonus] Museum Infographic"
curl -sL "https://raw.githubusercontent.com/ZeroLu/awesome-gpt-image/main/assets/opennana/museum-level-chinese-disassembly-infographic.jpeg" -o "$OUT/museum-infographic.jpeg"

echo "[bonus] Porcelain Diagram"
curl -sL "https://raw.githubusercontent.com/ZeroLu/awesome-gpt-image/main/assets/opennana/jingdezhen-blue-white-porcelain-diagram.jpeg" -o "$OUT/porcelain-diagram.jpeg"

echo "[bonus] Character Relationship Map"
curl -sL "https://raw.githubusercontent.com/ZeroLu/awesome-gpt-image/main/assets/opennana/key-character-relationship-map.jpeg" -o "$OUT/character-relationship-map.jpeg"

echo ""
echo "=== Download complete. Checking file sizes ==="
ls -lh "$OUT/" | awk '{print $5, $9}'
