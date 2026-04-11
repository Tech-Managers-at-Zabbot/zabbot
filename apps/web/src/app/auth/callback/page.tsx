"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AuthCallback() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      router.push("/login");
      return;
    }

    const isOnboarded = (session.user as any).isOnboarded;

    if (!isOnboarded) {
      router.push("/onboarding");
    } else {
      router.push("/dashboard");
    }
  }, [session, status]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading your experience...</p>
    </div>
  );
}