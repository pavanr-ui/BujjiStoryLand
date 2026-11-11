<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SplitText from './SplitText.vue'
import { gsap, revealWords, revealOnScroll } from '@/animations/gsap'

const props = defineProps({
  eyebrow: { type: String, default: '' },
  telugu: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  align: { type: String, default: 'center' }, // center | left
  dark: { type: Boolean, default: false },
})

const root = ref(null)
const titleEl = ref(null)

let ctx
onMounted(() => {
  ctx = gsap.context(() => {
    revealWords(titleEl.value?.$el)
    revealOnScroll(root.value)
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <header
    ref="root"
    data-reveal-root
    class="flex flex-col gap-4"
    :class="align === 'center' ? 'items-center text-center mx-auto max-w-3xl' : 'items-start text-left max-w-2xl'"
  >
    <span
      v-if="eyebrow"
      data-reveal
      class="eyebrow"
      :class="dark ? 'bg-white/10 text-lime ring-1 ring-white/20' : 'bg-leaf/12 text-jungle-700 ring-1 ring-leaf/25'"
    >
      <span class="h-1.5 w-1.5 rounded-full bg-current" />
      {{ eyebrow }}
    </span>
    <p v-if="telugu" data-reveal class="font-display text-lg font-semibold" :class="dark ? 'text-sun' : 'text-backpack'">
      {{ telugu }}
    </p>
    <SplitText
      ref="titleEl"
      tag="h2"
      :text="title"
      class="text-4xl font-extrabold sm:text-5xl lg:text-6xl"
      :class="dark ? 'text-white' : 'text-jungle-900'"
    />
    <p v-if="subtitle" data-reveal data-reveal-delay="0.15" class="text-lg leading-relaxed" :class="dark ? 'text-white/75' : 'text-ink/70'">
      {{ subtitle }}
    </p>
  </header>
</template>
