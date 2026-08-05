'use client'

import { useEffect } from 'react'

// Mounted once in the root layout. Adds the 'as-reveal-ready' class (which
// activates the [data-reveal] transition rules in globals.scss) then reveals
// each marked element the first time it scrolls into view.
export function ScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add('as-reveal-ready')

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('as-in')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    )

    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))

    return () => io.disconnect()
  }, [])

  return null
}
