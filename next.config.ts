import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      {
        source: '/templates',
        destination: '/cv-templates',
        permanent: true,
      },
      {
        source: '/cv-template-16-year-old',
        destination: '/cv-templates/16-year-old',
        permanent: true,
      },
      {
        source: '/school-leaver-cv-template',
        destination: '/cv-templates/school-leaver',
        permanent: true,
      },
      {
        source: '/graduate-cv-templates',
        destination: '/cv-templates/graduate',
        permanent: true,
      },
      {
        source: '/acting-cv-template',
        destination: '/cv-templates/acting',
        permanent: true,
      },
      {
        source: '/finance-cv-template',
        destination: '/cv-templates/finance',
        permanent: true,
      },
      {
        source: '/nursing-cv-template',
        destination: '/cv-templates/nursing',
        permanent: true,
      },
      {
        source: '/ats-friendly-cv-template',
        destination: '/cv-templates/ats-friendly',
        permanent: true,
      },
    ];
  },
  // Allow access to remote image placeholder and configure modern WebP/AVIF formats.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      html2canvas: 'html2canvas-pro',
    };

    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
