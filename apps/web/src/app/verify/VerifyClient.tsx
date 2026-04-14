"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function VerifyClient() {
  const params = useSearchParams();
  const router = useRouter();

  const status = params.get("status");

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        router.push("/login?verified=true");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [status, router]);

  const renderContent = () => {
    switch (status) {
      case "success":
        return {
          icon: <CheckCircle2 size={54} className="text-green-500" />,
          title: "Email verified successfully 🎉",
          subtitle:
            "Káàbọ̀! Your Zabbot account is now active. You’re ready to begin your cultural learning journey.",
          color: "border-green-200",
          bg: "from-green-50 to-white",
        };

      case "expired":
        return {
          icon: <AlertTriangle size={54} className="text-yellow-500" />,
          title: "Verification link expired ⏳",
          subtitle:
            "This link has expired. Don’t worry — we can send you a new verification email.",
          color: "border-yellow-200",
          bg: "from-yellow-50 to-white",
        };

      case "invalid":
      default:
        return {
          icon: <XCircle size={54} className="text-red-500" />,
          title: "Invalid verification link ❌",
          subtitle:
            "This link is not valid or has already been used.",
          color: "border-red-200",
          bg: "from-red-50 to-white",
        };
    }
  };

  const data = renderContent();

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${data.bg} p-6`}>
      <div
        className={`w-full max-w-md backdrop-blur-xl bg-white/60 border ${data.color} shadow-xl rounded-2xl p-8 text-center relative overflow-hidden`}
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 blur-3xl opacity-30 rounded-full" />

        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-white shadow-md border flex items-center justify-center">
            <Image
              src="/mascot1.svg"
              alt="Zabbot Mascot"
              width={40}
              height={40}
            />
          </div>
        </div>

        <div className="flex justify-center mb-4">{data.icon}</div>

        <h1 className="text-xl font-semibold text-slate-800 mb-2">
          {data.title}
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {data.subtitle}
        </p>

        {status === "success" ? (
          <button
            onClick={() => router.push("/login")}
            className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Continue to Login
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Go to Login
          </button>
        )}

        {(status === "expired" || status === "invalid") && (
          <button
            onClick={() => router.push("/resend-verification")}
            className="mt-3 text-sm text-blue-600 underline"
          >
            Resend verification email
          </button>
        )}

        <div className="mt-6 pt-4 border-t border-white/40">
          <p className="text-xs text-slate-500">
            Learn. Speak. Own your heritage.
          </p>
        </div>
      </div>
    </div>
  );
}