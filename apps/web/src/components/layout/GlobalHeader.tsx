"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Menu, X, Home, MessageCircle, 
  Library, Settings, User, LogOut, Star 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface StreakProps {
  currentStreak: number;
}

function StreakIndicator({ currentStreak }: StreakProps) {
  return (
    <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-yellow-100 text-yellow-800 font-bold text-xs">
      <Star size={14} className="text-yellow-500" /> {currentStreak} day streak
    </div>
  );
}

export default function GlobalHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* 🛠️ AUTH MOCKING 
      Fallback to "Ersnoble" branding for the profile.
  */
  const isLoaded = true; 
  const isSignedIn = false; 
  const displayName = "Ersnoble"; 

  const signOut = () => {
    console.log("Sign out triggered");
    setIsMenuOpen(false);
  };

  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (isSignedIn) setStreak(5);
    else setStreak(0);
  }, [isSignedIn]);

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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-[100]"
          />
        )}
      </AnimatePresence>

      <header className="fixed top-2 left-0 right-0 z-[110] px-3">
  <motion.div
    layout
    className={`max-w-7xl mx-auto flex items-center justify-between rounded-[18px] px-4 py-2 transition-all duration-500 border ${
      scrolled
        ? "bg-white/90 border-slate-200 shadow-lg backdrop-blur-md py-1.5"
        : "bg-white/40 border-white/40 backdrop-blur-sm"
    }`}
  >
    {/* LOGO (reduced) */}
    <Link
      href="/"
      className="relative w-12 h-12 md:w-14 md:h-14 transition-all duration-300 hover:scale-105 flex items-center"
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
    <div className="flex items-center gap-2.5" ref={menuRef}>
      {isLoaded && (
        <>
          {isSignedIn && streak > 0 && (
            <div className="hidden sm:block">
              <StreakIndicator currentStreak={streak} />
            </div>
          )}

          <div className="hidden md:block">
            {!isSignedIn ? (
              <Link href="/sign-in">
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider flex items-center gap-2 text-white bg-gradient-to-br from-[#24A5EE] to-[#162B6E] shadow-md"
                >
                  Join <Zap size={12} />
                </motion.button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider flex items-center gap-2 text-[#162B6E] bg-white border border-slate-100"
                >
                  Dashboard <Home size={12} />
                </motion.button>
              </Link>
            )}
          </div>
        </>
      )}

      {/* HAMBURGER (reduced) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-white bg-white/50 hover:bg-white transition-all"
      >
        <AnimatePresence mode="wait">
          {isMenuOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={20} className="text-[#162B6E]" />
            </motion.div>
          ) : (
            <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
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
            className="absolute top-16 right-0 w-[280px] rounded-[24px] bg-white/95 backdrop-blur-2xl border border-white shadow-xl overflow-hidden p-2"
          >
            <div className="p-4 rounded-[18px] bg-slate-50/50 mb-2 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-[#162B6E] text-xs truncate uppercase">
                    {isSignedIn ? "Stephen A. Adesiyan" : displayName}
                  </p>
                  <p className="text-[9px] font-bold text-blue-500 uppercase mt-1">
                    {isSignedIn ? "Premium" : "Guest"}
                  </p>
                </div>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              <DropdownLink icon={<Home size={16} />} label="Home" href="/" />
              <DropdownLink icon={<MessageCircle size={16} />} label="AI Tutor" href="/chat" />
              <DropdownLink icon={<Library size={16} />} label="Curriculum" href="/library" />

              <div className="h-px bg-slate-100 my-2 mx-3" />

              {isSignedIn ? (
                <>
                  <DropdownLink icon={<Settings size={16} />} label="Settings" href="/settings" />
                  <button
                    onClick={signOut}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 text-xs hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </>
              ) : (
                <DropdownLink icon={<User size={16} />} label="Sign In" href="/sign-in" />
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

function DropdownLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 px-5 py-3 rounded-2xl text-slate-600 font-bold text-xs hover:bg-blue-50 hover:text-[#24A5EE] transition-all group"
    >
      <span className="text-slate-400 group-hover:text-[#24A5EE] transition-colors">{icon}</span>
      {label}
    </Link>
  );
}