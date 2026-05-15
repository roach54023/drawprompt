import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
    // Define the widths Next.js <Image> can request — must match our pre-generated sizes
    deviceSizes: [800, 1200],
    imageSizes: [400],
  },
  async headers() {
    return [
      {
        source: "/prompts/optimized/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/prompts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Exclude better-sqlite3 from server bundle (only used in local dev via require())
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
