import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { writing } from "@/content/writing/index"

export default function WritingPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const posts = [...writing]
    .filter((p) => !p.draft)
    .sort((a, b) => (a.published < b.published ? 1 : -1))

  return (
    <main className="px-4 pt-32 pb-24 sm:px-8">
      <article className="mx-auto max-w-3xl">
        <header className="mb-12 border-b-2 border-line pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">
            /writing
          </p>
          <h1 className="mt-2 text-5xl font-black tracking-tight text-fg sm:text-6xl">
            Drafts, opinions, theses.
          </h1>
          <p className="mt-4 text-lg text-fg-muted">
            Short pieces. Posted when they're done, not on a schedule.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-fg-muted">Nothing published yet.</p>
        ) : (
          <ul className="divide-y-2 divide-line border-y-2 border-line">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/writing/${p.slug}`}
                  className="group flex flex-col gap-2 py-6 transition-colors hover:bg-bg-elev sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold tracking-tight text-fg group-hover:text-cyan">
                      {p.title}
                    </h2>
                    <p className="mt-1 text-fg-muted">{p.summary}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-fg-muted sm:flex-col sm:items-end sm:gap-1">
                    <time dateTime={p.published}>
                      {formatDate(p.published)}
                    </time>
                    <ArrowUpRight className="size-3.5 text-fg-muted group-hover:text-cyan" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </article>
    </main>
  )
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}
