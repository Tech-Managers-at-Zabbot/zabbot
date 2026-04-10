"use client";

import { useState } from "react";

export function useOreAI() {
  const [loading, setLoading] = useState(false);

  /**
   * Sends a prompt to the Ore AI endpoint and returns the full text.
   * Also allows streaming inside the component if desired.
   */
  async function sendPrompt(
    prompt: string,
    onChunk?: (chunk: string) => void // optional streaming callback
  ): Promise<string> {
    setLoading(true);

    const res = await fetch("/api/ai/ore", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    if (!res.body) {
      setLoading(false);
      return "";
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;

      // Callback to stream to component in real time
      if (onChunk) onChunk(chunk);
    }

    setLoading(false);
    return fullText;
  }

  return { loading, sendPrompt };
}