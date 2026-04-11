"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Button";

interface Props {
  audioUrl: string;
}

export default function ParaPlayer({ audioUrl }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {
        // prevents autoplay rejection crash
      });
      setIsPlaying(true);
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <audio ref={audioRef} src={audioUrl} preload="auto" />

      <Button
        type="button"
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
        className={`flex items-center justify-center gap-2 rounded-full p-4 text-white transition-all
          ${
            isPlaying
              ? "bg-xp-yellow animate-pulse"
              : "bg-primary hover:bg-primary/90"
          }`}
        onClick={togglePlay}
      >
        {isPlaying ? "⏸️ Pause" : "▶️ Play"}
      </Button>

      <div className="flex gap-1 mt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-xp-yellow animate-bounce"
            style={{
              animationDelay: `${i * 120}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}