const SOCIALS = [
  { label: "GitHub", href: "https://github.com/ahammadnafiz" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ahammad-nafiz" },
  { label: "Blog", href: "https://ahammadnafiz.github.io" },
  { label: "Phone", href: "tel:+8801619960303" },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full border-t border-border px-5 sm:px-8 lg:px-12 py-14 sm:py-16"
    >
      <div className="flex items-baseline gap-4 mb-8 sm:mb-10">
        <span className="label">( 04 )</span>
        <h2 className="font-display font-medium text-[clamp(2rem,6vw,4rem)] leading-none tracking-[-0.02em]">
          Contact
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 items-end">
        <div className="lg:col-span-8">
          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-foreground/90 mb-6">
            If you&apos;re hiring for ML or AI work, want to talk research, or just have a
            good problem worth nerding out over, my inbox is open.
          </p>
          <a
            href="mailto:ahammadnafiz86@gmail.com"
            className="group inline-block font-display font-medium tracking-[-0.02em] leading-none text-[clamp(1.75rem,6vw,4rem)]"
          >
            <span className="border-b-2 border-foreground pb-1 group-hover:border-transparent transition-colors">
              ahammadnafiz86@gmail.com
            </span>
          </a>
        </div>

        <nav
          className="lg:col-span-4 lg:justify-self-end grid grid-cols-2 gap-x-10 gap-y-4"
          aria-label="Contact and social links"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="link-editorial font-mono text-xs tracking-[0.14em] uppercase"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      <footer className="mt-12 sm:mt-16 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
        <p className="label">© 2026 Ahammad Nafiz</p>
        <p className="label">Dhaka, Bangladesh</p>
        <p className="label">Portfolio / V5</p>
      </footer>
    </section>
  )
}
