"use client";

import * as React from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  Bot,
  CircuitBoard,
  LifeBuoy,
  Cpu,
  Music,
  GraduationCap,
  Newspaper,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import { experience } from "@/data/profile";
import { cn } from "@/lib/utils";

type Node = {
  short: string;
  Icon: LucideIcon;
};

function metaFor(role: string, org: string): Node {
  const hay = `${role} ${org}`.toLowerCase();
  if (hay.includes("frc")) return { short: "FRC 7902", Icon: Bot };
  if (hay.includes("vex")) return { short: "VEX 10801", Icon: Cpu };
  if (hay.includes("assembler") || hay.includes("microart"))
    return { short: "Assembly", Icon: CircuitBoard };
  if (hay.includes("lifeguard")) return { short: "Lifeguard", Icon: LifeBuoy };
  if (hay.includes("music")) return { short: "Music", Icon: Music };
  if (hay.includes("tutor")) return { short: "Tutor", Icon: GraduationCap };
  if (hay.includes("newspaper") || hay.includes("carrier"))
    return { short: "Newspaper", Icon: Newspaper };
  return { short: org, Icon: Bot };
}

const nodes = experience.map((e) => metaFor(e.role, e.org));

// Derive a motion value that maps `angle` through fn(angle) each frame.
function useDerived(angle: MotionValue<number>, fn: (v: number) => number) {
  const out = useMotionValue(fn(angle.get()));
  React.useEffect(() => {
    out.set(fn(angle.get()));
    return angle.on("change", (v) => out.set(fn(v)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [angle]);
  return out;
}

function OrbitNode({
  index,
  total,
  angle,
  active,
  onSelect,
  node,
}: {
  index: number;
  total: number;
  angle: MotionValue<number>;
  active: boolean;
  onSelect: () => void;
  node: Node;
}) {
  const base = (index / total) * 360;
  const { Icon } = node;

  // Full-size wrapper rotates by (global angle + node base); chip sits at top-center.
  const spin = useDerived(angle, (v) => v + base);
  const upright = useDerived(angle, (v) => -(v + base));

  return (
    <motion.div className="pointer-events-none absolute inset-[14%]" style={{ rotate: spin }}>
      <button
        type="button"
        onClick={onSelect}
        aria-label={node.short}
        className="focus-ring pointer-events-auto absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <motion.span className="block" style={{ rotate: upright }}>
          <span
            className={cn(
              "group/node flex flex-col items-center gap-1.5 transition-transform",
              active ? "scale-110" : "hover:scale-105"
            )}
          >
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-full transition-colors sm:size-14",
                active
                  ? "border border-primary bg-primary text-primary-foreground shadow-[0_0_24px_-2px_oklch(0.63_0.15_163/0.7)]"
                  : "glass text-muted-foreground group-hover/node:border-primary/60 group-hover/node:text-foreground"
              )}
            >
              <Icon className="size-4 sm:size-5" />
            </span>
            <span
              className={cn(
                "whitespace-nowrap font-mono text-[10px] uppercase tracking-wider transition-colors sm:text-xs",
                active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {node.short}
            </span>
          </span>
        </motion.span>
      </button>
    </motion.div>
  );
}

export function OrbitalTimeline() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const [inView, setInView] = React.useState(false);
  const orbitRef = React.useRef<HTMLDivElement>(null);
  const angle = useMotionValue(0);
  const controls = React.useRef<ReturnType<typeof animate> | null>(null);

  React.useEffect(() => {
    if (reduceMotion) return;
    controls.current = animate(angle, 360, {
      duration: 90,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.current?.stop();
  }, [reduceMotion, angle]);

  // Keep spinning the whole time it's on screen; only pause off-screen to
  // avoid burning frames on an animation nobody can see.
  React.useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.1,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (reduceMotion) return;
    if (inView) controls.current?.play();
    else controls.current?.pause();
  }, [inView, reduceMotion]);

  const item = experience[active];
  const total = experience.length;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
      {/* Orbit */}
      <div ref={orbitRef} className="relative mx-auto aspect-square w-full max-w-[460px]">
        {/* orbit rings */}
        <div className="pointer-events-none absolute inset-[8%] rounded-full border border-border/40" />
        <div className="pointer-events-none absolute inset-[20%] rounded-full border border-dashed border-border/30" />

        {/* center hub */}
        <div className="glass pointer-events-none absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-primary/40 text-center sm:size-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Roles
          </span>
          <span className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            {total}
          </span>
        </div>

        {/* rotating node layer */}
        <div className="absolute inset-0">
          {nodes.map((node, i) => (
            <OrbitNode
              key={experience[i].role}
              index={i}
              total={total}
              angle={angle}
              node={node}
              active={i === active}
              onSelect={() => setActive(i)}
            />
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div className="relative min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.role}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-xl p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{item.role}</h3>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{item.org}</p>
              </div>
              <div className="flex flex-col items-start gap-1 text-sm text-muted-foreground sm:items-end">
                <span className="font-mono text-xs tracking-wide">{item.period}</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" /> {item.location}
                </span>
              </div>
            </div>

            <p className="mt-4 text-balance leading-relaxed text-muted-foreground">
              {item.summary}
            </p>

            <ul className="mt-5 flex flex-col gap-2.5">
              {item.highlights.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
