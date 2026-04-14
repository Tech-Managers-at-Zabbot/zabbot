"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Lock, Zap, Flame, Mic, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/i18n/language-context";

export default function DashboardPeek() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="container max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <span className="text-[#24A5EE] font-bold text-xs uppercase tracking-[0.3em]">
            {t("dashboardPeek.inside")}
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#162B6E] mt-2">
            {t("dashboardPeek.title")}
          </h2>
        </div>

        <div className="relative group">
          {/* 🔒 LOCKED OVERLAY */}
          <div className="absolute inset-0 z-30 flex items-center justify-center px-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="w-full max-w-sm"
            >
              <GlassCard className="border-[#24A5EE]/40 text-center space-y-6 shadow-[0_20px_50px_rgba(36,165,238,0.25)] py-10 backdrop-blur-xl">
                <div className="w-14 h-14 bg-[#24A5EE] rounded-full mx-auto flex items-center justify-center text-white shadow-lg">
                  <Lock size={24} aria-hidden />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#162B6E]">
                    {t("dashboardPeek.lockTitle")}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">
                    {t("dashboardPeek.lockSubtitle")}
                  </p>
                </div>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 bg-[#24A5EE] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-[#1d8cd1] transition-all"
                  aria-label="Go to login"
                >
                  {t("dashboardPeek.cta")}
                  <Zap size={16} aria-hidden />
                </Link>
              </GlassCard>
            </motion.div>
          </div>

          {/* 🔥 DASHBOARD PREVIEW */}
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[32px]"
          >
            {/* ✨ GLASS OVERLAY */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-20" />

            {/* 🎯 CONTENT */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="opacity-70 blur-[2px] pointer-events-none select-none"
            >
              <GlassCard className="p-6 md:p-8 bg-white/40 border-white/60">
                <div className="space-y-6">
                  {/* 🔥 STREAK + XP */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-orange-500 font-bold">
                      <Flame size={18} aria-hidden />
                      {t("dashboardPeek.streakValue")}
                    </div>
                    <div className="text-sm font-bold text-[#162B6E]">
                      {t("dashboardPeek.xpValue")}
                    </div>
                  </div>

                  {/* 🎯 TODAY’S SPARK */}
                  <div className="rounded-2xl bg-gradient-to-r from-[#162B6E] to-[#24A5EE] text-white p-5 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase tracking-widest opacity-80">
                        {t("dashboardPeek.sparkLabel")}
                      </span>
                      <Sparkles size={14} aria-hidden />
                    </div>

                    <h4 className="text-lg font-bold">
                      {t("dashboardPeek.sparkTitle")}
                    </h4>

                    <p className="text-sm opacity-80 mt-1">
                      {t("dashboardPeek.sparkSubtitle")}
                    </p>
                  </div>

                  {/* 🎤 AI PRACTICE */}
                  <div className="flex items-center justify-between bg-white/70 border border-white rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#24A5EE]/20 flex items-center justify-center text-[#24A5EE]">
                        <Mic size={18} aria-hidden />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#162B6E]">
                          {t("dashboardPeek.pronunciation")}
                        </p>
                        <p className="text-xs text-slate-400">
                          {t("dashboardPeek.aiFeedback")}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#24A5EE]">
                      {t("dashboardPeek.start")}
                    </span>
                  </div>

                  {/* 📚 LOCKED MODULES */}
                  <div className="flex gap-4">
                    <MiniCard label={t("dashboardPeek.modules.market")} />
                    <MiniCard label={t("dashboardPeek.modules.family")} />
                    <MiniCard label={t("dashboardPeek.modules.travel")} />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* MINI LOCKED MODULE */
function MiniCard({ label }: { label: string }) {
  return (
    <div className="flex-1 bg-white/50 border border-white rounded-xl p-4 text-center">
      <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
        <Lock size={14} aria-hidden />
      </div>
      <p className="text-xs font-semibold text-slate-400">{label}</p>
    </div>
  );
}