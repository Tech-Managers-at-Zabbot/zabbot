"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function AuthContainer({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="
              w-full max-w-md
              bg-white/70
              border border-white/60
              shadow-xl
              rounded-2xl
              p-6
              relative
            "
          >
            {onClose && (
              <button
                onClick={onClose}
                className="absolute right-4 top-4 opacity-60 hover:opacity-100"
              >
                <X size={18} />
              </button>
            )}

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}