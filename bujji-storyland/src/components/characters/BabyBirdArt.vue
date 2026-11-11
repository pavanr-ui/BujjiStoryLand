<script setup>
import { useId } from 'vue'

defineProps({
  walking: { type: Boolean, default: false },
  waving: { type: Boolean, default: false },
  sad: { type: Boolean, default: false },
})

const uid = useId()
const g = (name) => `${uid}-${name}`
</script>

<template>
  <svg
    viewBox="0 0 140 140"
    xmlns="http://www.w3.org/2000/svg"
    :class="{ 'is-walking': walking }"
    role="img"
    aria-label="Baby Bird, a fluffy little yellow chick"
  >
    <defs>
      <radialGradient :id="g('fluff')" cx="40%" cy="30%" r="75%">
        <stop offset="0%" stop-color="#fff6b8" />
        <stop offset="55%" stop-color="#ffd43b" />
        <stop offset="100%" stop-color="#f0a800" />
      </radialGradient>
    </defs>

    <ellipse cx="70" cy="132" rx="34" ry="5" fill="#000" opacity="0.14" />

    <g class="char-body">
      <!-- feet -->
      <g class="char-leg-a"><path d="M58 116 l0 12 m-6 0 l12 0" stroke="#ff9f1c" stroke-width="4" stroke-linecap="round" /></g>
      <g class="char-leg-b"><path d="M82 116 l0 12 m-6 0 l12 0" stroke="#ff9f1c" stroke-width="4" stroke-linecap="round" /></g>

      <!-- wings -->
      <g class="char-wing">
        <ellipse cx="24" cy="80" rx="14" ry="22" fill="#f5b700" transform="rotate(30 24 80)" />
      </g>
      <g class="char-wing" style="animation-direction: reverse">
        <ellipse cx="116" cy="80" rx="14" ry="22" fill="#f5b700" transform="rotate(-30 116 80)" />
      </g>

      <!-- body -->
      <circle cx="70" cy="74" r="46" :fill="`url(#${g('fluff')})`" />
      <!-- head tuft -->
      <path d="M64 30 q-2 -16 8 -20 M72 30 q6 -14 16 -12" stroke="#f0a800" stroke-width="4" fill="none" stroke-linecap="round" />

      <!-- cheeks -->
      <ellipse cx="44" cy="86" rx="7" ry="4.5" fill="#ff8fab" opacity="0.6" />
      <ellipse cx="96" cy="86" rx="7" ry="4.5" fill="#ff8fab" opacity="0.6" />

      <!-- eyes -->
      <g class="char-blink">
        <ellipse cx="54" cy="68" rx="8" ry="10" fill="#1b2440" />
        <ellipse cx="86" cy="68" rx="8" ry="10" fill="#1b2440" />
        <circle cx="57" cy="64" r="3" fill="#fff" />
        <circle cx="89" cy="64" r="3" fill="#fff" />
      </g>
      <template v-if="sad">
        <path d="M44 54 q8 4 16 0" stroke="#c98a00" stroke-width="2.5" fill="none" stroke-linecap="round" transform="rotate(-12 52 54)" />
        <path d="M80 54 q8 4 16 0" stroke="#c98a00" stroke-width="2.5" fill="none" stroke-linecap="round" transform="rotate(12 88 54)" />
        <path d="M48 80 q-2 8 0 12 q4 -4 0 -12" fill="#7cc6ff" />
      </template>

      <!-- beak -->
      <path d="M62 80 L78 80 L70 94 Z" fill="#ff9f1c" />
      <path d="M62 80 L78 80 L70 86 Z" fill="#ffb84d" />
    </g>
  </svg>
</template>
