"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Markdown } from "@/components/ui/markdown";
import { ChevronDown, ChevronUp, Send } from "lucide-react";

const SUGGESTED_QUESTIONS = [
  "What foods should I avoid?",
  "Is my cholesterol dangerous?",
  "What does pre-diabetes mean?",
];

function getMessageText(message: { parts: Array<{ type: string; text?: string }> }): string {
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export function FollowUpChat() {
  const [expanded, setExpanded] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  function handleSend(text: string) {
    if (!text.trim()) return;
    sendMessage({ text });
    setInputValue("");
    setExpanded(true);
  }

  return (
    <div className="bg-white border border-surface-border rounded-md overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-muted/50 transition-colors"
      >
        <h3 className="text-sm font-semibold text-text-primary">
          Have questions about your results?
        </h3>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-text-secondary" />
        ) : (
          <ChevronDown className="h-4 w-4 text-text-secondary" />
        )}
      </button>

      {expanded && (
        <div className="px-4 sm:px-6 pb-5 border-t border-surface-border">
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 text-xs rounded-full border border-bc-link/30 text-bc-link hover:bg-bc-blue-light transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.length > 0 && (
            <div className="mt-4 space-y-4 max-h-96 overflow-y-auto">
              {messages.map((m) => {
                const text = getMessageText(m);
                if (!text) return null;
                return (
                  <div
                    key={m.id}
                    className={
                      m.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    <div
                      className={
                        m.role === "user"
                          ? "bg-bc-blue text-white px-4 py-2.5 rounded-lg max-w-[80%] text-sm"
                          : "bg-muted px-4 py-2.5 rounded-lg max-w-[80%] text-sm"
                      }
                    >
                      {m.role === "user" ? (
                        <p>{text}</p>
                      ) : (
                        <Markdown content={text} />
                      )}
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted px-4 py-2.5 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-text-secondary/40 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-text-secondary/40 rounded-full animate-bounce [animation-delay:0.1s]" />
                      <div className="w-2 h-2 bg-text-secondary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question about your results..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(inputValue);
                }
              }}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={() => handleSend(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="bg-bc-blue hover:bg-bc-blue-hover shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {messages.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {SUGGESTED_QUESTIONS.filter(
                (q) =>
                  !messages.some(
                    (m) =>
                      m.role === "user" &&
                      getMessageText(m) === q
                  )
              )
                .slice(0, 2)
                .map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="px-3 py-1.5 text-xs rounded-full border border-bc-link/30 text-bc-link hover:bg-bc-blue-light transition-colors"
                  >
                    {q}
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
