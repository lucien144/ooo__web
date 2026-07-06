<script setup lang="ts">
import logoLight from '@/assets/logo.svg'
import logoDark from '@/assets/logo-dark.svg'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
</script>

<template>
  <main class="flex min-h-svh items-center justify-center p-6">
    <section
      class="sticker-card flex w-full max-w-xl flex-col items-center px-8 py-12 text-center sm:px-12"
    >
      <img
        :src="theme.isDark ? logoDark : logoLight"
        alt="OOO logo"
        class="hero-logo h-40 w-auto sm:h-52"
      />
      <h1 class="mt-8 text-4xl font-bold sm:text-5xl">👋 Hey, I'm OOO.</h1>
      <p class="mt-3 text-xl text-muted-foreground sm:text-2xl">
        Your team's time off, sorted.
      </p>
      <p class="mt-6 max-w-md text-muted-foreground">
        Time-off requests, approvals, allowances and carryover — all in one
        place, without the spreadsheets and back-and-forth.
      </p>
      <a
        href="https://ooo.app"
        class="mt-8 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        Open the app
      </a>
    </section>
  </main>
</template>

<style scoped>
/* Pop keyframes match the app's auth-logo-pop (src/index.css in ../ooo). */
@keyframes logo-pop {
  0% {
    transform: translateY(-7px) scale(0.94) rotate(-3deg);
    opacity: 0;
  }
  60% {
    transform: translateY(2px) scale(1.02) rotate(1deg);
  }
  100% {
    transform: translateY(0) scale(1) rotate(0);
    opacity: 1;
  }
}
@keyframes logo-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
@keyframes logo-wiggle {
  0%,
  100% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
}
.hero-logo {
  animation:
    logo-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both,
    logo-float 4s ease-in-out 0.6s infinite;
}
.hero-logo:hover {
  animation: logo-wiggle 0.45s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .hero-logo,
  .hero-logo:hover {
    animation: none;
  }
}
</style>
