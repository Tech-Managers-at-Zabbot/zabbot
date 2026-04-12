/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // =========================
      // COLORS
      // =========================
      colors: {
        heritage: "#162B6E",
        primary: "#24A5EE",
        soft: "#EFF6FF",
        xp: "#FACC15",
        success: "#16A34A",
        error: "#EF4444",
        text: "#0F172A",
        muted: "#64748B",
      },

      // =========================
      // FONTS (FIXED)
      // =========================
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        heading: ["var(--font-lexend)", "ui-sans-serif", "system-ui"],
        accent: ["var(--font-lexend-exa)", "sans-serif"],
      },

      // =========================
      // RADIUS
      // =========================
      borderRadius: {
        zabbot: "32px",
        button: "16px",
      },

      // =========================
      // SHADOWS
      // =========================
      boxShadow: {
        premium: "0 8px 32px rgba(22, 43, 110, 0.05)",
        strong: "0 20px 60px rgba(22, 43, 110, 0.08)",
      },

      // =========================
      // ANIMATIONS
      // =========================
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },

      animation: {
        blink: "blink 1.2s infinite",
        float: "float 6s ease-in-out infinite",
      },
    },

    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
  },

  plugins: [],
};