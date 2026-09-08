"use client";

import * as React from "react";
import { ReactLenis, useLenis } from "lenis/react";

// Momentum smooth-scroll wrapper (Lenis). Disabled outright when the user
// prefers reduced motion — we don't want to hijack their native scroll.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = React.useState(true);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      }}
    >
      <LenisResize />
      {children}
    </ReactLenis>
  );
}

// Lazy-loaded images and reveal animations change the document height after
// Lenis takes its initial measurement, which otherwise leaves it capped short
// of the real bottom (scroll stops just before the contact section). Re-sync
// whenever the page's content height changes.
function LenisResize() {
  const lenis = useLenis();

  React.useEffect(() => {
    if (!lenis) return;
    const observer = new ResizeObserver(() => lenis.resize());
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [lenis]);

  return null;
}

// Anchor navigation that rides the Lenis timeline when it's available and
// falls back to native smooth scroll (reduced motion / no Lenis context).
export function useScrollTo() {
  const lenis = useLenis();

  return React.useCallback(
    (hash: string) => {
      const target =
        hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
      if (target === null) return;
      if (lenis) {
        lenis.resize();
        // No manual offset here. Lenis already honours each section's
        // `scroll-mt-*`, so adding -72 on top applied the header clearance
        // twice and dropped every section ~150px down the viewport. Letting
        // scroll-margin be the only source of truth also makes a JS-driven
        // click and a plain `#hash` load land in exactly the same place.
        lenis.scrollTo(target);
      } else if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenis]
  );
}
