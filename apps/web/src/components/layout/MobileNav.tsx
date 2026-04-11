"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Play, Users, ShieldCheck, Zap, Lock } from "lucide-react"; // Added Lock
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MobileNav() {
  const pathname = usePathname();
  const isSignedIn = false; 

  const isHome = pathname === "/";
  const isDashboard = pathname === "/dashboard";
  
  const centerHref = isSignedIn ? "/dashboard" : "/";
  const centerLabel = isSignedIn ? "Dashboard" : "Ersnoble"; 
  const isActive = isSignedIn ? isDashboard : isHome;

  return (
    <div className="md:hidden fixed bottom-8 left-0 right-0 z-[100] px-6">
      <nav className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[35px] p-2 flex items-center justify-between shadow-[0_25px_50px_-12px_rgba(22,43,110,0.15)] ring-1 ring-black/5">
        
        {/* Marketplace/Demo logic or Team - Example: Locking Team */}
        <NavIcon icon={Play} label="Demo" active={pathname === "/demo"} href="/demo" />
        <NavIcon icon={Users} label="Team" active={pathname === "/team"} href="/team" locked />
        
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
        <NavIcon icon={Zap} label="Daily" active={pathname === "/daily"} href="/daily" locked />
      </nav>
    </div>
  );
}

function NavIcon({ icon: Icon, label, active = false, href, locked = false }: { 
  icon: any; 
  label: string; 
  active?: boolean; 
  href: string;
  locked?: boolean;
}) {
  const content = (
    <button 
      disabled={locked}
      className={`flex flex-col items-center justify-center w-full group gap-1 outline-none ${locked ? "opacity-40" : ""}`}
    >
      <motion.div
        animate={{ scale: active ? 1.15 : 1, y: active ? -2 : 0 }}
        className="relative"
      >
        <Icon size={22} className={active ? "text-[#24A5EE]" : "text-[#162B6E]/30"} strokeWidth={active ? 3 : 2} />
        {locked && (
          <div className="absolute -top-1 -right-1">
            <Lock size={10} className="text-[#162B6E]" fill="currentColor" />
          </div>
        )}
      </motion.div>
      
      <span className={`text-[7px] font-black uppercase tracking-widest transition-all duration-300 ${
        active 
          ? "text-[#24A5EE] opacity-100" 
          : "text-[#162B6E] opacity-30"
      }`}>
        {locked ? "Locked" : label}
      </span>
    </button>
  );

  if (locked) return <div className="flex-1 cursor-not-allowed">{content}</div>;

  return (
    <Link href={href} className="flex-1">
      {content}
    </Link>
  );
}