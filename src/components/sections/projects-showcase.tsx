"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight, ArrowLeft } from "lucide-react";

import { projects } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useIsClient } from "@/hooks/use-is-client";
import { cn } from "@/lib/utils";

function ProjectCard({ project, className }: { project: (typeof projects)[number]; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-8 backdrop-blur-sm sm:p-10",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80 transition-opacity duration-500 group-hover:opacity-100",
          project.accent
        )}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <Badge variant="outline" className="font-mono text-xs">
            {project.year}
          </Badge>
          {project.links?.[0] && (
            <a
              href={project.links[0].href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:rotate-45"
              aria-label={`${project.links[0].label} for ${project.title}`}
            >
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>

        <h3 className="mt-8 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-xl text-balance leading-relaxed text-muted-foreground sm:text-lg">
          {project.longDescription ?? project.description}
        </p>
      </div>

      <div className="relative mt-10 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </article>
  );
}

function PinnedHorizontalShowcase() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [travel, setTravel] = React.useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  React.useEffect(() => {
    const measure = () => {
      const trackWidth = trackRef.current?.scrollWidth ?? 0;
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      setTravel(Math.max(0, trackWidth - viewportWidth));
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={sectionRef} style={{ height: `${projects.length * 100}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6 pb-6 lg:px-8">
          <SectionHeading
            eyebrow="Projects"
            title="Things I've built"
            description="Keep scrolling: the cards slide sideways from here. A look at what I've been putting together lately."
          />
        </div>

        <div ref={viewportRef} className="w-full overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex h-[60vh] min-h-[420px] w-fit gap-6 px-6 will-change-transform sm:px-[8vw]"
            style={{ x }}
          >
            {projects.map((project) => (
              <div key={project.title} className="h-full w-[calc(100vw-3rem)] shrink-0 sm:w-[min(64vw,720px)]">
                <ProjectCard project={project} className="h-full" />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-6xl items-center gap-4 px-6 lg:px-8">
          <span className="font-mono text-xs text-muted-foreground">01</span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-border/60">
            <motion.div className="h-full rounded-full bg-primary" style={{ width: progressWidth }} />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

function SwipeCarousel() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);

  const scrollToIndex = (next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(projects.length - 1, next));
    const child = track.children[clamped] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setIndex(clamped);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built"
        description="Swipe through to browse: a look at what I've been putting together lately."
      />

      <div
        ref={trackRef}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={(e) => {
          const track = e.currentTarget;
          const center = track.scrollLeft + track.clientWidth / 2;
          let nearest = 0;
          let nearestDist = Infinity;
          Array.from(track.children).forEach((child, i) => {
            const el = child as HTMLElement;
            const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
            if (dist < nearestDist) {
              nearestDist = dist;
              nearest = i;
            }
          });
          setIndex(nearest);
        }}
      >
        {projects.map((project) => (
          <div key={project.title} className="w-[86vw] shrink-0 snap-center sm:w-[440px]">
            <ProjectCard project={project} className="h-full min-h-[420px]" />
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex gap-1.5">
          {projects.map((project, i) => (
            <span
              key={project.title}
              className={cn(
                "h-1.5 rounded-full bg-border transition-all duration-300",
                i === index ? "w-6 bg-primary" : "w-1.5"
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" aria-label="Previous project" onClick={() => scrollToIndex(index - 1)}>
            <ArrowLeft />
          </Button>
          <Button variant="outline" size="icon" aria-label="Next project" onClick={() => scrollToIndex(index + 1)}>
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ProjectsShowcase() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isClient = useIsClient();

  const usePinned = isClient && isDesktop && !prefersReducedMotion;

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      {usePinned ? <PinnedHorizontalShowcase /> : <SwipeCarousel />}
    </section>
  );
}
