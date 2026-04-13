"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    setRegistered(searchParams.get("registered") === "true");
  }, [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  }

  async function handleGoogleSignIn() {
    setLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 🌌 BACKDROP OVERLAY */}
      <div className="fixed inset-0 z-40">

        {/* blur layer */}
        <div className="absolute inset-0 backdrop-blur-xl bg-white/30" />

        {/* dim layer */}
        <div className="absolute inset-0 bg-black/10" />

        {/* 🦜 MASCOT */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
          <Image
            src="/mascot1.svg"
            alt="Zabbot Mascot"
            width={180}
            height={180}
            className="drop-shadow-2xl animate-float"
            priority
          />
        </div>

        {/* 🧊 LOGIN MODAL */}
        <div className="relative z-50 min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-md">

            <GlassCard className="p-6 md:p-8 rounded-2xl border-white/60 shadow-xl">

              {/* HEADER */}
              <div className="text-center space-y-1 mb-5">

                <h1 className="text-xl md:text-2xl font-semibold text-[#162B6E]">
                  Welcome back to Zabbot
                </h1>

                <p className="text-sm text-slate-500">
                  Keep Living Yorùbá. Learn. Speak. Belong.
                </p>

                {registered && (
                  <p className="text-green-600 text-xs font-medium pt-1">
                    Account created successfully. Please log in.
                  </p>
                )}
              </div>

              {/* ERROR */}
              {error && (
                <p className="text-red-500 text-sm mb-3">
                  {error}
                </p>
              )}

              {/* FORM */}
              <form onSubmit={handleLogin} className="space-y-3">

                <input
                  type="email"
                  disabled={loading}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  className="w-full p-3 rounded-xl border border-white/60 bg-white/70 outline-none focus:ring-2 focus:ring-[#24A5EE]"
                />

                <input
                  type="password"
                  disabled={loading}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/60 bg-white/70 outline-none focus:ring-2 focus:ring-[#24A5EE]"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#24A5EE] text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              {/* DIVIDER */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/50" />
                <span className="text-xs text-slate-500">OR</span>
                <div className="h-px flex-1 bg-white/50" />
              </div>

              {/* GOOGLE */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 rounded-xl border border-white/60 bg-white/70 hover:bg-white transition flex items-center justify-center gap-3 text-sm font-medium"
              >
                Continue with Google
              </button>

            </GlassCard>
          </div>
        </div>
      </div>

      {/* FLOAT ANIMATION */}
      <style jsx>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
}