import { SparkDTO } from "@/types/spark.types";

export type SparkUIStatus = "locked" | "active" | "completed";

/**
 * 🔥 CORE ENGINE
 * Computes UI status for each spark
 *
 * Rules:
 * 1. Completed → completed
 * 2. Explicit current → active
 * 3. First incomplete → active (fallback)
 * 4. Others → locked
 */
export function computeSparkStatuses(
  sparks: SparkDTO[],
  completedSparkIds: string[] = [],
  currentSparkId?: string
): (SparkDTO & { uiStatus: SparkUIStatus })[] {
  if (!sparks.length) return [];

  // ✅ Never mutate original input
  const sorted = [...sparks].sort((a, b) => a.order - b.order);

  // ✅ Precompute for O(n)
  const completedSet = new Set(completedSparkIds);

  const firstIncompleteIndex = sorted.findIndex(
    (s) => !completedSet.has(s.id)
  );

  return sorted.map((spark, index) => {
    const isCompleted = completedSet.has(spark.id);
    const isExplicitActive = currentSparkId === spark.id;
    const isAutoActive = index === firstIncompleteIndex;

    let uiStatus: SparkUIStatus = "locked";

    if (isCompleted) {
      uiStatus = "completed";
    } else if (isExplicitActive || isAutoActive) {
      uiStatus = "active";
    }

    return {
      ...spark,
      uiStatus,
    };
  });
}

/**
 * 🎯 Get next available spark (first incomplete)
 */
export function getNextSpark(
  sparks: SparkDTO[],
  completedSparkIds: string[] = []
): SparkDTO | null {
  if (!sparks.length) return null;

  const completedSet = new Set(completedSparkIds);

  const sorted = [...sparks].sort((a, b) => a.order - b.order);

  return sorted.find((s) => !completedSet.has(s.id)) ?? null;
}

/**
 * 🔓 Check if a spark is unlocked
 *
 * Rules:
 * - First spark → always unlocked
 * - Otherwise → previous must be completed
 */
export function isSparkUnlocked(
  spark: SparkDTO,
  sparks: SparkDTO[],
  completedSparkIds: string[] = []
): boolean {
  if (!sparks.length) return false;

  const completedSet = new Set(completedSparkIds);

  const sorted = [...sparks].sort((a, b) => a.order - b.order);

  const index = sorted.findIndex((s) => s.id === spark.id);

  if (index === -1) return false;

  if (index === 0) return true;

  const previous = sorted[index - 1];

  return completedSet.has(previous.id);
}

/**
 * 📊 Compute journey progress stats
 */
export function computeJourneyStats(
  sparks: SparkDTO[],
  completedSparkIds: string[] = []
) {
  const total = sparks.length;
  const completed = completedSparkIds.length;

  const progressPercent =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    totalSparks: total,
    completedSparks: completed,
    progressPercent,
  };
}

/**
 * 🚀 High-level helper (optional usage)
 * Full engine pipeline in one call
 */
export function buildSparkJourneyState(params: {
  sparks: SparkDTO[];
  completedSparkIds?: string[];
  currentSparkId?: string;
}) {
  const {
    sparks,
    completedSparkIds = [],
    currentSparkId,
  } = params;

  const enriched = computeSparkStatuses(
    sparks,
    completedSparkIds,
    currentSparkId
  );

  const nextSpark =
    enriched.find((s) => s.uiStatus === "active") ?? null;

  const stats = computeJourneyStats(
    sparks,
    completedSparkIds
  );

  return {
    sparks: enriched,
    nextSpark,
    stats,
  };
}