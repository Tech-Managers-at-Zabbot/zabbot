import { Spark } from "@/types/spark";

export type SparkUIStatus = "locked" | "active" | "completed";

export interface SparkWithProgress {
  spark: Spark;
  isCompleted: boolean;
}

/**
 * Determines the current active spark based on progress
 * Rules:
 * 1. First incomplete spark = active
 * 2. All previous = completed
 * 3. All after = locked
 */
export function computeSparkStatuses(
  sparks: Spark[],
  completedSparkIds: string[] = [],
  currentSparkId?: string
): (Spark & { uiStatus: SparkUIStatus })[] {
  if (!sparks.length) return [];

  return sparks
    .sort((a, b) => a.order - b.order)
    .map((spark, index, arr) => {
      const isCompleted = completedSparkIds.includes(spark.id);

      // If explicitly marked current spark
      const isExplicitActive = currentSparkId === spark.id;

      // First incomplete spark becomes active (fallback logic)
      const firstIncompleteIndex = arr.findIndex(
        (s) => !completedSparkIds.includes(s.id)
      );

      const isAutoActive = index === firstIncompleteIndex;

      let uiStatus: SparkUIStatus = "locked";

      if (isCompleted) {
        uiStatus = "completed";
      } else if (isExplicitActive || isAutoActive) {
        uiStatus = "active";
      } else {
        uiStatus = "locked";
      }

      return {
        ...spark,
        uiStatus,
      };
    });
}

/**
 * Utility: Get next spark after completion
 */
export function getNextSpark(
  sparks: Spark[],
  completedSparkIds: string[] = []
): Spark | null {
  const sorted = [...sparks].sort((a, b) => a.order - b.order);

  return (
    sorted.find((spark) => !completedSparkIds.includes(spark.id)) || null
  );
}

/**
 * Utility: Check if spark is accessible
 */
export function isSparkUnlocked(
  spark: Spark,
  completedSparkIds: string[] = []
): boolean {
  if (completedSparkIds.includes(spark.id)) return true;

  const sorted = [...completedSparkIds];

  // unlocked if previous exists OR first in journey
  return true; // safe default (can refine later with dependency graph)
}