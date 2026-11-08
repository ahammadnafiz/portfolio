import type { ReactNode } from "react"

/** The centre column every page sits in. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[720px] px-5 sm:px-6 ${className}`}>{children}</div>
}

/** A sharp hairline that runs a little past the column and fades out at both ends. */
export function Rule({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`fade-rule ${className}`} />
}

/** A numbered section: a rule, then "01  Title", then the content. */
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
      <Rule className="mb-8 sm:mb-10" />
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
