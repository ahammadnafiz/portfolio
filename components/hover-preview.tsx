"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

const W = 360 // preview width in px
const H = W * (10 / 16) + 12 // image height plus the frame's inset

/** On mouse devices, a screenshot that fades in and trails the cursor while the children are hovered.
 * Spans, not divs, so it can wrap inline text such as a heading. */
export function HoverPreview({ src, children }: { src: string; children: ReactNode }) {
  const box = useRef<HTMLSpanElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const raf = useRef(0)
  const ease = useRef(0.16)
  const stop = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [enabled, setEnabled] = useState(false)
  const [on, setOn] = useState(false)

  useEffect(() => {
    setEnabled(matchMedia("(hover: hover) and (pointer: fine)").matches)
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) ease.current = 1
    return () => {
      cancelAnimationFrame(raf.current)
      clearTimeout(stop.current)
    }
  }, [])

  const aim = (e: React.PointerEvent) => {
    // Sit to the right of the cursor, or to the left when there is no room.
    const right = e.clientX + 28 + W < window.innerWidth
    target.current = {
      x: right ? e.clientX + 28 : e.clientX - 28 - W,
      y: Math.min(Math.max(e.clientY - H / 2, 12), window.innerHeight - H - 12),
    }
  }

  const tick = () => {
    const p = pos.current
    const t = target.current
    p.x += (t.x - p.x) * ease.current
    p.y += (t.y - p.y) * ease.current
    if (box.current) box.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
    raf.current = requestAnimationFrame(tick)
  }

  if (!enabled) return <>{children}</>

  return (
    <span
      className="inline-block"
      onPointerEnter={(e) => {
        aim(e)
        pos.current = { ...target.current }
        clearTimeout(stop.current)
        cancelAnimationFrame(raf.current)
        raf.current = requestAnimationFrame(tick)
        setOn(true)
      }}
      onPointerMove={aim}
      onPointerLeave={() => {
        setOn(false)
        // Stop following once the fade-out has finished.
        stop.current = setTimeout(() => cancelAnimationFrame(raf.current), 300)
      }}
    >
      {children}
      <span ref={box} aria-hidden className="pointer-events-none fixed left-0 top-0 z-50 block" style={{ width: W }}>
        <span
          className={`block origin-left border bg-card p-1.5 shadow-xl shadow-black/10 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            on ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <img src={src} alt="" width={1600} height={1000} decoding="async" className="block aspect-[16/10] w-full border object-cover" />
        </span>
      </span>
    </span>
  )
}
