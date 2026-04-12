"use client";

import { useMemo, useState, useCallback } from "react";
import { SparkCardVM } from "@/types/view-models";
import { createJourneyEngine } from "@/lib/journey/engine";

export function useJourneyEngine(sparks: SparkCardVM[]) {
  const [activeId, setActiveId] = useState<string | null>(
    sparks?.[0]?.id ?? null
  );

  const [completed, setCompleted] = useState<Set<string>>(
    () => new Set()
  );

  /**
   * ✅ Engine is pure derived state
   */
  const engine = useMemo(() => {
    return createJourneyEngine(sparks, {
      activeId,
      completed,
    });
  }, [sparks, activeId, completed]);

  /**
   * ✅ Mark completion safely
   */
  const completeActive = useCallback(() => {
    if (!engine.activeSpark) return;

    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(engine.activeSpark!.id);
      return next;
    });

    const nextSpark =
      engine.queue.find((s) => !completed.has(s.id)) || null;

    setActiveId(nextSpark?.id ?? null);
  }, [engine, completed]);

  /**
   * ✅ Manual navigation
   */
  const setActive = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return {
    ...engine,

    activeId,
    setActiveId: setActive,

    completeActive,
  };
}