# OOO Presentation Site — Design

**Date:** 2026-07-06
**Status:** Approved

## Goal

A minimal one-page marketing site for the OOO app (`../ooo`). It shows the
animated logo, says what the service is, and links to the live app at
`https://ooo.app`. Nothing else.

## Constraints & decisions

- **Language:** English (consistent with the app's copy).
- **Stack:** Keep the existing scaffold as-is — Vue 3 + Vite + Tailwind 4,
  with vue-router and pinia retained for future growth (single `/` route now).
- **Theme:** Use the shared export `../ooo/exports/theme.css` verbatim
  (cream/ink "paper" palette, emerald primary, sticker surfaces).
- **Dark mode:** Auto via `prefers-color-scheme` by default, plus a manual
  toggle; explicit choice persisted in `localStorage`. Toggling adds/removes
  `.dark` on `<html>`.
- **Logo animation:** Pop-in on load (reuse `auth-logo-pop` keyframes from the
  app), then a subtle infinite idle float, wiggle on hover.
  `prefers-reduced-motion: reduce` disables all of it.

## Architecture

- `src/theme.css` — copy of `../ooo/exports/theme.css`; imported once in
  `src/main.ts` (replaces the current `style.css` import). It already does
  `@import "tailwindcss"`.
- `index.html` — add Google Fonts links for Hanken Grotesk + JetBrains Mono
  (per `exports/README.md`), set title and meta description, and an inline
  pre-paint script that applies `.dark` from `localStorage` /
  `prefers-color-scheme` to avoid a flash of wrong theme.
- Assets copied from the app:
  - `src/assets/logo.svg`, `src/assets/logo-dark.svg`
  - `public/favicon.svg`, `public/favicon-dark.svg` (replace `favicon.ico`)
- Router keeps a single route `/` → `HomeView.vue`.
- Pinia stays wired; delete the demo `stores/counter.ts` and add
  `stores/theme.ts` (`useThemeStore`).

## Components

- **`views/HomeView.vue`** — single viewport-height hero on the cream
  background, content in a sticker card:
  - animated logo (dark variant swapped in dark mode)
  - headline: “👋 Hey, I'm OOO.”
  - tagline: “Your team's time off, sorted.”
  - 1–2 sentence description: time-off requests, approvals, allowances &
    carryover — without the spreadsheets/back-and-forth
  - CTA button “Open the app” → `https://ooo.app` (primary/emerald)
- **`components/ThemeToggle.vue`** — sun/moon button fixed in a top corner;
  reads/writes `useThemeStore`.
- **`stores/theme.ts`** — resolves initial theme (localStorage override →
  system preference), exposes `toggle()`, syncs the `.dark` class on `<html>`
  and persists explicit choices.
- Logo animation CSS lives in a scoped style block in `HomeView.vue` (keeps
  `theme.css` a pristine copy of the export, re-syncable anytime):
  `auth-logo-pop` keyframes + new `float` keyframes + hover `wiggle`, all
  wrapped by a `prefers-reduced-motion` guard.

## Content / meta

- `<title>`: “OOO — Your team's time off, sorted.”
- Meta description matching the hero copy.

## Error handling

Static page — no runtime data, no error states. External link opens the app
directly.

## Verification

- `pnpm lint`, `pnpm type-check`, `pnpm build` all pass.
- Manual visual check: light, dark (auto + toggle), reduced-motion.
- No unit tests (static content, YAGNI).
