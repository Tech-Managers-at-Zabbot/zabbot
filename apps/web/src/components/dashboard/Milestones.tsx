"use client";
import React from "react";
import MilestoneRewards from "./MilestoneRewards";

interface MilestonesProps {
  progress: number;
  nextMilestone: { level: number; xpRequired: number } | null;
}

export default function Milestones({ progress, nextMilestone }: MilestonesProps) {
  return (
    <div className="space-y-6">
      <MilestoneRewards progress={progress} nextMilestone={nextMilestone} />
      {/* Future milestone cards can go here */}
    </div>
  );
}