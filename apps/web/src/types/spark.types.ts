export type SparkUIStatus = "locked" | "active" | "completed";

export interface SparkDTO {
  id: string;
  journeyId?: string | null;

  order: number;

  title: string;
  slug: string;
  description?: string;

  category: string;
  difficulty: string;

  xpReward: number;

  imageThumbnail?: string;

  icon?: string;
  color?: string;

  isPublished: boolean;
  timeEstimate?: number;

  status: string;

  createdAt: Date;
  updatedAt: Date;

  // relations (already normalized)
  contentBlocks: any[];
  exercises: any[];

  // optional (only if you need it)
  vocabulary?: any[];

  // UI layer (added later)
  uiStatus?: SparkUIStatus;
}