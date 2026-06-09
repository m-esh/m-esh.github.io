"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

import { profile } from "@/data/profile";

const NAME = profile.name;
const STAGGER = 0.045;
const START_DELAY = 0.25;
const SETTLE_DURATION = 0.55;
const HOLD = 0.45;
const EXIT_DURATION = 0.45;

const VISIBLE_MS =
  (START_DELAY + (NAME.length - 1) * STAGGER + SETTLE_DURATION + HOLD) * 1000;

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

export function IntroScreen() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (reduceMotion) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setVisible(false), VISIBLE_MS);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  React.useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
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
            className="inline-flex flex-wrap items-baseline justify-center text-balance text-center font-display text-2xl font-semibold tracking-tight text-glow sm:text-4xl"
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
