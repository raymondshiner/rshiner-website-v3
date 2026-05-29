import type { LucideIcon } from "lucide-react"
import {
  Bot,
  Code2,
  Hammer,
  Layers,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react"

export interface SkillCategory {
  icon: LucideIcon
  title: string
  summary: string
  items: string[]
  accent: "cyan" | "purple" | "green" | "yellow"
}

export const skillCategories: SkillCategory[] = [
  {
    icon: Code2,
    title: "Frontend craft",
    summary: "Functional React, hard-earned.",
    items: [
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Vite",
      "shadcn/ui",
      "React Testing Library",
      "TDD",
    ],
    accent: "cyan",
  },
  {
    icon: Bot,
    title: "AI-native workflow",
    summary: "Conversation as development.",
    items: [
      "Claude Code (CLI)",
      "Custom subagent crew",
      "Anthropic SDK",
      "ChatGPT / Claude UI",
      "MCP servers",
      "Production LLM tooling",
      "Post-IDE workflow",
    ],
    accent: "purple",
  },
  {
    icon: Layers,
    title: "Architecture",
    summary: "Federated modules, clean seams.",
    items: [
      "Module federation",
      "Apollo GraphQL",
      "MS Graph + MSAL",
      "C# (.NET)",
      "Greenfield + legacy",
    ],
    accent: "green",
  },
  {
    icon: Users,
    title: "Leadership",
    summary: "Stronger teams ship stronger systems.",
    items: [
      "Team lead (4+ devs)",
      "Mentoring",
      "Clean-code enforcement",
      "Agile process design",
      "Hiring + training",
    ],
    accent: "yellow",
  },
]

export interface ExperienceEntry {
  title: string
  company: string
  period: string
  description: string
  current?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    title: "Software Engineer",
    company: "Divisions Maintenance Group",
    period: "May 2023 — May 2026",
    description:
      "Owned greenfield builds and complete app rewrites — including a novel UI component for navigating complex, nuanced hierarchies, and a core infrastructure shift from a fragile segmented/replicated architecture to module federation. Built custom LLM-powered migration agents that moved teams off seven-year-old internal libraries onto modern replacements. Drove clean-code patterns, testing standards, and cross-team facilitation throughout.",
  },
  {
    title: "Founding Engineer",
    company: "Geode IP",
    period: "May 2022 — Feb 2023",
    description:
      "Built responsive web apps, tuned database performance, collaborated across functions to ship product from zero.",
  },
  {
    title: "Senior Engineer",
    company: "Limelight Networks",
    period: "Mar 2022 — May 2022",
    description: "Engaging UIs, responsive layouts, performance work.",
  },
  {
    title: "Team Lead / Senior Frontend",
    company: "eVolve MEP",
    period: "Oct 2021 — Mar 2022",
    description:
      "Led 4+ devs on a greenfield React codebase. Defined and enforced clean-code + testing standards. Architecture, hiring, process docs.",
  },
  {
    title: "React Developer",
    company: "StorageCraft",
    period: "Jan 2020 — Aug 2021",
    description:
      "Lead frontend on a SaaS cloud backup UI. Apollo GraphQL, MSAL, MS Graph, occasional C# backend work.",
  },
]

export interface AgentRole {
  icon: LucideIcon
  name: string
  duty: string
  quote: string
  detail: string
}

export const agentRoles: AgentRole[] = [
  {
    icon: Terminal,
    name: "Jeeves",
    duty: "Archlinux Intern",
    quote: "“Take care of it, Jeeves.”",
    detail:
      "Owns desktop customization, hotkeys, packages, dotfiles. Knows the Andromeda theme by heart and the Hyprland config by name.",
  },
  {
    icon: Sparkles,
    name: "Friday",
    duty: "Research Assistant",
    quote: "“Quick question…”",
    detail:
      "Internet research, product picks, troubleshooting. Synthesizes multiple sources into one actionable answer.",
  },
  {
    icon: Hammer,
    name: "Watson",
    duty: "Solutions Partner",
    quote: "“Watson! I have an idea…”",
    detail:
      "Pair-partner for code. Builds features, fixes bugs, ships deploys. Spawns with shadcn, Playwright, and Chrome DevTools MCPs ready in hand.",
  },
]
