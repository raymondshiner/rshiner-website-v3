import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface Project {
  // GitHub slug "owner/name" — omit to skip live activity tracking (e.g. private repos)
  slug?: string
  title: string
  displayUrl?: string
  privateBadge?: string
  blurb: React.ReactNode
}

const projects: Project[] = [
  {
    slug: "raymondshiner/rshiner-website-v3",
    title: "rshiner-website-v3",
    displayUrl: "https://github.com/raymondshiner/rshiner-website-v3",
    blurb: (
      <>
        this site. React 19 + Tailwind v4 + Andromeda theme + an MDX content
        layer. Built in a session alongside my Claude Code agent crew.
      </>
    ),
  },
  {
    slug: "raymondshiner/al-bhed-translator",
    title: "al-bhed-translator",
    displayUrl: "https://github.com/raymondshiner/al-bhed-translator",
    blurb: (
      <>
        shipped early June. A small Final Fantasy X cipher tool, but it was the
        proving ground for the Andromeda theme, the verify-ui Playwright
        pattern, and the Smith MCP workflow I now use everywhere else.
      </>
    ),
  },
  {
    slug: "raymondshiner/montressor",
    title: "montressor",
    displayUrl: "https://github.com/raymondshiner/montressor",
    blurb: (
      <>
        my hand-built Arch + Hyprland desktop dotfiles: waybar, kitty,
        Hyprland config, the Python + GTK popup scripts that drive every
        interactive control, all in the Andromeda palette. The Claude Code
        agent crew that runs on top of it (Jarvis, Friday, Smith) lives in a
        separate private repo — that's the secret sauce, and it stays sealed.
      </>
    ),
  },
]

interface RepoActivity {
  slug: string
  htmlUrl: string | null
  pushedAt: string | null
  commitsLastWeek: number | null
  error?: string
}

type ActivityMap = Record<string, RepoActivity>

export function BuildingNow() {
  const [activity, setActivity] = useState<ActivityMap | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const repos = projects
      .map((p) => p.slug)
      .filter((s): s is string => !!s)
      .join(",")
    if (!repos) return
    fetch(`/api/github-activity?repos=${encodeURIComponent(repos)}`, {
      signal: controller.signal,
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(`${r.status}`)
        return (await r.json()) as { repos: RepoActivity[] }
      })
      .then((data) => {
        const map: ActivityMap = {}
        for (const r of data.repos) map[r.slug] = r
        setActivity(map)
      })
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return
        setFailed(true)
      })
    return () => controller.abort()
  }, [])

  return (
    <section className="not-prose my-8">
      <h2 className="text-2xl font-bold tracking-tight text-fg">
        Building right now
      </h2>
      <ul className="mt-6 space-y-6">
        {projects.map((p) => {
          const a = p.slug ? activity?.[p.slug] : undefined
          const tracked = !!p.slug
          return (
            <li
              key={p.title}
              className="border-l-2 border-line pl-4 hover:border-purple transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2">
                {p.displayUrl ? (
                  <a
                    href={p.displayUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-bold text-cyan underline-offset-4 hover:underline"
                  >
                    {p.title}
                  </a>
                ) : (
                  <span className="font-bold text-fg">{p.title}</span>
                )}
                {tracked && (
                  <ActivityChip activity={a} loading={!activity && !failed} />
                )}
                {p.privateBadge && (
                  <span className="inline-flex items-center gap-1.5 border-2 border-purple/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-purple">
                    <span className="size-1.5 rounded-full bg-purple" />
                    {p.privateBadge}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-fg-muted">{p.blurb}</p>
            </li>
          )
        })}
      </ul>
      <p className="mt-6 text-xs text-fg-muted">
        Activity pulled live from GitHub — this list updates itself.
      </p>
    </section>
  )
}

function ActivityChip({
  activity,
  loading,
}: {
  activity: RepoActivity | undefined
  loading: boolean
}) {
  if (loading) {
    return (
      <span className="inline-flex items-center gap-1.5 border-2 border-line/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-fg-muted">
        <span className="size-1.5 animate-pulse rounded-full bg-fg-muted" />
        loading
      </span>
    )
  }
  if (!activity || activity.error || !activity.pushedAt) return null

  const pushed = new Date(activity.pushedAt)
  const daysAgo = Math.max(
    0,
    Math.floor((Date.now() - pushed.getTime()) / 86_400_000),
  )
  const commits = activity.commitsLastWeek ?? 0

  // Tone: cyan if active this week, muted if quiet
  const active = commits > 0 || daysAgo <= 7
  const tone = active
    ? "border-cyan/60 text-cyan"
    : "border-line text-fg-muted"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border-2 px-2 py-0.5 text-[10px] uppercase tracking-wider",
        tone,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          active ? "bg-cyan animate-pulse" : "bg-fg-muted",
        )}
      />
      {formatPushed(daysAgo)}
      {commits > 0 && <> • {commits} commit{commits === 1 ? "" : "s"}/wk</>}
    </span>
  )
}

function formatPushed(daysAgo: number) {
  if (daysAgo === 0) return "pushed today"
  if (daysAgo === 1) return "pushed 1d ago"
  if (daysAgo < 30) return `pushed ${daysAgo}d ago`
  if (daysAgo < 365) return `pushed ${Math.floor(daysAgo / 30)}mo ago`
  return `pushed ${Math.floor(daysAgo / 365)}y ago`
}
