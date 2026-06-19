import { lazy, Suspense } from "react"
import { Link, Route, Routes } from "react-router-dom"
import { Nav } from "@/components/layout/nav"
import { Footer } from "@/components/layout/footer"

const HomePage = lazy(() => import("@/pages/home"))
const NowPage = lazy(() => import("@/pages/now"))
const CaseStudyPage = lazy(() => import("@/pages/case-study"))
const AskRaymond = lazy(() =>
  import("@/components/chat/ask-raymond").then((m) => ({ default: m.AskRaymond })),
)

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <Nav />
      <main className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/now" element={<NowPage />} />
            <Route path="/case-study/:slug" element={<CaseStudyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <AskRaymond />
      </Suspense>
    </div>
  )
}

function RouteFallback() {
  // min-h-screen keeps the footer below the fold during route lazy-load,
  // so its eventual push-down when the page chunk arrives doesn't shift
  // visible content (kills the ~0.36 CLS hit Lighthouse mobile flagged).
  return (
    <div className="flex min-h-screen items-center justify-center text-fg-muted">
      <p className="animate-pulse text-xs uppercase tracking-[0.3em]">
        loading…
      </p>
    </div>
  )
}

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan">— 404</p>
      <h1 className="mt-2 text-5xl font-black tracking-tight text-fg">
        Off the map.
      </h1>
      <p className="mt-4 text-fg-muted">
        That URL didn't resolve to anything. Head back to{" "}
        <Link to="/" className="text-cyan underline">
          home
        </Link>
        .
      </p>
    </div>
  )
}
