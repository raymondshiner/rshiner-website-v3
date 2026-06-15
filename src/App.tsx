import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { Nav } from "@/components/layout/nav"
import { Footer } from "@/components/layout/footer"
import { AskRaymond } from "@/components/chat/ask-raymond"

const HomePage = lazy(() => import("@/pages/home"))
const NowPage = lazy(() => import("@/pages/now"))
const CaseStudyPage = lazy(() => import("@/pages/case-study"))
const WritingPage = lazy(() => import("@/pages/writing"))
const WritingPostPage = lazy(() => import("@/pages/writing-post"))

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
            <Route path="/writing" element={<WritingPage />} />
            <Route path="/writing/:slug" element={<WritingPostPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <AskRaymond />
    </div>
  )
}

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-fg-muted">
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
        <a href="/" className="text-cyan underline">
          home
        </a>
        .
      </p>
    </div>
  )
}
