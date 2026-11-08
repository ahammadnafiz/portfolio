import Link from "next/link"
import type { Project } from "@/lib/projects"
import { Status } from "./status"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group flex h-full flex-col gap-3 p-4 sm:p-5">
      <div className="overflow-hidden rounded-lg border">
        <img
          src={`/covers/${project.slug}.svg`}
          alt=""
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div>
        <h3 className="font-medium">
          {project.name}
          <span
            aria-hidden
            className="ml-1 inline-block text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          >
            ↗
          </span>
        </h3>
        <div className="mt-0.5 flex flex-wrap items-center justify-between gap-x-3 text-xs text-muted-foreground">
          <span>{project.kind}</span>
          <Status status={project.status} />
        </div>
      </div>
      <p className="text-sm leading-relaxed text-foreground/85">{project.summary}</p>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {project.stack.slice(0, 4).map((t) => (
          <li key={t} className="rounded-md border px-2 py-0.5 text-[11px] text-muted-foreground">
            {t}
          </li>
        ))}
      </ul>
    </Link>
  )
}
