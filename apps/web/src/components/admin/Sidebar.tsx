"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, Mic2, BookOpen, History, 
    LogOut, Sun, Moon, Lock, ChevronRight, Map
} from "lucide-react";
import { ZabbotMascot } from "@/components/shared/ZabbotMascot";

// 1. NAVIGATION ITEMS
const navItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/admin" }, 
    { name: "Journey", icon: Map, href: "/admin/journey" }, 
    { name: "Studio", icon: BookOpen, href: "/admin/sparks" }, 
    { name: "Archive", icon: History, href: "/admin/archive" },
    { name: "Pàrà", icon: Mic2, href: "#", locked: true },
];

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (val: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Initial mount check for theme-safety
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <>
            {/* --- DESKTOP SIDEBAR --- */}
            <aside 
                className={`hidden lg:flex h-screen flex-col fixed left-0 top-0 z-50 bg-[#162B6E] dark:bg-[#0F1117] border-r border-white/10 text-white transition-all duration-300 ease-in-out shadow-2xl ${
                    isCollapsed ? "w-24" : "w-72"
                }`}
            >
                {/* Collapse Toggle */}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-10 bg-[#24A5EE] p-1.5 rounded-full border-2 border-[#162B6E] hover:scale-110 transition-transform shadow-lg z-50"
                >
                    <ChevronRight size={12} className={`transition-transform duration-300 ${isCollapsed ? "" : "rotate-180"}`} />
                </button>

                {/* Brand */}
<div className={`p-8 mb-4 ${isCollapsed ? "flex justify-center px-0" : ""}`}>
    <Link href="/admin" className="flex items-center gap-3">
        {/* Removed 'bg-white', 'rounded-xl', 'p-1.5', and 'shadow-inner' */}
        <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
            <Image 
                src="/assets/logo/zabbot-icon.svg" 
                alt="Z" 
                width={32} // Increased slightly since the padding is gone
                height={32} 
                className="drop-shadow-md" // Optional: adds a subtle pop without the box
            />
        </div>
        {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
                <span className="font-black text-xl italic tracking-tighter text-white">Zabbot</span>
                <span className="text-[8px] font-black text-[#24A5EE] uppercase tracking-[0.3em]">Studio</span>
            </motion.div>
        )}
    </Link>
</div>

                {/* Nav */}
                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group relative ${
                                    isActive ? "bg-[#24A5EE] shadow-lg shadow-blue-500/20" : "hover:bg-white/5 text-white/50 hover:text-white"
                                } ${isCollapsed ? "justify-center px-0" : ""}`}
                            >
                                <item.icon size={20} strokeWidth={isActive ? 3 : 2} />
                                {!isCollapsed && <span className="text-[13px] font-bold">{item.name}</span>}
                                {item.locked && <Lock size={10} className="absolute top-2 right-2 opacity-40" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Profile/Footer */}
                <div className="p-6">
                    <div className={`bg-white/5 rounded-3xl p-4 border border-white/10 relative transition-all ${isCollapsed ? "px-2" : "pt-10"}`}>
                        {!isCollapsed && (
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                                <ZabbotMascot mood="celebrating" size={80} />
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            {!isCollapsed && (
                                <p className="text-[10px] font-black text-white/40 uppercase mb-2">Erete Charles</p>
                            )}
                            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="flex items-center justify-center p-2.5 hover:bg-white/10 rounded-xl transition-colors">
                                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                            <button className="flex items-center justify-center p-2.5 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- MOBILE CURVED DOCK --- */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-md">
                <nav className="bg-[#162B6E]/90 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-[35px] shadow-2xl flex items-center justify-around relative overflow-hidden">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href} className="relative p-3 z-10">
                                {isActive && (
                                    <motion.div 
                                        layoutId="activeDock"
                                        className="absolute inset-0 bg-[#24A5EE] rounded-2xl shadow-lg shadow-blue-500/40"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <div className={`relative z-20 transition-colors duration-300 ${isActive ? "text-white scale-110" : "text-white/40"}`}>
                                    <item.icon size={22} strokeWidth={isActive ? 3 : 2} />
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}