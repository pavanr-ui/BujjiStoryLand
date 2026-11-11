<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import JungleBackdrop from '@/components/scenery/JungleBackdrop.vue'
import FloatingParticles from '@/components/scenery/FloatingParticles.vue'
import CharacterArt from '@/components/characters/CharacterArt.vue'
import SplitText from '@/components/ui/SplitText.vue'
import { useMouseParallax } from '@/composables/useMouseParallax'
import { gsap, prefersReducedMotion } from '@/animations/gsap'

/** Compact cinematic banner used at the top of inner pages. */
defineProps({
  eyebrow: { type: String, default: '' },
  telugu: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  character: { type: String, default: 'bujji' },
  time: { type: String, default: 'sunset' },
})

const root = ref(null)
let ctx
useMouseParallax(root, { strength: 30 })

onMounted(() => {
  if (prefersReducedMotion()) return
  ctx = gsap.context(() => {
    gsap
      .timeline({ delay: 0.15 })
      .fromTo('.split-word', { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.9, ease: 'back.out(1.6)' })
      .from('[data-ph-in]', { y: 24, opacity: 0, stagger: 0.1, duration: 0.8 }, 0.3)
      .from('[data-ph-char]', { x: 120, opacity: 0, rotate: 8, duration: 1.2, ease: 'back.out(1.4)' }, 0.2)
    gsap.to('[data-ph-content]', {
      yPercent: -25,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="relative isolate flex min-h-[72svh] items-end overflow-hidden grain">
    <JungleBackdrop :time="time" />
    <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,36,26,0.6)_0%,rgba(7,36,26,0.1)_55%,rgba(7,36,26,0)_80%)]" />
    <FloatingParticles :count="30" />

    <div class="container-wide relative z-10 grid items-end gap-6 pb-20 pt-36 md:grid-cols-[1.4fr_1fr]">
      <div data-ph-content class="flex flex-col items-start gap-4">
        <span v-if="eyebrow" data-ph-in class="eyebrow glass text-white">{{ eyebrow }}</span>
        <p v-if="telugu" data-ph-in class="font-display text-xl font-bold text-sun drop-shadow">{{ telugu }}</p>
        <SplitText tag="h1" :text="title" class="text-5xl font-extrabold text-white drop-shadow-[0_6px_24px_rgba(7,36,26,0.5)] sm:text-6xl lg:text-7xl" />
        <p v-if="subtitle" data-ph-in class="max-w-xl text-lg text-white/85 drop-shadow">{{ subtitle }}</p>
      </div>
      <div class="hidden justify-end md:flex" data-depth="0.5">
        <div data-ph-char class="w-64 lg:w-72">
          <CharacterArt :id="character" waving eager />
        </div>
      </div>
    </div>

    <svg class="absolute inset-x-0 -bottom-px z-10 w-full text-cream" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 60 L0 30 C240 0 480 50 720 30 C960 10 1200 50 1440 20 L1440 60 Z" fill="currentColor" />
    </svg>
  </section>
</template>
