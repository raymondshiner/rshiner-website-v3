export interface ProjectMeta {
  slug: string
  title: string
  tagline: string
  description: string
  stack: string[]
  github?: string
  live?: string
  caseStudy?: string
  highlight?: boolean
}

export const projectsIndex = {
  url: "https://browse.shiner.app",
  label: "browse.shiner.app",
} as const

export const projects: ProjectMeta[] = [
  {
    slug: "portfolio-v3",
    title: "Portfolio v3 (this site)",
    tagline: "The portfolio you're reading, built with the workflow it describes.",
    description:
      "AI-native portfolio: Andromeda theme, brutalist type, MDX case studies, in-site AI chat. Built end-to-end alongside my Claude Code agent setup.",
    stack: ["React 19", "Vite", "Tailwind v4", "shadcn/ui", "MDX", "Motion"],
    github: "https://github.com/raymondshiner/rshiner-website-v3",
    live: "https://www.raymondshiner.com",
    caseStudy: "portfolio-v3",
    highlight: true,
  },
  {
    slug: "al-bhed-translator",
    title: "Al Bhed Translator",
    tagline: "Instant FFX Al Bhed ↔ English, mobile-first, Andromeda-themed.",
    description:
      "Bidirectional substitution-cipher translator for Final Fantasy X's Al Bhed language. Built end-to-end with the agent crew as the proving ground for my validated Vite + React 19 + Tailwind v4 + shadcn stack.",
    stack: ["React 19", "Vite", "TypeScript", "Tailwind v4", "shadcn/ui", "Playwright"],
    github: "https://github.com/raymondshiner/al-bhed-translator",
    live: "https://albhed.raymondshiner.com",
    caseStudy: "al-bhed-translator",
    highlight: true,
  },
  {
    slug: "montressor",
    title: "Montressor",
    tagline: "Hand-built Hyprland desktop with a Claude Code agent crew.",
    description:
      "My hyper-personalized Arch/Hyprland desktop environment. Hand-built waybar modules, Python + GTK popup menus for every interactive control, and the Andromeda palette running edge-to-edge. Desktop dotfiles are public; the Claude Code agent crew that runs on top lives in a separate private repo — the secret sauce stays sealed.",
    stack: ["Hyprland", "Python (GTK)", "Zsh", "Claude Code", "Subagents"],
    github: "https://github.com/raymondshiner/montressor",
    caseStudy: "montressor",
    highlight: true,
  },
  {
    slug: "projects-browser",
    title: "Projects Browser",
    tagline: "The canonical index of everything I've built.",
    description:
      "A Supabase-backed registry at browse.shiner.app that lists every project in one place — personal tools, experiments, and client work. Adding a project is a row, not a redeploy. It's also the front door to the shiner.app umbrella, where live apps get launch cards instead of repo links.",
    stack: ["React 19", "Vite", "TypeScript", "Tailwind v4", "Supabase", "Cloudflare Pages"],
    github: "https://github.com/raymondshiner/projects-browser",
    live: "https://browse.shiner.app",
  },
  {
    slug: "rshiner-website-v2",
    title: "Portfolio v2",
    tagline: "Modern stack, transitional design.",
    description:
      "The shadcn-based iteration that proved the React 19 + Tailwind v4 stack worked. Kept the experience data, refactored the aesthetic for v3.",
    stack: ["React 19", "TypeScript", "Tailwind v4", "shadcn/ui"],
    github: "https://github.com/raymondshiner/rshiner-website-v2",
    live: "https://rshiner-website-v2.vercel.app",
  },
  {
    slug: "rshiner-website-v1",
    title: "Portfolio v1",
    tagline: "Particles, typewriters, and 2021 vibes.",
    description:
      "The original. React 17, styled-components, react-particles-js, react-typed. Still on raymondshiner.com—for now.",
    stack: ["React 17", "styled-components", "particles.js", "EmailJS"],
    github: "https://github.com/raymondshiner/rshiner-website-v1",
    live: "https://v1.raymondshiner.com",
  },
]
