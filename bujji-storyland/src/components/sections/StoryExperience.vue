<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-vue-next'
import JungleBackdrop from '@/components/scenery/JungleBackdrop.vue'
import FloatingParticles from '@/components/scenery/FloatingParticles.vue'
import CharacterArt from '@/components/characters/CharacterArt.vue'
import { storyScenes } from '@/data/story'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'
import { getLenis } from '@/composables/useSmoothScroll'

/**
 * Scroll-driven story: the stage pins while the visitor scrolls through
 * six chapters of Episode 1. Characters enter, move and react per scene.
 * With reduced motion the stage does not pin; chapters are stepped with buttons.
 */
const root = ref(null)
const stage = ref(null)
const active = ref(0)
const bujjiWalking = ref(false)
const reduced = ref(false)
let st = null
let ctx
let walkTimer

const scene = computed(() => storyScenes[active.value])

// Where each character stands in every scene: [left %, bottom %, scale] or null (hidden).
const blocking = {
  bujji: [[14, 8, 1], [30, 8, 1], [26, 8, 1], [20, 8, 1], [22, 8, 1], [30, 8, 1.02]],
  'baby-bird': [null, null, [60, 9, 1], [58, 9, 1], [70, 40, 1], [52, 9, 1]],
  chinni: [null, null, null, [42, 8, 1], [44, 8, 1], [42, 8, 1]],
  'mother-bird': [null, null, null, null, [74, 46, 1], [64, 8, 1]],
}
const sizes = { bujji: 'w-[34vmin] max-w-[19rem]', chinni: 'w-[22vmin] max-w-[12rem]', 'baby-bird': 'w-[11vmin] max-w-[6rem]', 'mother-bird': 'w-[22vmin] max-w-[12rem]' }
const cast = Object.keys(blocking)

function styleFor(id) {
  const pos = blocking[id][active.value]
  if (!pos) {
    const last = blocking[id].find(Boolean) || [50, 8, 1]
    return { left: `${last[0] + (id === 'mother-bird' ? 20 : 12)}%`, bottom: `${last[1]}%`, opacity: 0, transform: 'translate(-50%, 30px) scale(0.6)' }
  }
  const [l, b, s] = pos
  return { left: `${l}%`, bottom: `${b}%`, opacity: 1, transform: `translate(-50%, 0) scale(${s})` }
}

watch(active, () => {
  bujjiWalking.value = true
  clearTimeout(walkTimer)
  walkTimer = setTimeout(() => (bujjiWalking.value = false), 1100)
})

function goTo(i) {
  const idx = Math.max(0, Math.min(storyScenes.length - 1, i))
  if (!st) {
    active.value = idx
    return
  }
  const y = st.start + ((idx + 0.5) / storyScenes.length) * (st.end - st.start)
  const lenis = getLenis()
  lenis ? lenis.scrollTo(y, { duration: 1.2 }) : window.scrollTo({ top: y, behavior: 'smooth' })
}

onMounted(() => {
  reduced.value = prefersReducedMotion()
  if (reduced.value) return

  ctx = gsap.context(() => {
    const n = storyScenes.length
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage.value,
        start: 'top top',
        end: () => `+=${n * 90}%`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const i = Math.min(n - 1, Math.floor(self.progress * n))
          if (i !== active.value) active.value = i
        },
      },
    })
    st = tl.scrollTrigger
    // camera drifts deeper into the jungle
    tl.to('[data-pan="far"]', { xPercent: -4, ease: 'none' }, 0)
      .to('[data-pan="mid"]', { xPercent: -9, scale: 1.06, ease: 'none' }, 0)
      .to('[data-pan="near"]', { xPercent: -16, ease: 'none' }, 0)
      .fromTo('[data-progress-fill]', { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
  }, root.value)
})

onBeforeUnmount(() => {
  clearTimeout(walkTimer)
  ctx?.revert()
  st = null
})
</script>

<template>
  <section id="story" ref="root" class="relative" aria-labelledby="story-title">
    <div
      ref="stage"
      class="relative h-[100svh] min-h-[560px] w-full overflow-hidden"
      :style="{ background: `linear-gradient(180deg, ${scene.sky[0]} 0%, ${scene.sky[1]} 70%)`, transition: 'background 1s ease' }"
    >
      <!-- parallax layers -->
      <div data-pan="far" class="absolute inset-y-0 left-0 w-[112%]">
        <JungleBackdrop :show-sky="false" :show-front-leaves="false" :show-sun="active < 3" />
      </div>

      <!-- golden-hour wash grows as the story progresses -->
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,180,90,0.55),transparent_60%)] transition-opacity duration-1000"
        :style="{ opacity: active / (storyScenes.length - 1) }"
      />

      <!-- the big tree -->
      <div data-pan="mid" class="absolute bottom-0 right-[-4%] h-[92%] w-[46vmin] min-w-56 origin-bottom">
        <svg viewBox="0 0 300 600" class="h-full w-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          <path d="M130 600 C136 470 120 380 138 280 L170 280 C182 380 168 470 182 600 Z" fill="#7a4b2a" />
          <path d="M146 360 C110 330 80 320 46 326" stroke="#7a4b2a" stroke-width="14" fill="none" stroke-linecap="round" />
          <path d="M160 300 C200 270 236 266 268 270" stroke="#7a4b2a" stroke-width="12" fill="none" stroke-linecap="round" />
          <g fill="#2f8a45">
            <circle cx="150" cy="190" r="120" />
            <circle cx="70" cy="240" r="80" />
            <circle cx="236" cy="230" r="76" />
          </g>
          <g fill="#45a853">
            <circle cx="120" cy="150" r="70" />
            <circle cx="200" cy="160" r="60" />
          </g>
          <!-- nest -->
          <ellipse cx="238" cy="268" rx="34" ry="14" fill="#a8743f" />
          <path d="M206 266 q32 22 64 0" stroke="#7a4b2a" stroke-width="4" fill="none" />
        </svg>
      </div>

      <FloatingParticles :count="30" />

      <!-- characters (lifted on phones so the caption card never covers them) -->
      <div class="absolute inset-x-0 top-0 bottom-[26%] sm:bottom-0">
        <div
          v-for="id in cast"
          :key="id"
          class="absolute transition-all duration-[1100ms] ease-[cubic-bezier(.34,1.3,.64,1)]"
          :class="sizes[id]"
          :style="styleFor(id)"
        >
          <CharacterArt
            :id="id"
            :walking="id === 'bujji' && bujjiWalking"
            :waving="active === storyScenes.length - 1"
            :sad="id === 'baby-bird' && (active === 2 || active === 3)"
          />
        </div>

        <!-- scene 2: tiny cry bubbles -->
        <Transition name="fade">
          <div v-if="active === 1" class="absolute right-[18%] top-[38%] flex flex-col items-end gap-2">
            <span class="glass-light animate-float rounded-2xl rounded-br-none px-4 py-2 font-display text-xl font-bold text-jungle-900">చీప్… చీప్…</span>
            <span class="glass-light animate-float rounded-full px-3 py-1 text-sm font-bold text-jungle-700 [animation-delay:-2s]">?</span>
          </div>
        </Transition>

        <!-- final scene: hearts -->
        <Transition name="fade">
          <div v-if="active === storyScenes.length - 1" class="pointer-events-none absolute inset-0">
            <Heart
              v-for="i in 9"
              :key="i"
              :size="18 + (i % 3) * 10"
              class="absolute animate-float fill-backpack text-backpack opacity-80"
              :style="{ left: 18 + i * 8 + '%', top: 22 + ((i * 17) % 30) + '%', animationDelay: -i * 0.6 + 's' }"
            />
          </div>
        </Transition>
      </div>

      <!-- foreground leaves -->
      <div data-pan="near" class="pointer-events-none absolute inset-y-0 left-0 w-[118%]">
        <svg class="absolute -bottom-6 left-[-2%] w-[30vmax] max-w-xl" viewBox="0 0 300 200" aria-hidden="true">
          <path d="M0 200 C40 120 120 90 210 110 C150 130 100 160 70 200 Z" fill="#1a6e34" />
          <path d="M20 200 C80 150 170 150 260 170 C190 172 140 186 110 200 Z" fill="#2d9448" />
        </svg>
        <svg class="absolute -bottom-6 left-[58%] w-[26vmax] max-w-lg" viewBox="0 0 300 200" aria-hidden="true">
          <path d="M300 200 C260 120 180 90 90 110 C150 130 200 160 230 200 Z" fill="#1f7a3a" />
        </svg>
      </div>

      <!-- moral banner -->
      <Transition name="fade">
        <div v-if="active === storyScenes.length - 1" class="absolute inset-x-0 top-[16%] z-20 flex justify-center px-5">
          <div class="rounded-[2rem] bg-white/90 px-8 py-5 text-center shadow-2xl backdrop-blur">
            <p class="font-display text-lg font-bold text-backpack">{{ scene.telugu }}</p>
            <p class="font-display text-3xl font-extrabold text-jungle-900 sm:text-5xl">Helping others makes us happy!</p>
          </div>
        </div>
      </Transition>

      <!-- timeline -->
      <div class="absolute inset-x-0 top-24 z-20 sm:top-28">
        <div class="container-wide">
          <div class="glass mx-auto flex max-w-3xl items-center gap-3 rounded-full px-4 py-2.5">
            <h2 id="story-title" class="hidden shrink-0 font-display text-base font-extrabold text-white drop-shadow md:block">Episode 1 Story</h2>
            <div class="relative flex flex-1 items-center justify-between">
              <div class="absolute inset-x-3 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/30" />
              <div
                data-progress-fill
                class="absolute inset-x-3 top-1/2 h-1 -translate-y-1/2 origin-left rounded-full bg-sun"
                :style="reduced ? { transform: `scaleX(${active / (storyScenes.length - 1)})` } : {}"
              />
              <button
                v-for="(s, i) in storyScenes"
                :key="s.id"
                type="button"
                class="relative z-10 grid h-8 w-8 place-items-center rounded-full text-xs font-extrabold transition-all duration-500"
                :class="i <= active ? 'scale-110 bg-sun text-jungle-900 shadow-[0_0_0_5px_rgba(255,201,60,0.3)]' : 'bg-white/80 text-jungle-700'"
                :aria-label="`Chapter ${s.chapter}: ${s.title}`"
                :aria-current="i === active ? 'step' : undefined"
                @click="goTo(i)"
              >
                {{ s.chapter }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- caption -->
      <div class="absolute inset-x-0 bottom-6 z-20 sm:bottom-10">
        <div class="container-wide flex items-end justify-between gap-4">
          <Transition name="page" mode="out-in">
            <div :key="scene.id" class="glass-light max-w-md rounded-[1.75rem] p-5 shadow-xl sm:p-6" aria-live="polite">
              <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-backpack">Chapter {{ scene.chapter }}</p>
              <h3 class="mt-1 text-2xl font-extrabold text-jungle-900 sm:text-3xl">{{ scene.title }}</h3>
              <p class="mt-2 font-display text-lg font-semibold text-jungle-700">{{ scene.telugu }}</p>
              <p class="mt-1 text-sm text-ink/70 sm:text-base">{{ scene.text }}</p>
            </div>
          </Transition>
          <div class="hidden gap-2 sm:flex">
            <button type="button" class="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-jungle-900 shadow-lg transition hover:bg-sun disabled:opacity-40" :disabled="active === 0" aria-label="Previous chapter" @click="goTo(active - 1)">
              <ChevronLeft :size="22" />
            </button>
            <button type="button" class="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-jungle-900 shadow-lg transition hover:bg-sun disabled:opacity-40" :disabled="active === storyScenes.length - 1" aria-label="Next chapter" @click="goTo(active + 1)">
              <ChevronRight :size="22" />
            </button>
          </div>
        </div>
        <!-- mobile chapter buttons (reduced motion users step through here too) -->
        <div v-if="reduced" class="container-wide mt-3 flex gap-2 sm:hidden">
          <button type="button" class="flex-1 rounded-full bg-white/90 py-2 font-bold text-jungle-900 disabled:opacity-40" :disabled="active === 0" @click="goTo(active - 1)">Back</button>
          <button type="button" class="flex-1 rounded-full bg-sun py-2 font-bold text-jungle-900 disabled:opacity-40" :disabled="active === storyScenes.length - 1" @click="goTo(active + 1)">Next</button>
        </div>
      </div>
    </div>
  </section>
</template>
