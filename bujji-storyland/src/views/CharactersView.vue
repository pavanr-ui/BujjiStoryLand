<script setup>
import PageHero from '@/components/layout/PageHero.vue'
import CharacterWorld from '@/components/sections/CharacterWorld.vue'
import MagicalJungle from '@/components/sections/MagicalJungle.vue'
import SubscribeSection from '@/components/sections/SubscribeSection.vue'

defineProps({ ready: { type: Boolean, default: true } })
</script>

<template>
  <div>
    <PageHero
      eyebrow="Characters"
      telugu="మా జంగిల్ స్నేహితులు"
      title="The friends of|Bujji Storyland"
      subtitle="A kind blue elephant, a clever squirrel, a tiny yellow chick and a loving mama bird — tap any card to get to know them."
      character="chinni"
      time="day"
    />
    <CharacterWorld show-descriptions />
    <MagicalJungle />
    <SubscribeSection />
  </div>
</template>
