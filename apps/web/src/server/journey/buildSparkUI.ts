import { Spark, UserLessonProgress } from "@prisma/client";

export type SparkUIStatus = "locked" | "active" | "completed";

export type SparkWithUI = Spark & {
  uiStatus: SparkUIStatus;
};

export function buildSparkUI(
  sparks: Spark[],
  progress: UserLessonProgress[]
): SparkWithUI[] {
  const completedSet = new Set(
    progress.filter((p) => p.completed).map((p) => p.sparkId)
  );

  const completedCount = completedSet.size;

  let activeAssigned = false;

  return sparks
    .sort((a, b) => a.order - b.order)
    .map((spark) => {
      // 1. completed
      if (completedSet.has(spark.id)) {
        return {
          ...spark,
          uiStatus: "completed",
        };
      }

      // 2. first incomplete becomes active
      if (!activeAssigned) {
        activeAssigned = true;
        return {
          ...spark,
          uiStatus: "active",
        };
      }

      // 3. rest locked
      return {
        ...spark,
        uiStatus: "locked",
      };
    });
}