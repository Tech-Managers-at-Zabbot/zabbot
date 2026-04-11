import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { computeSparkStatuses } from "@/lib/spark-status";

export const dynamic = "force-dynamic";

// ⚠️ TEMP: replace with real auth later
const MOCK_USER_ID = "test-user-id";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    // 1. Get journey with sparks
    const journey = await db.journey.findUnique({
      where: { slug },
      include: {
        sparks: {
          orderBy: { order: "asc" },
          include: {
            vocabulary: true,
            exercises: true,
            contentBlocks: true,
          },
        },
      },
    });

    if (!journey) {
      return NextResponse.json(
        { success: false, error: "Journey not found" },
        { status: 404 }
      );
    }

    // 2. Get user progress
    const progress = await db.userLessonProgress.findMany({
      where: {
        userId: MOCK_USER_ID,
        sparkId: {
          in: journey.sparks.map((s) => s.id),
        },
      },
    });

    const completedIds = progress
      .filter((p) => p.completed)
      .map((p) => p.sparkId);

    // 3. Determine current active spark
    const firstIncomplete = journey.sparks.find(
      (s) => !completedIds.includes(s.id)
    );

    const currentSparkId = firstIncomplete?.id;

    // 4. 🔥 FIX: NORMALIZE PRISMA NULLS → UNDEFINED
    const normalizedSparks = journey.sparks.map((spark) => ({
      ...spark,
      description: spark.description ?? undefined,
    }));

    // 5. ENRICH SPARKS WITH UI STATE (ENGINE CORE)
    const enrichedSparks = computeSparkStatuses(
      normalizedSparks,
      completedIds,
      currentSparkId
    );

    // 6. Calculate journey stats
    const total = journey.sparks.length;
    const completed = completedIds.length;
    const progressPercent =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    // 7. Next spark
    const nextSpark =
      enrichedSparks.find((s) => s.uiStatus === "active") || null;

    return NextResponse.json({
      success: true,

      journey: {
        id: journey.id,
        slug: journey.slug,
        title: journey.title,
        description: journey.description,
        color: journey.color,
        icon: journey.icon,
      },

      stats: {
        totalSparks: total,
        completedSparks: completed,
        progressPercent,
      },

      nextSpark,

      sparks: enrichedSparks,
    });
  } catch (error: any) {
    console.error("[JOURNEY_ENGINE_ERROR]", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to load journey",
      },
      { status: 500 }
    );
  }
}