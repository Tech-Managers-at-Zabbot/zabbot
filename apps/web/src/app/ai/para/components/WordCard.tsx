"use client";

import { motion } from "framer-motion";

interface Props {
  english: string;
  yoruba: string;
  tones?: string[];
}

export default function WordCard({ english, yoruba, tones = [] }: Props) {
  return (
    <div className="flex flex-col items-center justify-center w-full py-4">
      
      {/* 1. TONAL GUIDE - High Contrast Zabbot Style */}
      <div className="flex justify-center gap-3 mb-8">
        {tones && tones.length > 0 ? (
          tones.map((tone, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="px-5 py-2 rounded-full text-[12px] font-black uppercase tracking-widest border-2 border-primary/40 bg-white shadow-[0_4px_12px_rgba(var(--primary-rgb),0.1)] text-primary min-w-[70px] text-center"
            >
              {tone}
            </motion.span>
          ))
        ) : (
          <div className="h-[40px] w-1" /> // Spacer to prevent layout shift
        )}
      </div>

      {/* 2. YORUBA WORD - Bold & Upright */}
      <motion.h1 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-6xl md:text-8xl font-black text-primary tracking-tighter uppercase text-center leading-none"
      >
        {yoruba}
      </motion.h1>

      {/* 3. ENGLISH MEANING - Clean Sans-Serif */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-[13px] font-bold uppercase tracking-[0.4em] text-slate-400 text-center"
      >
        {english}
      </motion.p>
    </div>
  );
}