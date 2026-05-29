export const site = {
  name: "Raymond Shiner",
  title: "AI-native software engineer",
  shortBio:
    "I build React systems and the agentic workflows that ship them. Five years of frontend craft, two of leading teams, and a desktop full of hand-built tools.",
  location: "Spokane Valley, WA",
  email: "raymondshiner@gmail.com",
  github: "https://github.com/raymondshiner",
  linkedin: "https://www.linkedin.com/in/raymondshiner",
  liveSiteV1: "https://v1.raymondshiner.com",
  liveSiteV2: "https://rshiner-website-v2.vercel.app",
} as const

export type SiteConfig = typeof site
