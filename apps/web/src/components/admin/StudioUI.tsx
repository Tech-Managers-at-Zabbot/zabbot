import React from "react";

export function AdminInput({ label, value, onChange, dark = false, type = "text", placeholder }: any) {
  return (
    <div className="flex flex-col gap-3">
      <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${dark ? "text-white/40" : "text-slate-400"}`}>{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className={`w-full p-5 rounded-[24px] text-sm font-bold border outline-none transition-all ${
          dark 
            ? "bg-white/5 border-white/10 text-white placeholder:text-white/10 focus:bg-white/10" 
            : "bg-slate-50 border-slate-100 focus:border-[#24A5EE] text-[#162B6E] placeholder:text-slate-300"
        }`} 
      />
    </div>
  );
}

export function AdminTextArea({ label, value, onChange, dark = false, placeholder }: any) {
  return (
    <div className="flex flex-col gap-3">
      <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${dark ? "text-white/40" : "text-slate-400"}`}>{label}</label>
      <textarea 
        rows={4} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className={`w-full p-6 rounded-[32px] text-sm font-bold border outline-none transition-all resize-none ${
          dark 
            ? "bg-white/5 border-white/10 text-white placeholder:text-white/10 focus:bg-white/10" 
            : "bg-slate-50 border-slate-100 focus:border-[#24A5EE] text-[#162B6E] placeholder:text-slate-300"
        }`} 
      />
    </div>
  );
}