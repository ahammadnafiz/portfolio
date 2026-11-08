"use client"

import { useEffect, useRef, useState } from "react"

const WORDS = ["I", "build", "systems", "that", "remember,", "retrieve,", "and", "explain", "themselves."]
const N = WORDS.length

/**
 * Hand-picked attention patterns: which earlier words a word looks at, and how much.
 * Causal, like a language model: a word only looks back.
 */
const PATTERNS: { query: number; keys: [number, number][] }[] = [
  { query: 8, keys: [[2, 0.9], [7, 0.45], [0, 0.25]] },
  { query: 4, keys: [[2, 0.85], [1, 0.35]] },
  { query: 5, keys: [[4, 0.8], [2, 0.4]] },
  { query: 7, keys: [[2, 0.7], [0, 0.4], [1, 0.3]] },
  { query: 2, keys: [[1, 0.9], [0, 0.3]] },
]
const EVERY_MS = 4200

/** Resting weights for the whole map: mostly the word itself and the one before it. */
function restWeight(q: number, k: number) {
  if (k > q) return 0
  if (k === q) return 0.35
  if (k === q - 1) return 0.22
  return 0.08
}

export function AttentionBanner() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  // Move to the next pattern every few seconds, only while it's on screen.
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let visible = false
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(wrap)
    const id = window.setInterval(() => {
      if (visible && !document.hidden) setStep((s) => s + 1)
    }, EVERY_MS)
    return () => {
      io.disconnect()
      window.clearInterval(id)
    }
  }, [])

  const { query, keys } = PATTERNS[step % PATTERNS.length]
  const weightOf = new Map(keys)
  const strongest = Math.max(...keys.map(([, w]) => w))

  return (
    <div
      ref={wrapRef}
      className="grid items-center gap-6 rounded-2xl bg-card px-5 py-6 sm:grid-cols-[1fr_auto] sm:gap-8 sm:px-7 sm:py-7"
    >
      <div>
        <p className="font-serif text-[1.65rem] leading-[1.3] text-foreground/70 sm:text-[1.9rem]">
          {WORDS.map((word, i) => {
            const w = weightOf.get(i) ?? 0
            return (
              <span key={i}>
                <span
                  className="underline decoration-2 underline-offset-[7px] transition-[color,text-decoration-color] duration-1000"
                  style={{
                    color: i === query ? "hsl(var(--foreground))" : undefined,
                    textDecorationColor:
                      w === 0
                        ? "transparent"
                        : w === strongest
                          ? "hsl(var(--hl-orange))"
                          : `hsl(var(--foreground) / ${0.15 + w * 0.5})`,
                  }}
                >
                  {word}
                </span>
                {i < N - 1 ? " " : ""}
              </span>
            )
          })}
        </p>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          A live attention map. Each row is a word; each dot is how much it looks back at an earlier one.
        </p>
      </div>

      <AttentionMap query={query} weightOf={weightOf} strongest={strongest} />
    </div>
  )
}

const CELL = 22

function AttentionMap({
  query,
  weightOf,
  strongest,
}: {
  query: number
  weightOf: Map<number, number>
  strongest: number
}) {
  const size = CELL * N
  return (
    <svg viewBox={`0 0 ${size} ${size}`} aria-hidden className="mx-auto w-full max-w-[168px] sm:w-[200px] sm:max-w-none">
      {/* The row being shown, as a soft band behind its dots. */}
      <rect
        x={0}
        y={query * CELL}
        width={(query + 1) * CELL}
        height={CELL}
        rx={CELL / 2}
        className="fill-foreground/[0.07] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
      />
      {Array.from({ length: N }, (_, q) =>
        Array.from({ length: q + 1 }, (_, k) => {
          const live = q === query ? (weightOf.get(k) ?? 0.05) : restWeight(q, k)
          const accent = q === query && weightOf.get(k) === strongest
          return (
            <circle
              key={`${q}-${k}`}
              cx={k * CELL + CELL / 2}
              cy={q * CELL + CELL / 2}
              r={CELL / 2}
              className="transition-[transform,fill,opacity] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-box:fill-box] [transform-origin:center]"
              style={{
                // Dot area follows the weight, like a halftone.
                transform: `scale(${(0.86 * Math.sqrt(live)).toFixed(3)})`,
                fill: accent ? "hsl(var(--hl-orange))" : "hsl(var(--foreground))",
                opacity: q === query ? 1 : 0.5,
              }}
            />
          )
        }),
      )}
    </svg>
  )
}
