import { Terminal } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { agentRoles } from "@/lib/data"

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
      description="I treat my AI workflow like part of the stack. Custom subagents, each with a job, configured in Markdown and version-controlled with the rest of my dotfiles. The site you're reading was vibe-coded with them."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {agentRoles.map((agent) => (
            <Card
              key={agent.name}
              className="flex flex-col gap-3 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-purple"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center border-2 border-purple">
                  <agent.icon className="size-5 text-purple" />
                </span>
                <div>
                  <p className="font-bold text-fg">{agent.name}</p>
                  <p className="text-xs uppercase tracking-wider text-fg-muted">
                    {agent.duty}
                  </p>
                </div>
              </div>
              <p className="text-sm text-fg-muted">{agent.detail}</p>
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
