#!/usr/bin/env node
/**
 * Build-time image optimization script.
 *
 * Reads every .jpg in public/prompts/ and generates WebP variants
 * at multiple widths into public/prompts/optimized/.
 *
 * Output naming: {slug}-{width}w.webp
 *
 * Usage:  node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { join, basename, extname } from "node:path";

const SRC_DIR = "public/prompts";
const OUT_DIR = "public/prompts/optimized";
const WIDTHS = [400, 800, 1200];
const QUALITY = 80; // WebP quality — good balance of size vs visual quality

async function main() {
  // Ensure output dir exists
  await mkdir(OUT_DIR, { recursive: true });

  const files = (await readdir(SRC_DIR)).filter(
    (f) => f.endsWith(".jpg") || f.endsWith(".jpeg") || f.endsWith(".png")
  );

  console.log(`\n🖼  Found ${files.length} source images in ${SRC_DIR}/`);
  console.log(`📐  Generating WebP at widths: ${WIDTHS.join(", ")}px`);
  console.log(`🎯  Quality: ${QUALITY}\n`);

  let totalSrcBytes = 0;
  let totalOutBytes = 0;
  let generated = 0;

  for (const file of files) {
    const srcPath = join(SRC_DIR, file);
    const slug = basename(file, extname(file));
    const srcStat = await stat(srcPath);
    totalSrcBytes += srcStat.size;

    for (const width of WIDTHS) {
      const outName = `${slug}-${width}w.webp`;
      const outPath = join(OUT_DIR, outName);

      // Skip if already exists (incremental builds)
      try {
        const existing = await stat(outPath);
        if (existing.size > 0) {
          totalOutBytes += existing.size;
          generated++;
          continue;
        }
      } catch {
        // File doesn't exist, generate it
      }

      await sharp(srcPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);

      const outStat = await stat(outPath);
      totalOutBytes += outStat.size;
      generated++;
    }

    process.stdout.write(`  ✓ ${slug}\n`);
  }

  const srcMB = (totalSrcBytes / 1024 / 1024).toFixed(1);
  const outMB = (totalOutBytes / 1024 / 1024).toFixed(1);
  const savings = (((totalSrcBytes - totalOutBytes / WIDTHS.length) / totalSrcBytes) * 100).toFixed(0);

  console.log(`\n✅  Done! Generated ${generated} WebP files.`);
  console.log(`📊  Source: ${srcMB} MB (${files.length} originals)`);
  console.log(`📊  Output: ${outMB} MB (${generated} variants total)`);
  console.log(`💾  Average savings per equivalent size: ~${savings}%\n`);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
