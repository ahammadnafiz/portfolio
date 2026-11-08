import type { Project } from "@/lib/projects"

/** Small coloured dot + label. Green for things people can use today. */
export function Status({ status }: { status: Project["status"] }) {
  const live = status === "Live"
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${live ? "bg-[hsl(var(--live))]" : status === "In development" ? "bg-[hsl(var(--hl-orange))]" : "bg-[hsl(var(--hl-blue))]"}`}
      />
      {status}
    </span>
  )
}
