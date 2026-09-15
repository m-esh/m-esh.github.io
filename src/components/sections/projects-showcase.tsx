"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { projects, type ProjectItem, type Shot } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

function Figure({ shot, eager, tall }: { shot: Shot; eager?: boolean; tall?: boolean }) {
  const contained = shot.fit === "contain";
  const ratio =
    shot.ratio === "3/2"
      ? "aspect-[3/2]"
      : shot.ratio === "4/3" || (!shot.ratio && tall)
        ? "aspect-[4/3]"
        : "aspect-[16/9]";
  return (
    <figure className="flex flex-col gap-2.5">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg",
          ratio,
          // A CAD render already carries its own white ground, so it needs no
          // container behind it — wrapping it in a tinted box just framed a
          // plate inside another plate.
          contained ? "bg-transparent" : "bg-secondary/40"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shot.src}
          alt={shot.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "size-full",
            contained ? "rounded-lg object-contain" : "object-cover"
          )}
        />
      </div>
      <figcaption className="text-sm leading-relaxed text-muted-foreground">
        {shot.caption}
      </figcaption>
    </figure>
  );
}

function Project({ project, eager }: { project: ProjectItem; eager?: boolean }) {
  const href = project.links?.[0]?.href;
  const isInternal = href?.startsWith("/");
  const ArrowIcon = isInternal ? ArrowRight : ArrowUpRight;
  const cta = isInternal ? "View project" : (project.links?.[0]?.label ?? "Visit site");

  // Composition follows the object: two views where the object has two sides
  // to show, one photograph where it doesn't, a plate for a CAD render.
  const media =
    project.composition === "pair" ? (
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {project.shots.map((shot, i) => (
          <Figure key={shot.src} shot={shot} eager={eager && i === 0} tall />
        ))}
      </div>
    ) : (
      // mx-auto: a max-width block defaults to the left edge of the row, so
      // the plate sat off-centre rather than centred within it.
      <div className={project.composition === "plate" ? "mx-auto sm:max-w-3xl" : undefined}>
        <Figure shot={project.shots[0]} eager={eager} />
      </div>
    );

  const linkClass =
    "focus-ring group/cta inline-flex items-center gap-1.5 rounded text-sm font-medium text-foreground transition-colors hover:text-primary";
  const arrow = (
    <ArrowIcon
      aria-hidden
      className="size-4 shrink-0 transition-transform duration-[var(--motion-base)] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
    />
  );

  return (
    <article className="flex flex-col gap-6">
      {media}

      {/* Text sits outside the image: title and line on the left, the
          practical details on the right, on the same grid as everything else. */}
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:items-start md:gap-10">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:items-end md:text-right">
          <p className="font-mono text-xs text-muted-foreground">
            {project.year}
            {project.credit ? ` · ${project.credit}` : ""}
          </p>
          {/* One readable line instead of a row of outlined badges. */}
          <p className="text-sm text-muted-foreground">{project.tags.join(" · ")}</p>
          {href &&
            (isInternal ? (
              <Link href={href} className={cn(linkClass, "mt-1")}>
                {cta} {arrow}
              </Link>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(linkClass, "mt-1")}
              >
                {cta} {arrow}
                <span className="sr-only"> (opens The Blue Alliance in a new tab)</span>
              </a>
            ))}
        </div>
      </div>
    </article>
  );
}

export function ProjectsShowcase() {
  return (
    <section id="projects" className="relative scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading index="01" title="Projects" />

        {/* Open rows separated by hairlines rather than four identical cards. */}
        <Reveal delay={0.08} className="mt-12 flex flex-col gap-14 sm:gap-16">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={cn(i > 0 && "border-t border-border/40 pt-14 sm:pt-16")}
            >
              <Project project={project} eager={i === 0} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
