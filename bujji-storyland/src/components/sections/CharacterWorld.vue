<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TiltCard from '@/components/ui/TiltCard.vue'
import CharacterArt from '@/components/characters/CharacterArt.vue'
import { characters } from '@/data/characters'
import { useModals } from '@/composables/useModals'
import { gsap, prefersReducedMotion } from '@/animations/gsap'

defineProps({
  showDescriptions: { type: Boolean, default: false },
})

const { openCharacter } = useModals()
const root = ref(null)
const hovered = ref(null)
let ctx

onMounted(() => {
  if (prefersReducedMotion()) return
  ctx = gsap.context(() => {
    gsap.from('[data-char-card]', {
      y: 120,
      rotate: (i) => (i % 2 ? 6 : -6),
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'back.out(1.3)',
      clearProps: 'opacity',
      scrollTrigger: { trigger: '[data-char-grid]', start: 'top 82%', once: true },
    })
    gsap.from('[data-char-art]', {
      scale: 0.4,
      y: 60,
      duration: 1,
      stagger: 0.12,
      delay: 0.25,
      ease: 'elastic.out(1, 0.6)',
      clearProps: 'transform',
      scrollTrigger: { trigger: '[data-char-grid]', start: 'top 82%', once: true },
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="characters" ref="root" class="relative overflow-hidden py-24 sm:py-32" aria-labelledby="characters-title">
    <!-- soft background blobs -->
    <div class="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-lime/30 blur-3xl" />
    <div class="pointer-events-none absolute -right-40 bottom-10 h-[28rem] w-[28rem] rounded-full bg-bujji/20 blur-3xl" />

    <div class="container-wide relative">
      <SectionHeading
        id="characters-title"
        eyebrow="Character World"
        telugu="మా స్నేహితులను కలవండి"
        title="Meet the jungle friends"
        subtitle="Every story is a little adventure with friends who care. Hover to say hello — tap a card to learn more!"
      />

      <div data-char-grid class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <TiltCard v-for="c in characters" :key="c.id" data-char-card class="h-full">
          <button
            type="button"
            class="group relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br p-6 text-left text-white shadow-[0_30px_60px_-25px_rgba(14,59,44,0.55)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-25px_rgba(14,59,44,0.7)] [transform-style:preserve-3d]"
            :class="c.gradient"
            :aria-label="`Meet ${c.name}`"
            @click="openCharacter(c)"
            @pointerenter="hovered = c.id"
            @pointerleave="hovered = null"
            @focus="hovered = c.id"
            @blur="hovered = null"
          >
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.45),transparent_62%)]" />
            <span class="absolute -right-2 top-2 font-display text-6xl font-extrabold text-white/20" aria-hidden="true">{{ c.teluguName }}</span>

            <!-- character pops out in 3D -->
            <div
              class="relative mx-auto mb-4 mt-6 aspect-square w-[78%] transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] [transform:translateZ(60px)] group-hover:[transform:translateZ(90px)_translateY(-14px)_scale(1.08)]"
            >
              <div data-char-art class="relative h-full w-full">
                <div class="absolute inset-x-[15%] bottom-0 h-[12%] rounded-full bg-black/20 blur-md transition-all duration-500 group-hover:inset-x-[25%] group-hover:opacity-60" />
                <CharacterArt :id="c.id" :waving="hovered === c.id" />
              </div>
            </div>

            <div class="relative mt-auto [transform:translateZ(40px)]">
              <p class="text-xs font-extrabold uppercase tracking-[0.2em] text-white/80">{{ c.role }}</p>
              <h3 class="mt-1 text-4xl font-extrabold">{{ c.name }}</h3>
              <p class="font-display text-lg font-semibold text-white/85">{{ c.teluguName }}</p>
              <p v-if="showDescriptions" class="mt-3 text-sm leading-relaxed text-white/85">{{ c.description }}</p>
              <span class="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur transition group-hover:bg-white group-hover:text-jungle-900">
                Meet {{ c.name }} <ArrowUpRight :size="16" class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </button>
        </TiltCard>
      </div>
    </div>
  </section>
</template>
