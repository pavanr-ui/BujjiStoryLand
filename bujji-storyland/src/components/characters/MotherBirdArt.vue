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
    viewBox="0 0 220 200"
    xmlns="http://www.w3.org/2000/svg"
    :class="{ 'is-walking': walking }"
    role="img"
    aria-label="Mother Bird, a graceful blue and white bird"
  >
    <defs>
      <radialGradient :id="g('feather')" cx="40%" cy="30%" r="80%">
        <stop offset="0%" stop-color="#8cc4ff" />
        <stop offset="55%" stop-color="#3d8ee0" />
        <stop offset="100%" stop-color="#215f9f" />
      </radialGradient>
    </defs>

    <ellipse cx="110" cy="192" rx="54" ry="6" fill="#000" opacity="0.12" />

    <g class="char-body">
      <!-- tail feathers -->
      <path d="M150 128 L206 112 L196 132 L212 140 L160 150 Z" :fill="`url(#${g('feather')})`" />
      <path d="M170 128 L204 122" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.8" />

      <!-- feet -->
      <g class="char-leg-a"><path d="M96 162 l-2 22 m-8 2 l16 0" stroke="#ff9f1c" stroke-width="5" stroke-linecap="round" /></g>
      <g class="char-leg-b"><path d="M122 162 l2 22 m-8 2 l16 0" stroke="#ff9f1c" stroke-width="5" stroke-linecap="round" /></g>

      <!-- body -->
      <ellipse cx="110" cy="122" rx="56" ry="46" :fill="`url(#${g('feather')})`" />
      <ellipse cx="102" cy="134" rx="36" ry="30" fill="#ffffff" />

      <!-- back wing (open, flaps) -->
      <g class="char-wing" style="animation-duration: 1.6s">
        <path
          d="M140 104 C176 70 210 76 214 96 C196 96 190 108 172 112 C186 114 184 126 166 128 C156 128 146 120 140 104 Z"
          :fill="`url(#${g('feather')})`"
        />
        <path d="M176 92 C190 88 204 92 210 96 M168 110 C178 110 186 114 182 120" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.9" />
      </g>
      <!-- front wing -->
      <path d="M58 112 C44 132 52 156 80 158 C74 142 76 128 86 116 Z" fill="#2d78c4" />
      <path d="M58 136 C62 148 70 154 80 156" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" />

      <!-- head -->
      <circle cx="96" cy="66" r="38" :fill="`url(#${g('feather')})`" />
      <ellipse cx="92" cy="80" rx="24" ry="18" fill="#fff" />
      <!-- crest -->
      <path d="M92 30 q-4 -20 8 -24 q-2 12 6 18 q4 -12 16 -10 q-8 8 -8 18" :fill="`url(#${g('feather')})`" />

      <!-- cheeks -->
      <ellipse cx="72" cy="80" rx="7" ry="4.5" fill="#ff8fab" opacity="0.55" />
      <ellipse cx="116" cy="80" rx="7" ry="4.5" fill="#ff8fab" opacity="0.55" />

      <!-- eyes (gentle, with lashes) -->
      <g class="char-blink">
        <ellipse cx="80" cy="62" rx="8" ry="10" fill="#1b2440" />
        <ellipse cx="110" cy="62" rx="8" ry="10" fill="#1b2440" />
        <circle cx="83" cy="58" r="3" fill="#fff" />
        <circle cx="113" cy="58" r="3" fill="#fff" />
      </g>
      <path d="M72 52 l-5 -4 M76 50 l-3 -5 M118 52 l5 -4 M114 50 l3 -5" stroke="#1b2440" stroke-width="2" stroke-linecap="round" />

      <!-- beak -->
      <path d="M88 72 L104 72 L96 86 Z" fill="#ff9f1c" />
      <path d="M88 72 L104 72 L96 77 Z" fill="#ffb84d" />
    </g>
  </svg>
</template>
