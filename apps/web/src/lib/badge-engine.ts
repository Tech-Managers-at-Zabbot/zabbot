import { db } from "@/lib/db";
import { HERITAGE_BADGES } from "./badges";

export async function checkNewBadges(userId: string) {
  // 1. Get user stats using the exact relation names from schema.prisma
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { 
      // This matches: achievements UserAchievement[]
      achievements: true, 
      _count: { 
        select: { 
          // This matches: progress UserLessonProgress[]
          progress: true 
        } 
      } 
    }
  });

  if (!user) return [];

  // 2. Map stats to the format expected by your HERITAGE_BADGES requirements
  const stats = {
    totalXp: user.xp,
    lessonsCompleted: user._count.progress,
    streakCount: user.currentStreak,
  };

  // 3. Find badges they qualify for but don't own yet
  // Using user.achievements to check for existing awards
  const newlyEarned = HERITAGE_BADGES.filter(badge => {
    const alreadyOwned = user.achievements.some(a => a.achievementId === badge.id);
    return !alreadyOwned && badge.requirement(stats);
  });

  // 4. Save new badges to the database
  if (newlyEarned.length > 0) {
    await db.userAchievement.createMany({
      data: newlyEarned.map(b => ({
        userId,
        achievementId: b.id,
      })),
      skipDuplicates: true,
    });
  }

  return newlyEarned;
}