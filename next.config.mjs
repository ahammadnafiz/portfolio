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
  output: 'export',
  trailingSlash: true,
  basePath: '/portfolio',
  assetPrefix: '/portfolio',
  
  // Cache busting configuration
  generateBuildId: async () => {
    // Use timestamp for unique build ID to force cache invalidation
    return `build-${Date.now()}`
  }
}

export default nextConfig
