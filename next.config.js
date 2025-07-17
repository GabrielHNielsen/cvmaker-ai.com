/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable modern JavaScript features
  experimental: {
    optimizePackageImports: ['@canva/apps'],
  },
  
  // Optimize JavaScript compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable modern bundling
  swcMinify: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable compression
  compress: true,
  
  // CSS optimization handled by Tailwind
}

module.exports = nextConfig 