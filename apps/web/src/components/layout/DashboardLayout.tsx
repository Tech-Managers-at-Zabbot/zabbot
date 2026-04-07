'use client';

import React, { useState } from "react";
import { Search, Bell, Zap } from "lucide-react";
import Sidebar from "./Sidebar";
import DashboardMobileNav from "./DashboardMobileNav";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F9FF] flex overflow-x-hidden selection:bg-[#24A5EE]/20">
      
      {/* 1. SIDEBAR (Desktop Only) */}
      <div className="hidden lg:block relative z-50">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* 2. MAIN VIEWPORT */}
      <div 
        className={cn(
          "flex-1 flex flex-col transition-all duration-500 ease-in-out w-full",
          "pl-0", // Default for mobile
          isCollapsed ? "lg:pl-20" : "lg:pl-64" // Desktop adjustments
        )}
      >
        {/* UNIFIED HEADER */}
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 px-4 lg:px-10 py-4 flex items-center justify-between">
          
          {/* Search: Hidden on mobile to prevent layout crowding */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#24A5EE] transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search sparks or lessons..."
                className="w-full bg-slate-100 text-[#1E293B] rounded-2xl py-2.5 pl-12 pr-6 border border-transparent focus:bg-white focus:border-[#24A5EE] focus:ring-4 focus:ring-[#24A5EE]/10 transition-all font-medium"
              />
            </div>
          </div>

          {/* User Section: Responsive Alignment */}
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3 lg:gap-6">
            
            {/* Visual Balance for mobile: Small Logo or Brand Name can go here if needed */}
            <span className="md:hidden font-black text-[#162B6E] text-lg tracking-tighter">ZABBOT</span>

            <div className="flex items-center gap-3">
              {/* XP Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-2xl shadow-sm border border-slate-100">
                <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-xs lg:text-sm font-bold text-slate-700">1,240</span>
                <div className="hidden sm:block w-[1px] h-3 bg-slate-200" />
                <span className="hidden sm:inline text-xs lg:text-sm font-bold text-slate-700">🔥 12</span>
              </div>

              {/* User Name: Hidden on Mobile for clean UI */}
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-[#162B6E] leading-tight">Bọ́lá Akíndélé</p>
                <p className="text-[10px] font-bold text-[#E87A4F] uppercase tracking-widest">Learner</p>
              </div>

              {/* Notifications */}
              <button className="relative p-2.5 text-slate-500 hover:bg-white hover:text-[#24A5EE] rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-5 lg:p-10 max-w-[1600px] mx-auto w-full pb-32 lg:pb-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {children}
        </main>
      </div>

      {/* 3. MOBILE DOCK */}
      <DashboardMobileNav />
    </div>
  );
}