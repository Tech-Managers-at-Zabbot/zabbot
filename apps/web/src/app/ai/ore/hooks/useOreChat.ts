"use client";

import { useState, useCallback, useEffect } from "react";
import { useOreAI } from "@/hooks/useOreAI";

export interface ChatItem {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  name: string;
  messages: ChatItem[];
  createdAt: string;
}

export const useOreChat = () => {
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const { loading, sendPrompt } = useOreAI();

  /** Load from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("ore_sessions");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSessions(parsed);
    }
  }, []);

  /** Persist sessions */
  useEffect(() => {
    localStorage.setItem("ore_sessions", JSON.stringify(sessions));
  }, [sessions]);

  /** Initialize session */
  useEffect(() => {
    if (!sessions.length) {
      startNewSession("Ore Chat");
    } else if (!currentSessionId) {
      setCurrentSessionId(sessions[0].id);
      setMessages(sessions[0].messages);
    }
  }, [sessions, currentSessionId]);

  /** Send message */
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || !currentSessionId) return;

      const timestamp = new Date().toISOString();

      const userMessage: ChatItem = {
        id: crypto.randomUUID(),
        sender: "user",
        text,
        timestamp,
      };

      let updated: ChatItem[] = [];

      setMessages((prev) => {
        updated = [...prev, userMessage];
        return updated;
      });

      updateSessionMessages(currentSessionId, updated);

      const aiId = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        { id: aiId, sender: "ai", text: "", timestamp },
      ]);

      let aiText = "";

      await sendPrompt(text, (chunk) => {
        aiText += chunk;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiId ? { ...m, text: aiText } : m
          )
        );
      });

      setMessages((prev) => {
        const final = prev.map((m) =>
          m.id === aiId ? { ...m, text: aiText } : m
        );

        updateSessionMessages(currentSessionId, final);
        return final;
      });
    },
    [sendPrompt, currentSessionId]
  );

  /** New session */
  const startNewSession = useCallback((name = "New Session") => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      name,
      messages: [],
      createdAt: new Date().toISOString(),
    };

    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setMessages([]);
  }, []);

  /** Update session messages */
  const updateSessionMessages = (id: string, msgs: ChatItem[]) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, messages: msgs } : s
      )
    );
  };

  /** Clear */
  const clearHistory = useCallback(() => {
    if (!currentSessionId) return;
    setMessages([]);
    updateSessionMessages(currentSessionId, []);
  }, [currentSessionId]);

  return {
    messages,
    loading,
    sendMessage,
    clearHistory,
  };
};