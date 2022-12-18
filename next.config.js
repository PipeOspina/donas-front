/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.colombia.com'],
  },
  distDir: 'build',
};

module.exports = nextConfig;
