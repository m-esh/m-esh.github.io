"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

import { profile } from "@/data/profile";

const NAME = profile.name;
const STAGGER = 0.03;
const START_DELAY = 0.15;
const SETTLE_DURATION = 0.45;
const HOLD = 0.25;
const EXIT_DURATION = 0.4;

const VISIBLE_MS =
  (START_DELAY + (NAME.length - 1) * STAGGER + SETTLE_DURATION + HOLD) * 1000;

const SEEN_KEY = "intro-seen";

function pieceOffset(index: number) {
  return {
    x: ((index * 47) % 84) - 42,
    y: ((index * 71) % 64) - 32,
    rotate: ((index * 53) % 56) - 28,
  };
}

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER, delayChildren: START_DELAY },
  },
};

// Layout effects don't run on the server; falling back to useEffect there
// keeps React from warning while still letting the client open the overlay
// before the first paint (so the page never flashes behind it).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function IntroScreen() {
  const reduceMotion = useReducedMotion();
  // Starts closed and is opened by an effect. The overlay therefore never
  // exists in the SSR markup: if JS fails to boot, or this component throws,
  // the visitor lands on the real page instead of a permanent blank screen.
  const [visible, setVisible] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (reduceMotion) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) !== null;
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Private mode / storage disabled: play it, just don't remember.
    }
    if (!seen) setVisible(true);
  }, [reduceMotion]);

  React.useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setVisible(false), VISIBLE_MS);

    // Belt and braces: if the timer is throttled (background tab) or the exit
    // animation never resolves, this hard deadline releases the page anyway.
    const failsafe = setTimeout(() => setVisible(false), VISIBLE_MS + 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, [visible]);

  // Always release the scroll lock once hidden, whatever path got us here.
  React.useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  // Let a visitor dismiss it early rather than waiting it out.
  React.useEffect(() => {
    if (!visible) return;
    const skip = () => setVisible(false);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("wheel", skip);
    };
  }, [visible]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background px-6"
        >
          <motion.span
            initial="hidden"
            animate="visible"
            variants={container}
            className="inline-flex flex-wrap items-baseline justify-center text-balance text-center font-display text-2xl font-semibold tracking-tight sm:text-4xl"
          >
            {NAME.split("").map((char, i) => {
              const offset = pieceOffset(i);
              return (
                <motion.span
                  key={i}
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: offset.x,
                      y: offset.y,
                      rotate: offset.rotate,
                      scale: 0.4,
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                      transition: { duration: SETTLE_DURATION, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="inline-block"
                >
                  {char === " " ? " " : char}
                </motion.span>
              );
            })}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
