<script setup lang="ts">
import logoLight from '@/assets/logo.svg'
import logoDark from '@/assets/logo-dark.svg'
import { useThemeStore } from '@/stores/theme'
import { APP_URL, CHANGELOG_URL, ROADMAP_URL } from '@/lib/links'

const theme = useThemeStore()

const features = [
  {
    emoji: '🏖️',
    title: 'Time-off requests',
    text: 'File a request in seconds — full days or half-days, with the day count worked out for you.',
  },
  {
    emoji: '✅',
    title: 'One-click approvals',
    text: 'Approve or reject in one click. A pending-request nudge makes sure nothing slips by.',
  },
  {
    emoji: '🌍',
    title: 'Holiday-aware day counts',
    text: "Public holidays don't eat into anyone's allowance. Days off are counted around the holidays of your organisation's country — or each member's own.",
  },
  {
    emoji: '📅',
    title: 'Team calendar',
    text: "See who's away at a glance — today highlighted, public holidays shaded right in the calendar.",
  },
  {
    emoji: '🧮',
    title: 'Allowances & carryover',
    text: 'Per-type allowances with automatic carryover into next year. No spreadsheet math, ever.',
  },
  {
    emoji: '🔔',
    title: 'Browser notifications',
    text: 'Push notifications straight to your browser for approvals, rejections and new requests — as they happen.',
  },
]

const roadmap = [
  'Slack integration — request and approve leave with /ooo',
  'Calendar sync with Google & Outlook',
  'CSV / PDF exports for payroll',
  'Part-time work schedules',
  'TrippleO — the AI assistant that files leave for you',
]
</script>

<template>
  <main id="top" class="mx-auto max-w-5xl px-6">
    <!-- Hero -->
    <section class="py-16 sm:py-24">
      <div
        class="sticker-card grid w-full items-center justify-center gap-10 px-8 py-12 md:grid-cols-[auto_auto] md:gap-16 md:px-14"
      >
        <img
          :src="theme.isDark ? logoDark : logoLight"
          alt="OOO logo"
          class="hero-logo h-40 w-auto justify-self-center sm:h-52 md:h-80"
        />
        <div class="text-center md:text-left">
          <h1 class="text-4xl font-bold sm:text-5xl">👋 Hey, I'm OOO.</h1>
          <p class="mt-3 text-xl text-muted-foreground sm:text-2xl">
            Your team's time off, sorted.
          </p>

          <!-- Signature: pronunciation sticky note -->
          <p
            class="pronounce-note mt-6 inline-block rounded-lg border-2 border-(--ink) bg-(--chart-3) px-4 py-2 font-mono text-sm text-[oklch(0.27_0.018_65)] shadow-[3px_3px_0_0_var(--ink)]"
          >
            /ˈtrɪpl.oʊ/ — say it "TrippleO"
          </p>

          <p class="mt-6 max-w-md text-muted-foreground max-md:mx-auto">
            Time-off requests, approvals, allowances and carryover — all in
            one place, without the spreadsheets and back-and-forth.
          </p>
          <div
            class="mt-8 flex flex-wrap items-center gap-4 max-md:justify-center"
          >
            <a
              :href="APP_URL"
              class="inline-block rounded-lg border-2 border-(--ink) bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-[3px_3px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              Open the app
            </a>
            <a
              href="#features"
              class="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              see what's inside ↓
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="scroll-mt-20 py-12 sm:py-16">
      <p class="font-mono text-sm text-primary">// what's inside</p>
      <h2 class="mt-2 text-3xl font-bold sm:text-4xl">
        Everything a small team needs. Nothing it doesn't.
      </h2>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="feature in features"
          :key="feature.title"
          class="sticker-card p-6 shadow-[3px_3px_0_0_var(--ink)] transition-transform hover:-translate-y-1"
        >
          <span class="text-3xl" aria-hidden="true">{{ feature.emoji }}</span>
          <h3 class="mt-3 text-lg font-semibold">{{ feature.title }}</h3>
          <p class="mt-2 text-sm text-muted-foreground">{{ feature.text }}</p>
        </article>
      </div>

      <p class="mt-8 font-mono text-sm text-muted-foreground">
        // also in the box: magic-link sign-in · admin &amp; member roles ·
        invites · dark mode · installable on your phone
      </p>
    </section>

    <!-- Roadmap -->
    <section class="py-12 sm:py-16">
      <div class="panel sm:p-8">
        <p class="font-mono text-sm text-primary">// on the roadmap</p>
        <h2 class="mt-2 text-2xl font-bold sm:text-3xl">
          Still getting sorted
        </h2>
        <ul class="mt-6 space-y-3">
          <li
            v-for="item in roadmap"
            :key="item"
            class="flex items-start gap-3"
          >
            <span class="font-mono text-primary" aria-hidden="true">→</span>
            <span class="text-muted-foreground">{{ item }}</span>
          </li>
        </ul>
        <div class="mt-6 flex flex-wrap gap-6 font-mono text-sm">
          <a
            :href="ROADMAP_URL"
            class="text-primary underline-offset-4 transition-colors hover:underline"
          >
            see the full roadmap →
          </a>
          <a
            :href="CHANGELOG_URL"
            class="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            or what already shipped →
          </a>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="flex flex-col items-center py-16 text-center sm:py-24">
      <h2 class="text-3xl font-bold sm:text-4xl">
        Ready to get your team sorted?
      </h2>
      <p class="mt-3 font-mono text-sm text-muted-foreground">
        // one less spreadsheet in your life
      </p>
      <a
        :href="APP_URL"
        class="mt-8 inline-block rounded-lg border-2 border-(--ink) bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-[3px_3px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5"
      >
        Open the app
      </a>
    </section>

    <!-- FAQ -->
    <section id="faq" class="scroll-mt-20 pb-16 sm:pb-24">
      <p class="font-mono text-sm text-primary">// good to know</p>
      <h2 class="mt-2 text-3xl font-bold sm:text-4xl">Questions, answered</h2>

      <div class="mt-8 space-y-3">
        <details class="group panel p-0">
          <summary class="faq-summary flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
            Who is OOO for?
            <span class="faq-marker font-mono text-lg text-primary transition-transform motion-reduce:transition-none" aria-hidden="true">+</span>
          </summary>
          <p class="px-5 pb-5 text-sm text-muted-foreground">
            Small teams and companies that want time off sorted without
            spreadsheets or a heavyweight HR suite. If your leave requests
            currently live in chat threads, OOO is for you.
          </p>
        </details>

        <details class="group panel p-0">
          <summary class="faq-summary flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
            What does "beta" mean?
            <span class="faq-marker font-mono text-lg text-primary transition-transform motion-reduce:transition-none" aria-hidden="true">+</span>
          </summary>
          <p class="px-5 pb-5 text-sm text-muted-foreground">
            OOO is in a free trial run. You get the whole product while we
            polish it — no credit card, no hidden charges.
          </p>
        </details>

        <details class="group panel p-0">
          <summary class="faq-summary flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
            Will it always be free?
            <span class="faq-marker font-mono text-lg text-primary transition-transform motion-reduce:transition-none" aria-hidden="true">+</span>
          </summary>
          <p class="px-5 pb-5 text-sm text-muted-foreground">
            No — paid plans will arrive after the beta. But the fees will stay
            modest, and pricing won't be per-seat.
          </p>
        </details>

        <details class="group panel p-0">
          <summary class="faq-summary flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
            Are there any limits during the beta?
            <span class="faq-marker font-mono text-lg text-primary transition-transform motion-reduce:transition-none" aria-hidden="true">+</span>
          </summary>
          <p class="px-5 pb-5 text-sm text-muted-foreground">
            None. No caps on members or organisations — invite the whole team.
          </p>
        </details>

        <details class="group panel p-0">
          <summary class="faq-summary flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
            What if I run into a bug?
            <span class="faq-marker font-mono text-lg text-primary transition-transform motion-reduce:transition-none" aria-hidden="true">+</span>
          </summary>
          <p class="px-5 pb-5 text-sm text-muted-foreground">
            Write to
            <a href="mailto:hello@heyiam.ooo" class="text-primary underline-offset-4 hover:underline">
              hello@heyiam.ooo</a
            >
            and we'll get on it.
          </p>
        </details>

        <details class="group panel p-0">
          <summary class="faq-summary flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
            Where can I send ideas for improvements?
            <span class="faq-marker font-mono text-lg text-primary transition-transform motion-reduce:transition-none" aria-hidden="true">+</span>
          </summary>
          <p class="px-5 pb-5 text-sm text-muted-foreground">
            Same place —
            <a href="mailto:hello@heyiam.ooo" class="text-primary underline-offset-4 hover:underline">
              hello@heyiam.ooo</a
            >. It's worth checking the
            <a :href="ROADMAP_URL" class="text-primary underline-offset-4 hover:underline">roadmap</a> and
            <a :href="CHANGELOG_URL" class="text-primary underline-offset-4 hover:underline">changelog</a> first; your
            idea might already be on its way.
          </p>
        </details>

        <details class="group panel p-0">
          <summary class="faq-summary flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
            Do I need to install anything?
            <span class="faq-marker font-mono text-lg text-primary transition-transform motion-reduce:transition-none" aria-hidden="true">+</span>
          </summary>
          <p class="px-5 pb-5 text-sm text-muted-foreground">
            No — OOO runs in the browser. You can also add it to your phone's
            home screen and get push notifications like a native app.
          </p>
        </details>

        <details class="group panel p-0">
          <summary class="faq-summary flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
            How do teammates sign in?
            <span class="faq-marker font-mono text-lg text-primary transition-transform motion-reduce:transition-none" aria-hidden="true">+</span>
          </summary>
          <p class="px-5 pb-5 text-sm text-muted-foreground">
            With a magic link or a one-time code sent by email — no passwords
            to remember.
          </p>
        </details>
      </div>
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
.faq-summary::-webkit-details-marker {
  display: none;
}
details[open] .faq-marker {
  transform: rotate(45deg);
}

.pronounce-note {
  transform: rotate(-2deg);
  transition: transform 0.2s ease;
}
.pronounce-note:hover {
  transform: rotate(1deg) scale(1.04);
}
@media (prefers-reduced-motion: reduce) {
  .hero-logo,
  .hero-logo:hover {
    animation: none;
  }
  .pronounce-note,
  .pronounce-note:hover {
    transition: none;
    transform: rotate(-2deg);
  }
}
</style>
