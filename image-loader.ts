/**
 * Custom Next.js image loader for build-time optimized WebP images.
 *
 * Images are pre-generated at 400w, 800w, 1200w in public/prompts/optimized/.
 * This loader maps the requested width to the nearest available variant.
 *
 * For non-prompt images (e.g. external URLs), falls back to the original src.
 */

const AVAILABLE_WIDTHS = [400, 800, 1200];

export default function cloudflareLoader({
  src,
  width,
  quality: _quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // Only optimize local prompt images
  if (!src.startsWith("/prompts/") || !src.endsWith(".jpg")) {
    return src;
  }

  // Pick the smallest available width that is >= requested width
  const targetWidth =
    AVAILABLE_WIDTHS.find((w) => w >= width) ??
    AVAILABLE_WIDTHS[AVAILABLE_WIDTHS.length - 1];

  // /prompts/my-image.jpg → /prompts/optimized/my-image-800w.webp
  const slug = src.replace("/prompts/", "").replace(/\.(jpg|jpeg|png)$/, "");
  return `/prompts/optimized/${slug}-${targetWidth}w.webp`;
}
