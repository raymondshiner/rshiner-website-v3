import type { LucideIcon } from "lucide-react"
import { Bot, Code2, Layers, Users } from "lucide-react"

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
      "Team communication",
      "Mentoring",
      "Clean-code enforcement",
      "Agile process design",
      "Hiring + training",
    ],
    accent: "yellow",
  },
  {
    icon: Bot,
    title: "AI tooling",
    summary: "Heavy use, human judgment.",
    items: [
      "Claude Code (CLI)",
      "Custom subagents",
      "Anthropic SDK",
      "MCP servers",
      "Production LLM tooling",
      "ChatGPT / Claude UI",
    ],
    accent: "purple",
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
    title: "Software Engineer, CORE Platform Team",
    company: "Divisions Maintenance Group",
    period: "May 2023 — May 2026",
    headline: "Internal platform group owning ~80 of ~150 internally deployed services; frontend sub-team of three.",
    highlight: "Thousands of files migrated • company-wide adoption",
    bullets: [
      "Proposed **module federation** as the delivery architecture for internal applications, won approval, and built the host against legacy infrastructure — it became the founding basis for the **company-wide infrastructure rewrite** that replaced the old platform.",
      "Built a reusable, **commit-gated migration agent** to move codebases off a seven-year-old internal component library; ran across **thousands of files**, shipped centrally with documentation, and adopted by the wider React group as the base for their own MUI v6→v8 upgrade.",
      "Diagnosed a heavily-criticized internal validation tool as a **UX failure rather than a bug backlog**, and convinced leadership to fund a rebuild instead of a patch pass; the complaints stopped.",
      "Introduced an **API typing and mapping layer** mid-refactor and designed a **backend-for-frontend contract** to decouple frontend from backend services, including a v2 API shape that replaced multiple round trips with a single request.",
      "Owned **on-call incident triage** end to end — including a Sev 2 cardholder-data exposure — running post-mortems and shipping resilience fixes.",
      "Defined the frontend group's **clean-code and testing standards**, authored its Frontend Patterns document, mentored engineers in 1-on-1s, and was loaned to other teams to integrate their work with company systems.",
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
