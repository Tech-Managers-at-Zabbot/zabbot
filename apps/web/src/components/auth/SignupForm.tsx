"use client";

import { useState } from "react";
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

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setView(null)}
        className="absolute top-2 right-2 p-2 rounded-full bg-white/60 hover:bg-white/80 transition"
      >
        <X size={16} />
      </button>

      <h2 className="text-xl font-semibold text-center mb-4">
        Create account
      </h2>

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

      <p className="text-xs text-center mt-3">
        Already have an account?{" "}
        <button onClick={() => setView("login")} className="underline">
          Login
        </button>
      </p>
    </div>
  );
}