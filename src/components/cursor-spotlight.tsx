"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

export function CursorSpotlight() {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (reduceMotion) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--spot-x", `${e.clientX}px`);
        el.style.setProperty("--spot-y", `${e.clientY}px`);
        el.style.opacity = "1";
      });
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 50%), oklch(0.78 0.2 95 / 0.035), transparent 72%)",
      }}
    />
  );
}
