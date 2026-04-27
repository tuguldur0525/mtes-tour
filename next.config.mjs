/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── PSV package transpilation ──────────────────────────────────────────────
  transpilePackages: [
    "@photo-sphere-viewer/core",
    "@photo-sphere-viewer/markers-plugin",
  ],

  // ── Compression ────────────────────────────────────────────────────────────
  compress: true,

  // ── Cache headers ──────────────────────────────────────────────────────────
  // Panorama JPGs are large — tell Vercel CDN to cache them aggressively.
  // After the first visitor loads a scene, everyone else gets it from the edge.
  async headers() {
    return [
      {
        // Panorama images — immutable (filenames never change), cache 1 year
        source: "/panoramas/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Thumbnails, maps, logos — cache 30 days
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // Next.js JS/CSS bundles are content-hashed — safe to cache forever
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

  // ── Reduce bundle size ─────────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
