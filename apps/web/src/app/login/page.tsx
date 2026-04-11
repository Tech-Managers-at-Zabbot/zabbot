"use client";

import Image from "next/image";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-[#162B6E] text-white relative items-center justify-center p-12">

        <div className="max-w-md space-y-6 z-10">

          {/* FIX: explicit white text */}
          <h1 className="text-4xl font-bold leading-tight text-white">
            Welcome! <br />
            Keep Living Yorùbá
          </h1>

          <p className="text-white/80 text-lg">
            Login to Learn. Speak. Belong.
          </p>

          {/* IMAGE */}
          <Image
            src="/mascot1.svg"
            alt="Zabbot Mascot"
            width={420}
            height={420}
            className="rounded-2xl drop-shadow-2xl"
            priority
          />
        </div>

        {/* subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#24A5EE]/10 to-transparent" />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md bg-white/70 border border-white/60 shadow-lg rounded-2xl p-8">
          <AuthForm />
        </div>
      </div>

    </div>
  );
}