"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Нүүр" },
  { href: "/tour", label: "360° VR Аялал" },
  { href: "/about", label: "Тухай" },
  { href: "/contact", label: "Холбоо барих" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-dark shadow-lg shadow-navy-900/30" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-navy-100 to-navy-100 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <img
                src="/images/num-logo.png"
                alt="logo"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">
                Монгол улсын их сургууль
              </p>
              <p className="text-navy-200 text-xs leading-tight">
                МТЭС-Виртуал Аялал
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === href
                    ? "bg-navy-600/80 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10",
                )}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/tour"
              className="ml-2 px-4 py-2 rounded-lg bg-navy-600 hover:bg-navy-500 text-white text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-navy-600/30 hover:shadow-lg"
            >
              Аялал эхлүүлэх →
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-dark border-t border-navy-700/50"
          >
            <nav className="px-4 py-3 space-y-1">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    pathname === href
                      ? "bg-navy-600/80 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/10",
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
