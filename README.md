# rshiner-website-v3

Raymond Shiner's personal site — third iteration. AI-native portfolio that carries the Andromeda theme from my Hyprland desktop into the browser.

Live: [raymondshiner.com](https://www.raymondshiner.com)
Predecessors: [v1](https://github.com/raymondshiner/rshiner-website-v1) · [v2](https://github.com/raymondshiner/rshiner-website-v2)

## What this is

- Single-page portfolio with a `/now` living page and per-project case studies via MDX
- "Ask Raymond" chat backed by the Anthropic SDK (`api/ask.ts`) — Origin-allowlisted, per-IP rate-limited, client AbortController + 500-char cap
- Live GitHub activity chips on `/now` (`api/github-activity.ts`) — CDN-cached, surfaces unauth rate-limit, graceful empty state on failure
- Workflow section that names the actual subagent crew (Jarvis, Friday, Smith)

## Stack

| | |
|---|---|
| Build | Vite + TypeScript (strict) |
| Framework | React 19 + React Router 7 |
| Styling | Tailwind v4 + shadcn/ui (Radix Nova) |
| Content | MDX via `@mdx-js/rollup` |
| Motion | `motion` (Framer Motion successor) |
| AI | `@anthropic-ai/sdk` (server-only, never bundled into the client) |
| Hosting | Vercel (SPA rewrite + explicit cache headers in `vercel.json`) |
| Analytics | `@vercel/analytics` |
| Fonts | JetBrains Mono (Google Fonts, `display=optional`) |

Palette is Andromeda dark: `#1C1E26` bg, `#D5CED9` fg, `#8B97AF` muted, `#00E8C6` cyan accent, `#B084EB` purple accent.

## Scripts

```bash
npm run dev         # Vite dev server on :5173
npm run build       # tsc -b && vite build
npm run preview     # serve the production build on :4173
npm run lint        # eslint
npm run verify-ui   # Playwright UI + a11y + WCAG contrast checks (desktop + iPhone 13)
```

`verify-ui` needs the dev server running (or set `BASE_URL=http://localhost:4173/` to point at the preview build). It runs a Node-side WCAG 2.1 AA contrast audit on the Andromeda palette pairs, then drives both desktop and mobile Playwright contexts: hero, workflow, /now, 404, nav, keyboard nav (Tab + focus indicator + Esc-closes-Ask-Raymond). Screenshots → `/tmp/rshiner-v3-shots/`.

## Layout

```
src/
  components/       # sections/, layout/, chat/, ui/, now/
  content/          # now.mdx + case-studies/*.mdx
  pages/            # home, now, case-study
  lib/              # data.ts (skills/experience/agents), projects.ts, site.ts
api/
  ask.ts                # Anthropic-backed chat handler
  github-activity.ts    # GitHub repo activity for /now
tests/
  verify-ui.mjs         # Playwright UI + a11y + contrast audit
```

## Environment

| Var | Where | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | Vercel (Production + Preview, Sensitive) | Required for `/api/ask`. Without it the endpoint returns 503 and the client falls back to a small local handler. |
| `GITHUB_TOKEN` | Vercel (Production + Preview, Sensitive) | Optional. Lifts `/api/github-activity` off the 60/hr unauthenticated GH rate limit. Without it, activity still works but may degrade to per-repo "rate limited" chips during traffic spikes. |

Also remember to set an Anthropic monthly spend cap — the per-IP rate limit in `/api/ask` is in-memory and resets on cold start, so a serverless function fleet can't be the only line of defense against runaway cost.

## Deployment

Vercel, SPA. `vercel.json` handles rewrites + cache headers:

- `/assets/*` → `public, max-age=31536000, immutable` (Vite hashed files)
- favicons / OG image / manifest icons → 30d cache
- `robots.txt` / `sitemap.xml` / `site.webmanifest` → 1h cache
- everything else (HTML shell) → `must-revalidate` so deploys are picked up immediately

`ALLOWED_HOSTS` in `api/ask.ts` is the Origin allow-list for the chat endpoint — update it if the prod domain changes.

## Monitoring

- **Traffic:** Vercel Analytics (wired in `src/main.tsx`).
- **Errors:** Vercel function logs. Both `api/*` handlers tag failures with a `[api/<name>]` prefix so log queries are cheap. Surface in the Vercel dashboard → Project → Logs → filter by `[api/`.

No Sentry by design — cost vs signal isn't worth it for a portfolio of this size.

## Pre-ship state (last measured)

Lighthouse mobile (simulated Moto G Power on 4G), production preview:

```
Performance      90
Accessibility   100
Best Practices  100
SEO             100
```

WCAG AA contrast: all palette pairs in the Andromeda palette clear 4.5:1 against `bg` and `bg-elev`.
