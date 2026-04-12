"use client";

import React, { useState } from "react";

export default function ImportDashboard() {
  const [parsed, setParsed] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);

  const handleFileUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();

    try {
      const json = JSON.parse(text);
      setParsed(json);
      setErrors(null);
    } catch (err) {
      setErrors("Invalid JSON file");
    }
  };

  const runImport = async (dryRun: boolean) => {
    if (!parsed) return;

    setLoading(true);
    setResult(null);
    setErrors(null);

    const res = await fetch("/api/admin/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sheets: parsed,
        dryRun,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors(data);
    } else {
      setResult(data);
    }

    setLoading(false);
  };

  return (
    <div className="p-10 space-y-8">
      <h1 className="text-2xl font-black text-[#162B6E]">
        CMS Import & Test Dashboard
      </h1>

      {/* Upload */}
      <input type="file" accept=".json" onChange={handleFileUpload} />

      {/* Parsed Preview */}
      {parsed && (
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="font-bold mb-2">Preview Loaded Data</p>
          <pre className="text-xs overflow-auto max-h-60">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => runImport(true)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          Run Dry Test
        </button>

        <button
          onClick={() => runImport(false)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Execute Import
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-blue-600 font-semibold">
          Processing import...
        </p>
      )}

      {/* Errors */}
      {errors && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <h2 className="font-bold text-red-600 mb-2">
            Import Errors
          </h2>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(errors, null, 2)}
          </pre>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="p-4 bg-white border rounded-xl">
          <h2 className="font-bold mb-2">Import Result</h2>

          <pre className="text-xs overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}