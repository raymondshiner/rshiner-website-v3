import type { LucideIcon } from "lucide-react"
import {
  Bot,
  Code2,
  GitBranch,
  Layers,
  Sparkles,
  Terminal,
  Users,
  Wrench,
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
    summary: "Building with agents, not just chat.",
    items: [
      "Claude Code",
      "Custom subagents",
      "Anthropic SDK",
      "MCP servers",
      "Vercel AI SDK",
      "Vibe-coded prototypes",
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
    company: "Divisions Inc",
    period: "May 2023 — present",
    description:
      "Frontend engineer on a federated-module architecture migration. Greenfield feature work alongside surgical upgrades to existing apps.",
    current: true,
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
  detail: string
}

export const agentRoles: AgentRole[] = [
  {
    icon: Terminal,
    name: "Jeeves",
    duty: "Personal Linux assistant",
    detail:
      "Owns desktop customization, hotkeys, packages, dotfiles. Knows the Andromeda theme by heart and the Hyprland config by name.",
  },
  {
    icon: Sparkles,
    name: "Friday",
    duty: "Research + recommendations",
    detail:
      "Internet research, product picks, troubleshooting. Synthesizes multiple sources into one actionable answer.",
  },
  {
    icon: GitBranch,
    name: "Explore",
    duty: "Code search across repos",
    detail:
      "Read-only spelunker. Finds files, greps for symbols, answers “where is X defined?” without hogging context.",
  },
  {
    icon: Wrench,
    name: "Plan",
    duty: "Implementation architect",
    detail:
      "Steps, files, tradeoffs. Lays out the path before code is written.",
  },
]
