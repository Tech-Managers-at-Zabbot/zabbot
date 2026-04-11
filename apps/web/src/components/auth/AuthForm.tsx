"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/auth/callback",
    });

    if (res?.error) {
      setError("Incorrect login details");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-[#162B6E]">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Access your Zabbot learning journey
        </p>
      </div>

      {/* GOOGLE */}
      <button
  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
  className="w-full border border-gray-200 rounded-2xl py-3 flex items-center justify-center gap-3 hover:shadow-sm transition"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="w-5 h-5"
  />

  <span className="text-sm font-medium">
    Continue with Google
  </span>
</button>

      {/* DIVIDER */}
      <div className="flex items-center gap-3">
        <div className="h-px bg-gray-200 flex-1" />
        <span className="text-xs text-gray-400">OR</span>
        <div className="h-px bg-gray-200 flex-1" />
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          placeholder="Email address"
          className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#24A5EE]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#24A5EE]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          disabled={loading}
          className="w-full p-4 rounded-2xl bg-[#24A5EE] text-white font-medium hover:scale-[1.01] transition disabled:opacity-60"
        >
          {loading
            ? "Loading..."
            : mode === "signin"
            ? "Sign In"
            : "Create Account"}
        </button>
      </form>

      {/* TOGGLE */}
      <p className="text-sm text-center text-gray-500">
        {mode === "signin" ? (
          <>
            Don’t have an account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="text-[#24A5EE] font-medium"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setMode("signin")}
              className="text-[#24A5EE] font-medium"
            >
              Sign in
            </button>
          </>
        )}
      </p>

    </div>
  );
}