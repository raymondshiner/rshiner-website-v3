import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends ComponentProps<"section"> {
  id: string
  eyebrow?: string
  title?: string
  description?: string
  children: ReactNode
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "border-t-2 border-line px-4 py-16 sm:px-8 sm:py-24 md:px-12",
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <header className="mb-12 space-y-3">
            {eyebrow && (
              <p className="text-xs uppercase tracking-[0.3em] text-cyan">
                — {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-base text-fg-muted sm:text-lg">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
