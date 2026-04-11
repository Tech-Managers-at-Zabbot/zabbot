"use client";

interface Props {
  completed: boolean;
}

export default function JourneyConnector({ completed }: Props) {
  return (
    <div
      className={`w-[3px] h-10 rounded-full transition-all duration-300 ${
        completed
          ? "bg-gradient-to-b from-green-400 to-green-600"
          : "bg-slate-200 dark:bg-slate-700"
      }`}
    />
  );
}