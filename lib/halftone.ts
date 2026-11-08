export type Dot = { x: number; y: number; r: number }

/** Ink density at a point, with u and v both in 0..1 across the frame. */
export type Field = (u: number, v: number) => number

type HalftoneInput = {
  width: number
  height: number
  /** Distance between dot centres, in px. */
  cell: number
  /** Screen angle in degrees, like a print halftone. */
  angle: number
  field: Field
}

/** Lays a rotated dot grid over the frame; each dot's area follows the field's density. */
export function halftone({ width, height, cell, angle, field }: HalftoneInput): Dot[] {
  const dots: Dot[] = []
  const rad = (angle * Math.PI) / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  const cx = width / 2
  const cy = height / 2
  // Walk a grid large enough to still cover the frame after rotation.
  const reach = Math.ceil(Math.hypot(width, height) / 2 / cell)

  for (let i = -reach; i <= reach; i++) {
    for (let j = -reach; j <= reach; j++) {
      const x = cx + (i * cos - j * sin) * cell
      const y = cy + (i * sin + j * cos) * cell
      if (x < 0 || x > width || y < 0 || y > height) continue
      const density = Math.min(1, Math.max(0, field(x / width, y / height)))
      if (density <= 0) continue
      dots.push({ x, y, r: (cell / 2) * Math.sqrt(density) })
    }
  }
  return dots
}
