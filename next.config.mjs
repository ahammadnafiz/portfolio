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
  // Only use basePath and assetPrefix for production builds
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/portfolio',
    assetPrefix: '/portfolio/',
  }),
}

export default nextConfig
