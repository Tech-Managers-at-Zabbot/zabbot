import { Spark } from "@prisma/client";
import { SparkCardVM } from "@/types/view-models";

const FALLBACKS = {
  IMAGE: "/assets/placeholders/zabbot-spark.png",
  XP: 50,
  TIME: 5,
};

export function mapSparkToCardVM(s: Spark): SparkCardVM {
  return {
    id: s.id,
    title: s.title,
    description: s.description ?? "",
    slug: s.slug,

    duration: `${s.timeEstimate ?? FALLBACKS.TIME}m`,
    xp: s.xpReward ?? FALLBACKS.XP,

    image: s.imageThumbnail ?? FALLBACKS.IMAGE,
    thumbnail: s.imageThumbnail ?? FALLBACKS.IMAGE,

    uiStatus: "locked", // assigned later
  };
}