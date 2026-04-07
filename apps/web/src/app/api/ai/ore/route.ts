import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const prompt = `
You are Ọ̀rẹ́, a Yoruba conversation partner.

Speak naturally in Yoruba and English (where needed).
Encourage the user to respond.

User says:
"${message}"
`;

    const reply = await generateAIResponse(prompt);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Ọ̀rẹ́ AI Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}