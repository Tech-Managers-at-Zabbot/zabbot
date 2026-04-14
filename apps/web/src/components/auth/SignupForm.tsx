"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "./AuthProvider";
import { X, Eye, EyeOff } from "lucide-react";

export default function SignupForm() {
  const { setView } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // UX STATE (NEW)
  // =========================
  const [successState, setSuccessState] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    // =========================
    // BASIC VALIDATION
    // =========================
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // =========================
      // SIGNUP REQUEST
      // =========================
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name: email.split("@")[0],
        }),
      });

      const data = await res.json();

      // =========================
      // ERROR HANDLING
      // =========================
      if (!res.ok) {
        setError(data?.error || "Signup failed");
        setLoading(false);
        return;
      }

      // =========================
      // 🚀 STOP LOGIN FLOW (NEW UX)
      // =========================
      setUserEmail(email);
      setSuccessState(true);
      setLoading(false);
      return;

    } catch (err) {
      console.error("SIGNUP_ERROR:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  // =========================
  // SUCCESS SCREEN (NEW UX STATE)
  // =========================
  if (successState) {
    return (
      <div className="relative bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 text-center overflow-hidden">

        {/* CLOSE */}
        <button
          onClick={() => setView(null)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/60 hover:bg-white/80 transition"
        >
          <X size={16} />
        </button>

        {/* MASCOT */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-white/80 shadow-md border border-white/60 flex items-center justify-center overflow-hidden">
            <Image
              src="/mascot1.svg"
              alt="Zabbot Mascot"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">
          Check your email 📩
        </h2>

        <p className="text-sm text-gray-600 mb-2">
          We’ve sent a verification link to:
        </p>

        <p className="font-medium text-[#24A5EE] mb-4">
          {userEmail}
        </p>

        <p className="text-xs text-gray-500 mb-6">
          If you don’t see it, check spam or promotions folder.
        </p>

        <button
          onClick={() => setView("login")}
          className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // =========================
  // NORMAL SIGNUP FORM
  // =========================
  return (
    <div className="relative">

      <div className="relative bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 overflow-hidden">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setView(null)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/60 hover:bg-white/80 transition"
        >
          <X size={16} />
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-center mb-4">
          Create account
        </h2>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-2">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-3">

          {/* EMAIL */}
          <input
            type="email"
            disabled={loading}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className="w-full p-3 rounded-xl bg-white/70 border outline-none focus:ring-2 focus:ring-[#24A5EE]"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              disabled={loading}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-10 rounded-xl bg-white/70 border outline-none focus:ring-2 focus:ring-[#24A5EE]"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-xs text-center mt-3">
          Already have an account?{" "}
          <button onClick={() => setView("login")} className="underline">
            Login
          </button>
        </p>

      </div>
    </div>
  );
}