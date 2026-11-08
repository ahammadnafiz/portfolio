"use client"

import { useEffect, useRef, useState } from "react"
import { halftone } from "@/lib/halftone"
import { makeDataset, PUZZLES, type Point } from "@/lib/learn/datasets"
import { TinyNet } from "@/lib/learn/tiny-net"

const COLORS = ["#FF7A45", "#8B6CFF", "#2ED3A0"]
const NAMES = ["orange", "violet", "teal"]
const PER_CLASS = 36
/** Training pace, kept the same on 60 Hz and 120 Hz screens. */
const STEPS_PER_SECOND = 30
const CELL = 9
/** Stop once the loss is this low (the regions have firmed up), or after this many steps. */
const GOOD_LOSS = 0.04
const MAX_STEPS = 3000
/** How long a learned puzzle stays on screen before the next one starts. */
const HOLD_MS = 20_000
/** The data lives in a -1..1 square; stretch it sideways to fill a wide banner. */
const STRETCH = 1.7

type Stats = { epoch: number; loss: number; acc: number }

export function LearningBanner() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stats, setStats] = useState<Stats>({ epoch: 0, loss: 0, acc: 0 })
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const resetRef = useRef<() => void>(() => {})
  const addRef = useRef<(clientX: number, clientY: number) => void>(() => {})

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let puzzle = 0
    let data: Point[] = makeDataset(PUZZLES[0], PER_CLASS)
    let net = new TinyNet(1)
    let loss = 0
    let learnedAt = 0
    let width = 0
    let height = 0
    let dots: { x: number; y: number }[] = []
    let visible = true
    let frame = 0
    let last = 0
    let owed = 0

    // Canvas pixel <-> data coordinates.
    const toData = (px: number, py: number) => ({
      x: (px - width / 2) / ((height / 2) * 0.9 * STRETCH),
      y: (py - height / 2) / ((height / 2) * 0.9),
    })
    const toCanvas = (x: number, y: number) => ({
      x: width / 2 + x * (height / 2) * 0.9 * STRETCH,
      y: height / 2 + y * (height / 2) * 0.9,
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = wrap.clientWidth
      height = wrap.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Same 30° screen as the project covers.
      dots = halftone({ width, height, cell: CELL, angle: 30, field: () => 1 })
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const d of dots) {
        const { x, y } = toData(d.x, d.y)
        const probs = net.predict(x, y)
        let best = 0
        for (let c = 1; c < probs.length; c++) if (probs[c] > probs[best]) best = c
        // Dot area follows confidence: an even guess is a speck, a sure one is a full dot.
        const sure = Math.max(0.06, (probs[best] - 1 / 3) * 1.5)
        ctx.fillStyle = COLORS[best]
        ctx.beginPath()
        ctx.arc(d.x, d.y, (CELL / 2) * 0.9 * Math.sqrt(sure), 0, Math.PI * 2)
        ctx.fill()
      }
      const ink = getComputedStyle(canvas).color
      for (const p of data) {
        const { x, y } = toCanvas(p.x, p.y)
        ctx.beginPath()
        ctx.arc(x, y, 3.2, 0, Math.PI * 2)
        ctx.fillStyle = COLORS[p.label]
        ctx.fill()
        ctx.lineWidth = 1.5
        ctx.strokeStyle = ink
        ctx.stroke()
      }
    }

    const report = () => setStats({ epoch: net.steps, loss, acc: net.accuracy(data) })

    const train = (steps: number) => {
      for (let i = 0; i < steps; i++) loss = net.step(data)
    }

    const learned = () => (net.steps > 0 && loss < GOOD_LOSS) || net.steps >= MAX_STEPS

    const start = (next: number, points: Point[]) => {
      puzzle = next
      data = points
      net = new TinyNet(next + 1)
      loss = 0
      learnedAt = 0
      if (reduced) {
        // No animation: show the finished result straight away.
        while (!learned()) train(50)
        draw()
        report()
      }
    }

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      const elapsed = last ? Math.min(now - last, 100) : 0
      last = now
      if (!visible || document.hidden) return
      if (!learnedAt) {
        owed += (elapsed / 1000) * STEPS_PER_SECOND
        const steps = Math.floor(owed)
        if (steps === 0) return
        owed -= steps
        train(steps)
        if (learned()) learnedAt = now
        draw()
        report()
      } else if (now - learnedAt > HOLD_MS) {
        const next = (puzzle + 1) % PUZZLES.length
        start(next, makeDataset(PUZZLES[next], PER_CLASS))
      }
    }

    resetRef.current = () => start(puzzle, makeDataset(PUZZLES[puzzle], PER_CLASS))
    addRef.current = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect()
      const p = toData(clientX - rect.left, clientY - rect.top)
      data = [...data, { x: p.x, y: p.y, label: activeRef.current }]
      // Keep the weights it has and let it adjust around the new point.
      learnedAt = 0
      if (reduced) {
        const until = net.steps + 400
        while (net.steps < until && !learned()) train(50)
        draw()
        report()
      }
    }

    resize()
    start(0, data)
    if (reduced) {
      draw()
    } else {
      frame = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(wrap)
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(wrap)

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative h-44 w-full overflow-hidden rounded-lg border bg-card sm:h-48">
      <noscript>
        <img src="/covers/banner.svg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      </noscript>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="A small neural network learning, live, to tell three groups of points apart. Click to add a point."
        className="absolute inset-0 h-full w-full cursor-crosshair text-foreground"
        onPointerDown={(e) => addRef.current(e.clientX, e.clientY)}
      />

      <div className="pointer-events-none absolute inset-x-2 bottom-2 flex items-end justify-between gap-2">
        <p className="rounded-md bg-background/80 px-2 py-1 font-mono text-[11px] tabular-nums text-muted-foreground backdrop-blur">
          epoch {stats.epoch}<span className="hidden sm:inline"> · loss {stats.loss.toFixed(3)}</span> · acc{" "}
          {Math.round(stats.acc * 100)}%
        </p>
        <div className="pointer-events-auto flex items-center gap-1 rounded-md bg-background/80 p-1 backdrop-blur">
          {COLORS.map((color, i) => (
            <button
              key={color}
              type="button"
              aria-label={`Add ${NAMES[i]} points`}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              className={`grid h-6 w-6 place-items-center rounded ${active === i ? "bg-foreground/15" : ""}`}
            >
              <span className="h-3 w-3 rounded-full" style={{ background: color }} />
            </button>
          ))}
          <button
            type="button"
            onClick={() => resetRef.current()}
            className="ml-1 rounded px-1.5 py-0.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
