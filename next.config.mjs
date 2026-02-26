/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "files.alnair.ae", pathname: "/**" },
    ],
  },
};

export default nextConfig;
