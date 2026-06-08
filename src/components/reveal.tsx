"use client";

// EXPERIMENTAL: per-section scroll choreography. Revert by deleting this file
// and restoring the `animate-fade-up` className usages it replaced.

import * as React from "react";
import { motion, type Variants } from "framer-motion";

const VARIANTS: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p";
}) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={VARIANTS[variant]}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
