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
    viewBox="0 0 200 220"
    xmlns="http://www.w3.org/2000/svg"
    :class="{ 'is-walking': walking }"
    role="img"
    aria-label="Chinni, a cute brown squirrel with a fluffy tail"
  >
    <defs>
      <radialGradient :id="g('fur')" cx="40%" cy="30%" r="80%">
        <stop offset="0%" stop-color="#e3a46b" />
        <stop offset="60%" stop-color="#b8743f" />
        <stop offset="100%" stop-color="#7f4a22" />
      </radialGradient>
      <linearGradient :id="g('tail')" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#d99a5c" />
        <stop offset="100%" stop-color="#8a5228" />
      </linearGradient>
    </defs>

    <ellipse cx="96" cy="212" rx="48" ry="6" fill="#000" opacity="0.14" />

    <g class="char-body">
      <!-- fluffy tail -->
      <g class="char-tail">
        <path
          d="M128 196 C178 196 196 150 180 110 C168 78 186 46 160 26 C138 10 112 30 128 54 C140 74 120 96 132 120 C144 146 112 168 128 196 Z"
          :fill="`url(#${g('tail')})`"
        />
        <path d="M160 40 C150 60 168 86 160 110" stroke="#f0c08f" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.7" />
      </g>

      <!-- feet -->
      <g class="char-leg-a"><ellipse cx="74" cy="204" rx="16" ry="8" fill="#7f4a22" /></g>
      <g class="char-leg-b"><ellipse cx="114" cy="204" rx="16" ry="8" fill="#7f4a22" /></g>

      <!-- body -->
      <ellipse cx="94" cy="160" rx="40" ry="46" :fill="`url(#${g('fur')})`" />
      <ellipse cx="94" cy="168" rx="24" ry="32" fill="#f6dcb8" />

      <!-- arms holding acorn -->
      <ellipse cx="70" cy="150" rx="10" ry="16" :fill="`url(#${g('fur')})`" transform="rotate(30 70 150)" />
      <g :class="{ 'origin-[118px_140px] animate-wave': waving }" style="transform-box: view-box">
        <ellipse
          cx="118"
          cy="150"
          rx="10"
          ry="16"
          :fill="`url(#${g('fur')})`"
          :transform="waving ? 'rotate(-150 118 140)' : 'rotate(-30 118 150)'"
        />
      </g>
      <g v-if="!waving">
        <ellipse cx="94" cy="150" rx="11" ry="13" fill="#a0612f" />
        <path d="M82 144 q12 -12 24 0 z" fill="#5d3a1a" />
        <rect x="92" y="130" width="4" height="8" rx="2" fill="#5d3a1a" />
      </g>

      <!-- ears -->
      <path d="M54 66 L60 28 L82 56 Z" :fill="`url(#${g('fur')})`" />
      <path d="M60 58 L62 38 L74 54 Z" fill="#f6a6b8" />
      <path d="M134 66 L128 28 L106 56 Z" :fill="`url(#${g('fur')})`" />
      <path d="M128 58 L126 38 L114 54 Z" fill="#f6a6b8" />

      <!-- head -->
      <ellipse cx="94" cy="88" rx="46" ry="42" :fill="`url(#${g('fur')})`" />
      <ellipse cx="94" cy="104" rx="28" ry="20" fill="#f6dcb8" />

      <!-- cheeks -->
      <ellipse cx="62" cy="104" rx="8" ry="5" fill="#ff8fab" opacity="0.55" />
      <ellipse cx="126" cy="104" rx="8" ry="5" fill="#ff8fab" opacity="0.55" />

      <!-- eyes -->
      <g class="char-blink">
        <ellipse cx="76" cy="84" rx="10" ry="13" fill="#fff" />
        <ellipse cx="112" cy="84" rx="10" ry="13" fill="#fff" />
        <ellipse cx="78" cy="87" rx="7" ry="9" fill="#1b2440" />
        <ellipse cx="110" cy="87" rx="7" ry="9" fill="#1b2440" />
        <circle cx="80" cy="82" r="3" fill="#fff" />
        <circle cx="112" cy="82" r="3" fill="#fff" />
      </g>

      <!-- nose, mouth, teeth -->
      <ellipse cx="94" cy="98" rx="6" ry="4.5" fill="#5d3a1a" />
      <path d="M86 106 q8 7 16 0" stroke="#5d3a1a" stroke-width="2.6" fill="none" stroke-linecap="round" />
      <rect x="90.5" y="108" width="7" height="7" rx="1.5" fill="#fff" stroke="#e7d6c0" stroke-width="0.8" />
      <!-- whiskers -->
      <path d="M58 98 l-14 -3 M58 104 l-14 2 M130 98 l14 -3 M130 104 l14 2" stroke="#7f4a22" stroke-width="1.6" stroke-linecap="round" />
    </g>
  </svg>
</template>
