import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/en/claude-code-vs-openclow-2026',
        destination: '/en/claude-code-vs-openclaw-2026',
        permanent: true,
      },
      {
        source: '/pt/claude-code-vs-openclow-2026',
        destination: '/pt/claude-code-vs-openclaw-2026',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
