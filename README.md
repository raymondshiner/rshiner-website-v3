# rshiner-website-v3

Raymond Shiner's personal site — third iteration. AI-native portfolio that carries the Andromeda theme from my Hyprland desktop into the browser.

Live: _(deploy target: Vercel)_
Predecessors: [v1](https://github.com/raymondshiner/rshiner-website-v1) · [v2](https://github.com/raymondshiner/rshiner-website-v2)

## What this is

- Single-page portfolio with a `/now` living page and per-project case studies via MDX
- "Ask Raymond" chat backed by the Anthropic SDK (`api/ask.ts`)
- Workflow section that names the actual subagent crew (Jeeves, Friday, Watson)

## Stack

| | |
|---|---|
| Build | Vite + TypeScript (strict) |
| Framework | React 19 + React Router 7 |
| Styling | Tailwind v4 + shadcn/ui (Radix Nova) |
| Content | MDX via `@mdx-js/rollup` |
| Motion | `motion` (Framer Motion successor) |
| AI | `@anthropic-ai/sdk` for the chat endpoint |
| Hosting | Vercel (SPA rewrite + immutable asset cache via `vercel.json`) |
| Fonts | Geist Sans + JetBrains Mono |

Palette is Andromeda dark: `#1C1E26` bg, `#00E8C6` cyan accent, `#B084EB` purple.

## Scripts

```bash
npm run dev         # Vite dev server on :5173
npm run build       # tsc -b && vite build
npm run preview     # serve the production build
npm run lint        # eslint
npm run verify-ui   # Playwright UI checks (desktop + mobile, screenshots → /tmp/rshiner-v3-shots)
```

`verify-ui` needs the dev server running. It drives both a 1280×900 desktop context and an iPhone 13 mobile context against `http://localhost:5173/`, asserts the hero/workflow/now sections render, and saves screenshots for visual review.

## Layout

```
src/
  components/       # sections/, layout/, chat/, ui/ (shadcn)
  content/          # now.mdx + case-studies/*.mdx
  pages/            # home, now, case-study
  lib/              # data.ts (skills/experience/agents), projects.ts, site.ts
api/
  ask.ts            # Anthropic-backed chat handler (Vercel function)
tests/
  verify-ui.mjs     # Playwright check
```

## Environment

- `ANTHROPIC_API_KEY` — required for the `/api/ask` chat endpoint.
