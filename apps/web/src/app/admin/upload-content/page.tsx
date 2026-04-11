"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

export default function UploadContentPage() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any>(null);

  const handleUpload = async (file: File) => {
    setLoading(true);

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);

    const sheets = {
      journeys: XLSX.utils.sheet_to_json(workbook.Sheets["Journeys"]),
      sparks: XLSX.utils.sheet_to_json(workbook.Sheets["Sparks"]),
      contentBlocks: XLSX.utils.sheet_to_json(workbook.Sheets["ContentBlocks"]),
      exercises: XLSX.utils.sheet_to_json(workbook.Sheets["Exercises"]),
      vocabulary: XLSX.utils.sheet_to_json(workbook.Sheets["Vocabulary"]),
    };

    setPreview(sheets);

    const res = await fetch("/api/admin/upload-content", {
      method: "POST",
      body: JSON.stringify(sheets),
    });

    const result = await res.json();
    console.log(result);

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Content</h1>

      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />

      {loading && <p className="mt-4">Uploading...</p>}

      {preview && (
        <pre className="mt-6 text-xs bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(preview, null, 2)}
        </pre>
      )}
    </div>
  );
}