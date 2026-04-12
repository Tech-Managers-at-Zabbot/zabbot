"use client";

import React, { useEffect, useMemo, useRef } from "react";
import JourneyNode from "./JourneyNode";
import JourneyConnector from "./JourneyConnector";
import { SparkCardVM } from "@/types/view-models";

interface Props {
  sparks: SparkCardVM[];
}

export default function JourneyPath({ sparks }: Props) {
  const activeRef = useRef<HTMLDivElement | null>(null);

  /**
   * ✅ Defensive normalization + safe copy
   * Prevents runtime mutation + ensures stable rendering
   */
  const sortedSparks = useMemo(() => {
    if (!Array.isArray(sparks)) return [];

    return [...sparks].filter(Boolean);
  }, [sparks]);

  /**
   * ✅ More reliable active detection
   * (supports fallback if multiple or none exist)
   */
  const activeIndex = useMemo(() => {
    return sortedSparks.findIndex(
      (s) => s.uiStatus === "active"
    );
  }, [sortedSparks]);

  /**
   * ✅ Smooth scroll to active node
   * Uses RAF for better layout stability than fixed timeout
   */
  useEffect(() => {
    if (activeIndex < 0) return;

    const frame = requestAnimationFrame(() => {
      activeRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  if (!sortedSparks.length) return null;

  return (
    <section className="py-6">
      <div className="flex flex-col items-center gap-1">
        {sortedSparks.map((spark, index) => {
          const isLast = index === sortedSparks.length - 1;

          const status = spark.uiStatus ?? "locked";
          const isActive = status === "active";

          return (
            <React.Fragment key={spark.id}>
              <div
                ref={isActive ? activeRef : null}
                data-active={isActive}
                className="transition-all"
              >
                <JourneyNode spark={spark} index={index} />
              </div>

              {!isLast && (
                <div className="h-10 flex items-center justify-center">
                  <JourneyConnector
                    completed={status === "completed"}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}