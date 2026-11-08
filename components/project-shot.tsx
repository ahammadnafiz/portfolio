/** A project's screenshot in a thin frame: border, a small inset, then the image with its own hairline. */
export function ProjectShot({
  slug,
  name,
  eager = false,
  className = "",
}: {
  slug: string
  name: string
  eager?: boolean
  className?: string
}) {
  return (
    <div className="border bg-card p-1.5">
      <div className="overflow-hidden border">
        <img
          src={`/projects/${slug}.webp`}
          alt={`${name} preview`}
          width={1600}
          height={1000}
          loading={eager ? undefined : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          decoding="async"
          className={`aspect-[16/10] w-full object-cover ${className}`}
        />
      </div>
    </div>
  )
}
