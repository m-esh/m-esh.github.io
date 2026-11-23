"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
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

  if (!enabled)
    return (
      <>
        <RouteScrollReset />
        {children}
      </>
    );

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
      <RouteScrollReset />
      {children}
    </ReactLenis>
  );
}

// Lenis keeps its own record of the scroll position, so after a client-side
// route change it put the old homepage offset back on top of Next's
// scroll-to-top, and project pages (shorter than the homepage) opened at or
// near their bottom. Every forward navigation now lands at the top, or at the
// `#section` the link points to. Back/forward is left alone so the browser
// can return you to where you were.
function RouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  const isHistoryNav = React.useRef(false);
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    const onPop = () => {
      isHistoryNav.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isHistoryNav.current) {
      isHistoryNav.current = false;
      return;
    }
    const hash = window.location.hash;
    const target = hash ? document.querySelector<HTMLElement>(hash) : null;
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(target ?? 0, { immediate: true, force: true });
    } else if (target) {
      target.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
    // Only a route change should trigger this, not Lenis re-initialising.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
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
