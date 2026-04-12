import { db } from "@/lib/db";
import { ContentStatus, Prisma } from "@prisma/client";

import ContinueLearningCardClient from "@/components/dashboard/ContinueLearningCardClient";
import SparksCarousel from "@/components/dashboard/SparksCarousel";
import JourneyPath from "@/components/dashboard/JourneyPath";
import AIHub from "@/components/dashboard/AIHub";
import RightPanel from "@/components/dashboard/RightPanel";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Leaderboard from "@/components/dashboard/Leaderboard";
import Milestones from "@/components/dashboard/Milestones";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

const FALLBACKS = {
  IMAGE: "/assets/placeholders/zabbot-spark.jpg",
  XP: 50,
  TIME: 5,
};

type SparkUIStatus = "locked" | "active" | "completed";

export interface SparkCardVM {
  id: string;
  title: string;
  description: string;
  slug: string;

  duration: string;
  xp: number;

  image: string;
  thumbnail: string;

  uiStatus: SparkUIStatus;
}

type SparkWithFields = Prisma.SparkGetPayload<{}>;

function toSparkCardVM(s: SparkWithFields): SparkCardVM {
  return {
    id: s.id,
    title: s.title,
    description: s.description ?? "",
    slug: s.slug,

    duration: `${s.timeEstimate ?? FALLBACKS.TIME}m`,
    xp: s.xpReward ?? FALLBACKS.XP,

    image: s.imageThumbnail ?? FALLBACKS.IMAGE,
    thumbnail: s.imageThumbnail ?? FALLBACKS.IMAGE,

    uiStatus: "locked",
  };
}

function applyJourneyState(
  sparks: SparkCardVM[],
  progressMap: Map<string, { completed?: boolean }>
): SparkCardVM[] {
  let activeAssigned = false;

  return sparks.map((spark) => {
    const progress = progressMap.get(spark.id);

    if (progress?.completed) {
      return { ...spark, uiStatus: "completed" };
    }

    if (!activeAssigned) {
      activeAssigned = true;
      return { ...spark, uiStatus: "active" };
    }

    return { ...spark, uiStatus: "locked" };
  });
}

async function getDashboardData(userId: string): Promise<{
  sparks: SparkCardVM[];
  journeySparks: SparkCardVM[];
  continueSpark: SparkCardVM | null;
  todaysWord: Awaited<ReturnType<typeof db.todaysWord.findFirst>>;
}> {
  try {
    const [sparksRaw, journeyRaw, progressRaw, todaysWord] =
      await Promise.all([
        db.spark.findMany({
          where: { status: ContentStatus.ACTIVE },
          orderBy: { createdAt: "asc" },
          take: 12,
        }),

        db.journey.findFirst({
          where: { status: ContentStatus.ACTIVE },
          include: {
            sparks: {
              where: { status: ContentStatus.ACTIVE },
              orderBy: { order: "asc" },
            },
          },
        }),

        db.userLessonProgress.findMany({
          where: { userId },
        }),

        db.todaysWord.findFirst({
          orderBy: { displayDate: "desc" },
        }),
      ]);

    const progressMap = new Map<string, { completed?: boolean }>(
      progressRaw.map((p) => [p.sparkId, { completed: p.completed }])
    );

    const sparks: SparkCardVM[] = sparksRaw.map(toSparkCardVM).map((s) => {
      const progress = progressMap.get(s.id);

      return {
        ...s,
        uiStatus: progress?.completed
          ? "completed"
          : progress
          ? "active"
          : "locked",
      };
    });

    const journeyBase: SparkCardVM[] =
      journeyRaw?.sparks?.map(toSparkCardVM) ?? [];

    const journeySparks = applyJourneyState(
      journeyBase,
      progressMap
    );

    const continueSpark: SparkCardVM | null =
      journeySparks.find((s) => s.uiStatus === "active") ??
      journeySparks.at(-1) ??
      sparks[0] ??
      null;

    return {
      sparks,
      journeySparks,
      continueSpark,
      todaysWord,
    };
  } catch (error) {
    console.error("Dashboard data error:", error);

    return {
      sparks: [],
      journeySparks: [],
      continueSpark: null,
      todaysWord: null,
    };
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  const { sparks, journeySparks, continueSpark, todaysWord } =
    await getDashboardData(session.user.id);

  return (
    <DashboardLayout>
      <div className="space-y-12 animate-in fade-in duration-700">

        {/* ✅ CLIENT WRAPPER HANDLES INTERACTION */}
        {continueSpark && (
          <ContinueLearningCardClient spark={continueSpark} />
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