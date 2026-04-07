"use client";

export default function SparkForm({ initialData, mode }: { initialData: any; mode: 'edit' | 'create' }) {
  return (
    <div className="p-8 border-2 border-dashed border-blue-100 rounded-3xl bg-blue-50/30 text-center">
      <h2 className="text-[#162B6E] font-black uppercase text-xs tracking-widest mb-2">
        Coming Soon...
      </h2>
      <p className="text-slate-400 text-sm">
        Form logic for <span className="text-[#24A5EE] font-bold">{initialData.title}</span> goes here.
      </p>
      <pre className="mt-4 text-[10px] text-left bg-white p-4 rounded-xl overflow-auto max-h-40">
        {JSON.stringify(initialData, null, 2)}
      </pre>
    </div>
  );
}