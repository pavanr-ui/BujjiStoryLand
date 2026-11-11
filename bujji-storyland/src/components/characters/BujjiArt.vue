<script setup>
import { useId } from 'vue'

defineProps({
  walking: { type: Boolean, default: false },
  waving: { type: Boolean, default: false },
})

const uid = useId()
const g = (name) => `${uid}-${name}`
</script>

<template>
  <svg
    viewBox="0 0 220 240"
    xmlns="http://www.w3.org/2000/svg"
    :class="{ 'is-walking': walking }"
    role="img"
    aria-label="Bujji, a cute blue baby elephant with a red backpack"
  >
    <defs>
      <radialGradient :id="g('skin')" cx="40%" cy="30%" r="75%">
        <stop offset="0%" stop-color="#8cc0ff" />
        <stop offset="55%" stop-color="#4a8fe7" />
        <stop offset="100%" stop-color="#2f6fc6" />
      </radialGradient>
      <radialGradient :id="g('belly')" cx="50%" cy="35%" r="70%">
        <stop offset="0%" stop-color="#cfe4ff" />
        <stop offset="100%" stop-color="#8fbaf2" />
      </radialGradient>
      <linearGradient :id="g('bag')" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ff6b5c" />
        <stop offset="100%" stop-color="#c7322a" />
      </linearGradient>
      <radialGradient :id="g('ear')" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#ffc2cf" />
        <stop offset="100%" stop-color="#f08aa3" />
      </radialGradient>
    </defs>

    <!-- ground shadow -->
    <ellipse cx="110" cy="230" rx="62" ry="8" fill="#000" opacity="0.14" />

    <g class="char-body">
      <!-- backpack (behind body) -->
      <rect x="44" y="118" width="132" height="84" rx="30" :fill="`url(#${g('bag')})`" />
      <rect x="92" y="108" width="36" height="16" rx="8" fill="#a8261f" />

      <!-- legs -->
      <g class="char-leg-a">
        <rect x="72" y="178" width="30" height="48" rx="14" :fill="`url(#${g('skin')})`" />
        <ellipse cx="87" cy="222" rx="13" ry="5" fill="#dbe9ff" />
      </g>
      <g class="char-leg-b">
        <rect x="118" y="178" width="30" height="48" rx="14" :fill="`url(#${g('skin')})`" />
        <ellipse cx="133" cy="222" rx="13" ry="5" fill="#dbe9ff" />
      </g>

      <!-- body -->
      <ellipse cx="110" cy="168" rx="50" ry="44" :fill="`url(#${g('skin')})`" />
      <ellipse cx="110" cy="176" rx="32" ry="28" :fill="`url(#${g('belly')})`" />

      <!-- backpack straps -->
      <path d="M78 132 Q72 160 80 190" stroke="#d93a2f" stroke-width="9" fill="none" stroke-linecap="round" />
      <path d="M142 132 Q148 160 140 190" stroke="#d93a2f" stroke-width="9" fill="none" stroke-linecap="round" />
      <circle cx="79" cy="160" r="4" fill="#ffd43b" />
      <circle cx="141" cy="160" r="4" fill="#ffd43b" />

      <!-- left arm -->
      <ellipse cx="62" cy="168" rx="13" ry="22" :fill="`url(#${g('skin')})`" transform="rotate(18 62 168)" />
      <!-- right arm (waves) -->
      <g :class="{ 'origin-[158px_152px] animate-wave': waving }" style="transform-box: view-box">
        <ellipse
          cx="158"
          cy="168"
          rx="13"
          ry="22"
          :fill="`url(#${g('skin')})`"
          :transform="waving ? 'rotate(-140 158 152)' : 'rotate(-18 158 168)'"
        />
      </g>

      <!-- ears -->
      <g class="char-ear-l">
        <ellipse cx="52" cy="92" rx="40" ry="44" :fill="`url(#${g('skin')})`" />
        <ellipse cx="55" cy="94" rx="26" ry="30" :fill="`url(#${g('ear')})`" />
      </g>
      <g class="char-ear-r">
        <ellipse cx="168" cy="92" rx="40" ry="44" :fill="`url(#${g('skin')})`" />
        <ellipse cx="165" cy="94" rx="26" ry="30" :fill="`url(#${g('ear')})`" />
      </g>

      <!-- head -->
      <circle cx="110" cy="88" r="52" :fill="`url(#${g('skin')})`" />
      <!-- hair tuft -->
      <path d="M100 38 q6 -16 14 -2 q6 -12 12 2" stroke="#2f6fc6" stroke-width="5" fill="none" stroke-linecap="round" />

      <!-- cheeks -->
      <ellipse cx="78" cy="106" rx="10" ry="6" fill="#ff8fab" opacity="0.55" />
      <ellipse cx="142" cy="106" rx="10" ry="6" fill="#ff8fab" opacity="0.55" />

      <!-- eyes -->
      <g class="char-blink">
        <ellipse cx="90" cy="84" rx="12" ry="15" fill="#fff" />
        <ellipse cx="130" cy="84" rx="12" ry="15" fill="#fff" />
        <ellipse cx="92" cy="87" rx="8" ry="10" fill="#1b2440" />
        <ellipse cx="128" cy="87" rx="8" ry="10" fill="#1b2440" />
        <circle cx="95" cy="82" r="3.4" fill="#fff" />
        <circle cx="131" cy="82" r="3.4" fill="#fff" />
        <circle cx="89" cy="92" r="1.6" fill="#fff" opacity="0.8" />
        <circle cx="125" cy="92" r="1.6" fill="#fff" opacity="0.8" />
      </g>
      <!-- eyebrows -->
      <path d="M80 64 q10 -6 20 0" stroke="#2f6fc6" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <path d="M120 64 q10 -6 20 0" stroke="#2f6fc6" stroke-width="3.5" fill="none" stroke-linecap="round" />

      <!-- smile -->
      <path d="M92 116 q8 8 14 2" stroke="#1b2440" stroke-width="3" fill="none" stroke-linecap="round" />

      <!-- trunk -->
      <g class="char-trunk">
        <path
          d="M110 100 Q112 128 122 140 Q132 150 140 140"
          :stroke="`url(#${g('skin')})`"
          stroke-width="19"
          fill="none"
          stroke-linecap="round"
        />
        <path d="M108 112 q6 2 10 0 M112 124 q6 2 10 -1" stroke="#2f6fc6" stroke-width="2" fill="none" opacity="0.6" />
        <ellipse cx="141" cy="139" rx="6" ry="4" fill="#2f6fc6" opacity="0.5" />
      </g>
    </g>
  </svg>
</template>
