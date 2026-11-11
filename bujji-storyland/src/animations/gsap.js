import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerGsap() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ ease: 'power3.out', duration: 0.9 })
  registered = true
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Standard "rise into view" reveal for any elements inside `root`
 * tagged with [data-reveal]. Optional data-reveal-delay per element.
 */
export function revealOnScroll(root) {
  if (!root) return
  // Skip items owned by a nested component that runs its own reveals.
  const items = [...root.querySelectorAll('[data-reveal]')].filter((el) => {
    const owner = el.closest('[data-reveal-root]')
    return !owner || owner === root || !root.contains(owner)
  })
  if (!items.length) return
  if (prefersReducedMotion()) {
    gsap.set(items, { opacity: 1, y: 0 })
    return
  }
  items.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 48 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: Number(el.dataset.revealDelay || 0),
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    )
  })
}

/** Staggered word reveal for elements rendered by <SplitText>. */
export function revealWords(el, { delay = 0, scroll = true } = {}) {
  if (!el) return
  const words = el.querySelectorAll('.split-word')
  if (prefersReducedMotion()) {
    gsap.set(words, { yPercent: 0, opacity: 1 })
    return
  }
  gsap.fromTo(
    words,
    { yPercent: 110, opacity: 0, rotate: 4 },
    {
      yPercent: 0,
      opacity: 1,
      rotate: 0,
      duration: 0.9,
      stagger: 0.06,
      delay,
      ease: 'back.out(1.6)',
      scrollTrigger: scroll ? { trigger: el, start: 'top 85%', once: true } : undefined,
    },
  )
}

export { gsap, ScrollTrigger }
