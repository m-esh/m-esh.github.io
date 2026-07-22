"use client";

import * as React from "react";
import { Hand } from "lucide-react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

const CUBE = 180;
const HALF = CUBE / 2;
const THIN = HALF * 0.3;

type FaceTransform = { rx: number; ry: number; tz: number; sx: number; sy: number };
type Shape = Record<(typeof FACE_NAMES)[number], FaceTransform>;

const FACE_NAMES = ["front", "back", "right", "left", "top", "bottom"] as const;

const ORIENT: Record<(typeof FACE_NAMES)[number], { rx: number; ry: number }> = {
  front: { rx: 0, ry: 0 },
  back: { rx: 0, ry: 180 },
  right: { rx: 0, ry: 90 },
  left: { rx: 0, ry: -90 },
  top: { rx: 90, ry: 0 },
  bottom: { rx: -90, ry: 0 },
};

function shape(sides: { tz: number; sx: number; sy: number }, caps: { tz: number; sx: number; sy: number }): Shape {
  return {
    front: { ...ORIENT.front, ...sides },
    back: { ...ORIENT.back, ...sides },
    right: { ...ORIENT.right, ...sides },
    left: { ...ORIENT.left, ...sides },
    top: { ...ORIENT.top, ...caps },
    bottom: { ...ORIENT.bottom, ...caps },
  };
}

const SHAPES: Shape[] = [
  // Cube
  shape({ tz: HALF, sx: 1, sy: 1 }, { tz: HALF, sx: 1, sy: 1 }),
  // Panel — flattened into a circuit-board-like slab
  shape({ tz: HALF, sx: 1, sy: 0.3 }, { tz: THIN, sx: 1, sy: 1 }),
  // Beam — stretched into a tall girder
  shape({ tz: THIN, sx: 0.3, sy: 1 }, { tz: HALF, sx: 0.3, sy: 0.3 }),
  // Crystal — pinched into a faceted gem
  shape({ tz: HALF, sx: 1, sy: 1.3 }, { tz: 125, sx: 0.08, sy: 0.08 }),
  // Disc — wide and flat, like a turbine rotor
  shape({ tz: HALF, sx: 1.3, sy: 0.15 }, { tz: 14, sx: 1.3, sy: 1.3 }),
  // Pylon — a slender antenna mast. Faces must agree on the box: side faces
  // sit at ±(0.28·180)/2 and caps at ±(1.6·180)/2, or the caps float inside
  // the shaft and the open ends read as a glitch mid-morph.
  shape({ tz: 25.2, sx: 0.28, sy: 1.6 }, { tz: 144, sx: 0.28, sy: 0.28 }),
];

const BASE_TILT = -22;
const MOUSE_SENSITIVITY = 0.4;
// Thumbs cover less distance than a mouse, so touch gets more degrees per pixel.
const TOUCH_SENSITIVITY = 0.65;
const CLICK_THRESHOLD = 10;
// Soft tilt limit — tanh adds friction near the edge instead of a hard stop,
// and keeps drags from flipping the shape into unreadable angles.
const TILT_LIMIT = 60;

type DragInfo = {
  x: number;
  y: number;
  moved: number;
  isTouch: boolean;
  velocity: number; // deg/s around Y, for flick momentum
  lastTime: number;
};

export function HeroObject() {
  const reduceMotion = useReducedMotion();
  const [shapeIndex, setShapeIndex] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);

  const autoSpin = useMotionValue(0);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const rotateX = useTransform(dragX, (v) => BASE_TILT + v);
  const rotateY = useTransform([autoSpin, dragY], ([a, d]: number[]) => 35 + a + d);

  const dragInfo = React.useRef<DragInfo | null>(null);
  const rawTilt = React.useRef(0);
  const spinControls = React.useRef<ReturnType<typeof animate> | null>(null);
  const momentum = React.useRef<ReturnType<typeof animate> | null>(null);

  React.useEffect(() => {
    if (reduceMotion) return;

    spinControls.current = animate(autoSpin, 360, {
      duration: 60,
      repeat: Infinity,
      ease: "linear",
    });

    return () => {
      spinControls.current?.stop();
      momentum.current?.stop();
    };
  }, [reduceMotion, autoSpin]);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only capture the pointer for mouse — on touch, capturing would trap the
    // page scroll. With touch-action: pan-y the browser keeps vertical scroll.
    if (e.pointerType === "mouse") e.currentTarget.setPointerCapture(e.pointerId);
    dragInfo.current = {
      x: e.clientX,
      y: e.clientY,
      moved: 0,
      isTouch: e.pointerType !== "mouse",
      velocity: 0,
      lastTime: performance.now(),
    };
    setDragging(true);
    setHasInteracted(true);
    spinControls.current?.pause();
    momentum.current?.stop();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const drag = dragInfo.current;
    if (!drag) return;

    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    const now = performance.now();
    const dt = Math.max(now - drag.lastTime, 1) / 1000;
    const sensitivity = drag.isTouch ? TOUCH_SENSITIVITY : MOUSE_SENSITIVITY;

    const spinDelta = dx * sensitivity;
    dragY.set(dragY.get() + spinDelta);
    // Blend velocity samples so one jittery final frame doesn't decide the flick.
    drag.velocity = drag.velocity * 0.6 + (spinDelta / dt) * 0.4;

    // On touch, vertical motion belongs to page scroll (touch-action: pan-y),
    // so only mouse drags tilt the shape — through the soft tanh clamp.
    if (!drag.isTouch) {
      rawTilt.current -= dy * sensitivity;
      dragX.set(TILT_LIMIT * Math.tanh(rawTilt.current / TILT_LIMIT));
    }

    drag.moved += Math.abs(dx) + Math.abs(dy);
    drag.x = e.clientX;
    drag.y = e.clientY;
    drag.lastTime = now;
  };

  const endDrag = (e: React.PointerEvent) => {
    dragInfo.current = null;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (!reduceMotion) spinControls.current?.play();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const drag = dragInfo.current;
    if (!drag) return;

    if (drag.moved < CLICK_THRESHOLD) {
      setShapeIndex((i) => (i + 1) % SHAPES.length);
    } else if (!reduceMotion && Math.abs(drag.velocity) > 80) {
      // Flick: let the spin coast and settle instead of stopping dead.
      momentum.current = animate(dragY, dragY.get() + drag.velocity * 0.3, {
        type: "spring",
        stiffness: 60,
        damping: 18,
        velocity: drag.velocity,
      });
    }

    endDrag(e);
  };

  // The browser claimed the gesture (page scroll on touch). Not a tap — never
  // cycle the shape from here, or scrolling past the cube would morph it.
  const handlePointerCancel = (e: React.PointerEvent) => {
    if (!dragInfo.current) return;
    endDrag(e);
  };

  const faces = SHAPES[shapeIndex];

  return (
    <div
      className="relative mx-auto h-[260px] w-[260px] touch-pan-y select-none sm:h-[320px] sm:w-[320px]"
      style={{ perspective: 900, cursor: dragging ? "grabbing" : "grab" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
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
          const f = faces[name];
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

      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground backdrop-blur-sm"
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : { x: [0, 8, -8, 0], rotate: [0, -18, 18, 0] }
              }
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Hand className="h-4 w-4" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
