<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Play, BookOpen, ChevronDown } from 'lucide-vue-next'
import JungleBackdrop from '@/components/scenery/JungleBackdrop.vue'
import FloatingParticles from '@/components/scenery/FloatingParticles.vue'
import ButterflySwarm from '@/components/scenery/ButterflySwarm.vue'
import CharacterArt from '@/components/characters/CharacterArt.vue'
import MagicButton from '@/components/ui/MagicButton.vue'
import SplitText from '@/components/ui/SplitText.vue'
import { useMouseParallax } from '@/composables/useMouseParallax'
import { useModals } from '@/composables/useModals'
import { episodes } from '@/data/episodes'
import { gsap, prefersReducedMotion } from '@/animations/gsap'

const props = defineProps({
  ready: { type: Boolean, default: true },
})

const root = ref(null)
const walking = ref(false)
const waving = ref(false)
const { openVideo } = useModals()
let ctx
let started = false

useMouseParallax(root, { strength: 46 })

function playEntrance() {
  if (started) return
  started = true
  const q = gsap.utils.selector(root.value)

  if (prefersReducedMotion()) {
    gsap.set(q('[data-hero-in], .split-word, [data-bujji]'), { opacity: 1, x: 0, y: 0, yPercent: 0 })
    waving.value = true
    return
  }

  ctx.add(() => {
    walking.value = true
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(q('[data-layer]'), { yPercent: 12, opacity: 0, duration: 1.4, stagger: 0.08 })
      .fromTo(
        q('[data-bujji]'),
        { x: () => -window.innerWidth * 0.7, opacity: 1 },
        {
          x: 0,
          duration: 2.6,
          ease: 'power1.out',
          onComplete: () => {
            walking.value = false
            waving.value = true
            setTimeout(() => (waving.value = false), 2600)
          },
        },
        0.3,
      )
      .fromTo(q('.split-word'), { yPercent: 120, opacity: 0, rotate: 6 }, { yPercent: 0, opacity: 1, rotate: 0, stagger: 0.07, duration: 1, ease: 'back.out(1.7)' }, 0.6)
      .from(q('[data-hero-in]'), { y: 30, opacity: 0, stagger: 0.12, duration: 0.9 }, 1.1)
  })
}

onMounted(() => {
  ctx = gsap.context(() => {}, root.value)
  if (prefersReducedMotion()) return

  const q = gsap.utils.selector(root.value)
  ctx.add(() => {
    // Cinematic exit as you scroll into the next section.
    const exit = gsap.timeline({
      scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
    })
    exit
      .to(q('[data-hero-content]'), { yPercent: -35, opacity: 0, scale: 0.92, filter: 'blur(6px)', ease: 'none' }, 0)
      .to(q('[data-bujji-wrap]'), { yPercent: -20, scale: 1.12, ease: 'none' }, 0)
    q('[data-speed]').forEach((el) => {
      exit.to(el, { yPercent: -Number(el.dataset.speed) * 40, ease: 'none' }, 0)
    })
  })
})

watch(
  () => props.ready,
  (r) => r && requestAnimationFrame(playEntrance),
  { immediate: true },
)

onBeforeUnmount(() => ctx?.revert())

const firstEpisode = episodes[0]
</script>

<template>
  <section ref="root" class="relative isolate flex min-h-[100svh] items-center overflow-hidden grain" aria-label="Welcome">
    <div data-layer class="absolute inset-0"><JungleBackdrop /></div>
    <!-- readability veil -->
    <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,36,26,0.55)_0%,rgba(7,36,26,0.15)_45%,rgba(7,36,26,0)_70%)]" />
    <FloatingParticles :count="54" />
    <ButterflySwarm :count="5" />

    <div class="container-wide relative z-10 grid items-center gap-6 pb-24 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
      <!-- copy -->
      <div data-hero-content class="flex flex-col items-center text-center lg:items-start lg:text-left">
        <span data-hero-in class="eyebrow glass mb-5 text-white">
          <span class="h-2 w-2 animate-twinkle rounded-full bg-sun" /> తెలుగు కథల మాయా ప్రపంచం
        </span>

        <h1 class="text-[clamp(2.9rem,8vw,6.4rem)] font-extrabold text-white drop-shadow-[0_6px_24px_rgba(7,36,26,0.45)]">
          <SplitText text="Welcome to|Bujji Storyland" :highlight-line="1" highlight-class="text-gradient-sun" />
        </h1>

        <p data-hero-in class="mt-5 font-display text-2xl font-bold text-sun drop-shadow sm:text-3xl">Little Stories, Big Smiles!</p>
        <p data-hero-in class="mt-3 max-w-lg text-lg text-white/85 drop-shadow">
          Join Bujji the little blue elephant and his jungle friends in cheerful Telugu stories about kindness, friendship and adventure.
        </p>

        <div data-hero-in class="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
          <MagicButton size="lg" @click="openVideo(firstEpisode)">
            <Play :size="22" class="fill-current" /> Watch Episodes
          </MagicButton>
          <MagicButton size="lg" variant="secondary" :to="{ path: '/', hash: '#story' }">
            <BookOpen :size="22" /> Explore Stories
          </MagicButton>
        </div>
      </div>

      <!-- Bujji -->
      <div data-bujji-wrap class="relative mx-auto w-[min(78vw,26rem)] lg:w-[min(36vw,30rem)]" data-depth="0.6">
        <div class="absolute inset-x-[10%] bottom-[2%] h-[16%] rounded-full bg-jungle-950/25 blur-xl" />
        <div data-bujji class="relative opacity-0">
          <CharacterArt id="bujji" :walking="walking" :waving="waving" eager />
        </div>
        <div data-hero-in class="glass absolute -right-2 top-[6%] rotate-6 rounded-2xl rounded-bl-none px-4 py-2 font-display text-lg font-bold text-white sm:right-0">
          నమస్తే! 👋
        </div>
      </div>
    </div>

    <!-- scroll cue -->
    <RouterLink
      :to="{ path: '/', hash: '#characters' }"
      data-hero-in
      class="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-sm font-bold text-white/90"
      aria-label="Scroll to meet the characters"
    >
      <span>Scroll to explore</span>
      <ChevronDown :size="26" class="animate-bounce" />
    </RouterLink>

    <!-- curved transition into next section -->
    <svg class="absolute inset-x-0 -bottom-px z-10 w-full text-cream" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 80 L0 40 C240 0 480 70 720 40 C960 10 1200 70 1440 30 L1440 80 Z" fill="currentColor" />
    </svg>
  </section>
</template>
