"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { projects, type ProjectItem } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { TextScramble } from "@/components/text-scramble";
import { cn } from "@/lib/utils";

const CARD_CHROME =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 transition-[border-color] duration-300 hover:border-primary/40";

// Blueprint grid for the no-photo card — same texture family as the hero cube.
const BLUEPRINT_BG = {
  backgroundImage:
    "repeating-linear-gradient(to right, oklch(0.78 0.2 95 / 0.07) 0 1px, transparent 1px 44px), repeating-linear-gradient(to bottom, oklch(0.78 0.2 95 / 0.07) 0 1px, transparent 1px 44px)",
};

function CardBody({
  project,
  ArrowIcon,
  className,
}: {
  project: ProjectItem;
  ArrowIcon: typeof ArrowRight;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-1 flex-col gap-2.5 p-5 sm:p-6", className)}>
      <span className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight sm:text-xl">
        <TextScramble text={project.title} trigger="hover" />
        <ArrowIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
      </span>
      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <span className="mt-auto pt-2 font-mono text-xs text-muted-foreground">
        {project.year}
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
        loading="lazy"
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

  const content =
    layout === "feature" ? (
      // Featured: text beside the photo, photo gets the bigger column.
      <div className="grid flex-1 md:grid-cols-[1fr_1.2fr]">
        <CardBody project={project} ArrowIcon={ArrowIcon} className="justify-center" />
        <CardImage
          project={project}
          className="order-first aspect-[16/9] md:order-none md:aspect-auto md:min-h-[280px]"
        />
      </div>
    ) : layout === "tile" ? (
      <>
        <CardImage project={project} className="aspect-[16/10]" />
        <CardBody project={project} ArrowIcon={ArrowIcon} />
      </>
    ) : (
      // Wide text card on a blueprint grid: the robot is rebuilt every season,
      // so the drawing-board texture is the honest visual.
      <div style={BLUEPRINT_BG} className="flex flex-1">
        <CardBody project={project} ArrowIcon={ArrowIcon} className="max-w-2xl py-7 sm:py-8" />
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
    </a>
  );
}

const LAYOUTS: Array<"feature" | "tile" | "wide"> = ["feature", "tile", "tile", "wide"];

export function ProjectsShowcase() {
  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          description="A running list, with more to come as each season wraps."
        />

        <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              layout={LAYOUTS[i % LAYOUTS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
