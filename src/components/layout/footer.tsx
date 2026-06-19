import { Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons"
import { site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t-2 border-line px-4 py-12 sm:px-8 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">
            — Built with intent
          </p>
          <p className="text-sm text-fg-muted">
            React 19, Vite, Tailwind v4, and a stack of Claude Code subagents.
            {" "}
            <a
              href="https://github.com/raymondshiner/rshiner-website-v3"
              target="_blank"
              rel="noreferrer noopener"
              className="text-cyan underline underline-offset-4"
            >
              Source on GitHub
            </a>
            .
          </p>
        </div>
        <ul className="flex gap-3">
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center border-2 border-line text-fg-muted transition-colors hover:border-cyan hover:text-cyan"
            >
              <GithubIcon className="size-5" />
            </a>
          </li>
          <li>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center border-2 border-line text-fg-muted transition-colors hover:border-cyan hover:text-cyan"
            >
              <LinkedinIcon className="size-5" />
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center border-2 border-line text-fg-muted transition-colors hover:border-cyan hover:text-cyan"
            >
              <Mail className="size-5" />
            </a>
          </li>
        </ul>
      </div>
      <p className="mx-auto mt-12 max-w-6xl text-xs text-fg-muted">
        © {new Date().getFullYear()} {site.name}. {site.location}.
      </p>
    </footer>
  )
}
