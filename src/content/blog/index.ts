import type { ComponentType } from "react"
import AiNativePortfolio from "./ai-native-portfolio.mdx"

export interface PostMeta {
  slug: string
  title: string
  summary: string
  date: string
  tags: string[]
}

export const posts: PostMeta[] = [
  {
    slug: "ai-native-portfolio",
    title: "The portfolio is the proof",
    summary:
      "Why the AI-era dev portfolio is about the workflow, not the artifact — and how I rebuilt mine to show it.",
    date: "2026-05-29",
    tags: ["AI", "Portfolio", "Workflow"],
  },
]

export const postComponents: Record<string, ComponentType> = {
  "ai-native-portfolio": AiNativePortfolio,
}
