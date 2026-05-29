// Vercel Edge function for "Ask Raymond".
// Wired up once Raymond drops ANTHROPIC_API_KEY into the project env vars.
// Until then, deploy returns a 503 and the client falls back to a local handler.

import Anthropic from "@anthropic-ai/sdk"

export const config = { runtime: "edge" }

const SYSTEM_PROMPT = `You are an AI concierge embedded in Raymond Shiner's personal portfolio site.

About Raymond:
- React/TypeScript software engineer based in Spokane Valley, WA
- Currently Software Engineer at Divisions Inc (May 2023 - present), working on a federated-module architecture migration
- Previously: Founding Engineer at Geode IP; Senior Engineer at Limelight Networks; Team Lead at eVolve MEP; React Developer at StorageCraft
- Strong in: React 19, TypeScript, Tailwind v4, Vite, shadcn/ui, RTL, TDD, federated modules, Apollo GraphQL, MS Graph + MSAL, occasional C#
- AI workflow: runs a custom Claude Code crew (Jeeves for Linux, Friday for research, Explore for codebase search, Plan for architecture) version-controlled in his dotfiles
- Open for new collaborations; raymondshiner@gmail.com is best
- Identifies as both manager AND developer; has led teams of 4+ engineers

Voice: concise, technically credible, warm but not chatty. One or two short paragraphs max.
Never invent specifics about projects you don't know. If asked something not in this brief, say so honestly and point them at email.`

interface AskBody {
  message?: string
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return json({ error: "method not allowed" }, 405)
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return json(
      { error: "Backend not configured. Set ANTHROPIC_API_KEY." },
      503,
    )
  }

  let body: AskBody
  try {
    body = (await req.json()) as AskBody
  } catch {
    return json({ error: "bad json" }, 400)
  }

  const message = body.message?.trim()
  if (!message) return json({ error: "message required" }, 400)
  if (message.length > 500) return json({ error: "message too long" }, 400)

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

    return json({ reply: reply || "(no reply)" })
  } catch (err) {
    return json(
      { error: err instanceof Error ? err.message : "upstream error" },
      502,
    )
  }
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  })
}
