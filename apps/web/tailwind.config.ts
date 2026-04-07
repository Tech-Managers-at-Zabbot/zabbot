import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                // PRIMARY: Lexend for readability (Body, UI, Buttons)
                sans: ["var(--font-lexend)", "ui-sans-serif", "system-ui"],
                // DISPLAY: Lexend Exa for Luxury Headings and Hero text
                display: ["var(--font-lexend-exa)", "sans-serif"],
            },
            fontWeight: {
                // Lexend supports a full range from 100 to 900
                thin: "100",
                extralight: "200",
                light: "300",
                normal: "400",
                medium: "500",
                semibold: "600",
                bold: "700",
                extrabold: "800",
                black: "900",
            },
            colors: {
                zabbot: {
                    heritage: "#162B6E",   // Deep Heritage Blue
                    primary: "#24A5EE",    // Learning Blue
                    soft: "#EFF6FF",       // Calm Learning Background
                    xp: "#FACC15",         // XP Yellow
                    success: "#16A34A",    // Heritage Green
                    error: "#EF4444",      // Error Red
                },
                dark: {
                    bg: "#0F1117",         // Dark Mode Background
                    surface: "#181A20",    // Dark Mode Surface
                    card: "#1F222A",       // Dark Mode Card
                    text: "#FFFFFF",       // Dark Mode Primary Text
                    border: "#2A2E39"      // Dark Mode Border
                }
            },
            borderRadius: {
                'zabbot': '16px',          // System-wide Card Radius
                'button': '12px',          // System-wide Button Radius 
            },
            boxShadow: {
                'premium': '0px 6px 16px rgba(0,0,0,0.06)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'heavy': '0 20px 50px rgba(22, 43, 110, 0.15)', // Added for dropdowns/modals
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.3s ease-out forwards',
                'shine': 'shine 0.8s ease-in-out', 
                'float': 'float 6s ease-in-out infinite', // Added for fluid blobs
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shine: {
                    '100%': { transform: 'translateX(100%)' }, 
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};

export default config;