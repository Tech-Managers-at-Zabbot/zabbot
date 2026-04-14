import { PrismaClient } from "@prisma/client";

/**
 * 🚨 SAFETY CHECK (CRITICAL)
 * Prevents silent runtime crashes when env is missing
 */
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

/**
 * 🧠 Prevent multiple Prisma instances in development
 * (Next.js hot reload safe pattern)
 */
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}