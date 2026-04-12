"use client";

import { useEffect, useState } from "react";

export default function UploadProgress() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("/api/events/content");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setProgress(data.progress);
      setStage(data.stage);
      setMessage(data.message);
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-white">
      <p className="font-semibold">Upload Progress</p>

      <div className="h-2 bg-gray-200 rounded mt-2">
        <div
          className="h-2 bg-blue-500 rounded transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-gray-600">
        {stage} — {message}
      </p>
    </div>
  );
}