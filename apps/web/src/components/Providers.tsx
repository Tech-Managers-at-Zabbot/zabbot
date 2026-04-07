"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light" // Zabbot looks better in light mode for now based on your bg-[#EFF6FF]
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}