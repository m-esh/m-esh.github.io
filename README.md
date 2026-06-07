# Mehrdad Shariatmadari — Personal Site

A personal portfolio site built with **Next.js**, **Tailwind CSS**, **shadcn/ui**, **Framer Motion**, and **Bun**. Dark-themed with purple accents, and featuring a horizontal scroll-driven project showcase (with a swipeable mobile fallback).

## Getting started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing your content

Almost everything you'd want to change lives in **`src/data/profile.ts`**:

- `profile` — name, tagline, bio paragraphs, contact email, social links
- `experience` — job/volunteer experience entries (shown as a timeline)
- `projects` — personal projects (shown in the sideways-scrolling showcase — add as many as you like)
- `certifications` — certifications/credentials (shown as cards)
- `skills` — the toolkit/skills tag list

Just edit the arrays/objects in that file and the site updates automatically — no need to touch any component.

## The "special feature": scroll-driven project showcase

`src/components/sections/projects-showcase.tsx` pins the Projects section while you scroll and translates the cards horizontally — an Apple-product-page-style effect — built with Framer Motion's `useScroll`/`useTransform`. On smaller screens (or with reduced-motion preferences), it automatically swaps to a touch-friendly swipe carousel instead, so the experience stays smooth on mobile.

## Tech stack

- [Next.js](https://nextjs.org) (App Router, static export)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) primitives (hand-wired in `src/components/ui`)
- [Framer Motion](https://www.framer.com/motion/) for scroll/entry animations
- [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode
- [Bun](https://bun.sh) as the package manager and runtime

## Building & deploying

```bash
bun run build
```

This produces a static export in `out/` (see `next.config.ts` → `output: "export"`). A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and publishes that output to GitHub Pages automatically on pushes to `main`.

To enable it: in your repo settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
