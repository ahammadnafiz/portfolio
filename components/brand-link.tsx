import { brands } from "@/lib/site"

/** A company name with its logo, linking to its site. Calm hover: the logo lifts, the arrow nudges. */
export function BrandLink({ brand, chip = true }: { brand: keyof typeof brands; chip?: boolean }) {
  const b: { name: string; href: string; logo: string; bare?: boolean } = brands[brand]
  const { name, href, logo, bare } = b
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/brand whitespace-nowrap font-medium transition-colors duration-300 ${
        chip ? "rounded-md bg-secondary px-1.5 py-0.5" : "hover:text-muted-foreground"
      }`}
    >
      <img
        src={logo}
        alt=""
        width={16}
        height={16}
        className={`mr-1.5 inline-block h-4 w-4 align-[-0.17em] ${bare ? "object-contain" : "rounded-[4px] ring-1 ring-border"} transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/brand:scale-110`}
      />
      {name}
      <span
        aria-hidden
        className="ml-1 inline-block text-[0.85em] text-muted-foreground transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/brand:-translate-y-px group-hover/brand:translate-x-px group-hover/brand:text-foreground"
      >
        ↗
      </span>
    </a>
  )
}
