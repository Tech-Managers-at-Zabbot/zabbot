// 🔒 DB ENUM MIRROR (must always match Prisma)
export type ContentStatus = "DRAFT" | "ACTIVE" | "LOCKED" | "ARCHIVED";

// 🎮 UI STATE (derived from user progress)
export type SparkUIStatus = "completed" | "active" | "locked";

// 🧠 CORE DOMAIN MODEL (what UI consumes)
export interface Spark {
  id: string;
  title: string;
  description: string;
  slug: string;

  // 🎯 Display-ready fields (normalized from DB)
  duration: string;     // "15m"
  xp: number;
  image: string;
  thumbnail: string;    // ✅ Added

  // 🧱 Admin-controlled state (source of truth)
  contentStatus: ContentStatus;

  // 🎮 User-specific state (computed at runtime)
  uiStatus?: SparkUIStatus;

  // 💰 Monetization (future-ready)
  isPremium: boolean;

  // 🌍 Cultural storytelling
  proverbYoruba?: string;
  proverbEnglish?: string;
  honorificRule?: string;

  // 🕒 Metadata
  createdAt?: Date;

  // ⚡ OPTIONAL RAW FIELDS (for advanced UI logic)
  timeEstimate?: number;
  xpReward?: number;
  imageThumbnail?: string;
}