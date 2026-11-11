<script setup>
import { computed } from 'vue'
import CharacterArt from '@/components/characters/CharacterArt.vue'
import { getThumbnailUrl } from '@/utils/youtube'

/**
 * Illustrated thumbnail built from the characters + a time-of-day scene.
 * When a real YouTube URL is set, the official YouTube thumbnail is used instead.
 */
const props = defineProps({
  item: { type: Object, required: true },
})

const skies = {
  day: 'linear-gradient(180deg,#6cc7ff 0%,#bdeaff 55%,#9bd97f 100%)',
  sunset: 'linear-gradient(180deg,#ff8f6b 0%,#ffc58a 50%,#9bcf7a 100%)',
  rain: 'linear-gradient(180deg,#5d7a99 0%,#9fb6c9 55%,#6aa77a 100%)',
  night: 'linear-gradient(180deg,#141b4d 0%,#2c3a87 55%,#2a6a52 100%)',
}

const time = computed(() => props.item.thumb?.time || 'day')
const cast = computed(() => props.item.thumb?.cast || ['bujji'])
const ytThumb = computed(() => getThumbnailUrl(props.item.youtubeUrl))

const sizeFor = (id) => (id === 'baby-bird' ? 'w-[18%]' : id === 'mother-bird' ? 'w-[30%]' : 'w-[32%]')
</script>

<template>
  <div class="relative h-full w-full overflow-hidden">
    <img
      v-if="ytThumb"
      :src="ytThumb"
      :alt="item.title"
      loading="lazy"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div v-else class="thumb-scene absolute inset-0" :style="{ background: skies[time] }">
      <!-- sky details -->
      <div v-if="time === 'day'" class="absolute right-[10%] top-[10%] h-[22%] aspect-square rounded-full bg-[radial-gradient(circle,#fffbe3,#ffe27a_55%,transparent_72%)]" />
      <div v-if="time === 'sunset'" class="absolute left-1/2 top-[30%] h-[34%] aspect-square -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#fff1c4,#ffb35c_55%,transparent_72%)]" />
      <template v-if="time === 'night'">
        <div class="absolute right-[12%] top-[10%] h-[18%] aspect-square rounded-full bg-[#fff6c9] shadow-[0_0_30px_10px_rgba(255,246,201,0.4)]" />
        <span
          v-for="i in 14"
          :key="i"
          class="absolute h-1 w-1 animate-twinkle rounded-full bg-white"
          :style="{ left: (i * 37) % 95 + '%', top: (i * 23) % 45 + '%', animationDelay: i * 0.3 + 's' }"
        />
      </template>
      <div v-if="time === 'rain'" class="rain absolute inset-0 opacity-50" />

      <!-- hills -->
      <svg viewBox="0 0 400 120" preserveAspectRatio="none" class="absolute inset-x-0 bottom-0 h-[42%] w-full">
        <path d="M0 50 C80 20 160 60 240 34 C320 10 360 40 400 30 L400 120 L0 120 Z" :fill="time === 'night' ? '#1f5a45' : '#4cb653'" opacity="0.8" />
        <path d="M0 80 C100 56 200 90 300 70 C350 60 380 70 400 66 L400 120 L0 120 Z" :fill="time === 'night' ? '#174636' : '#2d9448'" />
      </svg>

      <!-- cast -->
      <div class="absolute inset-x-[6%] bottom-[6%] flex items-end justify-center gap-[2%]">
        <div v-for="id in cast" :key="id" :class="sizeFor(id)" class="thumb-char transition-transform duration-500">
          <CharacterArt :id="id" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rain {
  background-image: repeating-linear-gradient(105deg, rgba(255, 255, 255, 0.55) 0 1px, transparent 1px 14px);
  animation: rain 0.6s linear infinite;
}
@keyframes rain {
  from { background-position: 0 0; }
  to { background-position: -40px 120px; }
}
</style>
