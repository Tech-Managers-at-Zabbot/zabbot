import { NextRequest } from "next/server";
import { contentEventBus } from "@/server/events/contentEventBus";

// 🚨 CRITICAL: prevent static generation & caching
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs"; // ✅ ensures proper streaming support

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // ✅ send initial connection event (important for some clients)
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: "connected" })}\n\n`)
      );

      const send = (event: any) => {
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
          );
        } catch (err) {
          console.error("SSE send error:", err);
        }
      };

      const unsubscribe = contentEventBus.subscribe(send);

      // ✅ handle client disconnect properly
      const abortHandler = () => {
        unsubscribe();
        try {
          controller.close();
        } catch (e) {
          console.warn("Stream already closed");
        }
      };

      req.signal.addEventListener("abort", abortHandler);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no", // ✅ important for proxies (NGINX)
    },
  });
}