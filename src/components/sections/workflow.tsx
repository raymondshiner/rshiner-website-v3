import { Section } from "@/components/ui/section"
import { agentRoles } from "@/lib/data"

const agentAccents = ["#00E8C6", "#FFE66D", "#B084EB"] as const

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

export function Workflow() {
  return (
    <Section
      id="workflow"
      eyebrow="How I build"
      title="My team."
      description="I treat my AI workflow like part of the stack. A small team of custom subagents, each with a job, configured in Markdown and version-controlled alongside the rest of my dotfiles. The skill isn't prompting — it's fluency. Conversation IS development — this site included."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agentRoles.map((agent, i) => {
          const accent = agentAccents[i % agentAccents.length]
          return (
            <div
              key={agent.name}
              className="group/flip h-56 [perspective:1200px]"
            >
              <div className="relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover/flip:[transform:rotateY(180deg)] group-focus-within/flip:[transform:rotateY(180deg)]">
                {/* Front */}
                <div
                  tabIndex={0}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 text-center outline-none [backface-visibility:hidden]"
                  style={{
                    borderColor: accent,
                    background: `linear-gradient(160deg, ${accent}26 0%, ${accent}0D 60%, var(--color-bg-elev) 100%)`,
                    boxShadow: `0 0 0 1px ${accent}33, 0 12px 32px -16px ${accent}80`,
                  }}
                >
                  <span
                    className="flex size-14 items-center justify-center rounded-xl border-2"
                    style={{
                      borderColor: accent,
                      background: `${accent}1F`,
                      boxShadow: `0 0 18px ${accent}55`,
                    }}
                  >
                    <agent.icon
                      className="size-7"
                      style={{ color: accent }}
                    />
                  </span>
                  <div>
                    <p
                      className="text-lg font-bold leading-tight"
                      style={{ color: accent }}
                    >
                      {agent.name}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-fg-muted">
                      {agent.duty}
                    </p>
                  </div>
                  <p
                    className="text-sm italic"
                    style={{ color: `${accent}D9` }}
                  >
                    {agent.quote}
                  </p>
                </div>
                {/* Back */}
                <div
                  className="absolute inset-0 flex flex-col gap-3 rounded-2xl border-2 bg-bg-elev p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  style={{
                    borderColor: accent,
                    boxShadow: `4px 4px 0 0 ${accent}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-lg border-2"
                      style={{
                        borderColor: accent,
                        background: `${accent}1F`,
                      }}
                    >
                      <agent.icon
                        className="size-4"
                        style={{ color: accent }}
                      />
                    </span>
                    <div className="min-w-0">
                      <p
                        className="font-bold leading-tight"
                        style={{ color: accent }}
                      >
                        {agent.name}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-fg-muted">
                        {agent.duty}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-fg-muted">{agent.detail}</p>
                </div>
              </div>
            </div>
          )
        })}
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