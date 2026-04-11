"use client";

import { useMemo, useEffect, useState } from "react";
import ParaPlayer from "./ParaPlayer";
import ParaRecorder from "./ParaRecorder";
import ParaWaveform from "./ParaWaveform";
import ParaResultOverlay from "./ParaResult";
import VoiceSelector from "./VoiceSelector";
import WordCard from "./WordCard";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowLeft } from "lucide-react";

interface Result {
  total: number;
  tone: number;
  pronunciation: number;
  feedback: string;
}

interface Props {
  english: string;
  yoruba: string;
  tones: string[];
  referenceAudioUrl: string;
  selectedVoice: "male" | "female";
  onVoiceChange: (v: "male" | "female") => void;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onRecordingComplete: (blob: Blob) => void;
  userAudio?: Blob;
  hasRecorded: boolean;
  result: Result;
  onNext: () => void;
  onPrevious: () => void;
  onResetResult: () => void;
  canGoBack: boolean;
  isLocked: boolean;
  previousScore: number;
}

export default function ParaWaveCompare(props: Props) {
  const {
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
    onPrevious,
    onResetResult,
    canGoBack,
    isLocked,
    previousScore,
  } = props;

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Memoize the URL and handle cleanup correctly
  const userAudioUrl = useMemo(() => {
    if (!userAudio) return undefined;
    return URL.createObjectURL(userAudio);
  }, [userAudio]);

  // Clean up Object URLs to prevent memory leaks in the browser
  useEffect(() => {
    return () => {
      if (userAudioUrl) URL.revokeObjectURL(userAudioUrl);
    };
  }, [userAudioUrl]);

  // Trigger overlay when a valid score is received
  useEffect(() => {
    if (result && result.total > 0) {
      setIsOverlayOpen(true);
    }
  }, [result]);

  const handleRetry = () => {
    setIsOverlayOpen(false);
    onResetResult();
  };

  const handleNext = () => {
    setIsOverlayOpen(false);
    // Slight delay to allow overlay animation to finish
    setTimeout(onNext, 250);
  };

  // Helper to safely handle voice changes from generic string inputs
  const handleVoiceChange = (voice: string) => {
    if (voice === "male" || voice === "female") {
      onVoiceChange(voice);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center gap-6">
      {/* NAVIGATION HEADER */}
      <div className="w-full max-w-5xl flex justify-between items-center px-2">
        {canGoBack ? (
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-primary"
          >
            <ArrowLeft size={14} />
            Previous Lesson
          </button>
        ) : (
          <div />
        )}

        {previousScore > 0 && (
          <div className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-4 py-1.5 rounded-full border border-green-100">
            Best Score: {previousScore}%
          </div>
        )}
      </div>

      {/* MAIN INTERACTIVE STAGE */}
      <div
        className={cn(
          "w-full max-w-5xl mx-auto p-6 md:p-10 relative overflow-hidden transition-transform duration-300",
          "bg-white/40 backdrop-blur-2xl rounded-[40px] border border-white/60 shadow-premium",
          isRecording && "scale-[0.99]",
          isLocked && "pointer-events-none"
        )}
      >
        {/* LOCK OVERLAY */}
        <AnimatePresence>
          {isLocked && (
            <motion.div
              className="absolute inset-0 z-50 bg-white/30 backdrop-blur-xl flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center gap-3">
                <Lock className="text-primary" size={24} />
                <p className="text-xs font-bold uppercase tracking-tight">
                  Classroom Locked
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTROLS HEADER */}
        <div className="flex justify-between items-center mb-8">
          <VoiceSelector
            selectedVoice={selectedVoice}
            onChange={handleVoiceChange}
          />

          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {isRecording ? (
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
                Listening...
              </span>
            ) : (
              "Ready"
            )}
          </div>
        </div>

        {/* CONTENT CARD */}
        <WordCard english={english} yoruba={yoruba} tones={tones} />

        {/* RECORDING & PLAYBACK ACTIONS */}
        <div className="mt-10 flex flex-col items-center gap-8">
          <div className="flex gap-10">
            <ParaPlayer audioUrl={referenceAudioUrl} />

            <ParaRecorder
              isRecording={isRecording}
              onRecordingComplete={onRecordingComplete}
              onStart={onStartRecording}
              onStop={onStopRecording}
            />
          </div>

          {/* VISUAL FEEDBACK (WAVEFORM) */}
          <div className="w-full bg-black/5 rounded-3xl p-4">
            <ParaWaveform
              originalAudio={referenceAudioUrl}
              userAudio={userAudioUrl}
              isRecording={isRecording}
            />
          </div>
        </div>
      </div>

      {/* RESULTS OVERLAY */}
      <ParaResultOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        result={result}
        onRetry={handleRetry}
        onNext={handleNext}
        currentYorubaWord={yoruba}
      />

      {/* FOOTER HINT */}
      {!hasRecorded && !isRecording && !isLocked && (
        <div className="text-[10px] uppercase tracking-widest text-slate-400 flex items-center gap-2 animate-bounce">
          <Lock size={12} />
          Complete audio to continue
        </div>
      )}
    </div>
  );
}