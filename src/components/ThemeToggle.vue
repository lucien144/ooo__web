<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
</script>

<template>
  <button
    type="button"
    class="fixed top-4 right-4 z-10 flex size-10 items-center justify-center rounded-lg border-2 border-(--ink) bg-card text-lg shadow-[2px_2px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5"
    :aria-label="theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="theme.toggle()"
  >
    <span aria-hidden="true">{{ theme.isDark ? '🌙' : '☀️' }}</span>
  </button>
</template>
