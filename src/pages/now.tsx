import { useEffect } from "react"
import NowBody from "@/content/now.mdx"
import { nowMeta } from "@/content/now-meta"

const roleShortlist = [
  "Senior / staff frontend on React + TS",
  "Tech-lead / team-lead where judgment matters more than headcount",
  "Greenfield builds — early architectural calls",
  "Smaller teams where engineering and leadership are the same hat",
]

export default function NowPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const updated = new Date(nowMeta.updated + "T00:00:00Z")
  const updatedLabel = updated.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
  const daysAgo = Math.max(
    0,
    Math.floor((Date.now() - updated.getTime()) / 86_400_000),
  )

  return (
    <main className="px-4 pt-32 pb-24 sm:px-8">
      <article className="mx-auto max-w-3xl">
        <header className="mb-12 border-b-2 border-line pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">/now</p>
          <h1 className="mt-2 text-5xl font-black tracking-tight text-fg sm:text-6xl">
            Where I'm at.
          </h1>
          <p className="mt-4 text-lg text-fg-muted">{nowMeta.summary}</p>

          <div className="mt-5">
            <span className="inline-flex items-center gap-1.5 border-2 border-line px-2 py-0.5 text-xs uppercase tracking-wider text-fg-muted">
              <span className="size-1.5 rounded-full bg-fg-muted" />
              Editorial updated {updatedLabel}
              {daysAgo === 0 ? " (today)" : ` (${daysAgo}d ago)`}
            </span>
          </div>

          <aside
            aria-label="Hiring status"
            className="mt-6 border-2 border-purple/60 bg-purple/[0.04] p-4 shadow-brutal-purple"
          >
            <div className="flex items-baseline gap-2">
              <span className="size-1.5 animate-pulse rounded-full bg-purple" />
              <p className="text-xs uppercase tracking-[0.25em] text-purple">
                Looking for work — May 2026 onward
              </p>
            </div>
            <p className="mt-2 text-sm text-fg-muted">
              Open to full-time, contract, or freelance. Remote, Pacific time.
            </p>
            <ul className="mt-3 grid gap-1 text-sm text-fg-muted sm:grid-cols-2">
              {roleShortlist.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="mt-2 size-1 shrink-0 bg-purple" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </aside>

        </header>
        <div className="prose-andromeda">
          <NowBody />
        </div>
      </article>
    </main>
  )
}
