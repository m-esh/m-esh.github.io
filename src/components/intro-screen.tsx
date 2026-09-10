import * as React from "react";

import { profile } from "@/data/profile";

const NAME = profile.name;
const STAGGER = 0.03;
const START_DELAY = 0.15;
const SETTLE = 0.45;
const HOLD = 0.25;
const EXIT = 0.4;

/** When the overlay starts fading, in seconds. */
const EXIT_DELAY = START_DELAY + (NAME.length - 1) * STAGGER + SETTLE + HOLD;
/** Total life of the intro, in ms — the scroll lock uses the same number. */
export const INTRO_TOTAL_MS = Math.round((EXIT_DELAY + EXIT) * 1000);

/** Deterministic scatter so each letter tumbles in from its own direction. */
function pieceOffset(index: number) {
  return {
    x: ((index * 47) % 84) - 42,
    y: ((index * 71) % 64) - 32,
    rotate: ((index * 53) % 56) - 28,
  };
}

// Server-rendered and animated entirely in CSS. Two earlier versions each
// broke one half of this:
//
//   - The original mounted the overlay client-side only, so the whole page
//     painted from the server HTML and the intro appeared a frame later — a
//     visible flash of the entire site before the animation started. A layout
//     effect can't help; it runs after that first paint.
//   - Before that, the overlay was server-rendered but dismissed by JS, so if
//     JS never ran the visitor sat behind a permanent blank screen.
//
// Shipping it in the HTML fixes the flash, and dismissing it with a CSS
// animation means it always clears itself, JS or no JS. An inline script in
// the layout hides it outright on repeat visits and for reduced motion.
export function IntroScreen() {
  return (
    <div
      aria-hidden
      className="intro fixed inset-0 z-[100] flex items-center justify-center bg-background px-6"
      style={{ "--intro-exit-delay": `${EXIT_DELAY}s` } as React.CSSProperties}
    >
      <span className="inline-flex flex-wrap items-baseline justify-center text-balance text-center font-display text-2xl font-semibold tracking-tight sm:text-4xl">
        {NAME.split("").map((char, i) => {
          const offset = pieceOffset(i);
          return (
            <span
              key={i}
              className="intro-letter"
              style={
                {
                  "--lx": `${offset.x}px`,
                  "--ly": `${offset.y}px`,
                  "--lr": `${offset.rotate}deg`,
                  animationDelay: `${(START_DELAY + i * STAGGER).toFixed(3)}s`,
                } as React.CSSProperties
              }
            >
              {char === " " ? " " : char}
            </span>
          );
        })}
      </span>
    </div>
  );
}
