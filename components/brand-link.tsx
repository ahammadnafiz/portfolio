import { brands } from "@/lib/site"

/** A company name with its logo, linking to its site. As a chip it sits in a bordered box; plain, it adds an arrow. */
export function BrandLink({ brand, chip = true }: { brand: keyof typeof brands; chip?: boolean }) {
  const b: { name: string; href: string; logo: string; bare?: boolean } = brands[brand]
  const { name, href, logo, bare } = b
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/brand whitespace-nowrap ${chip ? "brand-chip" : "transition-colors duration-300 hover:text-muted-foreground"}`}
    >
      <img
        src={logo}
        alt=""
        width={16}
        height={16}
        className={`mr-[0.35em] inline-block h-[1em] w-[1em] align-[-0.15em] ${bare ? "object-contain" : "ring-1 ring-border"} transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/brand:scale-110`}
      />
      {name}
      {!chip && (
        <span
          aria-hidden
          className="ml-[0.2em] inline-block text-[0.8em] text-muted-foreground transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/brand:-translate-y-px group-hover/brand:translate-x-px group-hover/brand:text-foreground"
        >
          ↗
        </span>
      )}
    </a>
  )
}
