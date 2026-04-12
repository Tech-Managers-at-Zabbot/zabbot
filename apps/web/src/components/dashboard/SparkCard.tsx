"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SparkCardVM } from "@/types/view-models";

interface Props {
  spark: SparkCardVM;
}

const SparkCard: React.FC<Props> = ({ spark }) => {
  return (
    <Link
      href={`/lesson/${spark.slug}`}
      className="group block rounded-[24px] overflow-hidden bg-white/70 backdrop-blur-lg border border-white/40 shadow-md hover:scale-[1.03] transition-transform duration-300 ease-in-out"
    >
      {/* Image */}
      <div className="relative h-[140px] w-full bg-slate-100">
        <Image
          src={spark.image}
          alt={spark.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 260px"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-sm font-black text-[#162B6E] dark:text-white truncate">
          {spark.title}
        </h3>

        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <span>{spark.duration}</span>
          <span className="text-[#FACC15]">+{spark.xp} XP</span>
        </div>
      </div>
    </Link>
  );
};

export default SparkCard;