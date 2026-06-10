"use client";

import * as React from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

const CUBE = 180;
const HALF = CUBE / 2;
const THIN = HALF * 0.3;

type FaceTransform = { rx: number; ry: number; tz: number; sx: number; sy: number };
type Shape = Record<(typeof FACE_NAMES)[number], FaceTransform>;

const FACE_NAMES = ["front", "back", "right", "left", "top", "bottom"] as const;

const SHAPES: Shape[] = [
  // Cube
  {
    front: { rx: 0, ry: 0, tz: HALF, sx: 1, sy: 1 },
    back: { rx: 0, ry: 180, tz: HALF, sx: 1, sy: 1 },
    right: { rx: 0, ry: 90, tz: HALF, sx: 1, sy: 1 },
    left: { rx: 0, ry: -90, tz: HALF, sx: 1, sy: 1 },
    top: { rx: 90, ry: 0, tz: HALF, sx: 1, sy: 1 },
    bottom: { rx: -90, ry: 0, tz: HALF, sx: 1, sy: 1 },
  },
  // Slab — flattened into a circuit-board-like panel
  {
    front: { rx: 0, ry: 0, tz: HALF, sx: 1, sy: 0.3 },
    back: { rx: 0, ry: 180, tz: HALF, sx: 1, sy: 0.3 },
    right: { rx: 0, ry: 90, tz: HALF, sx: 1, sy: 0.3 },
    left: { rx: 0, ry: -90, tz: HALF, sx: 1, sy: 0.3 },
    top: { rx: 90, ry: 0, tz: THIN, sx: 1, sy: 1 },
    bottom: { rx: -90, ry: 0, tz: THIN, sx: 1, sy: 1 },
  },
  // Tower — stretched into a tall beam
  {
    front: { rx: 0, ry: 0, tz: THIN, sx: 0.3, sy: 1 },
    back: { rx: 0, ry: 180, tz: THIN, sx: 0.3, sy: 1 },
    right: { rx: 0, ry: 90, tz: THIN, sx: 0.3, sy: 1 },
    left: { rx: 0, ry: -90, tz: THIN, sx: 0.3, sy: 1 },
    top: { rx: 90, ry: 0, tz: HALF, sx: 0.3, sy: 0.3 },
    bottom: { rx: -90, ry: 0, tz: HALF, sx: 0.3, sy: 0.3 },
  },
];

const BASE_TILT = -22;
const DRAG_SENSITIVITY = 0.4;
const CLICK_THRESHOLD = 6;

export function HeroObject() {
  const reduceMotion = useReducedMotion();
  const [shapeIndex, setShapeIndex] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);

  const autoSpin = useMotionValue(0);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const rotateX = useTransform(dragX, (v) => BASE_TILT + v);
  const rotateY = useTransform([autoSpin, dragY], ([a, d]: number[]) => 35 + a + d);

  const dragInfo = React.useRef<{ x: number; y: number; moved: number } | null>(null);
  const spinControls = React.useRef<ReturnType<typeof animate> | null>(null);

  React.useEffect(() => {
    if (reduceMotion) return;

    spinControls.current = animate(autoSpin, 360, {
      duration: 60,
      repeat: Infinity,
      ease: "linear",
    });

    return () => spinControls.current?.stop();
  }, [reduceMotion, autoSpin]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragInfo.current = { x: e.clientX, y: e.clientY, moved: 0 };
    setDragging(true);
    spinControls.current?.pause();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const drag = dragInfo.current;
    if (!drag) return;

    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    dragY.set(dragY.get() + dx * DRAG_SENSITIVITY);
    dragX.set(dragX.get() - dy * DRAG_SENSITIVITY);
    drag.moved += Math.abs(dx) + Math.abs(dy);
    drag.x = e.clientX;
    drag.y = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const drag = dragInfo.current;
    dragInfo.current = null;
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (drag && drag.moved < CLICK_THRESHOLD) {
      setShapeIndex((i) => (i + 1) % SHAPES.length);
    }

    if (!reduceMotion) spinControls.current?.play();
  };

  const shape = SHAPES[shapeIndex];

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative mx-auto h-[320px] w-[320px] touch-none select-none"
        style={{ perspective: 900, cursor: dragging ? "grabbing" : "grab" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
          }}
        >
          {FACE_NAMES.map((name) => {
            const f = shape[name];
            return (
              <div
                key={name}
                className="cube-face"
                style={{
                  transform: `rotateX(${f.rx}deg) rotateY(${f.ry}deg) translateZ(${f.tz}px) scale(${f.sx}, ${f.sy})`,
                }}
              />
            );
          })}
        </motion.div>
      </div>
      <p className="select-none font-mono text-2xs uppercase tracking-[0.18em] text-muted-foreground/70">
        Drag to rotate · click to reshape
      </p>
    </div>
  );
}
