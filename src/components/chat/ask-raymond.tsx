import { useEffect, useRef, useState } from "react"
import { MessageSquare, Send, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
}

const seedSuggestions = [
  "What stack does Raymond use most?",
  "Tell me about his agent setup",
  "Is he available for freelance?",
]

const fallbackResponses: Record<string, string> = {
  stack:
    "React 19, TypeScript, Tailwind v4, Vite, shadcn/ui. C# on the backend when needed. Apollo GraphQL, MS Graph + MSAL in production.",
  agent:
    "He runs a Claude Code crew of three custom subagents: Jarvis (desktop & machine — Arch/Hyprland, dotfiles, hotkeys), Friday (research assistant — external web research and product picks), Smith (code agent — features, refactors, deploys; spawns in parallel for bigger jobs). The Arch + Hyprland desktop they run on is public at github.com/raymondshiner/montressor; the agent prompts and configs themselves stay in a separate private repo — that's the workshop, sealed.",
  freelance:
    "Yes — fully open right now. No current full-time gig as of May 2026, taking full-time, contract, and freelance leads. raymondshiner@gmail.com is the fastest path.",
}

export function AskRaymond() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey — I'm an AI primed on Raymond's resume, projects, and /now page. Ask me anything about his work.",
    },
  ])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  useEffect(() => {
    if (!open) abortRef.current?.abort()
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || sending) return
    setInput("")
    setMessages((m) => [...m, { role: "user", content: trimmed }])
    setSending(true)

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
        signal: controller.signal,
      })
      if (!res.ok) throw new Error("api unavailable")
      const data: { reply: string } = await res.json()
      setMessages((m) => [...m, { role: "assistant", content: data.reply }])
    } catch (err) {
      if ((err as { name?: string })?.name === "AbortError") return
      setMessages((m) => [
        ...m,
        { role: "assistant", content: localReply(trimmed) },
      ])
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null
        setSending(false)
      }
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 items-center gap-2 border-2 border-cyan bg-bg-elev px-4 font-semibold uppercase tracking-wider text-cyan transition-all hover:shadow-brutal",
          open && "opacity-0 pointer-events-none",
        )}
        aria-label="Open Ask Raymond"
      >
        <Sparkles className="size-4" />
        <span className="hidden sm:inline">Ask Raymond</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Ask Raymond"
          className="fixed inset-x-4 bottom-4 z-50 flex max-h-[80vh] flex-col border-2 border-cyan bg-bg-elev shadow-brutal sm:bottom-6 sm:right-6 sm:left-auto sm:w-[420px]"
        >
          <header className="flex items-center justify-between border-b-2 border-line bg-bg px-4 py-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-4 text-cyan" />
              <p className="text-sm font-bold uppercase tracking-wider text-fg">
                Ask Raymond
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center border-2 border-line text-fg-muted hover:border-cyan hover:text-cyan"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto p-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] border-2 px-3 py-2 text-sm",
                  m.role === "assistant"
                    ? "border-line bg-bg text-fg"
                    : "ml-auto border-cyan bg-cyan/10 text-fg",
                )}
              >
                {m.content}
              </div>
            ))}
            {sending && (
              <div className="max-w-[85%] border-2 border-line bg-bg px-3 py-2 text-sm text-fg-muted">
                <span className="inline-flex gap-1">
                  <Dot delay={0} />
                  <Dot delay={150} />
                  <Dot delay={300} />
                </span>
              </div>
            )}
            {messages.length === 1 && (
              <div className="space-y-1.5 pt-2">
                {seedSuggestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="block w-full border-2 border-line bg-transparent px-3 py-2 text-left text-xs text-fg-muted hover:border-cyan hover:text-cyan"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex gap-2 border-t-2 border-line bg-bg p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
              maxLength={500}
              className="flex-1 border-2 border-line bg-bg-elev px-3 py-2 text-sm text-fg placeholder:text-fg-muted focus:border-cyan focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              className="flex h-10 w-10 items-center justify-center border-2 border-cyan bg-cyan/10 text-cyan transition-all hover:bg-cyan hover:text-bg disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="size-1.5 animate-bounce rounded-full bg-fg-muted"
      style={{ animationDelay: `${delay}ms` }}
    />
  )
}

function localReply(prompt: string): string {
  const p = prompt.toLowerCase()
  if (p.includes("stack") || p.includes("tech") || p.includes("framework"))
    return fallbackResponses.stack
  if (p.includes("agent") || p.includes("ai") || p.includes("claude"))
    return fallbackResponses.agent
  if (p.includes("hire") || p.includes("freelance") || p.includes("available"))
    return fallbackResponses.freelance
  return "I'm running in offline mode right now (the AI backend isn't wired up yet) — email raymondshiner@gmail.com and the real Raymond will get back to you."
}
