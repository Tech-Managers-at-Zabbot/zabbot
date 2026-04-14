"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "./AuthProvider";
import { X, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const { setView } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ NEW STATE
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Create user in DB
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

      // error handling
      if (!res.ok) {
        setError(data?.error || "Signup failed");
        setLoading(false);
        return;
      }

      // 2. AUTO LOGIN
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.ok) {
        setView(null);
        router.push("/dashboard");
        return;
      }

      setView("login");
    } catch (err) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  }

  return (
    <div className="relative">

      <div className="relative bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 overflow-hidden">

        {/* MASCOT */}
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

        {/* CLOSE */}
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

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-2">
            {error}
          </p>
        )}

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

          {/* PASSWORD WITH VISIBILITY TOGGLE */}
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
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* FOOTER */}
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