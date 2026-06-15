import { useEffect, type MouseEvent } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { GithubIcon } from "@/components/ui/brand-icons"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/lib/projects"
import { caseStudyComponents } from "@/content/case-studies/index"

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const meta = projects.find((p) => p.caseStudy === slug)
  const Component = slug ? caseStudyComponents[slug] : undefined

  const handleBack = (e: MouseEvent<HTMLAnchorElement>) => {
    if (window.history.length > 1) {
      e.preventDefault()
      navigate(-1)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!meta || !Component) {
    return (
      <main className="mx-auto max-w-3xl px-4 pt-32 sm:px-8">
        <p className="text-fg-muted">Case study not found.</p>
        <Link to="/#work" onClick={handleBack} className="text-cyan underline">
          Back to work
        </Link>
      </main>
    )
  }

  return (
    <main className="px-4 pt-32 pb-24 sm:px-8">
      <article className="mx-auto max-w-3xl">
        <Link
          to="/#work"
          onClick={handleBack}
          className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-fg-muted hover:text-cyan"
        >
          <ArrowLeft className="size-3" /> Back to work
        </Link>
        <header className="mb-10 space-y-4 border-b-2 border-line pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">
            Case study
          </p>
          <h1 className="text-4xl font-black tracking-tight text-fg sm:text-5xl">
            {meta.title}
          </h1>
          <p className="text-lg text-fg-muted">{meta.tagline}</p>
          <ul className="flex flex-wrap gap-2">
            {meta.stack.map((s) => (
              <li key={s}>
                <Badge tone="muted">{s}</Badge>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2 text-xs uppercase tracking-wider">
            {meta.github && (
              <a
                href={meta.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-fg-muted hover:text-cyan"
              >
                <GithubIcon className="size-3.5" /> Code
              </a>
            )}
            {meta.live && (
              <a
                href={meta.live}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-fg-muted hover:text-cyan"
              >
                Live <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </div>
        </header>
        <div className="prose-andromeda">
          <Component />
        </div>
      </article>
    </main>
  )
}
