import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items = body.items || (Array.isArray(body) ? body : [body]);

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const results = [];

    for (const item of items) {
      if (!item?.title) continue;

      try {
        const slug =
          item.slug ||
          item.title.toLowerCase().replace(/\s+/g, "-").trim();

        const spark = await db.spark.upsert({
          where: { slug },
          update: {},
          create: {
            title: item.title,
            description: item.description || "",
            slug,
            category: item.category || "LANGUAGE",
            difficulty: item.difficulty || "BEGINNER",
            xpReward: item.xpReward || 50,
            isPublished: item.isPublished ?? false,
          },
        });

        results.push(spark);
      } catch (err) {
        console.error("[SPARK_CREATE_ERROR]", err);
      }
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      items: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sparks = await db.spark.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        vocabulary: true,
        exercises: true,
        contentBlocks: true,
      },
    });

    return NextResponse.json({ success: true, items: sparks });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}