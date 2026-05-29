import { ArrowUpRight, Star } from "lucide-react"
import { GithubIcon } from "@/components/ui/brand-icons"
import { Link } from "react-router-dom"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/lib/projects"

export function Projects() {
  const highlights = projects.filter((p) => p.highlight)
  const rest = projects.filter((p) => !p.highlight)

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="What I've shipped."
      description="From personal tools to founding-engineer builds. Project sources live on GitHub; deeper case studies live here."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {highlights.map((p) => (
          <ProjectCard key={p.slug} project={p} featured />
        ))}
      </div>

      {rest.length > 0 && (
        <>
          <h3 className="mt-16 mb-6 text-xs uppercase tracking-[0.3em] text-fg-muted">
            — More
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </>
      )}
    </Section>
  )
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: (typeof projects)[number]
  featured?: boolean
}) {
  const wrapperClass = featured
    ? "group relative flex flex-col gap-5 border-2 border-cyan bg-bg-elev p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal"
    : "group relative flex flex-col gap-4 border-2 border-line bg-bg-elev p-5 transition-all hover:border-cyan hover:-translate-y-1"

  return (
    <Card className={wrapperClass}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          {featured && (
            <Badge tone="cyan">
              <Star className="size-3" />
              Highlight
            </Badge>
          )}
          <h3 className="text-xl font-bold tracking-tight text-fg sm:text-2xl">
            {project.caseStudy ? (
              <Link
                to={`/case-study/${project.caseStudy}`}
                className="outline-none before:absolute before:inset-0 before:content-[''] focus-visible:underline"
              >
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>
          <p className="text-sm text-cyan">{project.tagline}</p>
        </div>
        <ArrowUpRight className="size-5 shrink-0 text-fg-muted transition-transform group-hover:text-cyan group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <p className="text-sm text-fg-muted">{project.description}</p>

      <ul className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Badge tone="muted">{tech}</Badge>
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-auto flex flex-wrap gap-3 pt-2 text-xs uppercase tracking-wider">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-fg-muted hover:text-cyan"
          >
            <GithubIcon className="size-3.5" /> Code
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-fg-muted hover:text-cyan"
          >
            Live ↗
          </a>
        )}
      </div>
    </Card>
  )
}
