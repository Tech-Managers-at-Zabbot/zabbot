"use client";

import React from "react";
import { History, Plus, Settings } from "lucide-react";

interface OreMobileNavProps {
  onHistoryClick?: () => void;
  onNewClick?: () => void;
  onSettingsClick?: () => void;
}

export default function OreMobileNav({ onHistoryClick, onNewClick, onSettingsClick }: OreMobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-700/50 flex justify-around py-3 lg:hidden shadow-inner z-50">
      <button onClick={onHistoryClick} className="flex flex-col items-center text-slate-700 dark:text-slate-200 hover:text-blue-500 transition-colors">
        <History size={24} />
        <span className="text-xs mt-1">History</span>
      </button>

      <button onClick={onNewClick} className="flex flex-col items-center text-slate-700 dark:text-slate-200 hover:text-blue-500 transition-colors">
        <Plus size={24} />
        <span className="text-xs mt-1">New</span>
      </button>

      <button onClick={onSettingsClick} className="flex flex-col items-center text-slate-700 dark:text-slate-200 hover:text-blue-500 transition-colors">
        <Settings size={24} />
        <span className="text-xs mt-1">Settings</span>
      </button>
    </nav>
  );
}