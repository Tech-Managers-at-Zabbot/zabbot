"use client";

import { useRef } from "react";
import { Mic, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isRecording: boolean;
  onRecordingComplete: (audioBlob: Blob) => void;
  onStart: () => void;
  onStop: () => void;
}

export default function ParaRecorder({ isRecording, onRecordingComplete, onStart, onStop }: Props) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunks.current = [];

      recorder.ondataavailable = (e) => chunks.current.push(e.data);
      recorder.onstop = () => {
        onRecordingComplete(new Blob(chunks.current, { type: "audio/webm" }));
        // Clean up stream tracks
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      onStart();
    } catch (err) {
      console.error("Microphone access denied", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    onStop();
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Animated Glow Rings for Recording State */}
      <AnimatePresence>
        {isRecording && (
          <>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.15 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 rounded-full bg-[#EF4444] z-0"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 2, opacity: 0.05 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className="absolute inset-0 rounded-full bg-[#EF4444] z-0"
            />
          </>
        )}
      </AnimatePresence>

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`
          relative z-10 w-24 h-24 rounded-full flex items-center justify-center
          transition-all duration-500 ease-in-out transform active:scale-90
          shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-2xl
          ${isRecording 
            ? "bg-[#EF4444] shadow-[0_0_30px_rgba(239,68,68,0.4)]" 
            : "bg-primary hover:bg-primary/90 shadow-primary/20"
          }
        `}
      >
        <div className="relative z-20 text-white">
          {isRecording ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Square size={32} className="fill-white" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
            >
              <Mic size={36} />
            </motion.div>
          )}
        </div>

        {/* Inner Glassmorphism Ring */}
        <div className="absolute inset-1 rounded-full border border-white/20 pointer-events-none" />
      </button>

      {/* Dynamic Status Text */}
      <motion.p 
        key={isRecording ? "rec" : "idle"}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-4 text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-300 ${
          isRecording ? "text-[#EF4444]" : "text-slate-400"
        }`}
      >
        {isRecording ? "Listening..." : "Tap to speak"}
      </motion.p>
    </div>
  );
}