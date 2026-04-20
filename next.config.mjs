/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@photo-sphere-viewer/core",
    "@photo-sphere-viewer/markers-plugin",
  ],
};

export default nextConfig;
