/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    isrMemoryCacheSize: 50 * 1024 * 1024, // 50MB cache
  },
};

export default nextConfig;
