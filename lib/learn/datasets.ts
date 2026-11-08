export type Point = { x: number; y: number; label: number }

/** The puzzles the banner cycles through, in order. */
export const PUZZLES = ["spiral", "rings", "waves"] as const
export type Puzzle = (typeof PUZZLES)[number]

export const CLASSES = 3

/** Small seeded generator (mulberry32), so every visit draws the same puzzle. */
export function seededRandom(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const clamp = (v: number) => Math.max(-1, Math.min(1, v))

/** Points for one puzzle, in the -1..1 square, `perClass` of each of the three classes. */
export function makeDataset(kind: Puzzle, perClass: number): Point[] {
  const rand = seededRandom(kind.length * 1000 + perClass)
  const jitter = (s: number) => (rand() - 0.5) * s
  const points: Point[] = []

  for (let label = 0; label < CLASSES; label++) {
    for (let i = 0; i < perClass; i++) {
      const t = (i + 1) / perClass
      let x: number
      let y: number
      if (kind === "spiral") {
        // Three arms winding out from the centre.
        const angle = t * 8.5 + (label * 2 * Math.PI) / CLASSES + jitter(0.3)
        x = t * 0.95 * Math.cos(angle)
        y = t * 0.95 * Math.sin(angle)
      } else if (kind === "rings") {
        // One class per ring, centre outward.
        const r = 0.22 + label * 0.32 + jitter(0.1)
        const angle = rand() * Math.PI * 2
        x = r * Math.cos(angle)
        y = r * Math.sin(angle)
      } else {
        // Three stacked waves running the width of the banner.
        x = t * 2 - 1 + jitter(0.04)
        y = (label - 1) * 0.55 + Math.sin(x * Math.PI * 1.5) * 0.28 + jitter(0.12)
      }
      points.push({ x: clamp(x), y: clamp(y), label })
    }
  }
  return points
}
