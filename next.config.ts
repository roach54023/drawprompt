import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All prompt images are now local (public/prompts/), no remote patterns needed
    // Use unoptimized for static export / Cloudflare Pages
    unoptimized: true,
  },
};

export default nextConfig;
