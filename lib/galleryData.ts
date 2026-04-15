/**
 * Gallery submissions — curated by hand.
 *
 * HOW TO ADD A NEW ENTRY:
 * 1. Save the image to /public/gallery/<date>-<author>.jpg  (or .png / .webp)
 * 2. Add a new object to the GALLERY array below.
 * 3. Push to GitHub / redeploy — the gallery page updates automatically.
 *
 * Fields:
 *   date        — YYYY-MM-DD, the daily challenge this artwork was drawn for
 *   image       — path relative to /public, e.g. "/gallery/2026-04-15-jane.jpg"
 *   author      — display name / handle shown under the image
 *   socialUrl   — optional link to their profile (Instagram, X, etc.)
 *   prompt      — the prompt text (copy from the daily challenge page)
 */

export interface GalleryEntry {
  date: string;
  image: string;
  author: string;
  socialUrl?: string;
  prompt?: string;
}

export const GALLERY: GalleryEntry[] = [
  // ── Example entry (delete when you have real submissions) ──────────────────
  // {
  //   date: "2026-04-15",
  //   image: "/gallery/2026-04-15-example.jpg",
  //   author: "@artist_name",
  //   socialUrl: "https://instagram.com/artist_name",
  //   prompt: "Soft with wonder, a rogue android who has developed the ability to dream…",
  // },
];

/** Return all entries sorted newest first */
export function getGalleryEntries(): GalleryEntry[] {
  return [...GALLERY].sort((a, b) => b.date.localeCompare(a.date));
}

/** Return entries for a specific date */
export function getEntriesForDate(date: string): GalleryEntry[] {
  return GALLERY.filter((e) => e.date === date);
}
