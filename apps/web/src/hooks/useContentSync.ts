"use client";

import { useEffect } from "react";

export function useContentSync(onUpdate: () => void) {
  useEffect(() => {
    const eventSource = new EventSource("/api/events/content");

    eventSource.onmessage = () => {
      onUpdate();
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [onUpdate]);
}