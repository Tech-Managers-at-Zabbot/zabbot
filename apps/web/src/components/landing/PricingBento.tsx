"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  Sparkles, 
  Zap, 
  Infinity as InfinityIcon, // FIX: Aliased to avoid collision with global Infinity
  Crown 
} from "lucide-react";

const plans = [
  {
    name: "Explorer",
    price: "$9.99",
    period: "/mo",
    features: ["7-Day Free Trial", "AI Feedback", "Unlimited Lessons"],
    icon: Zap,
  },
  {
    name: "Fluentist",
    price: "$69.99",
    period: "/yr",
    badge: "Best Value",
    features: ["Everything in Explorer", "Offline Mode", "Priority AI Support"],
    icon: Crown,
    featured: true,
  },
  {
    name: "Legacy",
    price: "$159.99",
    period: "once",
    features: ["Lifetime Access", "All Future Content", "Exclusive Founder Badge"],
    icon: InfinityIcon, // Using the aliased icon
  },
];

export default function PricingBento() {
  const [active, setActive] = useState(1); // Default to "Best Value"

  return (
    <section className="py-24 px-4 bg-transparent relative overflow-hidden">
      <div className="max-w-md mx-auto md:max-w-6xl">

        {/* HEADER */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-[#162B6E] tracking-tight">
            Choose your path
          </h2>
          <p className="text-base text-slate-500 font-medium">
            Start with a 7-day free trial. Unlock your heritage today.
          </p>
        </div>

        {/* PRICING GRID */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-8 px-2">
          {plans.map((plan, i) => {
            const isActive = active === i;

            return (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="min-w-[300px] md:min-w-0 cursor-pointer"
              >
                <div
                  className={`relative h-full rounded-[32px] p-8 transition-all duration-500 border-2 ${
                    isActive
                      ? "bg-[#24A5EE] text-white border-[#24A5EE] shadow-[0_30px_70px_rgba(36,165,238,0.35)] scale-105 z-20"
                      : "bg-white/60 backdrop-blur-xl border-white/80 text-[#162B6E] opacity-80 hover:opacity-100"
                  }`}
                >
                  {/* BADGE */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-8 text-[10px] font-black uppercase tracking-[0.2em] bg-white text-[#24A5EE] px-4 py-1.5 rounded-full shadow-lg border border-[#24A5EE]/10">
                      {plan.badge}
                    </div>
                  )}

                  {/* ICON */}
                  <div className={`mb-6 w-12 h-12 flex items-center justify-center rounded-2xl ${
                    isActive ? "bg-white/20" : "bg-[#EFF6FF]"
                  }`}>
                    <plan.icon size={22} className={isActive ? "text-white" : "text-[#24A5EE]"} />
                  </div>

                  {/* CONTENT */}
                  <h3 className="font-black text-xl mb-2 tracking-tight">
                    {plan.name}
                  </h3>

                  <div className="mb-6">
                    <span className="text-4xl font-black italic">
                      {plan.price}
                    </span>
                    <span className={`ml-1 text-sm font-bold uppercase tracking-widest ${isActive ? "text-white/70" : "text-slate-400"}`}>
                      {plan.period}
                    </span>
                  </div>

                  {/* FEATURES */}
                  <ul className="space-y-4 text-sm font-medium">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className={`rounded-full p-0.5 ${isActive ? "bg-white/20" : "bg-[#24A5EE]/10"}`}>
                          <Check size={14} className={isActive ? "text-white" : "text-[#24A5EE]"} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* PRIMARY CTA */}
        <div className="max-w-lg mx-auto mt-10">
          <AnimatedCTA planName={plans[active].name} />
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-6 opacity-60">
            Secure checkout • Instant Activation
          </p>
        </div>
      </div>
    </section>
  );
}

function AnimatedCTA({ planName }: { planName: string }) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      className="relative w-full py-5 rounded-[22px] bg-[#162B6E] text-white font-black text-lg tracking-tight overflow-hidden flex items-center justify-center gap-3 group shadow-2xl shadow-blue-900/20"
    >
      {/* SHIMMER EFFECT */}
      <motion.div
        initial={{ x: "-150%" }}
        animate={{ x: "150%" }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
      />

      <span className="relative z-10 flex items-center gap-3">
        {loading ? "Initializing..." : `Get ${planName} Access`}
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Sparkles size={20} className="text-[#24A5EE]" />
        </motion.div>
      </span>
    </motion.button>
  );
}