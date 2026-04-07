"use client";
import { motion } from "framer-motion";
import { Award, Star } from "lucide-react";

interface MilestoneRewardsProps {
  progress: number; // 0–100
  nextMilestone: { level: number; xpRequired: number } | null;
}

export default function MilestoneRewards({ progress, nextMilestone }: MilestoneRewardsProps) {
  return (
    <div className="zabbot-glass rounded-[40px] p-6 bg-gradient-to-br from-[#162B6E] to-[#24A5EE] border-none text-white overflow-hidden relative group">
      {/* Decorative Background Icon */}
      <Award size={120} className="absolute -right-8 -bottom-8 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Star size={16} className="text-[#FACC15] fill-current" />
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Next Milestone</span>
        </div>

        <h4 className="text-xl font-black mb-1">
          {nextMilestone ? `Level ${nextMilestone.level}` : "Max Level!"}
        </h4>
        <p className="text-xs text-blue-100/60 font-medium mb-6">
          {nextMilestone ? `Reach ${nextMilestone.xpRequired} XP to unlock.` : "Congratulations! You've completed all milestones."}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black uppercase">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-[#FACC15] shadow-[0_0_10px_rgba(250,204,21,0.5)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}