import type { ComponentProps } from "react"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 border px-2 py-0.5 text-xs font-medium uppercase tracking-wider",
  {
    variants: {
      tone: {
        cyan: "border-cyan text-cyan bg-cyan/5",
        purple: "border-purple text-purple bg-purple/5",
        green: "border-green text-green bg-green/5",
        yellow: "border-yellow text-yellow bg-yellow/5",
        muted: "border-line text-fg-muted bg-bg-elev",
        red: "border-red text-red bg-red/5",
      },
    },
    defaultVariants: { tone: "muted" },
  },
)

export interface BadgeProps
  extends ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone, className }))} {...props} />
  )
}
