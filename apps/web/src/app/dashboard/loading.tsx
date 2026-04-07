"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function LoadingDashboard() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#F8FAFC] flex flex-col items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* The Outer Glow - Reduced blur for better performance on mobile */}
        <div className="absolute inset-0 bg-[#24A5EE]/15 blur-[40px] rounded-full animate-pulse scale-150" />
        
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg 
            viewBox="0 0 1380.16 1380.16" 
            className="w-full h-full drop-shadow-[0_20px_50px_rgba(36,165,238,0.3)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Blue Top Accent Bar */}
            <polygon 
              className="zabbot-accent-path" 
              fill="#24A5EE"
              points="313.31,364.06 869.19,364.06 727.55,495.14 313.31,495.14" 
            />
            
            {/* Main Z-Icon - Removed fill attribute to allow CSS animation */}
            <path 
              className="zabbot-logo-path" 
              d="M359.15 801.02l568.49 -526.25 -614.33 0 0 -131.07 753.54 0 0 2.25 0 128.83 0 45.83 -603.35 552.06 210.82 230.41 392.53 -359.16 0 152.04 -320.02 296.03c-53.07,51.33 -86.14,64.73 -140.9,5.22 -86.42,-93.91 -172.04,-185.3 -260.08,-280.44 -41.11,-44.41 -30,-75.69 13.3,-115.75z"
            />
            
            {/* Gold Lower Accent Bar */}
            <polygon 
              className="zabbot-accent-path" 
              fill="#E3A23A"
              points="599.26,872.02 1066.85,444.18 1066.85,621.84 687.74,968.72" 
            />
          </svg>
        </div>

        {/* Brand Text & Loading Bar */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#162B6E] animate-pulse">
            Zabbot
          </span>
          <div className="w-32 h-[2px] bg-slate-200/50 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-[#24A5EE] animate-shimmer rounded-full" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .zabbot-logo-path {
          stroke: #162B6E; /* Use your primary heritage blue for the stroke */
          stroke-width: 12;
          stroke-dasharray: 4000;
          stroke-dashoffset: 4000;
          fill: #162B6E;
          fill-opacity: 0;
          will-change: stroke-dashoffset, fill-opacity;
          animation: drawZ 2.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        .zabbot-accent-path {
          opacity: 0;
          will-change: opacity, transform;
          animation: fadeInOut 2s ease-in-out infinite;
        }

        @keyframes drawZ {
          0% { stroke-dashoffset: 4000; fill-opacity: 0; }
          40% { stroke-dashoffset: 0; fill-opacity: 0; }
          60%, 100% { stroke-dashoffset: 0; fill-opacity: 1; }
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateY(5px); }
          50% { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}