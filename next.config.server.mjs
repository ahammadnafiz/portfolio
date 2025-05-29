/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Remove static export to enable server-side headers
  // output: 'export',
  trailingSlash: true,
  basePath: '/portfolio',
  assetPrefix: '/portfolio',
  
  // Enable Next.js built-in optimizations
  experimental: {
    optimizeCss: true,
  },
  
  // Proper cache control headers
  async headers() {
    return [
      {
        // Cache Next.js static assets (JS/CSS) for 1 year - they have hashed filenames
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache public assets for a shorter time
        source: '/portfolio/:path*.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // No cache for HTML files - always check for updates
        source: '/:path*.html',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, max-age=0, must-revalidate',
          },
        ],
      },
      {
        // Service worker should not be cached
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
    ];
  },
  
  // Use git commit hash or timestamp for build ID
  generateBuildId: async () => {
    if (process.env.VERCEL_GIT_COMMIT_SHA) {
      return process.env.VERCEL_GIT_COMMIT_SHA;
    }
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    }
    return `build-${Date.now()}`;
  }
}

export default nextConfig
