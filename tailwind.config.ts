import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#EEF2FF",
          100: "#DEEAF1",
          200: "#BDD7EE",
          400: "#5B9BD5",
          600: "#2E75B6",
          700: "#1F4E79",
          800: "#17375E",
          900: "#0D2137",
        },
        mitis: {
          blue:   "#2E75B6",
          navy:   "#1F4E79",
          light:  "#DEEAF1",
          accent: "#5B9BD5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in":     "fadeIn 0.6s ease-out",
        "slide-up":    "slideUp 0.5s ease-out",
        "slide-right": "slideRight 0.4s ease-out",
        "pulse-slow":  "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:     { from: { opacity: "0" },                      to: { opacity: "1" } },
        slideUp:    { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        slideRight: { from: { opacity: "0", transform: "translateX(-24px)" }, to: { opacity: "1", transform: "translateX(0)" } },
      },
      backdropBlur: { xs: "2px" },
    },
  },
  plugins: [],
};
export default config;
