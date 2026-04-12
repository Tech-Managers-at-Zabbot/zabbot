"use client";

import { Check, Lock } from "lucide-react";
import Link from "next/link";
import { SparkCardVM } from "@/types/view-models";

interface Props {
  spark: SparkCardVM;
  index: number;
}

export default function JourneyNode({ spark, index }: Props) {
  /**
   * ✅ Normalized state with safe fallback
   */
  const status = spark.uiStatus ?? "locked";

  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const isActive = status === "active";

  const baseStyle =
    "w-16 h-16 rounded-full flex items-center justify-center font-black transition-all duration-300 glass-shiny-edge shadow-md select-none";

  const stateStyle = isLocked
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

  /**
   * ❌ Locked nodes are NOT interactive
   * → removed role="button"
   * → removed misleading semantics
   */
  if (isLocked) {
    return (
      <div
        className={`${baseStyle} ${stateStyle}`}
        aria-disabled="true"
        aria-label="Locked lesson"
      >
        {content}
      </div>
    );
  }

  /**
   * ✅ Active + completed are clickable
   */
  return (
    <Link
      href={`/lesson/${spark.slug}`}
      aria-label={`Open lesson ${spark.title}`}
      className="inline-block"
    >
      <div
        className={`${baseStyle} ${stateStyle} hover:scale-110 active:scale-95 cursor-pointer`}
      >
        {content}
      </div>
    </Link>
  );
}