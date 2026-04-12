import { useState, useMemo, useCallback } from "react";
import { SparkCardVM } from "@/types/view-models";

export default function useSparkManager(sparks: SparkCardVM[]) {
  const STACK_SIZE = 2;

  const [activeId, setActiveId] = useState<string | null>(
    sparks?.[0]?.id ?? null
  );

  const [completedSparks, setCompletedSparks] = useState<Set<string>>(
    () => new Set()
  );

  const [currentPage, setCurrentPage] = useState(0);

  /**
   * ✅ VM-safe sorting (NO DB DEPENDENCY)
   * Keeps backend-provided order OR transformation order
   */
  const sortedSparks = useMemo(() => {
    if (!Array.isArray(sparks)) return [];
    return [...sparks];
  }, [sparks]);

  /**
   * ✅ Active spark resolution
   */
  const activeSpark = useMemo(() => {
    return (
      sortedSparks.find((s) => s.id === activeId) ||
      sortedSparks[0] ||
      null
    );
  }, [sortedSparks, activeId]);

  /**
   * ✅ Queue (everything except active)
   */
  const queueSparks = useMemo(() => {
    if (!activeSpark) return sortedSparks;
    return sortedSparks.filter((s) => s.id !== activeSpark.id);
  }, [sortedSparks, activeSpark]);

  /**
   * ✅ Pagination derived safely
   */
  const totalPages = useMemo(() => {
    return Math.ceil(queueSparks.length / STACK_SIZE);
  }, [queueSparks.length]);

  const paginatedSparks = useMemo(() => {
    return queueSparks.slice(
      currentPage * STACK_SIZE,
      (currentPage + 1) * STACK_SIZE
    );
  }, [queueSparks, currentPage]);

  /**
   * ✅ FIXED: safe state update (NO mutation)
   */
  const completeActiveSpark = useCallback(() => {
    if (!activeSpark) return;

    setCompletedSparks((prev) => {
      const next = new Set(prev);
      next.add(activeSpark.id);
      return next;
    });

    setActiveId((prevActiveId) => {
      const nextSpark =
        sortedSparks.find(
          (s) =>
            s.id !== activeSpark.id &&
            !completedSparks.has(s.id)
        ) || null;

      return nextSpark?.id ?? null;
    });
  }, [activeSpark, sortedSparks, completedSparks]);

  return {
    activeSpark,
    queueSparks,
    paginatedSparks,

    activeId,
    setActiveId,

    completeActiveSpark,

    currentPage,
    setCurrentPage,

    totalPages,
    STACK_SIZE,
  };
}