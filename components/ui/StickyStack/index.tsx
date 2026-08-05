'use client'

import { useEffect } from 'react'

// Mounted once in the root layout. Drives the "Apple-style" sticky card stack
// used by both the Capabilities groups and the Approach steps: as the next
// card scrolls up and starts covering the current one, the current card
// scales down, fades, and blurs — and its progress bar (if any) fills.
// Operates generically over [data-stack-group] > [data-step-card] via data
// attributes, same as the original, so both sections share one effect.
export function StickyStack() {
  useEffect(() => {
    let raf: number | null = null

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        document.querySelectorAll('[data-stack-group]').forEach((group) => {
          const cards = Array.from(group.querySelectorAll<HTMLElement>('[data-step-card]'))
          cards.forEach((card, i) => {
            const stickTop = 92 + i * 20
            const next = cards[i + 1]
            const r = card.getBoundingClientRect()
            let t = 0
            if (next) {
              const nr = next.getBoundingClientRect()
              t = Math.min(1, Math.max(0, (r.bottom - nr.top) / Math.max(1, r.bottom - stickTop)))
            }
            card.style.transform = `scale(${(1 - t * 0.05).toFixed(4)})`
            card.style.opacity = `${(1 - t * 0.3).toFixed(3)}`
            card.style.filter = t > 0.01 ? `blur(${(t * 12).toFixed(1)}px)` : 'none'

            const bar = card.querySelector<HTMLElement>('[data-step-bar]')
            if (bar) {
              const stuck = r.top <= stickTop + 6
              bar.style.width = stuck ? bar.dataset.full ?? '100%' : bar.dataset.start ?? '0%'
            }
          })
        })
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
