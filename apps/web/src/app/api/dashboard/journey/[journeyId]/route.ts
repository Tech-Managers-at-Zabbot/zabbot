import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildSparkUI } from "@/server/journey/buildSparkUI";

export async function GET(
  req: NextRequest,
  { params }: { params: { journeyId: string } }
) {
  try {
    const userId = "demo-user-id"; // replace with auth later

    const journey = await prisma.journey.findUnique({
      where: { id: params.journeyId },
      include: {
        sparks: true,
      },
    });

    if (!journey) {
      return NextResponse.json({ error: "Journey not found" }, { status: 404 });
    }

    const progress = await prisma.userLessonProgress.findMany({
      where: {
        userId,
        spark: {
          journeyId: params.journeyId,
        },
      },
    });

    const sparksWithUI = buildSparkUI(journey.sparks, progress);

    return NextResponse.json({
      journey: {
        id: journey.id,
        title: journey.title,
        description: journey.description,
      },
      sparks: sparksWithUI,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to load journey" },
      { status: 500 }
    );
  }
}