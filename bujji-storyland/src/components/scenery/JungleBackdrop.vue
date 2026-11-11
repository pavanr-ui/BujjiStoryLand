<script setup>
/**
 * Layered, parallax-ready jungle environment built from SVG.
 * Each layer carries:
 *   data-depth  → mouse parallax strength (used by useMouseParallax)
 *   data-speed  → scroll parallax speed (used by parent ScrollTrigger)
 */
defineProps({
  time: { type: String, default: 'day' }, // 'day' | 'sunset'
  showSun: { type: Boolean, default: true },
  showFrontLeaves: { type: Boolean, default: true },
  showSky: { type: Boolean, default: true },
})

const LEAF = 'M0 0 C26 -34 84 -38 120 0 C84 38 26 34 0 0 Z'
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <!-- sky -->
    <div
      v-if="showSky"
      class="absolute inset-0"
      :style="{
        background:
          time === 'sunset'
            ? 'linear-gradient(180deg, #ff9a6b 0%, #ffc98a 38%, #ffe6b5 62%, #bfe7a7 100%)'
            : 'linear-gradient(180deg, #6cc7ff 0%, #a8e2ff 35%, #dff6e6 68%, #b6e59a 100%)',
      }"
    />

    <!-- sun + rays -->
    <div v-if="showSun" class="absolute left-1/2 top-[8%] -translate-x-1/2" data-depth="0.1" data-speed="0.15">
      <div class="relative h-[34vmin] w-[34vmin]">
        <svg viewBox="-200 -200 400 400" class="absolute inset-[-60%] h-[220%] w-[220%] animate-spin-slow opacity-60">
          <g fill="#fff6c9">
            <path v-for="i in 14" :key="i" :transform="`rotate(${i * (360 / 14)})`" d="M-9 -60 L0 -200 L9 -60 Z" opacity="0.55" />
          </g>
        </svg>
        <div class="absolute inset-0 rounded-full bg-[radial-gradient(circle,#fffbe3_0%,#ffe27a_45%,rgba(255,201,60,0)_72%)]" />
      </div>
    </div>

    <!-- clouds -->
    <div class="absolute left-[4%] top-[12%] w-[22vw] min-w-40" data-depth="0.15">
      <svg class="w-full animate-float-slow opacity-90" viewBox="0 0 200 80">
        <path d="M30 64 a26 26 0 0 1 8 -50 a34 34 0 0 1 62 -6 a28 28 0 0 1 52 18 a22 22 0 0 1 18 38 Z" fill="#fff" />
      </svg>
    </div>
    <div class="absolute right-[6%] top-[20%] w-[16vw] min-w-32" data-depth="0.2">
      <svg class="w-full animate-float opacity-80" viewBox="0 0 200 80">
        <path d="M30 64 a26 26 0 0 1 8 -50 a34 34 0 0 1 62 -6 a28 28 0 0 1 52 18 a22 22 0 0 1 18 38 Z" fill="#fff" />
      </svg>
    </div>

    <!-- far hills -->
    <svg class="absolute inset-x-[-5%] bottom-0 h-[62%] w-[110%]" viewBox="0 0 1440 560" preserveAspectRatio="none" data-depth="0.15" data-speed="0.1">
      <path d="M0 260 C180 170 320 220 480 180 C660 130 780 210 960 170 C1120 136 1280 190 1440 150 L1440 560 L0 560 Z" fill="#8fd17a" opacity="0.75" />
      <path d="M0 330 C220 260 380 320 560 280 C760 236 900 320 1100 270 C1260 230 1360 280 1440 260 L1440 560 L0 560 Z" fill="#6fc165" />
    </svg>

    <!-- back tree line -->
    <svg class="absolute inset-x-[-6%] bottom-[14%] h-[56%] w-[112%]" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMax slice" data-depth="0.3" data-speed="0.2">
      <g fill="#3f9a4d">
        <g v-for="(x, i) in [40, 230, 430, 640, 860, 1060, 1260, 1420]" :key="'bt' + i">
          <rect :x="x - 8" y="250" width="16" height="250" fill="#5b3a22" opacity="0.65" />
          <circle :cx="x" :cy="230 - (i % 3) * 30" :r="88 + (i % 2) * 22" />
          <circle :cx="x - 56" :cy="276 - (i % 3) * 24" r="62" />
          <circle :cx="x + 58" :cy="270 - (i % 2) * 26" r="66" />
        </g>
      </g>
      <g fill="#58b85a" opacity="0.9">
        <circle v-for="(x, i) in [120, 330, 540, 760, 960, 1170, 1360]" :key="'bt2' + i" :cx="x" :cy="320 - (i % 2) * 20" r="70" />
      </g>
    </svg>

    <!-- mid foliage + ground -->
    <svg class="absolute inset-x-[-4%] bottom-0 h-[38%] w-[108%]" viewBox="0 0 1440 340" preserveAspectRatio="xMidYMax slice" data-depth="0.55" data-speed="0.35">
      <g>
        <ellipse v-for="(x, i) in [0, 180, 360, 540, 720, 900, 1080, 1260, 1440]" :key="'bush' + i" :cx="x" :cy="190 - (i % 2) * 14" rx="140" ry="90" :fill="i % 2 ? '#2f8a45' : '#38a04f'" />
      </g>
      <!-- flowers -->
      <g v-for="(f, i) in [[150, 150, '#ff6b9a'], [420, 168, '#ffd43b'], [690, 150, '#ff8a3d'], [1010, 164, '#ff6b9a'], [1290, 152, '#c49bff']]" :key="'fl' + i">
        <circle v-for="p in 5" :key="p" :cx="f[0] + Math.cos((p * 72 * Math.PI) / 180) * 10" :cy="f[1] + Math.sin((p * 72 * Math.PI) / 180) * 10" r="8" :fill="f[2]" />
        <circle :cx="f[0]" :cy="f[1]" r="6" fill="#fff3a6" />
      </g>
      <path d="M0 230 C240 200 480 240 720 220 C960 200 1200 236 1440 214 L1440 340 L0 340 Z" fill="#2a7a3c" />
      <path d="M0 270 C300 250 600 280 900 262 C1140 248 1300 270 1440 258 L1440 340 L0 340 Z" fill="#c9a26b" opacity="0.55" />
    </svg>

    <!-- front corner leaves -->
    <template v-if="showFrontLeaves">
      <div class="absolute -left-10 -bottom-6 w-[34vw] max-w-md min-w-48" data-depth="1" data-speed="0.6">
        <svg viewBox="0 0 300 300" class="w-full origin-bottom-left animate-sway">
          <g transform="translate(10 290)">
            <g v-for="(r, i) in [-70, -48, -26, -6]" :key="'lf' + i" :transform="`rotate(${r}) scale(${1.9 - i * 0.18})`">
              <path :d="LEAF" :fill="['#1f7a3a', '#2d9448', '#3fae49', '#5cc45a'][i]" />
              <path d="M4 0 L116 0" stroke="#bff0a5" stroke-width="1.6" opacity="0.6" />
            </g>
          </g>
        </svg>
      </div>
      <div class="absolute -right-10 -bottom-6 w-[30vw] max-w-sm min-w-44" data-depth="1.1" data-speed="0.7">
        <svg viewBox="0 0 300 300" class="w-full origin-bottom-right animate-sway [animation-delay:-2s]">
          <g transform="translate(290 290) scale(-1 1)">
            <g v-for="(r, i) in [-74, -50, -28, -8]" :key="'rf' + i" :transform="`rotate(${r}) scale(${1.8 - i * 0.16})`">
              <path :d="LEAF" :fill="['#1a6e34', '#278b43', '#3aa64a', '#62c95f'][i]" />
              <path d="M4 0 L116 0" stroke="#bff0a5" stroke-width="1.6" opacity="0.6" />
            </g>
          </g>
        </svg>
      </div>
      <!-- hanging vines -->
      <svg class="absolute left-[8%] top-0 h-[34%] w-24" viewBox="0 0 60 300" preserveAspectRatio="xMidYMin meet" data-depth="0.8">
        <path d="M30 0 C20 60 40 120 28 180 C20 230 34 270 30 300" stroke="#2d8a43" stroke-width="5" fill="none" />
        <path v-for="y in [50, 110, 170, 230]" :key="'v' + y" :d="`M30 ${y} c-18 -6 -26 6 -24 14 c10 2 22 -2 24 -14 z`" fill="#4cb653" />
      </svg>
      <svg class="absolute right-[14%] top-0 h-[26%] w-20" viewBox="0 0 60 300" preserveAspectRatio="xMidYMin meet" data-depth="0.7">
        <path d="M30 0 C40 70 20 140 32 210 C38 250 28 280 30 300" stroke="#2d8a43" stroke-width="5" fill="none" />
        <path v-for="y in [70, 140, 210]" :key="'w' + y" :d="`M30 ${y} c18 -6 26 6 24 14 c-10 2 -22 -2 -24 -14 z`" fill="#4cb653" />
      </svg>
    </template>
  </div>
</template>
