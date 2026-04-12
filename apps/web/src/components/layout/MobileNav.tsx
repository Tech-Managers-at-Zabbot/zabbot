"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Play,
  Users,
  Zap,
  Lock,
  MessageCircle,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const isSignedIn = !!session?.user;

  /**
   * 🧠 FUTURE HOOK (you can later extend session.user)
   * session.user.isOnboarded
   * session.user.lastActiveAt
   */

  const userState = getUserState(isSignedIn);

  const centerConfig = getCenterConfig(userState);

  return (
    <div className="md:hidden fixed bottom-8 left-0 right-0 z-[100] px-6">
      <nav className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[35px] p-2 flex items-center justify-between shadow-[0_25px_50px_-12px_rgba(22,43,110,0.15)] ring-1 ring-black/5">

        {/* DEMO */}
        <NavIcon icon={Play} label="Demo" active={pathname === "/demo"} href="/demo" locked={false} router={router} />

        {/* TEAM */}
        <NavIcon icon={Users} label="Team" active={pathname === "/team"} href="/team" locked={!isSignedIn} router={router} />

        {/* CENTER (PERSONALITY-DRIVEN CTA) */}
        <div className="relative flex flex-col items-center px-2">
          <button
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
              className={`text-center text-[7px] font-black uppercase tracking-[0.15em] mt-2 transition-all duration-300 ${
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
        <NavIcon icon={MessageCircle} label="Chat" active={pathname === "/chat"} href="/chat" locked={!isSignedIn} router={router} />

        {/* DAILY */}
        <NavIcon icon={Zap} label="Daily" active={pathname === "/daily"} href="/daily" locked={!isSignedIn} router={router} />

      </nav>
    </div>
  );
}

/* =========================
   USER STATE ENGINE
========================= */
function getUserState(isSignedIn: boolean) {
  if (!isSignedIn) return "guest";

  // future expansion:
  // if (!user.isOnboarded) return "new";
  // if (user.lastActive < 7 days) return "returning";

  return "active";
}

/* =========================
   CENTER CONFIG (PERSONALITY)
========================= */
function getCenterConfig(state: string) {
  switch (state) {
    case "guest":
      return {
        label: "Start Journey",
        animate: {
          boxShadow: [
            "0 0 0px rgba(36,165,238,0.2)",
            "0 0 25px rgba(36,165,238,0.45)",
            "0 0 0px rgba(36,165,238,0.2)",
          ],
        },
      };

    case "new":
      return {
        label: "Continue Learning",
        animate: {
          boxShadow: [
            "0 0 0px rgba(36,165,238,0.15)",
            "0 0 18px rgba(36,165,238,0.3)",
            "0 0 0px rgba(36,165,238,0.15)",
          ],
        },
      };

    case "active":
    default:
      return {
        label: "Dashboard",
        animate: {},
      };
  }
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
}: {
  icon: any;
  label: string;
  active?: boolean;
  href: string;
  locked?: boolean;
  router: any;
}) {
  const handleClick = () => {
    if (locked) {
      router.push("/login");
      return;
    }
    router.push(href);
  };

  return (
    <div className="flex-1">
      <button
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
          className={`text-[7px] font-black uppercase tracking-widest transition-all duration-300 ${
            active ? "text-[#24A5EE]" : "text-[#162B6E] opacity-30"
          }`}
        >
          {locked ? "Locked" : label}
        </span>
      </button>
    </div>
  );
}