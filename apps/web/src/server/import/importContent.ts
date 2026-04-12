import { prisma } from "@/lib/prisma";
import { contentEventBus } from "@/server/events/contentEventBus";

/**
 * TYPES
 */
type ImportOptions = {
  dryRun?: boolean;
};

type SheetsPayload = {
  journeys?: any[];
  sparks?: any[];
  contentBlocks?: any[];
  exercises?: any[];
  vocabulary?: any[];
};

type ImportResult = {
  success: boolean;
  message?: string;
  stats?: {
    journeys: number;
    sparks: number;
    contentBlocks: number;
    exercises: number;
    vocabulary: number;
  };
  preview?: SheetsPayload;
  errors?: string[];
};

/**
 * MAIN IMPORT FUNCTION
 */
export async function importContent(
  sheets: SheetsPayload,
  options?: ImportOptions
): Promise<ImportResult> {
  const dryRun = options?.dryRun ?? false;

  /**
   * 🧪 DRY RUN MODE (NO DB WRITES)
   */
  if (dryRun) {
    return {
      success: true,
      message: "Dry run successful",
      preview: sheets,
    };
  }

  /**
   * 🚨 REAL IMPORT (TRANSACTION)
   */
  return await prisma.$transaction(async (tx) => {
    const journeyMap = new Map<string, string>();
    const sparkMap = new Map<string, string>();

    const errors: string[] = [];

    let stats = {
      journeys: 0,
      sparks: 0,
      contentBlocks: 0,
      exercises: 0,
      vocabulary: 0,
    };

    const totalSteps = 5;
    let step = 0;

    /**
     * 🔔 EVENT EMITTER
     */
    const emit = (stage: string, message: string) => {
      contentEventBus.emit({
        stage,
        progress: Math.min(
          100,
          Math.round((++step / totalSteps) * 100)
        ),
        message,
      });
    };

    /**
     * 1. JOURNEYS
     */
    emit("journeys", "Importing journeys...");

    for (const j of sheets.journeys || []) {
      try {
        if (!j?.slug) {
          errors.push("Journey missing slug");
          continue;
        }

        const journey = await tx.journey.upsert({
          where: { slug: j.slug },
          update: {
            title: j.title,
            description: j.description,
            imageThumbnail: j.imageThumbnail,
            icon: j.icon,
            color: j.color,
            order: Number(j.order ?? 0),
            status: j.status || "DRAFT",
          },
          create: {
            slug: j.slug,
            title: j.title,
            description: j.description,
            imageThumbnail: j.imageThumbnail,
            icon: j.icon,
            color: j.color,
            order: Number(j.order ?? 0),
            status: j.status || "DRAFT",
          },
        });

        journeyMap.set(j.slug, journey.id);
        stats.journeys++;
      } catch (err: any) {
        errors.push(`Journey ${j.slug}: ${err.message}`);
      }
    }

    /**
     * 2. SPARKS
     */
    emit("sparks", "Importing sparks...");

    for (const s of sheets.sparks || []) {
      try {
        if (!s?.slug) {
          errors.push("Spark missing slug");
          continue;
        }

        const journeyId = s.journeySlug
          ? journeyMap.get(s.journeySlug)
          : null;

        const spark = await tx.spark.upsert({
          where: { slug: s.slug },
          update: {
            title: s.title,
            description: s.description,
            journeyId: journeyId ?? undefined,
            category: s.category,
            difficulty: s.difficulty,
            xpReward: Number(s.xpReward ?? 50),
            order: Number(s.order ?? 1),
            isPublished:
              s.isPublished === "true" || s.isPublished === true,
          },
          create: {
            slug: s.slug,
            title: s.title,
            description: s.description,
            journeyId: journeyId ?? undefined,
            category: s.category,
            difficulty: s.difficulty,
            xpReward: Number(s.xpReward ?? 50),
            order: Number(s.order ?? 1),
            isPublished:
              s.isPublished === "true" || s.isPublished === true,
          },
        });

        sparkMap.set(s.slug, spark.id);
        stats.sparks++;
      } catch (err: any) {
        errors.push(`Spark ${s.slug}: ${err.message}`);
      }
    }

    /**
     * 3. CONTENT BLOCKS
     */
    emit("contentBlocks", "Importing content blocks...");

    for (const c of sheets.contentBlocks || []) {
      try {
        if (!c?.sparkSlug) continue;

        const sparkId = sparkMap.get(c.sparkSlug);
        if (!sparkId) {
          errors.push(`ContentBlock missing spark: ${c.sparkSlug}`);
          continue;
        }

        await tx.contentBlock.create({
          data: {
            type: c.type,
            order: Number(c.order ?? 0),
            yoruba: c.yoruba,
            translation: c.translation,
            grammar: c.grammar,
            audioUrl: c.audioUrl,
            videoUrl: c.videoUrl,
            fileUrl: c.fileUrl,
            sparkId,
          },
        });

        stats.contentBlocks++;
      } catch (err: any) {
        errors.push(`ContentBlock error: ${err.message}`);
      }
    }

    /**
     * 4. EXERCISES
     */
    emit("exercises", "Importing exercises...");

    for (const e of sheets.exercises || []) {
      try {
        if (!e?.sparkSlug) continue;

        const sparkId = sparkMap.get(e.sparkSlug);
        if (!sparkId) {
          errors.push(`Exercise missing spark: ${e.sparkSlug}`);
          continue;
        }

        await tx.exercise.create({
          data: {
            type: e.type,
            question: e.question,
            options: e.options ? e.options.split("|") : [],
            correctIndex: Number(e.correctIndex ?? 0),
            correctAnswer: e.correctAnswer,
            explanation: e.explanation,
            sparkId,
          },
        });

        stats.exercises++;
      } catch (err: any) {
        errors.push(`Exercise error: ${err.message}`);
      }
    }

    /**
     * 5. VOCABULARY
     */
    emit("vocabulary", "Importing vocabulary...");

    for (const v of sheets.vocabulary || []) {
      try {
        if (!v?.yorubaWord) continue;

        const vocab = await tx.vocabulary.upsert({
          where: { yorubaWord: v.yorubaWord },
          update: {
            englishTranslation: v.englishTranslation,
            exampleSentence: v.exampleSentence,
            tones: v.tones,
          },
          create: {
            yorubaWord: v.yorubaWord,
            englishTranslation: v.englishTranslation,
            exampleSentence: v.exampleSentence,
            tones: v.tones,
          },
        });

        const sparkId = v.sparkSlug
          ? sparkMap.get(v.sparkSlug)
          : null;

        if (sparkId) {
          await tx.sparkVocabulary.upsert({
            where: {
              sparkId_vocabularyId: {
                sparkId,
                vocabularyId: vocab.id,
              },
            },
            update: {},
            create: {
              sparkId,
              vocabularyId: vocab.id,
            },
          });
        }

        stats.vocabulary++;
      } catch (err: any) {
        errors.push(`Vocabulary error: ${err.message}`);
      }
    }

    /**
     * ✅ FINAL EVENT
     */
    contentEventBus.emit({
      stage: "complete",
      progress: 100,
      message: "Import completed successfully",
    });

    /**
     * FINAL RESPONSE
     */
    return {
      success: errors.length === 0,
      stats,
      errors,
    };
  });
}