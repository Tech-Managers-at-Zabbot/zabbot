"use client";

interface Props {
  value: number;
}

export default function XPBadge({ value }: Props) {
  return (
    <div className="text-[10px] font-black px-2 py-1 rounded-full bg-[#FACC15]/20 text-[#B45309] uppercase tracking-widest">
      +{value} XP
    </div>
  );
}