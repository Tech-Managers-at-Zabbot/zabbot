import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper to generate slug if missing
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

export async function POST(req: NextRequest) {
  try {
    const { journeys, sparks, contentBlocks, exercises, vocabulary } = await req.json();

    // 1. Journeys - Use slug as the unique identifier
    for (const j of journeys) {
      const generatedSlug = j.slug || slugify(j.title);
      await prisma.journey.upsert({
        where: { slug: generatedSlug },
        update: {
          title: j.title,
          description: j.description,
          order: Number(j.order),
          color: j.color,
          imageThumbnail: j.imageThumbnail,
          status: j.status || "DRAFT",
        },
        create: {
          title: j.title,
          slug: generatedSlug,
          description: j.description,
          order: Number(j.order),
          color: j.color,
          imageThumbnail: j.imageThumbnail,
          status: j.status || "DRAFT",
        },
      });
    }

    // 2. Sparks
    for (const s of sparks) {
      // Find journey by title since Spark data usually references parent by name
      const journey = await prisma.journey.findFirst({
        where: { title: s.journeyTitle },
      });

      if (!journey) {
        console.warn(`Journey not found for spark: ${s.title}`);
        continue;
      }

      await prisma.spark.upsert({
        where: { slug: s.slug },
        update: {
          title: s.title,
          description: s.description,
          category: s.category,
          difficulty: s.difficulty,
          xpReward: Number(s.xpReward),
          duration: Number(s.duration),
          overlayType: s.overlayType,
          imageThumbnail: s.imageThumbnail,
          status: s.status || "DRAFT",
          journeyId: journey.id,
        },
        create: {
          title: s.title,
          slug: s.slug,
          description: s.description,
          category: s.category,
          difficulty: s.difficulty,
          xpReward: Number(s.xpReward),
          duration: Number(s.duration),
          overlayType: s.overlayType,
          imageThumbnail: s.imageThumbnail,
          status: s.status || "DRAFT",
          journeyId: journey.id,
        },
      });
    }

    // 3. ContentBlocks - Avoid Duplicates
    // We clear existing blocks for the sparks being updated to prevent stacking same content
    const sparkSlugs = [...new Set(contentBlocks.map((cb: any) => cb.sparkSlug))];
    await prisma.contentBlock.deleteMany({
      where: { spark: { slug: { in: sparkSlugs as string[] } } }
    });

    for (const cb of contentBlocks) {
      const spark = await prisma.spark.findUnique({
        where: { slug: cb.sparkSlug },
      });

      if (spark) {
        await prisma.contentBlock.create({
          data: {
            type: cb.type,
            order: Number(cb.order),
            yoruba: cb.yoruba,
            translation: cb.translation,
            grammar: cb.grammar,
            audioUrl: cb.audioUrl,
            sparkId: spark.id,
          },
        });
      }
    }

    // 4. Exercises - Avoid Duplicates
    const exerciseSparkSlugs = [...new Set(exercises.map((ex: any) => ex.sparkSlug))];
    await prisma.exercise.deleteMany({
      where: { spark: { slug: { in: exerciseSparkSlugs as string[] } } }
    });

    for (const ex of exercises) {
      const spark = await prisma.spark.findUnique({
        where: { slug: ex.sparkSlug },
      });

      if (spark) {
        await prisma.exercise.create({
          data: {
            question: ex.question,
            options: Array.isArray(ex.options) ? ex.options : ex.options.split(";"),
            correctIndex: Number(ex.correctIndex),
            explanation: ex.explanation,
            sparkId: spark.id,
          },
        });
      }
    }

    // 5. Vocabulary
    for (const v of vocabulary) {
      const spark = await prisma.spark.findUnique({
        where: { slug: v.sparkSlug },
      });

      await prisma.vocabulary.upsert({
        where: { yorubaWord: v.yorubaWord },
        update: {
          englishTranslation: v.englishTranslation,
          exampleSentence: v.exampleSentence,
          maleAudioUrl: v.audioUrl,
          sparkId: spark?.id,
        },
        create: {
          yorubaWord: v.yorubaWord,
          englishTranslation: v.englishTranslation,
          exampleSentence: v.exampleSentence,
          maleAudioUrl: v.audioUrl,
          sparkId: spark?.id,
        },
      });
    }

    return NextResponse.json({ success: true, message: "Content synced successfully" });

  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}