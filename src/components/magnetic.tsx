"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const PULL = 0.3;
const MAX_OFFSET = 12;

// Nudges its child toward the cursor. Pointer events with an explicit
// pointerType check, not mouse events: a touch tap fires an *emulated*
// mousemove but never a mouseleave, so the old version left the button
// stranded at the full 12px offset after every tap — visibly out of line with
// its neighbour. There is no cursor to chase on touch or pen, so those
// pointers skip the effect entirely.
export function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.5 });

  const reset = React.useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offsetX * PULL)));
    y.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offsetY * PULL)));
  };

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{ x: springX, y: springY }}
      className="inline-flex"
    >
      {children}
    </motion.div>
  );
}
