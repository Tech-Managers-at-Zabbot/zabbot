import { Spark, UserLessonProgress } from "@prisma/client";

export type SparkUIStatus = "locked" | "active" | "completed";

export type SparkWithUI = Spark & {
  uiStatus: SparkUIStatus;
};

export function buildSparkUI(
  sparks: Spark[] = [],
  progress: UserLessonProgress[] = []
): SparkWithUI[] {
  // 🛡️ Safety: handle empty input early
  if (!Array.isArray(sparks) || sparks.length === 0) {
    return [];
  }

  // ✅ Build completed lookup set
  const completedSet = new Set<string>(
    progress
      .filter((p) => p.completed === true && p.sparkId)
      .map((p) => p.sparkId)
  );

  // ✅ Sort immutably and deterministically
  const sortedSparks = [...sparks].sort((a, b) => {
    if (a.order === b.order) {
      return a.id.localeCompare(b.id); // fallback for stability
    }
    return a.order - b.order;
  });

  let activeAssigned = false;

  const result: SparkWithUI[] = [];

  for (const spark of sortedSparks) {
    // ✅ Completed takes highest priority
    if (completedSet.has(spark.id)) {
      result.push({
        ...spark,
        uiStatus: "completed",
      });
      continue;
    }

    // ✅ First incomplete becomes active
    if (!activeAssigned) {
      result.push({
        ...spark,
        uiStatus: "active",
      });
      activeAssigned = true;
      continue;
    }

    // 🔒 Remaining are locked
    result.push({
      ...spark,
      uiStatus: "locked",
    });
  }

  return result;
}