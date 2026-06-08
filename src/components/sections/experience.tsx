import { Briefcase, MapPin } from "lucide-react";

import { experience, type ExperienceItem } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <li
      style={{ animationDelay: `${index * 0.08}s` }}
      className="animate-fade-up relative pl-12 sm:pl-16"
    >
      <span className="absolute left-0 top-1 flex size-9 items-center justify-center rounded-full border border-glow/40 bg-card text-glow shadow-[0_0_0_4px_var(--color-background)] sm:size-11">
        <Briefcase className="size-4 sm:size-5" />
      </span>

      <div className="rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-glow/40 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{item.role}</h3>
            <p className="mt-1 text-sm font-medium text-glow">{item.org}</p>
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
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-glow" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="A few different worlds, robotics, manufacturing, lifeguarding, school life, that all come down to the same thing: showing up and getting it right."
          accent="yellow"
        />

        <div className="relative mt-12">
          <div
            className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-glow/60 via-border to-transparent sm:left-[22px]"
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
