import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkDatabaseHealth() {
  try {
    // Simple lightweight query
    const result = await prisma.$queryRaw`SELECT 1 as ok`;

    return {
      status: "healthy",
      db: result,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    return {
      status: "unhealthy",
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  } finally {
    await prisma.$disconnect();
  }
}