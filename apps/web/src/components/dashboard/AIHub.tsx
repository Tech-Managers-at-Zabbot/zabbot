"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BotMessageSquare,
  Mic,
  BookOpenText,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Feature {
  icon: React.ElementType;
  title: string;
  tag: string;
  mascot: string;
  gradient: string;
  delay: number;
  link: string;
}

const features: Feature[] = [
  {
    icon: BotMessageSquare,
    title: "Ọ̀rẹ́",
    tag: "Chat",
    mascot: "/mascots/Ore.png",
    gradient: "from-[#162B6E] to-[#24A5EE]",
    delay: 0.1,
    link: "/ai/ore",
  },
  {
    icon: Mic,
    title: "Pàrà",
    tag: "Speak",
    mascot: "/mascots/Para.png",
    gradient: "from-[#24A5EE] to-[#38bdf8]",
    delay: 0.2,
    link: "/ai/para",
  },
  {
    icon: BookOpenText,
    title: "Òwe",
    tag: "Stories",
    mascot: "/mascots/Owe.png",
    gradient: "from-[#059669] to-[#34d399]",
    delay: 0.3,
    link: "/ai/owe",
  },
];

export default function AIHub() {
  return (
    <section className="py-12 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 text-left">
          <h2 className="text-xl md:text-3xl font-extrabold text-[#162B6E] leading-tight max-w-sm">
            Learn visually. Speak naturally.
          </h2>
        </div>

        {/* AGENT CARDS */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible pb-4 snap-x snap-mandatory">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  tag,
  mascot,
  gradient,
  delay,
  link,
  index,
}: Feature & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="min-w-[260px] md:min-w-0 group snap-start"
    >
      <div
        className={`relative h-[300px] rounded-[28px] overflow-hidden bg-gradient-to-br ${gradient} p-5 flex flex-col justify-between shadow-xl`}
      >
        {/* BACKGROUND BLOBS */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/20 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full blur-2xl" />

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
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative w-full h-[130px]"
        >
          <Image
            src={mascot}
            alt={`Mascot of ${title} AI agent`}
            fill
            className="object-contain drop-shadow-2xl"
            loading={index === 0 ? "eager" : "lazy"}
            priority={index === 0}
          />
        </motion.div>

        {/* BOTTOM */}
        <div className="z-10">
          <h3 className="text-lg md:text-xl font-extrabold text-white mb-3">
            {title}
          </h3>

          <Link href={link} aria-label={`Open ${title} agent`} className="block group/btn">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="relative overflow-hidden w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 transition-all duration-300 cursor-pointer"
            >
              <span className="absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-white/30 blur-md rotate-12 translate-x-0 group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              </span>

              <span className="relative z-10">Open</span>

              <motion.span
                className="relative z-10 flex items-center"
                initial={{ x: 0, y: 0 }}
                whileHover={{ x: 3, y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowUpRight size={14} />
              </motion.span>
            </motion.div>
          </Link>
        </div>

        {/* HOVER GLOW */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/10" />
      </div>
    </motion.div>
  );
}