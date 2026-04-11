import { db } from "@/lib/db";
import { ContentStatus } from "@prisma/client";
import ContinueLearningCard from "@/components/dashboard/ContinueLearningCard";
import SparksCarousel from "@/components/dashboard/SparksCarousel";
import JourneyPath from "@/components/dashboard/JourneyPath";
import AIHub from "@/components/dashboard/AIHub";
import RightPanel from "@/components/dashboard/RightPanel";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Leaderboard from "@/components/dashboard/Leaderboard";
import Milestones from "@/components/dashboard/Milestones";
import { Spark } from "@/types/spark";

export const dynamic = "force-dynamic";

const FALLBACKS = {
  IMAGE: "/assets/placeholders/zabbot-spark.jpg",
  XP: 50,
  TIME: 5,
};

// 🔥 BASE FORMATTER (NO STATUS LOGIC)
const baseFormatSpark = (s: any): Spark => ({
  id: s.id,
  title: s.title,
  description: s.description ?? "",
  slug: s.slug,
  duration: `${s.timeEstimate ?? FALLBACKS.TIME}m`,
  xp: s.xpReward ?? FALLBACKS.XP,
  image: s.imageThumbnail ?? FALLBACKS.IMAGE,
  thumbnail: s.imageThumbnail ?? FALLBACKS.IMAGE,
  contentStatus: s.status,
  uiStatus: "locked",
  isPremium: false,
  createdAt: s.createdAt ?? new Date(),
});

// 🔥 JOURNEY ENGINE (CORE LOGIC)
function computeJourneyState(
  sparks: Spark[],
  progressMap: Map<string, any>
): Spark[] {
  let foundActive = false;

  return sparks.map((spark) => {
    const progress = progressMap.get(spark.id);

    if (progress?.completed) {
      return { ...spark, uiStatus: "completed" };
    }

    if (!foundActive) {
      foundActive = true;
      return { ...spark, uiStatus: "active" };
    }

    return { ...spark, uiStatus: "locked" };
  });
}

async function getDashboardData(userId: string) {
  try {
    const [sparksRaw, journeyRaw, progressRaw, todaysWord] =
      await Promise.all([
        db.spark.findMany({
          where: {
            status: "ACTIVE" as ContentStatus,
          },
          orderBy: { createdAt: "asc" },
          take: 12,
        }),
        db.journey.findFirst({
          where: { status: "ACTIVE" as ContentStatus },
          include: {
            sparks: {
              where: { status: "ACTIVE" as ContentStatus },
              orderBy: { order: "asc" },
            },
          },
        }),
        db.userLessonProgress.findMany({ where: { userId } }),
        db.todaysWord.findFirst({ orderBy: { displayDate: "desc" } }),
      ]);

    const progressMap = new Map(
      progressRaw.map((p) => [p.sparkId, p])
    );

    // 🔹 DAILY SPARKS (UNCHANGED LOGIC)
    const sparks = sparksRaw.map((s) => {
      const base = baseFormatSpark(s);
      return {
        ...base,
        uiStatus: progressMap.get(s.id)?.completed
          ? "completed"
          : progressMap.has(s.id)
          ? "active"
          : "locked",
      };
    });

    // 🔥 JOURNEY SPARKS (NEW LOGIC)
    const journeyBase =
      journeyRaw?.sparks.map(baseFormatSpark) || [];

    const journeySparks = computeJourneyState(
      journeyBase,
      progressMap
    );

    // 🔥 CONTINUE LEARNING (SMART SELECTION)
    const activeSpark = journeySparks.find(
      (s) => s.uiStatus === "active"
    );

    const continueSpark =
      activeSpark ||
      journeySparks[journeySparks.length - 1] ||
      sparks[0];

    return {
      sparks,
      journeySparks,
      continueSpark,
      todaysWord,
    };
  } catch (error) {
    console.error("Critical Dashboard Error:", error);
    return {
      sparks: [],
      journeySparks: [],
      continueSpark: null,
      todaysWord: null,
    };
  }
}

export default async function DashboardPage() {
  const userId = "user_debug_123";

  const {
    sparks,
    journeySparks,
    continueSpark,
    todaysWord,
  } = await getDashboardData(userId);

  return (
    <DashboardLayout>
      <div className="space-y-12 animate-in fade-in duration-700">
        {/* CTA */}
        {continueSpark && (
          <ContinueLearningCard spark={continueSpark} />
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="xl:col-span-8 space-y-12">
            <section>
              <h2 className="text-xl font-black text-[#162B6E] mb-6 flex items-center gap-2">
                Your Daily Sparks
              </h2>
              <SparksCarousel sparks={sparks} />
            </section>

            <section className="bg-white rounded-[2rem] p-8 border border-slate-200/50 shadow-sm">
              <h2 className="text-xl font-black text-[#162B6E] mb-8">
                Learning Journey
              </h2>
              <JourneyPath sparks={journeySparks} />
            </section>

            <AIHub />
          </div>

          <div className="xl:col-span-4 space-y-8">
            <RightPanel word={todaysWord ?? undefined} />

            <Leaderboard
              leaderboard={[
                {
                  user: { name: "Bọ́lá", avatar: "B" },
                  totalXP: 12450,
                  rank: 1,
                },
                {
                  user: { name: "Erete", avatar: "E" },
                  totalXP: 11200,
                  rank: 2,
                },
              ]}
            />

            <Milestones
              progress={75}
              nextMilestone={{ level: 2, xpRequired: 5000 }}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}