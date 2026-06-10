"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

export function ProjectGallery({
  items,
  zoomHint = "Click the image to zoom in and inspect the details",
}: {
  items: GalleryItem[];
  zoomHint?: string;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

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
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.button
            key={item.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 text-left backdrop-blur-sm transition-colors hover:border-border"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-background/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 backdrop-blur-[1px] transition-all duration-300 group-hover:bg-background/30 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
                  <Search className="size-3.5" /> Zoom in
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1 p-4">
              <span className="text-sm font-semibold tracking-tight">{item.title}</span>
              <span className="text-xs leading-relaxed text-muted-foreground">{item.description}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            key={items[openIndex].src}
            item={items[openIndex]}
            index={openIndex}
            total={items.length}
            zoomHint={zoomHint}
            onClose={close}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export function Lightbox({
  item,
  index,
  total,
  zoomHint,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  zoomHint: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [zoomed, setZoomed] = React.useState(false);
  const [origin, setOrigin] = React.useState("50% 50%");

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!zoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setOrigin(`${x}% ${y}%`);
    }
    setZoomed((z) => !z);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex flex-col bg-background/95"
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight">{item.title}</span>
          <span className="font-mono text-xs text-muted-foreground">
            {index + 1} / {total}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
          className="inline-flex size-10 items-center justify-center rounded-full border border-border/60 bg-card/60 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6 sm:px-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-card/60 text-muted-foreground transition-colors hover:text-foreground sm:left-4"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="relative max-h-full max-w-full overflow-hidden rounded-xl border border-border/60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.alt}
            onClick={handleImageClick}
            style={{ transformOrigin: origin }}
            className={cn(
              "max-h-[65vh] w-auto select-none object-contain transition-transform duration-300 ease-out sm:max-h-[70vh]",
              zoomed ? "scale-[2.2] cursor-zoom-out" : "scale-100 cursor-zoom-in"
            )}
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
          className="absolute right-2 top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-card/60 text-muted-foreground transition-colors hover:text-foreground sm:right-4"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div
        className="mx-auto flex max-w-2xl flex-col items-center gap-1.5 px-6 pb-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-glow-secondary/80">
          <Search className="size-3" /> {zoomHint}
        </span>
      </div>
    </motion.div>
  );
}
