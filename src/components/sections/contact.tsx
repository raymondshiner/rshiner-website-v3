import { ArrowRight, Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Let's build"
      title="Open for new collaborations."
      description="Got something interesting? I'm picky about clients and generous with my time. Email is best — Ask Raymond is the fastest way to find out if we'd be a fit."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <a
          href={`mailto:${site.email}`}
          className="group flex flex-col gap-3 border-2 border-cyan bg-bg-elev p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal"
        >
          <Mail className="size-6 text-cyan" />
          <p className="text-xs uppercase tracking-[0.3em] text-fg-muted">
            — Direct
          </p>
          <p className="break-all text-xl font-bold text-fg">{site.email}</p>
          <Button asChild variant="ghost" size="sm" className="mt-2 justify-start px-0">
            <span>
              Send a message <ArrowRight className="size-4" />
            </span>
          </Button>
        </a>

        <div className="flex flex-col gap-4 border-2 border-line bg-bg-elev p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-fg-muted">
            — Elsewhere
          </p>
          <div className="grid gap-3">
            <SocialLink
              href={site.github}
              icon={<GithubIcon className="size-5" />}
              label="GitHub"
              handle="@raymondshiner"
            />
            <SocialLink
              href={site.linkedin}
              icon={<LinkedinIcon className="size-5" />}
              label="LinkedIn"
              handle="raymondshiner"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}

function SocialLink({
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
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-center gap-4 border-2 border-line bg-bg p-4 transition-all hover:border-cyan"
    >
      <span className="text-fg-muted transition-colors group-hover:text-cyan">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-xs uppercase tracking-wider text-fg-muted">
          {label}
        </span>
        <span className="block font-bold text-fg">{handle}</span>
      </span>
      <ArrowRight className="size-4 text-fg-muted transition-all group-hover:translate-x-0.5 group-hover:text-cyan" />
    </a>
  )
}
