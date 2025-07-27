/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize webpack for better performance
  webpack: (config, { dev, isServer }) => {
    // Improve caching in development
    if (dev) {
      config.cache = {
        type: 'filesystem',
        cacheDirectory: '.next/cache/webpack',
        buildDependencies: {
          config: [__filename]
        }
      }
    }
    
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all'
          }
        }
      }
    }
    
    return config
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    }
  },
  
  // Optimize build output
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize images
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif']
  }
}

module.exports = nextConfig