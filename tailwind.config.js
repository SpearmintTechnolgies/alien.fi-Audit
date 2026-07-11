/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "rgb(243, 243, 255)",
        card: "rgba(255, 255, 255, 0.9)",
        border: "rgb(199, 200, 211)",
        accent: {
          DEFAULT: "#96EE52", // Neon green
          violet: "#15182B",  // Dark navy mapping
          glow: "rgba(150, 238, 82, 0.25)",
        },
        rag: {
          red: "#dc2626",
          "red-bg": "rgba(220,38,38,0.1)",
          amber: "#d97706",
          "amber-bg": "rgba(217,119,6,0.1)",
          green: "#16a34a",
          "green-bg": "rgba(22,163,74,0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
        mono: ["var(--font-azeret)", "Azeret Mono", "monospace"],
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, rgb(243, 243, 255), rgb(224, 226, 241))",
        "page-gradient": "linear-gradient(180deg, rgb(243, 243, 255) 0%, rgb(224, 226, 241) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.35s ease both",
        "progress-fill": "progressFill 0.5s ease",
        shimmer: "shimmer 4s linear infinite",
        glow: "glow 2s ease-in-out infinite",
        scan: "scan 3s linear infinite",
        ticker: "ticker 32s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        progressFill: {
          "0%": { width: "0%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
        },
        glow: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
