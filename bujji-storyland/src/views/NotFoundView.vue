<script setup>
import { Home } from 'lucide-vue-next'
import JungleBackdrop from '@/components/scenery/JungleBackdrop.vue'
import CharacterArt from '@/components/characters/CharacterArt.vue'
import MagicButton from '@/components/ui/MagicButton.vue'

defineProps({ ready: { type: Boolean, default: true } })
</script>

<template>
  <section class="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-24 text-center">
    <JungleBackdrop time="sunset" />
    <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,36,26,0.55)_0%,rgba(7,36,26,0)_35%)]" />
    <div class="glass-light relative z-10 flex max-w-lg flex-col items-center gap-4 rounded-[2.5rem] p-10 shadow-2xl">
      <div class="w-40 animate-float"><CharacterArt id="bujji" /></div>
      <p class="font-display text-7xl font-extrabold text-gradient-jungle">404</p>
      <h1 class="text-3xl font-extrabold text-jungle-900">Oops! Bujji got lost in the jungle</h1>
      <p class="font-display text-lg text-jungle-700">అయ్యో! ఈ దారి ఎక్కడికీ వెళ్ళదు.</p>
      <p class="text-ink/70">This page doesn’t exist. Let’s walk back home together.</p>
      <MagicButton to="/" size="lg"><Home :size="20" /> Back to Storyland</MagicButton>
    </div>
  </section>
</template>
