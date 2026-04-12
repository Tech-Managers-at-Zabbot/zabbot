"use client";

import React from "react";
import { SparkCardVM } from "@/types/view-models";
import SparkCard from "./SparkCard";

interface Props {
  sparks: SparkCardVM[];
}

const SparksCarousel: React.FC<Props> = ({ sparks }) => {
  if (!sparks?.length) return null;

  return (
    <section className="space-y-4" aria-label="Micro-Lesson Sparks Carousel">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-[#162B6E] dark:text-white">
          Micro-Lesson Sparks
        </h2>
      </div>

      <div
        className="flex gap-4 overflow-x-auto pb-2 px-2 custom-scrollbar"
        role="list"
      >
        {sparks.map((spark) => (
          <div key={spark.id} className="min-w-[260px] flex-shrink-0" role="listitem">
            <SparkCard spark={spark} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SparksCarousel;