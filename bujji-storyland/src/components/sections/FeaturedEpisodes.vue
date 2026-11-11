<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ChevronLeft, ChevronRight, Play, Clock, Sparkles, ArrowRight } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import MagicButton from '@/components/ui/MagicButton.vue'
import EpisodeThumb from '@/components/scenery/EpisodeThumb.vue'
import { episodes } from '@/data/episodes'
import { useModals } from '@/composables/useModals'
import { gsap, prefersReducedMotion } from '@/animations/gsap'

defineProps({
  showAllLink: { type: Boolean, default: true },
})

const { openVideo } = useModals()
const root = ref(null)
const track = ref(null)
const progress = ref(0)
const atStart = ref(true)
const atEnd = ref(false)
let ctx

const cardStep = () => {
  const card = track.value?.querySelector('[data-ep-card]')
  return card ? card.getBoundingClientRect().width + 24 : 320
}

function scrollByCards(dir) {
  track.value.scrollBy({ left: dir * cardStep(), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

function onTrackScroll() {
  const el = track.value
  const max = el.scrollWidth - el.clientWidth
  progress.value = max > 0 ? el.scrollLeft / max : 0
  atStart.value = el.scrollLeft < 8
  atEnd.value = el.scrollLeft > max - 8
}

// Drag-to-scroll with the mouse (touch already scrolls natively).
let dragging = false, startX = 0, startLeft = 0, moved = false
function onDown(e) {
  if (e.pointerType !== 'mouse') return
  dragging = true
  moved = false
  startX = e.clientX
  startLeft = track.value.scrollLeft
  track.value.style.scrollSnapType = 'none'
}
function onDrag(e) {
  if (!dragging) return
  const dx = e.clientX - startX
  if (Math.abs(dx) > 5) moved = true
  track.value.scrollLeft = startLeft - dx
}
function onUp() {
  if (!dragging) return
  dragging = false
  track.value.style.scrollSnapType = ''
}
function onCardClick(ep, e) {
  if (moved) {
    // This click ended a drag, so don't open the player.
    moved = false
    e?.preventDefault?.()
    return
  }
  openVideo(ep)
}

const count = computed(() => episodes.length)

onMounted(() => {
  onTrackScroll()
  if (prefersReducedMotion()) return
  ctx = gsap.context(() => {
    gsap.from('[data-ep-card]', {
      x: 160,
      opacity: 0,
      rotateY: -18,
      duration: 1.1,
      stagger: 0.1,
      ease: 'power4.out',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: track.value, start: 'top 85%', once: true },
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="episodes" ref="root" class="relative overflow-hidden bg-jungle-900 py-24 text-white sm:py-32" aria-labelledby="episodes-title">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,227,90,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(74,143,231,0.22),transparent_55%)]" />

    <div class="container-wide relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
      <SectionHeading
        id="episodes-title"
        align="left"
        dark
        eyebrow="Featured Episodes"
        telugu="కొత్త కథలు"
        title="Stories to watch|together"
        subtitle="Short, sweet and full of heart. New Bujji adventures arrive every week."
      />
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="grid h-14 w-14 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 transition hover:bg-sun hover:text-jungle-900 disabled:opacity-30 disabled:hover:bg-white/10 disabled:hover:text-white"
          :disabled="atStart"
          aria-label="Previous episodes"
          @click="scrollByCards(-1)"
        >
          <ChevronLeft :size="26" />
        </button>
        <button
          type="button"
          class="grid h-14 w-14 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 transition hover:bg-sun hover:text-jungle-900 disabled:opacity-30 disabled:hover:bg-white/10 disabled:hover:text-white"
          :disabled="atEnd"
          aria-label="Next episodes"
          @click="scrollByCards(1)"
        >
          <ChevronRight :size="26" />
        </button>
      </div>
    </div>

    <!-- carousel track -->
    <div
      ref="track"
      class="no-scrollbar relative mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-8 sm:scroll-px-8 sm:px-8 xl:px-[max(2rem,calc((100vw-80rem)/2+2rem))] cursor-grab active:cursor-grabbing [perspective:1200px]"
      role="region"
      aria-label="Episode carousel"
      tabindex="0"
      @scroll.passive="onTrackScroll"
      @pointerdown="onDown"
      @pointermove="onDrag"
      @pointerup="onUp"
      @pointerleave="onUp"
      @keydown.right.prevent="scrollByCards(1)"
      @keydown.left.prevent="scrollByCards(-1)"
    >
      <article
        v-for="ep in episodes"
        :key="ep.id"
        data-ep-card
        class="group relative w-[82vw] max-w-[26rem] shrink-0 snap-start sm:w-[24rem]"
      >
        <div
          class="overflow-hidden rounded-[2rem] bg-white/5 ring-1 ring-white/10 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:bg-white/10 group-hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] group-hover:ring-sun/60"
        >
          <!-- thumbnail -->
          <button type="button" class="relative block aspect-[4/3] w-full overflow-hidden" :aria-label="`Play ${ep.title}`" @click="onCardClick(ep, $event)">
            <div class="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110 group-hover:rotate-1">
              <EpisodeThumb :item="ep" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-jungle-950/70 via-transparent to-transparent" />
            <span class="absolute left-4 top-4 rounded-full bg-jungle-950/70 px-3 py-1 text-xs font-extrabold tracking-widest backdrop-blur">
              EP {{ String(ep.number).padStart(2, '0') }}
            </span>
            <span
              v-if="ep.status === 'new'"
              class="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-sun px-3 py-1 text-xs font-extrabold text-jungle-900"
            >
              <Sparkles :size="12" /> NEW
            </span>
            <span v-else class="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-extrabold text-jungle-900">Coming soon</span>
            <!-- play button -->
            <span class="absolute inset-0 grid place-items-center">
              <span class="relative grid h-16 w-16 scale-75 place-items-center rounded-full bg-white/95 text-backpack opacity-0 shadow-xl transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                <span class="absolute inset-0 animate-pulse-ring rounded-full bg-white/60" />
                <Play :size="26" class="relative ml-1 fill-current" />
              </span>
            </span>
          </button>

          <!-- meta -->
          <div class="flex flex-col gap-3 p-6">
            <p class="font-display text-base font-semibold text-sun">{{ ep.teluguTitle }}</p>
            <h3 class="text-2xl font-extrabold leading-tight">{{ ep.title }}</h3>
            <p class="line-clamp-2 text-sm text-white/65">{{ ep.summary }}</p>
            <div class="mt-2 flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 text-sm font-bold text-white/70">
                <Clock :size="15" /> {{ ep.duration }}
              </span>
              <MagicButton :magnetic="false" @click="onCardClick(ep, $event)">
                <Play :size="16" class="fill-current" /> Watch Now
              </MagicButton>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- progress + link -->
    <div class="container-wide relative mt-4 flex items-center gap-6">
      <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <div
          class="h-full rounded-full bg-gradient-to-r from-lime to-sun transition-[width] duration-200"
          :style="{ width: `${Math.max(1 / count, progress) * 100}%` }"
        />
      </div>
      <RouterLink v-if="showAllLink" to="/episodes" class="group inline-flex items-center gap-2 font-display text-lg font-bold text-sun">
        All episodes <ArrowRight :size="18" class="transition-transform group-hover:translate-x-1" />
      </RouterLink>
    </div>
  </section>
</template>
