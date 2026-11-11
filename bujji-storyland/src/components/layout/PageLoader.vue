<script setup>
import { ref, onMounted } from 'vue'
import CharacterArt from '@/components/characters/CharacterArt.vue'
import { gsap, prefersReducedMotion } from '@/animations/gsap'

/** First-visit loader: Bujji bounces while fonts and the page load. */
const emit = defineEmits(['done'])
const root = ref(null)
const progress = ref(0)

onMounted(async () => {
  const reduced = prefersReducedMotion()
  const counter = { v: 0 }
  const fill = gsap.to(counter, {
    v: 90,
    duration: reduced ? 0.2 : 1.4,
    ease: 'power2.out',
    onUpdate: () => (progress.value = Math.round(counter.v)),
  })

  const pageReady = document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => window.addEventListener('load', r, { once: true }))
  const fontsReady = document.fonts?.ready ?? Promise.resolve()
  const minTime = new Promise((r) => setTimeout(r, reduced ? 150 : 1300))
  const maxTime = new Promise((r) => setTimeout(r, 4000)) // never block longer than this
  await Promise.race([Promise.all([pageReady, fontsReady, minTime]), maxTime])

  fill.kill()
  await gsap.to(counter, { v: 100, duration: 0.3, onUpdate: () => (progress.value = Math.round(counter.v)) })

  if (reduced) {
    emit('done')
    return
  }
  gsap
    .timeline({ onComplete: () => emit('done') })
    .to(root.value.querySelector('[data-loader-content]'), { y: -30, opacity: 0, duration: 0.4, ease: 'power2.in' })
    .to(root.value, { clipPath: 'circle(0% at 50% 50%)', duration: 0.8, ease: 'power3.inOut' }, '-=0.1')
})
</script>

<template>
  <div
    ref="root"
    class="fixed inset-0 z-[100] grid place-items-center bg-gradient-to-b from-jungle-800 to-jungle-950 text-white"
    style="clip-path: circle(150% at 50% 50%)"
    role="status"
    aria-live="polite"
    aria-label="Loading Bujji Storyland"
  >
    <div data-loader-content class="flex flex-col items-center gap-6">
      <div class="relative h-44 w-40">
        <div class="loader-bounce h-full w-full">
          <CharacterArt id="bujji" walking eager />
        </div>
      </div>
      <p class="font-display text-3xl font-extrabold">Bujji <span class="text-sun">Story</span>land</p>
      <div class="h-3 w-56 overflow-hidden rounded-full bg-white/15">
        <div class="h-full rounded-full bg-gradient-to-r from-lime to-sun transition-[width] duration-150" :style="{ width: progress + '%' }" />
      </div>
      <p class="font-display text-sm text-white/60">కథ మొదలవుతోంది… {{ progress }}%</p>
    </div>
  </div>
</template>

<style scoped>
.loader-bounce {
  animation: hop 0.9s cubic-bezier(0.3, 0, 0.3, 1) infinite;
  transform-origin: 50% 100%;
}
@keyframes hop {
  0%, 100% { transform: translateY(0) scale(1, 1); }
  15% { transform: translateY(0) scale(1.08, 0.92); }
  50% { transform: translateY(-26px) scale(0.96, 1.04); }
  85% { transform: translateY(0) scale(1.06, 0.94); }
}
</style>
