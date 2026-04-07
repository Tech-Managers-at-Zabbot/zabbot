"use client";

import { Check, Lock } from "lucide-react";
import Link from "next/link";
import { Spark } from "@/types/spark";

interface Props {
  spark: Spark;
  index: number; // Added index to show step numbers since 'order' isn't in Spark type
}

export default function JourneyNode({ spark, index }: Props) {
  const isLocked = spark.uiStatus === "locked";
  const isCompleted = spark.uiStatus === "completed";
  const isActive = spark.uiStatus === "active"; // ✅ FIXED: Changed from "in-progress"

  const baseStyle =
    "w-16 h-16 rounded-full flex items-center justify-center font-black transition-all glass-shiny-edge shadow-md";

  const styles = isLocked
    ? "bg-slate-200 text-slate-400 border-slate-300"
    : isCompleted
    ? "bg-[#16A34A] text-white shadow-green-200/50"
    : isActive
    ? "bg-[#24A5EE] text-white animate-pulse shadow-blue-200/50 ring-4 ring-[#24A5EE]/20"
    : "bg-white border border-slate-200 text-[#162B6E]";

  const content = isLocked ? (
    <Lock size={18} />
  ) : isCompleted ? (
    <Check size={20} strokeWidth={3} />
  ) : (
    <span className="text-lg">{index + 1}</span> // ✅ FIXED: Uses index+1 instead of undefined 'order'
  );

  if (isLocked) {
    return <div className={`${baseStyle} ${styles}`}>{content}</div>;
  }

  return (
    <Link href={`/lesson/${spark.slug}`}>
      <div className={`${baseStyle} ${styles} hover:scale-110 active:scale-95 cursor-pointer`}>
        {content}
      </div>
    </Link>
  );
}