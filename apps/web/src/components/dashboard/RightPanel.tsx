"use client";

import { useState } from "react";
import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PulseMiniCard from "./right/PulseMiniCard";
import WordOfTheDayCard from "./right/WordOfTheDayCard";

interface RightPanelProps {
  word?: {
    word: string;
    phonetic: string;
    meaning: string;
  };
}

export default function RightPanel({ word }: RightPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="xl:hidden mb-4 px-4 py-2 bg-[#162B6E] text-white rounded-xl font-semibold"
        onClick={() => setIsOpen(true)}
      >
        Open Dashboard Panel
      </button>

      {/* Slide-over for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="w-3/4 sm:w-1/2 bg-white dark:bg-gray-900 p-6 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="mb-4 px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>

              <div className="space-y-6">
                <SuspenseFallback>
                  <PulseMiniCard />
                  <WordOfTheDayCard word={word ?? null} />
                </SuspenseFallback>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Static Panel */}
      <div className="hidden xl:block space-y-6">
        <SuspenseFallback>
          <PulseMiniCard />
          <WordOfTheDayCard word={word ?? null} />
        </SuspenseFallback>
      </div>
    </>
  );
}

/* Mini Suspense Fallback Wrapper */
function SuspenseFallback({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<MiniRightPanelLoader />}>{children}</Suspense>
  );
}

/* Mini Loader for cards */
function MiniRightPanelLoader() {
  return (
    <div className="space-y-4">
      <div className="h-28 bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse" />
      <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse" />
    </div>
  );
}