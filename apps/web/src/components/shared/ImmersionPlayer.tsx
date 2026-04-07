'use client';

import { useState } from 'react';
import { updateUserProgress } from "@/actions/gamification";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ImmersionPlayer({ videoId, userId, xpReward = 15 }: { videoId: string, userId: string, xpReward?: number }) {
    const [completed, setCompleted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleVideoEnd = async () => {
        if (completed) return; // Prevent double-counting

        setIsUpdating(true);
        try {
            // Trigger the Database Update
            await updateUserProgress(userId, xpReward);
            setCompleted(true);
        } catch (error) {
            console.error("Failed to update XP:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="relative aspect-video bg-black rounded-[2rem] overflow-hidden border-4 border-[#162B6E]/10">
            {/* Mock Video Container 
         In production, use your video provider's 'onEnded' event 
      */}
            <div className="absolute inset-0 flex items-center justify-center">
                {!completed ? (
                    <Button
                        onClick={handleVideoEnd}
                        disabled={isUpdating}
                        className="bg-[#24A5EE] hover:bg-[#162B6E] text-white rounded-full px-8"
                    >
                        {isUpdating ? "Saving Progress..." : "Simulate Video End"}
                    </Button>
                ) : (
                    <div className="text-center animate-in zoom-in duration-300">
                        <CheckCircle2 size={64} className="text-[#16A34A] mx-auto mb-4" />
                        <h3 className="text-white font-bold text-2xl">Spark Completed!</h3>
                        <p className="text-blue-200">+{xpReward} XP added to your Heritage journey.</p>
                    </div>
                )}
            </div>

            {/* Heritage Pattern Overlay */}
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <span className="text-[10px] text-white font-bold uppercase tracking-widest">
                    Yorùbá Immersion
                </span>
            </div>
        </div>
    );
}