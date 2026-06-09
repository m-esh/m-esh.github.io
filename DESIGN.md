# Design

## Theme

Dark only (`html.dark`, `color-scheme: dark`). A darkroom-editorial spread: one slate-veil canvas, bone-white type, a single gunmetal-blue hairline accent. Vivid+Co-derived.

## Color

OKLCH tokens in `src/app/globals.css`, mapped to Tailwind v4 utilities via `@theme inline`.

| Token | Value (dark) | Role |
|---|---|---|
| `--background` | `oklch(0.45 0.028 246)` (≈ `#495764`, slate veil) | The entire canvas. Every section sits on it directly, no card surfaces |
| `--foreground` | `oklch(0.99 0.004 95)` (≈ `#fffdf9`, bone white) | All type |
| `--primary` | `oklch(0.61 0.042 245)` (≈ `#6f879c`, gunmetal blue) | The one chromatic accent: hairline borders, outlined-button borders, active states |
| `--card` / `--carbon` | recessed slate / `#101010` | Rare deeper recess, used sparingly (e.g. nothing currently) |
| `--border` | `--primary` at 55% | All hairlines and dividers |
| `--muted-foreground` | bone white at 76% | Secondary text |

Strategy: **Drenched-restrained.** One canvas color carries the whole page; the only chroma is the gunmetal-blue hairline. No gradients, no glows, no card chrome, no rounded corners (`--radius: 0`).

## Typography

Single typeface (Manrope, standing in for Neue Montreal) across `font-sans`, `font-display`, and `font-mono` — weight 400 everywhere, weight 700 reserved for emphasis (e.g. the surname in the hero).

Editorial scale jumps straight from body (15–20px) to display (`clamp(3rem, 9–10.5vw, 6.5–8.25rem)`), line-height 1.0, letter-spacing -0.02em on display sizes. Section h2s sit at `clamp(2.5rem, 6vw, 3.5rem)`, leading 1.13, tracking -0.02em. `text-balance` on headings.

## Components

- **SiteHeader**: fixed, transparent until 24px scroll then a flat blurred bg (no shadow). Scrollspy nav: an animated underline (`layoutId`) slides beneath the active link.
- **IntroScreen**: full-screen one-shot, letters of the name tumble in (framer-motion stagger), then fades; locks scroll while visible. Bone-white, no glow.
- **ScrollProgress**: 2px accent bar, springed `scaleX`.
- **SectionHeading**: plain display-scale h2 + optional description. No eyebrow, no gradient tip.
- **Experience**: borderless, hairline `border-t` rule per entry; swipe deck (framer-motion), pagination as thin accent-colored bars, prev/next as bordered squares.
- **Project rows**: borderless list with `divide-y` hairlines over a `border-t`, large weight-400/weight-700 titles, and a cursor-follow artifact preview (spring-tracked CAD render, `lg:` and pointer devices only).
- **Buttons**: rectangular (`rounded-none`), outlined ghost only — `border border-foreground` (default) or `border border-primary` (outline variant), transparent fill, uppercase tracked label. No filled/solid variant.
- **Project case-study pages**: fixed transparent header, hero with meta `dl`, borderless `figure`/`figcaption` image and video blocks with a `border-t` caption rule, gallery lightbox, interactive parts diagram (SVG callouts).

Content is never visibility-gated on scroll reveals: sections render visible by default.

## Spacing & Layout

`max-w-6xl` container, `px-6 lg:px-8`. Sections `py-20 sm:py-28`. Prose capped at `max-w-2xl`/`max-w-3xl` (~65-75ch). All radii are `0`.

## Motion

Expo-out easing `[0.16, 1, 0.3, 1]` everywhere. Intro ~2.3s total, exit crossfade. Carousel slide 0.32s. Nav underline slide 0.35s. Magnetic cursor-pull on primary CTAs (hero, header, contact). `prefers-reduced-motion` collapses CSS animations and framer transforms.

