import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { writing, writingComponents } from "@/content/writing/index"

export default function WritingPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const meta = writing.find((p) => p.slug === slug)
  const Component = slug ? writingComponents[slug] : undefined

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!meta || !Component) {
    return (
      <main className="mx-auto max-w-3xl px-4 pt-32 sm:px-8">
        <p className="text-fg-muted">Post not found.</p>
        <Link to="/writing" className="text-cyan underline">
          Back to writing
        </Link>
      </main>
    )
  }

  const published = new Date(meta.published + "T00:00:00Z").toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
  )

  return (
    <main className="px-4 pt-32 pb-24 sm:px-8">
      <article className="mx-auto max-w-3xl">
        <Link
          to="/writing"
          className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-fg-muted hover:text-cyan"
        >
          <ArrowLeft className="size-3" /> All writing
        </Link>
        <header className="mb-10 space-y-4 border-b-2 border-line pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">
            <time dateTime={meta.published}>{published}</time>
          </p>
          <h1 className="text-4xl font-black tracking-tight text-fg sm:text-5xl">
            {meta.title}
          </h1>
          <p className="text-lg text-fg-muted">{meta.summary}</p>
        </header>
        <div className="prose-andromeda">
          <Component />
        </div>
      </article>
    </main>
  )
}
