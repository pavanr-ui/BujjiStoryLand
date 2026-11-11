import { ref, onMounted, onBeforeUnmount } from 'vue'

/** Reactive `prefers-reduced-motion` flag. */
export function useReducedMotion() {
  const reduced = ref(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  let mq
  const update = (e) => (reduced.value = e.matches)
  onMounted(() => {
    mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = mq.matches
    mq.addEventListener('change', update)
  })
  onBeforeUnmount(() => mq && mq.removeEventListener('change', update))
  return reduced
}
