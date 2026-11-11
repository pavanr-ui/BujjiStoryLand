<script setup>
import { Youtube, Instagram, Mail, Heart } from 'lucide-vue-next'
import BrandLogo from './BrandLogo.vue'
import { navLinks, site } from '@/data/site'

const year = new Date().getFullYear()
const socials = [
  { label: 'YouTube', href: site.youtubeUrl, icon: Youtube, cls: 'hover:bg-[#ff0033]' },
  { label: 'Instagram', href: site.instagramUrl, icon: Instagram, cls: 'hover:bg-gradient-to-br hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5]' },
  { label: 'Email', href: `mailto:${site.email}`, icon: Mail, cls: 'hover:bg-sun hover:text-jungle-900' },
]
</script>

<template>
  <footer class="relative bg-jungle-950 text-white">
    <!-- wavy top edge that overlaps whatever section sits above -->
    <svg class="absolute inset-x-0 bottom-[calc(100%-1px)] h-10 w-full text-jungle-950 sm:h-14" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 60 V30 C120 4 240 44 360 24 C480 4 600 46 720 26 C840 6 960 48 1080 26 C1200 4 1320 42 1440 20 V60 Z" fill="currentColor" />
    </svg>

    <div class="container-wide relative grid gap-12 pb-10 pt-16 md:grid-cols-[1.4fr_1fr_1fr]">
      <div class="flex flex-col gap-5">
        <RouterLink to="/" aria-label="Bujji Storyland home"><BrandLogo light /></RouterLink>
        <p class="max-w-sm text-white/65">
          Original Telugu animated stories for little ones — filled with friendship, kindness and jungle-sized smiles.
        </p>
        <div class="flex gap-3">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            :target="s.href.startsWith('http') ? '_blank' : undefined"
            rel="noopener noreferrer"
            :aria-label="s.label"
            class="grid h-12 w-12 place-items-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1"
            :class="s.cls"
          >
            <component :is="s.icon" :size="20" />
          </a>
        </div>
      </div>

      <nav aria-label="Footer">
        <p class="mb-4 font-display text-lg font-bold text-sun">Explore</p>
        <ul class="flex flex-col gap-2.5">
          <li v-for="l in navLinks" :key="l.label">
            <RouterLink :to="l.to" class="text-white/70 transition hover:pl-1 hover:text-white">{{ l.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <div>
        <p class="mb-4 font-display text-lg font-bold text-sun">Watch</p>
        <ul class="flex flex-col gap-2.5 text-white/70">
          <li><a :href="site.youtubeUrl" target="_blank" rel="noopener noreferrer" class="transition hover:text-white">YouTube channel</a></li>
          <li><a :href="site.instagramUrl" target="_blank" rel="noopener noreferrer" class="transition hover:text-white">Instagram Reels</a></li>
          <li><RouterLink to="/episodes" class="transition hover:text-white">All episodes</RouterLink></li>
          <li><RouterLink to="/characters" class="transition hover:text-white">Meet the characters</RouterLink></li>
        </ul>
      </div>
    </div>

    <div class="container-wide relative flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-sm text-white/50 sm:flex-row">
      <p>© {{ year }} Bujji Storyland. All rights reserved.</p>
      <p class="inline-flex items-center gap-1.5">Made with <Heart :size="14" class="fill-backpack text-backpack" /> for little storytellers</p>
    </div>
  </footer>
</template>
