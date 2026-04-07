"use client";

import { motion } from "framer-motion";

interface PulseMiniCardProps {
  progress?: number;
  streak?: number;
  xpToday?: number;
  lessons?: number;
}

export default function PulseMiniCard({
  progress = 75,
  streak = 12,
  xpToday = 320,
  lessons = 8,
}: PulseMiniCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="rounded-3xl p-4 sm:p-6 bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm"
      aria-label={`Daily progress ${progress} percent, streak ${streak} days, ${xpToday} XP, ${lessons} lessons`}
    >
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h4 className="font-bold text-[#162B6E]">Pulse</h4>
        <span className="text-[10px] text-[#24A5EE] font-bold">LIVE</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Progress Circle */}
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-black text-[#162B6E]">{progress}%</div>
          <p className="text-xs text-slate-400">Daily</p>
        </div>

        {/* Stats */}
        <div className="text-xs text-slate-500 space-y-1 text-center sm:text-left">
          <p>🔥 {streak} Day Streak</p>
          <p>⚡ {xpToday} XP Today</p>
          <p>📘 {lessons} Lessons</p>
        </div>
      </div>
    </motion.div>
  );
}