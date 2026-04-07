'use client';

import { useState } from 'react';
import { cn } from "@/lib/utils";

interface FlashcardProps {
    front: string;
    back: string;
    onAnswer: (correct: boolean) => void;
}

export default function Flashcard({ front, back, onAnswer }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="flex flex-col items-center gap-8">
            {/* 3D Flip Card */}
            <div
                className="group h-[400px] w-[300px] [perspective:1000px] cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className={cn(
                    "relative h-full w-full rounded-[2.5rem] shadow-xl transition-all duration-500 [transform-style:preserve-3d]",
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                )}>
                    {/* Front Side (Yorùbá) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border-2 border-[#EFF6FF] rounded-[2.5rem] px-6 text-center [backface-visibility:hidden]">
                        <span className="text-[10px] font-black text-[#24A5EE] uppercase tracking-[0.2em] mb-4">Yorùbá</span>
                        <h2 className="text-4xl font-bold text-[#162B6E] font-poppins">{front}</h2>
                        <p className="mt-8 text-slate-400 text-sm animate-pulse">Tap to reveal translation</p>
                    </div>

                    {/* Back Side (English) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#162B6E] text-white rounded-[2.5rem] px-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <span className="text-[10px] font-black text-[#24A5EE] uppercase tracking-[0.2em] mb-4">English</span>
                        <h2 className="text-3xl font-medium font-inter">{back}</h2>
                    </div>
                </div>
            </div>

            {/* Action Buttons (Visible only after flip) */}
            <div className={cn(
                "flex gap-4 transition-opacity duration-300",
                isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
                <button
                    onClick={(e) => { e.stopPropagation(); onAnswer(false); setIsFlipped(false); }}
                    className="px-8 py-3 bg-white border-2 border-red-100 text-red-500 rounded-full font-bold hover:bg-red-50"
                >
                    Still Learning
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onAnswer(true); setIsFlipped(false); }}
                    className="px-8 py-3 bg-[#16A34A] text-white rounded-full font-bold hover:shadow-lg hover:translate-y-[-2px] transition-all"
                >
                    Got It!
                </button>
            </div>
        </div>
    );
}