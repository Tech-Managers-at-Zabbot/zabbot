"use client";

import React, { memo } from "react";
import { OreMessageProps } from "./OreMessage";

interface HistoryItem {
  id: string;
  text: string;
  timestamp: string;
}

interface OreHistoryProps {
  history: HistoryItem[];
  activeId?: string;
  onSelect?: (text: string) => void;
}

const OreHistory = memo(({ history, activeId, onSelect }: OreHistoryProps) => {
  if (!history.length) return <p className="text-sm text-slate-400 dark:text-slate-500">No history yet.</p>;

  return (
    <ul className="flex flex-col gap-2">
      {history.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => onSelect?.(item.text)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-blue-100 dark:hover:bg-gray-700
              ${activeId === item.id ? "bg-blue-200 dark:bg-gray-600 font-bold" : "bg-white/30 dark:bg-gray-800/30"}`}
          >
            {item.text.length > 60 ? item.text.slice(0, 60) + "…" : item.text}
          </button>
        </li>
      ))}
    </ul>
  );
});

export default OreHistory;