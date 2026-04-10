"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import OreMessage from "./OreMessage";
import OreInput from "./OreInput";
import OreHistory from "./OreHistory";
import { useOreChat } from "../hooks/useOreChat"; // ✅ FIXED IMPORT

const tonalChars = ["á","à","ẹ́","ẹ̀","í","ì","ó","ò","ú","ù","ṣ"];

export default function OreChat() {
  const { messages, loading, sendMessage, clearHistory } = useOreChat();

  const user = { firstName: "Bola" };

  const [inputValue, setInputValue] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const isEmpty = messages.length === 0;

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: messages.length > 10 ? "auto" : "smooth",
    });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    sendMessage(inputValue);
    setInputValue("");

    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const insertTone = (char: string) => {
    const textarea = inputRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newValue =
      inputValue.substring(0, start) +
      char +
      inputValue.substring(end);

    setInputValue(newValue);

    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + char.length;
      textarea.focus();
    }, 0);
  };

  const renderedMessages = useMemo(
    () => messages.map((msg) => <OreMessage key={msg.id} {...msg} />),
    [messages]
  );

  return (
    <div className="flex flex-1 w-full overflow-hidden">
      <div className="flex flex-1 h-full overflow-hidden bg-transparent">

        {/* CHAT AREA */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 custom-scrollbar">
            {isEmpty ? (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto">

                <Image
                  src="/mascots/Ore.png"
                  alt="Ore mascot"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-white shadow-xl mb-6"
                />

                <h1 className="text-2xl md:text-4xl font-black mb-2">
                  Ẹ n lẹ̀,{" "}
                  <span className="text-[#162B6E]">
                    {user?.firstName || "Learner"}
                  </span>
                  !
                </h1>

                <p className="text-slate-500 text-base md:text-lg max-w-md">
                  I’m <span className="text-[#24A5EE] font-bold">Ore</span>, your Yorùbá guide.
                </p>

                <div className="flex flex-wrap gap-3 mt-8 justify-center">
                  {[
                    "Teach me a new Yorùbá word",
                    "Help with pronunciation",
                    "Practice conversation",
                  ].map((text) => (
                    <button
                      key={text}
                      onClick={() => setInputValue(text)}
                      className="px-6 py-3 rounded-2xl bg-white border shadow-sm"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {renderedMessages}

                {loading && (
                  <div className="text-sm text-slate-400 italic animate-pulse">
                    Ore is thinking...
                  </div>
                )}

                <div ref={endRef} />
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="px-4 md:px-8 pb-8 pt-2">
            <div className="flex flex-col gap-3 rounded-[28px] bg-white/70 p-4">

              <div className="flex flex-wrap gap-1.5">
                {tonalChars.map((char) => (
                  <button
                    key={char}
                    onClick={() => insertTone(char)}
                    className="w-9 h-9 rounded-xl bg-slate-50"
                  >
                    {char}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <OreInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onSend={handleSend}
                  inputRef={inputRef}
                  className="flex-1"
                  placeholder="Type in Yorùbá…"
                />

                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || loading}
                  className="h-12 px-6 rounded-2xl bg-[#24A5EE] text-white disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* HISTORY */}
        <div className="hidden lg:flex w-80 flex-col p-6 border-l">
          <div className="flex justify-between mb-4">
            <h2 className="font-bold">History</h2>
            <button onClick={clearHistory}>Clear</button>
          </div>

          <OreHistory
            history={messages}
            activeId={messages[messages.length - 1]?.id}
            onSelect={(text) => setInputValue(text)}
          />
        </div>
      </div>
    </div>
  );
}