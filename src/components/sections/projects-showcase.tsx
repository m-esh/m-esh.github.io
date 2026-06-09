"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

import { projects, type ProjectItem } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";

export function ProjectsShowcase() {
  const [preview, setPreview] = React.useState<ProjectItem["image"] | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 35 });
  const springY = useSpring(y, { stiffness: 350, damping: 35 });

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX + 28);
    y.set(e.clientY - 90);
  };

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          description="A running list, with more to come as each season wraps."
        />

        <ul
          className="mt-10 flex flex-col divide-y divide-border/40"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setPreview(null)}
        >
          {projects.map((project) => {
            const href = project.links?.[0]?.href;
            const isInternal = href?.startsWith("/");
            const ArrowIcon = isInternal ? ArrowRight : ArrowUpRight;

            const row = (
              <>
                <div className="flex flex-col gap-2">
                  <span className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight sm:text-xl">
                    {project.title}
                    {href && (
                      <ArrowIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                    )}
                  </span>
                  <span className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </span>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {project.year}
                </span>
              </>
            );

            const rowProps = {
              className:
                "group -mx-4 flex items-start justify-between gap-6 rounded-xl px-4 py-5 transition-colors hover:bg-card/50",
              onMouseEnter: () => setPreview(project.image ?? null),
            };

            return (
              <li key={project.title}>
                {href ? (
                  isInternal ? (
                    <Link href={href} {...rowProps}>
                      {row}
                    </Link>
                  ) : (
                    <a href={href} target="_blank" rel="noreferrer noopener" {...rowProps}>
                      {row}
                    </a>
                  )
                ) : (
                  <div className="flex items-start justify-between gap-6 py-5">{row}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Cursor-follow artifact preview, pointer devices only */}
      <motion.div
        aria-hidden
        style={{ x: springX, y: springY }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
      >
        <AnimatePresence>
          {preview && (
            <motion.img
              key={preview.src}
              src={preview.src}
              alt=""
              initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-60 rounded-xl bg-white object-cover shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
