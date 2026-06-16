import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FileText, Globe } from "lucide-react"
import { GithubIcon } from "@/components/ui/brand-icons"
import { cn } from "@/lib/utils"

interface Project {
  // GitHub slug "owner/name" — omit to skip live activity tracking (e.g. private repos)
  slug?: string
  title: string
  githubUrl?: string
  liveUrl?: string
  caseStudy?: string
  privateBadge?: string
  blurb: React.ReactNode
}

const projects: Project[] = [
  {
    slug: "raymondshiner/rshiner-website-v3",
    title: "Portfolio v3",
    githubUrl: "https://github.com/raymondshiner/rshiner-website-v3",
    liveUrl: "https://raymondshiner.com",
    caseStudy: "portfolio-v3",
    blurb: <>this site — Andromeda, MDX, and the agent crew that ships it.</>,
  },
  {
    slug: "raymondshiner/al-bhed-translator",
    title: "Al Bhed Translator",
    githubUrl: "https://github.com/raymondshiner/al-bhed-translator",
    liveUrl: "https://albhed.raymondshiner.com",
    caseStudy: "al-bhed-translator",
    blurb: (
      <>
        the FFX cipher tool — proving ground for the Andromeda theme and the
        Smith MCP workflow I now use everywhere else.
      </>
    ),
  },
  {
    slug: "raymondshiner/montressor",
    title: "Montressor",
    githubUrl: "https://github.com/raymondshiner/montressor",
    caseStudy: "montressor",
    blurb: (
      <>
        hand-built Arch + Hyprland desktop dotfiles. The agent crew that
        runs on top lives in a separate private repo.
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
              <div className="flex items-start gap-3">
                <div className="flex flex-1 flex-wrap items-center gap-2">
                  <span className="font-bold text-fg">{p.title}</span>
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
                <div className="flex shrink-0 items-center gap-1.5">
                  {p.githubUrl && (
                    <IconButton
                      href={p.githubUrl}
                      external
                      label={`${p.title} source on GitHub`}
                      tooltip="View source"
                    >
                      <GithubIcon className="size-3.5" />
                    </IconButton>
                  )}
                  {p.liveUrl && (
                    <IconButton
                      href={p.liveUrl}
                      external
                      label={`${p.title} live site`}
                      tooltip="Live site"
                    >
                      <Globe className="size-3.5" />
                    </IconButton>
                  )}
                  {p.caseStudy && (
                    <IconButton
                      to={`/case-study/${p.caseStudy}`}
                      label={`${p.title} case study`}
                      tooltip="Case study"
                    >
                      <FileText className="size-3.5" />
                    </IconButton>
                  )}
                </div>
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

const iconButtonClass =
  "group/iconbtn relative inline-flex size-7 shrink-0 items-center justify-center border-2 border-purple/40 bg-purple/10 text-purple transition-all hover:-translate-y-0.5 hover:border-purple hover:bg-purple/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/60"

function IconButton({
  href,
  to,
  external,
  label,
  tooltip,
  children,
}: {
  href?: string
  to?: string
  external?: boolean
  label: string
  tooltip: string
  children: React.ReactNode
}) {
  const inner = (
    <>
      {children}
      <Tooltip>{tooltip}</Tooltip>
    </>
  )
  if (to) {
    return (
      <Link to={to} aria-label={label} className={iconButtonClass}>
        {inner}
      </Link>
    )
  }
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      aria-label={label}
      className={iconButtonClass}
    >
      {inner}
    </a>
  )
}

function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap border-2 border-purple/40 bg-bg-elev px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-fg opacity-0 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)] transition-all duration-150 group-hover/iconbtn:translate-y-0 group-hover/iconbtn:opacity-100 group-focus-visible/iconbtn:translate-y-0 group-focus-visible/iconbtn:opacity-100"
    >
      <span
        aria-hidden
        className="absolute -top-[5px] left-1/2 size-2 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-purple/40 bg-bg-elev"
      />
      {children}
    </span>
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
