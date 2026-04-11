import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

type PracticeItemInput = {
  english: string;
  yoruba: string;
  tones?: string[];
  audio?: {
    male?: string;
    female?: string;
  };
  lessonId?: string;
};

function normalizeTones(tones?: string[] | string) {
  if (!tones) return "";
  return Array.isArray(tones) ? tones.join(" ") : String(tones);
}

function normalizeAudio(audio?: PracticeItemInput["audio"]) {
  return {
    male: audio?.male || "",
    female: audio?.female || "",
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const rawItems =
      body.items || (Array.isArray(body) ? body : [body]);

    const items: PracticeItemInput[] = Array.isArray(rawItems)
      ? rawItems
      : [rawItems];

    if (!items.length) {
      return NextResponse.json(
        { success: false, error: "No items provided" },
        { status: 400 }
      );
    }

    const globalLessonId = body.lessonId || null;

    let successCount = 0;

    const results = await Promise.all(
      items.map(async (item) => {
        try {
          if (!item?.yoruba || !item?.english) {
            return null;
          }

          const lessonId =
            item.lessonId || globalLessonId || null;

          const result = await db.vocabulary.upsert({
            where: {
              yorubaWord: item.yoruba,
            },
            update: {
              englishTranslation: item.english,
              tones: normalizeTones(item.tones),
              maleAudioUrl: normalizeAudio(item.audio).male,
              femaleAudioUrl: normalizeAudio(item.audio).female,
              lessonId,
              updatedAt: new Date(),
            },
            create: {
              yorubaWord: item.yoruba,
              englishTranslation: item.english,
              tones: normalizeTones(item.tones),
              maleAudioUrl: normalizeAudio(item.audio).male,
              femaleAudioUrl: normalizeAudio(item.audio).female,
              lessonId,
            },
          });

          successCount++;
          return result;
        } catch (err) {
          console.error(
            "[PRACTICE_ITEM_UPSERT_ERROR]",
            {
              item,
              error: err,
            }
          );
          return null;
        }
      })
    );

    return NextResponse.json({
      success: true,
      message: "Practice items synced successfully",
      total: items.length,
      successCount,
      failedCount: items.length - successCount,
      lessonId: globalLessonId,
      items: results.filter(Boolean),
    });
  } catch (error: any) {
    console.error("[PRACTICE_ITEMS_POST]", error);

    return NextResponse.json(
      {
        success: false,
        error: "Upload failed",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lessonId = searchParams.get("lessonId");

    const items = await db.vocabulary.findMany({
      where: lessonId ? { lessonId } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      lessonId: lessonId || null,
      items,
    });
  } catch (error: any) {
    console.error("[PRACTICE_ITEMS_GET]", error);

    return NextResponse.json(
      {
        success: false,
        error: "Database fetch failed",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}