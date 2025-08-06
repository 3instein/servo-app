import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cf-assets.gms.church",
      },
    ],
  },
};

export default nextConfig;
