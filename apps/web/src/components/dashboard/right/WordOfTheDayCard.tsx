"use client";

import { motion } from "framer-motion";

interface Word {
  word: string;
  phonetic: string;
  meaning: string;
  xpReward?: number;
}

interface Props {
  word: Word | null;
}

export default function WordOfTheDayCard({ word }: Props) {
  if (!word) {
    return (
      <div className="rounded-3xl p-4 sm:p-6 bg-white/40 backdrop-blur-xl border border-white/50 text-sm text-slate-400 animate-pulse">
        No word available
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="relative rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-[#162B6E] to-[#1E3A8A] text-white shadow-xl overflow-hidden"
    >
      {/* XP BADGE */}
      {word.xpReward && (
        <div className="absolute top-4 right-4 text-[10px] sm:text-[12px] bg-[#FACC15] text-black px-3 py-1 rounded-full font-black">
          +{word.xpReward} XP
        </div>
      )}

      <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/70 mb-2 sm:mb-3">
        Word of the Day
      </p>

      <h2 className="text-2xl sm:text-3xl font-black mb-1">{word.word}</h2>

      <p className="text-xs sm:text-sm italic text-white/70 mb-3">{word.phonetic}</p>

      <p className="text-sm sm:text-base leading-relaxed text-white/90">{word.meaning}</p>

      <button
        aria-label={`Learn more about ${word.word}`}
        className="mt-4 sm:mt-6 w-full py-2 sm:py-3 rounded-xl bg-white text-[#162B6E] font-bold text-sm sm:text-base hover:bg-[#EFF6FF] transition"
      >
        Learn More →
      </button>
    </motion.div>
  );
}