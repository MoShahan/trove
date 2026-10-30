import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
