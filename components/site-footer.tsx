import { Container } from "./frame"
import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="pb-10 pt-14 sm:pt-20">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>{site.location}</p>
        </div>
      </Container>
    </footer>
  )
}
