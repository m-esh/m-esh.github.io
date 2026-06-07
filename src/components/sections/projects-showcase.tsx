"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";

export function ProjectsShowcase() {
  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="A running list — more to come as each season wraps."
          accent="cyan"
        />

        <ul className="mt-10 flex flex-col border-t border-border/60">
          {projects.map((project, i) => {
            const href = project.links?.[0]?.href;

            const row = (
              <>
                <div className="flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-2 text-lg font-medium tracking-tight sm:text-xl">
                    {project.title}
                    {href && (
                      <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-glow-secondary" />
                    )}
                  </span>
                  <span className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
              </>
            );

            return (
              <motion.li
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-border/60"
              >
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-start justify-between gap-6 py-6 transition-colors hover:text-glow-secondary"
                  >
                    {row}
                  </a>
                ) : (
                  <div className="flex items-start justify-between gap-6 py-6">{row}</div>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
