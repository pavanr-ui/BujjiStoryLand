import { onMounted, onBeforeUnmount } from 'vue'
import { gsap, prefersReducedMotion } from '@/animations/gsap'

/**
 * Moves every element inside `rootRef` that has [data-depth] according to the
 * mouse position. data-depth="0.2" moves gently, "1" moves a lot.
 * Disabled on touch devices and for reduced motion.
 */
export function useMouseParallax(rootRef, { strength = 40 } = {}) {
  let movers = []
  let onMove

  onMounted(() => {
    const root = rootRef.value
    if (!root || prefersReducedMotion() || window.matchMedia('(hover: none)').matches) return

    movers = [...root.querySelectorAll('[data-depth]')].map((el) => {
      const depth = Number(el.dataset.depth) || 0.2
      return {
        depth,
        x: gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3.out' }),
      }
    })

    onMove = (e) => {
      const rect = root.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      movers.forEach((m) => {
        m.x(-nx * strength * m.depth)
        m.y(-ny * strength * m.depth * 0.6)
      })
    }
    root.addEventListener('pointermove', onMove)
  })

  onBeforeUnmount(() => {
    const root = rootRef.value
    if (root && onMove) root.removeEventListener('pointermove', onMove)
  })
}
