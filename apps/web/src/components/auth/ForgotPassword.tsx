"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "./AuthProvider";

export default function ForgotPassword() {
  const { setView } = useAuth();
  const [email, setEmail] = useState("");

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    alert("Reset link sent (mock)");
    setView("login");
  }

  return (
    <div className="relative">

      {/* 🧊 FORM CONTAINER */}
      <div className="relative bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 overflow-hidden">

        {/* 🦜 MASCOT (CONSISTENT WITH LOGIN) */}
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

        {/* HEADER */}
        <h2 className="text-xl font-semibold text-center mb-4">
          Reset Password
        </h2>

        {/* FORM */}
        <form onSubmit={handleReset} className="space-y-3">

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className="w-full p-3 rounded-xl bg-white/70 border outline-none focus:ring-2 focus:ring-[#24A5EE]"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-black text-white font-medium"
          >
            Send Reset Link
          </button>
        </form>

        {/* BACK TO LOGIN */}
        <p className="text-xs text-center mt-3">
          Back to{" "}
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