import type { ComponentType } from "react"
import NotesFromTheWorkshop from "./notes-from-the-workshop.mdx"

export interface WritingMeta {
  slug: string
  title: string
  summary: string
  published: string
  tags?: string[]
  draft?: boolean
}

export const writing: WritingMeta[] = [
  {
    slug: "notes-from-the-workshop",
    title: "Notes from the workshop",
    summary:
      "Why this section exists, what's queued up, and how I'm going to use it.",
    published: "2026-06-09",
    tags: ["meta", "workflow"],
  },
]

export const writingComponents: Record<string, ComponentType> = {
  "notes-from-the-workshop": NotesFromTheWorkshop,
}
