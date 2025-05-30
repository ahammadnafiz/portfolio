/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

// Development configuration
const devConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // No basePath for local development
  // No output export for development
}

// Production configuration for GitHub Pages
const prodConfig = {
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
  
  // Enable Next.js built-in asset optimization and hashing
  experimental: {
    optimizeCss: true,
  }
}

// Export the appropriate configuration
const nextConfig = isDev ? devConfig : prodConfig

console.log(`🚀 Next.js Config: ${isDev ? 'Development' : 'Production'} mode`)
if (!isDev) {
  console.log(`📁 Base Path: ${nextConfig.basePath}`)
  console.log(`🌐 Asset Prefix: ${nextConfig.assetPrefix}`)
}

export default nextConfig
