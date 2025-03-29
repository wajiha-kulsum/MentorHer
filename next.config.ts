import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARNING !!
    // This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    // !! WARNING !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
