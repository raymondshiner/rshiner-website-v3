// Vercel Node function: returns recent activity for a set of GitHub repos.
// Query: ?repos=owner/name,owner/name
// Response: { repos: [{ slug, htmlUrl, pushedAt, commitsLastWeek, error? }] }
// Cached at the edge for 1h; uses GITHUB_TOKEN when present to dodge the
// 60/hr unauthenticated rate limit.

import type { VercelRequest, VercelResponse } from "@vercel/node"

const REPO_PATTERN = /^[\w.-]+\/[\w.-]+$/
const MAX_REPOS = 12

interface RepoActivity {
  slug: string
  htmlUrl: string | null
  pushedAt: string | null
  commitsLastWeek: number | null
  error?: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "method not allowed" })
  }

  const raw =
    typeof req.query.repos === "string"
      ? req.query.repos
      : Array.isArray(req.query.repos)
        ? req.query.repos.join(",")
        : ""

  const slugs = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  if (slugs.length === 0) {
    return res.status(400).json({ error: "repos param required" })
  }
  if (slugs.length > MAX_REPOS) {
    return res.status(400).json({ error: "too many repos" })
  }
  if (slugs.some((s) => !REPO_PATTERN.test(s))) {
    return res.status(400).json({ error: "invalid repo slug" })
  }

  const token = process.env.GITHUB_TOKEN
  const sinceIso = new Date(Date.now() - 7 * 86_400_000).toISOString()

  const repos: RepoActivity[] = await Promise.all(
    slugs.map((slug) => fetchActivity(slug, sinceIso, token)),
  )

  // 1h fresh + 1h stale-while-revalidate at the edge
  res.setHeader(
    "cache-control",
    "public, s-maxage=3600, stale-while-revalidate=3600",
  )
  return res.status(200).json({ repos })
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
      const rateLimited =
        meta.status === 403 && meta.headers.get("x-ratelimit-remaining") === "0"
      return {
        slug,
        htmlUrl: null,
        pushedAt: null,
        commitsLastWeek: null,
        error: rateLimited ? "rate limited" : `repo ${meta.status}`,
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
