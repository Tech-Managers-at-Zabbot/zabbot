import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { lessonId: string } }
) {
  try {
    const sparkId = params.lessonId;

    const spark = await db.spark.findUnique({
      where: { id: sparkId },
      include: {
        vocabulary: true,
      },
    });

    if (!spark) {
      return NextResponse.json(
        { success: false, error: "Spark not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      lesson: {
        id: spark.id,
        title: spark.title,
      },
      items: spark.vocabulary,
      totalItems: spark.vocabulary.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}