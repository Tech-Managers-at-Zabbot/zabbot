"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuickSparkModal } from "./QuickSparkModal";
import {
  Play,
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Heart,
  X,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/i18n/language-context";

/**
 * NEURAL WORLD MAP COMPONENT (UNCHANGED)
 */
function NeuralWorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const continentNodes = [
      { x: 15, y: 25 },
      { x: 25, y: 20 },
      { x: 20, y: 35 },
      { x: 30, y: 65 },
      { x: 35, y: 80 },
      { x: 32, y: 55 },
      { x: 50, y: 25 },
      { x: 55, y: 20 },
      { x: 52, y: 30 },
      { x: 50, y: 50 },
      { x: 55, y: 65 },
      { x: 60, y: 45 },
      { x: 52, y: 40 },
      { x: 75, y: 30 },
      { x: 85, y: 25 },
      { x: 70, y: 40 },
      { x: 80, y: 50 },
      { x: 85, y: 75 },
      { x: 90, y: 85 },
    ];

    let particles: any[] = [];
    const connectionDistance = 110;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = [];
      continentNodes.forEach((node) => {
        for (let i = 0; i < 4; i++) {
          const tx = (node.x / 100) * canvas.width;
          const ty = (node.y / 100) * canvas.height;

          particles.push({
            x: tx + (Math.random() - 0.5) * 100,
            y: ty + (Math.random() - 0.5) * 100,
            tx,
            ty,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 1.2 + 0.8,
          });
        }
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(36, 165, 238, 0.08)";
      ctx.fillStyle = "rgba(36, 165, 238, 0.2)";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        const distFromTarget = Math.sqrt(
          Math.pow(p.x - p.tx, 2) + Math.pow(p.y - p.ty, 2)
        );

        if (distFromTarget > 60) {
          p.vx += (p.tx - p.x) * 0.001;
          p.vy += (p.ty - p.y) * 0.001;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.lineWidth = (1 - dist / connectionDistance) * 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    init();
    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      className="absolute inset-0 z-0 pointer-events-none opacity-40"
      ref={canvasRef}
    />
  );
}

export default function HeroSection() {
  const [isSparkOpen, setIsSparkOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // 🌍 I18N HOOK
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-0 pb-10 bg-[#EFF6FF]">
      <div className="absolute inset-0 z-0">
        <NeuralWorldMap />

        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[-5%] w-[60%] h-[60%] rounded-full bg-blue-200/30 blur-[100px] -z-10"
        />
      </div>

      <div className="container max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center z-10">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left space-y-8"
        >
          {/* BADGE (NOW TRANSLATED) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-blue-100 shadow-sm text-[#24A5EE] text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} className="animate-pulse" />
            <span>{t("hero.badge")}</span>
          </div>

          {/* TITLE */}
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] text-[#162B6E]">
            {t("hero.title")}
          </h1>

          {/* SUBTITLE */}
          <p className="text-slate-600 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            {t("hero.subtitle")}
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.button
              onClick={() => setIsSparkOpen(true)}
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 bg-[#24A5EE] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-400/30"
            >
              {t("hero.ctaPrimary")}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>

            <motion.button
              onClick={() => setIsVideoOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/60 text-[#162B6E] border border-white/80 rounded-2xl font-bold flex items-center justify-center gap-3 backdrop-blur-md shadow-sm"
            >
              <div className="bg-[#FACC15] p-1 rounded-full">
                <Play size={14} fill="white" className="text-white ml-0.5" />
              </div>
              {t("hero.ctaSecondary")}
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT (UNCHANGED VISUALS) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center items-center"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-10 -right-2 md:right-0 p-5 rounded-[32px] bg-white/80 backdrop-blur-2xl border border-white shadow-2xl z-30 hidden sm:block"
          >
            <div className="space-y-4">
              <p className="text-[10px] text-[#24A5EE] uppercase font-black tracking-[0.2em] text-center">
                Dashboard Pulse
              </p>

              <div className="flex items-center gap-3">
                <DashboardMetric
                  icon={Target}
                  color="text-emerald-500"
                  value="3 / 5"
                  label="Lessons"
                />
                <DashboardMetric
                  icon={Zap}
                  color="text-amber-500"
                  value="1.2k"
                  label="XP"
                />
                <DashboardMetric
                  icon={Heart}
                  color="text-red-500"
                  value="4"
                  label="Hearts"
                />
              </div>
            </div>
          </motion.div>

          <div className="relative w-full max-w-[500px] z-10">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative aspect-square w-full"
            >
              <Image
                src="/mascots/parrot_map.png"
                alt="Zabbot Mascot"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-8 left-1 -translate-x-1/2 w-[110%] h-[40%] z-20 pointer-events-none"
              >
                <Image
                  src="https://res.cloudinary.com/dgotesgcy/image/upload/sqwopftine1ifaykvpca.svg"
                  alt="Cultural Flags"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-400/5 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>

      {/* MODALS */}
      <QuickSparkModal
        isOpen={isSparkOpen}
        onClose={() => setIsSparkOpen(false)}
      />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
}

/* DASHBOARD METRIC (UNCHANGED) */
function DashboardMetric({
  icon: Icon,
  color,
  value,
  label,
}: {
  icon: any;
  color: string;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white shadow-sm border border-slate-50">
      <Icon size={20} className={color} strokeWidth={2.5} />
      <p className="text-base font-black text-[#162B6E]">{value}</p>
      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">
        {label}
      </p>
    </div>
  );
}

/* VIDEO MODAL (UNCHANGED BEHAVIOR) */
function VideoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#EFF6FF]/60 backdrop-blur-xl"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            className="relative w-full max-w-4xl mt-20 aspect-video bg-black rounded-[32px] overflow-hidden shadow-2xl border border-[#24A5EE]/20"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-[#162B6E]"
            >
              <X size={24} />
            </button>

            <iframe
              src="https://www.youtube.com/embed/mWBvbeLHVYs?autoplay=1"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}