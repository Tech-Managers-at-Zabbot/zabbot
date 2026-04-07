// 1. BEST PRACTICE: Force dynamic rendering for Auth components
export const dynamic = "force-dynamic";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center zabbot-mesh-gradient p-4 relative overflow-hidden">
      
      {/* 1. ANIMATED DECOR */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#24A5EE]/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#162B6E]/40 blur-[120px] rounded-full" />

      {/* 2. BRANDING SECTION */}
      <div className="mb-8 flex flex-col items-center gap-4 z-10">
        <div className="p-4 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-2xl transition-transform hover:scale-105 duration-500">
          <Image 
            src="/assets/logo/zabbot-icon2.svg" 
            alt="Zabbot" 
            width={60} 
            height={60} 
            priority // BEST PRACTICE: Load the logo immediately
            className="drop-shadow-[0_0_15px_rgba(36,165,238,0.5)]"
          />
        </div>
        <h1 className="text-4xl font-black text-[#162B6E] tracking-tighter italic">
          ZABBOT<span className="text-[#24A5EE]">.</span>
        </h1>
      </div>

      {/* 3. CLERK SIGN IN */}
      <div className="relative z-10 w-full max-w-[400px]">
        <SignIn 
          path="/sign-in" 
          routing="path"
          signUpUrl="/sign-up"
          // BEST PRACTICE: Redirect back to dashboard explicitly
          forceRedirectUrl="/dashboard" 
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "bg-white/70 backdrop-blur-3xl backdrop-saturate-150 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40 rounded-[2.5rem] p-2 w-full",
              headerTitle: "text-[#162B6E] font-black text-2xl tracking-tight",
              headerSubtitle: "text-[#162B6E]/60 font-bold",
              socialButtonsBlockButton: "bg-white/50 border border-white/20 hover:bg-white/80 transition-all rounded-2xl",
              socialButtonsBlockButtonText: "font-bold text-[#162B6E]",
              formButtonPrimary: "bg-[#162B6E] hover:bg-[#24A5EE] text-sm font-black uppercase tracking-widest py-3 rounded-2xl transition-all shadow-lg active:scale-95",
              formFieldInput: "bg-white/50 border-white/20 rounded-xl focus:ring-[#24A5EE]/50",
              footerActionLink: "text-[#24A5EE] font-black hover:text-[#162B6E]",
              identityPreviewText: "text-[#162B6E] font-bold",
              identityPreviewEditButtonIcon: "text-[#24A5EE]",
              // Add this to match your Lexend font setup
              formFieldLabel: "text-[#162B6E] font-bold uppercase text-[10px] tracking-widest"
            }
          }}
        />
      </div>

      {/* 4. FOOTER */}
      <p className="mt-8 text-[10px] font-black text-[#162B6E]/40 uppercase tracking-[0.3em] relative z-10 text-center">
        Mastery Requires Focus • Premium Language Learning
      </p>
    </div>
  );
}