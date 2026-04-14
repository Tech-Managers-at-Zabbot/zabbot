"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Play,
  Users,
  Zap,
  Lock,
  MessageCircle,
  X,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/language-context"; // ✅ ADDED

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const isSignedIn = !!session?.user;

  const userState = getUserState(isSignedIn);
  const { t } = useLanguage(); // ✅ ADDED
  const centerConfig = getCenterConfig(userState, t); // ✅ UPDATED

  return (
    <>
      <div className="md:hidden fixed bottom-8 left-0 right-0 z-[100] px-6">
        <nav className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[35px] p-2 flex items-center justify-between shadow-[0_25px_50px_-12px_rgba(22,43,110,0.15)] ring-1 ring-black/5">

          {/* DEMO */}
          <NavIcon
            icon={Play}
            label="Demo"
            active={false}
            onClick={() => setIsVideoOpen(true)}
          />

          {/* TEAM */}
          <NavIcon
            icon={Users}
            label="Team"
            active={pathname === "/team"}
            href="/team"
            locked={!isSignedIn}
            router={router}
          />

          {/* CENTER CTA */}
          <div className="relative flex flex-col items-center px-2">
            <button
              type="button"
              aria-label="Main action"
              onClick={() => {
                if (!isSignedIn) router.push("/login");
                else router.push("/dashboard");
              }}
              className="relative -mt-10 flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                animate={centerConfig.animate}
                transition={{ duration: 1.8, repeat: Infinity }}
                className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                  isSignedIn
                    ? "bg-[#24A5EE] text-white shadow-blue-400/40"
                    : "bg-white text-[#162B6E]/40 border border-slate-100 shadow-[0_0_30px_rgba(36,165,238,0.35)]"
                }`}
              >
                <Home size={26} strokeWidth={isSignedIn ? 2.5 : 2} />

                {!isSignedIn && (
                  <div className="absolute -top-1 -right-1">
                    <Lock size={10} className="text-[#162B6E]" fill="currentColor" />
                  </div>
                )}
              </motion.div>

              <p
                className={`text-center text-[7px] font-black uppercase tracking-[0.15em] mt-2 ${
                  isSignedIn
                    ? "text-[#24A5EE]"
                    : "text-[#162B6E]/40 animate-pulse"
                }`}
              >
                {centerConfig.label}
              </p>
            </button>
          </div>

          {/* CHAT */}
          <NavIcon
            icon={MessageCircle}
            label="Chat"
            active={pathname === "/chat"}
            href="/chat"
            locked={!isSignedIn}
            router={router}
          />

          {/* DAILY */}
          <NavIcon
            icon={Zap}
            label="Daily"
            active={pathname === "/daily"}
            href="/daily"
            locked={!isSignedIn}
            router={router}
          />
        </nav>
      </div>

      {/* VIDEO MODAL */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </>
  );
}

/* =========================
   NAV ICON
========================= */
function NavIcon({
  icon: Icon,
  label,
  active = false,
  href,
  locked = false,
  router,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  href?: string;
  locked?: boolean;
  router?: ReturnType<typeof useRouter>;
  onClick?: () => void;
}) {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (locked) {
      router?.push("/login");
      return;
    }

    if (href) {
      router?.push(href);
    }
  };

  return (
    <div className="flex-1">
      <button
        type="button"
        aria-label={label}
        onClick={handleClick}
        className="flex flex-col items-center justify-center w-full group gap-1 outline-none"
      >
        <motion.div
          animate={{ scale: active ? 1.15 : 1, y: active ? -2 : 0 }}
          className="relative"
        >
          <Icon
            size={22}
            className={active ? "text-[#24A5EE]" : "text-[#162B6E]/30"}
            strokeWidth={active ? 3 : 2}
          />

          {locked && (
            <div className="absolute -top-1 -right-1">
              <Lock size={10} className="text-[#162B6E]" fill="currentColor" />
            </div>
          )}
        </motion.div>

        <span
          className={`text-[7px] font-black uppercase tracking-widest ${
            active ? "text-[#24A5EE]" : "text-[#162B6E] opacity-30"
          }`}
        >
          {locked ? "Locked" : label}
        </span>
      </button>
    </div>
  );
}

/* =========================
   VIDEO MODAL
========================= */
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">

          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={onClose}
              className="absolute top-4 right-4 z-50 bg-white/20 p-2 rounded-full"
            >
              <X size={20} />
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

/* =========================
   HELPERS
========================= */
function getUserState(isSignedIn: boolean) {
  return isSignedIn ? "active" : "guest";
}

/* UPDATED: NOW TRANSLATED */
function getCenterConfig(state: string, t: (key: any) => string) {
  switch (state) {
    case "guest":
      return {
        label: t("nav.login"),
        animate: {
          boxShadow: [
            "0 0 0px rgba(36,165,238,0.2)",
            "0 0 25px rgba(36,165,238,0.45)",
            "0 0 0px rgba(36,165,238,0.2)",
          ],
        },
      };

    default:
      return {
        label: t("nav.dashboard"),
        animate: {},
      };
  }
}