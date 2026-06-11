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
  const reduceMotion = useReducedMotion();
  const frame = React.useRef(0);
  const raf = React.useRef<number | null>(null);

  const scramble = React.useCallback(() => {
    if (reduceMotion) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    frame.current = 0;
    const totalFrames = 18;

    const tick = () => {
      const progress = frame.current / totalFrames;
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

      frame.current += 1;
      if (frame.current <= totalFrames) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    tick();
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
      onMouseEnter={trigger === "hover" ? scramble : undefined}
    >
      {display}
    </Tag>
  );
}
