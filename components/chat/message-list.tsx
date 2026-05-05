"use client";

import { useEffect, useRef } from "react";
import type { Document } from "@/lib/mock-data";
import { Logo } from "@/components/ui/logo";
import { CitationCard } from "./citation-card";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Document[];
  isStreaming?: boolean;
}

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-8">
      {messages.map((msg) => (
        <div key={msg.id} className="animate-slide-up">
          {msg.role === "user" ? (
            <UserMessage content={msg.content} />
          ) : (
            <AssistantMessage
              content={msg.content}
              citations={msg.citations}
              isStreaming={msg.isStreaming}
            />
          )}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-zinc-900 px-4 py-2.5 text-sm text-white">
        {content}
      </div>
    </div>
  );
}

function AssistantMessage({
  content,
  citations,
  isStreaming,
}: {
  content: string;
  citations?: Document[];
  isStreaming?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <Logo withText={false} size="sm" />
      <div className="flex-1 space-y-4 pt-0.5">
        {/* Citations shown FIRST so user sees sources upfront */}
        {citations && citations.length > 0 && (
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Sources ({citations.length})
            </p>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {citations.map((doc, i) => (
                <CitationCard key={doc.id} doc={doc} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Answer */}
        {content ? (
          <div className="prose prose-sm max-w-none text-sm leading-relaxed text-zinc-800">
            {renderContentWithCitations(content)}
            {isStreaming && (
              <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse-soft rounded-sm bg-zinc-900" />
            )}
          </div>
        ) : (
          <TypingIndicator />
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1.5">
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </div>
  );
}

// Renders content and turns [1], [2] into pill citations
function renderContentWithCitations(content: string) {
  const parts = content.split(/(\[\d+\])/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[(\d+)\]$/);
    if (match) {
      return (
        <span
          key={i}
          className="mx-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-md bg-zinc-100 px-1 text-[10px] font-semibold text-zinc-700 align-text-bottom"
        >
          {match[1]}
        </span>
      );
    }
    // Preserve newlines
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}
