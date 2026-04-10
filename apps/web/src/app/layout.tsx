import type { Metadata } from "next";
import { Inter, Lexend, Lexend_Exa } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";
import GlobalHeader from "@/components/layout/GlobalHeader";

// 1. FONTS
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const lexendExa = Lexend_Exa({
  subsets: ["latin"],
  variable: "--font-display",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${lexend.variable} ${lexendExa.variable}`}
    >
      <body className="antialiased selection:bg-primary/20">
        {/* BYPASSING SYSTEM DARK MODE:
            Setting defaultTheme="light" and enableSystem={false} 
            ensures your brand's light-blue aesthetic loads first.
        */}
        <Providers 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false}
        >
          <GlobalHeader />
          
          <main className="relative pt-24 min-h-screen">
            {children}
          </main>
          
          <Toaster position="top-center" richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}