/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dl5zpyw5k3jeb.cloudfront.net",
        port: "",
        pathname: "/photos/pets/**",
      },
    ],
  },
};

module.exports = nextConfig;
