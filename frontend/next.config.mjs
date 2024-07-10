/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"],
  images: {
    domains: ["cdn.dummyjson.com", "png.pngtree.com", "", "images.unsplash.com"],
  },
};

export default nextConfig;
