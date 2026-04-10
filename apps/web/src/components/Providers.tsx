"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"      // Zabbot default
      enableSystem={false}      // Force light mode preference
      disableTransitionOnChange={false} // Smooth transitions enabled
      {...props}                // Allows layout.tsx to override or pass additional props
    >
      {children}
    </NextThemesProvider>
  );
}