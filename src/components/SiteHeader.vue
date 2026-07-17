<script setup lang="ts">
import logoLight from '@/assets/logo.svg'
import logoDark from '@/assets/logo-dark.svg'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useThemeStore } from '@/stores/theme'
import { APP_URL, CHANGELOG_URL, ROADMAP_URL } from '@/lib/links'

const theme = useThemeStore()
</script>

<template>
  <header
    class="sticky top-0 z-20 border-b-2 border-(--ink) bg-background/90 backdrop-blur"
  >
    <div
      class="mx-auto grid h-14 max-w-5xl grid-cols-[1fr_auto_1fr] items-center px-6"
    >
      <a
        href="#top"
        aria-label="OOO — back to top"
        class="flex items-center gap-2 justify-self-start"
      >
        <img
          :src="theme.isDark ? logoDark : logoLight"
          alt="OOO logo"
          class="h-8 w-auto"
        />
        <span
          class="-rotate-3 rounded-md border border-(--ink) px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted-foreground"
        >
          beta
        </span>
      </a>

      <nav
        class="hidden items-center gap-6 font-mono text-sm text-muted-foreground md:flex"
        aria-label="Main"
      >
        <a href="#features" class="transition-colors hover:text-foreground">
          features
        </a>
        <a href="#faq" class="transition-colors hover:text-foreground">
          faq
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

      <div class="flex items-center gap-3 justify-self-end">
        <ThemeToggle />
        <a
          :href="APP_URL"
          class="rounded-lg border-2 border-(--ink) bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-[2px_2px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5"
        >
          Open the app
        </a>
      </div>
    </div>
  </header>
</template>
