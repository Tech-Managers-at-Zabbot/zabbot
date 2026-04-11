"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function OnboardingPage() {
  const router = useRouter();

  async function completeOnboarding() {
    await fetch("/api/user/complete-onboarding", {
      method: "POST",
    });

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md bg-white p-8 rounded-2xl shadow">

        <h1 className="text-2xl font-bold text-[#162B6E]">
          Welcome to Zabbot 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Let’s personalize your learning journey.
        </p>

        <button
          onClick={completeOnboarding}
          className="mt-6 w-full bg-[#24A5EE] text-white p-4 rounded-xl"
        >
          Start Learning
        </button>
      </div>
    </div>
  );
}