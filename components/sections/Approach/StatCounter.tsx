'use client'

import { useEffect, useRef, useState } from 'react'

type StatCounterProps = {
  targetValue: number
  suffix: string
}

// Counts up from 0 to targetValue the first time it scrolls into view —
// mirrors the original's shared statProgress animation, just self-contained
// per stat instead of one timer driving all four.
export function StatCounter({ targetValue, suffix }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let counted = false
    const io = new IntersectionObserver(
      (entries) => {
        if (counted || !entries.some((e) => e.isIntersecting)) return
        counted = true
        io.disconnect()

        const start = performance.now()
        const duration = 1200
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(Math.round(targetValue * eased))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [targetValue])

  return (
    <div ref={ref} className="as-stat__value">
      {value}
      {suffix}
    </div>
  )
}
