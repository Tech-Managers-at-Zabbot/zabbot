"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import ParaWaveCompare from "./ParaWaveCompare";
import { Loader2, Trophy, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Voice = "male" | "female";

interface PracticeItem {
  english: string;
  yoruba: string;
  tones: string[];
  audio: Record<Voice, string>;
}

export default function ParaStudioClient() {
  const [selectedVoice, setSelectedVoice] = useState<Voice>("male");
  const [isRecording, setIsRecording] = useState(false);
  const [userAudio, setUserAudio] = useState<Blob | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [items, setItems] = useState<PracticeItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/practice-items/list");
      const data = await res.json();
      if (data.success && data.items.length > 0) {
        const formatted = data.items.map((item: any) => {
          const rawTones = item.tones || item.Tones || "";
          return {
            english: item.englishTranslation || item["English word"] || "",
            yoruba: item.yorubaWord || item["Yoruba word"] || "",
            tones: rawTones ? rawTones.trim().split(/\s+/) : [],
            audio: {
              male: item.maleAudioUrl || "",
              female: item.femaleAudioUrl || "",
            }
          };
        });
        setItems(formatted);
      }
    } catch (err) {
      console.error("Failed to load Para items", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const currentItem = useMemo(() => items[currentIndex], [items, currentIndex]);

  const handleNext = () => {
    setHasRecorded(false);
    setUserAudio(null);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handleRecordingComplete = useCallback((audioBlob: Blob) => {
    setUserAudio(audioBlob);
    setIsRecording(false);
    setHasRecorded(true);
    setXp((prev) => prev + (Math.floor(Math.random() * 20) + 10));
    setStreak((prev) => prev + 1);
  }, []);

  const mockResult = useMemo(() => ({
    total: Math.floor(Math.random() * 100),
    tone: Math.floor(Math.random() * 100),
    pronunciation: Math.floor(Math.random() * 100),
    feedback: "Awesome! Keep practicing to master the tone.",
  }), [hasRecorded, currentIndex]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-primary">
      <Loader2 className="animate-spin w-12 h-12 mb-4 opacity-20" />
      <p className="font-black uppercase tracking-[0.3em] text-[10px] opacity-40">Initializing Studio...</p>
    </div>
  );

  return (
    <div className="relative w-full flex flex-col items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-50 via-transparent to-transparent pb-32">
      
      {/* 1. DYNAMIC STATUS BAR */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-xl px-4 mt-6 mb-10"
      >
        <div className="flex justify-between items-center p-3 px-6 zabbot-glass-card border-white/40 shadow-premium rounded-full bg-white/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
             <div className="bg-primary p-2 rounded-full shadow-lg shadow-primary/20">
               <Trophy size={14} className="text-white"/>
             </div>
             <div>
                <p className="text-[9px] font-black text-slate-400 uppercase leading-none tracking-widest">Earnings</p>
                <p className="text-primary font-black text-sm tracking-tighter">{xp} XP</p>
             </div>
          </div>
          
          <div className="h-8 w-[1px] bg-slate-200/50 mx-2" />
          
          <div className="flex items-center gap-3 text-right">
            <div>
               <p className="text-[9px] font-black text-slate-400 uppercase leading-none tracking-widest">Daily Goal</p>
               <p className="text-primary font-black text-sm flex items-center justify-end gap-1">
                 {streak} <Flame size={14} className="text-orange-500 fill-orange-500" />
               </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. MAIN INTERACTION STAGE */}
      <div className="w-full max-w-5xl px-4 md:px-8">
        <AnimatePresence mode="wait">
          {currentItem ? (
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <ParaWaveCompare
                english={currentItem.english}
                yoruba={currentItem.yoruba}
                tones={currentItem.tones}
                referenceAudioUrl={currentItem.audio[selectedVoice]}
                selectedVoice={selectedVoice}
                onVoiceChange={setSelectedVoice}
                isRecording={isRecording}
                onStartRecording={() => setIsRecording(true)}
                onStopRecording={() => setIsRecording(false)}
                onRecordingComplete={handleRecordingComplete}
                userAudio={userAudio || undefined}
                hasRecorded={hasRecorded}
                result={mockResult}
                onNext={handleNext}
              />
            </motion.div>
          ) : (
            <div className="text-center p-20 zabbot-glass-card rounded-[40px] border-white/40">
              <p className="font-black text-primary/40 uppercase tracking-widest text-xs">
                Synchronizing Studio Data...
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}