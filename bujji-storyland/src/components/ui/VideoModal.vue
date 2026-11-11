<script setup>
import { computed } from 'vue'
import { Clock, Youtube, Bell } from 'lucide-vue-next'
import BaseModal from './BaseModal.vue'
import MagicButton from './MagicButton.vue'
import EpisodeThumb from '@/components/scenery/EpisodeThumb.vue'
import { useModals } from '@/composables/useModals'
import { getEmbedUrl } from '@/utils/youtube'
import { site } from '@/data/site'

/**
 * Plays a real YouTube embed when the item has a valid YouTube URL.
 * Otherwise shows an honest "coming soon" panel — never fake playback.
 */
const { modals, closeAll } = useModals()
const item = computed(() => modals.video)
const embed = computed(() => (item.value ? getEmbedUrl(item.value.youtubeUrl) : null))
const isShort = computed(() => item.value?.category === 'short' || /\/shorts\//.test(item.value?.youtubeUrl || ''))
</script>

<template>
  <BaseModal :open="Boolean(item)" :label="item ? item.title : 'Video'" :max-width="isShort ? 'max-w-md' : 'max-w-5xl'" dark @close="closeAll">
    <div v-if="item">
      <div class="relative w-full bg-black" :class="isShort ? 'aspect-[9/16]' : 'aspect-video'">
        <iframe
          v-if="embed"
          :src="embed"
          :title="item.title"
          class="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
        <template v-else>
          <EpisodeThumb :item="item" class="absolute inset-0 opacity-60" />
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-jungle-950/55 p-6 text-center">
            <span class="eyebrow bg-sun text-jungle-900"><Bell :size="14" /> Coming soon</span>
            <p class="max-w-md font-display text-2xl font-bold sm:text-3xl">This story is still being animated in the jungle!</p>
            <p class="max-w-sm text-white/75">Subscribe to be the first to watch when it’s published.</p>
            <MagicButton :href="site.youtubeSubscribeUrl" variant="red">
              <Youtube :size="20" /> Subscribe on YouTube
            </MagicButton>
          </div>
        </template>
      </div>
      <div class="flex flex-wrap items-end justify-between gap-3 p-6 sm:p-8">
        <div>
          <p class="font-display text-lg text-sun">{{ item.teluguTitle }}</p>
          <h3 class="text-3xl font-extrabold">{{ item.title }}</h3>
          <p v-if="item.summary" class="mt-2 max-w-2xl text-white/70">{{ item.summary }}</p>
        </div>
        <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
          <Clock :size="16" /> {{ item.duration }}
        </span>
      </div>
    </div>
  </BaseModal>
</template>
