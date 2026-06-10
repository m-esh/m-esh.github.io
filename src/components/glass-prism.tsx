"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

const SIDE = 180;
const HEIGHT = 240;
const RADIUS = SIDE / Math.sqrt(3);
const CAP_HEIGHT = (SIDE * Math.sqrt(3)) / 2;

const FACES = [
  { rotate: 0, className: "border-glow/30 bg-glow/10" },
  { rotate: 120, className: "border-glow-secondary/30 bg-glow-secondary/10" },
  { rotate: 240, className: "border-foreground/15 bg-foreground/5" },
];

export function GlassPrism({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });
  const tiltX = useTransform(springY, [0, 1], [14, -14]);
  const tiltY = useTransform(springX, [0, 1], [-14, 14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      aria-hidden
      onMouseMove={shouldReduceMotion ? undefined : handleMouseMove}
      onMouseLeave={shouldReduceMotion ? undefined : handleMouseLeave}
      className={cn("relative", className)}
      style={{ perspective: "1400px", ...style }}
    >
      <div
        className="absolute inset-0 -z-10 rounded-full opacity-50 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-glow) 0%, var(--color-glow-secondary) 45%, transparent 75%)",
        }}
      />

      <motion.div
        className="relative mx-auto"
        style={{
          width: SIDE,
          height: HEIGHT,
          transformStyle: "preserve-3d",
          rotateX: shouldReduceMotion ? 0 : tiltX,
          rotateY: shouldReduceMotion ? 0 : tiltY,
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={shouldReduceMotion ? undefined : { rotateY: 360 }}
          transition={shouldReduceMotion ? undefined : { duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {FACES.map(({ rotate, className: faceClassName }) => (
            <div
              key={rotate}
              className={cn("absolute inset-0 border backdrop-blur-md", faceClassName)}
              style={{ transform: `rotateY(${rotate}deg) translateZ(${RADIUS}px)` }}
            />
          ))}

          <div
            className="absolute left-1/2 top-1/2 border border-foreground/10 bg-foreground/5 backdrop-blur-md"
            style={{
              width: SIDE,
              height: CAP_HEIGHT,
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              transform: `translate(-50%, -50%) rotateX(90deg) translateZ(${HEIGHT / 2}px)`,
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 border border-foreground/10 bg-foreground/5 backdrop-blur-md"
            style={{
              width: SIDE,
              height: CAP_HEIGHT,
              clipPath: "polygon(50% 100%, 100% 0%, 0% 0%)",
              transform: `translate(-50%, -50%) rotateX(-90deg) translateZ(${HEIGHT / 2}px)`,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
