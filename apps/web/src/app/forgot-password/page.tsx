"use client";

import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    alert("Reset link sent to email");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        <h1 className="text-xl font-bold">Reset Password</h1>

        <input
          className="w-full mt-4 p-3 border rounded-lg"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-[#24A5EE] text-white p-3 rounded-lg"
        >
          Send Reset Link
        </button>

      </div>
    </div>
  );
}