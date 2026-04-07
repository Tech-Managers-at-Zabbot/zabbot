"use client";

import { Spark } from "@/types/spark";
import React from "react";
import JourneyNode from "./JourneyNode";
import JourneyConnector from "./JourneyConnector";

interface Props {
  sparks: Spark[];
}

export default function JourneyPath({ sparks }: Props) {
  if (!sparks || sparks.length === 0) return null;

  return (
    <section className="space-y-10 py-4">
      <div className="flex flex-col items-center">
        {sparks.map((spark, index) => {
          const isLast = index === sparks.length - 1;
          return (
            <React.Fragment key={spark.id}>
              {/* NODE */}
              <JourneyNode spark={spark} index={index} />

              {/* CONNECTOR */}
              {!isLast && (
                <JourneyConnector
                  completed={spark.uiStatus === "completed"}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}