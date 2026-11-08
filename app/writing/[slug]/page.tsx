import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Container } from "@/components/frame"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SITE_URL } from "@/lib/site"
import { formatDate, getPost, getPosts, langOf, renderMarkdown } from "@/lib/writing"

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  const url = `/writing/${post.slug}/`
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: { type: "article", title: post.title, description: post.description, url, publishedTime: post.date },
  }
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug)
  if (!post) notFound()
  const html = await renderMarkdown(post.body)
  const posts = getPosts()
  const i = posts.findIndex((p) => p.slug === post.slug)
  const newer = posts[i - 1]
  const older = posts[i + 1]
  const lang = langOf(post)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: lang,
    keywords: post.tags.join(", "),
    url: `${SITE_URL}/writing/${post.slug}/`,
    mainEntityOfPage: `${SITE_URL}/writing/${post.slug}/`,
    author: { "@id": `${SITE_URL}/#person` },
  }

  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <Container className="pt-4 sm:pt-6">
          <Link
            href="/writing/"
            className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <span aria-hidden>←</span> All writing
          </Link>

          <article lang={lang} className="mt-8">
            <p className="font-mono text-xs tabular-nums text-muted-foreground">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} min read
            </p>
            <h1 className="mt-3 font-serif text-[2.3rem] leading-[1.08] sm:text-[3rem]">{post.title}</h1>
            <div className="post mt-10" dangerouslySetInnerHTML={{ __html: html }} />
          </article>

          <nav aria-label="More writing" className="mt-16 grid grid-cols-2 gap-4">
            {older ? (
              <Link
                href={`/writing/${older.slug}/`}
                prefetch={false}
                lang={langOf(older)}
                className="rounded-xl bg-card px-4 py-3.5 transition-colors duration-300 hover:bg-secondary"
              >
                <span className="text-xs text-muted-foreground">← Older</span>
                <span className="mt-1 line-clamp-2 block font-medium">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link
                href={`/writing/${newer.slug}/`}
                prefetch={false}
                lang={langOf(newer)}
                className="rounded-xl bg-card px-4 py-3.5 text-right transition-colors duration-300 hover:bg-secondary"
              >
                <span className="text-xs text-muted-foreground">Newer →</span>
                <span className="mt-1 line-clamp-2 block font-medium">{newer.title}</span>
              </Link>
            )}
          </nav>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
