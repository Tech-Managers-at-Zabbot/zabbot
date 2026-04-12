"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

export default function UploadContentPage() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any>(null);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async (file: File) => {
    setLoading(true);
    setResult(null);

    try {
      /**
       * 1. Local preview (client-side only for quick inspection)
       */
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);

      const sheets = {
        journeys: XLSX.utils.sheet_to_json(workbook.Sheets["Journeys"] || {}),
        sparks: XLSX.utils.sheet_to_json(workbook.Sheets["Sparks"] || {}),
        contentBlocks: XLSX.utils.sheet_to_json(
          workbook.Sheets["ContentBlocks"] || {}
        ),
        exercises: XLSX.utils.sheet_to_json(workbook.Sheets["Exercises"] || {}),
        vocabulary: XLSX.utils.sheet_to_json(
          workbook.Sheets["Vocabulary"] || {}
        ),
      };

      setPreview(sheets);

      /**
       * 2. Upload file to backend (FormData)
       */
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload-content", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Upload failed");
      }

      setResult(data);
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || "Unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Content</h1>

      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <input
          type="file"
          accept=".xlsx"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />

        {loading && (
          <p className="mt-4 text-blue-600 font-medium">Uploading...</p>
        )}
      </div>

      {/* PREVIEW */}
      {preview && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Preview (Parsed Sheets)</h2>
          <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-[400px]">
            {JSON.stringify(preview, null, 2)}
          </pre>
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Upload Result</h2>
          <pre className="text-xs bg-green-50 p-4 rounded overflow-auto max-h-[300px]">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}