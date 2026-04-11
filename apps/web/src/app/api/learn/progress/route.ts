// GET /api/learn/progress

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ⚠️ Replace this with real auth later
const MOCK_USER_ID = "test-user-id";

export async function GET() {
  try {
    const progress = await prisma.userLessonProgress.findMany({
      where: {
        userId: MOCK_USER_ID,
      },
    });

    return NextResponse.json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch progress",
    });
  }
}