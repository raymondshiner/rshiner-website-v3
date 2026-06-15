import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const headlineLines = [
  "Code was the medium.",
  "AI is the new one.",
  "The work is still the work.",
]
const highlightWords = new Set(["AI", "work", "work."])

export function Hero() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden px-4 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32 md:px-12"
    >
      <BlueprintBackground />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 border-2 border-cyan bg-cyan/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan"
        >
          <Sparkles className="size-3" />
          Available for work
        </motion.div>

        <h1 className="text-5xl font-black tracking-tight text-fg sm:text-7xl md:text-8xl">
          {headlineLines.map((line, i) => (
            <motion.span
              key={line}
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
              className="block leading-[0.95]"
            >
              {line.split(" ").map((word, j) => (
                <span
                  key={`${line}-${j}`}
                  className={
                    highlightWords.has(word) ? "text-cyan glow-cyan" : ""
                  }
                >
                  {word}
                  {j < line.split(" ").length - 1 ? " " : ""}
                </span>
              ))}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 max-w-3xl text-base text-fg-muted sm:text-lg"
        >
          I'm <span className="text-fg">Raymond Shiner</span> — a React/TS
          engineer with five years of frontend craft and two of leading teams.
          The way I make things has changed; what I make hasn't. The job is
          solving unique problems in the digital space — and the medium just
          got faster, broader, and a lot more interesting.
        </motion.p>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button asChild size="lg">
            <Link to="/#work">
              See the work <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/#contact">Get in touch</Link>
          </Button>
        </motion.div>

        <motion.aside
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 border-2 border-line bg-bg-elev/70 p-5 backdrop-blur-sm"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fg-muted">
            // currently
          </p>
          <ul className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <StatusRow label="status" value="Open for new work" />
            <StatusRow
              label="building"
              value="crew-quarters + Andromeda desktop"
            />
            <StatusRow label="stack" value="React 19 · TS · Tailwind v4" />
            <StatusRow label="ai" value="Claude Code · ChatGPT · own SDK" />
            <StatusRow label="surface" value="Terminal-first, post-IDE" />
            <StatusRow label="based" value="Spokane Valley, WA" />
          </ul>
        </motion.aside>
      </div>
    </section>
  )
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-2 last:border-0 last:pb-0">
      <span className="text-xs uppercase tracking-wider text-fg-muted">
        {label}
      </span>
      <span className="text-right text-fg">{value}</span>
    </li>
  )
}

function BlueprintBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50"
      style={{
        maskImage:
          "radial-gradient(ellipse at 30% 30%, black 0%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 30% 30%, black 0%, transparent 70%)",
      }}
    />
  )
}
