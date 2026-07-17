<script setup lang="ts">
import logoLight from '@/assets/logo.svg'
import logoDark from '@/assets/logo-dark.svg'
import { useThemeStore } from '@/stores/theme'
import { APP_URL, CHANGELOG_URL, ROADMAP_URL } from '@/lib/links'

const theme = useThemeStore()
</script>

<template>
  <footer class="border-t-2 border-(--ink)">
    <div
      class="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex items-center gap-4">
        <img
          :src="theme.isDark ? logoDark : logoLight"
          alt="OOO logo"
          class="h-10 w-auto"
        />
        <p class="font-mono text-sm text-muted-foreground">
          // out of office, sorted.
        </p>
      </div>

      <nav
        class="flex items-center gap-6 font-mono text-sm text-muted-foreground"
        aria-label="Footer"
      >
        <a :href="APP_URL" class="transition-colors hover:text-foreground">
          app
        </a>
        <a :href="ROADMAP_URL" class="transition-colors hover:text-foreground">
          roadmap
        </a>
        <a
          :href="CHANGELOG_URL"
          class="transition-colors hover:text-foreground"
        >
          changelog
        </a>
      </nav>
    </div>

    <p
      class="mx-auto max-w-5xl px-6 pb-8 font-mono text-xs text-muted-foreground"
    >
      © {{ new Date().getFullYear() }} OOO — and yes, you say it "TrippleO".
    </p>
  </footer>
</template>
