import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/frame"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Status } from "@/components/status"
import { projects } from "@/lib/projects"
import { SHARE_IMAGE } from "@/lib/site"

const DESCRIPTION =
  "Projects by Ahammad Nafiz: AI agents, agent memory, RAG systems and a deep learning framework built from scratch."

export const metadata: Metadata = {
  title: "Work",
  description: DESCRIPTION,
  alternates: { canonical: "/work/" },
  openGraph: { title: "Work | Ahammad Nafiz", description: DESCRIPTION, url: "/work/", images: [SHARE_IMAGE] },
}

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Container className="pt-4 sm:pt-6">
          <Link href="/" className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground">
            <span aria-hidden>←</span> Home
          </Link>
          <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.05] sm:text-[3.25rem]">Work</h1>
          <ul className="mt-8 divide-y">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}/`} className="group block py-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-medium leading-snug transition-colors duration-300 group-hover:text-muted-foreground">
                      {p.name}
                    </h2>
                    <Status status={p.status} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.kind}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
