import Link from "next/link"
import { Container } from "./frame"
import { ThemeToggle } from "./theme-toggle"

const NAV: { label: string; href: string; tiny?: string }[] = [
  { label: "Work", href: "/#work" },
  { label: "Writing", href: "/writing/" },
  // Dropped on very narrow phones (under 390px) so the header fits on one line.
  { label: "Experience", href: "/#experience", tiny: "max-[389px]:hidden" },
  { label: "Contact", href: "/#contact" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-2 sm:gap-4">
        <Link href="/" className="font-serif text-[1.6rem] leading-none">
          Nafiz
        </Link>
        <nav aria-label="Main" className="flex items-center gap-3 text-sm text-muted-foreground sm:gap-6">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={`transition-colors duration-300 hover:text-foreground ${item.tiny ?? ""}`}>
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  )
}
