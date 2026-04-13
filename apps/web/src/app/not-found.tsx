"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, MessageCircle, Compass, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white via-blue-50 to-white">

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          w-full max-w-md
          rounded-3xl
          bg-white/60
          backdrop-blur-2xl
          border border-white/50
          shadow-2xl
          p-8
          text-center
        "
      >

        {/* ICON */}
        <div className="text-5xl mb-3">🧭</div>

        {/* TITLE */}
        <h1 className="text-xl font-black text-[#162B6E] mb-2">
          You’ve stepped off the learning path
        </h1>

        {/* SUBTEXT */}
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Zabbot couldn’t find this route — but your learning journey is still active.  
          Let’s guide you back into flow.
        </p>

        {/* DISCOVERY BADGE */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-[10px] font-bold border border-purple-100">
            <Compass size={12} />
            Navigation Reset
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3">

          {/* HOME / DASHBOARD */}
          <Link href="/">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="
                flex items-center justify-center gap-2
                w-full py-3
                rounded-xl
                bg-[#24A5EE]
                text-white font-bold text-sm
                shadow-lg
              "
            >
              <Home size={16} />
              Return to Home
            </motion.div>
          </Link>

          {/* SPARKS ENTRY */}
          <Link href="/sparks">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="
                flex items-center justify-center gap-2
                w-full py-3
                rounded-xl
                bg-white
                border border-slate-200
                text-[#162B6E] font-bold text-sm
                hover:bg-slate-50
              "
            >
              <Sparkles size={16} />
              Jump into Sparks
            </motion.div>
          </Link>

          {/* AI TUTOR */}
          <Link href="/ai/ore">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="
                flex items-center justify-center gap-2
                w-full py-3
                rounded-xl
                bg-white/70
                border border-white/60
                text-[#162B6E] font-bold text-sm
              "
            >
              <MessageCircle size={16} />
              Ask Ọ̀rẹ́ AI for Help
            </motion.div>
          </Link>

        </div>

        {/* FOOTER */}
        <p className="text-[10px] text-slate-400 mt-6">
          Zabbot Learning System • Every path leads back to mastery
        </p>

      </motion.div>
    </div>
  );
}