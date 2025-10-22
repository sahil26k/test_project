import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // Removed outputFileTracingRoot as it was pointing to non-existent directory
  // Removed turbopack configuration as it's not needed for production builds
  // Removed build error suppression to catch actual issues
};

export default nextConfig;
