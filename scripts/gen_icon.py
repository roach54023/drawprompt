"""
Generate favicon.ico, icon.png (512x512), and apple-touch-icon.png (180x180)
for DrawingPrompt using Pillow — pure pixel drawing, no external deps.

Brand colors:
  background: #c4714a  (warm terracotta)
  pencil:     #ffffff  (white)
"""

from PIL import Image, ImageDraw
import math, os

# ── helpers ──────────────────────────────────────────────────────────────────

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

BG    = hex_to_rgb("#c4714a")
WHITE = (255, 255, 255, 255)
BG_A  = BG + (255,)
BAND  = (220, 200, 190, 255)  # subtle warm grey band

def rounded_rect_mask(size, radius_frac=0.22):
    w, h = size, size
    r = int(size * radius_frac)
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, w-1, h-1], radius=r, fill=255)
    return mask

def draw_pencil(draw, cx, cy, length, width, angle_deg):
    a = math.radians(angle_deg)
    cos_a, sin_a = math.cos(a), math.sin(a)
    along = ( cos_a,  sin_a)
    perp  = (-sin_a,  cos_a)

    half_l     = length / 2
    half_w     = width  / 2
    tip_len    = width * 1.1
    eraser_len = width * 0.9
    band_len   = width * 0.28

    tip_end    = -half_l
    body_start = tip_end + tip_len
    body_end   = half_l - eraser_len - band_len
    band_end   = body_end + band_len
    eraser_end = band_end + eraser_len

    def pt(al, pe):
        return (cx + al*along[0] + pe*perp[0],
                cy + al*along[1] + pe*perp[1])

    # Tip triangle
    draw.polygon([pt(tip_end, 0), pt(body_start, -half_w), pt(body_start, half_w)], fill=WHITE)

    # Body rectangle
    draw.polygon([pt(body_start, -half_w), pt(body_end, -half_w),
                  pt(body_end, half_w),    pt(body_start, half_w)], fill=WHITE)

    # Metal band
    draw.polygon([pt(body_end, -half_w), pt(band_end, -half_w),
                  pt(band_end, half_w),  pt(body_end, half_w)], fill=BAND)

    # Eraser rectangle
    draw.polygon([pt(band_end, -half_w), pt(eraser_end, -half_w),
                  pt(eraser_end, half_w), pt(band_end, half_w)], fill=WHITE)

    # Rounded eraser end cap
    ex = cx + eraser_end * along[0]
    ey = cy + eraser_end * along[1]
    draw.ellipse([ex-half_w, ey-half_w, ex+half_w, ey+half_w], fill=WHITE)


def make_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bg_layer = Image.new("RGBA", (size, size), BG_A)
    mask = rounded_rect_mask(size, radius_frac=0.22)
    img.paste(bg_layer, mask=mask)

    draw = ImageDraw.Draw(img)
    # Shift center slightly toward bottom-left so visual weight is centered
    offset = size * 0.03
    cx = size / 2 - offset
    cy = size / 2 + offset
    length = size * 0.60
    width  = size * 0.125
    draw_pencil(draw, cx, cy, length, width, angle_deg=-45)
    return img


# ── output paths ──────────────────────────────────────────────────────────────

base = os.path.dirname(os.path.abspath(__file__))
app_dir = os.path.join(base, "..", "app")
pub_dir = os.path.join(base, "..", "public")
os.makedirs(pub_dir, exist_ok=True)

# 512×512 — Next.js App Router uses app/icon.png automatically
icon_512 = make_icon(512)
icon_512.save(os.path.join(app_dir, "icon.png"), "PNG")
print("✓ app/icon.png (512×512)")

# 180×180 apple-touch-icon
icon_180 = make_icon(180)
icon_180.save(os.path.join(pub_dir, "apple-touch-icon.png"), "PNG")
print("✓ public/apple-touch-icon.png (180×180)")

# favicon.ico — 16, 32, 48 multi-size
sizes  = [16, 32, 48]
frames = [make_icon(s).convert("RGBA") for s in sizes]
frames[0].save(
    os.path.join(app_dir, "favicon.ico"),
    format="ICO",
    sizes=[(s, s) for s in sizes],
    append_images=frames[1:],
)
print(f"✓ app/favicon.ico (16, 32, 48px)")
print("\nDone.")
