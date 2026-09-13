import type { NextConfig } from 'next';
const config: NextConfig = {
  async rewrites() { return [{ source: '/api/:path*', destination: `${process.env.API_ORIGIN || 'http://127.0.0.1:4100'}/api/:path*` }]; },
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
};
export default config;
