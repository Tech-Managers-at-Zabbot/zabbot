"use client";

import { useEffect, useState } from "react";

export default function LearnPage({ params }: any) {
  const { lessonId } = params;

  const [data, setData] = useState<any>(null);
  const [index, setIndex] = useState(0);

  const fetchData = async () => {
    const res = await fetch(`/api/learn/${lessonId}`);
    const json = await res.json();
    setData(json);
  };

  const next = () => {
    setIndex((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  const item = data.items[index];

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">{data.lesson.title}</h1>

      {item ? (
        <div className="mt-10 space-y-4">
          <h2 className="text-4xl font-bold">{item.yorubaWord}</h2>
          <p className="text-blue-500">{item.englishTranslation}</p>

          <button
            onClick={next}
            className="px-6 py-3 bg-black text-white rounded-full"
          >
            Next
          </button>
        </div>
      ) : (
        <div className="mt-10">
          <h2>Lesson Completed 🎉</h2>
        </div>
      )}
    </div>
  );
}