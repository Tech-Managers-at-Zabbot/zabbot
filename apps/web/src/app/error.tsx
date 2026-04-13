"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, RefreshCw, MessageCircle, Flame, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;

  useEffect(() => {
    console.error("Zabbot Error:", error);
  }, [error]);

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
        <div className="text-5xl mb-3">
          {isSignedIn ? "⚠️" : "🌿"}
        </div>

        {/* TITLE (DYNAMIC) */}
        <h1 className="text-xl font-black text-[#162B6E] mb-2">
          {isSignedIn
            ? "Oops… your learning flow was interrupted"
            : "Welcome to Zabbot — something didn’t load"}
        </h1>

        {/* MESSAGE (DYNAMIC) */}
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {isSignedIn ? (
            <>
              Don’t worry — your progress is safe.  
              Zabbot is keeping your learning journey intact while this is fixed.
            </>
          ) : (
            <>
              Even great journeys begin with unexpected turns.  
              Let’s get you back into your learning experience.
            </>
          )}
        </p>

        {/* STATUS PILLS */}
        <div className="flex items-center justify-center gap-2 mb-6">

          {isSignedIn ? (
            <>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-bold border border-orange-100">
                <Flame size={12} />
                Streak Safe
              </div>

              <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100">
                XP Protected
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-[10px] font-bold border border-purple-100">
              <Sparkles size={12} />
              Start Your Journey
            </div>
          )}

        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3">

          {/* PRIMARY ACTION */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => reset()}
            className="
              flex items-center justify-center gap-2
              w-full py-3
              rounded-xl
              bg-[#24A5EE]
              text-white font-bold text-sm
              shadow-lg
            "
          >
            <RefreshCw size={16} />
            Try Again
          </motion.button>

          {/* SECONDARY CTA (DYNAMIC) */}
          {isSignedIn ? (
            <Link href="/dashboard">
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
                <Home size={16} />
                Back to Dashboard
              </motion.div>
            </Link>
          ) : (
            <Link href="/">
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
                <Home size={16} />
                Explore Zabbot
              </motion.div>
            </Link>
          )}

          {/* AI RE-ENTRY (ALWAYS PRESENT) */}
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
              Continue with Ọ̀rẹ́ AI
            </motion.div>
          </Link>

        </div>

        {/* FOOTER */}
        <p className="text-[10px] text-slate-400 mt-6">
          Zabbot Learning System • Every interruption is part of learning
        </p>

      </motion.div>
    </div>
  );
}