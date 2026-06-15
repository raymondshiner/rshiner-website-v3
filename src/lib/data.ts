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
  headline?: string
  bullets: string[]
  highlight?: string
  current?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    title: "Software Engineer",
    company: "Divisions Maintenance Group",
    period: "May 2023 — May 2026",
    headline: "IC, tech lead, and cross-team facilitator on greenfield builds and full app rewrites.",
    highlight: "Thousands of files migrated • company-wide adoption",
    bullets: [
      "Designed and shipped a fleet of **VS Code + Claude agents and skills** (Sonnet 4.6) that ran across entire repos with minimal human intervention — migrating **thousands of files across multiple teams** off a seven-year-old internal library onto its modern replacement.",
      "Led a core infrastructure shift from a fragile **segmented/replicated architecture to module federation**.",
      "Built a **novel UI component** for navigating complex, nuanced hierarchies — replacing a recurring source of user friction across the platform.",
      "Drove **clean-code patterns, testing standards, and cross-team facilitation** as both IC and informal tech lead.",
    ],
  },
  {
    title: "Founding Engineer",
    company: "Geode IP",
    period: "May 2022 — Feb 2023",
    headline: "First engineer on a 7-person founding team — patent & IP management software for IP professionals.",
    highlight: "Reported directly to CEO + COO",
    bullets: [
      "Owned the **Next.js + React + shadcn** frontend end-to-end.",
      "**Tuned database performance** against real query loads to keep the product responsive under production data.",
      "Collaborated across the founding team (CEO, COO, 5 engineers) to **ship product from zero** — storage, workflow, and assistive tooling.",
    ],
  },
  {
    title: "Senior Engineer",
    company: "Limelight Networks",
    period: "Mar 2022 — May 2022",
    headline: "Performance work on live customer sites — no source access required.",
    highlight: "Up to 25% perf gains",
    bullets: [
      "Built a **proxy + web-scraping pipeline** that improved performance of deployed customer websites by **up to 25%** — without direct access to their source.",
      "Role ended in a **company-wide layoff**.",
    ],
  },
  {
    title: "Team Lead / Senior Frontend",
    company: "eVolve MEP",
    period: "Oct 2021 — Mar 2022",
    headline: "Led a greenfield React codebase for mechanical/electrical/plumbing trade software.",
    highlight: "Led 4+ engineers",
    bullets: [
      "Led a **mixed senior + mid team of 4+ engineers** on a greenfield React build.",
      "**Ran interviews and grew the team** during the role.",
      "Defined and enforced **clean-code + testing standards**, owned architecture decisions, wrote the process docs the team worked from.",
    ],
  },
  {
    title: "React Developer",
    company: "StorageCraft",
    period: "Jan 2020 — Aug 2021",
    headline: "Lead frontend on a SaaS cloud backup UI.",
    bullets: [
      "Lead frontend on a **SaaS cloud backup UI**.",
      "**Apollo GraphQL, MSAL, MS Graph**, occasional C# backend work.",
    ],
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
    name: "Jarvis",
    duty: "Desktop & Machine",
    quote: "“Jarvis, I have an idea…”",
    detail:
      "Runs my Arch + Hyprland workstation. Waybar modules, GTK popups, hotkeys, packages, dotfiles — all in the Andromeda palette, all version-controlled in the montressor repos.",
  },
  {
    icon: Sparkles,
    name: "Friday",
    duty: "Research Assistant",
    quote: "“Quick question…”",
    detail:
      "External web research and product recommendations. No code, no system work — just synthesizes multiple sources into one actionable answer so the other agents (and I) can move.",
  },
  {
    icon: Hammer,
    name: "Smith",
    duty: "Code Agents",
    quote: "“That's right… Me, Me, Me!”",
    detail:
      "Not one agent — a team. They build features, refactor, debug, and ship deploys inside ~/src projects. Read first, then edit. Deployed primarily in parallel.",
  },
]
