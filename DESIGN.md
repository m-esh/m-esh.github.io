# Design

## Theme

Dark only (`html.dark`, `color-scheme: dark`). Near-black cool canvas, light cool-gray ink. Light-mode tokens exist in `:root` but are not exposed; the dark surface is identity.

## Color

OKLCH tokens in `src/app/globals.css`, mapped to Tailwind v4 utilities via `@theme inline`.

| Token | Value (dark) | Role |
|---|---|---|
| `--background` | `oklch(0.12 0.01 280)` | Page canvas (near-black) |
| `--foreground` | `oklch(0.96 0.015 230)` | Ink |
| `--card` | `oklch(0.20 0.015 265)` | Raised surfaces (borderless, usually `/70`) |
| `--primary` | `oklch(0.78 0.2 95)` | Yellow accent: CTAs, selection, scrollbar, progress bar |
| `--glow` | `oklch(0.85 0.19 145)` | Green: intro-screen name only |
| `--glow-secondary` | `oklch(0.8 0.15 205)` | Cyan: legacy, mostly retired |
| `--muted-foreground` | `oklch(0.68 0.035 250)` | Secondary text |
| `--border` | `oklch(1 0 0 / 12%)` | All borders, usually at `/60` |

Strategy: **Restrained.** One yellow accent ≤10% of surface; everything else neutral. Colored glows, gradient text, eyebrow pills, and colored borders are banned (see PRODUCT.md anti-references).

## Typography

| Slot | Family | Usage |
|---|---|---|
| Display (`font-display`) | Chakra Petch 500/600/700 | h1/h2 headings, hero name, intro screen |
| Body (`font-sans`) | Schibsted Grotesk | Everything else |
| Mono (`font-mono`) | Geist Mono | Dates, years, small meta labels |

Hero name: fluid `clamp(2.25rem, 9vw, 4.5rem)`, tracking-tight, leading-[1.05]. Section h2: `text-3xl` → `md:text-5xl`. Body: `text-base`/`text-lg`, relaxed leading. `text-balance` on headings. Modular 1.25× scale tokens (`--text-2xs` … `--text-6xl`) in `@theme inline`.

## Components

- **SiteHeader**: fixed, transparent until 24px scroll then blurred bg + shadow. Scrollspy nav: an animated pill (`layoutId`) slides between items tracking the current section (IntersectionObserver, mid-viewport band).
- **IntroScreen**: full-screen one-shot, letters of the name tumble in (framer-motion stagger), then fades; locks scroll while visible.
- **ScrollProgress**: 2px primary bar, springed `scaleX`.
- **SectionHeading**: plain h2 + optional description. No eyebrow, no gradient tip.
- **Experience carousel**: drag/swipe deck (framer-motion), arrows hidden on mobile, dot pagination.
- **Project rows**: borderless list with `divide-y` hairlines, bg-tint hover, and a cursor-follow artifact preview (spring-tracked CAD render, `lg:` and pointer devices only).
- **PlayableKalimba**: Web Audio synthesized tines on the Kalimbinator page; click to pluck (sine fundamental + decaying inharmonic partial), sequenced "Play the phrase" button, CSS `tine` wobble keyframes.
- **Buttons**: rounded-full; primary = solid yellow; outline = 1px border, hover bg-accent.
- **Project case-study pages**: fixed back-header, hero with meta `dl`, borderless image/video cards on `bg-card/70`, gallery lightbox with zoom, interactive parts diagram (SVG callouts).

Content is never visibility-gated on scroll reveals: sections render visible by default (the old `Reveal` whileInView wrapper shipped blank sections to headless renderers and was removed).

## Spacing & Layout

`max-w-6xl` container, `px-6 lg:px-8`. Sections `py-20 sm:py-28`. Prose capped at `max-w-2xl`/`max-w-3xl` (~65-75ch). Radius scale from `--radius: 0.625rem`; cards use `rounded-2xl`.

## Motion

Expo-out easing `[0.16, 1, 0.3, 1]` everywhere. Intro ~2.3s total, exit crossfade. Carousel slide 0.32s. Nav pill slide 0.35s. Kalimba tine wobble 0.5s ease-out. `prefers-reduced-motion` collapses CSS animations and framer transforms.
