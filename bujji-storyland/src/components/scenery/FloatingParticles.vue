<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Lightweight 2D-canvas glowing particles (pollen / fireflies).
 * - Pauses when offscreen (IntersectionObserver) or tab hidden.
 * - Fewer particles on small screens; static frame for reduced motion.
 */
const props = defineProps({
  count: { type: Number, default: 46 },
  colors: { type: Array, default: () => ['#fff6c9', '#ffe27a', '#d9ff9e', '#ffffff'] },
})

const canvas = ref(null)
let ctx, raf, particles = [], w = 0, h = 0, dpr = 1, visible = true, observer, ro

function resize() {
  const el = canvas.value
  if (!el) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = el.clientWidth
  h = el.clientHeight
  el.width = w * dpr
  el.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function spawn() {
  const small = window.innerWidth < 768
  const n = Math.round(props.count * (small ? 0.45 : 1))
  particles = Array.from({ length: n }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 1.2 + Math.random() * 3.2,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -0.15 - Math.random() * 0.35,
    phase: Math.random() * Math.PI * 2,
    color: props.colors[Math.floor(Math.random() * props.colors.length)],
  }))
}

function draw(t = 0) {
  ctx.clearRect(0, 0, w, h)
  for (const p of particles) {
    const tw = 0.55 + 0.45 * Math.sin(t * 0.002 + p.phase)
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
    g.addColorStop(0, p.color)
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.globalAlpha = tw
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

function step(t) {
  if (visible && !document.hidden) {
    for (const p of particles) {
      p.x += p.vx + Math.sin(t * 0.001 + p.phase) * 0.2
      p.y += p.vy
      if (p.y < -12) { p.y = h + 12; p.x = Math.random() * w }
      if (p.x < -12) p.x = w + 12
      if (p.x > w + 12) p.x = -12
    }
    draw(t)
  }
  raf = requestAnimationFrame(step)
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resize()
  spawn()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    draw(0)
    return
  }
  observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
  observer.observe(canvas.value)
  ro = new ResizeObserver(() => { resize(); spawn() })
  ro.observe(canvas.value)
  raf = requestAnimationFrame(step)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  observer?.disconnect()
  ro?.disconnect()
})
</script>

<template>
  <canvas ref="canvas" class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
</template>
