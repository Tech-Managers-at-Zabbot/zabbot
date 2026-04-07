"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BotMessageSquare, 
  Mic, 
  BookOpenText, 
  UsersRound, 
  ArrowUpRight, 
  Sparkles 
} from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: BotMessageSquare,
    title: "Ọ̀rẹ́",
    tag: "Chat",
    mascot: "/mascots/Ore.png",
    gradient: "from-[#162B6E] to-[#24A5EE]",
    delay: 0.1,
  },
  {
    icon: Mic,
    title: "Pàrà",
    tag: "Speak",
    mascot: "/mascots/Para.png",
    gradient: "from-[#24A5EE] to-[#38bdf8]",
    delay: 0.2,
  },
  {
    icon: BookOpenText,
    title: "Òwe",
    tag: "Stories",
    mascot: "/mascots/Owe.png",
    gradient: "from-[#059669] to-[#34d399]",
    delay: 0.3,
  },
  {
    icon: UsersRound,
    title: "Connect",
    tag: "Connect",
    mascot: "/zabbot-community.png",
    gradient: "from-[#6366f1] to-[#8b5cf6]",
    delay: 0.4,
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center"> {/* Centered everything inside */}

        {/* HEADER (MINIMAL) */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-[#24A5EE] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles size={14} />
            Experience
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold text-[#162B6E] leading-tight mx-auto max-w-sm">
            Learn visually. Speak naturally.
          </h2>
        </div>

        {/* MOBILE SCROLL */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible pb-4 scrollbar-hide">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, tag, mascot, gradient, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="min-w-[260px] md:min-w-0 group"
    >
      <div className={`relative h-[340px] rounded-[28px] overflow-hidden bg-gradient-to-br ${gradient} p-5 flex flex-col justify-between shadow-xl`}>

        {/* BACKGROUND BLOBS */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

        {/* TOP */}
        <div className="flex justify-between items-start z-10">
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl text-white">
            <Icon size={20} />
          </div>

          <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">
            {tag}
          </span>
        </div>

        {/* CENTER MASCOT */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative w-full h-[150px]"
        >
          <Image
            src={mascot}
            alt={title}
            fill
            className="object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* BOTTOM */}
        <div className="z-10">
          <h3 className="text-xl font-extrabold text-white mb-3">
            {title}
          </h3>

          {/* NEW CTA SECTION */}
          <a href="#" className="block group/btn">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="relative overflow-hidden w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 transition-all duration-300 cursor-pointer"
            >
              {/* SHINE SWEEP */}
              <span className="absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-white/30 blur-md rotate-12 translate-x-0 group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              </span>

              {/* TEXT */}
              <span className="relative z-10">Open</span>

              {/* ICON ANIMATION */}
              <motion.span
                className="relative z-10 flex items-center"
                initial={{ x: 0, y: 0 }}
                whileHover={{ x: 3, y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowUpRight size={14} />
              </motion.span>
            </motion.div>
          </a>
        </div>

        {/* HOVER GLOW */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/10" />
      </div>
    </motion.div>
  );
}