<script setup>
import { ref, computed, defineAsyncComponent, onMounted, onBeforeUnmount } from 'vue'
import { MousePointer2 } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import FloatingParticles from '@/components/scenery/FloatingParticles.vue'
import ButterflySwarm from '@/components/scenery/ButterflySwarm.vue'
import CharacterArt from '@/components/characters/CharacterArt.vue'
import { useIsMobile } from '@/composables/useIsMobile'
import { useReducedMotion } from '@/composables/useReducedMotion'
import { useMouseParallax } from '@/composables/useMouseParallax'
import { gsap, prefersReducedMotion } from '@/animations/gsap'

// Three.js is only downloaded on desktop, and only when this section nears the viewport.
const JungleScene3D = defineAsyncComponent(() => import('@/components/scenery/JungleScene3D.vue'))

const root = ref(null)
const nearView = ref(false)
const isMobile = useIsMobile()
const reduced = useReducedMotion()
const use3D = computed(() => nearView.value && !isMobile.value && !reduced.value)
let io
let ctx

useMouseParallax(root, { strength: 60 })

const floaters = [
  { type: 'leaf', color: '#5cc45a', left: 8, top: 22, size: 70, depth: 0.8, rot: -30 },
  { type: 'flower', color: '#ff6b9a', left: 18, top: 70, size: 46, depth: 1.2, rot: 0 },
  { type: 'leaf', color: '#b8e35a', left: 84, top: 18, size: 64, depth: 0.6, rot: 40 },
  { type: 'flower', color: '#ffc93c', left: 90, top: 64, size: 52, depth: 1, rot: 0 },
  { type: 'leaf', color: '#3fae49', left: 72, top: 80, size: 80, depth: 1.4, rot: 120 },
  { type: 'flower', color: '#c49bff', left: 4, top: 50, size: 38, depth: 0.5, rot: 0 },
]

onMounted(() => {
  io = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        nearView.value = true
        io.disconnect()
      }
    },
    { rootMargin: '400px' },
  )
  io.observe(root.value)

  if (prefersReducedMotion()) return
  ctx = gsap.context(() => {
    gsap.fromTo(
      '[data-jungle-rays]',
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top 80%', end: 'center center', scrub: true } },
    )
    gsap.from('[data-jungle-bujji]', {
      y: 140,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.6)',
      scrollTrigger: { trigger: root.value, start: 'top 55%', once: true },
    })
  }, root.value)
})

onBeforeUnmount(() => {
  io?.disconnect()
  ctx?.revert()
})
</script>

<template>
  <section ref="root" class="relative isolate min-h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_at_50%_20%,#1d6a4b_0%,#0e3b2c_45%,#07241a_100%)] py-24 text-white sm:py-32" aria-labelledby="jungle-title">
    <!-- animated sun rays + glow (all devices) -->
    <div data-jungle-rays class="pointer-events-none absolute left-1/2 top-[-30%] h-[130vmin] w-[130vmin] -translate-x-1/2">
      <div class="absolute inset-0 animate-spin-slow rounded-full bg-[repeating-conic-gradient(from_0deg,rgba(255,226,122,0.16)_0deg_8deg,transparent_8deg_22deg)] [mask-image:radial-gradient(circle,black_10%,transparent_65%)]" />
      <div class="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgba(255,236,160,0.55),rgba(255,201,60,0.15)_45%,transparent_70%)] blur-xl" />
    </div>

    <!-- 3D scene on desktop -->
    <JungleScene3D v-if="use3D" />

    <FloatingParticles :count="60" :colors="['#fff3b0', '#d9ff9e', '#ffe27a']" />
    <ButterflySwarm :count="isMobile ? 3 : 6" />

    <!-- floating leaves & flowers (mouse parallax on desktop) -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        v-for="(f, i) in floaters"
        :key="i"
        class="absolute"
        :style="{ left: f.left + '%', top: f.top + '%', width: f.size + 'px' }"
        :data-depth="f.depth"
      >
        <svg v-if="f.type === 'leaf'" viewBox="-5 -45 130 90" class="w-full animate-float drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]" :style="{ rotate: f.rot + 'deg', animationDelay: -i + 's' }">
          <path d="M0 0 C26 -34 84 -38 120 0 C84 38 26 34 0 0 Z" :fill="f.color" />
          <path d="M4 0 L116 0" stroke="#ffffff" stroke-width="2" opacity="0.4" />
        </svg>
        <svg v-else viewBox="-30 -30 60 60" class="w-full animate-float-slow drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]" :style="{ animationDelay: -i * 1.5 + 's' }">
          <circle v-for="p in 5" :key="p" :cx="Math.cos((p * 72 * Math.PI) / 180) * 12" :cy="Math.sin((p * 72 * Math.PI) / 180) * 12" r="11" :fill="f.color" />
          <circle r="8" fill="#fff3a6" />
        </svg>
      </div>
    </div>

    <div class="container-wide relative z-10 flex min-h-[70svh] flex-col items-center justify-between gap-10">
      <SectionHeading
        id="jungle-title"
        dark
        eyebrow="The Magical Jungle"
        telugu="మాయా అడవిలోకి స్వాగతం"
        title="Where every leaf|holds a story"
        subtitle="Sunbeams, fireflies and friendly faces — this is Bujji’s home. Move your mouse to look around."
      />

      <div class="flex flex-col items-center gap-4">
        <div class="w-44 sm:w-56" data-depth="0.4">
          <div data-jungle-bujji>
            <CharacterArt id="bujji" waving />
          </div>
        </div>
        <p v-if="!isMobile" class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/80 ring-1 ring-white/15">
          <MousePointer2 :size="16" /> Move your mouse to explore in 3D
        </p>
      </div>
    </div>
  </section>
</template>
