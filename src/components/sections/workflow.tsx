import { Terminal } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { agentRoles } from "@/lib/data"

const humanCalls = [
  {
    title: "Architecture for systems that outlive me.",
    detail:
      "Once a foundation decision is baked in, fixing it costs months. Agents are fast — too fast for decisions that should be slow.",
  },
  {
    title: "What not to build.",
    detail:
      "AI is biased toward building — yes is cheap, no is hard. Scope creep, over-engineering, abstractions before they earn their keep. Saying no stays with me.",
  },
  {
    title: "Problem framing before the keyboard.",
    detail:
      "If I can't write the spec in one paragraph, I'm not ready to hand it to an agent.",
  },
  {
    title: "Security, auth, anything sensitive.",
    detail:
      "Confidently-wrong output here is catastrophic. Auth flows, session handling, anything with a compliance line of code — I read those with my own eyes.",
  },
  {
    title: "Hiring and people decisions.",
    detail:
      "Performance, conflict, mentoring, hiring calls. People deserve a human read — not a summary.",
  },
  {
    title: "Naming things that live in public.",
    detail:
      "Variables, products, repos, project names. The names outlive me and the taste shows. AI proposes; I dispose.",
  },
]

const sampleConfig = `# ~/.claude/agents/jeeves.md
---
name: jeeves
description: Personal Linux assistant. Owns desktop
  customization, hotkeys, packages, dotfiles.
  Reads ~/.config/claude/machine.md for context.
model: sonnet
tools: [Read, Edit, Write, Bash, WebSearch]
---

You are Jeeves. The Andromeda theme is law.
Click opens, Escape closes. Glow matches state.`

export function Workflow() {
  return (
    <Section
      id="workflow"
      eyebrow="How I build"
      title="My agent crew."
      description="I treat my AI workflow like part of the stack. Custom subagents, each with a job, configured in Markdown and version-controlled with my dotfiles. The skill isn't prompting — it's fluency. Conversation IS development. Including the site you're reading."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-4">
          {agentRoles.map((agent) => (
            <Card
              key={agent.name}
              className="flex flex-col gap-4 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-purple"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center border-2 border-purple">
                  <agent.icon className="size-5 text-purple" />
                </span>
                <div className="min-w-0">
                  <p className="font-bold leading-tight text-fg">
                    {agent.name}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-fg-muted">
                    {agent.duty}
                  </p>
                </div>
              </div>
              <p className="text-sm text-fg-muted">{agent.detail}</p>
              <p className="mt-auto border-t-2 border-line pt-3 text-sm italic text-purple/85">
                {agent.quote}
              </p>
            </Card>
          ))}
        </div>

        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-b-2 border-line bg-bg px-4 py-2">
            <div className="flex items-center gap-2 text-xs text-fg-muted">
              <Terminal className="size-3.5 text-cyan" />
              jeeves.md
            </div>
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-red" />
              <span className="size-2.5 rounded-full bg-yellow" />
              <span className="size-2.5 rounded-full bg-green" />
            </div>
          </div>
          <pre className="m-0 overflow-x-auto p-4 text-xs leading-relaxed text-fg-muted">
            <code>
              {sampleConfig.split("\n").map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="select-none text-line-strong">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={lineColor(line)}>{line || " "}</span>
                </div>
              ))}
            </code>
          </pre>
          <div className="border-t-2 border-line px-4 py-3 text-xs text-fg-muted">
            From{" "}
            <a
              href="https://github.com/raymondshiner/dotfiles"
              target="_blank"
              rel="noreferrer noopener"
              className="text-cyan underline-offset-4 hover:underline"
            >
              raymondshiner/dotfiles
            </a>{" "}
            — fully open source.
          </div>
        </Card>
      </div>

      <div className="mt-16 border-t-2 border-line-strong pt-12 sm:mt-20">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">
            — But
          </p>
          <h3 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
            What stays human.
          </h3>
        </div>
        <p className="mb-10 max-w-2xl text-sm text-fg-muted sm:text-base">
          Agents do execution. Judgment is mine. The list of things I don't
          delegate is shorter than I'd expect — but the items on it are
          non-negotiable.
        </p>
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {humanCalls.map((item, i) => (
            <li
              key={item.title}
              className="border-l-2 border-cyan pl-5"
            >
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-fg-muted">
                / 0{i + 1}
              </p>
              <h4 className="mb-1.5 font-bold text-fg">{item.title}</h4>
              <p className="text-sm text-fg-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

function lineColor(line: string): string {
  if (line.startsWith("#")) return "text-fg-muted italic"
  if (line.startsWith("---")) return "text-purple"
  if (line.includes(":") && !line.startsWith(" "))
    return "text-cyan"
  return "text-fg"
}
