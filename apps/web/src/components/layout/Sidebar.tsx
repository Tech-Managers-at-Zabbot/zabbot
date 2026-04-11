"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  Layers,
  BookOpen,
  Trophy,
  Store,
  Settings,
  ChevronLeft,
  Lock, // Added Lock icon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Ọ̀rẹ́", icon: Map, href: "/ai/ore" },
    { name: "Pàrà", icon: Layers, href: "/ai/para" },
    { name: "Òwe", icon: BookOpen, href: "/ai/owe" },
    { name: "Marketplace", icon: Store, href: "/dashboard/marketplace", locked: true }, // Locked
    { name: "Leaderboard", icon: Trophy, href: "/dashboard/leaderboard", locked: true }, // Locked
  ];

  return (
    <aside
      className={cn(
        "fixed left-6 top-24 bottom-6 transition-all duration-500 z-50 flex flex-col",
        isCollapsed ? "w-20" : "w-[260px]"
      )}
    >
      <div className="absolute inset-0 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl" />

      <div className="relative z-10 flex flex-col h-full py-6 px-3">
        <div className="flex items-center mb-10 justify-center">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#162B6E] transition-colors"
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft
              className={cn(
                "transition-transform duration-300",
                isCollapsed && "rotate-180"
              )}
              size={18}
            />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const isLocked = item.locked;

            const content = (
              <motion.div
                whileTap={isLocked ? {} : { scale: 0.96, y: 1 }}
                whileHover={isLocked ? {} : { scale: 1.02 }}
                className={cn(
                  "flex items-center gap-4 p-3.5 rounded-2xl transition-all",
                  isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                  isActive && !isLocked
                    ? "bg-gradient-to-r from-[#162B6E] to-[#24A5EE] text-white shadow-md"
                    : "text-slate-600 hover:text-[#162B6E] hover:bg-blue-50"
                )}
              >
                <div className="relative">
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {isLocked && (
                    <div className="absolute -top-1 -right-1 bg-slate-200 rounded-full p-0.5 text-[#162B6E]">
                      <Lock size={8} fill="currentColor" />
                    </div>
                  )}
                </div>
                {!isCollapsed && (
                  <span className="font-semibold tracking-tight flex-1">
                    {item.name}
                  </span>
                )}
                {isLocked && !isCollapsed && <Lock size={14} className="text-slate-400" />}
              </motion.div>
            );

            return isLocked ? (
              <div key={item.name}>{content}</div>
            ) : (
              <Link key={item.name} href={item.href}>
                {content}
              </Link>
            );
          })}
        </nav>

        <Link href="/dashboard/settings" className="group mt-auto">
          <motion.div
            whileTap={{ scale: 0.96 }}
            className="pt-4 border-t border-slate-200 flex items-center gap-4 text-slate-500 hover:text-[#162B6E] transition-colors"
          >
            <Settings size={20} />
            {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
          </motion.div>
        </Link>
      </div>
    </aside>
  );
}