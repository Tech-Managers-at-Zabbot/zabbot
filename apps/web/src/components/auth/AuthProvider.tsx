// /components/auth/AuthProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthModal from "./AuthModal";

export type AuthView = "login" | "signup" | "forgot" | null;

type AuthContextType = {
  view: AuthView;
  setView: (view: AuthView) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<AuthView>(null);

  const pathname = usePathname();
  const router = useRouter();

  // 🔥 SYNC ROUTE → MODAL
  useEffect(() => {
    if (pathname === "/login") setView("login");
    else if (pathname === "/signup") setView("signup");
    else if (pathname === "/forgot") setView("forgot");
    else setView(null);
  }, [pathname]);

  // 🔥 SYNC MODAL → ROUTE
  function handleSetView(v: AuthView) {
    setView(v);

    if (v === "login") router.push("/login");
    else if (v === "signup") router.push("/signup");
    else if (v === "forgot") router.push("/forgot");
    else router.push("/");
  }

  return (
    <AuthContext.Provider value={{ view, setView: handleSetView }}>
      {children}
      <AuthModal />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}