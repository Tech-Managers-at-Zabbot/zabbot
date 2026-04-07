"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight, Linkedin, Youtube, ShieldCheck, LucideProps } from "lucide-react";
import Image from "next/image";

// 1. DEFINE PROP TYPES
interface SocialLinkProps {
  icon: React.ComponentType<LucideProps>;
  href: string;
  label: string;
}

export default function FooterCTA() {
  return (
    <footer className="relative pt-24 pb-10 overflow-hidden bg-[#EFF6FF]">
      
      {/* Soft Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-70 pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-5 relative z-10">

        {/* MAIN CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <GlassCard className="py-14 px-6 md:px-16 text-center border-white/60 shadow-xl relative overflow-hidden bg-white/50 backdrop-blur-xl rounded-[32px]">

            {/* Glow accents */}
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#24A5EE]/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-[#162B6E]/10 blur-[100px] rounded-full" />

            <div className="relative z-10 flex flex-col items-center gap-8">

              {/* LOGO */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 relative"
              >
                <Image
                  src="/zabbot-logo_blue.svg"
                  alt="Zabbot Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* HEADLINE */}
              <h2 className="text-3xl md:text-6xl font-black text-[#162B6E] leading-[1.1] tracking-tight italic">
                Speak Yorùbá. <br />
                <span className="text-[#24A5EE] not-italic">Own your roots.</span>
              </h2>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group px-10 py-5 bg-[#24A5EE] text-white rounded-[22px] font-black text-lg shadow-2xl shadow-blue-400/30 hover:bg-[#162B6E] transition-all duration-400 flex items-center gap-3 tracking-tight"
              >
                Start Free Trial
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
              </motion.button>

              {/* TRUST */}
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck size={16} className="text-[#16A34A]" />
                <span>Secure via Stripe & Paypal</span>
              </div>

            </div>
          </GlassCard>
        </motion.div>

        {/* FOOTER */}
        <div className="mt-16 flex flex-col items-center gap-10">

          {/* Socials */}
          <div className="flex gap-5">
            <SocialLink 
              icon={Youtube} 
              href="https://www.youtube.com/@zabbotlearning" 
              label="YouTube"
            />
            <SocialLink 
              icon={Linkedin} 
              href="https://www.linkedin.com/company/zabbot/" 
              label="LinkedIn"
            />
          </div>

          {/* Payments */}
          <div className="flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <Image src="/payment/stripe.svg" alt="Stripe" width={50} height={25} />
            <Image src="/payment/paypal.svg" alt="Paypal" width={100} height={25} />
          </div>

          {/* Legal */}
          <p className="text-slate-400 text-[9px] uppercase tracking-[0.4em] font-black text-center opacity-60">
            © 2026 Zabbot • Designed for the global diaspora
          </p>
        </div>

      </div>
    </footer>
  );
}

// 2. TYPED COMPONENT
function SocialLink({ icon: Icon, href, label }: SocialLinkProps) {
  return (
    <motion.a
      whileHover={{ scale: 1.15, y: -5 }}
      whileTap={{ scale: 0.9 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-14 h-14 rounded-[18px] bg-white border border-white flex items-center justify-center text-[#162B6E] hover:text-[#24A5EE] transition-all duration-300 shadow-xl shadow-slate-200/50"
    >
      <Icon size={22} strokeWidth={2.5} />
    </motion.a>
  );
}