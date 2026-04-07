"use client";
import React from "react";
import LeaderboardGlass from "./LeaderboardGlass";

interface LeaderboardProps {
  leaderboard: {
    user: { name: string; avatar: string };
    totalXP: number;
    rank?: number;
  }[];
}

export default function Leaderboard({ leaderboard }: LeaderboardProps) {
  return (
    <div className="space-y-6">
      <LeaderboardGlass leaderboard={leaderboard} />
      {/* Additional leaderboard components (like sublists) can go here */}
    </div>
  );
}