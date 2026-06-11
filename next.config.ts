import type { NextConfig } from "next";

// Preview builds set NEXT_PUBLIC_BASE_PATH (e.g. "/antares-preview") so the
// static export works under a GitHub Pages project subpath. Empty in prod.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  ...(basePath ? { assetPrefix: basePath } : {}),
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
