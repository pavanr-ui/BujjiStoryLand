<script setup>
import PageHero from '@/components/layout/PageHero.vue'
import FeaturedEpisodes from '@/components/sections/FeaturedEpisodes.vue'
import VideoGallery from '@/components/sections/VideoGallery.vue'
import SubscribeSection from '@/components/sections/SubscribeSection.vue'

defineProps({ ready: { type: Boolean, default: true } })
</script>

<template>
  <div>
    <PageHero
      eyebrow="Episodes & Videos"
      telugu="అన్ని కథలు ఇక్కడే"
      title="Stories for|every bedtime"
      subtitle="Watch Bujji’s adventures, from quick Shorts to full stories — all in simple, joyful Telugu."
      character="bujji"
      time="sunset"
    />
    <FeaturedEpisodes :show-all-link="false" />
    <VideoGallery />
    <SubscribeSection />
  </div>
</template>
