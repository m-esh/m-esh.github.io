"use client";

import * as React from "react";
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const CUBE = 180;
const HALF = CUBE / 2;

const FACES = [
  { name: "front", transform: `translateZ(${HALF}px)` },
  { name: "back", transform: `rotateY(180deg) translateZ(${HALF}px)` },
  { name: "right", transform: `rotateY(90deg) translateZ(${HALF}px)` },
  { name: "left", transform: `rotateY(-90deg) translateZ(${HALF}px)` },
  { name: "top", transform: `rotateX(90deg) translateZ(${HALF}px)` },
  { name: "bottom", transform: `rotateX(-90deg) translateZ(${HALF}px)` },
];

const BASE_TILT = -22;

export function HeroObject() {
  const reduceMotion = useReducedMotion();

  const spinY = useMotionValue(35);
  const tiltX = useMotionValue(BASE_TILT);
  const tiltY = useMotionValue(0);

  const springTiltX = useSpring(tiltX, { stiffness: 60, damping: 20 });
  const springTiltY = useSpring(tiltY, { stiffness: 60, damping: 20 });

  const rotateX = useTransform(springTiltX, (v) => v);
  const rotateY = useTransform([spinY, springTiltY], ([spin, tilt]: number[]) => spin + tilt);

  React.useEffect(() => {
    if (reduceMotion) return;

    const controls = animate(spinY, 35 + 360, {
      duration: 60,
      repeat: Infinity,
      ease: "linear",
    });

    const handlePointerMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      tiltY.set(nx * 50);
      tiltX.set(BASE_TILT - ny * 30);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      controls.stop();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [reduceMotion, spinY, tiltX, tiltY]);

  return (
    <div
      aria-hidden
      className="relative mx-auto h-[320px] w-[320px]"
      style={{ perspective: 900 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          rotateX: reduceMotion ? BASE_TILT : rotateX,
          rotateY: reduceMotion ? 35 : rotateY,
        }}
      >
        {FACES.map((face) => (
          <div key={face.name} className="cube-face" style={{ transform: face.transform }} />
        ))}
      </motion.div>
    </div>
  );
}
