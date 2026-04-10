"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";

interface Props {
  originalAudio: string;
  userAudio?: string;
  isRecording: boolean;
}

export default function ParaWaveform({ originalAudio, userAudio, isRecording }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const userContainerRef = useRef<HTMLDivElement>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const userWaveSurferRef = useRef<WaveSurfer | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Constants for Theme Alignment
  const NATIVE_COLOR = "#162B6E"; // Heritage Blue
  const USER_COLOR = "#EF4444";   // Error/Voice Red

  // 1. Initialize Native Waveform (The Template)
  useEffect(() => {
    if (!containerRef.current || !originalAudio) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: NATIVE_COLOR,
      progressColor: "#3B82F6",
      cursorColor: "#162B6E",
      cursorWidth: 2,
      barWidth: 2,
      barGap: 3,
      height: 100,
      normalize: true,
      barRadius: 4,
    });

    waveSurferRef.current = ws;

    ws.load(originalAudio).then(() => {
      setIsLoaded(true);
    }).catch((err) => {
      if (err.name !== 'AbortError') console.error("Native Waveform Error:", err);
    });

    return () => {
      ws.unAll();
      ws.destroy();
      waveSurferRef.current = null;
    };
  }, [originalAudio]);

  // 2. Initialize User Waveform (The Overlay Filing)
  useEffect(() => {
    if (!userContainerRef.current || !userAudio) return;

    const ws = WaveSurfer.create({
      container: userContainerRef.current,
      waveColor: USER_COLOR,
      progressColor: "transparent",
      cursorColor: "transparent",
      barWidth: 2,
      barGap: 3,
      height: 100,
      normalize: true,
      barRadius: 4,
    });

    userWaveSurferRef.current = ws;

    ws.load(userAudio).catch((err) => {
      if (err.name !== 'AbortError') console.error("User Waveform Error:", err);
    });

    // Sync user interaction with native timeline
    if (waveSurferRef.current) {
      const handleInteraction = (newTime: number) => {
        const duration = waveSurferRef.current?.getDuration() || 1;
        ws.seekTo(newTime / duration);
      };
      waveSurferRef.current.on("interaction", handleInteraction);
    }

    return () => {
      ws.unAll();
      ws.destroy();
      userWaveSurferRef.current = null;
    };
  }, [userAudio]);

  return (
    <div className="w-full py-6 group animate-in fade-in duration-700">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
            Voice Comparison Studio
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#162B6E] opacity-30" />
            <span className="text-[9px] font-black text-slate-400 uppercase">Target</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span className="text-[9px] font-black text-[#EF4444] uppercase">You</span>
          </div>
        </div>
      </div>

      {/* Visualizer Container */}
      <div className={cn(
        "relative h-[140px] zabbot-glass-strong rounded-[32px] p-6 transition-all duration-500",
        isRecording ? "border-[#EF4444]/30 ring-4 ring-[#EF4444]/5" : "border-white/20 shadow-premium"
      )}>
        {/* Layer 1: Native Reference (The "Template") */}
        <div 
          ref={containerRef} 
          className="absolute inset-x-6 inset-y-6 z-10 opacity-20 pointer-events-none" 
        />
        
        {/* Layer 2: User Attempt (The "Filing") */}
        <div 
          ref={userContainerRef} 
          className="absolute inset-x-6 inset-y-6 z-20" 
        />

        {/* Empty State Line */}
        {!userAudio && !isRecording && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
          </div>
        )}
        
        {/* Recording Animation Layer */}
        {isRecording && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/60 backdrop-blur-md rounded-[32px]">
            <div className="flex items-end gap-1.5 h-10">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 bg-[#EF4444] rounded-full animate-wave-sm" 
                  style={{ 
                    animationDelay: `${i * 0.15}s`,
                    height: `${20 + Math.random() * 60}%` 
                  }} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Label */}
      <p className="mt-4 text-[9px] text-center text-primary/40 italic font-bold uppercase tracking-widest">
        {userAudio ? "Visualizing pitch and timing variance..." : "Awaiting user input for comparison"}
      </p>
    </div>
  );
}