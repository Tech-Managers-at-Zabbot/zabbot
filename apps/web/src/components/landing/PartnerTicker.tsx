"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, GraduationCap, Award, ShieldCheck, Zap } from "lucide-react";

const partners = [
  { name: "Lagos Tech Hub", icon: Globe },
  { name: "Heritage Foundation", icon: ShieldCheck },
  { name: "Unilag Linguistics", icon: GraduationCap },
  { name: "West Africa AI Collective", icon: Zap },
  { name: "Culture preservation Intl", icon: Award },
];

export default function PartnerTicker() {
  // Duplicate the array to create the seamless infinite loop effect
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-8">
        <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Championing Heritage with Global Partners
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* The Ticker Container */}
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Adjust for speed
          }}
        >
          {duplicatedPartners.map((Partner, index) => (
            <div
              key={index}
              className="flex items-center gap-4 mx-12 group cursor-default"
            >
              <div className="p-2 rounded-xl bg-slate-50 text-slate-300 group-hover:text-[#24A5EE] group-hover:bg-blue-50 transition-all duration-500">
                <Partner.icon size={28} strokeWidth={1.5} />
              </div>
              <span className="text-xl font-black text-slate-300 group-hover:text-[#162B6E] transition-all duration-500 tracking-tighter">
                {Partner.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  );
}