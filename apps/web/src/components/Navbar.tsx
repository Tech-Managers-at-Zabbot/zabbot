"use client";
import React from 'react';
import Link from 'next/link';
import { Globe, Menu, User } from 'lucide-react';

export const Navbar = () => {
    return (
        <nav className="glass-nav px-6 py-4 flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-heritage-blue rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    Z
                </div>
                <span className="text-2xl font-bold text-heritage-blue tracking-tight">ZABBOT</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
                <Link href="/sparks" className="hover:text-heritage-blue transition-colors">Lessons</Link>
                <Link href="/flashcards" className="hover:text-heritage-blue transition-colors">Flashcards</Link>
                <Link href="/leaderboard" className="hover:text-heritage-blue transition-colors">Leaderboard</Link>
            </div>

            {/* Action Section */}
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
                    <Globe className="w-5 h-5 text-slate-600" />
                </button>
                <button className="flex items-center gap-2 bg-heritage-blue text-white px-5 py-2 rounded-full font-medium hover:bg-heritage-learning transition-all shadow-md">
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                </button>
            </div>
        </nav>
    );
};