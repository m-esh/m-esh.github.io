import { Award, HeartPulse, ShieldCheck } from "lucide-react";

import { certifications } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const ICONS = [ShieldCheck, HeartPulse, Award];

export function Certifications() {
  return (
    <section id="certifications" className="relative scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          index="04"
          title="Certifications"
          description="The training behind the lifeguarding work."
        />

        {/* A plain three-up row. The previous fanned card deck overlapped its
            own text at rest and only separated on hover, so on touch devices
            two of the three certificates were permanently unreadable. */}
        <Reveal delay={0.06} className="mt-10 grid gap-4 sm:grid-cols-3">
          {certifications.map((cert, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={cert.name}
                className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card/70 p-5 transition-colors duration-[var(--motion-base)] hover:border-primary/40"
              >
                <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold leading-snug tracking-tight">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
                <p className="mt-auto pt-1 font-mono text-xs text-muted-foreground">{cert.year}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
