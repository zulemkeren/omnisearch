"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ChatInput } from "@/components/chat/chat-input";
import { MessageList, type ChatMessage } from "@/components/chat/message-list";
import { EmptyState } from "@/components/chat/empty-state";
import type { Document } from "@/lib/mock-data";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);

  async function handleSubmit(text?: string) {
    const userText = (text ?? input).trim();
    if (!userText || streaming) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: userText,
    };
    const assistantId = `a-${Date.now()}`;
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let citations: Document[] | undefined;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // SSE-style framing: lines like `data: {...}\n\n`
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const event of events) {
          const line = event.split("\n").find((l) => l.startsWith("data: "));
          if (!line) continue;
          const payload = line.slice(6);
          if (payload === "[DONE]") continue;
          try {
            const parsed = JSON.parse(payload);
            if (parsed.type === "citations") {
              citations = parsed.citations;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, citations } : m
                )
              );
            } else if (parsed.type === "delta") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + parsed.text }
                    : m
                )
              );
            } else if (parsed.type === "error") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? {
                        ...m,
                        content:
                          (m.content || "") +
                          `\n\n_${parsed.message || "An error occurred."}_`,
                      }
                    : m
                )
              );
            }
          } catch {
            // ignore parse errors on partial frames
          }
        }
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  "Sorry, I ran into a problem fetching that answer. Please try again.",
              }
            : m
        )
      );
    } finally {
      setStreaming(false);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, isStreaming: false } : m
        )
      );
    }
  }

  function newChat() {
    setMessages([]);
    setInput("");
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-100 px-6">
        <div>
          <h1 className="text-sm font-medium text-zinc-900">Knowledge Chat</h1>
          <p className="text-[11px] text-zinc-500">
            Ask anything indexed from your workspaces
          </p>
        </div>
        <button
          type="button"
          onClick={newChat}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          <Plus className="h-3 w-3" />
          New chat
        </button>
      </header>

      {/* Body */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {isEmpty ? (
          <EmptyState onPick={(q) => handleSubmit(q)} />
        ) : (
          <div className="mx-auto max-w-3xl px-6 py-8">
            <MessageList messages={messages} />
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="shrink-0 border-t border-zinc-100 bg-white px-6 py-4">
        <div className="mx-auto max-w-3xl">
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={() => handleSubmit()}
            disabled={streaming}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
