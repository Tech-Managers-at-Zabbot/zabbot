"use client";

import React, { forwardRef, KeyboardEvent } from "react";

interface OreInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  placeholder?: string;
  className?: string;
  inputRef?: React.Ref<HTMLTextAreaElement>;
}

const OreInput = forwardRef<HTMLTextAreaElement, OreInputProps>(
  ({ value, onChange, onSend, placeholder = "Type a message…", className }, ref) => {

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    };

    return (
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`resize-none w-full py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition-all ${className}`}
        rows={1}
      />
    );
  }
);

OreInput.displayName = "OreInput";
export default OreInput;