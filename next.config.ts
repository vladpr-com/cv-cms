import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Do NOT use output: 'export' — we need SSR for DB

  env: {
    NEXT_PUBLIC_AUTH_ENABLED: process.env.TURSO_ADMIN_DB_URL ? 'true' : '',
  },

  images: {
    unoptimized: true,
  },

  // Server Actions work on Edge with Turso
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Redirects for deprecated pages (UI Redesign v2)
  async redirects() {
    return [
      {
        source: '/jobs',
        destination: '/',
        permanent: true,
      },
      {
        source: '/jobs/:id',
        destination: '/',
        permanent: true,
      },
      {
        source: '/highlights',
        destination: '/',
        permanent: true,
      },
      {
        source: '/export',
        destination: '/',
        permanent: true,
      },
      {
        source: '/backup',
        destination: '/settings',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
