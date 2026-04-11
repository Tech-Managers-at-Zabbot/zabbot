export interface Spark {
  id: string;
  slug: string;
  title: string;
  description?: string;

  category: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

  xpReward: number;
  timeEstimate?: number;

  imageThumbnail?: string;

  uiStatus?: "locked" | "active" | "completed";

  order: number;
}