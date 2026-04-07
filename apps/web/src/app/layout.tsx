import type { Metadata } from "next";
import { Lexend, Lexend_Exa } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

// 1. FONTS: Using display: "swap" and variable names for CSS access
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

const lexendExa = Lexend_Exa({
  subsets: ["latin"],
  variable: "--font-lexend-exa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zabbot | The Spark that Powers Language Connection",
  description: "Learn your heritage language through AI-powered cultural immersion",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
          socialButtonsVariant: "blockButton",
          logoPlacement: "inside",
        },
        variables: {
          colorPrimary: "#162B6E",
          colorText: "#162B6E",
          // Matches our font-sans tailwind config
          fontFamily: "var(--font-lexend)",
          borderRadius: "1rem",
        },
      }}
    >
      {/* VETTING NOTE: Injecting font variables at the <html> level ensures 
          modals and portals (like Clerk's) inherit the luxury typography.
      */}
      <html
        lang="en"
        suppressHydrationWarning
        className={`${lexend.variable} ${lexendExa.variable}`}
      >
        <body
          className="font-sans antialiased bg-[#EFF6FF] text-[#162B6E] min-h-screen"
        >
          <Providers>
            {children}
          </Providers>

          <Toaster
            position="top-center"
            richColors
            closeButton
            theme="light"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}