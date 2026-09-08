"use client";

import * as React from "react";
import { animate, motion, useMotionValue, useReducedMotion, type MotionValue } from "framer-motion";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
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

type NodeMeta = {
  short: string;
  Icon: LucideIcon;
};

function metaFor(role: string, org: string): NodeMeta {
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

const ROTATION_SECONDS = 120;

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
  role,
  tabId,
  panelId,
  registerRef,
}: {
  index: number;
  total: number;
  angle: MotionValue<number>;
  active: boolean;
  onSelect: () => void;
  node: NodeMeta;
  role: string;
  tabId: string;
  panelId: string;
  registerRef: (el: HTMLButtonElement | null) => void;
}) {
  const base = (index / total) * 360;
  const { Icon } = node;

  // Full-size wrapper rotates by (global angle + node base); chip sits at
  // top-center and counter-rotates so its icon and label stay upright.
  const spin = useDerived(angle, (v) => v + base);
  const upright = useDerived(angle, (v) => -(v + base));

  return (
    <motion.div className="pointer-events-none absolute inset-[16%]" style={{ rotate: spin }}>
      <button
        ref={registerRef}
        type="button"
        role="tab"
        id={tabId}
        aria-selected={active}
        aria-controls={panelId}
        // Roving tabindex: one stop for the whole orbit, then arrow keys.
        tabIndex={active ? 0 : -1}
        onClick={onSelect}
        className="group/node focus-ring pointer-events-auto absolute left-1/2 top-0 grid -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full"
      >
        <motion.span className="block" style={{ rotate: upright }}>
          <span className="flex flex-col items-center gap-1.5">
            <span
              className={cn(
                "relative grid size-11 place-items-center rounded-full transition-[background-color,border-color,color,transform,box-shadow]",
                "duration-[var(--motion-base)] ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-14",
                active
                  ? "scale-110 border border-primary bg-primary text-primary-foreground shadow-[0_0_20px_-4px_oklch(0.63_0.15_163/0.65)]"
                  : cn(
                      "border border-border/70 bg-card text-muted-foreground",
                      "group-hover/node:scale-105 group-hover/node:border-primary/60 group-hover/node:text-foreground",
                      "group-focus-visible/node:border-primary/60"
                    )
              )}
            >
              <Icon className="size-4 sm:size-5" />
            </span>
            {/* Labels are desktop-only: at phone widths seven of them collide. */}
            <span
              className={cn(
                "hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-wider transition-colors sm:block",
                active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {node.short}
            </span>
          </span>
        </motion.span>
        <span className="sr-only">{role}</span>
      </button>
    </motion.div>
  );
}

export function OrbitalTimeline() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const [inView, setInView] = React.useState(false);
  // Rotation holds still while someone is actually aiming at a node, so the
  // target never drifts out from under the pointer mid-click.
  const [engaged, setEngaged] = React.useState(false);
  const orbitRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const angle = useMotionValue(0);
  const controls = React.useRef<ReturnType<typeof animate> | null>(null);

  const total = experience.length;
  const item = experience[active];
  const baseId = React.useId().replace(/:/g, "");
  const panelId = `${baseId}-panel`;
  const tabId = (i: number) => `${baseId}-tab-${i}`;

  React.useEffect(() => {
    if (reduceMotion) return;
    controls.current = animate(angle, 360, {
      duration: ROTATION_SECONDS,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.current?.stop();
  }, [reduceMotion, angle]);

  React.useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.1,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Spin only when it's on screen and nobody is interacting with it.
  React.useEffect(() => {
    if (reduceMotion) return;
    if (inView && !engaged) controls.current?.play();
    else controls.current?.pause();
  }, [inView, engaged, reduceMotion]);

  const select = React.useCallback((next: number, focus = false) => {
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  }, []);

  const step = React.useCallback(
    (delta: number, focus = false) => {
      setActive((current) => {
        const next = (current + delta + total) % total;
        if (focus) requestAnimationFrame(() => tabRefs.current[next]?.focus());
        return next;
      });
    },
    [total]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        step(1, true);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        step(-1, true);
        break;
      case "Home":
        e.preventDefault();
        select(0, true);
        break;
      case "End":
        e.preventDefault();
        select(total - 1, true);
        break;
    }
  };

  return (
    // items-start (not center) so a taller role never re-centres the orbit:
    // switching roles must not shove the ring up and down the page.
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
      <div className="lg:sticky lg:top-24">
        <div
          ref={orbitRef}
          role="tablist"
          aria-label="Roles and activities"
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          onPointerEnter={() => setEngaged(true)}
          onPointerLeave={() => setEngaged(false)}
          onFocusCapture={() => setEngaged(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setEngaged(false);
          }}
          className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[460px]"
        >
          {/* orbit rings */}
          <div className="pointer-events-none absolute inset-[10%] rounded-full border border-border/40" />
          <div className="pointer-events-none absolute inset-[22%] rounded-full border border-dashed border-border/25" />

          {/* center hub */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-primary/30 bg-card text-center sm:size-24">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Roles
              </span>
              <span className="block font-display text-2xl font-semibold text-foreground sm:text-3xl">
                {total}
              </span>
            </div>
          </div>

          <div className="absolute inset-0">
            {nodes.map((node, i) => (
              <OrbitNode
                key={experience[i].role}
                index={i}
                total={total}
                angle={angle}
                node={node}
                role={experience[i].role}
                tabId={tabId(i)}
                panelId={panelId}
                active={i === active}
                onSelect={() => select(i)}
                registerRef={(el) => {
                  tabRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* Phone controls: labels are hidden on the ring at this size, so the
            active role is named here and stepped with real buttons. */}
        <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous role"
            className="focus-ring grid size-11 place-items-center rounded-full border border-border/70 bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-5" />
          </button>
          <span
            aria-hidden
            className="min-w-[9rem] text-center font-mono text-xs uppercase tracking-[0.16em] text-foreground"
          >
            {nodes[active].short}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next role"
            className="focus-ring grid size-11 place-items-center rounded-full border border-border/70 bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Detail panel. Rendered plainly (no enter animation gating its
          opacity) so the selected role is readable without JS, and swaps
          instantly rather than waiting out an exit transition. */}
      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(active)}
        tabIndex={0}
        className="focus-ring rounded-xl border border-border/60 bg-card/70 p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{item.role}</h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{item.org}</p>
          </div>
          <div className="flex flex-col items-start gap-1 text-sm text-muted-foreground sm:items-end">
            <span className="font-mono text-xs tracking-wide">{item.period}</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden /> {item.location}
            </span>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-muted-foreground">{item.summary}</p>

        <ul className="mt-5 flex flex-col gap-2.5">
          {item.highlights.map((point) => (
            <li
              key={point}
              className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
