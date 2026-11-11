<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap, prefersReducedMotion } from '@/animations/gsap'

/** A few butterflies that wander softly around their container. */
const props = defineProps({
  count: { type: Number, default: 5 },
})

const palette = [
  ['#ff6b9a', '#ffb3cb'],
  ['#ffc93c', '#fff0a0'],
  ['#8a7dff', '#c9c2ff'],
  ['#4ad5c8', '#b5f5ee'],
  ['#ff8a3d', '#ffd0a8'],
  ['#4a8fe7', '#bcd8ff'],
]

const items = Array.from({ length: props.count }, (_, i) => ({
  id: i,
  colors: palette[i % palette.length],
  left: 8 + Math.random() * 80,
  top: 10 + Math.random() * 55,
  size: 26 + Math.random() * 18,
}))

const root = ref(null)
let ctx

function wander(el) {
  const box = root.value.getBoundingClientRect()
  gsap.to(el, {
    x: gsap.utils.random(-box.width * 0.18, box.width * 0.18),
    y: gsap.utils.random(-box.height * 0.14, box.height * 0.14),
    rotation: gsap.utils.random(-25, 25),
    duration: gsap.utils.random(3.5, 6.5),
    ease: 'sine.inOut',
    onComplete: () => wander(el),
  })
}

onMounted(() => {
  if (prefersReducedMotion()) return
  ctx = gsap.context(() => {
    root.value.querySelectorAll('.butterfly').forEach((el) => wander(el))
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <div ref="root" class="pointer-events-none absolute inset-0" aria-hidden="true">
    <div
      v-for="b in items"
      :key="b.id"
      class="butterfly absolute"
      :style="{ left: b.left + '%', top: b.top + '%', width: b.size + 'px' }"
    >
      <svg viewBox="0 0 60 50" class="w-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
        <g class="bf-wing-l">
          <path d="M30 25 C14 0 0 6 4 20 C6 30 20 30 30 25 Z" :fill="b.colors[0]" />
          <path d="M30 27 C18 34 8 44 16 48 C24 50 28 38 30 27 Z" :fill="b.colors[1]" />
        </g>
        <g class="bf-wing-r">
          <path d="M30 25 C46 0 60 6 56 20 C54 30 40 30 30 25 Z" :fill="b.colors[0]" />
          <path d="M30 27 C42 34 52 44 44 48 C36 50 32 38 30 27 Z" :fill="b.colors[1]" />
        </g>
        <rect x="28.5" y="14" width="3" height="24" rx="1.5" fill="#3a2a1a" />
        <path d="M30 15 q-4 -8 -8 -10 M30 15 q4 -8 8 -10" stroke="#3a2a1a" stroke-width="1.2" fill="none" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.bf-wing-l,
.bf-wing-r {
  transform-box: fill-box;
  animation: flap 0.32s ease-in-out infinite alternate;
}
.bf-wing-l { transform-origin: 100% 50%; }
.bf-wing-r { transform-origin: 0% 50%; }
@keyframes flap {
  from { transform: scaleX(1); }
  to { transform: scaleX(0.25); }
}
</style>
