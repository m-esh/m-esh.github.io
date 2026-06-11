"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type ShadowColors = {
  first?: string;
  second?: string;
  third?: string;
  fourth?: string;
  glow?: string;
};

const DEFAULT_COLORS: Required<ShadowColors> = {
  first: "#5c4416",
  second: "#8a672a",
  third: "#bb9039",
  fourth: "#e8c450",
  glow: "#e8c450",
};

export function TextRewind({
  text,
  className,
  shadowColors = DEFAULT_COLORS,
}: {
  text: string;
  className?: string;
  shadowColors?: ShadowColors;
}) {
  const reduceMotion = useReducedMotion();
  const c = { ...DEFAULT_COLORS, ...shadowColors };

  const stamped = {
    textShadow: `2px 2px 0px ${c.first}, 4px 4px 0px ${c.second}, 6px 6px 0px ${c.third}, 8px 8px 0px ${c.fourth}, 14px 14px 10px ${c.glow}33`,
  };
  const flat = { textShadow: "none" };

  return (
    <motion.span
      className={cn(
        "inline-block cursor-pointer font-display font-semibold tracking-tight transition-colors duration-300",
        className
      )}
      style={reduceMotion ? flat : stamped}
      whileHover={reduceMotion ? undefined : flat}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.span>
  );
}
