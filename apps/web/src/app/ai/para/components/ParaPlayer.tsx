"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface Props {
  audioUrl: string;
}

export default function ParaPlayer({ audioUrl }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    const handleEnded = () => setIsPlaying(false);
    audioEl.addEventListener("ended", handleEnded);
    return () => audioEl.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <audio ref={audioRef} src={audioUrl} preload="auto" />

      <Button
        className={`flex items-center justify-center gap-2 rounded-full p-4
          ${isPlaying ? "bg-xp-yellow animate-pulse" : "bg-primary hover:bg-primary/90"} text-white`}
        onClick={togglePlay}
      >
        {isPlaying ? "⏸️ Pause" : "▶️ Play"}
      </Button>

      <div className="flex gap-1 mt-2">
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full bg-xp-yellow animate-bounce delay-[${i * 100}ms]`}
          />
        ))}
      </div>
    </div>
  );
}