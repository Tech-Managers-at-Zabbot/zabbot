"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Star, Zap, CheckCircle2, X, RotateCcw, 
  ArrowRight, Sparkles, Volume2 
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface Result {
  total: number;
  tone: number;
  pronunciation: number;
  feedback: string;
}

interface ParaResultOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  result: Result;
  onRetry: () => void; // Specifically for "Try Again" on the same audio
  onNext: () => void;  // To move to the next item
  currentYorubaWord: string; // Context for the user
}

export default function ParaResultOverlay({ 
  isOpen, 
  onClose, 
  result, 
  onRetry, 
  onNext,
  currentYorubaWord 
}: ParaResultOverlayProps) {
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#162B6E]/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg"
          >
            <GlassCard className="rounded-t-[40px] md:rounded-[40px] border-white/60 p-8 flex flex-col gap-8 shadow-2xl">
              
              {/* Header Section */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 shrink-0 bg-[#24A5EE]/10 rounded-2xl p-2">
                    <Image
                      src="/mascot/cheer.png"
                      alt="Zabbot"
                      fill
                      className="object-contain animate-bounce"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#162B6E] italic uppercase tracking-tighter">
                      Analysis Done
                    </h3>
                    <div className="flex items-center gap-2 text-[#24A5EE] font-bold text-sm">
                      <Sparkles size={14} />
                      <span>{currentYorubaWord}</span>
                    </div>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              {/* Score Grid */}
              <div className="grid grid-cols-1 gap-3">
                {[
                  { key: "total", label: "Overall Mastery", icon: <Star size={14} className="text-yellow-500" /> },
                  { key: "tone", label: "Tone Pitch", icon: <Zap size={14} className="text-blue-500" /> },
                  { key: "pronunciation", label: "Diction", icon: <Zap size={14} className="text-red-500" /> }
                ].map((item) => {
                  const value = result[item.key as keyof Omit<Result, 'feedback'>] as number;
                  return (
                    <div key={item.key} className="p-5 rounded-[24px] bg-white/60 border border-white/40 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                          {item.icon} {item.label}
                        </span>
                        <span className="text-lg font-black text-[#162B6E]">{value}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          className={`h-full ${value > 70 ? 'bg-[#24A5EE]' : 'bg-[#EF4444]'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 1.2, ease: "circOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feedback Text */}
              <div className="bg-[#162B6E]/5 p-5 rounded-2xl border border-[#162B6E]/10">
                <p className="text-sm font-medium text-slate-600 leading-relaxed italic text-center">
                  "{result.feedback}"
                </p>
              </div>

              {/* Action Footer */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button 
                  onClick={onRetry}
                  className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-500 border-2 border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
                >
                  <RotateCcw size={18} /> Try Again
                </button>
                <button 
                  onClick={onNext}
                  className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-widest bg-[#162B6E] text-white shadow-lg shadow-blue-900/20 hover:scale-[1.02] transition-all active:scale-95"
                >
                  Next Item <ArrowRight size={18} />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}