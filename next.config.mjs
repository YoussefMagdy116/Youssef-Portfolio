/**
 * Local development / `next start`: standard server build (default).
 * GitHub Pages deploy: set EXPORT=1 and NEXT_PUBLIC_BASE_PATH=/Youssef-Portfolio
 * to produce a fully static export in ./out that works under the repo sub-path.
 */

/** @type {import('next').NextConfig} */
const isExport = process.env.EXPORT === "1";
const basePath = "/Youssef-Portfolio";

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Lint is run explicitly via `npm run lint`; keep production builds unblocked.
    ignoreDuringBuilds: true,
  },
  ...(isExport
    ? {
        output: "export",
        basePath,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
