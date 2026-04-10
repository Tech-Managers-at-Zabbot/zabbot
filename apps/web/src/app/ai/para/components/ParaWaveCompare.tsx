"use client";

import { useMemo, useEffect } from "react";
import ParaPlayer from "./ParaPlayer";
import ParaRecorder from "./ParaRecorder";
import ParaWaveform from "./ParaWaveform";
import ParaResult from "./ParaResult";
import VoiceSelector from "./VoiceSelector";
import WordCard from "./WordCard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { RotateCcw, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ParaWaveCompare({
  english,
  yoruba,
  tones,
  referenceAudioUrl,
  selectedVoice,
  onVoiceChange,
  isRecording,
  onStartRecording,
  onStopRecording,
  onRecordingComplete,
  userAudio,
  hasRecorded,
  result,
  onNext,
}: any) {
  
  const userAudioUrl = useMemo(
    () => (userAudio ? URL.createObjectURL(userAudio) : undefined),
    [userAudio]
  );

  useEffect(() => {
    return () => { if (userAudioUrl) URL.revokeObjectURL(userAudioUrl); };
  }, [userAudioUrl]);

  return (
    <div className="relative w-full flex flex-col items-center gap-6">
      
      {/* 1. MAIN CONTENT STAGE */}
      <div className={cn(
        "w-full max-w-5xl mx-auto p-6 md:p-10 transition-all duration-700",
        "bg-white/40 backdrop-blur-2xl rounded-[40px] border border-white/60 shadow-premium",
        isRecording && "scale-[0.99] ring-2 ring-red-500/5"
      )}>
        
       {/* Header Section: Identity & Control */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 mb-8">
  
  {/* Voice Selection with clear Labeling */}
  <div className="flex flex-col gap-2">
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
      Select Voice Guide
    </span>
    <div className="p-1 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm inline-flex">
      <VoiceSelector
        selectedVoice={selectedVoice}
        onChange={onVoiceChange}
      />
    </div>
  </div>

  {/* Status Indicator */}
  <div className="flex items-center gap-3 bg-white/60 px-4 py-2 rounded-full border border-white shadow-sm self-end md:self-auto">
     <div className={cn(
       "w-2 h-2 rounded-full", 
       isRecording ? "bg-red-500 animate-pulse" : "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
     )} />
     <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">
        {isRecording ? "Recording Live" : "Studio Ready"}
     </span>
  </div>
</div>

        {/* The Task */}
        <WordCard english={english} yoruba={yoruba} tones={tones} />

        {/* 2. CONSOLIDATED CONTROL CENTER (Play + Record) */}
        <div className="mt-10 flex flex-col items-center gap-8">
          
          <div className="flex items-center justify-center gap-10">
            {/* The Reference Audio Player */}
            <div className="flex flex-col items-center gap-2">
               <ParaPlayer audioUrl={referenceAudioUrl} />
               <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Listen</span>
            </div>

            {/* The Main Recorder */}
            <div className="flex flex-col items-center gap-2">
               <ParaRecorder
                 isRecording={isRecording}
                 onRecordingComplete={onRecordingComplete}
                 onStart={onStartRecording}
                 onStop={onStopRecording}
               />
               <span className={cn(
                 "text-[8px] font-bold uppercase tracking-widest transition-colors",
                 isRecording ? "text-red-500" : "text-slate-400"
               )}>
                 {isRecording ? "Stop" : "Record"}
               </span>
            </div>
          </div>

          {/* Waveform Visualization */}
          <div className="w-full bg-black/5 rounded-[32px] p-4 border border-white/20">
            <ParaWaveform
              originalAudio={referenceAudioUrl}
              userAudio={userAudioUrl}
              isRecording={isRecording}
            />
          </div>
        </div>

        {/* 3. DIAGNOSTICS & NEXT STEPS */}
        <AnimatePresence>
          {hasRecorded && result && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-8 pt-8 border-t border-slate-200/40"
            >
              <ParaResult result={result} />
              
              {/* Navigation Actions nestled inside the result area */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <Button 
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="rounded-full border-slate-200 hover:text-primary gap-2 text-xs font-bold"
                >
                  <RotateCcw size={14} /> Try Again
                </Button>
                <Button 
                  onClick={onNext}
                  className="rounded-full bg-primary text-white shadow-lg px-8 gap-2 text-xs font-bold"
                >
                  Next Word <ArrowRight size={14} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Hint footer (Non-fixed) */}
      {!hasRecorded && !isRecording && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest"
        >
          Listen to the guide, then tap record to practice
        </motion.div>
      )}
    </div>
  );
}