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
    slug: "dotfiles-andromeda",
    title: "Andromeda dotfiles + Jeeves",
    tagline: "Hand-built Hyprland desktop with a Claude Code agent crew.",
    description:
      "Cross-platform dotfiles repo (Arch/Hyprland + macOS) with custom waybar modules, GTK popup menus, and a stack of Claude Code subagents (Jeeves, Friday, Explore, Plan) wired into the workflow.",
    stack: ["Hyprland", "Python (GTK)", "Zsh", "Claude Code", "Subagents"],
    github: "https://github.com/raymondshiner/dotfiles",
    highlight: true,
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
