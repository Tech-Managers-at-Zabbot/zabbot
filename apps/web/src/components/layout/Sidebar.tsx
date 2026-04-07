'use client';

import React from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  Layers,
  Trophy,
  Settings,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Journeys", icon: Map, href: "/dashboard/journeys" },
    { name: "Flashcards", icon: Layers, href: "/dashboard/flashcards" },
    { name: "Leaderboard", icon: Trophy, href: "/dashboard/leaderboard" },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen transition-all duration-500 z-50 flex flex-col shadow-2xl",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* High-End Glassmorphism Background */}
      <div className="absolute inset-0 bg-[#162B6E]/90 backdrop-blur-xl border-r border-white/10" />

      <div className="relative z-10 flex flex-col h-full py-6 px-4">
        {/* Logo Section */}
        <div className={cn("flex items-center mb-12", isCollapsed ? "justify-center" : "justify-between")}>
          {!isCollapsed && (
            <span className="text-xl font-black text-white tracking-tighter">ZABBOT</span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft className={cn("transition-transform duration-300", isCollapsed && "rotate-180")} size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className="block">
                <div
                  className={cn(
                    "flex items-center gap-4 p-3.5 rounded-2xl transition-all group",
                    isActive
                      ? "bg-white text-[#162B6E] shadow-lg shadow-black/20"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  )}
                >
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {!isCollapsed && <span className="font-semibold tracking-tight">{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Actionable Footer */}
        <Link href="/dashboard/settings" className="group">
          <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-white/50 group-hover:text-white transition-colors">
            <Settings size={20} />
            {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
          </div>
        </Link>
      </div>
    </aside>
  );
}