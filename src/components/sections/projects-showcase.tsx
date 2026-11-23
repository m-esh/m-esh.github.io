"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { projects, type ProjectItem, type Shot } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

function Media({ shot, aspect, eager }: { shot: Shot; aspect: string; eager?: boolean }) {
  const contained = shot.fit === "contain";
  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-secondary/40", aspect)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shot.src}
        alt={shot.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={shot.position ? { objectPosition: shot.position } : undefined}
        className={cn(
          "size-full transition-transform duration-[var(--motion-base)] group-hover:scale-[1.025]",
          contained ? "object-contain p-4" : "object-cover"
        )}
      />
    </div>
  );
}

function linkInfo(project: ProjectItem) {
  const href = project.links?.[0]?.href;
  const isInternal = href?.startsWith("/") ?? false;
  return {
    href,
    isInternal,
    cta: isInternal ? "View project" : (project.links?.[0]?.label ?? "Visit site"),
    Arrow: isInternal ? ArrowRight : ArrowUpRight,
  };
}

function Cta({ project }: { project: ProjectItem }) {
  const { href, isInternal, cta, Arrow } = linkInfo(project);
  if (!href) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
      {cta}
      <Arrow
        aria-hidden
        className="size-4 shrink-0 transition-transform duration-[var(--motion-base)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
      {!isInternal && <span className="sr-only"> (opens The Blue Alliance in a new tab)</span>}
    </span>
  );
}

// The whole card is the hit target; the "View project" line inside it is a
// visual cue, not a nested link, so a click anywhere on the card lands.
function CardLink({
  project,
  className,
  children,
}: {
  project: ProjectItem;
  className: string;
  children: ReactNode;
}) {
  const { href, isInternal } = linkInfo(project);
  const cls = cn("focus-ring group rounded-xl", className);
  if (!href) return <div className={className}>{children}</div>;
  return isInternal ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
      {children}
    </a>
  );
}

function Meta({ project }: { project: ProjectItem }) {
  return (
    <p className="font-mono text-xs text-muted-foreground">
      {project.year}
      {project.credit ? ` · ${project.credit}` : ""}
    </p>
  );
}

function FeaturedProject({ project, eager }: { project: ProjectItem; eager?: boolean }) {
  // Two views where the object has two sides to show, one photograph where
  // it doesn't.
  const media =
    project.composition === "pair" ? (
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {project.shots.map((shot, i) => (
          <Media key={shot.src} shot={shot} aspect="aspect-[4/3]" eager={eager && i === 0} />
        ))}
      </div>
    ) : (
      <Media
        shot={project.shots[0]}
        aspect={project.shots[0].ratio === "3/2" ? "aspect-[3/2]" : "aspect-[16/9]"}
        eager={eager}
      />
    );

  return (
    <article>
      <CardLink project={project} className="flex flex-col gap-6">
        {media}
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:items-start md:gap-10">
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
              {project.title}
            </h3>
            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-end md:text-right">
            <Meta project={project} />
            {/* One readable line instead of a row of outlined badges. */}
            <p className="text-sm text-muted-foreground">{project.tags.join(" · ")}</p>
            <div className="mt-1">
              <Cta project={project} />
            </div>
          </div>
        </div>
      </CardLink>
    </article>
  );
}

function CompactProject({ project }: { project: ProjectItem }) {
  return (
    <article>
      <CardLink project={project} className="flex h-full flex-col gap-4">
        <Media shot={project.shots[0]} aspect="aspect-[4/3]" />
        <div className="flex flex-1 flex-col gap-2">
          <Meta project={project} />
          <h3 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
            {project.title}
          </h3>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <p className="text-sm text-muted-foreground">{project.tags.join(" · ")}</p>
          <div className="mt-auto pt-2">
            <Cta project={project} />
          </div>
        </div>
      </CardLink>
    </article>
  );
}

function CompactGroup({ label, items }: { label: string; items: ProjectItem[] }) {
  return (
    <div className="border-t border-border/40 pt-14 sm:pt-16">
      <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </h3>
      <div className="mt-8 grid gap-12 sm:grid-cols-2 sm:gap-8">
        {items.map((project) => (
          <CompactProject key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}

export function ProjectsShowcase() {
  const featured = projects.filter((p) => p.tier === "featured");
  const builds = projects.filter((p) => p.tier === "build");
  const other = projects.filter((p) => p.tier === "other");

  return (
    <section id="projects" className="relative scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading index="01" title="Projects" />

        <Reveal delay={0.08} className="mt-12 flex flex-col gap-14 sm:gap-16">
          {featured.map((project, i) => (
            <div
              key={project.title}
              className={cn(i > 0 && "border-t border-border/40 pt-14 sm:pt-16")}
            >
              <FeaturedProject project={project} eager={i === 0} />
            </div>
          ))}
          <CompactGroup label="More builds" items={builds} />
          <CompactGroup label="Other work" items={other} />
        </Reveal>
      </div>
    </section>
  );
}
