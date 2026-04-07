"use client";

import { Zap, Map, Users, ArrowRight, LayoutGrid, Activity } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminOverview() {
  const tools = [
    {
      title: "Journey Architect",
      desc: "Map out the core curriculum path, lesson nodes, and unlockable milestones.",
      icon: <Map size={32} />,
      href: "/admin/journey",
      color: "bg-[#24A5EE]",
      status: "Active",
    },
    {
      title: "Sparks Studio",
      desc: "Create gamified Yorùbá lesson nodes with high-fidelity audio & imagery.",
      icon: <Zap size={32} />,
      href: "/admin/sparks",
      color: "bg-[#162B6E]",
      status: "Active",
    },
    {
      title: "Community & Users",
      desc: "Manage learner progress, engagement metrics, and user feedback loops.",
      icon: <Users size={32} />,
      href: "#",
      color: "bg-slate-400",
      status: "Coming Soon",
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-[#24A5EE]" />
            <p className="text-[#24A5EE] font-black uppercase text-[10px] tracking-[0.4em]">Control Plane v1.2</p>
        </div>
        <h1 className="text-6xl font-black text-[#162B6E] tracking-tighter italic">
            Systems Overview
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, idx) => (
          <Link href={tool.href} key={tool.title} className={tool.href === "#" ? "cursor-not-allowed" : "group"}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm group-hover:shadow-[0_30px_60px_-15px_rgba(22,43,110,0.1)] group-hover:-translate-y-3 transition-all duration-500 h-full flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle Background Pattern */}
              <div className="absolute -right-4 -top-4 opacity-[0.03] text-[#162B6E] group-hover:scale-110 transition-transform duration-700">
                {tool.icon}
              </div>

              <div>
                <div className="flex justify-between items-start mb-10">
                    <div className={`${tool.color} w-20 h-20 rounded-[28px] flex items-center justify-center text-white shadow-2xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500`}>
                        {tool.icon}
                    </div>
                    <span className={`text-[8px] font-black px-3 py-1 rounded-full border ${tool.status === 'Active' ? 'border-green-200 text-green-500' : 'border-slate-200 text-slate-400'} uppercase tracking-widest`}>
                        {tool.status}
                    </span>
                </div>
                
                <h3 className="text-2xl font-black text-[#162B6E] mb-4 tracking-tight">{tool.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-sm">{tool.desc}</p>
              </div>

              <div className={`mt-10 flex items-center gap-2 font-black uppercase text-[10px] tracking-[0.2em] transition-all ${tool.href === "#" ? "text-slate-300" : "text-[#24A5EE] group-hover:gap-5"}`}>
                {tool.href === "#" ? "Locked" : "Launch Studio"} <ArrowRight size={14} />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Quick Stats / Health Section */}
      <footer className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
              { label: "System Status", val: "Operational", icon: <Activity size={14}/> },
              { label: "Active Nodes", val: "124 Sparks", icon: <Zap size={14}/> },
              { label: "Curriculum", val: "4 Journeys", icon: <LayoutGrid size={14}/> }
          ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <div className="text-[#24A5EE]">{stat.icon}</div>
                  <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-sm font-bold text-[#162B6E]">{stat.val}</p>
                  </div>
              </div>
          ))}
      </footer>
    </div>
  );
}