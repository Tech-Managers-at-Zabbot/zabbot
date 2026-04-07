"use client";

interface Props {
  completed: boolean;
}

export default function JourneyConnector({ completed }: Props) {
  return (
    <div
      className={`h-10 w-1 rounded-full transition-colors ${
        completed
          ? "bg-gradient-to-b from-green-400 to-green-600"
          : "bg-gray-300 dark:bg-gray-700"
      }`}
    />
  );
}