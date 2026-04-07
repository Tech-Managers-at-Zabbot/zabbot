import { useState, useMemo } from "react";
import { Spark } from "@/types/spark";

export default function useSparkManager(sparks: Spark[]) {
  const [activeId, setActiveId] = useState<string | null>(sparks[0]?.id ?? null);
  const [completedSparks, setCompletedSparks] = useState<Set<string>>(new Set());
  const STACK_SIZE = 2;
  const [currentPage, setCurrentPage] = useState(0);

  const sortedSparks = useMemo(() => [...sparks].sort((a, b) => (new Date(a.createdAt ?? 0).getTime()) - (new Date(b.createdAt ?? 0).getTime())), [sparks]);

  const activeSpark = sortedSparks.find(s => s.id === activeId) || sortedSparks[0];
  const queueSparks = sortedSparks.filter(s => s.id !== activeId);
  const totalPages = Math.ceil(queueSparks.length / STACK_SIZE);
  const paginatedSparks = queueSparks.slice(currentPage * STACK_SIZE, (currentPage + 1) * STACK_SIZE);

  const completeActiveSpark = () => {
    if (!activeSpark) return;
    setCompletedSparks(prev => new Set(prev.add(activeSpark.id)));
    const nextSpark = sortedSparks.find(s => !completedSparks.has(s.id) && s.id !== activeSpark.id);
    setActiveId(nextSpark?.id ?? null);
  };

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
    STACK_SIZE
  };
}