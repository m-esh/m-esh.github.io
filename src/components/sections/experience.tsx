"use client";

import * as React from "react";
import { Briefcase, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { motion, AnimatePresence, type PanInfo, type Variants } from "framer-motion";

import { experience, type ExperienceItem } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

const SWIPE_OFFSET_THRESHOLD = 32;
const SWIPE_VELOCITY_THRESHOLD = 350;

const slide: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 64 : -64, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -64 : 64, opacity: 0 }),
};

function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-glow/40 bg-card text-glow sm:size-11">
            <Briefcase className="size-4 sm:size-5" />
          </span>
          <div>
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{item.role}</h3>
            <p className="mt-1 text-sm font-medium text-glow">{item.org}</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-muted-foreground sm:items-end">
          <span className="font-mono text-xs tracking-wide">{item.period}</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" /> {item.location}
          </span>
        </div>
      </div>

      <p className="mt-4 text-balance leading-relaxed text-muted-foreground">{item.summary}</p>

      <ul className="mt-5 flex flex-col gap-2.5">
        {item.highlights.map((point) => (
          <li
            key={point}
            className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-glow" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Experience() {
  const [[index, direction], setIndex] = React.useState<[number, number]>([0, 0]);

  const goTo = React.useCallback((next: number, dir: number) => {
    setIndex(([current]) => {
      const wrapped = (next + experience.length) % experience.length;
      return wrapped === current ? [current, dir] : [wrapped, dir];
    });
  }, []);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipedLeft =
      info.offset.x <= -SWIPE_OFFSET_THRESHOLD || info.velocity.x <= -SWIPE_VELOCITY_THRESHOLD;
    const swipedRight =
      info.offset.x >= SWIPE_OFFSET_THRESHOLD || info.velocity.x >= SWIPE_VELOCITY_THRESHOLD;

    if (swipedLeft) {
      goTo(index + 1, 1);
    } else if (swipedRight) {
      goTo(index - 1, -1);
    }
  };

  const item = experience[index];

  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="A few different worlds, robotics, manufacturing, lifeguarding, school life, that all come down to the same thing: showing up and getting it right. Swipe through to see them all."
          accent="yellow"
        />

        <div className="mt-12">
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={item.role}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: "grabbing" }}
                className="cursor-grab touch-pan-y select-none active:cursor-grabbing"
              >
                <ExperienceCard item={item} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex items-center justify-center gap-5 sm:justify-between">
            <button
              type="button"
              onClick={() => goTo(index - 1, -1)}
              aria-label="Previous experience"
              className="hidden size-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card/60 text-muted-foreground transition-colors hover:border-glow/40 hover:text-foreground sm:inline-flex"
            >
              <ChevronLeft className="size-4" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {experience.map((exp, i) => (
                <button
                  key={exp.role}
                  type="button"
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  aria-label={`Show ${exp.role} at ${exp.org}`}
                  aria-current={i === index}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-glow" : "w-1.5 bg-border hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(index + 1, 1)}
              aria-label="Next experience"
              className="hidden size-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card/60 text-muted-foreground transition-colors hover:border-glow/40 hover:text-foreground sm:inline-flex"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
