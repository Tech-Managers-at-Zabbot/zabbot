"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, Zap, CheckCircle2 } from "lucide-react";

interface Result {
  total: number;
  tone: number;
  pronunciation: number;
  feedback: string;
}

interface Props {
  result: Result;
}

export default function ParaResult({ result }: Props) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [result]);

  return (
    <div className="relative w-full flex flex-col items-center gap-6">
      {/* 1. Header & Mascot Section */}
      <div className="flex items-center gap-6 w-full">
        <div className="relative w-24 h-24 shrink-0">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
          <Image
            src="/mascot/cheer.png"
            alt="Zabbot Mascot"
            fill
            className="object-contain animate-bounce"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-black text-primary italic uppercase tracking-tighter">Analysis Complete</h3>
            <CheckCircle2 size={18} className="text-green-500" />
          </div>
          <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
            "{result.feedback}"
          </p>
        </div>
      </div>

      {/* 2. Score Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {[
          { key: "total", label: "Overall Score", icon: <Star size={12} className="text-yellow-500" /> },
          { key: "tone", label: "Tone Accuracy", icon: <Zap size={12} className="text-blue-500" /> },
          { key: "pronunciation", label: "Diction", icon: <Zap size={12} className="text-red-500" /> }
        ].map((item) => {
          const value = result[item.key as keyof Result] as number;
          return (
            <div key={item.key} className="p-4 rounded-[24px] bg-white/50 border border-white/40 shadow-sm flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                  {item.icon} {item.label}
                </span>
                <span className="text-sm font-black text-primary">{value}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  className={`h-full ${value > 70 ? 'bg-primary' : 'bg-[#EF4444]'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Confetti logic remains internal */}
      <AnimatePresence>
        {showConfetti && (
           <div className="absolute top-0 pointer-events-none overflow-hidden h-full w-full">
             {/* Simple particle logic or Lottie would go here */}
           </div>
        )}
      </AnimatePresence>
    </div>
  );
}