/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PRODUCTSBUCKET: process.env.SERVICESBUCKET,
    USERSBUCKET: process.env.CAROUSELBUCKET,
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination:
          "http://54.224.198.199:5000/api/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
