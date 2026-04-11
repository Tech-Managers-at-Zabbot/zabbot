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

interface Result {
  total: number;
  tone: number;
  pronunciation: number;
  feedback: string;
}

export default function ParaStudioClient() {
  const [selectedVoice, setSelectedVoice] = useState<Voice>("male");

  const [isRecording, setIsRecording] = useState(false);
  const [userAudio, setUserAudio] = useState<Blob | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [lastResult, setLastResult] = useState<Result | null>(null);

  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const [history, setHistory] = useState<Record<number, Result>>({});

  const [items, setItems] = useState<PracticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("zabbot_para_progress");
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      setXp(data.xp ?? 0);
      setStreak(data.streak ?? 0);
      setUnlockedIndex(data.unlockedIndex ?? 0);
      setHistory(data.history ?? {});
      setCurrentIndex(data.unlockedIndex ?? 0);
    } catch {}
  }, []);

  useEffect(() => {
    if (!items.length) return;

    localStorage.setItem(
      "zabbot_para_progress",
      JSON.stringify({ xp, streak, unlockedIndex, history })
    );
  }, [xp, streak, unlockedIndex, history, items.length]);

  const fetchItems = async () => {
    try {
      setError(null);
      const res = await fetch("/api/practice-items", { cache: "no-store" });
      const data = await res.json();

      const raw = data?.success ? data.items : data;

      if (!Array.isArray(raw)) throw new Error("Invalid response");

      const formatted: PracticeItem[] = raw.map((item: any) => ({
        english: item.englishTranslation ?? "",
        yoruba: item.yorubaWord ?? "",
        tones: (item.tones ?? "").toString().split(/\s+/).filter(Boolean),
        audio: {
          male: item.maleAudioUrl ?? "",
          female: item.femaleAudioUrl ?? "",
        },
      }));

      setItems(formatted);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleRecordingComplete = useCallback((audioBlob: Blob) => {
    setUserAudio(audioBlob);
    setIsRecording(false);
    setHasRecorded(true);

    const tone = Math.floor(Math.random() * 40) + 60;
    const pronunciation = Math.floor(Math.random() * 40) + 60;
    const total = Math.floor((tone + pronunciation) / 2);

    setXp((p) => p + Math.floor(total / 10));
    setStreak((s) => s + 1);

    setLastResult({
      total,
      tone,
      pronunciation,
      feedback: total > 80 ? "Excellent!" : "Good effort!",
    });
  }, []);

  const mockResult = useMemo(
    () =>
      lastResult ?? {
        total: 0,
        tone: 0,
        pronunciation: 0,
        feedback: "Record to get feedback",
      },
    [lastResult]
  );

  const handleNext = () => {
    if (lastResult) {
      setHistory((h) => ({ ...h, [currentIndex]: lastResult }));

      if (currentIndex === unlockedIndex) {
        setUnlockedIndex((u) =>
          Math.min(u + 1, items.length - 1)
        );
      }
    }

    setUserAudio(null);
    setHasRecorded(false);
    setLastResult(null);

    setCurrentIndex((i) => Math.min(i + 1, items.length - 1));
  };

  const handlePrevious = () => {
    setUserAudio(null);
    setHasRecorded(false);
    setLastResult(null);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin w-10 h-10 opacity-30" />
        <p className="text-[10px] uppercase mt-3 opacity-40">
          Initializing...
        </p>
      </div>
    );
  }

  if (error || !items.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-xs font-bold uppercase text-red-500">
          {error ?? "No data"}
        </p>
        <button onClick={fetchItems} className="mt-4 px-4 py-2 text-xs bg-black text-white rounded-full">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center pb-32">
      <motion.div className="w-full max-w-xl mt-6 mb-10">
        <div className="flex justify-between items-center bg-white/40 backdrop-blur-md p-4 rounded-full">
          <div className="flex gap-2 items-center">
            <Trophy size={16} />
            <div>
              <p className="text-[9px]">XP</p>
              <p className="font-bold">{xp}</p>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="text-right">
              <p className="text-[9px]">Streak</p>
              <p className="font-bold">{streak}</p>
            </div>
            <Flame size={16} className="text-orange-500" />
          </div>
        </div>
      </motion.div>

      <div className="w-full max-w-5xl px-4">
        <AnimatePresence mode="wait">
          {items[currentIndex] && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ParaWaveCompare
                english={items[currentIndex].english}
                yoruba={items[currentIndex].yoruba}
                tones={items[currentIndex].tones}
                referenceAudioUrl={
                  items[currentIndex].audio[selectedVoice]
                }
                selectedVoice={selectedVoice}
                onVoiceChange={setSelectedVoice}
                isRecording={isRecording}
                onStartRecording={() => setIsRecording(true)}
                onStopRecording={() => setIsRecording(false)}
                onRecordingComplete={handleRecordingComplete}
                userAudio={userAudio ?? undefined}
                hasRecorded={hasRecorded}
                result={mockResult}
                onNext={handleNext}
                onPrevious={handlePrevious}
                canGoBack={currentIndex > 0}
                isLocked={currentIndex > unlockedIndex}
                previousScore={history[currentIndex]?.total ?? 0}
                onResetResult={() => setLastResult(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}