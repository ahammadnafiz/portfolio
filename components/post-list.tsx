import Link from "next/link"
import { formatDate, langOf, type Post } from "@/lib/writing"

/** Plain rows: title and date, with the description underneath. */
export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="fade-divide">
      {posts.map((p) => (
        <li key={p.slug}>
          {/* No prefetch: math-heavy posts carry large page data, and a list shows many at once. */}
          <Link href={`/writing/${p.slug}/`} prefetch={false} lang={langOf(p)} className="group block py-4">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-medium leading-snug transition-colors duration-300 group-hover:text-muted-foreground">
                {p.title}
              </h3>
              <time dateTime={p.date} className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                {formatDate(p.date)}
              </time>
            </div>
            <p className="mt-1 line-clamp-2 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
