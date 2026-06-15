import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site"

const links = [
  { to: "/", label: "Home" },
  { to: "/#work", label: "Work" },
  { to: "/#workflow", label: "Workflow" },
  { to: "/now", label: "Now" },
  { to: "/writing", label: "Writing" },
  { to: "/#contact", label: "Contact" },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all",
        scrolled
          ? "border-b-2 border-line bg-bg/85 backdrop-blur-md"
          : "border-b-2 border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link
          to="/"
          className="group flex items-center gap-2 font-bold tracking-tight text-fg"
        >
          <span className="text-cyan">[</span>
          <span className="group-hover:text-cyan transition-colors">
            {site.name.toLowerCase().replace(" ", "-")}
          </span>
          <span className="text-cyan">]</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm uppercase tracking-wider transition-colors",
                  isActive && l.to === "/"
                    ? "text-cyan"
                    : "text-fg-muted hover:text-fg",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center border-2 border-line text-fg md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t-2 border-line bg-bg md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className="block py-3 text-base uppercase tracking-wider text-fg-muted hover:text-cyan"
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
