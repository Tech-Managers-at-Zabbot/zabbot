// /components/auth/ForgotPassword.tsx
"use client";

import { useState } from "react";
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
    <div>
      <h2 className="text-xl font-semibold text-center mb-4">
        Reset Password
      </h2>

      <form onSubmit={handleReset} className="space-y-3">

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          className="w-full p-3 rounded-xl bg-white/70 border"
        />

        <button className="w-full py-3 rounded-xl bg-black text-white">
          Send Reset Link
        </button>
      </form>

      <p className="text-xs text-center mt-3">
        Back to{" "}
        <button onClick={() => setView("login")} className="underline">
          Login
        </button>
      </p>
    </div>
  );
}