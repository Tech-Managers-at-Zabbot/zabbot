import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { yoruba, english, tones, audio } = body;

    if (!yoruba) {
      return new NextResponse("Yoruba word is required", { status: 400 });
    }

    // 1. DATABASE UPSERT
    // The @unique constraint on yorubaWord in schema.prisma 
    // allows us to use it in the 'where' clause.
    const practiceItem = await db.vocabulary.upsert({
      where: { 
        yorubaWord: yoruba 
      },
      update: {
        englishTranslation: english || "",
        tones: tones || "", // Supporting the Do-Re-Mi visual logic
        maleAudioUrl: audio.male,
        femaleAudioUrl: audio.female,
        updatedAt: new Date(),
      },
      create: {
        yorubaWord: yoruba,
        englishTranslation: english || "",
        tones: tones || "",
        maleAudioUrl: audio.male,
        femaleAudioUrl: audio.female,
      },
    });

    return NextResponse.json(practiceItem);
  } catch (error) {
    console.error("[PRACTICE_ITEMS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**
 * GET handler to fetch current practice set
 * Aligned with Zabbot Design System MVP
 */
export async function GET() {
  try {
    const items = await db.vocabulary.findMany({
      take: 20,
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("[PRACTICE_ITEMS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}