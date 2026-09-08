"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { projects, type ProjectItem } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { TextScramble } from "@/components/text-scramble";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

// Solid surface rather than .glass: nothing sits behind these cards, so a
// backdrop-filter across four large elements cost blur work on every scroll
// frame and bought no visible frost.
const CARD_CHROME =
  "group focus-ring relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/60 transition-colors duration-[var(--motion-base)] hover:border-primary/40";

// Blueprint grid for the no-photo card — same texture family as the hero cube.
const BLUEPRINT_BG = {
  backgroundImage:
    "repeating-linear-gradient(to right, oklch(0.63 0.15 163 / 0.07) 0 1px, transparent 1px 44px), repeating-linear-gradient(to bottom, oklch(0.63 0.15 163 / 0.07) 0 1px, transparent 1px 44px)",
};

function CardBody({
  project,
  ArrowIcon,
  cta,
  pinCta,
  className,
}: {
  project: ProjectItem;
  ArrowIcon: typeof ArrowRight;
  cta: string;
  /** Tiles pin the CTA to the bottom so it lines up across the grid row.
   *  Side-by-side layouts centre the block instead, which would otherwise
   *  leave a large hole between the tags and a bottom-pinned CTA. */
  pinCta: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-1 flex-col gap-2.5 p-5 sm:p-6", className)}>
      <span className="text-lg font-semibold tracking-tight sm:text-xl">
        <TextScramble text={project.title} trigger="hover" />
      </span>
      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <ul className="mt-1 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-border/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>

      {/* Understated but explicit affordance: the whole card is the target,
          and this names where it goes (internal case study vs. someone
          else's site) instead of relying on a bare arrow. */}
      <span
        className={cn(
          "flex items-center justify-between gap-4 pt-3",
          pinCta && "mt-auto"
        )}
      >
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/90 transition-colors group-hover:text-primary">
          {cta}
          <ArrowIcon
            aria-hidden
            className="size-4 shrink-0 transition-transform duration-[var(--motion-base)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
        <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
      </span>
    </div>
  );
}

function CardImage({ project, className }: { project: ProjectItem; className?: string }) {
  if (!project.image) return null;
  return (
    <div className={cn("relative overflow-hidden bg-secondary/40", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image.src}
        alt={project.image.alt}
        className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
    </div>
  );
}

function ProjectCard({
  project,
  layout,
}: {
  project: ProjectItem;
  layout: "feature" | "tile" | "wide";
}) {
  const href = project.links?.[0]?.href;
  const isInternal = href?.startsWith("/");
  const ArrowIcon = isInternal ? ArrowRight : ArrowUpRight;
  // An external card says so plainly, so nobody clicks expecting a case study
  // and lands on a third-party team profile instead.
  const cta = isInternal ? "View project" : (project.links?.[0]?.label ?? "Visit site");

  const body = (pinCta: boolean, extra?: string) => (
    <CardBody
      project={project}
      ArrowIcon={ArrowIcon}
      cta={cta}
      pinCta={pinCta}
      className={extra}
    />
  );

  // Every image gets a definite ratio. Leaving the side-by-side images on
  // `aspect-auto` let a portrait photo set its own height and stretched the
  // featured card to 692px, most of it empty space beside the text.
  const content =
    layout === "feature" ? (
      // Featured: text beside the photo.
      <div className="grid flex-1 md:grid-cols-[1.1fr_1fr]">
        {body(false, "justify-center")}
        <CardImage
          project={project}
          className="order-first aspect-[2/1] md:order-none md:aspect-[4/3]"
        />
      </div>
    ) : layout === "tile" ? (
      <>
        <CardImage project={project} className="aspect-[16/9]" />
        {body(true)}
      </>
    ) : (
      // Wide card mirroring the feature: photo left, text on the blueprint
      // grid right — the drawing-board texture for the season-rebuilt robot.
      <div className="grid flex-1 md:grid-cols-[1fr_1.1fr]">
        <CardImage project={project} className="aspect-[2/1] md:aspect-[3/2]" />
        <div style={BLUEPRINT_BG} className="flex">
          {body(false, "justify-center")}
        </div>
      </div>
    );

  const cellSpan = layout !== "tile" ? "md:col-span-2" : undefined;

  if (!href) {
    return <div className={cn(CARD_CHROME, cellSpan)}>{content}</div>;
  }

  return isInternal ? (
    <Link href={href} className={cn(CARD_CHROME, cellSpan)}>
      {content}
    </Link>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(CARD_CHROME, cellSpan)}
    >
      {content}
      <span className="sr-only"> (opens The Blue Alliance in a new tab)</span>
    </a>
  );
}

const LAYOUTS: Array<"feature" | "tile" | "wide"> = ["feature", "tile", "tile", "wide"];

export function ProjectsShowcase() {
  return (
    <section id="projects" className="relative scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          index="01"
          title="Projects"
          description="Things I designed, built, and had to debug when they didn't work the first time."
        />

        <Reveal delay={0.08} className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              layout={LAYOUTS[i % LAYOUTS.length]}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
