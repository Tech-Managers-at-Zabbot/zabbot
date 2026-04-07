import { db } from "@/lib/db"; // Ensure you are using 'db' as exported in your lib

export async function getDashboardProgress(userId: string) {
  // 1. Get all completed progress entries for this user
  const completedProgress = await db.userLessonProgress.findMany({
    where: {
      userId,
      completed: true,
    },
    select: {
      // FIX: Changed from 'lessonId' to 'sparkId' to match schema
      sparkId: true,
    },
  });

  const completedIds = new Set(completedProgress.map((p) => p.sparkId));

  // 2. Fetch all sparks (not lessons) to build the map
  // Note: Your schema maps this to the 'sparks_new' table automatically
  const sparks = await db.spark.findMany({
    orderBy: { order: "asc" },
  });

  // 3. Map sparks with completion status for the UI
  return sparks.map((spark) => ({
    ...spark,
    isCompleted: completedIds.has(spark.id),
    // If completed, 100%, otherwise 0% (can be refined later for exercise counts)
    percentage: completedIds.has(spark.id) ? 100 : 0,
  }));
}