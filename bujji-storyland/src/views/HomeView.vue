<script setup>
import HeroSection from '@/components/sections/HeroSection.vue'
import CharacterWorld from '@/components/sections/CharacterWorld.vue'
import FeaturedEpisodes from '@/components/sections/FeaturedEpisodes.vue'
import StoryExperience from '@/components/sections/StoryExperience.vue'
import VideoGallery from '@/components/sections/VideoGallery.vue'
import MagicalJungle from '@/components/sections/MagicalJungle.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SubscribeSection from '@/components/sections/SubscribeSection.vue'

defineProps({
  ready: { type: Boolean, default: true },
})
</script>

<template>
  <div>
    <HeroSection :ready="ready" />
    <CharacterWorld />
    <FeaturedEpisodes />
    <StoryExperience />
    <VideoGallery :limit="8" show-all-link />
    <MagicalJungle />
    <AboutSection />
    <SubscribeSection />
  </div>
</template>
