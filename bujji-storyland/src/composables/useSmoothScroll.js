import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'

let lenis = null
let tick = null

export function getLenis() {
  return lenis
}

/** Start Lenis smooth scrolling, synced with GSAP's ticker and ScrollTrigger. */
export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.4,
  })
  lenis.on('scroll', ScrollTrigger.update)
  tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function stopSmoothScroll() {
  if (!lenis) return
  gsap.ticker.remove(tick)
  lenis.destroy()
  lenis = null
}

/** Freeze/unfreeze page scrolling (used by modals and the mobile menu). */
export function lockScroll(locked) {
  if (lenis) {
    locked ? lenis.stop() : lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
