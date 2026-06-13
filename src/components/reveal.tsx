"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Stagger this element after the section enters, in seconds. */
  delay?: number;
  /** Starting vertical offset before the element settles. */
  y?: number;
};

// Scroll-choreographed entrance: content fades and lifts into place as it
// crosses into view, once. MotionConfig reducedMotion="user" (set in the
// provider) automatically drops the transform for reduced-motion visitors.
export function Reveal({ children, className, delay = 0, y = 24, ...props }: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
