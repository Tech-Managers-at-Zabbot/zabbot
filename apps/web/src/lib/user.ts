import { db } from "@/lib/db";

/**
 * ZABBOT CORE - USER DATA ENGINE
 * Fetches dashboard data using the internal database ID.
 * Optimized for high-speed retrieval and "Zero-Footprint" branding.
 */
export async function getUserDashboardData(providerId: string) {
  if (!providerId) return null;

  try {
    const user = await db.user.findUnique({
      where: { 
        // ✅ Updated: Using the standard 'id' field instead of 'clerkId'
        id: providerId 
      },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      console.warn(`User with ID ${providerId} not found.`);
      return null;
    }

    // Dynamic Name Logic: Priority to DB name, then fallback to brand identity
    const displayName = user.name || "Ersnoble";

    return {
      user: {
        name: displayName,
        avatarUrl: user.avatarUrl ?? "/default-avatar.png",
        role: "Learner",
        subscription: user.subscription?.status ?? "FREE",
      },
      stats: {
        xp: user.xp ?? 0,
        fires: user.currentStreak ?? 0,
      },
    };
  } catch (error) {
    console.error("Database error in getUserDashboardData:", error);
    return null;
  }
}