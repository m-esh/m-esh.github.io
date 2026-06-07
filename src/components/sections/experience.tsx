"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";

import { experience, type ExperienceItem } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 92%", "start 45%"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 16]);

  return (
    <motion.li
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-12 sm:pl-16"
    >
      <span className="absolute left-0 top-1 flex size-9 items-center justify-center rounded-full border border-primary/40 bg-card text-primary shadow-[0_0_0_4px_var(--color-background)] sm:size-11">
        <Briefcase className="size-4 sm:size-5" />
      </span>

      <motion.div
        ref={cardRef}
        style={{ scale, borderRadius: radius, transformOrigin: "left center" }}
        className="border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/40 sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{item.role}</h3>
            <p className="mt-1 text-sm font-medium text-primary">{item.org}</p>
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
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {point}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.li>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've put in the work"
          description="Two very different jobs that both come down to the same thing: showing up and getting it right."
        />

        <div className="relative mt-12">
          <div
            className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent sm:left-[22px]"
            aria-hidden
          />

          <ol className="flex flex-col gap-8">
            {experience.map((item, i) => (
              <ExperienceCard key={item.role} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
