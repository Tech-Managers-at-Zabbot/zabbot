import { NextResponse } from "next/server";
import { importContent } from "@/lib/import/importContent";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const sheets = body.sheets;

    if (!sheets) {
      return NextResponse.json(
        {
          success: false,
          error: "No sheets provided",
        },
        { status: 400 }
      );
    }

    const result = await importContent(sheets, {
      dryRun: body.dryRun,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Import failed",
      },
      { status: 500 }
    );
  }
}