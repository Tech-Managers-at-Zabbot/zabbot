"use client";

import { useEffect, useState, useCallback } from "react";
import JourneyPath from "@/components/dashboard/JourneyPath";
import { useContentSync } from "@/hooks/useContentSync";

interface Props {
  params: {
    id: string;
  };
}

export default function JourneyClientPage({ params }: Props) {
  const journeyId = params.id;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /**
   * 🔁 Fetch journey data
   */
  const fetchJourney = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/dashboard/journey/${journeyId}`,
        {
          cache: "no-store",
        }
      );

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch journey:", err);
    } finally {
      setLoading(false);
    }
  }, [journeyId]);

  /**
   * 📡 Initial load
   */
  useEffect(() => {
    fetchJourney();
  }, [fetchJourney]);

  /**
   * 🔥 REALTIME SYNC (SSE)
   * Re-fetches journey whenever backend emits update
   */
  useContentSync(() => {
    fetchJourney();
  });

  if (loading && !data) {
    return (
      <div className="p-6">
        <p className="text-slate-500">Loading journey...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6">
        <p className="text-red-500">Failed to load journey</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* JOURNEY HEADER */}
      <h1 className="text-2xl font-bold mb-4">
        {data.journey.title}
      </h1>

      {data.journey.description && (
        <p className="text-slate-600 mb-6">
          {data.journey.description}
        </p>
      )}

      {/* JOURNEY PATH */}
      <JourneyPath sparks={data.sparks} />
    </div>
  );
}