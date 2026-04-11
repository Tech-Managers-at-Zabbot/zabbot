import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/db-health";

export async function GET() {
  const result = await checkDatabaseHealth();

  if (result.status === "healthy") {
    return NextResponse.json(result, { status: 200 });
  }

  return NextResponse.json(result, { status: 500 });
}