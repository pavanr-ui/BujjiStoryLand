<script setup>
import PageHero from '@/components/layout/PageHero.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import CharacterWorld from '@/components/sections/CharacterWorld.vue'
import SubscribeSection from '@/components/sections/SubscribeSection.vue'

defineProps({ ready: { type: Boolean, default: true } })
</script>

<template>
  <div>
    <PageHero
      eyebrow="About Us"
      telugu="మా కథ"
      title="Made with love|for little ones"
      subtitle="Original Telugu stories about friendship, kindness and good values — told by a little blue elephant with a big heart."
      character="mother-bird"
      time="day"
    />
    <AboutSection expanded />
    <CharacterWorld />
    <SubscribeSection />
  </div>
</template>
