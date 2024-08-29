import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  /** @type {import('next').NextConfig} */
  return {
    assetPrefix: isDev ? undefined : 'https://raw.githubusercontent.com/Edvid/chilldoro/main/docs',
    output: 'export',
  }
};

export default nextConfig;
