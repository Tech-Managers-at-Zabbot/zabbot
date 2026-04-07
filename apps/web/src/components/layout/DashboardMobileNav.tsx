"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Map, Layers, Trophy, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardMobileNav() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Journeys", icon: Map, href: "/dashboard/journeys" },
    { name: "Flashcards", icon: Layers, href: "/dashboard/flashcards" },
    { name: "Leaderboard", icon: Trophy, href: "/dashboard/leaderboard" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <div className="lg:hidden fixed bottom-6 left-0 right-0 z-[100] px-6">
      <nav className="bg-white/90 backdrop-blur-2xl border border-white/60 rounded-[30px] p-2 flex items-center justify-between shadow-[0_20px_50px_-12px_rgba(22,43,110,0.2)]">
        
        {/* Left Side Items */}
        <div className="flex flex-1 justify-around">
          <NavIcon 
            icon={menuItems[0].icon} 
            label={menuItems[0].name} 
            active={pathname === menuItems[0].href} 
            href={menuItems[0].href} 
          />
          <NavIcon 
            icon={menuItems[1].icon} 
            label={menuItems[1].name} 
            active={pathname === menuItems[1].href} 
            href={menuItems[1].href} 
          />
        </div>

        {/* Dynamic Center Action (Home) */}
        <div className="relative -mt-12">
          <Link href="/dashboard">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className={cn(
                "relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl",
                pathname === "/dashboard"
                  ? "bg-[#24A5EE] text-white shadow-blue-400/40" 
                  : "bg-white text-[#162B6E]/40 border border-slate-100 shadow-slate-200"
              )}
            >
              <LayoutDashboard 
                size={28} 
                fill={pathname === "/dashboard" ? "white" : "none"} 
                strokeWidth={2.5} 
              />
            </motion.button>
          </Link>
          <p className={cn(
            "text-center text-[8px] font-black uppercase tracking-widest mt-2 transition-colors",
            pathname === "/dashboard" ? "text-[#24A5EE]" : "text-[#162B6E]/30"
          )}>
            Home
          </p>
        </div>

        {/* Right Side Items */}
        <div className="flex flex-1 justify-around">
          <NavIcon 
            icon={menuItems[2].icon} 
            label={menuItems[2].name} 
            active={pathname === menuItems[2].href} 
            href={menuItems[2].href} 
          />
          <NavIcon 
            icon={menuItems[3].icon} 
            label={menuItems[3].name} 
            active={pathname === menuItems[3].href} 
            href={menuItems[3].href} 
          />
        </div>
      </nav>
    </div>
  );
}

function NavIcon({ icon: Icon, label, active, href }: { icon: any; label: string; active: boolean; href: string }) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center py-2 px-1 gap-1 group outline-none">
      <motion.div
        animate={{ scale: active ? 1.1 : 1 }}
        className={cn("transition-colors", active ? "text-[#24A5EE]" : "text-[#162B6E]/30")}
      >
        <Icon size={22} strokeWidth={active ? 2.5 : 2} />
      </motion.div>
      <span className={cn(
        "text-[7px] font-black uppercase tracking-tighter transition-all duration-300",
        active ? "text-[#24A5EE] opacity-100" : "text-[#162B6E] opacity-30"
      )}>
        {label}
      </span>
    </Link>
  );
}