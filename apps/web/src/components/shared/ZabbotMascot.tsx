"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface MascotProps {
    mood: "welcoming" | "working" | "celebrating" | "confused";
    size?: number;
    className?: string;
}

export const ZabbotMascot = ({ mood, size = 150, className = "" }: MascotProps) => {
    // mapping moods to your future custom asset paths
    const mascotAssets = {
        welcoming: "/assets/mascot/parrot-guardian.png",
        working: "/assets/mascot/parrot-drumming.png",
        celebrating: "/assets/mascot/parrot-dance.png",
        confused: "/assets/mascot/parrot-help.png",
    };

    // Temporary emojis to use until your PNGs are ready
    const fallbackEmojis = {
        welcoming: "🦜",
        working: "🥁",
        celebrating: "🎉",
        confused: "❓",
    };

    return (
        <div
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
        >
            {/* Premium Glow Effect using XP Yellow (#FACC15) */}
            <div className="absolute inset-0 bg-[#FACC15]/20 blur-3xl rounded-full animate-pulse" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={mood}
                    initial={{ y: 10, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -10, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative z-10 w-full h-full flex items-center justify-center"
                >
                    {/* Switch to this <Image /> tag once your files are in /public/assets/mascot/
              <Image 
                src={mascotAssets[mood]} 
                alt="Zabbot Mascot" 
                width={size} 
                height={size}
                className="object-contain"
              />
          */}

                    {/* Current Fallback logic using Emojis */}
                    <span style={{ fontSize: size * 0.6 }} className="drop-shadow-xl">
                        {fallbackEmojis[mood]}
                    </span>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};