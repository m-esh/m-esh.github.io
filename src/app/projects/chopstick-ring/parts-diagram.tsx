"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Lightbox, type GalleryItem } from "./project-gallery";

export type DiagramPart = {
  number: number;
  name: string;
  blurb: string;
  x: number;
  y: number;
  item: GalleryItem;
};

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
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-10">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          className="aspect-[1278/712] size-full object-cover"
        />

        {parts.map((part, i) => (
          <button
            key={part.number}
            type="button"
            onClick={() => setOpenIndex(i)}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive((a) => (a === i ? null : a))}
            onFocus={() => setActive(i)}
            onBlur={() => setActive((a) => (a === i ? null : a))}
            aria-label={`View ${part.name} drawing`}
            style={{ left: `${part.x}%`, top: `${part.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
          >
            <span
              className={cn(
                "absolute inset-0 -z-10 rounded-full bg-glow-secondary/40 transition-opacity duration-300",
                active === i ? "animate-ping opacity-100" : "opacity-0"
              )}
            />
            <span
              className={cn(
                "flex size-7 items-center justify-center rounded-full border font-mono text-xs font-semibold backdrop-blur-sm transition-all duration-300",
                active === i
                  ? "scale-125 border-glow-secondary bg-glow-secondary text-background shadow-[0_0_20px_-2px_var(--color-glow-secondary)]"
                  : "border-glow-secondary/50 bg-background/70 text-glow-secondary"
              )}
            >
              {part.number}
            </span>
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-2.5">
        {parts.map((part, i) => (
          <li key={part.number}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((a) => (a === i ? null : a))}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((a) => (a === i ? null : a))}
              className={cn(
                "group flex w-full items-center gap-4 rounded-xl border bg-card/40 p-4 text-left backdrop-blur-sm transition-colors",
                active === i ? "border-glow-secondary/50 bg-card/70" : "border-border/60"
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold transition-colors",
                  active === i
                    ? "border-glow-secondary bg-glow-secondary text-background"
                    : "border-glow-secondary/50 text-glow-secondary"
                )}
              >
                {part.number}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold tracking-tight">{part.name}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">{part.blurb}</span>
              </span>
              <ArrowRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-glow-secondary" />
            </button>
          </li>
        ))}
      </ul>

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
