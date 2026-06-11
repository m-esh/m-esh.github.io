"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#";

export function TextScramble({
  text,
  className,
  style,
  as: Tag = "span",
  trigger = "mount",
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "span" | "h1" | "h2" | "h3";
  trigger?: "mount" | "hover";
}) {
  const [display, setDisplay] = React.useState(text);
  const [canHover, setCanHover] = React.useState(true);
  const reduceMotion = useReducedMotion();
  const raf = React.useRef<number | null>(null);

  // Touch devices don't truly hover; skip the hover-triggered scramble there
  // so tapping a project row doesn't fire the glitch effect.
  React.useEffect(() => {
    const id = requestAnimationFrame(() =>
      setCanHover(window.matchMedia?.("(hover: hover)").matches ?? true)
    );
    return () => cancelAnimationFrame(id);
  }, []);

  const scramble = React.useCallback(() => {
    if (reduceMotion) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    const duration = 650; // ms, wall-clock so it's frame-rate independent
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const revealCount = Math.floor(progress * text.length);

      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealCount) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    raf.current = requestAnimationFrame(tick);
  }, [text, reduceMotion]);

  React.useEffect(() => {
    if (trigger === "mount") scramble();
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag
      className={className}
      style={style}
      onMouseEnter={trigger === "hover" && canHover ? scramble : undefined}
    >
      {display}
    </Tag>
  );
}
