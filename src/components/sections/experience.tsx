"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";

import { experience } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've put in the work"
          description="From poolside to pit crew — real responsibility, real deadlines, real teams."
        />

        <div className="relative mt-16">
          <div
            className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent sm:left-[22px]"
            aria-hidden
          />

          <ol className="flex flex-col gap-10">
            {experience.map((item, i) => (
              <motion.li
                key={item.role}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-12 sm:pl-16"
              >
                <span className="absolute left-0 top-1 flex size-9 items-center justify-center rounded-full border border-primary/40 bg-card text-primary shadow-[0_0_0_4px_var(--color-background)] sm:size-11">
                  <Briefcase className="size-4 sm:size-5" />
                </span>

                <div className="rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/40 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-primary">{item.org}</p>
                    </div>
                    <div className="flex flex-col items-start gap-1 text-sm text-muted-foreground sm:items-end">
                      <span className="font-mono text-xs tracking-wide">{item.period}</span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5" /> {item.location}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-balance leading-relaxed text-muted-foreground">
                    {item.summary}
                  </p>

                  <ul className="mt-5 flex flex-col gap-2.5">
                    {item.highlights.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
