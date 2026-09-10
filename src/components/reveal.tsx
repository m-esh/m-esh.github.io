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
// The hidden state lives in CSS behind `html[data-js]`, which an inline script
// sets before the first paint. Two earlier versions each got this wrong:
// framer-motion's `whileInView` server-rendered `opacity: 0`, so the page was
// blank without JS; arming it from this effect instead meant the whole page
// painted and then snapped blank at hydration. Setting the flag pre-paint
// keeps both properties — no flash, and nothing hidden when JS never runs.
export function Reveal({ children, className, delay = 0, style, ...props }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Tells the inline script's failsafe that React did mount, so it leaves
    // `data-js` alone.
    document.documentElement.dataset.revealReady = "1";

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
