"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
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
    <div className="border-t pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h3 className="text-2xl font-normal leading-[1.17] tracking-[-0.01em] sm:text-3xl">
            {item.role}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.org}</p>
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-muted-foreground sm:items-end">
          <span className="text-xs tracking-[0.06em]">{item.period}</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" /> {item.location}
          </span>
        </div>
      </div>

      <p className="mt-5 max-w-2xl text-balance leading-relaxed text-muted-foreground">
        {item.summary}
      </p>

      <ul className="mt-6 flex flex-col gap-2.5">
        {item.highlights.map((point) => (
          <li
            key={point}
            className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            <span className="mt-3 h-px w-4 shrink-0 bg-primary" />
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
          title="Where I've worked"
          description="Robotics, manufacturing, lifeguarding, school life. Swipe through the deck."
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
              className="hidden size-10 shrink-0 items-center justify-center border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground sm:inline-flex"
            >
              <ChevronLeft className="size-4" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {experience.map((exp, i) => (
                <button
                  key={exp.role}
                  type="button"
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  aria-label={`Show ${exp.role} at ${exp.org}`}
                  aria-current={i === index}
                  className={cn(
                    "h-0.5 w-7 transition-colors duration-300",
                    i === index ? "bg-foreground" : "bg-foreground/25 hover:bg-foreground/50"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(index + 1, 1)}
              aria-label="Next experience"
              className="hidden size-10 shrink-0 items-center justify-center border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground sm:inline-flex"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
