import type { ReactNode } from "react"

/** The centre column every page sits in. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[720px] px-5 sm:px-6 ${className}`}>{children}</div>
}

const RULE_DOTS = 61

/** A row of halftone dots, full in the middle and shrinking to nothing at the edges. */
export function DotRule({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 8" aria-hidden className={`block h-auto w-full text-muted-foreground/60 ${className}`}>
      {Array.from({ length: RULE_DOTS }, (_, i) => {
        const u = i / (RULE_DOTS - 1)
        const r = 2.4 * Math.exp(-(((u - 0.5) / 0.3) ** 2))
        return r < 0.35 ? null : <circle key={i} cx={u * 712 + 4} cy={4} r={r.toFixed(2)} fill="currentColor" />
      })}
    </svg>
  )
}

/** A numbered section: a dot rule, then "01  Title", then the content. */
export function Section({
  id,
  n,
  title,
  aside,
  children,
}: {
  id: string
  n: string
  title: string
  aside?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="pt-12 sm:pt-16">
      <DotRule className="mb-8 sm:mb-10" />
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 id={`${id}-title`} className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-muted-foreground">{n}</span>
          <span className="font-serif text-[2rem] leading-none sm:text-[2.25rem]">{title}</span>
        </h2>
        {aside}
      </div>
      {children}
    </section>
  )
}
