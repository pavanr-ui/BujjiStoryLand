<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Play, Clock, Film, Smartphone, Sparkles, ArrowRight } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import EpisodeThumb from '@/components/scenery/EpisodeThumb.vue'
import { videos, videoFilters } from '@/data/videos'
import { useModals } from '@/composables/useModals'
import { gsap, ScrollTrigger, prefersReducedMotion, revealOnScroll } from '@/animations/gsap'

const props = defineProps({
  limit: { type: Number, default: 0 }, // 0 = show all
  showAllLink: { type: Boolean, default: false },
})

const { openVideo } = useModals()
const root = ref(null)
const tabs = ref([])
const filter = ref('latest')
const pill = ref({ left: 0, width: 0 })
let ctx

const list = computed(() => {
  let items = [...videos]
  if (filter.value !== 'latest') items = items.filter((v) => v.category === filter.value)
  items.sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
  return props.limit ? items.slice(0, props.limit) : items
})

function movePill() {
  const i = videoFilters.findIndex((f) => f.id === filter.value)
  const el = tabs.value[i]
  if (el) pill.value = { left: el.offsetLeft, width: el.offsetWidth }
}

async function setFilter(id) {
  filter.value = id
  await nextTick()
  movePill()
  setTimeout(() => ScrollTrigger.refresh(), 650)
}

const icons = { latest: Sparkles, story: Film, short: Smartphone }

// TransitionGroup hooks for a staggered pop-in
function onBeforeEnter(el) {
  if (prefersReducedMotion()) return
  el.style.opacity = 0
  el.style.transform = 'translateY(30px) scale(0.94)'
}
function onEnter(el, done) {
  if (prefersReducedMotion()) return done()
  gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: Number(el.dataset.index) * 0.05, ease: 'back.out(1.5)', clearProps: 'transform', onComplete: done })
}
function onLeave(el, done) {
  if (prefersReducedMotion()) return done()
  gsap.to(el, { opacity: 0, scale: 0.9, duration: 0.25, onComplete: done })
}

onMounted(() => {
  movePill()
  window.addEventListener('resize', movePill, { passive: true })
  ctx = gsap.context(() => revealOnScroll(root.value), root.value)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', movePill)
  ctx?.revert()
})
</script>

<template>
  <section id="videos" ref="root" class="relative py-24 sm:py-32" aria-labelledby="videos-title">
    <div class="container-wide">
      <SectionHeading
        id="videos-title"
        eyebrow="Video Gallery"
        telugu="వీడియోలు చూడండి"
        title="Pick a story, press play"
        subtitle="Full stories for cosy watching and quick Shorts for a burst of giggles."
      />

      <!-- filter tabs -->
      <div data-reveal class="mt-10 flex justify-center">
        <div class="relative inline-flex rounded-full bg-jungle-900/5 p-1.5 ring-1 ring-jungle-900/10" role="tablist" aria-label="Filter videos">
          <span
            class="absolute top-1.5 bottom-1.5 rounded-full bg-jungle-900 shadow-lg transition-all duration-500 ease-[cubic-bezier(.34,1.4,.64,1)]"
            :style="{ left: pill.left + 'px', width: pill.width + 'px' }"
            aria-hidden="true"
          />
          <button
            v-for="(f, i) in videoFilters"
            :key="f.id"
            :ref="(el) => (tabs[i] = el)"
            type="button"
            role="tab"
            :aria-selected="filter === f.id"
            class="relative z-10 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-lg font-bold transition-colors duration-300 sm:px-7"
            :class="filter === f.id ? 'text-white' : 'text-jungle-900 hover:text-leaf'"
            @click="setFilter(f.id)"
          >
            <component :is="icons[f.id]" :size="18" /> {{ f.label }}
          </button>
        </div>
      </div>

      <!-- grid -->
      <TransitionGroup
        tag="div"
        class="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <button
          v-for="(v, i) in list"
          :key="v.id"
          :data-index="i"
          type="button"
          class="group relative overflow-hidden rounded-[1.5rem] bg-jungle-900 text-left text-white shadow-[0_20px_40px_-20px_rgba(14,59,44,0.6)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(14,59,44,0.7)]"
          :aria-label="`Play ${v.title}`"
          @click="openVideo(v)"
        >
          <div class="relative aspect-[4/5] w-full overflow-hidden">
            <div class="absolute inset-0 transition-transform duration-[1.1s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110">
              <EpisodeThumb :item="v" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-jungle-950/90 via-jungle-950/10 to-transparent" />

            <span
              class="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider"
              :class="v.category === 'short' ? 'bg-backpack text-white' : 'bg-white/90 text-jungle-900'"
            >
              <component :is="v.category === 'short' ? Smartphone : Film" :size="12" />
              {{ v.category === 'short' ? 'Short' : 'Story' }}
            </span>

            <!-- animated play button -->
            <span class="absolute inset-0 grid place-items-center">
              <span class="relative grid h-14 w-14 place-items-center rounded-full bg-white/90 text-backpack shadow-xl transition-all duration-500 group-hover:scale-125 group-hover:bg-white">
                <span class="absolute inset-0 rounded-full bg-white/50 opacity-0 group-hover:animate-pulse-ring group-hover:opacity-100" />
                <Play :size="22" class="relative ml-0.5 fill-current transition-transform duration-500 group-hover:rotate-[360deg]" />
              </span>
            </span>

            <div class="absolute inset-x-0 bottom-0 p-4">
              <p class="font-display text-sm font-semibold text-sun">{{ v.teluguTitle }}</p>
              <h3 class="text-lg font-extrabold leading-tight sm:text-xl">{{ v.title }}</h3>
              <p class="mt-1 inline-flex items-center gap-1 text-xs font-bold text-white/70">
                <Clock :size="12" /> {{ v.duration }}
              </p>
            </div>
          </div>
        </button>
      </TransitionGroup>

      <div v-if="showAllLink" data-reveal class="mt-12 flex justify-center">
        <RouterLink to="/episodes" class="group inline-flex items-center gap-2 rounded-full bg-jungle-900 px-7 py-4 font-display text-lg font-bold text-white transition hover:bg-leaf">
          See every video <ArrowRight :size="18" class="transition-transform group-hover:translate-x-1" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>
