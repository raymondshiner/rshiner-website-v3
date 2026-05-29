// Headless UI verification — drives Playwright against the dev server.
// Usage: npm run verify-ui  (dev server must be running on :5173)
import { chromium, devices } from 'playwright'

const BASE = process.env.BASE_URL ?? 'http://localhost:5173/'
const SHOTS = '/tmp/rshiner-v3-shots'

import { mkdir } from 'node:fs/promises'
await mkdir(SHOTS, { recursive: true })

const results = []
const record = (name, ok, detail = '') => {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}

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
    await page
      .getByRole('heading', { name: /my agent crew/i })
      .scrollIntoViewIfNeeded()
  })

  await step('all three agents named', async () => {
    for (const name of ['Jeeves', 'Friday', 'Watson']) {
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

  await step('now page mentions Watson (no stale Explore/Plan)', async () => {
    const body = await page.locator('body').textContent()
    if (!/Watson/i.test(body ?? '')) throw new Error('Watson missing on /now')
    if (/Explore \+ Plan/i.test(body ?? ''))
      throw new Error('stale "Explore + Plan" still present')
  })

  await page.screenshot({
    path: `${SHOTS}/${label}-03-now.png`,
    fullPage: true,
  })

  // ---- NAV ----
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await step('nav has Now link', async () => {
    // Mobile menu is collapsed by default — open it first.
    const hamburger = page.getByRole('button', { name: /open menu/i })
    if (await hamburger.isVisible().catch(() => false)) {
      await hamburger.click()
    }
    const links = await page.getByRole('link', { name: /^now$/i }).count()
    if (links < 1) throw new Error('no Now nav link')
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
