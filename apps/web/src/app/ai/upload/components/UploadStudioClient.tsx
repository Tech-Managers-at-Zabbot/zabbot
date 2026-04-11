"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Trash2,
  Archive,
  UploadCloud,
  CheckCircle2,
  FileJson,
  Music,
  Languages,
} from "lucide-react";

type PracticeItem = {
  english: string;
  yoruba: string;
  tones: string[];
  audio: { male: string; female: string };
};

type Lesson = {
  id: string;
  title: string;
};

export default function UploadStudioClient() {
  const [file, setFile] = useState<File | null>(null);
  const [practiceItems, setPracticeItems] = useState<PracticeItem[]>([]);
  const [archivedItems, setArchivedItems] = useState<any[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  // -----------------------------
  // FETCH ARCHIVE
  // -----------------------------
  const fetchArchive = async () => {
    try {
      const res = await fetch(`/api/practice-items`, {
        method: "GET",
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });

      const data = await res.json();

      if (data?.success && Array.isArray(data.items)) {
        setArchivedItems(data.items);
      }
    } catch (err) {
      console.error("Archive fetch failed", err);
    }
  };

  // -----------------------------
  // FETCH LESSONS (NEW)
  // -----------------------------
  const fetchLessons = async () => {
    try {
      const res = await fetch("/api/lessons");
      const data = await res.json();

      if (data?.success && Array.isArray(data.items)) {
        setLessons(data.items);
      }
    } catch (err) {
      console.error("Lessons fetch failed", err);
    }
  };

  useEffect(() => {
    fetchArchive();
    fetchLessons();
  }, []);

  // -----------------------------
  // FILE HANDLER
  // -----------------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
      setUploadMessage("");
    }
  };

  const removeItem = (index: number) => {
    setPracticeItems((prev) => prev.filter((_, i) => i !== index));
  };

  // -----------------------------
  // PARSE EXCEL (SAFE VERSION)
  // -----------------------------
  const handleParse = async () => {
    if (!file) return;

    setUploadMessage("Analyzing spreadsheet structure...");

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        if (!data) throw new Error("File read failed");

        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const rows: any[] = XLSX.utils.sheet_to_json(sheet, {
          raw: false,
          defval: "",
        });

        const parsed: PracticeItem[] = [];
        let invalidCount = 0;

        for (const row of rows) {
          const english = String(row["English word"] || "").trim();
          const yoruba = String(row["Yoruba word"] || "").trim();

          if (!english || !yoruba) {
            invalidCount++;
            continue;
          }

          parsed.push({
            english,
            yoruba,
            tones: String(row["Tones"] || "")
              .split(/[\s,]+/)
              .filter(Boolean),
            audio: {
              male: String(row["Male"] || "").trim(),
              female: String(row["Female"] || "").trim(),
            },
          });
        }

        setPracticeItems(parsed);

        setUploadMessage(
          `Staged ${parsed.length} items${
            invalidCount ? ` • ${invalidCount} invalid rows skipped` : ""
          }`
        );
      } catch (err: any) {
        setUploadMessage(`Parse failed: ${err.message}`);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // -----------------------------
  // SYNC TO DB (LESSON-AWARE)
  // -----------------------------
  const handleSync = async () => {
    if (!practiceItems.length) return;

    setUploading(true);
    setUploadMessage("Pushing data to Zabbot Engine...");

    try {
      const res = await fetch("/api/practice-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: practiceItems,
          lessonId: selectedLessonId || null, // 🔥 CRITICAL FIX
        }),
      });

      const result = await res.json();

      if (result.success) {
        setUploadMessage("Studio Sync Complete: Global content updated.");
        setPracticeItems([]);
        setFile(null);
        await fetchArchive();
      } else {
        setUploadMessage(
          `Sync Error: ${result.error || "Unknown error"}`
        );
      }
    } catch (err: any) {
      setUploadMessage(`System Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="max-w-7xl mx-auto space-y-12 p-6 pb-24 animate-in fade-in duration-700">

      {/* HEADER */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#24A5EE] rounded-2xl shadow-xl shadow-blue-200">
            <UploadCloud className="text-white w-8 h-8" />
          </div>

          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-[#162B6E]">
              Pàrà Admin Studio
            </h1>
            <p className="text-slate-500 font-medium">
              Core Asset Management & Deployment
            </p>
          </div>
        </div>

        {/* LESSON SELECTOR (NEW) */}
        <div className="p-4 bg-white/80 rounded-xl border">
          <p className="text-xs font-bold mb-2 uppercase">
            Select Lesson (Optional)
          </p>

          <select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">-- No Lesson --</option>
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* UPLOAD AREA */}
      <div className="bg-white/80 rounded-[32px] p-10 flex flex-col items-center gap-6 border-2 border-dashed">
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={handleFileChange}
        />

        <div className="flex gap-4">
          <button
            onClick={handleParse}
            disabled={!file || uploading}
            className="px-8 py-3 bg-black text-white rounded-full"
          >
            <FileJson size={16} /> Parse Data
          </button>

          <button
            onClick={handleSync}
            disabled={!practiceItems.length || uploading}
            className="px-8 py-3 bg-[#24A5EE] text-white rounded-full"
          >
            {uploading ? "Deploying..." : "Sync to Database"}
          </button>
        </div>
      </div>

      {/* MESSAGE */}
      {uploadMessage && (
        <div className="p-4 bg-white rounded-xl text-center font-bold">
          {uploadMessage}
        </div>
      )}

      {/* STAGING */}
      {practiceItems.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {practiceItems.map((item, idx) => (
            <div key={idx} className="p-4 border rounded-xl relative">

              <button
                onClick={() => removeItem(idx)}
                className="absolute top-2 right-2 text-red-500"
              >
                <Trash2 size={16} />
              </button>

              <p className="font-bold text-xl">{item.yoruba}</p>
              <p className="text-blue-500">{item.english}</p>
            </div>
          ))}
        </div>
      )}

      {/* ARCHIVE */}
      <div className="mt-10">
        <h2 className="font-bold mb-3">Live Assets</h2>

        {archivedItems.map((item, i) => (
          <div key={i} className="p-3 border rounded mb-2">
            <p className="font-bold">{item.yorubaWord}</p>
            <p className="text-sm">{item.englishTranslation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}