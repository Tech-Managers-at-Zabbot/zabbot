"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "./AuthProvider";
import { X } from "lucide-react";

export default function SignupForm() {
  const { setView } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) return;

    setLoading(true);

    await new Promise((res) => setTimeout(res, 800));

    setLoading(false);
    setView("login");
  }

  return (
    <div className="relative">

      {/* 🧊 FORM CONTAINER */}
      <div className="relative bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 overflow-hidden">

        {/* 🦜 MASCOT (CONSISTENT ACROSS AUTH FLOW) */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-white/80 shadow-md border border-white/60 flex items-center justify-center overflow-hidden">
            <Image
              src="/mascot1.svg"
              alt="Zabbot Mascot"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setView(null)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/60 hover:bg-white/80 transition"
        >
          <X size={16} />
        </button>

        {/* HEADER */}
        <h2 className="text-xl font-semibold text-center mb-4">
          Create account
        </h2>

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-3">

          <input
            type="email"
            disabled={loading}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className="w-full p-3 rounded-xl bg-white/70 border outline-none focus:ring-2 focus:ring-[#24A5EE]"
          />

          <input
            type="password"
            disabled={loading}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/70 border outline-none focus:ring-2 focus:ring-[#24A5EE]"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-center mt-3">
          Already have an account?{" "}
          <button
            onClick={() => setView("login")}
            className="underline"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
}