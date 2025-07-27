/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "cinematic-dark": "#0a0a0f",
        "cinematic-gold": "#ffd700",
        "cinematic-neon": "#00ffff",
         background: "#ffffff", // <-- add this line
         foreground: "#1f2937", // <-- add this line
      },
      fontFamily: {
        cinematic: ["Orbitron", "monospace"],
        elegant: ["Playfair Display", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(0, 255, 255, 0.6)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 255, 255, 0.3)",
        "glow-lg": "0 0 30px rgba(0, 255, 255, 0.6)",
        gold: "0 10px 25px rgba(255, 215, 0, 0.3)",
      },
    },
  },
  plugins: [],
}
