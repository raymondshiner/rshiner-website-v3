import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export function Contact() {
  const prefersReduced = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const [local, domain] = site.email.split("@")

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Let's build"
      title="Open for new collaborations."
      description="Got something interesting? I'm picky about clients and generous with my time. Email is best — Ask Raymond is the fastest way to find out if we'd be a fit."
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12"
      >
        {/* Email block — the visual anchor */}
        <div className="border-l-2 border-cyan pl-5 sm:pl-6">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-fg-muted">
            // direct line
          </p>

          <a
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.email}`}
            className="group block font-mono text-lg font-bold leading-tight tracking-tight text-fg transition-colors hover:text-cyan sm:text-xl md:text-2xl"
          >
            <span>{local}</span>
            <span className="text-cyan group-hover:glow-cyan">@</span>
            <span className="text-fg-muted group-hover:text-cyan">
              {domain}
            </span>
          </a>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button asChild size="md">
              <a href={`mailto:${site.email}`}>
                <Mail aria-hidden="true" />
                Send email
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={copyEmail}
            >
              {copied ? (
                <>
                  <Check aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <Copy aria-hidden="true" />
                  Copy email
                </>
              )}
            </Button>
            <span
              role="status"
              aria-live="polite"
              className="sr-only"
            >
              {copied ? "Email copied to clipboard" : ""}
            </span>
          </div>

          <p className="mt-4 text-sm text-fg-muted sm:text-base">
            Usually replies within a business day.
          </p>
        </div>

        {/* Elsewhere sidebar */}
        <aside className="border-l-2 border-line pl-5 sm:pl-6">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-fg-muted">
            // elsewhere
          </p>
          <ul className="flex flex-col">
            <SocialRow
              href={site.github}
              icon={<GithubIcon className="size-5" />}
              label="GitHub"
              handle="@raymondshiner"
            />
            <SocialRow
              href={site.linkedin}
              icon={<LinkedinIcon className="size-5" />}
              label="LinkedIn"
              handle="raymondshiner"
            />
          </ul>
        </aside>
      </motion.div>
    </Section>
  )
}

function SocialRow({
  href,
  icon,
  label,
  handle,
}: {
  href: string
  icon: React.ReactNode
  label: string
  handle: string
}) {
  return (
    <li className="border-b border-line/60 last:border-0">
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="group flex items-center gap-4 py-3 transition-colors hover:text-cyan"
      >
        <span className="text-fg-muted transition-colors group-hover:text-cyan">
          {icon}
        </span>
        <span className="flex-1">
          <span className="block text-xs uppercase tracking-wider text-fg-muted">
            {label}
          </span>
          <span className="block font-bold text-fg group-hover:text-cyan">
            {handle}
          </span>
        </span>
        <ArrowUpRight className="size-5 text-fg-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
      </a>
    </li>
  )
}
