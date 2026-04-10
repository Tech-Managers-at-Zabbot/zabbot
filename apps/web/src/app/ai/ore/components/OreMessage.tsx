"use client";

import React, { memo } from "react";
import Image from "next/image";

export interface OreMessageProps {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const OreMessage = memo(function OreMessage({ sender, text }: OreMessageProps) {
  const isUser = sender === "user";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <Image
          src="/mascots/Ore.png"
          alt="Ore"
          width={40}
          height={40}
          className="rounded-full border border-gray-200 dark:border-gray-700 shadow-sm"
        />
      )}

      <div
        className={`px-4 py-2 max-w-[70%] rounded-2xl break-words whitespace-pre-wrap
        ${isUser ? "bg-blue-500 text-white rounded-br-none" : "bg-white/30 dark:bg-gray-800/30 text-slate-900 dark:text-slate-200 rounded-bl-none"}
        shadow-sm transition-all`}
      >
        {text}
      </div>
    </div>
  );
});

export default OreMessage;