import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://mtes-tour.vercel.app";
const SITE_NAME = "МТЭС Виртуал Аялал";

export const metadata: Metadata = {
  // ── Base URL — all relative paths resolve against this ──────────────────
  metadataBase: new URL(SITE_URL),

  // ── Title template — every page gets " | МТЭС Virtual Tour" appended ───
  title: {
    default: "МТЭС 360° Виртуал Аялал — МУИС",
    template: "%s | МТЭС Virtual Tour",
  },

  // ── Description — shown in Google search results ─────────────────────────
  description:
    "Мэдээллийн Технологи, Электроникийн Сургуулийн (МТЭС — МУИС) 360° виртуал аялал. " +
    "Барилга, лаб, лекцийн танхимуудтай хүссэн газраасаа танилцаарай. " +
    "MTES NUM virtual campus tour — explore buildings, labs and lecture halls online.",

  // ── Keywords ─────────────────────────────────────────────────────────────
  keywords: [
    "МТЭС",
    "МУИС",
    "NUM",
    "виртуал аялал",
    "virtual tour",
    "360 VR",
    "кампус",
    "сургууль",
    "Монгол улсын их сургууль",
    "Мэдээллийн технологи",
    "электроник",
    "MTES",
    "panorama",
  ],

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: "/",
    languages: {
      "mn-MN": "/",
      "en-US": "/",
    },
  },

  // ── Authors / publisher ───────────────────────────────────────────────────
  authors: [{ name: "Мультимедиа Технологи — МТЭС" }],
  creator: "МТЭС — МУИС",
  publisher: "Монгол Улсын Их Сургууль",

  // ── Open Graph — controls how it looks when shared on Facebook, Slack, etc
  openGraph: {
    type: "website",
    locale: "mn_MN",
    alternateLocale: "en_US",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "МТЭС 360° Виртуал Аялал — МУИС",
    description:
      "МТЭС-ийн кампусаар виртуалаар аялаарай. Барилга, лаб, танхимуудыг 360° панорамаар харах.",
    images: [
      {
        url: "/images/og-image.jpg", // create a 1200×630px image and put it here
        width: 1200,
        height: 630,
        alt: "МТЭС 360° Виртуал Аялал — МУИС кампус",
      },
    ],
  },

  // ── Twitter / X card ─────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "МТЭС 360° Виртуал Аялал",
    description: "МУИС-ийн МТЭС кампусаар 360° панорамаар аялаарай.",
    images: ["/images/og-image.jpg"],
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // 180×180px
  },

  // ── Verification — paste your codes from Google Search Console / Bing ────
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  //   other: { "msvalidate.01": "YOUR_BING_CODE" },
  // },
};

export const viewport: Viewport = {
  themeColor: "#1F4E79",
  width: "device-width",
  initialScale: 1,
};

// ── JSON-LD Structured Data ───────────────────────────────────────────────────
// Tells Google exactly what this site is — enables rich results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Мэдээллийн Технологи, Электроникийн Сургуулийн 360° виртуал аялал",
  publisher: {
    "@type": "EducationalOrganization",
    name: "Монгол Улсын Их Сургууль — МТЭС",
    url: "https://site.num.edu.mn",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/num-logo.png`,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/tour`,
    "query-input": "required name=building",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" data-scroll-behavior="smooth" className={inter.variable}>
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to Vercel image optimization */}
        <link rel="preconnect" href="https://mtes-tour.vercel.app" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
