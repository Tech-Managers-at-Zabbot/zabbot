// /components/auth/AuthModal.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAuth } from "./AuthProvider";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPassword from "./ForgotPassword";
import { useEffect } from "react";

export default function AuthModal() {
  const { view, setView } = useAuth();

  // 🔥 Prevent background scroll (no layout shift)
  useEffect(() => {
    if (view) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [view]);

  // 🔥 ESC to close (only when modal is open)
  useEffect(() => {
    if (!view) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setView(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [view, setView]);

  return (
    <AnimatePresence mode="wait">
      {view && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
        >
          {/* BACKDROP */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setView(null)} // 🔥 route sync handles navigation
            className="absolute inset-0 backdrop-blur-xl bg-black/30"
          />

          {/* MODAL CONTAINER */}
          <div className="relative z-50 min-h-screen flex items-center justify-center px-4">

            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()} // 🔥 prevent backdrop close
            >
              <GlassCard className="p-6 rounded-2xl shadow-xl border-white/60">

                {/* AUTH VIEWS */}
                {view === "login" && <LoginForm />}
                {view === "signup" && <SignupForm />}
                {view === "forgot" && <ForgotPassword />}

                {/* SWITCH LINKS */}
                <div className="mt-5 text-xs text-center text-slate-600 space-x-2">
                  {view !== "login" && (
                    <button
                      onClick={() => setView("login")}
                      className="hover:underline"
                    >
                      Login
                    </button>
                  )}

                  {view !== "signup" && (
                    <button
                      onClick={() => setView("signup")}
                      className="hover:underline"
                    >
                      Signup
                    </button>
                  )}

                  {view !== "forgot" && (
                    <button
                      onClick={() => setView("forgot")}
                      className="hover:underline"
                    >
                      Forgot Password
                    </button>
                  )}
                </div>

              </GlassCard>
            </motion.div>

          </div>
        </div>
      )}
    </AnimatePresence>
  );
}