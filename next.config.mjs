/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure API routes for file uploads
  api: {
    // Increase body size limit for file uploads (10MB)
    bodyParser: {
      sizeLimit: '10mb',
    },
    // Response size limit
    responseLimit: '10mb',
  },

  // Webpack configuration to handle file system modules properly
  webpack: (config, { isServer }) => {
    // Client-side configuration: don't polyfill fs module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    
    return config;
  },

  // Images configuration for local uploads
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;