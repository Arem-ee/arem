"use client";

import dynamic from "next/dynamic";
import { MessageCircle, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { matchQuery } from "@/lib/chat/matcher";
import { fallbackAnswer, greeting, suggestedQuestions } from "@/lib/chat/knowledge";

const Avatar3D = dynamic(() => import("@/components/chat/avatar-3d").then((m) => m.Avatar3D), {
  ssr: false,
});

interface Message {
  role: "user" | "bot";
  text: string;
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<number | null>(null);

  // lazy-load the 3D avatar: on first open, hover, focus, or after idle
  useEffect(() => {
    if (avatarLoaded) return;
    const kick = () => setAvatarLoaded(true);
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    const idleId = w.requestIdleCallback
      ? w.requestIdleCallback(kick, { timeout: 5000 })
      : window.setTimeout(kick, 4000);
    const btn = buttonRef.current;
    btn?.addEventListener("pointerenter", kick, { once: true });
    btn?.addEventListener("focus", kick, { once: true });
    return () => {
      w.cancelIdleCallback?.(idleId);
      clearTimeout(idleId);
    };
  }, [avatarLoaded]);

  useEffect(() => {
    if (open && messages.length === 0) {
      timerRef.current = window.setTimeout(() => {
        setMessages([{ role: "bot", text: greeting }]);
      }, 600);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || typing) return;
      setMessages((m) => [...m, { role: "user", text }]);
      setInput("");
      setTyping(true);
      const delay = 700 + Math.random() * 600;
      window.setTimeout(() => {
        const result = matchQuery(text);
        const answer =
          result.id === null && text.length > 0 && result.answer === fallbackAnswer
            ? fallbackAnswer
            : result.answer;
        setMessages((m) => [...m, { role: "bot", text: answer }]);
        setTyping(false);
      }, delay);
    },
    [typing]
  );

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Arem"
          className="fixed bottom-24 right-4 z-[60] flex h-[min(600px,72vh)] w-[min(92vw,384px)] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_60px_rgba(0,0,0,0.3)] sm:right-6"
        >
          <div className="flex items-center gap-3 bg-[#0a0a0a] px-4 py-3">
            {avatarLoaded ? (
              <Avatar3D size={56} speaking={typing} paused={!open} />
            ) : (
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[#1a1a1a]">
                <MessageCircle className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-primary">Arem</p>
              <p className="text-xs text-white/60">
                {typing ? "Typing..." : "Ask me anything"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto bg-background p-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-[#0a0a0a] px-3 py-2 text-[13px] leading-relaxed text-white dark:bg-primary dark:text-primary-foreground"
                    : "mr-auto max-w-[85%] rounded-lg rounded-bl-sm bg-muted px-3 py-2 text-[13px] leading-relaxed text-foreground"
                }
              >
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="mr-auto flex max-w-[85%] items-center gap-1.5 rounded-lg rounded-bl-sm bg-muted px-3 py-2.5">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${d * 150}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          {messages.length <= 1 && !typing && (
            <div className="flex flex-wrap gap-2 border-t border-border bg-background px-4 pb-2 pt-3">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-card p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              aria-label="Ask a question"
              className="h-9 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim() || typing}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with Arem"}
        aria-expanded={open}
        className="fixed bottom-5 right-4 z-[60] grid h-13 w-13 place-items-center overflow-hidden rounded-full border border-primary/50 bg-[#0a0a0a] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 sm:right-6"
        style={{ height: 52, width: 52 }}
      >
        {open ? (
          <X className="h-5 w-5 text-primary" aria-hidden="true" />
        ) : avatarLoaded ? (
          <Avatar3D size={52} paused={false} />
        ) : (
          <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />
        )}
      </button>
    </>
  );
}

export { ChatWidget };