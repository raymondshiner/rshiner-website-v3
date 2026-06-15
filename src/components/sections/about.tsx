import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { skillCategories, experience } from "@/lib/data"

export function About() {
  return (
    <Section
      id="about"
      eyebrow="The work"
      title="Built systems. Led teams. Ships with agents."
      description="I've been writing functional React since 2020 — at startups, at scale, on greenfield builds, in legacy battlegrounds. Code was the medium I trained for. AI is the medium I ship in now. The work — solving unique problems in the digital space — is the same. The craft is new."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {skillCategories.map((cat) => (
          <SkillCard key={cat.title} category={cat} />
        ))}
      </div>

      <div className="mt-20">
        <h3 className="mb-6 text-xs uppercase tracking-[0.3em] text-cyan">
          — Selected experience
        </h3>
        <ol className="relative space-y-10 border-l-2 border-line pl-6">
          {experience.map((exp) => (
            <ExperienceItem key={`${exp.title}-${exp.company}`} exp={exp} />
          ))}
        </ol>
      </div>
    </Section>
  )
}

function ExperienceItem({ exp }: { exp: (typeof experience)[number] }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="relative">
      <span
        className={
          "absolute -left-[27px] top-2 size-3 border-2 " +
          (exp.current ? "border-cyan bg-cyan" : "border-line-strong bg-bg")
        }
      />
      <Card
        className={
          "p-5 transition-all duration-300 " +
          (open
            ? "border-purple/50 shadow-[0_0_0_1px_rgb(176_132_235_/_0.25),0_8px_24px_-8px_rgb(176_132_235_/_0.35)]"
            : "")
        }
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <p className="font-bold text-fg">{exp.title}</p>
            <p className="text-cyan">{exp.company}</p>
          </div>
          <p className="text-xs uppercase tracking-wider text-fg-muted">
            {exp.period}
          </p>
        </div>
        {exp.highlight && (
          <p className="mt-3 inline-block border-2 border-cyan/40 bg-cyan/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-cyan">
            {exp.highlight}
          </p>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group/toggle mt-3 flex w-full cursor-pointer items-baseline gap-3 text-left text-sm italic text-fg"
        >
          {exp.headline && <span className="flex-1">{exp.headline}</span>}
          <span
            className={
              "inline-flex shrink-0 items-center gap-1 text-xs uppercase not-italic tracking-wider transition-colors " +
              (open ? "text-purple" : "text-purple/80 group-hover/toggle:text-purple")
            }
          >
            <span>{open ? "less" : "more"}</span>
            <ChevronDown
              className={
                "size-3.5 transition-transform duration-300 " +
                (open ? "rotate-180" : "")
              }
            />
          </span>
        </button>
        <div
          className={
            "grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out " +
            (open
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0")
          }
        >
          <div className="overflow-hidden">
            <div className="border-l-2 border-purple/40 bg-purple/[0.04] py-4 pl-5 pr-4">
              <ul className="space-y-3 text-sm text-fg-muted">
                {exp.bullets.map((b, i) => (
                  <li
                    key={i}
                    className={
                      "flex gap-3 transition-all duration-500 " +
                      (open
                        ? "translate-y-0 opacity-100"
                        : "translate-y-1 opacity-0")
                    }
                    style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
                  >
                    <span className="mt-2 size-1.5 shrink-0 bg-purple" />
                    <span className="leading-relaxed">{renderBold(b)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </li>
  )
}

function SkillCard({
  category,
}: {
  category: (typeof skillCategories)[number]
}) {
  const Icon = category.icon
  const tone = category.accent
  return (
    <Card className="group flex flex-col gap-4 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal">
      <div className="flex items-center gap-3">
        <span
          className={
            "flex size-10 items-center justify-center border-2 " +
            toneToBorder(tone)
          }
        >
          <Icon className={"size-5 " + toneToText(tone)} />
        </span>
        <div>
          <p className="font-bold text-fg">{category.title}</p>
          <p className="text-xs text-fg-muted">{category.summary}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.items.map((s) => (
          <Badge key={s} tone={tone}>
            {s}
          </Badge>
        ))}
      </div>
    </Card>
  )
}

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-fg">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function toneToBorder(tone: "cyan" | "purple" | "green" | "yellow") {
  switch (tone) {
    case "cyan":
      return "border-cyan"
    case "purple":
      return "border-purple"
    case "green":
      return "border-green"
    case "yellow":
      return "border-yellow"
  }
}

function toneToText(tone: "cyan" | "purple" | "green" | "yellow") {
  switch (tone) {
    case "cyan":
      return "text-cyan"
    case "purple":
      return "text-purple"
    case "green":
      return "text-green"
    case "yellow":
      return "text-yellow"
  }
}
