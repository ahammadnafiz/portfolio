import Link from "next/link"
import { Rail } from "./frame"
import { DhakaClock } from "./dhaka-clock"

const NAV = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-dashed bg-background/85 backdrop-blur-md">
      <Rail className="flex h-14 items-center justify-between gap-4 px-5 sm:px-6">
        <Link href="/" className="font-serif text-[1.6rem] leading-none">
          Nafiz
        </Link>
        <nav aria-label="Main" className="flex items-center gap-4 text-sm text-muted-foreground sm:gap-6">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <span className="hidden text-xs sm:inline" title="Local time in Dhaka">
            <DhakaClock /> Dhaka
          </span>
        </nav>
      </Rail>
    </header>
  )
}
