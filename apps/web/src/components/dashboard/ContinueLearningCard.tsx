"use client";

import React from "react";
import Image from "next/image";
import { SparkCardVM } from "@/types/view-models";

interface ContinueLearningCardProps {
  spark: SparkCardVM;
  onContinue?: (sparkId: string) => void;
}

export default function ContinueLearningCard({
  spark,
  onContinue,
}: ContinueLearningCardProps) {
  const isLocked = spark.uiStatus === "locked";
  const isCompleted = spark.uiStatus === "completed";

  return (
    <div
      className={`zabbot-glass-strong p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 transition-all ${
        isLocked ? "opacity-60 grayscale" : "opacity-100"
      }`}
    >
      {/* Lesson Image */}
      <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden relative">
        <Image
          src={spark.image}
          alt={spark.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Lesson Info */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-heading text-[#162B6E] dark:text-white">
            {spark.title}
          </h2>

          <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
            {spark.description}
          </p>

          {/* Status Badge */}
          <div className="mt-3">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                isCompleted
                  ? "bg-green-100 text-green-700"
                  : isLocked
                  ? "bg-gray-200 text-gray-600"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {isCompleted
                ? "Completed"
                : isLocked
                ? "Locked"
                : "Continue Learning"}
            </span>
          </div>
        </div>

        {/* XP & CTA */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-[#FACC15] font-bold">
              {spark.xp} XP
            </span>
            <span className="text-gray-400 dark:text-gray-400 text-sm">
              reward
            </span>
          </div>

          <button
            disabled={isLocked}
            onClick={() => onContinue?.(spark.id)}
            className={`px-6 py-2 rounded-xl font-semibold transition-all ${
              isLocked
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#162B6E] text-white hover:bg-[#24A5EE]"
            }`}
          >
            {isCompleted ? "Review" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}