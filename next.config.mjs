/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Lint is run explicitly via `npm run lint`; keep production builds unblocked.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
