const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@photo-sphere-viewer/core",
    "@photo-sphere-viewer/markers-plugin",
  ],

  compress: true,

  async headers() {
    const baseHeaders = [
      {
        source: "/panoramas/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];

    // 🔥 DEV үед Next.js internal cache-ийг оролдохгүй
    if (isDev) {
      return baseHeaders;
    }

    // ✅ PROD үед full optimization
    return [
      ...baseHeaders,
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
