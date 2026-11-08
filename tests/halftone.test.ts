import { describe, expect, it } from "vitest"
import { halftone } from "@/lib/halftone"

const frame = { width: 200, height: 100, cell: 10, angle: 0 }

describe("halftone", () => {
  it("draws nothing where the field is empty", () => {
    expect(halftone({ ...frame, field: () => 0 })).toEqual([])
  })

  it("fills a solid field with full-size dots on every grid point", () => {
    const dots = halftone({ ...frame, field: () => 1 })
    // 21 columns (x = 0..200 step 10) by 11 rows (y = 0..100 step 10)
    expect(dots).toHaveLength(231)
    expect(dots.every((d) => d.r === 5)).toBe(true)
  })

  it("keeps every dot centre inside the frame on a rotated screen", () => {
    const dots = halftone({ ...frame, angle: 45, field: () => 1 })
    expect(dots.length).toBeGreaterThan(0)
    for (const d of dots) {
      expect(d.x).toBeGreaterThanOrEqual(0)
      expect(d.x).toBeLessThanOrEqual(200)
      expect(d.y).toBeGreaterThanOrEqual(0)
      expect(d.y).toBeLessThanOrEqual(100)
    }
  })

  it("makes a quarter-density dot half as wide as a full one", () => {
    const [dot] = halftone({ width: 10, height: 10, cell: 20, angle: 0, field: () => 0.25 })
    expect(dot.r).toBe(5)
  })
})
