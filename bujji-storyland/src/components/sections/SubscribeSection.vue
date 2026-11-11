<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Youtube, Instagram, Bell, ArrowUpRight } from 'lucide-vue-next'
import CharacterArt from '@/components/characters/CharacterArt.vue'
import SplitText from '@/components/ui/SplitText.vue'
import { site } from '@/data/site'
import { gsap, prefersReducedMotion, revealWords, revealOnScroll } from '@/animations/gsap'

const root = ref(null)
const title = ref(null)
const cast = ['chinni', 'bujji', 'baby-bird', 'mother-bird']
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    revealWords(title.value?.$el)
    revealOnScroll(root.value)
    if (prefersReducedMotion()) return
    gsap.from('[data-wave-char]', {
      y: 160,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'back.out(1.8)',
      scrollTrigger: { trigger: '[data-wave-row]', start: 'top 92%', once: true },
    })
    gsap.fromTo('[data-big-sub]', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.55)', scrollTrigger: { trigger: '[data-big-sub]', start: 'top 90%', once: true } })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())

const confetti = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 47) % 100,
  top: (i * 29) % 90,
  color: ['#e9483b', '#4a8fe7', '#3fae49', '#ffffff', '#b8743f'][i % 5],
  size: 6 + (i % 4) * 3,
  round: i % 3 === 0,
  delay: -(i % 6),
}))
</script>

<template>
  <section id="subscribe" ref="root" data-reveal-root class="relative isolate overflow-hidden bg-[linear-gradient(160deg,#ffe27a_0%,#ffc93c_45%,#ff9f1c_100%)] pt-24 sm:pt-32" aria-labelledby="subscribe-title">
    <!-- confetti -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <span
        v-for="(c, i) in confetti"
        :key="i"
        class="absolute animate-float opacity-70"
        :class="c.round ? 'rounded-full' : 'rounded-sm rotate-45'"
        :style="{ left: c.left + '%', top: c.top + '%', width: c.size + 'px', height: c.size + 'px', background: c.color, animationDelay: c.delay + 's' }"
      />
    </div>
    <div class="pointer-events-none absolute left-1/2 top-0 h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full bg-white/40 blur-3xl" />

    <div class="container-wide relative flex flex-col items-center text-center">
      <span data-reveal class="eyebrow bg-jungle-900 text-sun"><Bell :size="14" /> Never miss a story</span>
      <p data-reveal class="mt-5 font-display text-xl font-bold text-backpack">మా చానెల్‌ను సబ్‌స్క్రైబ్ చేయండి!</p>
      <SplitText
        id="subscribe-title"
        ref="title"
        tag="h2"
        text="Join the Bujji|Storyland family"
        class="mt-2 text-5xl font-extrabold text-jungle-900 sm:text-6xl lg:text-7xl"
      />
      <p data-reveal class="mt-5 max-w-xl text-lg text-jungle-900/75">
        Subscribe for new Telugu stories and Shorts every week. Tap the bell so your little one never misses Bujji’s next adventure!
      </p>

      <!-- giant subscribe button -->
      <a
        data-big-sub
        :href="site.youtubeSubscribeUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative mt-10 inline-flex items-center gap-4 rounded-full bg-gradient-to-b from-[#ff4d4d] to-[#d81f26] px-10 py-6 font-display text-3xl font-extrabold text-white shadow-[0_14px_0_#9c141a,0_30px_60px_-12px_rgba(156,20,26,0.65)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_0_#9c141a,0_36px_70px_-12px_rgba(156,20,26,0.7)] active:translate-y-2 active:shadow-[0_6px_0_#9c141a] sm:px-14 sm:py-7 sm:text-4xl"
      >
        <span class="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-[#ff4d4d]/60" aria-hidden="true" />
        <span class="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-[#ff4d4d]/40 [animation-delay:1.1s]" aria-hidden="true" />
        <span class="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/40 blur-sm transition-all duration-700 group-hover:left-[115%]" aria-hidden="true" />
        <Youtube :size="44" class="transition-transform duration-500 group-hover:rotate-[-10deg] group-hover:scale-110" />
        <span class="pt-1">Subscribe</span>
      </a>

      <div data-reveal class="mt-10 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        <a
          :href="site.youtubeUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-4 rounded-3xl bg-white/85 p-4 text-left shadow-lg backdrop-blur transition hover:-translate-y-1 hover:bg-white"
        >
          <span class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#ff0033] text-white"><Youtube :size="28" /></span>
          <span class="flex-1">
            <span class="block font-display text-xl font-extrabold text-jungle-900">YouTube</span>
            <span class="block text-sm text-ink/60">Stories &amp; Shorts</span>
          </span>
          <ArrowUpRight class="text-jungle-900 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
        <a
          :href="site.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-4 rounded-3xl bg-white/85 p-4 text-left shadow-lg backdrop-blur transition hover:-translate-y-1 hover:bg-white"
        >
          <span class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white"><Instagram :size="28" /></span>
          <span class="flex-1">
            <span class="block font-display text-xl font-extrabold text-jungle-900">Instagram</span>
            <span class="block text-sm text-ink/60">Reels &amp; behind the scenes</span>
          </span>
          <ArrowUpRight class="text-jungle-900 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <!-- waving characters -->
      <div data-wave-row class="mt-16 flex w-full max-w-4xl items-end justify-center gap-2 sm:gap-6" aria-hidden="true">
        <div
          v-for="id in cast"
          :key="id"
          data-wave-char
          :class="{
            'w-[28%] sm:w-52': id === 'bujji',
            'w-[20%] sm:w-36': id === 'chinni' || id === 'mother-bird',
            'w-[12%] sm:w-20': id === 'baby-bird',
          }"
        >
          <CharacterArt :id="id" waving />
        </div>
      </div>
    </div>
    <div class="h-16" />
  </section>
</template>
