<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { X } from 'lucide-vue-next'
import { gsap, prefersReducedMotion } from '@/animations/gsap'

/** Accessible animated modal: Escape to close, focus trap, backdrop click. */
const props = defineProps({
  open: { type: Boolean, default: false },
  label: { type: String, default: 'Dialog' },
  maxWidth: { type: String, default: 'max-w-4xl' },
  dark: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])

const panel = ref(null)
const backdrop = ref(null)
let lastFocus = null

function onKey(e) {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'Tab' && panel.value) {
    const f = panel.value.querySelectorAll('button, [href], iframe, input, [tabindex]:not([tabindex="-1"])')
    if (!f.length) return
    const first = f[0]
    const last = f[f.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

watch(
  () => props.open,
  async (open) => {
    if (open) {
      lastFocus = document.activeElement
      document.addEventListener('keydown', onKey)
      await nextTick()
      if (!prefersReducedMotion()) {
        gsap.fromTo(backdrop.value, { opacity: 0 }, { opacity: 1, duration: 0.35 })
        gsap.fromTo(
          panel.value,
          { opacity: 0, y: 60, scale: 0.92, rotateX: 8 },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.7, ease: 'back.out(1.4)' },
        )
      }
      panel.value?.querySelector('[data-close]')?.focus()
    } else {
      document.removeEventListener('keydown', onKey)
      lastFocus?.focus?.()
    }
  },
)

onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true" :aria-label="label">
        <div ref="backdrop" class="absolute inset-0 bg-jungle-950/80 backdrop-blur-md" @click="emit('close')" />
        <div
          ref="panel"
          data-lenis-prevent
          class="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-[2rem] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] [perspective:1000px]"
          :class="[maxWidth, dark ? 'bg-jungle-950 text-white' : 'bg-cream text-ink']"
        >
          <button
            data-close
            type="button"
            class="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-jungle-900 shadow-lg transition hover:rotate-90 hover:bg-sun"
            aria-label="Close"
            @click="emit('close')"
          >
            <X :size="22" />
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
