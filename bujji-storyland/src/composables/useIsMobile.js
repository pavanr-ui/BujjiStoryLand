import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * True on small screens or touch-first devices (no hover, coarse pointer).
 * Used to skip WebGL and mouse-only effects on phones and tablets.
 */
export function useIsMobile(breakpoint = 900) {
  const query = `(max-width: ${breakpoint}px), (hover: none) and (pointer: coarse)`
  const isMobile = ref(typeof window !== 'undefined' && window.matchMedia(query).matches)
  let mq
  const update = (e) => (isMobile.value = e.matches)
  onMounted(() => {
    mq = window.matchMedia(query)
    isMobile.value = mq.matches
    mq.addEventListener('change', update)
  })
  onBeforeUnmount(() => mq && mq.removeEventListener('change', update))
  return isMobile
}
