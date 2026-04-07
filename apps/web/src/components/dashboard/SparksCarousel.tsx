"use client";

import React from "react";
import { Spark } from "@/types/spark";
import SparkCard from "./SparkCard";

interface Props {
  sparks: Spark[];
}

const SparksCarousel: React.FC<Props> = ({ sparks }) => {
  if (!sparks || sparks.length === 0) return null;

  return (
    <section className="space-y-4" aria-label="Micro-Lesson Sparks Carousel">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-[#162B6E] dark:text-white">
          Micro-Lesson Sparks
        </h2>
      </div>

      {/* Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-2 px-2 custom-scrollbar">
        {sparks.map((spark) => (
          <div key={spark.id} className="min-w-[260px] flex-shrink-0">
            <SparkCard spark={spark} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SparksCarousel;