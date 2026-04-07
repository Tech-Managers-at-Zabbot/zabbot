import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center zabbot-mesh-gradient p-4 relative overflow-hidden">
      
      {/* 1. ANIMATED DECOR */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#24A5EE]/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#162B6E]/40 blur-[120px] rounded-full" />

      {/* 2. BRANDING */}
      <div className="mb-8 flex flex-col items-center gap-4 z-10 text-center">
        <div className="p-4 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-2xl">
          <Image 
            src="/assets/logo/zabbot-icon2.svg" 
            alt="Zabbot" 
            width={50} 
            height={50} 
            className="drop-shadow-[0_0_15px_rgba(36,165,238,0.5)]"
          />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#162B6E] tracking-tighter italic">
            START YOUR JOURNEY<span className="text-[#24A5EE]">.</span>
          </h1>
          <p className="text-[#162B6E]/60 font-bold text-xs uppercase tracking-widest mt-1">
            Join the Zabbot Mastery Path
          </p>
        </div>
      </div>

      {/* 3. CLERK SIGN UP (Explicit Path Routing) */}
      <div className="relative z-10">
        <SignUp 
          path="/sign-up" 
          routing="path"
          signInUrl="/sign-in"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white/70 backdrop-blur-3xl backdrop-saturate-150 shadow-2xl border border-white/40 rounded-[2.5rem] p-2",
              headerTitle: "text-[#162B6E] font-black text-2xl tracking-tight",
              headerSubtitle: "text-[#162B6E]/60 font-bold",
              formButtonPrimary: "bg-[#162B6E] hover:bg-[#24A5EE] text-sm font-black uppercase tracking-widest py-3 rounded-2xl transition-all shadow-lg active:scale-95",
              formFieldInput: "bg-white/50 border-white/20 rounded-xl focus:ring-[#24A5EE]/50",
              footerActionLink: "text-[#24A5EE] font-black hover:text-[#162B6E]",
              socialButtonsBlockButton: "bg-white/50 border border-white/20 hover:bg-white/80 transition-all rounded-2xl",
            }
          }}
        />
      </div>
    </div>
  );
}