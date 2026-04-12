import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/server/lib/cloudinary";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const url = await uploadImage(file);

  return NextResponse.json({ url });
}