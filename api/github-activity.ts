// Vercel Node function: returns recent activity for a set of GitHub repos.
// Query: ?repos=owner/name,owner/name
// Response: { repos: [{ slug, htmlUrl, pushedAt, commitsLastWeek, error? }] }
// Cached at the edge for 1h; uses GITHUB_TOKEN when present to dodge the
// 60/hr unauthenticated rate limit.

export const config = { runtime: "nodejs" }

const REPO_PATTERN = /^[\w.-]+\/[\w.-]+$/
const MAX_REPOS = 12

interface RepoActivity {
  slug: string
  htmlUrl: string | null
  pushedAt: string | null
  commitsLastWeek: number | null
  error?: string
}

export default async function handler(req: Request) {
  if (req.method !== "GET") return json({ error: "method not allowed" }, 405)

  const url = new URL(req.url)
  const raw = url.searchParams.get("repos") ?? ""
  const slugs = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  if (slugs.length === 0) return json({ error: "repos param required" }, 400)
  if (slugs.length > MAX_REPOS) return json({ error: "too many repos" }, 400)
  if (slugs.some((s) => !REPO_PATTERN.test(s))) {
    return json({ error: "invalid repo slug" }, 400)
  }

  const token = process.env.GITHUB_TOKEN
  const sinceIso = new Date(Date.now() - 7 * 86_400_000).toISOString()

  const repos: RepoActivity[] = await Promise.all(
    slugs.map((slug) => fetchActivity(slug, sinceIso, token)),
  )

  return new Response(JSON.stringify({ repos }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      // 1h fresh + 1h stale-while-revalidate
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=3600",
    },
  })
}

async function fetchActivity(
  slug: string,
  sinceIso: string,
  token: string | undefined,
): Promise<RepoActivity> {
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
    "user-agent": "rshiner-website-v3",
  }
  if (token) headers.authorization = `Bearer ${token}`

  try {
    const [meta, commits] = await Promise.all([
      fetch(`https://api.github.com/repos/${slug}`, { headers }),
      fetch(
        `https://api.github.com/repos/${slug}/commits?since=${sinceIso}&per_page=100`,
        { headers },
      ),
    ])

    if (!meta.ok) {
      return {
        slug,
        htmlUrl: null,
        pushedAt: null,
        commitsLastWeek: null,
        error: `repo ${meta.status}`,
      }
    }

    const metaJson = (await meta.json()) as {
      html_url?: string
      pushed_at?: string
    }

    let commitsLastWeek: number | null = null
    if (commits.ok) {
      const list = (await commits.json()) as unknown[]
      commitsLastWeek = Array.isArray(list) ? list.length : null
    }

    return {
      slug,
      htmlUrl: metaJson.html_url ?? null,
      pushedAt: metaJson.pushed_at ?? null,
      commitsLastWeek,
    }
  } catch (err) {
    return {
      slug,
      htmlUrl: null,
      pushedAt: null,
      commitsLastWeek: null,
      error: err instanceof Error ? err.message : "fetch failed",
    }
  }
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  })
}
