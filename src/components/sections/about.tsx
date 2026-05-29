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
        <ol className="relative space-y-6 border-l-2 border-line pl-6">
          {experience.map((exp) => (
            <li key={`${exp.title}-${exp.company}`} className="relative">
              <span
                className={
                  "absolute -left-[27px] top-2 size-3 border-2 " +
                  (exp.current
                    ? "border-cyan bg-cyan"
                    : "border-line-strong bg-bg")
                }
              />
              <Card className="p-5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="font-bold text-fg">{exp.title}</p>
                    <p className="text-cyan">{exp.company}</p>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-fg-muted">
                    {exp.period}
                  </p>
                </div>
                <p className="mt-3 text-sm text-fg-muted">{exp.description}</p>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </Section>
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
