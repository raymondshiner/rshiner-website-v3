// Headless UI verification — drives Playwright against the dev server,
// plus a pre-flight WCAG contrast audit on the Andromeda palette.
//
// Usage: npm run verify-ui   (dev server must be running on :5173)
import { chromium, devices } from 'playwright'
import { mkdir } from 'node:fs/promises'

const BASE = process.env.BASE_URL ?? 'http://localhost:5173/'
const SHOTS = '/tmp/rshiner-v3-shots'
await mkdir(SHOTS, { recursive: true })

const results = []
const record = (name, ok, detail = '') => {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}

// ---------- Andromeda contrast audit (WCAG 2.1) ----------
// AA: 4.5 for normal text, 3.0 for large (18pt+ or 14pt bold).

const palette = {
  bg: '#1C1E26',
  'bg-elev': '#23262E',
  fg: '#D5CED9',
  'fg-muted': '#8B97AF',
  cyan: '#00E8C6',
  green: '#A8FF60',
  yellow: '#FFE66D',
  red: '#EE5D43',
  purple: '#B084EB',
}

const hexToRgb = (hex) => {
  const m = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16))
}
const lin = (c) => {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}
const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
const contrast = (a, b) => {
  const la = luminance(a)
  const lb = luminance(b)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

// Pairs that actually appear in the UI, with role + minimum required ratio
const contrastPairs = [
  // Body text on bg / bg-elev
  { fg: 'fg', bg: 'bg', role: 'body text', min: 4.5 },
  { fg: 'fg', bg: 'bg-elev', role: 'body text on card', min: 4.5 },
  // Muted text — used for secondary copy; treated as "large" since most
  // uses are inline with body but the muted color is the weakest tested
  { fg: 'fg-muted', bg: 'bg', role: 'muted/secondary text', min: 4.5 },
  { fg: 'fg-muted', bg: 'bg-elev', role: 'muted on card', min: 4.5 },
  // Cyan accent — used on borders, glyphs, links, eyebrows
  { fg: 'cyan', bg: 'bg', role: 'cyan link/accent text', min: 4.5 },
  { fg: 'cyan', bg: 'bg-elev', role: 'cyan on card', min: 4.5 },
  // Purple accent
  { fg: 'purple', bg: 'bg', role: 'purple accent text', min: 4.5 },
  { fg: 'purple', bg: 'bg-elev', role: 'purple on card', min: 4.5 },
  // State colors used as text
  { fg: 'green', bg: 'bg', role: 'green status text', min: 4.5 },
  { fg: 'yellow', bg: 'bg', role: 'yellow warning text', min: 4.5 },
  { fg: 'red', bg: 'bg', role: 'red critical text', min: 4.5 },
]

console.log('--- WCAG contrast audit ---')
for (const p of contrastPairs) {
  const ratio = contrast(palette[p.fg], palette[p.bg])
  const ok = ratio >= p.min
  record(
    `contrast/${p.fg}-on-${p.bg}`,
    ok,
    `${ratio.toFixed(2)}:1 (need ≥${p.min}) — ${p.role}`,
  )
}

// ---------- Playwright UI checks ----------

async function verify(label, ctx) {
  const page = await ctx.newPage()
  page.on('pageerror', (err) =>
    record(`${label}/no-page-errors`, false, err.message),
  )
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      record(`${label}/no-console-errors`, false, msg.text())
    }
  })

  const step = async (name, fn) => {
    try {
      await fn()
      record(`${label}/${name}`, true)
    } catch (e) {
      record(`${label}/${name}`, false, String(e?.message ?? e).split('\n')[0])
    }
  }

  // ---- HOME ----
  await page.goto(BASE, { waitUntil: 'networkidle' })

  await step('hero headline present', async () => {
    const h1 = await page.getByRole('heading', { level: 1 }).textContent()
    if (!/Code was the medium/i.test(h1 ?? ''))
      throw new Error(`got "${h1?.trim()}"`)
  })

  await step('hero CTAs visible', async () => {
    await page.getByRole('link', { name: /see the work/i }).waitFor()
    await page.getByRole('link', { name: /get in touch/i }).waitFor()
  })

  await page.screenshot({
    path: `${SHOTS}/${label}-01-home.png`,
    fullPage: true,
  })

  // ---- WORKFLOW SECTION ----
  await step('workflow heading present', async () => {
    await page.getByRole('heading', { name: /my team/i }).scrollIntoViewIfNeeded()
  })

  await step('all three agents named', async () => {
    for (const name of ['Jarvis', 'Friday', 'Smith']) {
      const visible = await page.getByText(name, { exact: true }).first().isVisible()
      if (!visible) throw new Error(`${name} not visible`)
    }
  })

  await step('what-stays-human section present', async () => {
    await page
      .getByRole('heading', { name: /what stays human/i })
      .scrollIntoViewIfNeeded()
  })

  await page.screenshot({
    path: `${SHOTS}/${label}-02-workflow.png`,
    fullPage: true,
  })

  // ---- NOW PAGE ----
  await page.goto(`${BASE}now`, { waitUntil: 'networkidle' })

  await step('now page loads', async () => {
    const looking = await page.getByText(/Looking for work/i).isVisible()
    if (!looking) throw new Error('Looking for work heading missing')
  })

  await page.screenshot({
    path: `${SHOTS}/${label}-03-now.png`,
    fullPage: true,
  })

  // ---- 404 ----
  await page.goto(`${BASE}does-not-exist-${Date.now()}`, {
    waitUntil: 'networkidle',
  })
  await step('404 route renders styled NotFound', async () => {
    await page
      .getByRole('heading', { name: /off the map/i })
      .waitFor({ timeout: 2000 })
  })

  // ---- NAV ----
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await step('nav has Now link', async () => {
    const hamburger = page.getByRole('button', { name: /open menu/i })
    if (await hamburger.isVisible().catch(() => false)) {
      await hamburger.click()
    }
    const links = await page.getByRole('link', { name: /^now$/i }).count()
    if (links < 1) throw new Error('no Now nav link')
  })

  // ---- KEYBOARD NAV (Step 23) ----
  await page.goto(BASE, { waitUntil: 'networkidle' })

  await step('Tab from start lands on a focusable element', async () => {
    await page.keyboard.press('Tab')
    const tag = await page.evaluate(() => document.activeElement?.tagName)
    if (!tag || tag === 'BODY')
      throw new Error(`focus stuck on ${tag ?? 'nothing'}`)
  })

  await step('focused element has a visible focus indicator', async () => {
    // Tab a few times into nav links / buttons and ensure outline OR
    // box-shadow OR border-color change is visible (i.e. not "outline: none"
    // with no replacement).
    for (let i = 0; i < 4; i++) await page.keyboard.press('Tab')
    const ok = await page.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return false
      const s = getComputedStyle(el)
      const hasOutline =
        s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0
      const hasShadow = s.boxShadow && s.boxShadow !== 'none'
      const hasRing =
        s.getPropertyValue('--tw-ring-shadow') &&
        s.getPropertyValue('--tw-ring-shadow') !== '0 0 #0000'
      return hasOutline || hasShadow || hasRing
    })
    if (!ok)
      throw new Error('no visible outline / shadow / ring on focused element')
  })

  await step('Ask Raymond opens and closes via keyboard (Esc)', async () => {
    const trigger = page.getByRole('button', { name: /open ask raymond/i })
    await trigger.click()
    await page.getByRole('dialog', { name: /ask raymond/i }).waitFor({
      timeout: 2000,
    })
    await page.keyboard.press('Escape')
    // Dialog should disappear (no longer attached) after Esc
    await page
      .getByRole('dialog', { name: /ask raymond/i })
      .waitFor({ state: 'detached', timeout: 2000 })
  })

  await page.close()
}

const browser = await chromium.launch()

const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } })
await verify('desktop', desktop)
await desktop.close()

const mobile = await browser.newContext({ ...devices['iPhone 13'] })
await verify('mobile', mobile)
await mobile.close()

await browser.close()

const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
if (failed.length) {
  console.log('Failures:')
  for (const f of failed) console.log(`  - ${f.name}: ${f.detail}`)
  process.exit(1)
}
