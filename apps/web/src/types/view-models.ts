// src/types/view-models.ts

export type SparkUIStatus = "locked" | "active" | "completed";

export interface SparkCardVM {
  id: string;
  title: string;
  description: string;
  slug: string;

  duration: string;
  xp: number;

  image: string;
  thumbnail: string;

  uiStatus: SparkUIStatus;
}

export interface LeaderboardUserVM {
  name: string;
  avatar: string;
}

export interface LeaderboardEntryVM {
  user: LeaderboardUserVM;
  totalXP: number;
  rank: number;
}

export interface MilestoneVM {
  level: number;
  xpRequired: number;
}