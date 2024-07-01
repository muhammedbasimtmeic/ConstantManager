/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"],
  images: {
    domains: ["cdn.dummyjson.com"],
  },
};

export default nextConfig;
