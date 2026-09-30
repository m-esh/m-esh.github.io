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

const FACE_NAMES = ["front", "back", "right", "left", "top", "bottom"] as const;

// Every face sits at the same distance from the centre, at full scale — a
// plain cube. There's nothing left to parameterise once the box no longer
// morphs into other box shapes, so this replaces the old shape()/SHAPES
// machinery that built six differently-scaled variants.
const CUBE_FACES: Record<(typeof FACE_NAMES)[number], { rx: number; ry: number; tz: number }> = {
  front: { rx: 0, ry: 0, tz: HALF },
  back: { rx: 0, ry: 180, tz: HALF },
  right: { rx: 0, ry: 90, tz: HALF },
  left: { rx: 0, ry: -90, tz: HALF },
  top: { rx: 90, ry: 0, tz: HALF },
  bottom: { rx: -90, ry: 0, tz: HALF },
};

type RingPart = { key: string; w: number; h: number; t: string };

// A wireframe sphere built from three families of meridian great circles, one
// per axis (X, Y, Z), each evenly spaced 60° apart. Two families alone leave
// a whole band of the globe with no ring crossing it — like a globe with
// longitude lines but no latitude lines on one side. All three, spaced around
// their own pole, is the standard armillary-sphere trick and reads as a full
// globe from any angle. Diameter matches the cube's edge so the two shapes
// read as the same size.
const SPHERE_D = 190;
const SPHERE_RINGS: RingPart[] = [0, 60, 120].map((angle) => ({
  key: `sphere-x-${angle}`,
  w: SPHERE_D,
  h: SPHERE_D,
  t: `rotateX(${angle}deg)`,
}));
SPHERE_RINGS.push(
  ...[30, 90, 150].map((angle) => ({
    key: `sphere-y-${angle}`,
    w: SPHERE_D,
    h: SPHERE_D,
    t: `rotateY(${angle}deg)`,
  }))
);
SPHERE_RINGS.push(
  // rotateY(90deg) first tips the ring so its plane contains the Z axis
  // (the poles now point at/away from the camera); rotateZ then sweeps that
  // ring around those poles, in the same way rotateX/rotateY sweep the
  // other two families around theirs.
  ...[0, 60, 120].map((angle) => ({
    key: `sphere-z-${angle}`,
    w: SPHERE_D,
    h: SPHERE_D,
    t: `rotateZ(${angle}deg) rotateY(90deg)`,
  }))
);

// A wireframe torus: identical tube rings spaced evenly around a circular
// path. rotateY places each ring at its angle around the loop and translateZ
// sets the path radius; both run in the ring's own tilted frame at that
// point, so its face is still pointing straight out radially, like a barrel
// of hoops with no hole through the middle. The final rotateY(90deg) turns
// that face to point along the direction of travel instead, which is what
// actually stands each ring up into the donut's tube — a trailing
// rotateX(90deg) here rotates the ring's face to vertical/horizontal instead
// and collapses the whole loop flat (verified by rendering both).
const TORUS_RING_COUNT = 16;
const TORUS_MAJOR_R = 70;
const TORUS_TUBE_D = 56;
// The loop above sits flat, like a bagel lying on a table — its hole points
// straight up, along the same axis the shape's shared, gentle resting tilt
// barely tips, so at rest the camera looks almost straight into the rim
// instead of down at the hole. Baked into the loop itself (so it doesn't
// touch the cube or sphere, and holds even before the visitor drags
// anything), this stands the whole loop up on its edge and turns it to face
// the camera, the way you'd tilt a donut up off a table to actually look at
// it (tuned by rendering candidates side by side, not guessed).
const TORUS_TILT = 58;
const TORUS_RINGS: RingPart[] = Array.from({ length: TORUS_RING_COUNT }, (_, i) => {
  const angle = Math.round((i * 360) / TORUS_RING_COUNT);
  return {
    key: `torus-${i}`,
    w: TORUS_TUBE_D,
    h: TORUS_TUBE_D,
    t: `rotateZ(90deg) rotateX(${TORUS_TILT}deg) rotateY(${angle}deg) translateZ(${TORUS_MAJOR_R}px) rotateY(90deg)`,
  };
});

const SHAPE_KINDS = ["cube", "sphere", "torus"] as const;
type ShapeKind = (typeof SHAPE_KINDS)[number];

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
  const [inView, setInView] = React.useState(true);
  const stageRef = React.useRef<HTMLDivElement>(null);
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

  // The cube used to keep spinning for the whole page once you scrolled past
  // it, animating a transform nobody could see. Same treatment as the orbit:
  // idle while offscreen.
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (reduceMotion) return;
    if (inView && !dragging) spinControls.current?.play();
    else spinControls.current?.pause();
  }, [inView, dragging, reduceMotion]);

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
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const drag = dragInfo.current;
    if (!drag) return;

    if (drag.moved < CLICK_THRESHOLD) {
      setShapeIndex((i) => (i + 1) % SHAPE_KINDS.length);
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

  // All three shapes stay mounted and cross-fade per element: putting the
  // opacity on a wrapper would flatten its preserve-3d children.
  const kind: ShapeKind = SHAPE_KINDS[shapeIndex];

  return (
    <div
      // touch-pan-y keeps vertical page scrolling with the browser: only
      // horizontal drags rotate on touch, so the cube never traps a scroll.
      ref={stageRef}
      className="cube-stage relative mx-auto h-[280px] w-[280px] touch-pan-y select-none sm:h-[340px] sm:w-[340px]"
      data-dragging={dragging ? "true" : undefined}
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
          const f = CUBE_FACES[name];
          return (
            <div
              key={name}
              className="cube-face"
              style={{
                transform: `rotateX(${f.rx}deg) rotateY(${f.ry}deg) translateZ(${f.tz}px)`,
                opacity: kind === "cube" ? 1 : 0,
              }}
            />
          );
        })}

        {SPHERE_RINGS.map((part) => (
          <div
            key={part.key}
            className="cube-ring"
            style={{
              width: part.w,
              height: part.h,
              transform: part.t,
              opacity: kind === "sphere" ? 1 : 0,
            }}
          />
        ))}

        {TORUS_RINGS.map((part) => (
          <div
            key={part.key}
            className="cube-ring"
            style={{
              width: part.w,
              height: part.h,
              transform: part.t,
              opacity: kind === "torus" ? 1 : 0,
            }}
          />
        ))}
      </motion.div>

      {/* Names the interaction instead of leaving a bare icon to be guessed
          at. Both verbs are real: a drag rotates, a tap cycles the shape. */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-x-0 -bottom-2 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/85 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm">
              <motion.span
                aria-hidden
                className="inline-flex"
                animate={reduceMotion ? undefined : { x: [0, 5, -5, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Hand className="size-3.5" />
              </motion.span>
              {/* The second clause is dropped on phones, where the full
                  string wrapped onto two lines inside the pill. */}
              <span className="whitespace-nowrap">
                Drag to rotate<span className="hidden sm:inline"> · tap to morph</span>
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
