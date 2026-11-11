<script setup>
import { computed } from 'vue'

/**
 * Splits text into word spans for staggered GSAP reveals.
 * Lines are separated with "|" in the text prop.
 * The full sentence stays available to screen readers via aria-label.
 */
const props = defineProps({
  text: { type: String, required: true },
  tag: { type: String, default: 'span' },
  wordClass: { type: String, default: '' },
  highlightLine: { type: Number, default: -1 },
  highlightClass: { type: String, default: '' },
})

const lines = computed(() => props.text.split('|').map((l) => l.trim().split(/\s+/)))
const plain = computed(() => props.text.replace(/\|/g, ' '))
</script>

<template>
  <component :is="tag" :aria-label="plain">
    <span v-for="(words, li) in lines" :key="li" class="split-line" aria-hidden="true">
      <template v-for="(w, wi) in words" :key="wi">
        <span class="split-word" :class="[wordClass, li === highlightLine ? highlightClass : '']">{{ w }}</span>{{ wi < words.length - 1 ? ' ' : '' }}
      </template>
    </span>
  </component>
</template>
