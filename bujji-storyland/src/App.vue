<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import PageLoader from '@/components/layout/PageLoader.vue'
import VideoModal from '@/components/ui/VideoModal.vue'
import CharacterModal from '@/components/ui/CharacterModal.vue'
import { startSmoothScroll, stopSmoothScroll } from '@/composables/useSmoothScroll'
import { ScrollTrigger } from '@/animations/gsap'

// Show the loader once per browser session.
function alreadyLoaded() {
  try {
    return Boolean(sessionStorage.getItem('bujji-loaded'))
  } catch {
    return false
  }
}
const showLoader = ref(!alreadyLoaded())
const ready = ref(!showLoader.value)

function onLoaded() {
  showLoader.value = false
  ready.value = true
  try {
    sessionStorage.setItem('bujji-loaded', '1')
  } catch {
    /* storage unavailable — loader will just show again next time */
  }
  requestAnimationFrame(() => ScrollTrigger.refresh())
}

onMounted(() => startSmoothScroll())
onBeforeUnmount(() => stopSmoothScroll())
</script>

<template>
  <a
    href="#main"
    class="fixed left-4 top-4 z-[120] -translate-y-24 rounded-full bg-sun px-5 py-3 font-bold text-jungle-900 transition focus:translate-y-0"
  >
    Skip to content
  </a>

  <PageLoader v-if="showLoader" @done="onLoaded" />

  <SiteHeader />

  <main id="main">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in" @after-enter="ScrollTrigger.refresh()">
        <component :is="Component" :key="route.path" :ready="ready" />
      </Transition>
    </RouterView>
  </main>

  <SiteFooter />

  <VideoModal />
  <CharacterModal />
</template>
