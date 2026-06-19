/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.teemill.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
