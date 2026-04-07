"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUserProgress(userId: string, xpAmount: number) {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpAmount },
      },
    });

    revalidatePath("/dashboard");
    return { success: true, newXp: updatedUser.xp };
  } catch (error) {
    return { error: "Could not update XP" };
  }
}