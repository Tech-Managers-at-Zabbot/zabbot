import { SparkCardVM } from "@/types/view-models";
import { JourneyState, JourneyEngineResult } from "./types";

export function createJourneyEngine(
  sparks: SparkCardVM[],
  state: JourneyState
): JourneyEngineResult {
  const { activeId, completed } = state;

  const safeSparks = Array.isArray(sparks) ? sparks : [];

  const activeSpark =
    safeSparks.find((s) => s.id === activeId) ||
    safeSparks[0] ||
    null;

  const completedList = safeSparks.filter((s) =>
    completed.has(s.id) || s.uiStatus === "completed"
  );

  const queue = safeSparks.filter(
    (s) => s.id !== activeSpark?.id
  );

  const locked = safeSparks.filter(
    (s) =>
      !completed.has(s.id) &&
      s.id !== activeSpark?.id
  );

  const isCompleted = (id: string) => completed.has(id);

  const isActive = (id: string) => id === activeSpark?.id;

  return {
    activeSpark,
    queue,
    completed: completedList,
    locked,
    isCompleted,
    isActive,
  };
}