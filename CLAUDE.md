# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack (http://localhost:3000)
pnpm build        # Production build (standalone output)
pnpm start        # Run production server
pnpm lint         # ESLint check
```

Package manager is **pnpm** (see `pnpm-lock.yaml`).

## Architecture

**Next.js 16 + TypeScript** single-page marketing website for Altémis (blockchain growth advisory). Uses the App Router with `output: 'standalone'` for Docker-ready builds.

### Routing & i18n

- **Locales:** `fr` (default), `en` — configured in `src/i18n/routing.ts`
- All routes live under `src/app/[locale]/` — the dynamic locale segment
- `src/middleware.ts` enforces locale prefix on all routes (redirects `/` to `/fr/`)
- Translations in `src/messages/{fr,en}.json`, organized by section key (nav, hero, services, etc.)
- Use `src/i18n/navigation.ts` exports (`Link`, `useRouter`, `usePathname`) for locale-aware navigation
- Server-side message loading configured in `src/i18n/request.ts`

### Page Structure

The site is a single page (`src/app/[locale]/page.tsx`) composed of section components rendered in sequence. Each section has an `id` for scroll navigation. The root layout (`src/app/layout.tsx`) is a minimal passthrough; the locale layout (`src/app/[locale]/layout.tsx`) handles i18n provider setup, fonts (Inter via Google Fonts), and meta tags.

### Components (`src/components/`)

All components are client-side (`'use client'`). The page renders them in this order:
LoadingScreen → CustomCursor → Navbar → HeroSection → ServicesSection → ResultsSection → ProcessSection → EcosystemSection → TestimonialsSection → ContactSection → Footer

Key patterns:
- **MonogramSVG** is the reusable brand logo (A shape), used in LoadingScreen, HeroSection, Footer
- **LoadingScreen** uses `sessionStorage` to show splash only once per session
- **CustomCursor** is desktop-only (1024px+), reacts to `<a>`, `<button>`, `[data-cursor]` elements
- **TestimonialsSection** has locale-specific content hardcoded in the component (not in message files)

### Animation System

Two animation libraries coexist:
- **GSAP + ScrollTrigger** — scroll-based animations, all wrapped in custom hooks at `src/hooks/useScrollAnimation.ts`
  - `useFadeInUp()`, `useStaggerChildren()`, `useCountUp()`, `useParallax()`, `useDrawLine()`
  - Each hook returns a ref to attach to the animated element
  - All hooks clean up ScrollTrigger instances on unmount
- **Framer Motion** — UI transitions (cursor spring, menu animations, page entrance animations)

### Styling

Tailwind CSS v4 with PostCSS (`postcss.config.mjs`). Key brand tokens:
- Primary: red (`#CC0000`), backgrounds: black/black-light, text: white/gray
- Custom classes: `btn-red-fill` for CTA buttons

### Path Alias

`@/*` maps to `./src/*` (configured in `tsconfig.json`).

## Incomplete Features

- **Contact form backend** — UI exists in ContactSection but submit only shows a success message, no API
- **Calendly link** — placeholder URL (`https://calendly.com`), needs real link
- **Ecosystem logos** — placeholder circles with first letter, need real SVG/images
- **Legal pages** — footer links point to `#`
- **No test framework** configured yet
