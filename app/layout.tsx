import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mtes-tour.vercel.app"),

  title: {
    default: "МТЭС 360° Виртуал Аялал",
    template: "%s | МТЭС Virtual Tour",
  },
  description:
    "Мэдээлэл Технологи Электроникийн Сургуулийн (МТЭС — МУИС) 360° виртуал аялал. " +
    "Барилга, лаб, лекцийн танхимуудыг гэрийн тавилцанаас танилцаарай.",
  keywords: [
    "МТЭС",
    "МУИС",
    "виртуал аялал",
    "360 VR tour",
    "кампус",
    "сургууль",
  ],
  authors: [{ name: "Мультимедиа Технологи — МТЭС" }],
  openGraph: {
    type: "website",
    locale: "mn_MN",
    siteName: "МТЭС Виртуал Аялал",
    url: "/",
    title: "МТЭС 360° Виртуал Аялал",
    description: "МТЭС-ийн кампусыг виртуалаар аялаарай",
    images: [
      {
        url: "/images/num-logo.png",
        width: 1200,
        height: 630,
        alt: "MTES Virtual Tour",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#1F4E79",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
