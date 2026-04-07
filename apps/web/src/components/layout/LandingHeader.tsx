"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Menu, X, Home, MessageCircle, 
  Library, Settings, User, LogOut 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ✅ FIXED: Use hooks only (modern Clerk pattern)
import { useUser, useClerk } from "@clerk/nextjs";

export default function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();

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
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[100]"
          />
        )}
      </AnimatePresence>

      <header className="fixed top-4 left-0 right-0 z-[110] px-4">
        <motion.div
          layout
          className={`max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-4 py-2 transition-all duration-300 border ${
            scrolled
              ? "bg-white/80 border-white/40 shadow-xl backdrop-blur-md"
              : "bg-white/40 border-white/20 backdrop-blur-sm"
          }`}
        >
          {/* LOGO */}
          <Link
            href="/"
            className="relative w-12 h-12 md:w-14 md:h-14 transition-transform hover:scale-105 active:scale-95"
          >
            <Image
              src="/zabbot-logo_blue.svg"
              alt="Zabbot Logo"
              fill
              className="object-contain drop-shadow-sm"
              priority
            />
          </Link>

          {/* ACTIONS CONTAINER */}
          <div className="flex items-center gap-3" ref={menuRef}>
            
            {/* CTA */}
            {isLoaded && (
              <div className="hidden md:block">
                {!isSignedIn ? (
                  <Link href="/sign-in">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 text-white bg-gradient-to-r from-[#162B6E] to-[#24A5EE] shadow-lg shadow-blue-500/20"
                    >
                      Get Started <Zap size={14} className="fill-yellow-300 text-yellow-300" />
                    </motion.button>
                  </Link>
                ) : (
                  <Link href="/dashboard">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 text-[#162B6E] bg-white border border-white/50 shadow-sm"
                    >
                      Dashboard <Home size={14} />
                    </motion.button>
                  </Link>
                )}
              </div>
            )}

            {/* HAMBURGER */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-white/40 bg-white/40 backdrop-blur-md shadow-sm hover:bg-white/60 transition-colors"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div key="close" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                    <X size={20} className="text-[#162B6E]" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                    <Menu size={20} className="text-[#162B6E]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* DROPDOWN */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute top-16 right-0 w-[280px] rounded-2xl bg-white/90 backdrop-blur-2xl border border-white/50 shadow-2xl overflow-hidden shadow-blue-900/10"
                >
                  {/* USER INFO */}
                  <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white overflow-hidden flex items-center justify-center shadow-sm">
                        {isLoaded && isSignedIn && user?.imageUrl ? (
                          <Image src={user.imageUrl} alt="Profile" width={40} height={40} className="rounded-full" />
                        ) : (
                          <User size={18} className="text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#162B6E] text-sm truncate">
                          {isSignedIn ? user?.fullName : "Yorùbá Learner"}
                        </p>
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                          {isSignedIn ? "Premium" : "Guest Account"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* NAVIGATION */}
                  <nav className="p-2">
                    <DropdownLink icon={<Home size={16} />} label="Home" href="/" />
                    <DropdownLink icon={<MessageCircle size={16} />} label="AI Tutor" href="/chat" />
                    <DropdownLink icon={<Library size={16} />} label="Curriculum" href="/library" />
                    
                    {isLoaded && (
                      <>
                        {isSignedIn ? (
                          <>
                            <div className="h-px bg-slate-100 my-2 mx-3" />
                            <DropdownLink icon={<Settings size={16} />} label="Settings" href="/settings" />
                            
                            <button
                              onClick={() => signOut()}
                              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 font-bold text-xs hover:bg-red-50 transition-colors text-left"
                            >
                              <LogOut size={16} />
                              Sign Out
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="h-px bg-slate-100 my-2 mx-3" />
                            <DropdownLink icon={<User size={16} />} label="Sign In" href="/sign-in" />
                          </>
                        )}
                      </>
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
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-700 font-bold text-xs hover:bg-blue-50 hover:text-[#162B6E] transition-all group"
    >
      <span className="text-slate-400 group-hover:text-blue-500 transition-colors">{icon}</span>
      {label}
    </Link>
  );
}