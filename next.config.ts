import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
    // Define the widths Next.js <Image> can request — must match our pre-generated sizes
    deviceSizes: [800, 1200],
    imageSizes: [400],
  },
  // Exclude better-sqlite3 from server bundle (only used in local dev via require())
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
