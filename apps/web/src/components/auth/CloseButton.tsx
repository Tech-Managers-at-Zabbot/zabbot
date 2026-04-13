// /components/auth/CloseButton.tsx
"use client";

import { X } from "lucide-react";
import { useAuth } from "./AuthProvider";

export default function CloseButton() {
  const { setView } = useAuth();

  return (
    <button
      onClick={() => setView(null)}
      className="absolute top-3 right-3 p-2 rounded-full bg-white/60 hover:bg-white/80 transition"
    >
      <X size={16} />
    </button>
  );
}