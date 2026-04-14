"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { XCircle, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useLanguage } from "@/i18n/language-context"; // ✅ ADDED

export default function ComparisonSection() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const revealX = useTransform(scrollYProgress, [0.3, 0.6], ["100%", "0%"]);

  // ✅ I18N
  const { t } = useLanguage();

  return (
    <section ref={containerRef} className="py-24 px-4 relative bg-transparent">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#162B6E]">
            {t("comparison.title")}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            {t("comparison.subtitle")}
          </p>
        </div>

        <div className="relative rounded-[32px] overflow-hidden border border-white/60 shadow-2xl bg-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* THE PROBLEM */}
            <div className="p-8 md:p-12 space-y-8 bg-slate-100/30">
              <div className="flex items-center gap-3 text-red-500 font-bold uppercase tracking-widest text-xs">
                <XCircle size={18} /> {t("comparison.genericApps")}
              </div>

              <ul className="space-y-6">
                {[
                  t("comparison.generic.1"),
                  t("comparison.generic.2"),
                  t("comparison.generic.3"),
                  t("comparison.generic.4"),
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-slate-600 text-sm md:text-base">
                    <AlertCircle size={20} className="shrink-0 text-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* THE SOLUTION */}
            <motion.div
              style={{ x: revealX }}
              className="absolute inset-0 z-10 bg-gradient-to-br from-[#24A5EE] to-[#162B6E] md:relative md:inset-auto md:translate-x-0 shadow-[-20px_0_50px_rgba(0,0,0,0.1)]"
            >
              <div className="p-8 md:p-12 space-y-8 h-full relative overflow-hidden">

                <div className="absolute inset-0 border-l-2 border-white/30 pointer-events-none" />

                <div className="flex items-center gap-3 text-cyan-200 font-bold uppercase tracking-widest text-xs">
                  <Sparkles size={18} /> {t("comparison.zabbotApproach")}
                </div>

                <ul className="space-y-6">
                  {[
                    t("comparison.zabbot.1"),
                    t("comparison.zabbot.2"),
                    t("comparison.zabbot.3"),
                    t("comparison.zabbot.4"),
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-white font-medium text-sm md:text-base">
                      <CheckCircle2 size={20} className="shrink-0 text-cyan-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </div>

        {/* FLOATING STAT */}
        <div className="mt-12 flex justify-center">
          <GlassCard className="py-4 px-8 border-[#24A5EE]/30">
            <p className="text-sm text-[#162B6E] font-medium flex items-center gap-3 text-center">
              <span className="w-2 h-2 rounded-full bg-[#24A5EE] animate-pulse" />
              {t("comparison.footer")}
            </p>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}