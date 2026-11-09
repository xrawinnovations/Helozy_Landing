import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Plain HTML/CSS/JS files: the marketing site needs no server.
  output: 'export',
  images: { unoptimized: true },
  turbopack: { root: import.meta.dirname },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
