import { useEffect, useState } from "react"

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site"

const links = [
  { to: "/", label: "Home" },
  { to: "/#about", label: "About" },
  { to: "/#workflow", label: "Workflow" },
  { to: "/#work", label: "Work" },
  { to: "/#contact", label: "Contact" },
]

type NavLinkItem = { to: string; label: string }
type NavDivider = { divider: true }
type NavItem = NavLinkItem | NavDivider
const items: NavItem[] = links as NavItem[]
const isDivider = (i: NavItem): i is NavDivider => "divider" in i

const sectionIds = ["about", "workflow", "work", "contact"]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      if (location.pathname !== "/") {
        setActiveSection("")
        return
      }
      const offset = 80
      let current = ""
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - offset <= 0) current = id
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      if (atBottom) current = "contact"
      setActiveSection(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [location.pathname])

  const isLinkActive = (to: string) => {
    if (to.startsWith("/#")) {
      return location.pathname === "/" && activeSection === to.slice(2)
    }
    if (to === "/") {
      return location.pathname === "/" && !activeSection
    }
    return location.pathname === to || location.pathname.startsWith(to + "/")
  }

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault()
      if (location.hash) navigate("/", { replace: true })
      window.scrollTo({ top: 0, behavior: "smooth" })
      setOpen(false)
    }
  }

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
          onClick={handleHomeClick}
          className="group flex items-center gap-2 font-bold tracking-tight text-fg"
        >
          <span className="text-cyan">[</span>
          <span className="group-hover:text-cyan transition-colors">
            {site.name.toLowerCase().replace(" ", "-")}
          </span>
          <span className="text-cyan">]</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item, idx) =>
            isDivider(item) ? (
              <span
                key={`div-${idx}`}
                aria-hidden
                className="mx-2 h-5 w-px bg-line"
              />
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={item.to === "/" ? handleHomeClick : undefined}
                className={cn(
                  "px-3 py-2 text-sm uppercase tracking-wider transition-colors",
                  isLinkActive(item.to)
                    ? "text-cyan"
                    : "text-fg-muted hover:text-fg",
                )}
              >
                {item.label}
              </NavLink>
            ),
          )}
          <NavLink
            to="/now"
            className={({ isActive }) =>
              cn(
                "group/now ml-3 inline-flex items-center gap-2 border-2 border-purple px-3 py-1.5 text-sm uppercase tracking-wider text-purple transition-all hover:-translate-y-0.5 shadow-brutal-purple",
                isActive && "bg-purple text-bg",
              )
            }
          >
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-purple animate-pulse group-aria-[current=page]/now:bg-bg"
            />
            Now
          </NavLink>
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
        <nav
          className="border-t-2 border-line bg-bg md:hidden"
          onClick={() => setOpen(false)}
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {items.map((item, idx) =>
              isDivider(item) ? (
                <li
                  key={`div-${idx}`}
                  aria-hidden
                  className="my-2 h-px bg-line"
                />
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={item.to === "/" ? handleHomeClick : undefined}
                    className={cn(
                      "block py-3 text-base uppercase tracking-wider hover:text-cyan",
                      isLinkActive(item.to) ? "text-cyan" : "text-fg-muted",
                    )}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
            <li className="mt-2">
              <NavLink
                to="/now"
                className={({ isActive }) =>
                  cn(
                    "group/now inline-flex items-center gap-2 border-2 border-purple px-3 py-2 text-base uppercase tracking-wider text-purple shadow-brutal-purple",
                    isActive && "bg-purple text-bg",
                  )
                }
              >
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-purple animate-pulse group-aria-[current=page]/now:bg-bg"
                />
                Now
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
