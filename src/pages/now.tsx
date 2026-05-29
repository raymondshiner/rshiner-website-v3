import { useEffect } from "react"
import NowBody from "@/content/now.mdx"
import { nowMeta } from "@/content/now-meta"

export default function NowPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const updated = new Date(nowMeta.updated + "T00:00:00Z")
  const updatedLabel = updated.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
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
          <div className="mb-4 flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan">
              /now
            </p>
            <span className="inline-flex items-center gap-1.5 border-2 border-line px-2 py-0.5 text-xs uppercase tracking-wider text-fg-muted">
              <span className="size-1.5 animate-pulse rounded-full bg-cyan" />
              Last updated {updatedLabel}
              {daysAgo === 0 ? " (today)" : ` (${daysAgo}d ago)`}
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tight text-fg sm:text-6xl">
            Where I'm at.
          </h1>
          <p className="mt-4 text-lg text-fg-muted">{nowMeta.summary}</p>
          <p className="mt-4 text-xs text-fg-muted">
            Inspired by{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noreferrer noopener"
              className="text-cyan underline-offset-4 hover:underline"
            >
              the /now page movement
            </a>
            .
          </p>
        </header>
        <div className="prose-andromeda">
          <NowBody />
        </div>
      </article>
    </main>
  )
}
