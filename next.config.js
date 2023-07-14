/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_API: process.env.BACKEND_API
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "e-soko.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "e-soko-users.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://54.224.198.199:5000/api/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
