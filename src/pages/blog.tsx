import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { posts } from "@/content/blog/index"

export default function BlogPage() {
  return (
    <main className="pt-20">
      <Section
        id="blog"
        eyebrow="Writing"
        title="Notes from the build."
        description="Field notes on shipping React, working with AI agents, and the design system behind my desktop."
        className="border-t-0"
      >
        <ul className="space-y-6">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                to={`/blog/${p.slug}`}
                className="group flex flex-col gap-3 border-2 border-line bg-bg-elev p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-fg-muted">
                      {p.date}
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                      {p.title}
                    </h2>
                    <p className="text-sm text-fg-muted">{p.summary}</p>
                  </div>
                  <ArrowUpRight className="size-5 shrink-0 text-fg-muted group-hover:text-cyan group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <ul className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t}>
                      <Badge tone="muted">{t}</Badge>
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  )
}
