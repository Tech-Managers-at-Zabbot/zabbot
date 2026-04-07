"use client";
import { motion } from "framer-motion";

export const ZabbotMascot = () => {
  return (
    <motion.svg
      viewBox="0 0 709 918"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      animate={{ y: [0, -12, 0], rotate: [0, 1, -1, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* FULL ORIGINAL SVG */}
      <path d="M32.293 150.368C63.1068..." fill="white" />
      <path d="M88.239 818.492C88.8381..." fill="#162B6E" />
      <path d="M308.613 75.3412C327.825..." fill="#162B6E" />
    </motion.svg>
  );
};