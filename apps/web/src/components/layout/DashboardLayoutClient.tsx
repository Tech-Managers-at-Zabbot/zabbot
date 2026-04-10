"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardMobileNav from "./DashboardMobileNav";
import { cn } from "@/lib/utils";

interface DashboardLayoutClientProps {
  // ✅ Updated to allow null and improve type clarity
  userData: {
    user?: any;
    stats?: {
      xp: number;
      fires: number;
    };
  } | null; 
  children: React.ReactNode;
}

export default function DashboardLayoutClient({
  userData,
  children,
}: DashboardLayoutClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex overflow-hidden selection:bg-[#24A5EE]/20">
      
      {/* FLOATING SIDEBAR */}
      <div className="hidden lg:flex fixed z-50">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* MAIN CONTENT */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-500 ease-in-out w-full",
          isCollapsed ? "lg:pl-[110px]" : "lg:pl-[300px]"
        )}
      >
        <div className="flex-1 overflow-auto">
          {/* Note: You can pass userData to children or use it in a Header here 
            if you need to show XP/Avatar in the layout itself.
          */}
          <main className="p-5 lg:p-10 max-w-[1600px] mx-auto w-full pb-32 lg:pb-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </main>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="lg:hidden">
        <DashboardMobileNav />
      </div>
    </div>
  );
}