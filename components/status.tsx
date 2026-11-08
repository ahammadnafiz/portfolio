import type { Project } from "@/lib/projects"

const DOT: Record<Project["status"], string> = {
  Live: "bg-[hsl(var(--live))]",
  "In development": "bg-[hsl(var(--hl-orange))]",
  "Open source": "bg-[hsl(var(--hl-blue))]",
  Contributor: "bg-[hsl(var(--hl-violet))]",
}

/** Small coloured dot + label. Green for things people can use today. */
export function Status({ status }: { status: Project["status"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span
        aria-hidden
        className={`h-1.5 w-1.5 ${DOT[status]}`}
      />
      {status}
    </span>
  )
}
