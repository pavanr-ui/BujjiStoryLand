<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X, Youtube, Instagram } from 'lucide-vue-next'
import BrandLogo from './BrandLogo.vue'
import MagicButton from '@/components/ui/MagicButton.vue'
import { navLinks, site } from '@/data/site'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { lockScroll } from '@/composables/useSmoothScroll'

const route = useRoute()
const scrolled = ref(false)
const hidden = ref(false)
const open = ref(false)
const menuEl = ref(null)
let lastY = 0

function onScroll() {
  const y = window.scrollY
  scrolled.value = y > 30
  hidden.value = !open.value && y > 400 && y > lastY
  lastY = y
}

const isActive = (link) => {
  if (typeof link.to === 'string') return link.to === '/' ? route.path === '/' && !route.hash : route.path.startsWith(link.to)
  return route.path === link.to.path && route.hash === link.to.hash
}

watch(open, async (v) => {
  lockScroll(v)
  if (v) {
    await nextTick()
    if (!prefersReducedMotion()) {
      gsap.fromTo(menuEl.value, { clipPath: 'circle(0% at 92% 4%)' }, { clipPath: 'circle(150% at 92% 4%)', duration: 0.8, ease: 'power3.inOut' })
      gsap.fromTo(menuEl.value.querySelectorAll('[data-menu-item]'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, delay: 0.25 })
    }
  }
})
watch(() => route.fullPath, () => (open.value = false))

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="[hidden ? '-translate-y-full' : 'translate-y-0', scrolled ? 'py-2' : 'py-4']"
  >
    <div class="container-wide">
      <nav
        class="flex items-center justify-between rounded-full px-3 py-2 pl-4 transition-all duration-500"
        :class="scrolled ? 'glass-light shadow-[0_10px_40px_-12px_rgba(14,59,44,0.35)]' : 'bg-transparent'"
        aria-label="Main navigation"
      >
        <RouterLink to="/" aria-label="Bujji Storyland home">
          <BrandLogo :light="!scrolled" />
        </RouterLink>

        <ul class="hidden items-center gap-1 lg:flex">
          <li v-for="link in navLinks" :key="link.label">
            <RouterLink
              :to="link.to"
              class="relative rounded-full px-4 py-2 font-display text-lg font-bold transition-colors"
              :class="[
                isActive(link)
                  ? 'bg-sun text-jungle-900'
                  : !scrolled
                    ? 'text-white hover:bg-white/15'
                    : 'text-jungle-900 hover:bg-jungle-900/8',
              ]"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>

        <div class="flex items-center gap-2">
          <MagicButton :href="site.youtubeSubscribeUrl" variant="red" class="!hidden sm:!inline-flex">
            <Youtube :size="20" /> Subscribe
          </MagicButton>
          <button
            type="button"
            class="grid h-12 w-12 place-items-center rounded-full bg-jungle-900 text-white shadow-lg transition hover:scale-105 lg:hidden"
            :aria-expanded="open"
            aria-controls="mobile-menu"
            :aria-label="open ? 'Close menu' : 'Open menu'"
            @click="open = !open"
          >
            <X v-if="open" :size="24" />
            <Menu v-else :size="24" />
          </button>
        </div>
      </nav>
    </div>
  </header>

  <!-- Mobile menu -->
  <Teleport to="body">
    <div
      v-if="open"
      id="mobile-menu"
      ref="menuEl"
      class="fixed inset-0 z-40 flex flex-col overflow-hidden bg-jungle-900 px-6 pb-10 pt-28 text-white lg:hidden"
    >
      <div class="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-leaf/30 blur-3xl" />
      <div class="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-bujji/30 blur-3xl" />
      <ul class="relative flex flex-col gap-2">
        <li v-for="(link, i) in navLinks" :key="link.label" data-menu-item>
          <RouterLink :to="link.to" class="flex items-baseline gap-4 py-2 font-display text-5xl font-extrabold">
            <span class="text-base font-bold text-sun">0{{ i + 1 }}</span>
            <span :class="isActive(link) ? 'text-sun' : 'text-white'">{{ link.label }}</span>
          </RouterLink>
        </li>
      </ul>
      <div class="relative mt-auto flex flex-wrap gap-3" data-menu-item>
        <MagicButton :href="site.youtubeSubscribeUrl" variant="red" size="lg"><Youtube :size="22" /> YouTube</MagicButton>
        <MagicButton :href="site.instagramUrl" variant="secondary" size="lg"><Instagram :size="22" /> Instagram</MagicButton>
      </div>
    </div>
  </Teleport>
</template>
