/** @type {import('next').NextConfig} */

const nextConfig ={
    env: {
      BACKEND_API: process.env.BACKEND_API
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: process.env.NEXT_PUBLIC_PRODUCTSBUCKET.slice(8),
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: process.env.NEXT_PUBLIC_USERSBUCKET.slice(8),
          port: "",
          pathname: "/**",
        },
      ],
    },
  
  }
module.exports = nextConfig;
