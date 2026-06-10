"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { projects } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";

export function ProjectsShowcase() {
  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          description="A running list, with more to come as each season wraps."
        />

        <ul className="mt-10 flex flex-col divide-y divide-border/40">
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
    </section>
  );
}
