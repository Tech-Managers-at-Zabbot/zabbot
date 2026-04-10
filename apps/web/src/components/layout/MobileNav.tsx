"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Play, Users, ShieldCheck, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// ❌ REMOVED: Clerk integration

export default function MobileNav() {
  const pathname = usePathname();

  /* 🛠️ AUTH MOCK 
     Surgically replacing Clerk hooks with local state 
  */
  const isLoaded = true;
  const isSignedIn = false; // Set to true when you want to test the Dashboard view

  // Dynamic Logic
  const isHome = pathname === "/";
  const isDashboard = pathname === "/dashboard";
  
  const centerHref = isSignedIn ? "/dashboard" : "/";
  // Fallback label set to Ersnoble for consistency
  const centerLabel = isSignedIn ? "Dashboard" : "Ersnoble"; 
  const isActive = isSignedIn ? isDashboard : isHome;

  return (
    <div className="md:hidden fixed bottom-8 left-0 right-0 z-[100] px-6">
      <nav className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[35px] p-2 flex items-center justify-between shadow-[0_25px_50px_-12px_rgba(22,43,110,0.15)] ring-1 ring-black/5">
        
        <NavIcon icon={Play} label="Demo" active={pathname === "/demo"} href="/demo" />
        <NavIcon icon={Users} label="Team" active={pathname === "/team"} href="/team" />
        
        {/* ✅ CENTER ACTION */}
        <div className="relative flex flex-col items-center px-2">
          <Link href={centerHref} className="relative -mt-10">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                isActive
                  ? "bg-[#24A5EE] text-white shadow-blue-400/40" 
                  : "bg-white text-[#162B6E]/40 border border-slate-100 shadow-slate-200"
              }`}
            >
              <Home 
                size={26} 
                fill={isActive ? "white" : "none"} 
                strokeWidth={isActive ? 2.5 : 2} 
              />
            </motion.button>
          </Link>

          <p className={`text-center text-[7px] font-black uppercase tracking-[0.15em] mt-2 transition-colors duration-300 ${
            isActive ? "text-[#24A5EE]" : "text-[#162B6E]/30"
          }`}>
            {centerLabel}
          </p>
        </div>

        <NavIcon icon={ShieldCheck} label="Pro" active={pathname === "/pro"} href="/pro" />
        <NavIcon icon={Zap} label="Daily" active={pathname === "/daily"} href="/daily" />
      </nav>
    </div>
  );
}

function NavIcon({ icon: Icon, label, active = false, href }: { icon: any; label: string; active?: boolean; href: string }) {
  return (
    <Link href={href} className="flex-1">
      <button className="flex flex-col items-center justify-center w-full group gap-1 outline-none">
        <motion.div
          animate={{ scale: active ? 1.15 : 1, y: active ? -2 : 0 }}
          className={`${active ? "text-[#24A5EE]" : "text-[#162B6E]/30"}`}
        >
          <Icon size={22} strokeWidth={active ? 3 : 2} />
        </motion.div>
        
        <span className={`text-[7px] font-black uppercase tracking-widest transition-all duration-300 ${
          active 
            ? "text-[#24A5EE] opacity-100" 
            : "text-[#162B6E] opacity-30 group-hover:opacity-60"
        }`}>
          {label}
        </span>
      </button>
    </Link>
  );
}