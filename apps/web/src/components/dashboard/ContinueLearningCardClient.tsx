"use client";

import { useRouter } from "next/navigation";
import ContinueLearningCard from "./ContinueLearningCard";
import { SparkCardVM } from "@/types/view-models";

export default function ContinueLearningCardClient({
  spark,
}: {
  spark: SparkCardVM;
}) {
  const router = useRouter();

  return (
    <ContinueLearningCard
      spark={spark}
      onContinue={(id) => router.push(`/spark/${id}`)}
    />
  );
}