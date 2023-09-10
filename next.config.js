/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_API: process.env.BACKEND_API
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qijani-products-bucket.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "qijani-users-bucket.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.BACKEND_API}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
