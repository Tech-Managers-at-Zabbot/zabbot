"use client";

import { Check, Lock } from "lucide-react";
import Link from "next/link";
import { Spark } from "@/types/spark";

interface Props {
  spark: Spark;
  index: number;
}

export default function JourneyNode({ spark, index }: Props) {
  // ✅ SAFE FALLBACK (critical fix)
  const status = spark.uiStatus ?? "locked";

  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const isActive = status === "active";

  const baseStyle =
    "w-16 h-16 rounded-full flex items-center justify-center font-black transition-all duration-300 glass-shiny-edge shadow-md";

  const styles = isLocked
    ? "bg-slate-200 text-slate-400 border-slate-300"
    : isCompleted
    ? "bg-[#16A34A] text-white shadow-green-200/50"
    : isActive
    ? "bg-[#24A5EE] text-white animate-pulse shadow-blue-200/50 ring-4 ring-[#24A5EE]/20 scale-110"
    : "bg-white border border-slate-200 text-[#162B6E]";

  const content = isLocked ? (
    <Lock size={18} aria-label="Locked lesson" />
  ) : isCompleted ? (
    <Check size={20} strokeWidth={3} aria-label="Completed lesson" />
  ) : (
    <span className="text-lg" aria-label={`Lesson ${index + 1}`}>
      {index + 1}
    </span>
  );

  if (isLocked) {
    return (
      <div
        className={`${baseStyle} ${styles}`}
        aria-disabled="true"
        role="button"
      >
        {content}
      </div>
    );
  }

  return (
    <Link href={`/lesson/${spark.slug}`} aria-label={`Open lesson ${spark.title}`}>
      <div
        className={`${baseStyle} ${styles} hover:scale-110 active:scale-95 cursor-pointer`}
      >
        {content}
      </div>
    </Link>
  );
}