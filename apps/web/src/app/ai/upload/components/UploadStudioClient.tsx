"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { cn } from "@/lib/utils";
import { Trash2, Archive, UploadCloud, CheckCircle2, FileJson } from "lucide-react";

type PracticeItem = {
  english: string;
  yoruba: string;
  tones: string[];
  audio: { male: string; female: string };
};

export default function UploadStudioClient() {
  const [file, setFile] = useState<File | null>(null);
  const [practiceItems, setPracticeItems] = useState<PracticeItem[]>([]);
  const [archivedItems, setArchivedItems] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const fetchArchive = async () => {
    try {
      const res = await fetch(`/api/practice-items/list?t=${Date.now()}`, { 
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache"
        }
      });
      const data = await res.json();
      if (data.success) {
        setArchivedItems(data.items);
      }
    } catch (err) {
      console.error("Archive fetch failed", err);
    }
  };

  useEffect(() => {
    fetchArchive();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setUploadMessage("");
    }
  };

  const removeItem = (index: number) => {
    setPracticeItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleParse = async () => {
    if (!file) return;
    setUploadMessage("Analyzing spreadsheet structure...");
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = e.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet, { raw: false });

      const items: PracticeItem[] = rows.map((row) => ({
        english: row["English word"]?.trim() || "",
        yoruba: row["Yoruba word"]?.trim() || "",
        tones: row["Tones"] ? String(row["Tones"]).split(/[\s,]+/) : [],
        audio: {
          male: row["Male"]?.trim() || "",
          female: row["Female"]?.trim() || "",
        },
      })).filter(item => item.english && item.yoruba);

      setPracticeItems(items);
      setUploadMessage(`Successfully staged ${items.length} items for deployment.`);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSync = async () => {
    if (practiceItems.length === 0) return;
    setUploading(true);
    setUploadMessage("Pushing data to Zabbot Engine...");

    try {
      const res = await fetch("/api/practice-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(practiceItems),
      });
      const result = await res.json();
      
      if (result.success) {
        setUploadMessage("✅ Studio Sync Complete: Global content updated.");
        setPracticeItems([]);
        setTimeout(() => { fetchArchive(); }, 1000);
      } else {
        setUploadMessage(`❌ Sync Error: ${result.error}`);
      }
    } catch (err: any) {
      setUploadMessage(`❌ System Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 p-6 pb-24 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary rounded-2xl shadow-premium">
            <UploadCloud className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-primary">
              Pàrà Admin Studio
            </h1>
            <p className="text-slate-500 font-medium">Core Asset Management & Deployment</p>
          </div>
        </div>
        
        <div className="p-4 zabbot-glass-card border-l-4 border-l-xp">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Spreadsheet Headings:</p>
          <p className="text-sm font-black text-primary">
            English word • Yoruba word • Tones • Male • Female
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          
          {/* Action Hub */}
          <div className="zabbot-glass-strong p-10 flex flex-col items-center justify-center gap-8 border-2 border-dashed border-slate-200 group hover:border-accent transition-all duration-500">
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-500 file:mr-6 file:py-3 file:px-8 file:rounded-full file:border-0 file:text-sm file:font-black file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
            />
            
            <div className="flex gap-4">
              <button
                onClick={handleParse}
                disabled={!file || uploading}
                className="px-10 py-4 rounded-full bg-slate-900 text-white font-black text-sm uppercase tracking-widest hover:bg-black transition-all disabled:opacity-30 flex items-center gap-2"
              >
                <FileJson size={18} /> Parse Data
              </button>

              <button
                onClick={handleSync}
                disabled={practiceItems.length === 0 || uploading}
                className="px-10 py-4 rounded-full bg-primary text-white font-black text-sm uppercase tracking-widest shadow-strong hover:scale-105 transition-all disabled:opacity-30 flex items-center gap-2 relative overflow-hidden group"
              >
                {uploading ? "Deploying..." : <><CheckCircle2 size={18} /> Sync to Database</>}
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </button>
            </div>
          </div>

          {uploadMessage && (
            <div className="p-4 rounded-2xl zabbot-glass-card text-center font-bold text-primary animate-in fade-in zoom-in-95 duration-500 shadow-premium">
              {uploadMessage}
            </div>
          )}

          {/* Staging Area */}
          {practiceItems.length > 0 && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-end">
                <h2 className="text-2xl font-black italic flex items-center gap-3">
                  <span className="w-12 h-1 bg-primary rounded-full" />
                  STAGING AREA
                </h2>
                <button 
                  onClick={() => setPracticeItems([])}
                  className="text-xs font-black text-error uppercase border-b-2 border-error pb-1 hover:opacity-70 transition-opacity"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {practiceItems.map((item, idx) => (
                  <div key={idx} className="group relative p-8 zabbot-glass-card hover:border-primary transition-all duration-300">
                    <button 
                      onClick={() => removeItem(idx)}
                      className="absolute top-6 right-6 p-2 text-slate-300 hover:text-error transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                    
                    <div className="mb-6">
                      <p className="font-black text-2xl text-primary leading-tight">{item.yoruba}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">{item.english}</p>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1 p-3 bg-soft-bg rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-accent uppercase mb-2">Male</p>
                        {item.audio.male ? <audio src={item.audio.male} controls className="w-full h-6 scale-90 -ml-2" /> : <span className="text-[10px] text-error font-bold">Missing</span>}
                      </div>
                      <div className="flex-1 p-3 bg-soft-bg rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-pink-500 uppercase mb-2">Female</p>
                        {item.audio.female ? <audio src={item.audio.female} controls className="w-full h-6 scale-90 -ml-2" /> : <span className="text-[10px] text-error font-bold">Missing</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Archive Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="zabbot-glass-strong p-8 sticky top-6">
            <div className="flex items-center gap-3 mb-8">
              <Archive size={22} className="text-primary" />
              <h3 className="font-black italic text-xl uppercase tracking-tighter">Live Assets</h3>
            </div>
            
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {archivedItems.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xs text-slate-400 font-bold uppercase italic">No items found</p>
                </div>
              )}
              {archivedItems.map((item, i) => (
                <div key={i} className="group p-4 rounded-2xl bg-white/50 border border-slate-100 flex justify-between items-center hover:bg-white hover:shadow-md transition-all duration-300">
                  <div>
                    <p className="text-sm font-black text-primary">{item.yorubaWord}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      {item.englishTranslation || "Untranslated"}
                    </p>
                  </div>
                  <CheckCircle2 size={16} className="text-success opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}