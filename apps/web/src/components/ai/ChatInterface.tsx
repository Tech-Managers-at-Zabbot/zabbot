'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, RefreshCcw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatInterface() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Báwo ni? (How are you?)' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = { role: 'user', content: input };
        const updatedMessages = [...messages, userMsg];

        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            if (!response.ok) throw new Error("Failed to fetch");

            const data = await response.json();
            setMessages(prev => [...prev, data]);
        } catch (err) {
            console.error("Chat failed:", err);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Dandan ni! (Something went wrong!) I lost my connection. Please try again.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#EFF6FF]">
            {/* Header */}
            <div className="bg-[#162B6E] p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#24A5EE] rounded-full flex items-center justify-center text-xl">🦜</div>
                    <div>
                        <h2 className="font-bold text-lg leading-none">Ọ̀rẹ́ the Parrot</h2>
                        <p className="text-blue-300 text-xs mt-1">Zabbot AI Tutor</p>
                    </div>
                </div>
                <button onClick={() => setMessages([{ role: 'assistant', content: 'Báwo ni? (How are you?)' }])}>
                    <RefreshCcw size={20} className="text-blue-300 hover:text-white transition-colors" />
                </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F8FAFC]">
                {messages.map((msg, i) => (
                    <div key={i} className={cn(
                        "max-w-[85%] p-4 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-300",
                        msg.role === 'assistant'
                            ? "bg-white text-[#162B6E] self-start border border-slate-100 shadow-sm"
                            : "bg-[#24A5EE] text-white self-end ml-auto"
                    )}>
                        {msg.content}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-center gap-2 text-slate-400 text-xs italic animate-pulse">
                        <Loader2 size={14} className="animate-spin" />
                        Ọ̀rẹ́ is thinking...
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your response in Yorùbá..."
                    disabled={isLoading}
                    className="flex-1 bg-slate-50 border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-[#24A5EE] outline-none text-[#162B6E] disabled:opacity-50"
                />
                <button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className="bg-[#24A5EE] p-3 rounded-full text-white hover:scale-105 active:scale-95 transition-all disabled:bg-slate-300"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}