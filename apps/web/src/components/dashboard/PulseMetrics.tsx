"use client";

import { motion } from "framer-motion";

interface PulseMiniCardProps {
  xp: number;
  streak: number;
  completedSparks: number;
}

export default function PulseMiniCard({ xp, streak, completedSparks }: PulseMiniCardProps) {
  // Calculate a simple daily progress percentage (example)
  const dailyProgress = Math.min((xp / 500) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl p-6 bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm"
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-[#162B6E]">Pulse</h4>
        <span className="text-[10px] text-[#24A5EE] font-bold">LIVE</span>
      </div>

      <div className="flex items-center justify-between">
        {/* Progress Circle */}
        <div className="text-center">
          <div className="text-2xl font-black text-[#162B6E]">{Math.round(dailyProgress)}%</div>
          <p className="text-xs text-slate-400">Daily</p>
        </div>

        {/* Stats */}
        <div className="text-xs text-slate-500 space-y-1">
          <p>🔥 {streak} Day Streak</p>
          <p>⚡ {xp} XP Today</p>
          <p>📘 {completedSparks} Lessons</p>
        </div>
      </div>
    </motion.div>
  );
}