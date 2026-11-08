import { Band } from "./frame"
import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer>
      <Band className="flex flex-wrap items-center justify-between gap-2 px-5 py-6 text-xs text-muted-foreground sm:px-6">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>{site.location}</p>
      </Band>
      <div className="border-t border-dashed" />
    </footer>
  )
}
