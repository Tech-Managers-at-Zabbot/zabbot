"use client";

import { useState, useRef, useEffect } from "react";
import { useOreAI } from "@/hooks/useOreAI";

export default function OreChat() {
  const [input, setInput] = useState("");
  const [oreResponse, setOreResponse] = useState(""); // Streaming response
  const [isTyping, setIsTyping] = useState(false); // For cursor effect
  const { sendPrompt } = useOreAI();
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when new characters appear
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [oreResponse]);

  // Handle prompt submission
  const handleAskOre = async () => {
    if (!input.trim()) return;

    setOreResponse(""); // Reset previous response
    setIsTyping(true);

    // Get full AI response from your hook
    const fullResponse = await sendPrompt(input);

    // Stream response character by character
    let i = 0;
    const interval = setInterval(() => {
      setOreResponse((prev) => prev + fullResponse[i]);
      i++;
      if (i >= fullResponse.length) {
        clearInterval(interval);
        setIsTyping(false); // Stop blinking cursor if you want
      }
    }, 20); // 20ms per character

    setInput(""); // Clear input after sending
  };

  return (
    <div className="p-4 space-y-4">
      {/* Input Box */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Ore anything in Yoruba..."
        className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />

      {/* Submit Button */}
      <button
        onClick={handleAskOre}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Ask Ore
      </button>

      {/* AI Response Box */}
      <div
        ref={containerRef}
        className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded min-h-[100px] max-h-64 overflow-y-auto whitespace-pre-wrap ore-response"
      >
        {oreResponse}
        {isTyping && <span className="inline-block">|</span>}
      </div>
    </div>
  );
}