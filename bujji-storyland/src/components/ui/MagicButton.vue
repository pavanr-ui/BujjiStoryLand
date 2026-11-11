<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap, prefersReducedMotion } from '@/animations/gsap'

/**
 * Premium animated button: magnetic hover, shine sweep, press bounce.
 * Renders a RouterLink (`to`), an external link (`href`) or a <button>.
 */
const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  variant: { type: String, default: 'primary' }, // primary | secondary | light | ghost | red
  size: { type: String, default: 'md' }, // md | lg | xl
  magnetic: { type: Boolean, default: true },
})
defineEmits(['click'])

const el = ref(null)
const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))
const linkAttrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) {
    const external = /^https?:/.test(props.href)
    return { href: props.href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
  }
  return { type: 'button' }
})

const variants = {
  primary: 'bg-gradient-to-b from-[#ffd95c] to-[#ffb21c] text-ink shadow-[0_10px_0_#d1840a,0_18px_30px_-8px_rgba(209,132,10,0.6)] hover:shadow-[0_6px_0_#d1840a,0_14px_26px_-8px_rgba(209,132,10,0.6)]',
  red: 'bg-gradient-to-b from-[#ff6b5c] to-[#e2372b] text-white shadow-[0_10px_0_#a8261f,0_18px_30px_-8px_rgba(168,38,31,0.6)] hover:shadow-[0_6px_0_#a8261f,0_14px_26px_-8px_rgba(168,38,31,0.6)]',
  secondary: 'glass text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]',
  light: 'bg-white text-jungle-900 shadow-[0_8px_0_#d9e8d0,0_16px_28px_-10px_rgba(14,59,44,0.35)] hover:shadow-[0_5px_0_#d9e8d0,0_12px_24px_-10px_rgba(14,59,44,0.35)]',
  ghost: 'bg-transparent text-jungle-900 ring-2 ring-jungle-900/15 hover:ring-jungle-900/40',
}
const sizes = {
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl sm:text-2xl',
}

let xTo, yTo
function onMove(e) {
  if (!xTo) return
  const r = el.value.$el ? el.value.$el.getBoundingClientRect() : el.value.getBoundingClientRect()
  xTo((e.clientX - (r.left + r.width / 2)) * 0.25)
  yTo((e.clientY - (r.top + r.height / 2)) * 0.35)
}
function onLeave() {
  if (!xTo) return
  xTo(0)
  yTo(0)
}

onMounted(() => {
  const node = el.value?.$el || el.value
  if (!props.magnetic || prefersReducedMotion() || window.matchMedia('(hover: none)').matches) return
  xTo = gsap.quickTo(node, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  yTo = gsap.quickTo(node, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
})
onBeforeUnmount(() => {
  const node = el.value?.$el || el.value
  if (node) gsap.killTweensOf(node)
})
</script>

<template>
  <component
    :is="tag"
    ref="el"
    v-bind="linkAttrs"
    class="group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-display font-bold tracking-wide transition-[box-shadow,translate,background-color] duration-200 active:translate-y-1"
    :class="[variants[variant], sizes[size]]"
    @pointermove="onMove"
    @pointerleave="onLeave"
    @click="$emit('click', $event)"
  >
    <span
      class="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/45 opacity-0 blur-sm transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
      aria-hidden="true"
    />
    <span class="relative z-10 inline-flex items-center gap-2.5 leading-none pt-[0.15em]">
      <slot />
    </span>
  </component>
</template>
