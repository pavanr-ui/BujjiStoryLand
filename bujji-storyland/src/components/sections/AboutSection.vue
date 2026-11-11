<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Heart, Users, Sparkles, Languages } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import CharacterArt from '@/components/characters/CharacterArt.vue'
import { gsap, prefersReducedMotion, revealOnScroll } from '@/animations/gsap'

defineProps({
  expanded: { type: Boolean, default: false },
})

const root = ref(null)
let ctx

const values = [
  { icon: Languages, title: 'Telugu first', text: 'Simple, warm spoken Telugu that little ones understand and parents love.', color: 'bg-bujji' },
  { icon: Users, title: 'Friendship', text: 'Stories where friends stick together, listen and solve problems as a team.', color: 'bg-leaf' },
  { icon: Heart, title: 'Kindness', text: 'Gentle lessons about helping, sharing and caring — never preachy, always fun.', color: 'bg-backpack' },
  { icon: Sparkles, title: 'Safe & joyful', text: 'Bright, calm, child-safe animation made for families to watch together.', color: 'bg-sun-deep' },
]

onMounted(() => {
  ctx = gsap.context(() => {
    revealOnScroll(root.value)
    if (prefersReducedMotion()) return
    gsap.from('[data-value-card]', {
      y: 60,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'back.out(1.4)',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: '[data-values]', start: 'top 85%', once: true },
    })
    // illustration floats with scroll
    gsap.to('[data-about-art] [data-float-a]', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: root.value, scrub: true } })
    gsap.to('[data-about-art] [data-float-b]', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: root.value, scrub: true } })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="about" ref="root" data-reveal-root class="relative overflow-hidden py-24 sm:py-32" aria-labelledby="about-title">
    <div class="container-wide grid items-center gap-16 lg:grid-cols-2">
      <!-- illustration -->
      <div data-about-art data-reveal class="relative mx-auto aspect-square w-full max-w-lg">
        <div class="absolute inset-0 rounded-[40%_60%_55%_45%/45%_40%_60%_55%] bg-gradient-to-br from-lime via-leaf to-jungle-700 shadow-[0_40px_80px_-30px_rgba(14,59,44,0.6)]" />
        <div class="absolute inset-[8%] rounded-[55%_45%_40%_60%/50%_60%_40%_50%] bg-[radial-gradient(circle_at_40%_30%,#fff7e8_0%,#ffe9b8_60%,#ffc93c_100%)] opacity-90" />
        <div data-float-a class="absolute bottom-[10%] left-[8%] w-[48%]"><CharacterArt id="bujji" /></div>
        <div data-float-b class="absolute bottom-[14%] right-[10%] w-[30%]"><CharacterArt id="chinni" /></div>
        <div data-float-a class="absolute right-[18%] top-[12%] w-[26%]"><div class="animate-float"><CharacterArt id="mother-bird" /></div></div>
        <div data-float-b class="absolute left-[30%] top-[20%] w-[13%]"><div class="animate-float-slow"><CharacterArt id="baby-bird" /></div></div>
        <span class="absolute -right-2 top-[46%] rotate-6 rounded-2xl bg-white px-4 py-2 font-display text-lg font-bold text-jungle-900 shadow-xl">కలిసి ఉంటే కలదు సుఖం</span>
      </div>

      <!-- copy -->
      <div class="flex flex-col gap-6">
        <SectionHeading
          id="about-title"
          align="left"
          eyebrow="About Us"
          telugu="మా గురించి"
          title="Little stories,|big hearts"
          subtitle="Bujji Storyland creates original Telugu animated stories for children — short, cheerful adventures that celebrate friendship, kindness and good values."
        />
        <p data-reveal class="text-lg leading-relaxed text-ink/75">
          Every episode follows Bujji, a gentle blue baby elephant, and his jungle friends as they discover that helping others, telling the truth and sharing with friends make the whole world a happier place.
        </p>
        <p v-if="expanded" data-reveal class="text-lg leading-relaxed text-ink/75">
          We write each story in natural spoken Telugu so kids can enjoy their mother tongue, and keep every scene bright, calm and safe for the youngest viewers. New Shorts and stories arrive regularly on YouTube and Instagram.
        </p>

        <div data-values class="mt-2 grid gap-4 sm:grid-cols-2">
          <div
            v-for="v in values"
            :key="v.title"
            data-value-card
            class="group rounded-3xl bg-white p-5 shadow-[0_14px_40px_-20px_rgba(14,59,44,0.35)] ring-1 ring-jungle-900/5 transition-transform duration-500 hover:-translate-y-1.5 hover:rotate-[-1deg]"
          >
            <span class="grid h-12 w-12 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" :class="v.color">
              <component :is="v.icon" :size="22" />
            </span>
            <h3 class="mt-3 text-xl font-extrabold text-jungle-900">{{ v.title }}</h3>
            <p class="mt-1 text-sm leading-relaxed text-ink/65">{{ v.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
