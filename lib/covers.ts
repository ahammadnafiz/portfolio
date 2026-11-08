import { halftone, type Field } from "./halftone"

/** Covers are 16:10. Fields work in x = 0..1.6, y = 0..1 so shapes stay round. */
const ASPECT = 1.6
const W = 800
const H = 500

type Cover = { stops: string[]; field: Field; width?: number; height?: number }

const blob = (x: number, y: number, cx: number, cy: number, s: number) =>
  Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (2 * s * s))

/** Thin band around a line segment, fading with distance from it. */
const stroke = (x: number, y: number, ax: number, ay: number, bx: number, by: number, w: number) => {
  const dx = bx - ax
  const dy = by - ay
  const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)))
  return blob(x, y, ax + t * dx, ay + t * dy, w)
}

// Fixed pseudo-random sequence, so every build draws the same picture.
const seeded = (n: number) => {
  const out: number[] = []
  let s = 7
  for (let i = 0; i < n; i++) {
    s = (s * 16807) % 2147483647
    out.push(s / 2147483647)
  }
  return out
}
const noise = seeded(64)

const at = (f: (x: number, y: number) => number): Field => (u, v) => f(u * ASPECT, v)

const covers: Record<string, Cover> = {
  // Wide strip for the top of the home page: every project colour, crossed by two waves.
  banner: {
    stops: ["#FF8A3D", "#FF4F7B", "#8B6CFF", "#4DA3FF", "#2ED3A0"],
    width: 1520,
    height: 360,
    field: (u, v) => {
      const a = Math.sin(u * 11 + 0.6) * 0.18 + 0.5
      const b = Math.sin(u * 7 - 1.2) * 0.22 + 0.5
      const band = (c: number) => Math.exp(-((v - c) ** 2) / 0.006)
      return Math.max(band(a), band(b) * 0.7) * (0.35 + 0.65 * Math.sin(u * Math.PI))
    },
  },
  // Eight phases arranged as a loop the agent keeps going around.
  fizzlabai: {
    stops: ["#FF8A3D", "#FF4F7B"],
    field: at((x, y) => {
      let d = 0
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * Math.PI * 2 - Math.PI / 2
        d = Math.max(d, blob(x, y, 1.05 + 0.3 * Math.cos(a), 0.5 + 0.3 * Math.sin(a), 0.055 + k * 0.004))
      }
      const ring = Math.exp(-((Math.hypot(x - 1.05, y - 0.5) - 0.3) ** 2) / 0.0012)
      return Math.max(d, ring * 0.5)
    }),
  },
  // Memories as clusters of different sizes, linked into a graph.
  engram: {
    stops: ["#8B6CFF", "#4DA3FF"],
    field: at((x, y) => {
      const nodes: [number, number, number][] = [
        [0.35, 0.3, 0.09], [0.62, 0.62, 0.12], [0.95, 0.32, 0.07], [1.2, 0.68, 0.1], [1.38, 0.28, 0.06], [0.25, 0.75, 0.06],
      ]
      let d = 0
      for (const [cx, cy, s] of nodes) d = Math.max(d, blob(x, y, cx, cy, s))
      const links = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [0, 5], [5, 1]]
      for (const [a, b] of links) {
        d = Math.max(d, 0.55 * stroke(x, y, nodes[a][0], nodes[a][1], nodes[b][0], nodes[b][1], 0.012))
      }
      return d
    }),
  },
  // One question fanning out to several sources.
  "personal-knowledge-assistant": {
    stops: ["#2ED3A0", "#1AA6B7"],
    field: at((x, y) => {
      let d = blob(x, y, 0.3, 0.5, 0.09)
      const ends = [0.15, 0.35, 0.5, 0.65, 0.85]
      ends.forEach((ey, i) => {
        d = Math.max(d, 0.7 * stroke(x, y, 0.3, 0.5, 1.3, ey, 0.014), blob(x, y, 1.3, ey, 0.04 + 0.012 * i))
      })
      return d
    }),
  },
  // A commit history: one main line, branches leaving and merging back, each commit a dot.
  atlas: {
    stops: ["#7C8CFF", "#B86BFF"],
    field: at((x, y) => {
      let d = 0.7 * stroke(x, y, 0.15, 0.5, 1.45, 0.5, 0.012)
      const branches: [number, number, number][] = [[0.3, 0.75, 0.22], [0.8, 1.15, 0.78], [1.0, 1.3, 0.25]]
      for (const [from, to, by] of branches) {
        const mid = (from + to) / 2
        d = Math.max(d, 0.7 * stroke(x, y, from, 0.5, mid, by, 0.012), 0.7 * stroke(x, y, mid, by, to, 0.5, 0.012))
        d = Math.max(d, blob(x, y, mid, by, 0.035))
      }
      for (let i = 0; i < 9; i++) d = Math.max(d, blob(x, y, 0.2 + i * 0.15, 0.5, 0.032))
      return d
    }),
  },
  // A conversation: a customer's bubble, the agent's reply, and a row of products.
  buyziz: {
    stops: ["#FFB547", "#FF6F61"],
    field: at((x, y) => {
      const box = (x0: number, y0: number, x1: number, y1: number) => (x > x0 && x < x1 && y > y0 && y < y1 ? 1 : 0)
      let d = 0.85 * box(0.2, 0.14, 0.8, 0.32) + 0.55 * box(0.75, 0.38, 1.4, 0.56)
      for (let i = 0; i < 4; i++) d = Math.max(d, 0.95 * box(0.2 + i * 0.31, 0.64, 0.45 + i * 0.31, 0.88))
      return d
    }),
  },
  // Contour lines of a loss surface, with gradient descent heading for the minimum.
  fiztorch: {
    stops: ["#FF5E4D", "#FFB443"],
    field: at((x, y) => {
      const r = Math.hypot((x - 1.0) / 1.4, y - 0.55)
      const contours = 0.5 + 0.5 * Math.cos(r * 38)
      const bowl = Math.max(0, 1 - r * 1.6)
      let d = contours * bowl * 0.8
      const path: [number, number][] = [[0.35, 0.15], [0.6, 0.3], [0.8, 0.44], [0.93, 0.51], [1.0, 0.55]]
      path.forEach(([px, py], i) => (d = Math.max(d, blob(x, y, px, py, 0.03 + i * 0.004))))
      return d
    }),
  },
}

const r1 = (n: number) => Math.round(n * 10) / 10

export function coverSvg(slug: string): string | undefined {
  const cover = covers[slug]
  if (!cover) return undefined
  const width = cover.width ?? W
  const height = cover.height ?? H
  const dots = halftone({ width, height, cell: 12, angle: 30, field: cover.field }).filter((d) => d.r >= 0.6)
  const stops = cover.stops
    .map((c, i) => `<stop offset="${i / (cover.stops.length - 1)}" stop-color="${c}"/>`)
    .join("")
  // Each dot is two half-arcs inside one path: far smaller than a <circle> per dot.
  const d = dots
    .map(({ x, y, r }) => `M${r1(x - r)} ${r1(y)}a${r1(r)} ${r1(r)} 0 1 0 ${r1(2 * r)} 0a${r1(r)} ${r1(r)} 0 1 0 ${r1(-2 * r)} 0`)
    .join("")
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">${stops}</linearGradient></defs><rect width="${width}" height="${height}" fill="url(#g)"/><path d="${d}" fill="#0F0E0E" fill-opacity=".86"/></svg>`
}

export const coverSlugs = Object.keys(covers)
