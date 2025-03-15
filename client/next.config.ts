import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  distDir: "out", // Ensures build output is consistent
};

export default nextConfig;
