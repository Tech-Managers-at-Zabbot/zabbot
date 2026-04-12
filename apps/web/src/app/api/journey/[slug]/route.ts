import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buildSparkJourneyState } from "@/lib/spark-engine";
import { SparkDTO } from "@/types/spark.types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // 🔐 AUTH
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const slug = params.slug;

    // 1. FETCH JOURNEY + SPARKS
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

    const sparks = journey.sparks ?? [];
    const sparkIds = sparks.map((s) => s.id);

    // 2. USER PROGRESS (lean query)
    const progress = await db.userLessonProgress.findMany({
      where: {
        userId,
        sparkId: { in: sparkIds },
      },
      select: {
        sparkId: true,
        completed: true,
      },
    });

    const completedIds = new Set(
      progress.filter((p) => p.completed).map((p) => p.sparkId)
    );

    // 3. CURRENT ACTIVE SPARK
    const firstIncomplete = sparks.find(
      (s) => !completedIds.has(s.id)
    );

    // ✅ FIX: engine expects undefined, NOT null
    const currentSparkId = firstIncomplete?.id ?? undefined;

    // 4. DTO NORMALIZATION (STRICT CONTRACT)
    const normalizedSparks: SparkDTO[] = sparks.map((spark) => ({
      id: spark.id,
      journeyId: spark.journeyId ?? null,

      order: spark.order,

      title: spark.title,
      slug: spark.slug,
      description: spark.description ?? undefined,

      category: spark.category,
      difficulty: spark.difficulty,

      xpReward: spark.xpReward,

      imageThumbnail: spark.imageThumbnail ?? undefined,
      icon: spark.icon ?? undefined,

      // theme color fix (engine-safe naming)
      color: spark.themeColor ?? undefined,

      isPublished: spark.isPublished,
      timeEstimate: spark.timeEstimate ?? undefined,

      status: spark.status,

      createdAt: spark.createdAt,
      updatedAt: spark.updatedAt,

      contentBlocks: spark.contentBlocks ?? [],
      exercises: spark.exercises ?? [],
      vocabulary: spark.vocabulary ?? [],
    }));

    // 5. ENGINE (single source of truth)
    const engineResult = buildSparkJourneyState({
      sparks: normalizedSparks,
      completedSparkIds: Array.from(completedIds),
      currentSparkId,
    });

    const { sparks: processedSparks, nextSpark, stats } = engineResult;

    // 6. JOURNEY DTO (clean boundary)
    const normalizedJourney = {
      id: journey.id,
      slug: journey.slug,
      title: journey.title,
      description: journey.description ?? undefined,
      color: journey.color ?? undefined,
      icon: journey.icon ?? undefined,
    };

    return NextResponse.json({
      success: true,
      journey: normalizedJourney,
      stats,
      nextSpark,
      sparks: processedSparks,
    });
  } catch (error: unknown) {
    console.error("[JOURNEY_ENGINE_ERROR]", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load journey",
      },
      { status: 500 }
    );
  }
}