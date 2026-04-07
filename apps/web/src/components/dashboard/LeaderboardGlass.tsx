"use client";
import React from "react";
import { Trophy, Crown, TrendingUp, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface LeaderboardStudent {
  user: { name: string; avatar: string };
  totalXP: number;
  rank?: number; // optional if ranking already exists
}

interface LeaderboardGlassProps {
  leaderboard: LeaderboardStudent[];
}

export default function LeaderboardGlass({ leaderboard }: LeaderboardGlassProps) {
  // Sort leaderboard by XP descending
  const sorted = [...leaderboard].sort((a, b) => b.totalXP - a.totalXP);

  const first = sorted[0];
  const second = sorted[1];
  const third = sorted[2];

  return (
    <div className="zabbot-glass-card p-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-xp to-orange-500 p-2 rounded-xl shadow-lg shadow-xp/20">
            <Trophy size={20} className="text-white fill-current" />
          </div>
          <div>
            <h3 className="font-heading font-black text-xl text-heritage leading-none">Golden League</h3>
            <p className="text-[10px] font-ui font-bold text-xp uppercase tracking-widest mt-1">Season 4 • Week 2</p>
          </div>
        </div>
        <button className="btn-glass p-2">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* 3D Pedestal */}
      <div className="flex items-end justify-center gap-2 h-56 mb-10 relative">
        {/* Second */}
        {second && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center flex-1 group"
          >
            <div className="w-12 h-12 rounded-full border-2 border-slate-300 mb-3 bg-white flex items-center justify-center font-black text-heritage shadow-lg">
              {second.user.avatar}
            </div>
            <div className="w-full bg-slate-200/40 border border-white/60 backdrop-blur-md h-20 rounded-t-3xl flex flex-col items-center justify-center relative shadow-inner">
              <span className="font-heading font-black text-slate-500/50 text-2xl">2</span>
              <p className="text-[10px] font-ui font-black text-heritage/70 mt-1">{second.user.name}</p>
            </div>
          </motion.div>
        )}

        {/* First */}
        {first && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center flex-1 z-10 scale-110 group"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Crown className="text-xp mb-2 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" size={24} fill="currentColor" />
            </motion.div>
            <div className="w-16 h-16 rounded-full border-4 border-xp mb-3 bg-white flex items-center justify-center font-black text-heritage text-xl shadow-2xl ring-4 ring-xp/10">
              {first.user.avatar}
            </div>
            <div className="w-full bg-xp/20 border border-xp/30 backdrop-blur-md h-32 rounded-t-3xl flex flex-col items-center justify-center relative shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-xp/10 to-transparent" />
              <span className="font-heading font-black text-xp text-4xl relative z-10">1</span>
              <p className="text-xs font-ui font-black text-heritage mt-1 relative z-10">{first.user.name}</p>
            </div>
          </motion.div>
        )}

        {/* Third */}
        {third && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center flex-1 group"
          >
            <div className="w-12 h-12 rounded-full border-2 border-orange-300 mb-3 bg-white flex items-center justify-center font-black text-heritage shadow-lg">
              {third.user.avatar}
            </div>
            <div className="w-full bg-orange-200/30 border border-white/60 backdrop-blur-md h-16 rounded-t-3xl flex flex-col items-center justify-center relative shadow-inner">
              <span className="font-heading font-black text-orange-600/50 text-2xl">3</span>
              <p className="text-[10px] font-ui font-black text-heritage/70 mt-1">{third.user.name}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}