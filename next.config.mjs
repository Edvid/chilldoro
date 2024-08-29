import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  /** @type {import('next').NextConfig} */
  return {
    assetPrefix: isDev ? undefined : '/chilldoro',
    output: 'export',
    distDir: 'docs',
    images: {
      unoptimized: true
    }
  }
};

export default nextConfig;
