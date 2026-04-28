import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
    // Define the widths Next.js <Image> can request — must match our pre-generated sizes
    deviceSizes: [800, 1200],
    imageSizes: [400],
  },
};

export default nextConfig;
