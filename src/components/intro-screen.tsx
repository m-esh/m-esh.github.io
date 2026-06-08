"use client";

import * as React from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const WORD = "Welcome";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
};

export function IntroScreen() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setVisible(false), 1450);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.span
            initial="hidden"
            animate="visible"
            variants={container}
            className="inline-flex items-baseline font-display text-2xl font-semibold tracking-tight text-glow sm:text-3xl"
          >
            {WORD.split("").map((char, i) => (
              <motion.span key={i} variants={letter}>
                {char}
              </motion.span>
            ))}
            <motion.span
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 0.9,
                delay: 0.1 + WORD.length * 0.07,
                repeat: Infinity,
                repeatDelay: 0.1,
                times: [0, 0.1, 0.6, 1],
              }}
              className="ml-1 inline-block h-[0.85em] w-[2px] translate-y-[0.1em] bg-glow"
            />
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
