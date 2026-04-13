import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildSparkUI } from "@/server/journey/buildSparkUI";

type RouteContext = {
  params: {
    journeyId?: string;
  };
};

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const journeyId = context.params?.journeyId;

    if (!journeyId) {
      return NextResponse.json(
        { success: false, error: "Journey ID is required" },
        { status: 400 }
      );
    }

    // ⚠️ Replace with real session later
    const userId = "demo-user-id";

    // 📦 Fetch journey
    const journey = await prisma.journey.findUnique({
      where: { id: journeyId },
      include: {
        sparks: true,
      },
    });

    if (!journey) {
      return NextResponse.json(
        { success: false, error: "Journey not found" },
        { status: 404 }
      );
    }

    // 📊 Fetch user progress
    const progress = await prisma.userLessonProgress.findMany({
      where: {
        userId,
        spark: {
          journeyId,
        },
      },
      include: {
        spark: {
          select: { id: true },
        },
      },
    });

    // 🎯 Build UI state
    const sparksWithUI = buildSparkUI(journey.sparks, progress);

    return NextResponse.json({
      success: true,
      data: {
        journey: {
          id: journey.id,
          title: journey.title,
          description: journey.description,
        },
        sparks: sparksWithUI,
      },
    });

  } catch (error) {
    console.error("Journey fetch error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load journey",
      },
      { status: 500 }
    );
  }
}