"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Agent } from "@/types/agents";

interface Props {
  agent: Agent;
}

export default function AgentCard({ agent }: Props) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      className="relative group cursor-pointer"
      onClick={() => router.push(agent.route)}
      aria-label={`Access AI Agent: ${agent.name}`}
    >
      <div className="zabbot-glass-card p-6 flex flex-col justify-between h-[260px] overflow-hidden relative">
        {/* TOP */}
        <div>
          <div className="flex justify-between items-start mb-4">
            <div
              className="p-3 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: agent.color }}
            >
              <Sparkles size={18} />
            </div>

            <span className="text-[10px] font-black bg-[#FACC15] text-[#162B6E] px-3 py-1 rounded-full">
              +{agent.xp} XP
            </span>
          </div>

          <h3 className="text-lg font-bold text-[#162B6E] dark:text-white">
            {agent.name}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {agent.description}
          </p>
        </div>

        {/* CTA */}
        <button
          className="mt-4 w-full py-3 rounded-xl text-white text-xs font-bold uppercase flex items-center justify-center gap-2 transition"
          style={{ backgroundColor: agent.color }}
        >
          Practice Now <ArrowUpRight size={14} />
        </button>

        {/* MASCOT */}
        <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-30 group-hover:opacity-90 transition-all">
          <Image
            src={agent.mascot}
            alt={agent.name}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </motion.div>
  );
}