import { db } from "@/lib/db";

type SheetInput = any;

type ImportOptions = {
  dryRun?: boolean;
};

function toBool(value: any): boolean {
  return value === true || value === "true" || value === 1;
}

function toNumber(value: any, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function safeArray(input: any): any[] {
  return Array.isArray(input) ? input : [];
}

/**
 * =========================
 * MAIN IMPORT ENGINE
 * =========================
 */

export async function importContent(
  sheets: SheetInput,
  options?: ImportOptions
) {
  if (!sheets) {
    throw new Error("No sheets data provided");
  }

  const dryRun = options?.dryRun ?? false;

  /**
   * 🧪 DRY RUN MODE
   */
  if (dryRun) {
    return {
      success: true,
      message: "Dry run successful",
      preview: sheets,
    };
  }

  const report = {
    journeys: 0,
    sparks: 0,
    contentBlocks: 0,
    exercises: 0,
    vocabulary: 0,
    errors: [] as any[],
  };

  return await db.$transaction(async (tx) => {
    const journeyMap = new Map<string, string>();
    const sparkMap = new Map<string, string>();

    /**
     * 1. JOURNEYS
     */
    for (const j of safeArray(sheets.journeys)) {
      if (!j?.slug) {
        report.errors.push({ type: "journey", reason: "missing slug", data: j });
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
          order: toNumber(j.order),
          status: j.status || "DRAFT",
        },
        create: {
          slug: j.slug,
          title: j.title,
          description: j.description,
          imageThumbnail: j.imageThumbnail,
          icon: j.icon,
          color: j.color,
          order: toNumber(j.order),
          status: j.status || "DRAFT",
        },
      });

      journeyMap.set(j.slug, journey.id);
      report.journeys++;
    }

    /**
     * 2. SPARKS
     */
    for (const s of safeArray(sheets.sparks)) {
      if (!s?.slug) {
        report.errors.push({ type: "spark", reason: "missing slug", data: s });
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
          journeyId,
          category: s.category,
          difficulty: s.difficulty,
          xpReward: toNumber(s.xpReward, 50),
          order: toNumber(s.order, 1),
          isPublished: toBool(s.isPublished),
        },
        create: {
          slug: s.slug,
          title: s.title,
          description: s.description,
          journeyId,
          category: s.category,
          difficulty: s.difficulty,
          xpReward: toNumber(s.xpReward, 50),
          order: toNumber(s.order, 1),
          isPublished: toBool(s.isPublished),
        },
      });

      sparkMap.set(s.slug, spark.id);
      report.sparks++;
    }

    /**
     * 3. CONTENT BLOCKS
     */
    for (const c of safeArray(sheets.contentBlocks)) {
      const sparkId = c.sparkSlug ? sparkMap.get(c.sparkSlug) : null;

      if (!sparkId) {
        report.errors.push({
          type: "contentBlock",
          reason: "missing spark relation",
          data: c,
        });
        continue;
      }

      await tx.contentBlock.create({
        data: {
          type: c.type,
          order: toNumber(c.order),
          yoruba: c.yoruba,
          translation: c.translation,
          grammar: c.grammar,
          audioUrl: c.audioUrl,
          videoUrl: c.videoUrl,
          fileUrl: c.fileUrl,
          sparkId,
        },
      });

      report.contentBlocks++;
    }

    /**
     * 4. EXERCISES
     */
    for (const e of safeArray(sheets.exercises)) {
      const sparkId = e.sparkSlug ? sparkMap.get(e.sparkSlug) : null;

      if (!sparkId) {
        report.errors.push({
          type: "exercise",
          reason: "missing spark relation",
          data: e,
        });
        continue;
      }

      await tx.exercise.create({
        data: {
          type: e.type,
          question: e.question,
          options: e.options ? e.options.split("|") : [],
          correctIndex: toNumber(e.correctIndex),
          correctAnswer: e.correctAnswer,
          explanation: e.explanation,
          sparkId,
        },
      });

      report.exercises++;
    }

    /**
     * 5. VOCABULARY
     */
    for (const v of safeArray(sheets.vocabulary)) {
      if (!v?.yorubaWord) {
        report.errors.push({
          type: "vocabulary",
          reason: "missing yorubaWord",
          data: v,
        });
        continue;
      }

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

      const sparkId = v.sparkSlug ? sparkMap.get(v.sparkSlug) : null;

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

      report.vocabulary++;
    }

    return {
      success: true,
      report,
    };
  });
}