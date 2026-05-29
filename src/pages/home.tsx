import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Workflow } from "@/components/sections/workflow"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"

export default function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace("#", "")
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [hash])

  return (
    <>
      <Hero />
      <About />
      <Workflow />
      <Projects />
      <Contact />
    </>
  )
}
