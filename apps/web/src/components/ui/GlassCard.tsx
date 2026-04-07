"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Updated GlassCard with 3D Specular Highlights and Enhanced Refraction.
 * Designed for the "Calm Learning" aesthetic with luxury-grade borders.
 */
export const GlassCard = ({ children, className, delay = 0 }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`
        relative overflow-hidden
        /* Enhanced Blur & Transparency for fluid background support */
        bg-white/40 backdrop-blur-xl 
        border border-white/40 
        
        /* Deep Luxury Shadow */
        shadow-[0_12px_40px_rgba(31,38,135,0.1)]
        
        /* Modern Mobile-First Radius */
        rounded-[32px] p-6
        
        /* Specular "Shiny Edge" Effect */
        before:absolute before:inset-0 before:rounded-[32px]
        before:border-t-2 before:border-l-2 before:border-white/60
        before:pointer-events-none
        
        ${className}
      `}
    >
      {/* Inner Glossy Highlight: Adds 3D volume to the top half of the card */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
      
      {/* Subtle Inner Glow Layer */}
      <div className="absolute -inset-px bg-gradient-to-br from-white/10 to-transparent rounded-[32px] pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};