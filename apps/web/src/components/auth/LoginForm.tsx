"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { X } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const { setView } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      setView(null);
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  }

  async function handleGoogleLogin() {
    if (googleLoading) return;

    setGoogleLoading(true);

    await signIn("google", {
      callbackUrl: "/dashboard",
    });
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
        Welcome back
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-2 text-center">
          {error}
        </p>
      )}

      {/* EMAIL LOGIN */}
      <form onSubmit={handleLogin} className="space-y-3">

        <input
          type="email"
          disabled={loading || googleLoading}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          className="w-full p-3 rounded-xl bg-white/70 border outline-none focus:ring-2 focus:ring-[#24A5EE]"
        />

        <input
          type="password"
          disabled={loading || googleLoading}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/70 border outline-none focus:ring-2 focus:ring-[#24A5EE]"
        />

        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* DIVIDER */}
      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/50" />
        <span className="text-xs text-slate-500">OR</span>
        <div className="h-px flex-1 bg-white/50" />
      </div>

      {/* GOOGLE LOGIN */}
      <button
        onClick={handleGoogleLogin}
        disabled={loading || googleLoading}
        className="
          w-full py-3 rounded-xl
          border border-white/60
          bg-white/80
          flex items-center justify-center gap-2
          text-sm font-medium
          hover:bg-white
          transition-all
          disabled:opacity-50
        "
      >
        <FcGoogle size={18} />
        {googleLoading ? "Redirecting..." : "Continue with Google"}
      </button>

      {/* SIGNUP LINK */}
      <p className="text-xs text-center mt-4">
        Don’t have an account?{" "}
        <button
          onClick={() => setView("signup")}
          className="underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}