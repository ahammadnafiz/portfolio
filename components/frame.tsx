import type { ReactNode } from "react"

/** The centre column. Dashed rails run down both sides at every width above mobile. */
export function Rail({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[760px] sm:border-x sm:border-dashed ${className}`}>{children}</div>
  )
}

/** A full-width row of the grid: a dashed line edge to edge, with the column inside. */
export function Band({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <div className="border-t border-dashed">
      <Rail className={className}>{children}</Rail>
    </div>
  )
}

/** An empty band between sections, so the grid reads as rows. */
export function Gap() {
  return <Band className="h-4 sm:h-5" />
}

/** A titled section: the title sits in its own band, the content in the next. */
export function Section({
  id,
  title,
  aside,
  children,
}: {
  id: string
  title: string
  aside?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <Band className="flex items-baseline justify-between gap-4 px-5 py-3 sm:px-6">
        <h2 id={`${id}-title`} className="font-serif text-[1.75rem] leading-none sm:text-[2rem]">
          {title}
        </h2>
        {aside}
      </Band>
      <Band>{children}</Band>
    </section>
  )
}
