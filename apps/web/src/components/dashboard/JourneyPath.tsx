"use client";

import { Spark } from "@/types/spark";
import React, { useEffect, useRef } from "react";
import JourneyNode from "./JourneyNode";
import JourneyConnector from "./JourneyConnector";

interface Props {
  sparks: Spark[];
}

export default function JourneyPath({ sparks }: Props) {
  const activeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  if (!sparks?.length) return null;

  return (
    <section className="py-6">
      <div className="flex flex-col items-center gap-1">
        {sparks.map((spark, index) => {
          const isLast = index === sparks.length - 1;
          const isActive = spark.uiStatus === "active";

          return (
            <React.Fragment key={spark.id}>
              <div
                ref={isActive ? activeRef : null}
                className="transition-all"
              >
                <JourneyNode spark={spark} index={index} />
              </div>

              {!isLast && (
                <div className="h-10 flex items-center justify-center">
                  <JourneyConnector
                    completed={spark.uiStatus === "completed"}
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