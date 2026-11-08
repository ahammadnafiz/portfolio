"use client"

import { useEffect, useState } from "react"

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Dhaka",
})

/** Local time in Dhaka. Renders a placeholder on the server so the static HTML never shows a stale time. */
export function DhakaClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{time || "--:--"}</span>
}
