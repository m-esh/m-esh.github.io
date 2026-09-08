"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RevealProps = React.ComponentProps<"div"> & {
  /** Stagger this element after it enters view, in seconds. */
  delay?: number;
};

// Scroll-choreographed entrance: content lifts into place as it crosses into
// view, once.
//
// Deliberately CSS-driven rather than framer-motion's `whileInView`. That
// version SSR'd `opacity: 0` inline, so every wrapped section was invisible to
// crawlers, print, and anyone whose JS failed — the page rendered blank. Here
// the markup ships fully visible and JS only *adds* the animation, so a
// failure degrades to plain, readable content. `prefers-reduced-motion` is
// handled in CSS alongside the animation itself.
export function Reveal({ children, className, delay = 0, style, ...props }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Arm the animation only once JS is running, so the no-JS state stays visible.
    el.dataset.reveal = "idle";

    if (!("IntersectionObserver" in window)) {
      el.dataset.reveal = "in";
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "in";
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}s`, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
