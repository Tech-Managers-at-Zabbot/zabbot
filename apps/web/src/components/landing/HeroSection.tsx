"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuickSparkModal } from "./QuickSparkModal"; 
import { Play, Sparkles, ArrowRight, Zap, Target, Heart, X } from "lucide-react"; 
import Image from "next/image";

/**
 * NEURAL WORLD MAP COMPONENT - Refined for subtlety
 */
function NeuralWorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const continentNodes = [
      { x: 15, y: 25 }, { x: 25, y: 20 }, { x: 20, y: 35 },
      { x: 30, y: 65 }, { x: 35, y: 80 }, { x: 32, y: 55 },
      { x: 50, y: 25 }, { x: 55, y: 20 }, { x: 52, y: 30 },
      { x: 50, y: 50 }, { x: 55, y: 65 }, { x: 60, y: 45 }, { x: 52, y: 40 },
      { x: 75, y: 30 }, { x: 85, y: 25 }, { x: 70, y: 40 }, { x: 80, y: 50 },
      { x: 85, y: 75 }, { x: 90, y: 85 }
    ];

    let particles: { x: number; y: number; tx: number; ty: number; vx: number; vy: number; size: number }[] = [];
    const connectionDistance = 110; // Reduced for subtlety

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = [];
      continentNodes.forEach(node => {
        for (let i = 0; i < 4; i++) { // Fewer particles
          const tx = (node.x / 100) * canvas.width;
          const ty = (node.y / 100) * canvas.height;
          particles.push({
            x: tx + (Math.random() - 0.5) * 100,
            y: ty + (Math.random() - 0.5) * 100,
            tx: tx,
            ty: ty,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 1.2 + 0.8, // Smaller nodes
          });
        }
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(36, 165, 238, 0.08)"; // Lower opacity lines
      ctx.fillStyle = "rgba(36, 165, 238, 0.2)"; // Lower opacity nodes

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        const distFromTarget = Math.sqrt(Math.pow(p.x - p.tx, 2) + Math.pow(p.y - p.ty, 2));
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

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
}

export default function HeroSection() {
  const [isSparkOpen, setIsSparkOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 pt-20 pb-10 bg-[#EFF6FF]">
      
      <div className="absolute inset-0 z-0">
        <NeuralWorldMap />
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[-5%] w-[60%] h-[60%] rounded-full bg-blue-200/30 blur-[100px] -z-10" 
        />
      </div>

      <div className="container max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* LEFT: Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center lg:text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/80 shadow-sm text-[#24A5EE] text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} />
            <span>The spark that powers language & culture</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] text-[#162B6E]">
            LEARN YOUR HERITAGE
            <br />
            <motion.span 
              animate={{ 
                scale: [1, 1.02, 1],
                textShadow: ["0 0 0px #24A5EE00", "0 0 15px #24A5EE66", "0 0 0px #24A5EE00"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-[#24A5EE] inline-block mt-2"
            >
              LANGUAGE
            </motion.span>
          </h1>

          <p className="text-slate-600 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Through AI powered cultural immersion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <motion.button 
              onClick={() => setIsSparkOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-[#24A5EE] text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-400/30 overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start 60-Second Spark <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            
            <motion.button 
              onClick={() => setIsVideoOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(36, 165, 238, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="relative px-8 py-4 bg-white/60 text-[#162B6E] border border-white/80 rounded-2xl font-bold flex items-center justify-center gap-2 backdrop-blur-md shadow-sm transition-all group cursor-pointer"
            >
              <Play size={18} fill="#FACC15" className="text-[#FACC15]" /> 
              Watch Demo
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT: Mascot & Sneak Peak */}
        <motion.div className="relative flex justify-center items-center">
          
          {/* 1. Dashboard Pulse - Added floating animation and repositioned */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: [5, -10, 5], // Independent floating motion
              opacity: 0.9 
            }}
            transition={{ 
              opacity: { delay: 0.8, duration: 0.5 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" } 
            }}
            className="absolute top-30 -right-4 md:-right-8 p-4 rounded-[28px] bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl z-30 scale-90 md:scale-100"
          >
            <div className="space-y-3">
                <p className="text-[9px] text-[#24A5EE] uppercase font-black tracking-widest text-center">Dashboard Pulse</p>
                <div className="flex items-center gap-2">
                    <DashboardMetric icon={Target} color="text-emerald-500" value="3 / 5" label="Lessons" />
                    <DashboardMetric icon={Zap} color="text-amber-500" value="1.2k" label="XP" />
                    <DashboardMetric icon={Heart} color="text-red-500" value="4" label="Hearts" />
                </div>
            </div>
          </motion.div>

          <motion.div className="relative w-full max-w-[450px] z-10">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[4/5] w-full"
            >
              <Image src="mascot.svg" alt="Zabbot" fill className="object-contain" priority />
              
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 0.9 }} 
                transition={{ delay: 1 }}
                className="absolute -bottom-[5%] left-1/2 -translate-x-1/2 w-[110%] h-[40%] z-20 pointer-events-none"
              >
                <Image src="https://res.cloudinary.com/dgotesgcy/image/upload/sqwopftine1ifaykvpca.svg" alt="Flags" fill className="object-contain" />
              </motion.div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>

      <QuickSparkModal isOpen={isSparkOpen} onClose={() => setIsSparkOpen(false)} />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
}

function DashboardMetric({ icon: Icon, color, value, label }: { icon: any; color: string; value: string; label: string }) {
    return (
        <div className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-white/50 border border-white/80">
            <Icon size={18} className={color} strokeWidth={2.5} />
            <p className="text-sm font-black text-[#162B6E]">{value}</p>
            <p className="text-[7px] font-bold text-slate-400 uppercase">{label}</p>
        </div>
    )
}

function VideoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#162B6E]/80 backdrop-blur-md" />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden">
            <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full text-white"><X size={24} /></button>
            <iframe src="https://www.youtube.com/embed/mWBvbeLHVYs?autoplay=1" className="w-full h-full" allowFullScreen />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}