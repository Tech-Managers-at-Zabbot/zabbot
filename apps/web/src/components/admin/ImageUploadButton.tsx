"use client";

import { useState } from "react";

interface Props {
  onUploaded: (url: string) => void;
  currentImage?: string;
}

export default function ImageUploadButton({
  onUploaded,
  currentImage,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    onUploaded(data.url);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {currentImage && (
        <img
          src={currentImage}
          className="w-24 h-24 rounded-lg object-cover border"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />

      {loading && <p className="text-sm">Uploading...</p>}
    </div>
  );
}