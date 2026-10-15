/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: true,
  },
  
  swcMinify: true,
  
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

module.exports = nextConfig
