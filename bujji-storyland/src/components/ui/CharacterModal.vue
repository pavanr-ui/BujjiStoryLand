<script setup>
import { computed } from 'vue'
import { Heart, Sparkles, Quote } from 'lucide-vue-next'
import BaseModal from './BaseModal.vue'
import CharacterArt from '@/components/characters/CharacterArt.vue'
import { useModals } from '@/composables/useModals'

const { modals, closeAll } = useModals()
const c = computed(() => modals.character)
</script>

<template>
  <BaseModal :open="Boolean(c)" :label="c ? `${c.name} details` : 'Character'" max-width="max-w-4xl" @close="closeAll">
    <div v-if="c" class="grid md:grid-cols-[1fr_1.1fr]">
      <!-- art side -->
      <div class="relative flex min-h-72 items-end justify-center overflow-hidden bg-gradient-to-br p-8 md:min-h-[30rem]" :class="c.gradient">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.55),transparent_60%)]" />
        <span class="absolute left-6 top-6 font-display text-7xl font-extrabold text-white/25 md:text-8xl">{{ c.teluguName }}</span>
        <div class="relative w-[78%] max-w-xs animate-float drop-shadow-[0_24px_30px_rgba(0,0,0,0.25)]">
          <CharacterArt :id="c.id" waving eager />
        </div>
      </div>

      <!-- details side -->
      <div class="flex flex-col gap-5 p-7 sm:p-10">
        <div>
          <p class="text-sm font-extrabold uppercase tracking-[0.2em]" :style="{ color: c.color }">{{ c.role }}</p>
          <h3 class="mt-2 text-5xl font-extrabold text-jungle-900">{{ c.name }}</h3>
          <p class="mt-1 font-display text-xl font-semibold text-ink/60">{{ c.teluguName }} · {{ c.species }}</p>
        </div>
        <p class="text-lg leading-relaxed text-ink/80">{{ c.description }}</p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="t in c.traits"
            :key="t"
            class="rounded-full px-4 py-1.5 text-sm font-bold text-white"
            :style="{ background: c.color }"
          >
            {{ t }}
          </span>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="rounded-2xl bg-white p-4 shadow-sm">
            <p class="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-ink/50">
              <Heart :size="14" /> Loves
            </p>
            <p class="mt-1 font-semibold">{{ c.favorite }}</p>
          </div>
          <div class="rounded-2xl bg-white p-4 shadow-sm">
            <p class="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-ink/50">
              <Sparkles :size="14" /> Known for
            </p>
            <p class="mt-1 font-semibold">{{ c.tagline }}</p>
          </div>
        </div>

        <blockquote class="relative rounded-2xl bg-jungle-900 p-5 text-white">
          <Quote :size="28" class="absolute -top-3 left-4 rounded-full bg-sun p-1.5 text-jungle-900" />
          <p class="font-display text-2xl font-bold">{{ c.catchphrase }}</p>
          <p class="mt-1 text-white/70">“{{ c.catchphraseEn }}”</p>
        </blockquote>
      </div>
    </div>
  </BaseModal>
</template>
