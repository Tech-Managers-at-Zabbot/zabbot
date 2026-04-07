"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import Image from "next/image";

interface Message {
    role: "assistant" | "user";
    text: string;
}

export default function AIConversation({ prompt, onComplete }: any) {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", text: prompt } // The AI starts the convo based on the exercise prompt
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        // 1. Add User Message
        const newMessages = [...messages, { role: "user" as const, text: input }];
        setMessages(newMessages);
        setInput("");

        // 2. Logic for completion (In a real scenario, you'd fetch an AI response here)
        if (newMessages.length >= 4) {
            setTimeout(() => onComplete(), 1500); // Finish exercise after a short back-and-forth
        }
    };

    return (
        <div className="flex flex-col h-[500px] w-full max-w-2xl mx-auto bg-slate-50 dark:bg-dark-card rounded-3xl border-2 border-slate-200 dark:border-dark-border overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 bg-white dark:bg-dark-bg border-b-2 border-slate-100 dark:border-dark-border flex items-center gap-3">
                <div className="relative w-10 h-10">
                    <Image src="/mascot.png" alt="Zabbot AI" fill className="object-contain" />
                </div>
                <div>
                    <p className="font-bold text-zabbot-heritage dark:text-white leading-none">Zab AI</p>
                    <p className="text-xs text-green-500 font-medium">Online • Practice Mode</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                    {messages.map((m, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={i}
                            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`
                max-w-[80%] p-4 rounded-2xl font-medium
                ${m.role === "user"
                                    ? "bg-zabbot-primary text-white rounded-tr-none"
                                    : "bg-white dark:bg-dark-bg border-2 border-slate-100 dark:border-dark-border text-slate-700 dark:text-slate-200 rounded-tl-none"}
              `}>
                                {m.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-dark-bg border-t-2 border-slate-100 dark:border-dark-border flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your response in Yorùbá..."
                    className="flex-1 bg-slate-50 dark:bg-dark-card border-2 border-slate-100 dark:border-dark-border rounded-xl px-4 focus:outline-none focus:border-zabbot-primary text-slate-700 dark:text-white"
                />
                <button
                    onClick={handleSend}
                    className="bg-zabbot-primary p-3 rounded-xl text-white hover:brightness-110 transition-all"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}