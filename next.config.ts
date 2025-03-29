import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  experimental: {
    // @ts-ignore: 'optimizeFonts' is not defined in the type but works at runtime.
    optimizeFonts: false,
  },
};

export default nextConfig;
