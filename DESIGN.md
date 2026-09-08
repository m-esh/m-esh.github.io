# Design

## Theme

Dark only (`html.dark`, `color-scheme: dark`). Near-black cool canvas, light cool-gray ink. Light-mode tokens exist in `:root` but are not exposed; the dark surface is identity.

## Color

OKLCH tokens in `src/app/globals.css`, mapped to Tailwind v4 utilities via `@theme inline`.

| Token | Value (dark) | Role |
|---|---|---|
| `--background` | `oklch(0.12 0.01 280)` | Page canvas (near-black) |
| `--foreground` | `oklch(0.96 0.015 230)` | Ink |
| `--card` | `oklch(0.20 0.015 265)` | Raised surfaces |
| `--primary` | `oklch(0.63 0.15 163)` | Deep emerald accent: CTAs, selection, active states, scroll progress |
| `--muted-foreground` | `oklch(0.68 0.035 250)` | Secondary text (7.1:1 on canvas) |
| `--border` | `oklch(1 0 0 / 12%)` | All borders, usually at `/60` |
| `--glass-*` | see file | Backdrop-blur surfaces |

Strategy: **Restrained.** One emerald accent, everything else neutral. Only the accent carries colour; no second hue, no gradient text, no coloured glows.

**Contrast floor:** body and secondary text must clear WCAG AA (4.5:1). `text-muted-foreground` is 7.1:1 on the canvas; opacity-reduced variants of it (`/70`, `/60`) fall to 3.9:1 and 3.1:1, so they are not used for text.

## Typography

| Slot | Family | Usage |
|---|---|---|
| Display (`font-display`) | Bricolage Grotesque | h1/h2, hero name, intro screen |
| Body (`font-sans`) | Space Grotesk | Everything else |
| Mono (`font-mono`) | Geist Mono | Dates, years, tags, small meta labels |

Three families, each with a distinct job: display carries the headings, mono carries machine-ish metadata (years, tags, coordinates), sans carries prose. Hero name: fluid `clamp(2.25rem, 9vw, 4.5rem)`.

## Motion

One easing curve and three durations, defined as tokens in `globals.css` and referenced everywhere:

```
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)
--motion-fast: 0.18s   /* hover/active feedback */
--motion-base: 0.32s   /* state changes, colour, small transforms */
--motion-slow: 0.6s    /* entrances */
```

Every animation must be purposeful (orientation, feedback, continuity, emphasis) and must prefer `transform`/`opacity`.

### Fail-visible rule (important)

**Content is never gated on JavaScript.** Two regressions have shipped from breaking this:

- `Reveal` previously used framer-motion `whileInView`, which server-rendered `opacity: 0`. Entire sections were invisible to crawlers, print, and anyone whose JS failed. It is now CSS-driven: the markup ships visible, JS adds `data-reveal` to arm the animation, so a failure degrades to plain readable content.
- `IntroScreen` previously rendered its overlay during SSR. Without JS it stayed up forever and the site looked blank. It now starts closed and is opened by a layout effect (client-only), plus a hard failsafe timer and dismiss-on-input.

Verify both with JS disabled before shipping changes to either.

## Components

- **SiteHeader**: fixed; transparent until 24px scroll, then `bg-background/90` + border + blur. The background is opaque enough on its own — nav legibility must not depend on `backdrop-filter`, which can be absent (unsupported, or `prefers-reduced-transparency`).
- **OrbitalTimeline**: the signature interaction. A `tablist`/`tab`/`tabpanel` with roving tabindex, arrow/Home/End keys, and the panel wired via `aria-labelledby`. Rotates continuously while on screen, and pauses on hover/focus so a node never drifts out from under the pointer. Below `sm`, node labels are dropped (seven of them collide) and prev/next buttons plus the active role name sit under the ring. The panel renders plainly — no enter animation gating opacity — so switching roles is instant.
- **Project cards**: solid `bg-card/60`, not glass (nothing sits behind them, so a backdrop-filter cost blur work for no visible frost). Every image carries a definite aspect ratio; `aspect-auto` once let a portrait photo stretch the featured card to 692px.
- **Certifications**: a plain three-up grid. The previous fanned card deck overlapped its own text at rest and only separated on hover, so two of three were unreadable on touch.
- **Buttons**: rounded-full; primary = solid emerald; `LiquidButton` for the hero pair.
- **Focus**: every interactive element carries `.focus-ring` (or the equivalent in `Button`/`LiquidButton`). Nav links, cards, orbit nodes and social links all show a visible ring.

## Spacing & Layout

`max-w-6xl` container, `px-6 lg:px-8`. Sections `py-20 sm:py-24` with `scroll-mt-20` so the fixed header never covers a heading. Prose capped at `max-w-2xl`/`max-w-3xl`. Radius scale from `--radius: 0.5rem`; cards use `rounded-xl`.

Homepage order: Hero → Selected Projects → About → Experience & Leadership → Certifications → Contact.

## CSS gotchas

- **Do not hand-write vendor prefixes.** Writing `backdrop-filter` followed by `-webkit-backdrop-filter` made Lightning CSS treat the pair as duplicates and keep only the prefixed one, silently removing the blur from every glass surface in Chromium. Write the standard property only; the build adds prefixes for the configured targets.
- Arbitrary `shadow-[...]` values containing `rgba(...)` did not compose through Tailwind v4's shadow variables; use the built-in `shadow-*` scale.

## Metadata

`metadataBase` is `https://mrdad.ca` (see `siteUrl` in `src/data/profile.ts`). The social preview is a real `public/og.png`, not Next's `opengraph-image.tsx` route, because that convention emits an extensionless file that GitHub Pages serves as `application/octet-stream` — a Content-Type several scrapers reject. Regenerate `og.png` if the name, tagline or accent colour changes.
