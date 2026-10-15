/** @type {import('next').NextConfig} */
const nextConfig = {
  // Separate dev folder
  distDir: '.next-dev',
  
  // Disable strict mode for faster dev
  reactStrictMode: false,
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: true, // Faster loading
  },
  
  // Faster compilation
  swcMinify: true,
  
  // Disable source maps in dev for speed
  productionBrowserSourceMaps: false,
  
  // Optimize package imports
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
