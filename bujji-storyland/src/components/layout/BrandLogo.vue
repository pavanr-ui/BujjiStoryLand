<script setup>
defineProps({
  light: { type: Boolean, default: false },
})
</script>

<template>
  <span class="group inline-flex items-center gap-3">
    <span class="relative grid h-12 w-12 place-items-center transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
      <img src="/favicon.svg" alt="" class="h-full w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.2)]" width="48" height="48" />
    </span>
    <span class="flex flex-col leading-none">
      <span class="font-display text-2xl font-extrabold tracking-tight" :class="light ? 'text-white' : 'text-jungle-900'">
        Bujji <span class="text-sun">Story</span>land
      </span>
      <span class="font-display text-xs font-semibold" :class="light ? 'text-white/60' : 'text-jungle-700/70'">బుజ్జి స్టోరీల్యాండ్</span>
    </span>
  </span>
</template>
