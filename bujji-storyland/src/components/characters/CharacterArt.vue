<script setup>
import { computed } from 'vue'
import { getCharacter } from '@/data/characters'
import BujjiArt from './BujjiArt.vue'
import ChinniArt from './ChinniArt.vue'
import BabyBirdArt from './BabyBirdArt.vue'
import MotherBirdArt from './MotherBirdArt.vue'

/**
 * Renders a character. Uses the official artwork from characters.js `image`
 * when provided, otherwise the built-in animated SVG drawing.
 */
const props = defineProps({
  id: { type: String, required: true },
  walking: { type: Boolean, default: false },
  waving: { type: Boolean, default: false },
  sad: { type: Boolean, default: false },
  eager: { type: Boolean, default: false }, // eager-load (hero/loader)
})

const map = {
  bujji: BujjiArt,
  chinni: ChinniArt,
  'baby-bird': BabyBirdArt,
  'mother-bird': MotherBirdArt,
}

const character = computed(() => getCharacter(props.id))
const svgComponent = computed(() => map[props.id])
</script>

<template>
  <img
    v-if="character?.image"
    :src="character.image"
    :alt="`${character.name} — ${character.species}`"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
    class="h-full w-full object-contain"
    draggable="false"
  />
  <component
    :is="svgComponent"
    v-else-if="svgComponent"
    :walking="walking"
    :waving="waving"
    v-bind="id === 'baby-bird' ? { sad } : {}"
    class="h-full w-full overflow-visible"
  />
</template>
