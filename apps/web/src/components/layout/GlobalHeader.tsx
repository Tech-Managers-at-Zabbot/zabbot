"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Settings,
  User,
  LogOut,
  Star,
  LogIn,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLanguage } from "@/i18n/language-context";

/* STREAK */
function StreakIndicator({ currentStreak }: { currentStreak: number }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 font-semibold text-[10px] border border-yellow-100">
      <Star size={12} className="text-yellow-500" />
      {currentStreak}d
    </div>
  );
}

export default function GlobalHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession();
  const isSignedIn = status === "authenticated";
  const displayName = session?.user?.name || "User";

  const { setView } = useAuth();

  // ✅ GLOBAL LANGUAGE
  const { language, setLanguage, t } = useLanguage();

  /* SIGN OUT */
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    setIsMenuOpen(false);
  };

  /* STREAK */
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setStreak(isSignedIn ? 5 : 0);
  }, [isSignedIn]);

  /* SCROLL + OUTSIDE CLICK */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* BACKDROP */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[100]"
          />
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="fixed top-2 left-0 right-0 z-[110] px-3">
        <motion.div
          layout
          className={`
            relative max-w-7xl mx-auto flex items-center justify-between
            rounded-[22px] px-4 py-2
            border border-white/40 shadow-lg
            backdrop-blur-3xl bg-white/50
            transition-all duration-500
            ${scrolled ? "bg-white/70 shadow-xl" : "bg-white/40"}
          `}
        >
          {/* LOGO */}
          <Link
            href="/"
            className="relative w-28 md:w-32 h-12 md:h-14 hover:scale-105 transition-all flex items-center z-10"
          >
            <Image
              src="/zabbot-logo_blue.svg"
              alt="Zabbot Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* ACTIONS */}
          <div className="relative flex items-center gap-2.5 z-10" ref={menuRef}>
            
            {/* 🌍 LANGUAGE TOGGLE */}
            <button
              onClick={() =>
                setLanguage(language === "en" ? "yo" : "en")
              }
              aria-label="Toggle language"
              className="
                flex items-center gap-2 px-3 py-2 rounded-xl
                bg-white/60 backdrop-blur-xl
                border border-white/60
                text-[10px] font-black uppercase tracking-wider
                text-[#162B6E]
                hover:bg-white/80 transition-all duration-300
              "
            >
              <Globe size={14} className="text-[#24A5EE]" />

              <span className="flex items-center gap-1">
                <span className={language === "en" ? "text-[#24A5EE]" : "text-slate-400"}>
                  EN
                </span>

                <span className="text-slate-300">/</span>

                <span className={language === "yo" ? "text-[#24A5EE]" : "text-slate-400"}>
                  YO
                </span>
              </span>
            </button>

            {/* AUTH */}
            {isSignedIn ? (
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider flex items-center gap-2 text-[#162B6E] bg-white border border-slate-100"
                >
                  {t("nav.dashboard")} <Home size={12} />
                </motion.button>
              </Link>
            ) : (
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setView("login")}
                className="
                  px-4 py-2 rounded-xl font-black text-[10px]
                  uppercase tracking-wider flex items-center gap-2
                  text-[#162B6E] bg-white/50 backdrop-blur-xl
                  border border-white/60
                  hover:bg-white/70 transition-all duration-300
                "
              >
                {t("nav.login")} <LogIn size={12} />
              </motion.button>
            )}

            {/* MENU BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-white bg-white/60 hover:bg-white transition-all shadow-sm"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div key="close">
                    <X size={20} className="text-[#162B6E]" />
                  </motion.div>
                ) : (
                  <motion.div key="menu">
                    <Menu size={20} className="text-[#162B6E]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* DROPDOWN */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.96 }}
                  className="absolute top-full right-0 mt-3 w-[280px] rounded-[24px] bg-white/95 backdrop-blur-2xl border border-white shadow-2xl overflow-hidden p-2 z-[9999]"
                >
                  {/* USER */}
                  <div className="p-4 rounded-[18px] bg-white/60 mb-2 border border-white/40">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-black text-[#162B6E] text-xs truncate uppercase">
                          {displayName}
                        </p>
                        <p className="text-[9px] font-bold text-blue-500 uppercase mt-1">
                          {isSignedIn ? t("auth.welcomeBack") : t("auth.createAccount")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <nav className="flex flex-col gap-1">
                    <DropdownLink icon={<Home size={16} />} label={t("nav.home")} href="/" />

                    <div className="px-5 py-3 text-xs text-slate-300 font-bold opacity-60">
                      🔒 AI Tutor
                    </div>

                    <div className="px-5 py-3 text-xs text-slate-300 font-bold opacity-60">
                      🔒 Curriculum
                    </div>

                    <div className="px-5 py-3 text-xs text-slate-300 font-bold opacity-60">
                      🔒 Get A Coach
                    </div>

                    <div className="h-px bg-slate-100 my-2 mx-3" />

                    {isSignedIn ? (
                      <>
                        <DropdownLink icon={<Settings size={16} />} label={t("nav.settings")} href="/settings" />
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 text-xs hover:bg-red-50"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setView("login");
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 text-xs hover:bg-blue-50"
                      >
                        <User size={16} />
                        {t("nav.signIn")}
                      </button>
                    )}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </header>
    </>
  );
}

/* DROPDOWN LINK */
function DropdownLink({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 px-5 py-3 rounded-2xl text-slate-600 font-bold text-xs hover:bg-blue-50 hover:text-[#24A5EE] transition-all group"
    >
      <span className="text-slate-400 group-hover:text-[#24A5EE] transition-colors">
        {icon}
      </span>
      {label}
    </Link>
  );
}