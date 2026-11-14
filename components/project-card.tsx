import Link from "next/link"
import type { Project } from "@/lib/projects"
import { HoverPreview } from "./hover-preview"
import { Status } from "./status"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group flex h-full flex-col gap-3">
      <div>
        <h3 className="font-medium">
          {/* Only the name shows the screenshot on hover. */}
          <HoverPreview src={`/projects/${project.slug}.webp`}>
            {project.name}
            <span
              aria-hidden
              className="ml-1 inline-block text-muted-foreground transition-[transform,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            >
              ↗
            </span>
          </HoverPreview>
        </h3>
        <div className="mt-0.5 flex flex-wrap items-center justify-between gap-x-3 text-xs text-muted-foreground">
          <span>{project.kind}</span>
          <Status status={project.status} />
        </div>
      </div>
      <p className="text-sm leading-relaxed text-foreground/85">{project.summary}</p>
      {/* One line of tags: the first three, never wrapping (the full stack is on the project page). */}
      <ul className="mt-auto flex gap-1.5 overflow-hidden pt-1">
        {project.stack.slice(0, 3).map((t) => (
          <li key={t} className="shrink-0 whitespace-nowrap border px-2 py-0.5 text-[11px] text-muted-foreground">
            {t}
          </li>
        ))}
      </ul>
    </Link>
  )
}
