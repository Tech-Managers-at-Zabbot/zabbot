import { SparkCardVM } from "@/types/view-models";

export interface JourneyState {
  activeId: string | null;
  completed: Set<string>;
}

export interface JourneyEngineResult {
  activeSpark: SparkCardVM | null;
  queue: SparkCardVM[];
  completed: SparkCardVM[];
  locked: SparkCardVM[];

  isCompleted: (id: string) => boolean;
  isActive: (id: string) => boolean;
}