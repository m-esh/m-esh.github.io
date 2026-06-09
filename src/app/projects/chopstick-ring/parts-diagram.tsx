"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Lightbox, type GalleryItem } from "./project-gallery";

export type DiagramPart = {
  number: number;
  name: string;
  blurb: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  item: GalleryItem;
};

const VIEW_W = 1278;
const VIEW_H = 712;

export function PartsDiagram({
  image,
  alt,
  parts,
}: {
  image: string;
  alt: string;
  parts: DiagramPart[];
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [active, setActive] = React.useState<number | null>(null);
  const arrowId = React.useId().replace(/:/g, "");

  const items = React.useMemo(() => parts.map((p) => p.item), [parts]);

  const close = React.useCallback(() => setOpenIndex(null), []);
  const step = React.useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + delta + items.length) % items.length;
      });
    },
    [items.length]
  );

  React.useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  return (
    <div className="relative overflow-hidden border border-border/60">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={alt}
        className="aspect-[1278/712] size-full object-cover"
      />

      <svg
        className="pointer-events-none absolute inset-0 size-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        aria-hidden="true"
      >
        <defs>
          <marker
            id={`${arrowId}-rest`}
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth={9}
            markerHeight={9}
            markerUnits="userSpaceOnUse"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill="var(--color-foreground)" fillOpacity={0.3} />
          </marker>
          <marker
            id={`${arrowId}-active`}
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth={11}
            markerHeight={11}
            markerUnits="userSpaceOnUse"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill="var(--color-foreground)" />
          </marker>
        </defs>
        {parts.map((part, i) => (
          <line
            key={part.number}
            x1={(part.labelX / 100) * VIEW_W}
            y1={(part.labelY / 100) * VIEW_H}
            x2={(part.x / 100) * VIEW_W}
            y2={(part.y / 100) * VIEW_H}
            markerEnd={`url(#${arrowId}-${active === i ? "active" : "rest"})`}
            vectorEffect="non-scaling-stroke"
            strokeWidth={active === i ? 1.5 : 1}
            strokeDasharray={active === i ? undefined : "3 2.5"}
            className={cn(
              "transition-[stroke,stroke-width] duration-300",
              active === i ? "stroke-foreground" : "stroke-foreground/35"
            )}
          />
        ))}
      </svg>

      {parts.map((part, i) => (
        <React.Fragment key={part.number}>
          <span
            aria-hidden="true"
            style={{ left: `${part.x}%`, top: `${part.y}%` }}
            className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          >
            <span
              className={cn(
                "absolute size-6 rounded-full bg-foreground/25 transition-opacity duration-300",
                active === i ? "animate-ping opacity-100" : "opacity-0"
              )}
            />
            <span
              className={cn(
                "block size-2.5 rounded-full border transition-all duration-300",
                active === i
                  ? "scale-125 border-foreground bg-foreground"
                  : "border-foreground/50 bg-background/80"
              )}
            />
          </span>

          <button
            type="button"
            onClick={() => setOpenIndex(i)}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive((a) => (a === i ? null : a))}
            onFocus={() => setActive(i)}
            onBlur={() => setActive((a) => (a === i ? null : a))}
            aria-label={`View ${part.name} drawing`}
            style={{ left: `${part.labelX}%`, top: `${part.labelY}%` }}
            className={cn(
              "group absolute max-w-[42%] outline-none sm:max-w-[34%]",
              part.labelX > 50 ? "-translate-x-full" : "translate-x-0",
              part.labelY > 50 ? "-translate-y-full" : "translate-y-0"
            )}
          >
            <span
              className={cn(
                "flex w-fit items-center gap-2 border px-2.5 py-1.5 font-mono text-[0.6rem] font-semibold uppercase leading-tight tracking-[0.1em] backdrop-blur-md transition-all duration-300 sm:text-[0.7rem]",
                active === i
                  ? "scale-105 border-foreground bg-foreground text-background"
                  : "border-border/60 bg-background/80 text-foreground"
              )}
            >
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full text-[0.6rem] transition-colors duration-300",
                  active === i ? "bg-background/25 text-background" : "bg-foreground/10 text-foreground"
                )}
              >
                {part.number}
              </span>
              {part.name}
            </span>
          </button>
        </React.Fragment>
      ))}

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            key={items[openIndex].src}
            item={items[openIndex]}
            index={openIndex}
            total={items.length}
            zoomHint="Click the image to zoom in and read the dimensions"
            onClose={close}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
