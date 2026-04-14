import type { Metadata } from "next";
import { Inter, Lexend, Lexend_Exa } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";
import GlobalHeader from "@/components/layout/GlobalHeader";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { LanguageProvider } from "@/i18n/language-context";

// =========================
// FONTS
// =========================
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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

// =========================
// METADATA
// =========================
export const metadata: Metadata = {
  title: "Zabbot | The Spark that Powers Language Connection",
  description:
    "Learn your heritage language through AI-powered cultural immersion",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${lexend.variable} ${lexendExa.variable} h-full`}
    >
      <body className="antialiased min-h-screen flex flex-col font-sans bg-background text-foreground">

        <Providers>

          {/* 🔥 AUTH SCOPE */}
          <AuthProvider>

            {/* 🌍 LANGUAGE SCOPE (GLOBAL I18N LAYER) */}
            <LanguageProvider>

              <GlobalHeader />

              <main className="flex-1 pt-24 relative">
                {children}
              </main>

              <Toaster position="top-center" richColors closeButton />

            </LanguageProvider>

          </AuthProvider>

        </Providers>

      </body>
    </html>
  );
}