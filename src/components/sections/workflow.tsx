import { Link } from "react-router-dom"
import { Section } from "@/components/ui/section"

const delegated = [
  {
    title: "Scaffolding and boilerplate.",
    detail:
      "New components, config wiring, test harnesses. The shape is already decided — the typing isn't the job.",
  },
  {
    title: "Mechanical migrations.",
    detail:
      "Codemods, dependency upgrades, renames that fan out across a codebase. The pattern is fixed; volume is the problem.",
  },
  {
    title: "First-pass research.",
    detail:
      "Library comparisons, API surface reading, error archaeology. Agents gather sources; I weigh them.",
  },
  {
    title: "Test extension.",
    detail:
      "I write the first test to set the pattern. Agents extend the coverage from there.",
  },
]

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

const trustGates = [
  {
    title: "Read before it ships.",
    detail:
      "Every diff gets reviewed like a PR from a new hire — skeptically, with depth scaling to stakes. Security and auth get read line by line, every time.",
  },
  {
    title: "Gates, not vibes.",
    detail:
      "Strict TypeScript, tests, and UI verification on real desktop and mobile viewports. Output that can't pass the gates doesn't land.",
  },
  {
    title: "My name on the commit.",
    detail:
      "If it breaks in production, “the AI did it” isn't an answer. I ship it, I own it.",
  },
]

function SubHeading({
  marker,
  title,
  intro,
}: {
  marker: string
  title: string
  intro: string
}) {
  return (
    <>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan">
          — {marker}
        </p>
        <h3 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          {title}
        </h3>
      </div>
      <p className="mb-10 max-w-2xl text-sm text-fg-muted sm:text-base">
        {intro}
      </p>
    </>
  )
}

function CallList({
  items,
  accentClass,
}: {
  items: { title: string; detail: string }[]
  accentClass: string
}) {
  return (
    <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <li key={item.title} className={`border-l-2 ${accentClass} pl-5`}>
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-fg-muted">
            / 0{i + 1}
          </p>
          <h4 className="mb-1.5 font-bold text-fg">{item.title}</h4>
          <p className="text-sm text-fg-muted">{item.detail}</p>
        </li>
      ))}
    </ul>
  )
}

export function Workflow() {
  return (
    <Section
      id="workflow"
      eyebrow="How I work"
      title="AI is in the toolchain. Judgment isn't delegated."
      description="I use AI heavily, and openly: agents take the mechanical work so my attention goes where it's actually needed. Every delegation has a boundary, and every line gets read before it ships. The commit — and the responsibility — stays mine. Here's the split."
    >
      <div>
        <SubHeading
          marker="First"
          title="What I delegate."
          intro="The work where the decision is already made and what's left is execution. Handing it off isn't laziness — it's where the hours come back."
        />
        <CallList items={delegated} accentClass="border-purple" />
      </div>

      <div className="mt-16 border-t-2 border-line-strong pt-12 sm:mt-20">
        <SubHeading
          marker="But"
          title="What stays human."
          intro="Agents do execution. Judgment is mine. The list of things I don't delegate is shorter than I'd expect — but the items on it are non-negotiable."
        />
        <CallList items={humanCalls} accentClass="border-cyan" />
      </div>

      <div className="mt-16 border-t-2 border-line-strong pt-12 sm:mt-20">
        <SubHeading
          marker="And"
          title="How output earns trust."
          intro="Generated code is a draft, not a deliverable. Nothing lands without passing the same bar I'd hold a teammate to."
        />
        <CallList items={trustGates} accentClass="border-green" />
      </div>

      <div className="mt-16 rounded-2xl border-2 border-line-strong bg-bg-elev p-6 sm:mt-20 sm:p-8">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan">
          — Proof, not claims
        </p>
        <p className="max-w-3xl text-sm text-fg-muted sm:text-base">
          At DMG I built a commit-gated migration agent that moved production
          codebases off a seven-year-old component library — thousands of
          files, shipped centrally with documentation, adopted by the wider
          React group for their own upgrades. The same discipline built this
          site.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold">
          <Link
            to="/case-study/portfolio-v3"
            className="text-cyan transition-colors hover:text-fg"
          >
            Read how this site was built →
          </Link>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("ask-raymond:open"))
            }
            className="cursor-pointer text-purple transition-colors hover:text-fg"
          >
            Or ask the assistant I built →
          </button>
        </div>
      </div>
    </Section>
  )
}
