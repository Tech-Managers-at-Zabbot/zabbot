"use client";

import React from "react";
import { Spark } from "@/types/spark";

interface ContinueLearningCardProps {
  spark: Spark;
}

export default function ContinueLearningCard({ spark }: ContinueLearningCardProps) {
  return (
    <div className="zabbot-glass-strong p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
      
      {/* Lesson Image */}
      <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden">
        <img
          src={spark.image}
          alt={spark.title}
          className="w-full h-full object-cover"
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
        </div>

        {/* XP & CTA */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-[#FACC15] font-bold">{spark.xp} XP</span>
            <span className="text-gray-400 dark:text-gray-400 text-sm">reward</span>
          </div>
          <button
            className="px-6 py-2 rounded-xl bg-[#162B6E] text-white font-semibold hover:bg-[#24A5EE] transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}