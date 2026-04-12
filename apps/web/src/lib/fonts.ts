import localFont from "next/font/local";

/**
 * INTER — Body / UI font
 */
export const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter/Inter_24pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/Inter_24pt-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/Inter_24pt-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/Inter_24pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

/**
 * LEXEND — Headings
 */
export const lexend = localFont({
  src: [
    {
      path: "../../public/fonts/lexend/Lexend-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/lexend/Lexend-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/lexend/Lexend-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/lexend/Lexend-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-lexend",
  display: "swap",
});

/**
 * LEXEND EXA — Accent / branding only
 */
export const lexendExa = localFont({
  src: [
    {
      path: "../../public/fonts/lexend-exa/LexendExa-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/lexend-exa/LexendExa-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-lexend-exa",
  display: "swap",
});