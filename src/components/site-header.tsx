"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";

import { Button } from "@/components/ui/button";
import { RobotMark } from "@/components/icons";
import { useScrollTo } from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string | null>(null);
  const { scrollY } = useScroll();
  const scrolledRef = React.useRef(false);
  const scrollTo = useScrollTo();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrolled = latest > 24;
    if (isScrolled !== scrolledRef.current) {
      scrolledRef.current = isScrolled;
      setScrolled(isScrolled);
    }
  });

  React.useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      // Band across the middle of the viewport decides the current section
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Real anchors, progressively enhanced: the href is what makes these
  // shareable, middle-clickable and keyboard-native, and it still works with
  // JS off. We only intercept a plain left click to run the smooth scroll and
  // keep the URL hash in sync.
  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(false);
    scrollTo(href);
    if (href !== window.location.hash) {
      window.history.pushState(null, "", href === "#top" ? window.location.pathname : href);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            onClick={() => setOpen(false)}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500",
          // Legibility can't depend on backdrop-filter: where blur is missing
          // or disabled, a translucent bar lets body copy collide with the nav
          // labels. bg-background/90 stays readable on its own, and the blur
          // is layered on top purely as polish.
          scrolled
            ? "border-border/60 bg-background/90 shadow-lg shadow-black/30 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
          <a
            href="#top"
            onClick={(e) => handleNavigate(e, "#top")}
            aria-label="Back to top"
            className="focus-ring group/logo inline-flex items-center gap-2.5 rounded-lg text-primary transition-transform active:scale-95"
          >
            <RobotMark className="size-7" />
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              MS
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavigate(e, link.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "focus-ring relative rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 rounded-xl bg-card"
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex"
                >
                  {open ? <X /> : <Menu />}
                </motion.span>
              </AnimatePresence>
            </Button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-border/60 bg-background/95 backdrop-blur-xl backdrop-saturate-150 md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavigate(e, link.href)}
                    aria-current={active === link.href ? "true" : undefined}
                    className={cn(
                      "focus-ring rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-[color,background-color,transform] duration-[var(--motion-fast)] ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]",
                      active === link.href
                        ? "bg-card text-foreground"
                        : "text-muted-foreground active:bg-card/60 active:text-foreground"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
