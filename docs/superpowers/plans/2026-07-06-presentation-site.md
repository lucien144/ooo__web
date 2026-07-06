# OOO Presentation Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A one-page marketing site for the OOO app — animated logo, one-line pitch, CTA to https://ooo.app — styled with the shared `theme.css` export.

**Architecture:** Existing Vue 3 + Vite + Tailwind 4 scaffold kept as-is (vue-router with a single `/` route, pinia retained). The shared theme is a verbatim copy of `../ooo/exports/theme.css`; all site-specific CSS (logo animation) lives in a scoped block in `HomeView.vue` so the theme file stays re-syncable. Dark mode = `.dark` class on `<html>`, resolved pre-paint by an inline script, toggled via a small pinia store.

**Tech Stack:** Vue 3.5 (script setup + TS), Vite 8, Tailwind CSS 4 (Vite plugin), pinia, vue-router.

**Spec:** `docs/superpowers/specs/2026-07-06-presentation-site-design.md`

## Global Constraints

- All copy in English. Code/comments in English.
- App link target is exactly `https://ooo.app`.
- `src/theme.css` must remain a byte-identical copy of `../ooo/exports/theme.css` — never edit it; put local CSS elsewhere.
- Dark mode: auto via `prefers-color-scheme`, manual override persisted in `localStorage` under key `ooo-theme`, applied as `.dark` on `<html>`.
- All logo animations disabled under `prefers-reduced-motion: reduce`.
- No unit tests (spec: static content, YAGNI). Each task verifies via `pnpm type-check` / `pnpm build` / dev-server visual check instead of TDD cycles.
- Source project for assets/theme: `/Users/janblasko/htdocs/github.com/ooo`. This repo: `/Users/janblasko/htdocs/github.com/ooo__web`.
- Commit steps assume the repo is git-initialized and the user has approved committing; otherwise skip commit steps and say so in the report.

---

### Task 1: Shared theme, fonts, and assets

**Files:**
- Create: `src/theme.css` (copy of `../ooo/exports/theme.css`)
- Create: `src/assets/logo.svg`, `src/assets/logo-dark.svg` (copies from `../ooo/src/assets/`)
- Create: `public/favicon.svg`, `public/favicon-dark.svg` (copies from `../ooo/public/`)
- Delete: `src/style.css`, `public/favicon.ico`
- Modify: `src/main.ts` (import theme)
- Modify: `index.html` (full rewrite: lang, title, meta, favicons, fonts, pre-paint theme script, drop style.css link)

**Interfaces:**
- Consumes: nothing (first task).
- Produces: Tailwind utilities wired to OOO tokens (`bg-background`, `text-muted-foreground`, `bg-primary`, `.sticker-card`, `--ink` var); `@/assets/logo.svg` and `@/assets/logo-dark.svg` importable as URL strings; `<html>` gets `.dark` pre-paint from `localStorage['ooo-theme']` or system preference.

- [ ] **Step 1: Copy theme and assets**

```bash
cp ../ooo/exports/theme.css src/theme.css
mkdir -p src/assets
cp ../ooo/src/assets/logo.svg ../ooo/src/assets/logo-dark.svg src/assets/
cp ../ooo/public/favicon.svg ../ooo/public/favicon-dark.svg public/
rm src/style.css public/favicon.ico
```

(`src/assets/` does not exist yet in this scaffold, hence the `mkdir -p`.)

- [ ] **Step 2: Import theme in `src/main.ts`**

Replace the whole file with:

```ts
import './theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

- [ ] **Step 3: Rewrite `index.html`**

Replace the whole file with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OOO — Your team's time off, sorted.</title>
    <meta name="description" content="Time-off requests, approvals, allowances and carryover — all in one place, without the spreadsheets and back-and-forth.">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/favicon-dark.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <script>
      const stored = localStorage.getItem('ooo-theme')
      document.documentElement.classList.toggle(
        'dark',
        stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches,
      )
    </script>
</head>
<body>
<div id="app"></div>
<script type="module" src="/src/main.ts"></script>
</body>
</html>
```

Notes: the inline script runs before first paint so there is no light/dark flash. The `style.css` `<link>` is gone — the theme now loads through `main.ts`.

- [ ] **Step 4: Verify**

Run: `pnpm type-check && pnpm build`
Expected: both PASS (build emits `dist/`).

Run: `diff src/theme.css ../ooo/exports/theme.css`
Expected: no output (byte-identical).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add shared OOO theme, fonts, and brand assets"
```

---

### Task 2: Theme store and toggle

**Files:**
- Create: `src/stores/theme.ts`
- Create: `src/components/ThemeToggle.vue`
- Delete: `src/stores/counter.ts`
- Modify: `src/App.vue` (mount ThemeToggle + RouterView)

**Interfaces:**
- Consumes: `.dark` class pre-applied on `<html>` by the `index.html` inline script (Task 1); `localStorage` key `ooo-theme`.
- Produces: `useThemeStore()` from `@/stores/theme` exposing `isDark: Ref<boolean>` and `toggle(): void`; `ThemeToggle.vue` (no props); `App.vue` renders `<ThemeToggle />` + `<RouterView />` so Task 3 only needs to register a route.

- [ ] **Step 1: Create `src/stores/theme.ts`**

```ts
import { ref } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'ooo-theme'

export const useThemeStore = defineStore('theme', () => {
  // index.html applies the initial .dark class pre-paint; the store adopts it.
  const isDark = ref(document.documentElement.classList.contains('dark'))

  function toggle() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  }

  return { isDark, toggle }
})
```

- [ ] **Step 2: Delete the demo counter store**

```bash
rm src/stores/counter.ts
```

- [ ] **Step 3: Create `src/components/ThemeToggle.vue`**

```vue
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
```

(`border-(--ink)` is Tailwind 4 CSS-variable shorthand; `--ink` comes from the theme.)

- [ ] **Step 4: Rewrite `src/App.vue`**

```vue
<script setup lang="ts">
import { RouterView } from 'vue-router'
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<template>
  <ThemeToggle />
  <RouterView />
</template>
```

- [ ] **Step 5: Verify**

Run: `pnpm type-check && pnpm build`
Expected: both PASS.

Run: `pnpm dev` (background), open http://localhost:5173
Expected: cream (or espresso, per system theme) background, sun/moon button top-right; clicking it flips theme instantly; reload keeps the chosen theme; `localStorage['ooo-theme']` holds `'dark'` or `'light'` after a click. Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add theme store and dark-mode toggle"
```

---

### Task 3: Hero page with animated logo

**Files:**
- Create: `src/views/HomeView.vue`
- Modify: `src/router/index.ts` (register `/` route)

**Interfaces:**
- Consumes: `useThemeStore()` (`isDark`) from Task 2; `@/assets/logo.svg`, `@/assets/logo-dark.svg`, `.sticker-card`, token utilities from Task 1.
- Produces: the finished page; nothing downstream.

- [ ] **Step 1: Create `src/views/HomeView.vue`**

```vue
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
```

- [ ] **Step 2: Register the route in `src/router/index.ts`**

Replace the whole file with:

```ts
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', name: 'home', component: HomeView }],
})

export default router
```

(Static import — one page, code-splitting would only add a request.)

- [ ] **Step 3: Verify**

Run: `pnpm type-check && pnpm build`
Expected: both PASS.

Run: `pnpm dev` (background), open http://localhost:5173
Expected: sticker card with logo popping in then gently floating; wiggle on hover; headline/tagline/description as written; “Open the app” links to https://ooo.app; dark toggle swaps background and logo variant. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add hero page with animated logo and app CTA"
```

---

### Task 4: Final verification

**Files:**
- Modify: none (fix-ups only if checks fail).

**Interfaces:**
- Consumes: everything above.
- Produces: green build; done.

- [ ] **Step 1: Run the full check suite**

Run: `pnpm lint && pnpm type-check && pnpm build`
Expected: all PASS (lint may auto-fix formatting; if it changes files, re-run until clean).

- [ ] **Step 2: Manual visual checklist** (`pnpm dev`, browser)

- Light mode: cream background, ink text, emerald CTA.
- Dark mode (toggle + system): espresso background, dark logo variant, favicon still visible.
- Reload after toggling: theme persists, no flash of the wrong theme.
- OS “reduce motion” enabled: logo static, no animations.
- Narrow viewport (~375px): card fits, no horizontal scroll.

- [ ] **Step 3: Commit any fix-ups**

```bash
git add -A
git commit -m "chore: lint and visual-check fix-ups"
```

(Skip if the working tree is clean.)
