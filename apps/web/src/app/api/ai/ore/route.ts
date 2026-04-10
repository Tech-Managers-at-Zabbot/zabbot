import { NextResponse } from "next/server";
import { streamOreResponse } from "@/lib/ai/ore";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

    const stream = await streamOreResponse(prompt);
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("STREAM ERROR:", error);
    return NextResponse.json({ error: "Streaming failed" }, { status: 500 });
  }
}