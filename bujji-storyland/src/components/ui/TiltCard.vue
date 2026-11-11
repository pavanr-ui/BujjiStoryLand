<script setup>
import { ref, onMounted } from 'vue'
import { gsap, prefersReducedMotion } from '@/animations/gsap'

/**
 * 3D tilt card with moving glare. Children can use [data-pop="N"]
 * to float N px towards the viewer (translateZ) for a layered 3D feel.
 */
const props = defineProps({
  max: { type: Number, default: 12 },
  glare: { type: Boolean, default: true },
})

const card = ref(null)
const glareEl = ref(null)
let enabled = false
let rx, ry

onMounted(() => {
  enabled = !prefersReducedMotion() && !window.matchMedia('(hover: none)').matches
  if (!enabled) return
  rx = gsap.quickTo(card.value, 'rotationX', { duration: 0.6, ease: 'power3.out' })
  ry = gsap.quickTo(card.value, 'rotationY', { duration: 0.6, ease: 'power3.out' })
  gsap.set(card.value, { transformPerspective: 900, transformStyle: 'preserve-3d' })
})

function onMove(e) {
  if (!enabled) return
  const r = card.value.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width
  const py = (e.clientY - r.top) / r.height
  ry((px - 0.5) * props.max * 2)
  rx(-(py - 0.5) * props.max * 2)
  if (glareEl.value) {
    glareEl.value.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.45), rgba(255,255,255,0) 55%)`
    glareEl.value.style.opacity = '1'
  }
}

function onLeave() {
  if (!enabled) return
  rx(0)
  ry(0)
  if (glareEl.value) glareEl.value.style.opacity = '0'
}
</script>

<template>
  <div class="[perspective:900px]">
    <div ref="card" class="relative h-full will-change-transform [transform-style:preserve-3d]" @pointermove="onMove" @pointerleave="onLeave">
      <slot />
      <div
        v-if="glare"
        ref="glareEl"
        class="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-overlay transition-opacity duration-300"
        style="border-radius: inherit"
        aria-hidden="true"
      />
    </div>
  </div>
</template>
