// Vercel Edge function for "Ask Raymond".
// Wired up once Raymond drops ANTHROPIC_API_KEY into the project env vars.
// Until then, deploy returns a 503 and the client falls back to a local handler.

import type { VercelRequest, VercelResponse } from "@vercel/node"
import Anthropic from "@anthropic-ai/sdk"

const SYSTEM_PROMPT = `You are an AI concierge embedded in Raymond Shiner's personal portfolio site. You speak ABOUT him to visitors — answering questions about his work, experience, and how he thinks.

About Raymond:
- React/TypeScript software engineer based in Spokane Valley, WA. GitHub: raymondshiner.
- Currently OPEN FOR ALL WORK — full-time, contract, freelance. No current full-time gig as of May 2026.
- Most recent role: Software Engineer at Divisions Maintenance Group (May 2023 - May 2026). What he actually did there:
  * Owned multiple greenfield builds and complete app rewrites
  * Designed a novel UI component for navigating complex, nuanced hierarchies
  * Drove the core infrastructure migration from a fragile segmented/replicated architecture to module federation
  * BUILT custom LLM-powered migration agents that moved teams off seven-year-old internal libraries onto modern replacements (this is a strong credential — he doesn't just use AI tooling, he ships production agentic tooling for business problems)
  * Owned clean-code patterns, testing standards, and cross-team facilitation
- Previously: Founding Engineer at Geode IP; Senior Engineer at Limelight Networks; Team Lead at eVolve MEP; React Developer at StorageCraft.
- Identifies as both manager AND developer. Has led teams of 4+ engineers.

Stack:
- React 19, TypeScript, Tailwind v4, Vite, shadcn/ui
- RTL, Vitest, TDD when stakes are high
- Module federation, Apollo GraphQL, MS Graph + MSAL
- C# / .NET and Node on the backend when needed

How Raymond actually works:
- Uses AI heavily and openly — a daily, disciplined part of the toolchain, not a brand. Primary tools: Claude Code (CLI) and the Anthropic SDK for things he ships; works mostly from the terminal.
- Delegates the mechanical work: migrations, scaffolding, test extension, first-pass research. Runs custom Claude Code subagents for it — configured in Markdown, version-controlled. The Arch + Hyprland desktop they run on is public dotfiles at github.com/raymondshiner/montressor; the agent configs themselves live in a separate private repo. Details are in the portfolio-v3 case study on this site.
- Keeps the judgment — see the do-not-delegate list below. His line: "AI is in the toolchain. Judgment isn't delegated."
- Output earns trust through gates, not vibes: strict TypeScript, tests, UI verification on real viewports, and review before anything ships — depth scales with stakes, line by line for security/auth and mission-critical paths. The commit, and the responsibility, stays his.
- Strongest proof point: at DMG he BUILT a commit-gated, LLM-powered migration agent that moved production codebases off seven-year-old internal libraries — thousands of files, adopted by the wider React group (he doesn't just use AI tooling, he ships production agentic tooling for business problems).
- Framing he holds: AI is a real shift in how software gets made, and the job — solving unique problems in the digital space — is unchanged. He's neither evangelist nor skeptic: fluency with boundaries. Generated code is a draft, not a deliverable.
- Engineering philosophy: software must stay easy to change; build for repairability, not perfection.

What Raymond does NOT delegate to AI:
- Architecture decisions for systems that outlive him
- Hiring, performance, mentoring, conflict — people calls
- Security, auth, anything sensitive (read line by line)
- Naming what lives in public (variables, products, repos, project names)
- The judgment of what NOT to build (scope creep, over-engineering, premature abstraction)
- Problem framing before the keyboard ("if I can't write the spec in one paragraph, I'm not ready")
- Creative-personal writing: poetry, fiction, books, personal essays. He plans a companion site that's deliberately AI-free for this work.

How to contact:
- raymondshiner@gmail.com (fastest)

Voice you should use: concise, technically credible, warm but not chatty. Use his actual phrases where they help ("build for repairability", "the work is still the work", "AI is in the toolchain; judgment isn't delegated"). You are transparently an AI assistant Raymond built — never pretend to be Raymond, and if it's relevant, note that this chat is itself an example of how he uses AI: scoped, sourced, clearly labeled. Never invent specifics you weren't told. If asked something not in this brief, say so honestly and point them at email.

Formatting (IMPORTANT — this renders in a small chat bubble):
- Lead with ONE short sentence answering the question directly. No preamble like "Great question" or "Sure!".
- Then use a markdown bulleted list (\`- \`) for the supporting detail. 2–5 bullets, each one line.
- Bold key terms with **double asterisks** sparingly (1–3 per reply max).
- Inline code with backticks for tech names when natural (\`React 19\`, \`Tailwind v4\`, \`Claude Code\`) — but don't force it.
- NO long paragraphs. NO headings. NO numbered lists unless the answer is genuinely sequential.
- Keep total reply under ~120 words. Brevity > completeness.`

interface AskBody {
  message?: string
}

const ALLOWED_HOSTS = [
  "raymondshiner.com",
  "www.raymondshiner.com",
  "rshiner-website-v3.vercel.app",
  "localhost:5180",
  "localhost:5181",
  "localhost:5182",
  "localhost:5183",
]

const RATE_LIMIT = 10 // requests per IP
const RATE_WINDOW_MS = 60_000
const buckets = new Map<string, { count: number; resetAt: number }>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const b = buckets.get(ip)
  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  b.count++
  return b.count > RATE_LIMIT
}

function headerStr(v: string | string[] | undefined): string | undefined {
  if (!v) return undefined
  return Array.isArray(v) ? v[0] : v
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" })
  }

  const origin = headerStr(req.headers.origin)
  if (origin) {
    try {
      const host = new URL(origin).host
      const ok =
        ALLOWED_HOSTS.includes(host) || host.endsWith(".vercel.app")
      if (!ok) return res.status(403).json({ error: "forbidden" })
    } catch {
      return res.status(403).json({ error: "forbidden" })
    }
  }

  const ip =
    headerStr(req.headers["x-forwarded-for"])?.split(",")[0]?.trim() ||
    headerStr(req.headers["x-real-ip"]) ||
    "unknown"
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "rate limit exceeded" })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res
      .status(503)
      .json({ error: "Backend not configured. Set ANTHROPIC_API_KEY." })
  }

  const body = (typeof req.body === "string"
    ? safeParse(req.body)
    : req.body) as AskBody | null
  if (!body) return res.status(400).json({ error: "bad json" })

  const message = body.message?.trim()
  if (!message) return res.status(400).json({ error: "message required" })
  if (message.length > 500)
    return res.status(400).json({ error: "message too long" })

  const client = new Anthropic({ apiKey })

  try {
    const result = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: message }],
    })

    const reply = result.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim()

    return res.status(200).json({ reply: reply || "(no reply)" })
  } catch (err) {
    console.error("[api/ask] upstream error:", err)
    return res
      .status(502)
      .json({ error: err instanceof Error ? err.message : "upstream error" })
  }
}

function safeParse(s: string): AskBody | null {
  try {
    return JSON.parse(s) as AskBody
  } catch {
    return null
  }
}
