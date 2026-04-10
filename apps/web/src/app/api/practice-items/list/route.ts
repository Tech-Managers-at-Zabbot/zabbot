import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Fetching exactly what we see in Prisma Studio
    const items = await db.vocabulary.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ 
      success: true, 
      items: items 
    });
  } catch (error: any) {
    console.error("DATABASE_FETCH_FAILURE:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Database connection failed",
      details: error.message 
    }, { status: 500 });
  }
}