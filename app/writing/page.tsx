import type { Metadata } from "next"
import { Container } from "@/components/frame"
import { PostList } from "@/components/post-list"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SHARE_IMAGE } from "@/lib/site"
import { getPosts } from "@/lib/writing"

const DESCRIPTION =
  "Writing by Ahammad Nafiz on machine learning, neural networks from scratch, attention and NLP, agent memory, and Python."

export const metadata: Metadata = {
  title: "Writing",
  description: DESCRIPTION,
  alternates: { canonical: "/writing/" },
  openGraph: { title: "Writing | Ahammad Nafiz", description: DESCRIPTION, url: "/writing/", images: [SHARE_IMAGE] },
}

export default function WritingPage() {
  const posts = getPosts()
  const years = [...new Set(posts.map((p) => p.date.slice(0, 4)))]

  return (
    <>
      <SiteHeader />
      <main>
        <Container className="pt-6 sm:pt-10">
          <h1 className="font-serif text-[2.6rem] leading-[1.05] sm:text-[3.25rem]">Writing</h1>
          <p className="mt-3 max-w-[52ch] leading-relaxed text-muted-foreground">
            Notes from learning in public: neural networks and backprop by hand, attention and NLP, how agents remember,
            and Python.
          </p>
          {years.map((year) => (
            <section key={year} className="mt-10">
              <h2 className="font-mono text-xs tabular-nums text-muted-foreground">{year}</h2>
              <PostList posts={posts.filter((p) => p.date.startsWith(year))} />
            </section>
          ))}
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
